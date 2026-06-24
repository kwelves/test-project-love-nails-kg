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
import { Button } from "@/components/ui/button";
import { branches } from "@/lib/data/branches";
import { galleryItems } from "@/lib/data/gallery";
import { masters } from "@/lib/data/masters";
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
        <section className="relative overflow-hidden bg-[#fffdf9]">
          <Container>
            <div className="flex min-h-[calc(100svh-3.25rem)] flex-col justify-end pb-8 pt-20 sm:min-h-[calc(100svh-3.5rem)] sm:pb-12 sm:pt-28 lg:pb-16">
              <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
                <AnimatedReveal>
                  <h1 className="hero-editorial-title max-w-3xl text-[3.4rem] font-normal leading-[0.92] text-foreground min-[390px]:text-[4rem] sm:text-[5.6rem] lg:text-[6.4rem]">
                    Место, где Вы в центре внимания
                  </h1>
                </AnimatedReveal>
                <AnimatedReveal delay={90}>
                  <div className="flex flex-col gap-3 pb-1 sm:flex-row lg:justify-start lg:pb-4">
                    <Button asChild size="lg" className="w-full px-7 sm:w-auto">
                      <Link href="#booking">
                        Записаться
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="secondary" className="w-full px-7 sm:w-auto">
                      <Link href="#gallery">Смотреть работы</Link>
                    </Button>
                  </div>
                </AnimatedReveal>
              </div>
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

function InfoCard({ icon, title, text }: Readonly<{ icon: React.ReactNode; title: string; text: string }>) {
  return (
    <div className="motion-card rounded-[1.25rem] border border-border bg-card p-4 sm:p-5">
      <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary sm:size-11">{icon}</div>
      <p className="mt-3 font-semibold sm:mt-4">{title}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}
