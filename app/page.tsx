import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Check, Clock, MapPin, Sparkles } from "lucide-react";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { ContactButton } from "@/components/shared/contact-button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { BranchCard } from "@/components/salon/branch-card";
import { BookingWidget } from "@/components/salon/booking-widget";
import { MapTabs } from "@/components/salon/map-tabs";
import { MasterCard } from "@/components/salon/master-card";
import { MobileCTABar } from "@/components/salon/mobile-cta-bar";
import { ServiceCard } from "@/components/salon/service-card";
import { TestimonialCard } from "@/components/salon/testimonial-card";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { branches } from "@/lib/data/branches";
import { galleryItems } from "@/lib/data/gallery";
import { masters } from "@/lib/data/masters";
import { reviews } from "@/lib/data/reviews";
import { salon } from "@/lib/data/salon";
import { services } from "@/lib/data/services";
import { SITE_URL } from "@/lib/site-url";

const facts = ["с 2016 года", "3 филиала", "запись 9:00-21:00", "цены от 500 сом"];

const whyItems = [
  "Несколько филиалов, чтобы выбрать точку рядом с домом, работой или учебой.",
  "Цены от и примерная длительность помогают решить до переписки.",
  "Можно выбрать мастера или любого свободного, если важнее ближайшее время.",
  "Запись через форму, WhatsApp или Instagram без обязательного звонка.",
  "Акцент на аккуратность, гигиену и реальные работы вместо стоковых лиц.",
  "Достаточно широкий список услуг: от clean manicure до дизайна и наращивания.",
];

const faqItems = [
  {
    title: "Запись сразу финальная?",
    text: "Нет. Администратор подтверждает дату, время, мастера и точную стоимость после заявки.",
  },
  {
    title: "Цена может измениться?",
    text: "В карточках указана цена от. Итог зависит от дизайна, снятия, укрепления и состояния ногтей.",
  },
  {
    title: "Можно выбрать мастера?",
    text: "Да, в форме можно выбрать конкретного мастера или любого свободного на ближайшее время.",
  },
  {
    title: "Как уточнить дизайн?",
    text: "Опишите идею в комментарии или отправьте референс в WhatsApp после заявки.",
  },
  {
    title: "Что если я опаздываю?",
    text: "Лучше сразу написать администратору. Если времени на услугу не хватит, запись могут перенести.",
  },
  {
    title: "Какой канал быстрее?",
    text: "Форма собирает все данные сразу, а WhatsApp удобен для быстрых уточнений и фото-референсов.",
  },
];

