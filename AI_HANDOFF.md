# AI Hand-off: test-project-love-nails-kg

## Коротко о проекте

Это Next.js 15 + TypeScript сайт для nail-студии Love Nails в Бишкеке.

Проект уже находится в достаточно продвинутом MVP-состоянии и включает:
- публичный лендинг с секциями про услуги, филиалы, работы, отзывы, FAQ и booking;
- online-запись через форму/WhatsApp;
- серверный booking API;
- MVP admin UI с простым логином и summary;
- SEO, metadata, analytics, карты и базовую типизацию данных.

Основной публичный URL проекта:
https://test-project-love-nails-kg.vercel.app/

---

## Что делает проект

### 1. Публичный сайт
Главная страница собрана в [app/page.tsx](app/page.tsx).

На ней есть:
- hero-блок;
- блок команд/мастеров;
- секции услуг;
- секции филиалов;
- блоки работ и отзывов;
- FAQ;
- booking-блок;
- карты и футер.

### 2. Онлайн-запись
Основной flow записи реализован через:
- [components/salon/booking-widget.tsx](components/salon/booking-widget.tsx)
- [app/api/booking/route.ts](app/api/booking/route.ts)
- [lib/booking/validators.ts](lib/booking/validators.ts)
- [lib/booking/provider.ts](lib/booking/provider.ts)

Пользователь выбирает:
- филиал;
- услугу;
- мастера;
- дату;
- время;
- имя;
- телефон;
- комментарий;
- согласие.

После отправки форма отправляет POST на /api/booking. На сервере данные валидируются и затем сохраняются через booking provider.

### 3. Admin MVP
Admin UI находится в:
- [app/admin/page.tsx](app/admin/page.tsx)
- [components/admin/admin-dashboard.tsx](components/admin/admin-dashboard.tsx)
- [lib/admin/auth.ts](lib/admin/auth.ts)

Текущая реализация:
- простая cookie-based auth через ADMIN_PASSWORD;
- mock admin dashboard;
- summary API;
- контент пока не хранится в полноценной базе, а в mock/localStorage-стиле.

### 4. SEO и analytics
SEO/metadata/JSON-LD/robots/sitemap реализованы в:
- [app/layout.tsx](app/layout.tsx)
- [app/robots.ts](app/robots.ts)
- [app/sitemap.ts](app/sitemap.ts)
- [lib/analytics.ts](lib/analytics.ts)

Проект умеет отправлять analytics events для GA4/Yandex/Meta, но не ломается, если ID не заданы.

---

## Ключевая архитектура

### Frontend
- Next.js App Router
- React Server Components по умолчанию
- Client Components только там, где нужен интерактив: booking, maps, admin, analytics

### Styling
- Tailwind CSS v4
- локальные UI-компоненты в [components/ui](components/ui)
- дизайн-система и общие элементы в [components/shared](components/shared)

### Data layer
Контент и данные хранятся в [lib/data](lib/data):
- branches
- services
- masters
- reviews
- gallery
- salon
- booking

Типы находятся в [lib/domain/types.ts](lib/domain/types.ts).

---

## Основные точки входа

### Публичная страница
- [app/page.tsx](app/page.tsx)

### API booking
- [app/api/booking/route.ts](app/api/booking/route.ts)

### Booking widget
- [components/salon/booking-widget.tsx](components/salon/booking-widget.tsx)

### Admin auth
- [lib/admin/auth.ts](lib/admin/auth.ts)

### Analytics
- [lib/analytics.ts](lib/analytics.ts)

### SEO + metadata
- [app/layout.tsx](app/layout.tsx)
- [app/robots.ts](app/robots.ts)
- [app/sitemap.ts](app/sitemap.ts)

---

## Поток booking

1. Пользователь заполняет форму в booking widget.
2. Widget отправляет POST на /api/booking.
3. API вызывает validateBookingPayload.
4. Если данные валидны, они уходят в saveBooking.
5. saveBooking выбирает provider (mock / Google Sheets / Google Calendar / both).
6. В случае успеха возвращается результат, включая whatsappUrl/booking info.
7. Widget открывает WhatsApp с уже заполненным сообщением.

Важный момент: текущее поведение ожидает, что заявка будет подтверждена человеком, а не автоматически забронирована без участия администратора.

---

## Важные правила проекта

### Конвенции
- Сайт должен оставаться в стиле Love Nails: мягкая, светлая, аккуратная эстетика.
- Не ломать якорные секции/IDs, потому что они связаны с навигацией.
- Не использовать preview URL как основной результат пользователю.
- Основной URL для пользователя всегда:
  https://test-project-love-nails-kg.vercel.app/

### Известные ограничения
- Admin пока не полноценная CMS.
- Booking storage пока не полноценная база; часть flow использует mock-store.
- Google Sheets/Calendar integration требует env и ручной настройки.
- Telegram/WhatsApp notifications опциональны и зависят от env.

---

## Переменные окружения

Основные env, которые стоит знать:
- NEXT_PUBLIC_SITE_URL
- NEXT_PUBLIC_SALON_PHONE
- NEXT_PUBLIC_WHATSAPP_PHONE
- NEXT_PUBLIC_INSTAGRAM_URL
- ADMIN_PASSWORD
- BOOKING_PROVIDER
- TELEGRAM_BOT_TOKEN
- TELEGRAM_CHAT_ID
- GOOGLE_SHEETS_SPREADSHEET_ID
- GOOGLE_SHEETS_CLIENT_EMAIL
- GOOGLE_SHEETS_PRIVATE_KEY
- GOOGLE_CALENDAR_ID
- GOOGLE_CALENDAR_CLIENT_EMAIL
- GOOGLE_CALENDAR_PRIVATE_KEY

Подробности — в [README.md](README.md) и [GOOGLE_SETUP.md](GOOGLE_SETUP.md).

---

## Команды для работы

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm run test
```

---

## Что важно не сломать

При любых изменениях особенно осторожно нужно относиться к:
- booking flow;
- навигации и якорям секций;
- SEO/metadata;
- admin auth и API;
- публичному URL и деплою;
- визуальному стилю сайта.

---

## Если следующий ИИ продолжает работу

Рекомендуемый порядок:
1. Сначала понять, что именно нужно изменить: UI, booking, admin, SEO, данные или интеграции.
2. Найти нужную зону через файл-ответственность из [PROJECT_AREAS.md](PROJECT_AREAS.md).
3. Вносить минимальные изменения в соответствующую область.
4. Проверить build/typecheck/lint.
5. При изменениях сайта — деплоить на основной URL проекта.

---

## Короткий summary для быстрого понимания

Это не просто красивый лендинг, а полноценный MVP для салона красоты с:
- контентной главной страницей;
- booking-потоком;
- серверной обработкой заявок;
- админкой MVP;
- SEO и analytics;
- гибкой структурой данных под будущую CMS/CRM интеграцию.
