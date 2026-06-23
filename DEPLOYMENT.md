# Deployment

Основной URL проекта:

https://test-project-love-nails-kg.vercel.app

Все дальнейшие production-деплои должны идти на этот Vercel project: `kwelves/test-project-love-nails-kg`.

## Vercel env

Минимум:

```bash
NEXT_PUBLIC_SITE_URL=https://test-project-love-nails-kg.vercel.app
NEXT_PUBLIC_SALON_PHONE=+996700188331
NEXT_PUBLIC_WHATSAPP_PHONE=996700188331
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/love_nails_kg/
NEXT_PUBLIC_TELEGRAM_URL=
ADMIN_PASSWORD=strong-password
BOOKING_PROVIDER=mock
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Analytics:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_YANDEX_METRICA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

Google:

```bash
GOOGLE_SHEETS_SPREADSHEET_ID=
GOOGLE_SHEETS_CLIENT_EMAIL=
GOOGLE_SHEETS_PRIVATE_KEY=
GOOGLE_CALENDAR_ID=
GOOGLE_CALENDAR_CLIENT_EMAIL=
GOOGLE_CALENDAR_PRIVATE_KEY=
```

## Deploy

```bash
npm run lint
npm run typecheck
npm run build
npm run smoke
vercel deploy --prod --scope kwelves
```

Перед production-деплоем убедитесь, что preview-деплои не используются как основные ссылки.
