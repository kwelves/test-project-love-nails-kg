# Google Sheets и Google Calendar

Проект готов к интеграции с Google API без хранения service account JSON в репозитории.

## 1. Service account

1. Создайте проект в Google Cloud.
2. Включите Google Sheets API и Google Calendar API.
3. Создайте Service Account.
4. Скачайте JSON только локально и перенесите значения в env.
5. Не коммитьте JSON-файл.

## 2. Google Sheets

Env:

```bash
BOOKING_PROVIDER=google_sheets
GOOGLE_SHEETS_SPREADSHEET_ID=...
GOOGLE_SHEETS_CLIENT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

В таблице создайте лист `Bookings`. Адаптер добавляет строки в диапазон `Bookings!A:P`.

Колонки:

`createdAt, branch, branchAddress, serviceCategory, service, master, date, time, duration, name, phone, messenger, comment, status, source, consentAccepted`

Дайте service account доступ Editor к Google Sheet.

## 3. Google Calendar

Env:

```bash
BOOKING_PROVIDER=google_calendar
GOOGLE_CALENDAR_ID=...
GOOGLE_CALENDAR_CLIENT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_CALENDAR_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Если хотите использовать те же credentials, что и Sheets, можно не задавать `GOOGLE_CALENDAR_CLIENT_EMAIL` и `GOOGLE_CALENDAR_PRIVATE_KEY`: адаптер возьмет значения Sheets.

Дайте service account доступ к календарю.

## 4. Both

```bash
BOOKING_PROVIDER=both
```

В этом режиме заявка сохраняется в mock-store, отправляется в Google Sheets и создает событие Calendar. Если Google env не настроен, API вернет результат mock и понятные ошибки provider-ов.
