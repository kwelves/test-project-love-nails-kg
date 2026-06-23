import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Button } from "@/components/ui/button";
import { salon } from "@/lib/data/salon";

export const metadata: Metadata = {
  title: "Заявка принята",
  description: "Спасибо за заявку в Love Nails KG.",
};

export default function ThanksPage() {
  const message = encodeURIComponent("Здравствуйте! Я оставила заявку на сайте Love Nails. Хочу уточнить запись.");

  return (
    <>
      <Header />
      <main className="py-12 sm:py-20">
        <Container className="max-w-3xl">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="size-7" aria-hidden="true" />
          </div>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-5xl">Спасибо, заявка принята</h1>
          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
            Администратор Love Nails KG свяжется с вами, чтобы подтвердить филиал, услугу и время записи.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href={`https://wa.me/${salon.contact.whatsappPhone}?text=${message}`} target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" aria-hidden="true" />
                Написать в WhatsApp
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/">Вернуться на сайт</Link>
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
