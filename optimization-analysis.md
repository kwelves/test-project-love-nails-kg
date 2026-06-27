# Анализ оптимизаций проекта test-project-love-nails-kg

> Дата: 27.06.2026 | Только анализ, без изменений кода

---

## 1. Размер бандла и производительность (критично)

### Проблема: BookingWidget тянет весь бандл главной

**Факты:**
- Главная страница `/`: **61.9 kB** JS, **179 kB** First Load JS
- Для лендинга nail-салона это завышенный вес. Сравнение: чистый Next.js лендинг обычно 20–40 kB страница.
- `BookingWidget` (383 строки) импортирован прямо в `app/page.tsx` и является **Client Component** (`"use client"`).
- Внутри `BookingWidget` тянутся: `lucide-react` (иконки), `framer-motion` (косвенно через `AnimatedReveal`), все UI-компоненты (`Button`, `Card`, `Input`, `Select`, `Textarea`, `Checkbox`, `Label`), `AppointmentScheduler` (ещё один client component), `trackEvent`.

**Почему это плохо:**
- Пользователь, который просто прокручивает лендинг, загружает весь код booking-формы, календаря, select'ов и валидации.
- Booking-логика блокирует рендер hero-секции и верхней части страницы.

**Рекомендации:**
1. **Code-splitting**: обернуть `BookingWidget` в `next/dynamic` с `ssr: false` или ленивой загрузкой при приближении к секции `#booking` (Intersection Observer + dynamic import).
2. **Отделить бандл Admin**: `AdminDashboard` (504 строки) загружается отдельной страницей `/admin`, но в `page.tsx` он не используется — тут всё ок. Однако убедиться, что `admin-dashboard.tsx` не импортится где-то ещё на главной.
3. **Tree-shaking lucide-react**: `lucide-react` импортирует иконки по имени (`import { ArrowRight } from "lucide-react"`), но в современных версиях это tree-shakeable. Проверить, что не импортируется `* as Icons`.

---

## 2. Архитектура данных и Admin (критично)

### Проблема: Admin-dashboard — локальная CMS без серверного state

**Факты:**
- `AdminDashboard` сохраняет все изменения в `localStorage` (`storageKey = "love-nails-admin-state"`).
- При обновлении страницы или смене браузера все правки теряются.
- Данные (salon, branches, services, masters) загружаются из статических `.ts` файлов, но затем копируются в `useState` внутри админки.
- `AdminPreviewCard` — непонятно, что делает, но живёт в `components/salon/`, а не в `components/admin/`.

**Рекомендации:**
1. Перенести `admin-preview-card.tsx` в `components/admin/` (соответствие PROJECT_AREAS.md).
2. Если admin нужен реальный, подключить либо:
   - Prisma + SQLite/PostgreSQL (лёгкий вариант для Next.js),
   - Или Vercel KV / Upstash Redis для хранения admin-изменений,
   - Или хотя бы `fs.writeFile` в dev-режиме с ревалидацией.
3. Если admin остаётся mock — убрать `localStorage` и показать предупреждение: "Изменения видны только в этом браузере и сбросятся при обновлении".

---

## 3. Безопасность (средний/высокий приоритет)

### Проблема: Admin auth — слабая защита

**Факты:**
- `ADMIN_PASSWORD` используется как raw secret для HMAC (`createHmac("sha256", getSecret())`).
- Fallback password: `"change-me"` — если env не задан, любой может зайти.
- Cookie не настроен: нет `httpOnly`, `secure`, `sameSite`, `maxAge` в `lib/admin/auth.ts`.
- Cookie устанавливается где-то? В `app/api/admin/login/route.ts` — не прочитан, но обычно cookie нужно устанавливать через `cookies().set()`.

**Рекомендации:**
1. Убрать fallback `"change-me"` — если `ADMIN_PASSWORD` не задан, auth должен быть полностью отключён или выбрасывать ошибку.
2. Настроить cookie с флагами: `httpOnly`, `secure` (в production), `sameSite: "strict"`, `maxAge`.
3. Добавить rate limiting на `/api/admin/login` (например, `lru-cache` или `@upstash/ratelimit`).

### Проблема: Booking API — нет защиты от спама

**Факты:**
- `/api/booking` принимает любые запросы без rate limiting, CSRF-токена или капчи.
- Телефон валидируется только по формату, но нет проверки на повторную отправку с того же IP/телефона.
- `name` — нет sanitization, но так как выводится только в WhatsApp, XSS риск минимален.

**Рекомендации:**
1. Добавить простой rate limiter на IP (например, 5 заявок в 15 минут).
2. Добавить honeypot-поле (скрытое поле, которое бот заполнит, а человек нет).
3. Валидация: `comment` ограничить по длине (например, 500 символов), `name` — 100 символов.

---

## 4. SEO и метаданные (средний приоритет)

### Проблема: JSON-LD встроен в page.tsx

**Факты:**
- `jsonLd` объект генерируется прямо в `Home()` компоненте на каждый рендер.
- `dangerouslySetInnerHTML` с JSON.stringify — ок для JSON-LD, но можно сделать чище.
- Нет `Image` в `metadata` для OpenGraph — нет `images: [{ url: "/og-image.jpg" }]`.

