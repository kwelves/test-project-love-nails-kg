import Link from "next/link";
import { ContactButton } from "@/components/shared/contact-button";
import { Container } from "@/components/layout/container";

const navItems = [
  { href: "#services", label: "Услуги" },
  { href: "#branches", label: "Филиалы" },
  { href: "#gallery", label: "Работы" },
  { href: "#booking", label: "Запись" },
  { href: "#contacts", label: "Контакты" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/88 backdrop-blur">
      <Container>
        <div className="flex min-h-15 items-center justify-between gap-3 md:min-h-16">
          <Link href="/" className="text-base font-semibold tracking-tight min-[390px]:text-lg">
            Love Nails
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:block">
            <ContactButton channel="whatsapp" label="WhatsApp" size="sm" payload={{ placement: "header" }} />
          </div>
        </div>
        <nav className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-3 text-sm font-semibold text-muted-foreground [scrollbar-width:none] md:hidden">
          {navItems
            .filter((item) => item.href !== "#booking")
            .map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap rounded-full border border-border bg-card px-3 py-2">
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
