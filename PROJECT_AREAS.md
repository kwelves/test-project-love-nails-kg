# Love Nails Project Areas

Этот файл делит проект на зоны ответственности, чтобы разные чаты или рабочие потоки могли работать с конкретной частью сайта без хаотичного обхода всего репозитория.

## Как использовать

- Перед изменениями использовать Graphify: `graphify query`, `graphify path` или `graphify explain` по нужной зоне.
- Работать только с файлами своей зоны, если задача явно не требует перехода через границы.
- Если изменение затрагивает несколько зон, считать главным владельцем ту зону, где меняется пользовательское поведение.
- После изменений кода запускать `graphify update .`.
- После изменений сайта делать production-деплой только на основной URL: `https://test-project-love-nails-kg.vercel.app/`.

## Главный координатор

Назначение: общая архитектура, финальная проверка, сквозные решения, деплой, контроль качества.

Файлы:
- `AGENTS.md`
- `PROJECT_AREAS.md`
- `README.md`
- `TESTING.md`
- `DEPLOYMENT.md`
- `docs/`
- `package.json`
- `next.config.ts`
- `tsconfig.json`

Когда подключать:
- задача затрагивает несколько зон;
- нужно принять архитектурное решение;
- нужен финальный QA или production-деплой.

## Navigation And Scroll

Назначение: navbar, активные пункты меню, якорная навигация, smooth scroll, мобильная навигация.

Файлы:
- `components/site/header.tsx`
- `components/site/tubelight-nav.tsx`
- `components/shared/smooth-anchor.tsx`
- `components/shared/anchor-scroll.ts`
- `components/layout/section.tsx`
- `app/globals.css`

Границы:
- не менять контент секций без необходимости;
- проверять desktop и mobile scroll;
- после правок обязательно проверять синхронизацию активного пункта navbar с текущей секцией.

## Booking Flow

Назначение: онлайн-запись, календарь, выбор времени, summary, отправка заявки, WhatsApp/booking API.

Файлы:
- `components/salon/booking-widget.tsx`
- `components/salon/appointment-scheduler.tsx`
- `app/api/booking/route.ts`
- `lib/booking/`
- `lib/data/booking.ts`
- `lib/domain/types.ts`
- `lib/notifications/`

Границы:
- не решать компактность через `scale` или `zoom`;
- сохранять стиль Love Nails: теплая бежевая палитра, мягкий минимализм, премиальная аккуратность;
- проверять форму как пользователь: выбор услуги, мастера, даты, времени, контактов и отправку.

## Homepage Sections

Назначение: контентные блоки главной страницы, структура лендинга, отзывы, галерея, FAQ, команда, филиалы.

Файлы:
- `app/page.tsx`
- `components/sections/`
- `components/salon/service-card.tsx`
- `components/salon/master-card.tsx`
- `components/salon/testimonial-card.tsx`
- `components/salon/branch-card.tsx`
- `components/salon/map-tabs.tsx`
- `components/salon/mobile-cta-bar.tsx`
- `components/team/`
- `lib/data/`

Границы:
- не ломать якорные `id`, потому что они связаны с navbar;
- при добавлении/удалении секций согласовывать с Navigation And Scroll;
- проверять, что блоки не блокируют скролл.

## Design System

Назначение: базовые UI-компоненты, layout primitives, визуальный язык, глобальные стили.

Файлы:
- `components/ui/`
- `components/layout/container.tsx`
- `components/layout/section.tsx`
- `components/shared/`
- `app/globals.css`
- `lib/utils.ts`

Границы:
- изменения здесь могут повлиять на весь сайт;
- не добавлять новые абстракции без реальной пользы;
- проверять основные страницы после изменения shared-компонентов.

## Admin And Analytics

Назначение: админка, логин/логаут, summary, аналитические скрипты и внутренние карточки.

Файлы:
- `app/admin/page.tsx`
- `app/api/admin/`
- `components/admin/admin-dashboard.tsx`
- `components/salon/admin-preview-card.tsx`
- `components/site/analytics-scripts.tsx`
- `lib/admin/`
- `lib/analytics.ts`

Границы:
- не смешивать публичную booking-логику с админской;
- проверять auth/API отдельно от публичной главной страницы.

## SEO And Static Pages

Назначение: layout, metadata, robots, sitemap, thank-you/privacy/not-found pages.

Файлы:
- `app/layout.tsx`
- `app/robots.ts`
- `app/sitemap.ts`
- `app/thanks/page.tsx`
- `app/privacy/page.tsx`
- `app/not-found.tsx`
- `lib/site-url.ts`

Границы:
- основной публичный URL всегда `https://test-project-love-nails-kg.vercel.app/`;
- не использовать preview URL как пользовательский результат.

## Assets And Brand

Назначение: изображения бренда, hero, работы, команда, статичные визуалы.

Файлы:
- `public/brand/`
- `public/hero/`
- `public/team/`
- `public/works/`
- `public/visuals/`

Границы:
- не заменять реальные визуалы декоративными заглушками без необходимости;
- проверять вес и отображение изображений на mobile/desktop.

## QA And Deploy

Назначение: тесты, smoke checks, browser QA, Vercel deployment.

Файлы:
- `scripts/smoke-test.mjs`
- `TESTING.md`
- `DEPLOYMENT.md`
- `.vercel/` локально, не коммитить

Правила:
- для сайта после изменений запускать релевантную проверку;
- production-деплой делать только в Vercel project `kwelves/test-project-love-nails-kg`;
- пользователю показывать только `https://test-project-love-nails-kg.vercel.app/`.

## Локальный Tooling

Назначение: Graphify, Codex skills, локальные хуки, временные графы и окружения.

Файлы:
- `.graphifyignore`
- `.codex/`
- `.agents/`
- `.venv-graphify/`
- `graphify-out/`
- `skills-lock.json`

Границы:
- это локальная инфраструктура ускорения работы, а не код сайта;
- generated/vendor файлы tooling не должны создавать шум в git;
- если меняется только tooling, деплой сайта не нужен.