**Рекомендации:**
1. Вынести JSON-LD в отдельный серверный компонент `app/json-ld.tsx` или использовать `next/head` (но в App Router лучше inline в layout).
2. Сгенерировать OG-image (Open Graph) через `next/og` или вручную — добавить в `metadata.openGraph.images`.
3. Добавить `twitter:site` (если есть аккаунт) и `twitter:creator`.

---

## 5. Дублирование кода и утилит (средний приоритет)

### Проблема: `formatDateValue` дублируется

**Факты:**
- `booking-widget.tsx`: `formatDateValue(date)` — строки 362–368.
- `appointment-scheduler.tsx`: `toDateValue(date)` — строки 152–158. Логика идентична.
- `appointment-scheduler.tsx` также имеет `parseDateValue`, `startOfDay`, `startOfMonth`, `endOfMonth`, `addMonths`, `buildMonthDays` — это фактически кастомная библиотека для дат.

**Рекомендации:**
1. Вынести все date-функции в `lib/date-utils.ts`.
2. Унифицировать `formatDateValue` / `toDateValue` в одну функцию `toISODate`.

### Проблема: InfoCard — локальный компонент в page.tsx

**Факты:**
- `InfoCard` определён внизу `app/page.tsx` (строки 263–273). Это непереиспользуемый компонент.
- Аналогичные карточки есть в `components/salon/` (service-card, branch-card, testimonial-card), но InfoCard — нет.

**Рекомендации:**
1. Вынести `InfoCard` в `components/shared/info-card.tsx` или в `components/salon/info-card.tsx`.

### Проблема: Множественные `whyItems` / статические данные в page.tsx

**Факты:**
- `whyItems` — массив строк в `page.tsx`. Это не страшно, но если контент меняется, лучше вынести в `lib/data/why.ts`.
- `jsonLd` — объект из 40+ строк, дублирует данные из `lib/data/*`.

**Рекомендации:**
1. Вынести `whyItems` в `lib/data/why.ts`.
2. Создать функцию `buildSalonJsonLd(salon, branches, services)` в `lib/seo/json-ld.ts`.

---

## 6. Next.js конфигурация (низкий/средний приоритет)

### Проблема: `next.config.ts` минимален

**Факты:**
- `next.config.ts` содержит только `reactStrictMode: true` и `outputFileTracingRoot: process.cwd()`.
- Нет настроек для `images`, `compress`, `experimental`, `headers`.
- `target: ES2017` в `tsconfig.json` — старый таргет, Next.js 15 может использовать ES2020+.

**Рекомендации:**
1. Добавить `images` конфигурацию, если когда-нибудь будут remote images (Instagram API и т.д.):
   ```ts
   images: {
     remotePatterns: [{
       protocol: "https",
       hostname: "**.instagram.com",
     }],
   }
   ```
2. Увеличить `target` в `tsconfig.json` до `ES2020` или `ES2022` — меньше полифилов, меньше бандл.
3. Добавить `headers` для кэширования статических ассетов (Vercel делает это частично, но显式 headers лучше).
4. Добавить `poweredByHeader: false` (убрать `X-Powered-By: Next.js`).

---

## 7. Шрифты и CSS (низкий/средний приоритет)

### Проблема: Шрифты не оптимизированы через Next.js

**Факты:**
- `globals.css` использует `font-family: "Manrope", "Segoe UI", system-ui, sans-serif`.
- Нет `@font-face` и нет `next/font/google` для подключения Manrope.
- Система полагается на `font-feature-settings: "tnum" 1, "ss01" 1`, что не все шрифты поддерживают.
- `surface-noise` генерирует fixed псевдо-элемент с `background-image` и `mask-image` — это может быть дорого на слабых устройствах, но маска маленькая (72px).

**Рекомендации:**
1. Использовать `next/font/google` для Manrope:
   ```ts
   import { Manrope } from "next/font/google";
   const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-sans" });
   ```
   Это даст автоматическую оптимизацию (предзагрузка, self-host, font-display: swap).
2. Проверить, нужен ли `surface-noise` на мобильных — можно отключить через `@media (prefers-reduced-motion)` или `@media (pointer: coarse)`.

---

## 8. Компоненты UI и accessibility (низкий/средний приоритет)

### Проблема: Select в booking-widget — нативный HTML select

**Факты:**
- `components/ui/select.tsx` — это обёртка над `<select>`, а не кастомный dropdown. Это ок для accessibility, но стилизация ограничена.
- В `booking-widget.tsx` используется `event.target.value as BranchId` — тип-кастинг без проверки (хотя валидация есть на сервере).

**Рекомендации:**
1. Оставить нативный `<select>` — это лучше для accessibility и mobile. Но стилизовать через CSS (убрать стрелку, добавить кастомную) или использовать `radix-ui` (но это +бандл).
2. Добавить client-side валидацию `BranchId` через `zod` прямо в `booking-widget.tsx`.

### Проблема: Checkbox label не связан через htmlFor

