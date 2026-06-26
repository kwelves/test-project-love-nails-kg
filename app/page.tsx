import Image from "next/image";
import { ArrowRight, CalendarCheck, Check, Clock, Sparkles } from "lucide-react";
import { AnimatedReveal } from "@/components/shared/animated-reveal";
import { ContactButton } from "@/components/shared/contact-button";
import { SmoothAnchor } from "@/components/shared/smooth-anchor";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { BranchCard } from "@/components/salon/branch-card";
import { BookingWidget } from "@/components/salon/booking-widget";
import { MapTabs } from "@/components/salon/map-tabs";
import { MobileCTABar } from "@/components/salon/mobile-cta-bar";
import { ServiceCard } from "@/components/salon/service-card";
import { TestimonialCard } from "@/components/salon/testimonial-card";
import { PopularQuestionsSection } from "@/components/sections/PopularQuestionsSection";
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
  "С 2016 года выстроили понятный сервис, где важны порядок, спокойствие и внимание к клиенту.",
  "Без лишнего пафоса: мягкая beauty-атмосфера, чистая эстетика и дружелюбное общение.",
  "Аккуратность в деталях чувствуется в форме, покрытии, гигиене и комфорте во время процедуры.",
  "Живой сервис помогает спокойно уточнить детали, отправить референс и выбрать удобный формат записи.",
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
                      <SmoothAnchor href="#booking">
                        Записаться
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </SmoothAnchor>
                    </Button>
                    <Button asChild size="lg" variant="secondary" className="w-full px-7 sm:w-auto">
                      <SmoothAnchor href="#gallery">Смотреть работы</SmoothAnchor>
                    </Button>
                    <SmoothAnchor
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
                    </SmoothAnchor>
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
          description="Выберите базовый уход, покрытие, дизайн или наращивание. Итоговую стоимость и удобное время администратор подтвердит при записи."
        >
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
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
          description="Выберите удобный филиал Love Nails в Бишкеке - рядом с домом, работой или делами."
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
          className="py-6 sm:py-10"
          eyebrow="онлайн-запись"
          title="Оставьте заявку — мы уточним детали"
          description="Выберите услугу, филиал и удобное время. Администратор свяжется с вами и подтвердит запись."
          headerClassName="mb-3 max-w-2xl sm:mb-4"
          titleClassName="sm:text-[2.35rem] sm:leading-[1.06]"
          descriptionClassName="max-w-xl sm:mt-2 sm:text-base sm:leading-6"
        >
          <div className="grid gap-2.5">
            <BookingWidget />
            <div className="grid gap-2.5 md:grid-cols-3">
              <InfoCard icon={<CalendarCheck className="size-5" />} title="Подтверждаем в чате" text="Администратор уточнит детали после заявки." />
              <InfoCard icon={<Clock className="size-5" />} title="Можно отправить референс" text="Дизайн и идеи удобно обсудить в WhatsApp." />
              <InfoCard icon={<Sparkles className="size-5" />} title="Ответим в рабочее время" text="Заявки принимаются ежедневно." />
            </div>
          </div>
        </Section>

        <PopularQuestionsSection />

        <Section className="bg-[#fff9f4]" eyebrow="карты" title="Маршруты в 2ГИС и Яндекс.Картах">
          <MapTabs />
        </Section>

        <Section eyebrow="опыт клиента" title="Что ценят наши клиенты">
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-5">
            {reviews.map((review) => (
              <TestimonialCard key={review.id} review={review} />
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
    <div className="motion-card flex gap-3 rounded-[1rem] border border-border bg-card p-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">{icon}</div>
      <div>
        <p className="text-sm font-semibold leading-5">{title}</p>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
