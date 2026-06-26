"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { Section } from "@/components/layout/section";
import { SmoothAnchor } from "@/components/shared/smooth-anchor";
import { salon } from "@/lib/data/salon";
import { cn } from "@/lib/utils";

interface PopularQuestion {
  id: string;
  question: string;
  answer: string;
  ctaLabel: string;
  ctaHref: string;
  isExternal?: boolean;
}

const whatsappUrl = `https://wa.me/${salon.contact.whatsappPhone}`;

const popularQuestions: PopularQuestion[] = [
  {
    id: "services",
    question: "Какие услуги можно выбрать?",
    answer:
      "У нас можно выбрать маникюр без покрытия, комби + цвет, комби + дизайн, френч, Fix price, педикюр + SPA и наращивание.",
    ctaLabel: "Посмотреть услуги",
    ctaHref: "#services",
  },
  {
    id: "price",
    question: "Сколько стоит маникюр?",
    answer: "Стоимость лучше смотреть как «цена от». Итог зависит от дизайна, снятия, укрепления и состояния ногтей.",
    ctaLabel: "Уточним точную цену при подтверждении",
    ctaHref: "#booking",
  },
  {
    id: "fix-price",
    question: "Что такое Fix price?",
    answer: "Это сценарий для тех, кто хочет заранее понимать бюджет. Если нужен именно он, укажите это в заявке.",
    ctaLabel: "Написать «Fix price» в заявке",
    ctaHref: "#booking",
  },
  {
    id: "branch-master",
    question: "Можно выбрать филиал и мастера?",
    answer: "Да, можно выбрать удобный филиал и конкретного мастера или любого свободного.",
    ctaLabel: "Выбрать филиал и мастера",
    ctaHref: "#booking",
  },
  {
    id: "booking-channel",
    question: "Как лучше записаться: через форму или WhatsApp?",
    answer: "Форма удобнее для полной заявки, WhatsApp - для быстрых уточнений и фото-референсов.",
    ctaLabel: "Отправить референс в WhatsApp",
    ctaHref: `${whatsappUrl}?text=${encodeURIComponent("Здравствуйте! Хочу отправить фото-референс для записи в Love Nails.")}`,
    isExternal: true,
  },
  {
    id: "confirmation",
    question: "Запись сразу подтверждена?",
    answer: "Нет. Сначала приходит заявка, затем администратор подтверждает дату, время, мастера и точную стоимость.",
    ctaLabel: "Мы напишем после заявки",
    ctaHref: "#booking",
  },
  {
    id: "design",
    question: "Как уточнить дизайн?",
    answer: "Опишите идею в комментарии или отправьте фото-референс в WhatsApp после заявки.",
    ctaLabel: "Можно отправить фото",
    ctaHref: `${whatsappUrl}?text=${encodeURIComponent("Здравствуйте! Хочу уточнить дизайн и отправить фото-референс.")}`,
    isExternal: true,
  },
  {
    id: "hours",
    question: "В какое время принимаете заявки?",
    answer: "Принимаем заявки ежедневно. Точное окно ответа лучше уточнять в чате.",
    ctaLabel: "Написать в WhatsApp",
    ctaHref: whatsappUrl,
    isExternal: true,
  },
  {
    id: "late",
    question: "Что если я опаздываю или нужно перенести запись?",
    answer: "Лучше сразу написать администратору. Если времени на услугу не хватит, запись могут перенести.",
    ctaLabel: "Предупредить заранее",
    ctaHref: `${whatsappUrl}?text=${encodeURIComponent("Здравствуйте! Хочу предупредить по поводу моей записи.")}`,
    isExternal: true,
  },
  {
    id: "payment",
    question: "Как оплатить?",
    answer: "Способ оплаты лучше уточнить при подтверждении записи.",
    ctaLabel: "Уточнить у администратора",
    ctaHref: whatsappUrl,
    isExternal: true,
  },
  {
    id: "safety-child",
    question: "Безопасно ли это и можно ли прийти с ребёнком?",
    answer:
      "В работе делается акцент на стерильные инструменты. Если планируете прийти с ребёнком, лучше согласовать это заранее в чате.",
    ctaLabel: "Согласовать заранее",
    ctaHref: `${whatsappUrl}?text=${encodeURIComponent("Здравствуйте! Хочу согласовать детали визита в Love Nails.")}`,
    isExternal: true,
  },
];

