# Love Nails KG

Практически production-ready MVP сайта Love Nails KG: clean beauty / modern nail studio / soft editorial, с типизированными данными, server-side booking API, provider adapters для Google Sheets/Calendar, SEO base, tracking layer и admin MVP.

## Стек

- Next.js App Router
- TypeScript strict
- Tailwind CSS v4 через CSS variables
- shadcn-style локальные UI-компоненты
- Server Components по умолчанию
- Client Components только для интерактива: booking, maps, admin, analytics clicks

## Команды

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
npm run test
```

Локально сайт будет доступен на `http://localhost:3000`.

## Env

Скопируйте `.env.example` в `.env.local` и заполните значения:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SALON_PHONE=+996700188331
NEXT_PUBLIC_WHATSAPP_PHONE=996700188331
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/love_nails_kg/
NEXT_PUBLIC_TELEGRAM_URL=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_YANDEX_METRICA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
ADMIN_PASSWORD=change-me
BOOKING_PROVIDER=mock
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
GOOGLE_SHEETS_SPREADSHEET_ID=
GOOGLE_SHEETS_CLIENT_EMAIL=
GOOGLE_SHEETS_PRIVATE_KEY=
GOOGLE_CALENDAR_ID=
GOOGLE_CALENDAR_CLIENT_EMAIL=
GOOGLE_CALENDAR_PRIVATE_KEY=
```

`ADMIN_PASSWORD` используется server-side через `/api/admin/login` и httpOnly cookie. Это MVP-auth без ролей, rate limiting и базы пользователей.

## Архитектура

- `app/page.tsx` - главная страница.
- `app/admin/page.tsx` - mock admin dashboard.
- `app/api/booking/route.ts` - server-side booking API.
- `app/api/admin/*` - login/logout/summary для admin MVP.
- `app/globals.css` - дизайн-токены: цвета, радиусы, тени, focus states, motion tokens.
- `components/ui` - shadcn-style primitives: Button, Badge, Card, Input, Select, Textarea.
- `components/salon` - доменные компоненты Love Nails: ServiceCard, BranchCard, BookingWidget, MapTabs, MasterCard.
- `components/layout` - Container и Section.
- `lib/domain/types.ts` - типы Branch, Service, Master, BookingRequest, AnalyticsEvent.
- `lib/booking` - validation, provider router, mock-store, Google Sheets/Calendar adapters.
- `lib/admin/auth.ts` - MVP cookie auth для `/admin`.
- `lib/data` - типизированный контент салона, филиалов, услуг, мастеров, отзывов, галереи и booking options.
- `lib/analytics.ts` - `trackEvent(name, payload)` с provider abstraction для GA4, Yandex Metrica и Meta Pixel.

## BookingWidget

`BookingWidget` собирает:

- филиал;
- услугу;
- мастера;
- дату;
- время;
- имя;
- телефон;
- комментарий;
- согласие.

Submit отправляет данные в `/api/booking`. На сервере проверяются обязательные поля, кыргызский телефон, дата, время и согласие. В `BOOKING_PROVIDER=mock` заявка сохраняется в in-memory mock-store. WhatsApp-кнопка формирует предзаполненное сообщение с выбранными данными. Все ключевые шаги вызывают tracking events.

## Booking providers

```bash
BOOKING_PROVIDER=mock
BOOKING_PROVIDER=google_sheets
BOOKING_PROVIDER=google_calendar
BOOKING_PROVIDER=both
```

Mock работает сразу. Google adapters требуют env и ручную настройку доступа. См. [GOOGLE_SETUP.md](./GOOGLE_SETUP.md).

## Notifications

Для Telegram-уведомлений о новых заявках задайте `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`.
Если значения пустые, заявка сохраняется без ошибки, а уведомление помечается как skipped.

## Mock admin

`/admin` содержит server-side login и редактирование:

- салон;
- филиалы;
- услуги;
- мастера;
- контакты;
- карты;
- hero;
- акции;
- SEO preview.

Изменения контента пока сохраняются в `localStorage`. Dashboard summary подтягивается через `/api/admin/summary`. Это не полноценная CMS, но UI не завязан жестко на один будущий storage.

## SEO и tracking

- Metadata, OpenGraph, Twitter card, canonical, sitemap, robots.
- JSON-LD `BeautySalon` / локальные филиалы / hasMap / sameAs Instagram.
- Локальные SEO-тексты для маникюр Бишкек, педикюр Бишкек, nail studio Бишкек, гель лак, френч, наращивание.
- Tracking events не ломают сайт без analytics IDs.

## Deployment

Основной URL:

https://test-project-love-nails-kg.vercel.app

См. [DEPLOYMENT.md](./DEPLOYMENT.md).

## Testing

См. [TESTING.md](./TESTING.md).

## Данные на подтверждение владельцем

- Филиалы, адреса, этажи, ссылки карт и embed.
- Прайс и длительность услуг.
- Мастера, статусы, филиалы и специализации.
- Реальные фото работ.
- Telegram URL, если канал нужен публично.
- Google credentials и права доступа.

## Этап 3

- Перенос admin storage из localStorage в CMS/database.
- Реальные Google Sheets/Calendar credentials.
- WhatsApp/Telegram уведомления.
- Privacy/thanks страницы и smoke-тест перед деплоем.
- QA на реальных mobile/tablet/desktop.
- SEO polish: реальные координаты и филиальные страницы.
- Подключение домена.
