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
import { MobileCTABar } from "@/components/salon/mobile-cta-bar";
import { ServiceCard } from "@/components/salon/service-card";
import { TestimonialCard } from "@/components/salon/testimonial-card";
import { TeamSection } from "@/components/sections/TeamSection";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Button } from "@/components/ui/button";
import { branches } from "@/lib/data/branches";
import { galleryItems } from "@/lib/data/gallery";
import { reviews } from "@/lib/data/reviews";
import { salon } from "@/lib/data/salon";
import { services } from "@/lib/data/services";
import { SITE_URL } from "@/lib/site-url";

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
        <section className="relative overflow-hidden bg-[#fffdf9]">
          <Container>
            <div className="grid min-h-[calc(100svh-3.25rem)] items-center gap-9 py-10 sm:min-h-[calc(100svh-3.5rem)] sm:gap-12 sm:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(27rem,0.94fr)] lg:gap-12 lg:py-18 xl:gap-16">
              <div className="max-w-3xl">
                <AnimatedReveal>
                  <div>
                    <h1 className="hero-editorial-title text-[3.15rem] font-normal leading-[0.92] text-foreground min-[390px]:text-[3.7rem] sm:text-[5.2rem] lg:text-[5.85rem]">
                      Место, где <span className="hero-title-accent">Вы</span> в центре внимания
                    </h1>
                    <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground sm:mt-7 sm:text-base sm:leading-7">
                      Маникюр, уход и эстетика в пространстве, где каждая деталь создана для вашего
                      комфорта.
                    </p>
                  </div>
                </AnimatedReveal>
                <AnimatedReveal delay={90}>
                  <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center">
                    <Button asChild size="lg" className="w-full px-7 sm:w-auto">
                      <Link href="#booking">
                        Записаться
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="secondary" className="w-full px-7 sm:w-auto">
                      <Link href="#gallery">Смотреть работы</Link>
                    </Button>
                    <Link
                      href="#about"
                      aria-label="Перейти к разделу о Love Nails KG"
                      className="since-pill"
                    >
                      <span className="since-pill-text since-pill-text-default" aria-hidden="true">
                        SINCE 2016
                      </span>
                      <span className="since-pill-text since-pill-text-about" aria-hidden="true">
                        О нас
                      </span>
                    </Link>
                  </div>
                </AnimatedReveal>
              </div>
              <AnimatedReveal delay={140}>
                <div className="relative mx-auto w-full max-w-[28rem] lg:mx-0 lg:w-full lg:max-w-[34rem] lg:justify-self-end">
                  <div className="relative aspect-[4/5] min-h-[23rem] overflow-hidden rounded-[1.75rem] border border-border/70 bg-[#f4e6dd] shadow-[0_24px_70px_rgb(35_33_36_/_0.11)] sm:min-h-[29rem] sm:rounded-[2rem] lg:aspect-auto lg:h-[34rem] lg:min-h-0">
                    <Image
                      src="/hero/for-hero.jpeg"
                      alt="Мастер Love Nails делает маникюр в светлой студии"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 46vw"
                      className="object-cover object-center transition-transform duration-700 ease-[var(--ease-ui)] hover:scale-[1.025]"
                    />
                  </div>
                </div>
              </AnimatedReveal>
            </div>
          </Container>
        </section>

        <TeamSection />

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

        <Section id="about" eyebrow="почему love nails" title="Не luxury spa, а понятная и аккуратная nail-сеть">
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
          title="Оставьте заявку, а мы уточним детали"
          description="Выберите услугу, филиал и удобное время. Администратор свяжется с вами, подтвердит запись и итоговую стоимость."
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

      </main>
      <Footer />
      <MobileCTABar />
    </>
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