export default function Home() {
  const visibleMasters = masters.filter((master) => master.isActive).slice(0, 8);
  const siteUrl = SITE_URL;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "Love Nails",
    url: siteUrl,
    telephone: salon.contact.phone,
    description:
      "Love Nails - сеть nail-студий в Бишкеке: маникюр, педикюр, гель лак, френч, дизайн и наращивание ногтей.",
    priceRange: "от 500 сом",
    areaServed: "Бишкек",
    openingHours: "Mo-Su 09:00-21:00",
    sameAs: [salon.contact.instagramUrl],
    hasMap: branches.map((branch) => branch.fallbackMapLink ?? branch.mapLinks["2gis"]),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги Love Nails",
      itemListElement: services
        .filter((service) => service.isActive)
        .map((service) => ({
          "@type": "Offer",
          name: service.name,
          price: service.priceFrom,
          priceCurrency: "KGS",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            serviceType: service.category,
          },
        })),
    },
    department: branches.map((branch) => ({
      "@type": "BeautySalon",
      name: `Love Nails ${branch.shortName}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${branch.address}, ${branch.floorRoom}`,
        addressLocality: "Бишкек",
        addressCountry: "KG",
      },
      hasMap: branch.fallbackMapLink ?? branch.mapLinks["2gis"],
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <section className="relative overflow-hidden pb-7 pt-5 sm:py-16 lg:py-20">
          <Container>
            <div className="grid items-center gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
              <AnimatedReveal>
                <div>
                  <Badge variant="secondary">{salon.positioning}</Badge>
                  <h1 className="mt-3 max-w-4xl text-[2.08rem] font-semibold leading-[1.04] tracking-tight min-[390px]:text-[2.35rem] sm:mt-5 sm:text-6xl lg:text-7xl">
                    Love Nails - nail-студии в Бишкеке с 2016 года
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8">
                    Маникюр, педикюр, покрытие, дизайн и наращивание в удобных филиалах. Выберите филиал,
                    услугу и мастера - администратор подтвердит запись.
                  </p>
                  <div className="mt-5 hidden flex-col gap-3 sm:mt-8 sm:flex sm:flex-row">
                    <Button asChild size="lg" className="w-full sm:w-auto">
                      <Link href="#booking">
                        Записаться
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    </Button>
                    <ContactButton
                      channel="whatsapp"
                      label="Написать в WhatsApp"
                      variant="secondary"
                      size="lg"
                      className="w-full sm:w-auto"
                      payload={{ placement: "hero" }}
                    />
                  </div>
                  <div className="mt-4 flex flex-col gap-3 sm:hidden">
                    <Button asChild size="lg" variant="secondary" className="w-full">
                      <Link href="#services">
                        Посмотреть услуги
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-8 sm:grid-cols-4 sm:gap-3">
                    {facts.map((fact) => (
                      <div key={fact} className="rounded-2xl border border-border bg-card px-3 py-2.5 sm:px-4 sm:py-3">
                        <p className="font-mono text-[11px] font-semibold text-primary min-[390px]:text-xs sm:text-sm">{fact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedReveal>
              <AnimatedReveal delay={120}>
                <div className="soft-float-slow grid grid-cols-[0.82fr_1.18fr] gap-2.5 sm:gap-4">
                  <div className="flex flex-col gap-2.5 sm:gap-4">
                    <HeroMiniCard title="Fix price" text="от 850 сом" />
                    <HeroMiniCard title="Direct / WhatsApp" text="9:00-21:00" dark />
                  </div>
                  <div className="rounded-[1.35rem] border border-border bg-card p-1.5 shadow-soft sm:rounded-[2rem] sm:p-3">
                    <div className="relative min-h-[218px] overflow-hidden rounded-[1rem] bg-[#f4e6dd] min-[390px]:min-h-[244px] sm:min-h-[420px] sm:rounded-[1.5rem]">
                      <Image
                        src="/visuals/berry.svg"
                        alt="Berry nail placeholder"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </AnimatedReveal>
            </div>
          </Container>
        </section>

        <Section
          id="services"
          eyebrow="услуги"
          title="Цены от, длительность и быстрый выбор"
          description="Карточки сделаны разным ритмом: популярные предложения заметнее, уточняемые услуги честно отмечены."
        >
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <AnimatedReveal key={service.id}>
                <ServiceCard service={service} featured={service.isHighlighted} />
              </AnimatedReveal>
            ))}
          </div>
        </Section>

        <Section
          id="branches"
          className="bg-[#fff9f4]"
          eyebrow="филиалы"
          title="Выберите филиал рядом с вами"
          description="Адреса заложены как редактируемые данные. В админке их можно будет включать, отключать и обновлять."
        >
          <div className="grid gap-4 lg:grid-cols-3">
            {branches.map((branch) => (
              <BranchCard key={branch.id} branch={branch} />
            ))}
          </div>
        </Section>

        <Section eyebrow="почему love nails" title="Не luxury spa, а понятная и аккуратная nail-сеть">
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
            {whyItems.map((item) => (
              <div key={item} className="motion-card rounded-[1.25rem] border border-border bg-card p-5">
                <Check className="mb-4 size-5 text-primary" aria-hidden="true" />
                <p className="text-sm leading-6 text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="gallery"
          className="bg-[#fff9f4]"
          eyebrow="работы"
          title="Реальные работы в мягкой, чистой эстетике"
          description="Нюд, френч, аккуратная форма и деликатный дизайн. Секция показывает направление студии без визуального шума и лишней ретуши."
        >
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className="motion-card group overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-soft"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f4e6dd]">
                  <Image
                    src={item.imageUrl}
                    alt={`${item.title}: ${item.description}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={index < 2}
                    className="object-cover transition-transform duration-500 ease-[var(--ease-ui)] group-hover:scale-[1.035]"
                  />
                </div>
                <div className="p-4">
                  <p className="font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.tone}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground/85">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <ContactButton
              channel="instagram"
              label="Смотреть работы в Instagram"
              variant="secondary"
              payload={{ placement: "gallery" }}
            />
          </div>
        </Section>

        <Section
          id="booking"
          eyebrow="онлайн-запись"
          title="Форма собирает все, что администратору нужно для подтверждения"
          description="Это frontend MVP: submit показывает success state, WhatsApp получает предзаполненное сообщение."
        >
          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
            <BookingWidget />
            <div className="grid content-start gap-4">
              <InfoCard icon={<CalendarCheck className="size-5" />} title="Заявка не финальная бронь" text="Администратор подтверждает дату, время, мастера и точную стоимость." />
              <InfoCard icon={<Clock className="size-5" />} title="Запись ежедневно" text="Direct и WhatsApp принимают заявки с 9:00 до 21:00." />
              <InfoCard icon={<Sparkles className="size-5" />} title="Можно уточнить дизайн" text="Комментарий в форме помогает подготовиться к френчу, снятию, укреплению или nail art." />
            </div>
          </div>
        </Section>

        <Section
          id="faq"
          className="bg-[#fff9f4]"
          eyebrow="перед записью"
          title="Коротко о цене, времени и подтверждении"
          description="Эти ответы снимают самые частые вопросы до переписки и помогают быстрее выбрать удобное окно."
        >
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
            {faqItems.map((item) => (
              <AnimatedReveal key={item.title}>
                <div className="motion-card h-full rounded-[1.25rem] border border-border bg-card p-4 sm:p-5">
                  <Check className="mb-3 size-5 text-primary sm:mb-4" aria-hidden="true" />
                  <p className="font-semibold">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
                </div>
              </AnimatedReveal>
            ))}
          </div>
        </Section>

        <Section eyebrow="мастера" title="Мастера, которых можно выбрать в заявке">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {visibleMasters.map((master) => (
              <MasterCard key={master.id} master={master} />
            ))}
          </div>
        </Section>

        <Section className="bg-[#fff9f4]" eyebrow="карты" title="Маршруты в 2ГИС и Яндекс.Картах">
          <MapTabs />
        </Section>

        <Section eyebrow="отзывы" title="Темы, которые важны клиентам">
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-5">
            {reviews.map((review) => (
              <TestimonialCard key={review.id} review={review} />
            ))}
          </div>
        </Section>

        <Section
          eyebrow="локальный поиск"
          title="Маникюр и педикюр в Бишкеке рядом с вами"
          description="Love Nails помогает быстро выбрать салон маникюра в Бишкеке: маникюр рядом, педикюр, гель лак, френч и наращивание ногтей без лишней переписки. Выберите филиал, посмотрите цену от и оставьте заявку на удобное время."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <InfoCard icon={<Sparkles className="size-5" />} title="Маникюр Бишкек" text="Базовый уход, покрытие, френч и дизайн для повседневного аккуратного результата." />
            <InfoCard icon={<Clock className="size-5" />} title="Педикюр Бишкек" text="Педикюр с SPA, покрытием и дизайном с ориентиром по времени до записи." />
            <InfoCard icon={<MapPin className="size-5" />} title="Nail studio Бишкек" text="Филиалы в 3 мкр / Орто-Сай, Beta Stores и Восток-5." />
          </div>
        </Section>

        <Section
          id="contacts"
          className="bg-foreground text-background"
          eyebrow="контакты"
          title="Готовы записаться или уточнить детали?"
          description="Выберите форму, WhatsApp или Instagram. Точную цену и график мастеров администратор подтвердит при записи."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {branches.map((branch) => (
              <div key={branch.id} className="motion-card rounded-[1.25rem] border border-background/10 bg-background/5 p-5">
                <MapPin className="mb-4 size-5 text-[#f3c9d5]" aria-hidden="true" />
                <p className="font-semibold">{branch.shortName}</p>
                <p className="mt-2 text-sm leading-6 text-background/70">
                  {branch.address}, {branch.floorRoom}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
      <MobileCTABar />
    </>
  );
}

function HeroMiniCard({ title, text, dark = false }: Readonly<{ title: string; text: string; dark?: boolean }>) {
  return (
    <div className={`rounded-[1.1rem] border p-3 sm:rounded-[1.5rem] sm:p-5 ${dark ? "border-foreground bg-foreground text-background" : "border-border bg-card"}`}>
      <p className={`text-xs sm:text-sm ${dark ? "text-background/65" : "text-muted-foreground"}`}>{title}</p>
      <p className={`mt-2 text-lg font-semibold sm:mt-4 sm:text-2xl ${dark ? "text-background" : ""}`}>{text}</p>
    </div>
  );
}

function InfoCard({ icon, title, text }: Readonly<{ icon: React.ReactNode; title: string; text: string }>) {
  return (
    <div className="motion-card rounded-[1.25rem] border border-border bg-card p-4 sm:p-5">
      <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary sm:size-11">{icon}</div>
      <p className="mt-3 font-semibold sm:mt-4">{title}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}
