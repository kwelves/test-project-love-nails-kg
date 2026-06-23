# Testing checklist

Команды:

```bash
npm run lint
npm run typecheck
npm run build
npm run test
```

`npm run test` сейчас выполняет typecheck как минимальную безопасную проверку без добавления тяжелого тестового стека. Для полноценного QA следующим этапом можно добавить Playwright.

## Smoke scenarios

- Главная открывается.
- Отображаются услуги.
- Отображаются филиалы.
- Booking form не отправляется с пустым именем/телефоном/согласием.
- Booking form отправляется с валидными mock data.
- Success state появляется.
- WhatsApp link содержит филиал, услугу, мастера, дату, время, имя, телефон, комментарий.
- Instagram link ведет на `@love_nails_kg`.
- Admin login screen открывается.
- Map buttons присутствуют.

## Accessibility

- Все поля формы имеют label.
- Focus state видим.
- Touch targets на mobile не меньше 44px.
- Motion respects `prefers-reduced-motion`.
- Sticky bottom CTA не перекрывает footer-контент.
