import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { salon } from "@/lib/data/salon";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Как Love Nails KG использует данные, которые клиент оставляет при записи.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="py-12 sm:py-20">
        <Container className="max-w-3xl">
          <Link href="/" className="text-sm font-semibold text-primary">
            На главную
          </Link>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-5xl">Политика конфиденциальности</h1>
          <div className="mt-8 grid gap-6 text-sm leading-7 text-muted-foreground sm:text-base">
            <p>
              Эта страница описывает, какие данные используются при записи в Love Nails KG. Финальный юридический текст
              должен быть подтвержден владельцем бизнеса перед запуском на основном домене.
            </p>
            <section>
              <h2 className="text-xl font-semibold text-foreground">Какие данные собираются</h2>
              <p className="mt-3">
                При отправке заявки сайт получает имя, телефон, выбранный филиал, услугу, мастера, дату, время,
                комментарий и источник заявки. Эти данные нужны только для обработки и подтверждения записи.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">Как используются данные</h2>
              <p className="mt-3">
                Данные передаются администратору Love Nails KG и могут сохраняться в Google Sheets, Google Calendar или
                внутреннем журнале заявок, если соответствующая интеграция включена.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">Аналитика</h2>
              <p className="mt-3">
                Сайт может использовать GA4, Yandex Metrica и Meta Pixel, если владелец добавил соответствующие
                идентификаторы. Аналитика помогает понимать, какие страницы и кнопки приводят к записи.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-foreground">Контакты</h2>
              <p className="mt-3">
                По вопросам обработки данных можно написать в Instagram {salon.contact.instagramHandle} или позвонить по
                номеру {salon.contact.phone}.
              </p>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
