import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ContactButton } from "@/components/shared/contact-button";
import { branches } from "@/lib/data/branches";
import { salon } from "@/lib/data/salon";
import { services } from "@/lib/data/services";

export function Footer() {
  return (
    <footer id="contacts" className="border-t border-border bg-[#fff9f4] pb-28 pt-10 md:pb-10 md:pt-12">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold">Love Nails</h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{salon.positioning}</p>
            <p className="mt-5 font-medium">{salon.contact.bookingHours}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <ContactButton channel="whatsapp" label="WhatsApp" payload={{ placement: "footer" }} />
              <ContactButton channel="instagram" label="Instagram" variant="secondary" payload={{ placement: "footer" }} />
              {salon.contact.telegramUrl && (
                <ContactButton channel="telegram" label="Telegram" variant="secondary" payload={{ placement: "footer" }} />
              )}
            </div>
          </div>
          <FooterList title="Услуги" items={services.slice(0, 6).map((service) => service.shortName)} />
          <FooterList title="Филиалы" items={branches.map((branch) => branch.shortName)} />
          <div>
            <h3 className="font-semibold">Контакты</h3>
            <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
              <Link href={`tel:${salon.contact.whatsappPhone}`}>{salon.contact.phone}</Link>
              <Link href={salon.contact.instagramUrl} target="_blank" rel="noreferrer">
                {salon.contact.instagramHandle}
              </Link>
              {salon.contact.telegramUrl ? (
                <Link href={salon.contact.telegramUrl} target="_blank" rel="noreferrer">
                  Telegram
                </Link>
              ) : (
                <span>Telegram будет добавлен после подтверждения ссылки</span>
              )}
            </div>
            <p className="mt-5 text-xs leading-5 text-muted-foreground">
              Цены и график мастеров уточняйте при записи.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterList({ title, items }: Readonly<{ title: string; items: string[] }>) {
  return (
    <div>
      <h3 className="font-semibold">{title}</h3>
      <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