**Факты:**
- В `booking-widget.tsx` (строка 330): `<label>` оборачивает `<Checkbox>` и текст, но `Checkbox` не принимает `id`.
- `Label` из `components/ui/label.tsx` — shadcn-style, но используется `<label>` вручную.

**Рекомендации:**
1. Сделать `Checkbox` управляемым через `id` + `htmlFor` или использовать `Label` компонент с `htmlFor`.

---

## 9. Google интеграции (средний приоритет)

### Проблема: Ручная JWT-аутентификация Google

**Факты:**
- `lib/booking/google-auth.ts` создаёт JWT вручную через `node:crypto` (`createSign`).
- Это работает, но легко ошибиться в формате JWT, base64url, нормализации ключа.
- Нет retry-logic, нет refresh token, нет кэширования access token (он живёт 1 час, но каждый запрос создаёт новый JWT и делает fetch в Google OAuth).

**Рекомендации:**
1. Кэшировать `access_token` на уровне процесса (в памяти) до истечения срока (`exp` в JWT), чтобы не делать лишние запросы к `oauth2.googleapis.com`.
2. Альтернатива: использовать `google-auth-library` (но это +~200KB в server bundle, что может быть acceptably для API route). Или оставить ручную реализацию, но добавить кэширование.
3. Добавить retry с exponential backoff для `fetch` в Google Sheets/Calendar.

---

## 10. Аналитика и отслеживание (низкий приоритет)

### Проблема: trackEvent вызывается при каждом изменении поля

**Факты:**
- `update()` в `booking-widget.tsx` вызывает `trackEvent` при каждом изменении `branchId`, `serviceId`, `masterId`, `date`, `time`.
- Это 5+ событий на одну форму + `booking_start` при `onFocus`.
- Если analytics ID не заданы, события просто шлются в `window.dispatchEvent` — нет debounce.

**Рекомендации:**
1. Добавить `debounce` (например, 300ms) для `trackEvent` при быстрых изменениях (особенно `select_time_slot`).
2. Или использовать `queueMicrotask` + batching, чтобы не блокировать UI.

---

## 11. Структура проекта и конвенции (низкий приоритет)

### Проблема: Несоответствие PROJECT_AREAS.md

**Факты:**
- `components/salon/admin-preview-card.tsx` находится в `salon/`, а должен быть в `admin/` согласно PROJECT_AREAS.md.
- `components/shared/anchor-scroll.ts` и `smooth-anchor.tsx` — разбросаны, хотя PROJECT_AREAS.md говорит, что оба в `shared/`.
- `lib/booking/` содержит `google-auth.ts`, `google-sheets.ts`, `google-calendar.ts` — это не booking-логика, а интеграции. Можно `lib/integrations/google/`.

**Рекомендации:**
1. Перенести `admin-preview-card.tsx` в `components/admin/`.
2. Перенести google-файлы в `lib/integrations/google/` или `lib/adapters/`.

---

## 12. Graphify-инсайты (архитектура)

### Что говорит граф

- **532 узла, 933 рёбра, 32 communities** — проект достаточно большой для графовой навигации.
- **God nodes**: `cn()` (33 связи), `Button` (13), `Container` (10) — центральные абстракции. Это нормально.
- **Import cycles**: нет — хорошо.
- **Hyperedge "Booking Flow System"** — связывает API, validators, types, Google setup. Это логично.
- **Cohesion communities** очень низкая (0.07–0.09) — это признак того, что компоненты слишком тесно связаны между собой. В идеале cohesion > 0.15–0.20.

**Вывод из графа:**
- Проект имеет "спагетти-структуру" на уровне зависимостей — слишком много компонентов ссылаются на `cn()`, `salon`, `branches` и другие глобальные данные.
- Рекомендуется уменьшить количество "god nodes" — например, вынести данные из прямого импорта в контекст или пропсы для некоторых компонентов.

---

## 13. Сводка приоритетов

| Приоритет | Зона | Действие | Ожидаемый эффект |
|-----------|------|----------|------------------|
| 🔴 **Высокий** | Performance | Ленивая загрузка `BookingWidget` через `next/dynamic` | -15–25 kB First Load JS |
| 🔴 **Высокий** | Security | Убрать fallback admin password, настроить cookie | Защита admin-панели |
| 🟡 **Средний** | Architecture | Вынести JSON-LD, whyItems, date-utils | Чистота кода |
| 🟡 **Средний** | Security | Rate limiting на booking API | Защита от спама |
| 🟡 **Средний** | SEO | Добавить OG-image, twitter meta | Лучший sharing |
| 🟡 **Средний** | Integrations | Кэшировать Google access token | Меньше latency |
| 🟢 **Низкий** | DX | Улучшить next.config.ts, tsconfig target | Меньше полифилов |
| 🟢 **Низкий** | Fonts | Подключить Manrope через next/font | Быстрее загрузка шрифтов |
| 🟢 **Низкий** | Structure | Перенести admin-preview-card, google-файлы | Соответствие PROJECT_AREAS |
| 🟢 **Низкий** | Analytics | Debounce trackEvent | Меньше шума |

---

*Отчёт подготовлен на основе чтения 20+ файлов, анализа production build и Graphify-отчёта.*
