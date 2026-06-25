"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TeamMember } from "@/components/team/teamData";
import { bookingTimeSlots } from "@/lib/data/booking";
import { salon } from "@/lib/data/salon";
import { services } from "@/lib/data/services";
import { cn } from "@/lib/utils";

interface TeamDetailsPanelProps {
  member: TeamMember;
  onClose: () => void;
}

export function TeamDetailsPanel({ member, onClose }: TeamDetailsPanelProps) {
  const serviceOptions = services.filter((service) => member.serviceIds.includes(service.id));
  const [activeWork, setActiveWork] = useState(0);
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [openStep, setOpenStep] = useState<"date" | "time" | null>("date");
  const [showHint, setShowHint] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const dates = useMemo(() => buildBookingDates(new Date(), 10), []);
  const selectedService = serviceOptions.find((service) => service.id === serviceId);
  const isReady = Boolean(selectedService && date && time);
  const currentWork = member.workImages[activeWork] ?? member.imageUrl;

  const moveWork = (direction: 1 | -1) => {
    setActiveWork((current) => (current + direction + member.workImages.length) % member.workImages.length);
  };

  const handleTouchEnd = (clientX: number) => {
    if (touchStart === null) {
      return;
    }

    const delta = touchStart - clientX;
    if (Math.abs(delta) > 32) {
      moveWork(delta > 0 ? 1 : -1);
    }
    setTouchStart(null);
  };

  const whatsappMessage = [
    "Здравствуйте! Хочу записаться в Love Nails.",
    "",
    `Мастер: ${member.name}`,
    selectedService ? `Услуга: ${selectedService.shortName}` : "",
    date ? `Дата: ${date}` : "",
    time ? `Время: ${time}` : "",
    "",
    "Подскажите, пожалуйста, доступно ли это время?",
  ]
    .filter(Boolean)
    .join("\n");
  const whatsappUrl = `https://wa.me/${salon.contact.whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleContinue = () => {
    if (!isReady) {
      setShowHint(true);
      return;
    }

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      id="team-details"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      className="mt-5 overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-[0_18px_52px_rgb(35_33_36_/_0.08)] sm:mt-7"
    >
      <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="border-b border-border/70 p-4 sm:p-5 lg:border-b-0 lg:border-r">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary">{member.role}</p>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight">{member.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{member.description}</p>
            </div>
            <button
              type="button"
              className="tap-motion flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground"
              aria-label="Закрыть подробности мастера"
              onClick={onClose}
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold">Работы мастера</p>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  className="tap-motion flex size-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground"
                  aria-label="Предыдущая работа"
                  onClick={() => moveWork(-1)}
                >
                  <ChevronLeft className="size-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="tap-motion flex size-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground"
                  aria-label="Следующая работа"
                  onClick={() => moveWork(1)}
                >
                  <ChevronRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div
              className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-[#f4e6dd]"
              onTouchStart={(event) => setTouchStart(event.touches[0]?.clientX ?? null)}
              onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
            >
              <Image src={currentWork} alt={`Работа мастера ${member.name}`} fill sizes="(max-width: 1024px) 92vw, 36vw" className="object-cover" />
            </div>
            <div className="mt-2 grid grid-cols-5 gap-1.5">
              {member.workImages.map((work, index) => (
                <button
                  key={work}
                  type="button"
                  aria-label={`Показать работу ${index + 1}`}
                  aria-pressed={index === activeWork}
                  data-active={index === activeWork}
                  className="relative aspect-square overflow-hidden rounded-lg border border-border bg-background data-[active=true]:border-primary data-[active=true]:ring-2 data-[active=true]:ring-primary/15"
                  onClick={() => setActiveWork(index)}
                >
                  <Image src={work} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div>
            <p className="text-sm font-semibold">Выберите услугу</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {serviceOptions.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  aria-pressed={service.id === serviceId}
                  data-active={service.id === serviceId}
                  className="tap-motion rounded-full border border-border bg-background px-3.5 py-2 text-sm font-semibold text-muted-foreground data-[active=true]:border-primary data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                  onClick={() => {
                    setServiceId(service.id);
                    setShowHint(false);
                  }}
                >
                  {service.shortName}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              data-active={openStep === "date"}
              className="tap-motion rounded-[1.25rem] border border-border bg-background p-4 text-left data-[active=true]:border-primary/35 data-[active=true]:shadow-[0_10px_30px_rgb(142_31_63_/_0.08)]"
              onClick={() => setOpenStep(openStep === "date" ? null : "date")}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Дата</span>
              <span className="mt-2 block text-lg font-semibold">{date || "Выбрать дату"}</span>
            </button>
            <button
              type="button"
              data-active={openStep === "time"}
              className="tap-motion rounded-[1.25rem] border border-border bg-background p-4 text-left data-[active=true]:border-primary/35 data-[active=true]:shadow-[0_10px_30px_rgb(142_31_63_/_0.08)]"
              onClick={() => setOpenStep(openStep === "time" ? null : "time")}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Время</span>
              <span className="mt-2 block text-lg font-semibold">{time || "Выбрать время"}</span>
            </button>
          </div>

          {openStep === "date" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 rounded-[1.25rem] border border-border bg-background p-3 sm:p-4"
            >
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {dates.map((item) => (
                  <Button
                    key={item.value}
                    type="button"
                    variant={item.value === date ? "default" : "outline"}
                    className={cn("h-auto flex-col gap-1 py-3", item.value === date && "selected-pop")}
                    onClick={() => {
                      setDate(item.value);
                      setOpenStep("time");
                      setShowHint(false);
                    }}
                  >
                    <span className="text-xs opacity-75">{item.weekday}</span>
                    <span>{item.label}</span>
                  </Button>
                ))}
              </div>
            </motion.div>
          )}

          {openStep === "time" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 rounded-[1.25rem] border border-border bg-background p-3 sm:p-4"
            >
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {bookingTimeSlots.map((slot) => (
                  <Button
                    key={slot.value}
                    type="button"
                    variant={slot.value === time ? "default" : "outline"}
                    className={cn(slot.value === time && "selected-pop")}
                    onClick={() => {
                      setTime(slot.value);
                      setOpenStep(null);
                      setShowHint(false);
                    }}
                  >
                    {slot.label}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}

          {(showHint || !isReady) && (
            <p className="mt-4 rounded-[1rem] border border-border bg-background px-3 py-2.5 text-sm leading-6 text-muted-foreground">
              Выберите услугу, дату и время, чтобы подготовить запись.
            </p>
          )}

          <Button type="button" size="lg" className="mt-5 w-full sm:w-auto" disabled={!isReady} onClick={handleContinue}>
            <MessageCircle className="size-4" aria-hidden="true" />
            Продолжить в WhatsApp
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function formatDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function buildBookingDates(startDate: Date, count: number) {
  const weekdayFormatter = new Intl.DateTimeFormat("ru-RU", { weekday: "short" });

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    return {
      value: formatDateValue(date),
      weekday: weekdayFormatter.format(date).replace(".", ""),
      label: new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "short" }).format(date),
    };
  });
}