const desktopQuestionColumns = [
  popularQuestions.filter((_, index) => index % 2 === 0),
  popularQuestions.filter((_, index) => index % 2 === 1),
];

export function PopularQuestionsSection() {
  const [openItemId, setOpenItemId] = useState<string>(popularQuestions[0]?.id ?? "");

  return (
    <Section
      id="popular-questions"
      className="scroll-mt-28 bg-[#fff9f4] py-6 sm:py-8 md:scroll-mt-20"
      headerClassName="mb-4 max-w-2xl sm:mb-5"
      titleClassName="text-[1.45rem] leading-tight min-[390px]:text-[1.65rem] sm:text-[2.25rem]"
      descriptionClassName="max-w-xl sm:mt-2 sm:text-base sm:leading-6"
      eyebrow="популярные вопросы"
      title="Популярные вопросы"
      description="Коротко о записи, цене и дизайне - чтобы выбрать удобное окно без лишней переписки."
    >
      <div className="grid gap-2.5 md:hidden">
        {popularQuestions.map((item) => (
          <QuestionItem
            key={item.id}
            item={item}
            layoutId="mobile"
            isOpen={openItemId === item.id}
            onToggle={() => setOpenItemId((current) => (current === item.id ? "" : item.id))}
          />
        ))}
      </div>

      <div className="hidden gap-3 md:grid md:grid-cols-2 md:items-start">
        {desktopQuestionColumns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-3">
            {column.map((item) => (
              <QuestionItem
                key={item.id}
                item={item}
                layoutId={`desktop-${columnIndex}`}
                isOpen={openItemId === item.id}
                onToggle={() => setOpenItemId((current) => (current === item.id ? "" : item.id))}
              />
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}

function QuestionItem({
  item,
  layoutId,
  isOpen,
  onToggle,
}: Readonly<{
  item: PopularQuestion;
  layoutId: string;
  isOpen: boolean;
  onToggle: () => void;
}>) {
  const triggerId = `popular-question-trigger-${layoutId}-${item.id}`;
  const panelId = `popular-question-panel-${layoutId}-${item.id}`;

  return (
    <article className="overflow-hidden rounded-[1.25rem] border border-border bg-card/92 shadow-[0_12px_36px_rgb(35_33_36_/_0.055)] transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-ui)] hover:border-primary/20 hover:shadow-[0_16px_42px_rgb(35_33_36_/_0.08)]">
      <h3>
        <button
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex min-h-13 w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold leading-5 text-foreground transition-colors duration-200 ease-[var(--ease-ui)] hover:text-primary focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-primary/35 sm:min-h-14 sm:px-5"
          onClick={onToggle}
        >
          <span className="min-w-0 text-pretty">{item.question}</span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-primary transition-transform duration-300 ease-[var(--ease-ui)] motion-reduce:transition-none",
              isOpen ? "rotate-180" : "rotate-0",
            )}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!isOpen}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-ui)] motion-reduce:transition-none",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-4 pb-4 pt-0 sm:px-5 sm:pb-5">
            <p className="text-sm leading-6 text-muted-foreground">{item.answer}</p>
            {isOpen && <QuestionCta item={item} />}
          </div>
        </div>
      </div>
    </article>
  );
}

function QuestionCta({ item }: Readonly<{ item: PopularQuestion }>) {
  const className =
    "mt-3 inline-flex min-h-9 items-center gap-2 rounded-full border border-primary/15 bg-background/70 px-3.5 py-2 text-xs font-semibold text-primary transition-[background-color,border-color,color,transform] duration-200 ease-[var(--ease-ui)] hover:border-primary/30 hover:bg-secondary active:scale-[0.98] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-primary/35";

  if (item.isExternal) {
    return (
      <a href={item.ctaHref} target="_blank" rel="noreferrer" className={className}>
        <MessageCircle className="size-3.5" aria-hidden="true" />
        <span>{item.ctaLabel}</span>
      </a>
    );
  }

  return (
    <SmoothAnchor href={item.ctaHref} className={className}>
      <span>{item.ctaLabel}</span>
    </SmoothAnchor>
  );
}
