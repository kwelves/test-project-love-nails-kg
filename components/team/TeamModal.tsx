"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import type { TeamMember } from "@/components/team/teamData";
import { bookingTimeSlots } from "@/lib/data/booking";
import { salon } from "@/lib/data/salon";
import { services } from "@/lib/data/services";
import { cn } from "@/lib/utils";

interface TeamModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

export function TeamModal({ member, onClose }: TeamModalProps) {
  const serviceOptions = useMemo(() => {
    if (!member) {
      return [];
    }

    return services.filter((service) => member.serviceIds.includes(service.id));
  }, [member]);
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState(() => formatDateValue(new Date()));
  const [time, setTime] = useState("12:00");

  useEffect(() => {
    if (!member) {
      return;
    }

    setServiceId(member.serviceIds[0] ?? "combo-color");
    setDate(formatDateValue(new Date()));
    setTime("12:00");
  }, [member]);

  useEffect(() => {
    if (!member) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [member, onClose]);

  const selectedService = serviceOptions.find((service) => service.id === serviceId) ?? serviceOptions[0];
  const bookingDates = useMemo(() => buildBookingDates(new Date(), 6), []);
  const whatsappUrl = useMemo(() => {
    if (!member) {
      return "#";
    }

    const message = [
      "Здравствуйте!",
      "",
      "Хочу записаться.",
      "",
      `Мастер: ${member.name}`,
      selectedService ? `Услуга: ${selectedService.shortName}` : "",
      `Дата: ${date}`,
      `Время: ${time}`,
      "Подтвердите, пожалуйста, запись.",
    ]
      .filter(Boolean)
      .join("\n");

    return `https://wa.me/${salon.contact.whatsappPhone}?text=${encodeURIComponent(message)}`;
  }, [date, member, selectedService, time]);

  const moveToBooking = () => {
    if (!member) {
      return;
    }

    const url = new URL(window.location.href);
    url.searchParams.set("master", member.id);
    if (selectedService) {
      url.searchParams.set("service", selectedService.id);
    }
    url.searchParams.set("date", date);
    url.searchParams.set("time", time);
    url.hash = "booking";
    window.history.pushState({}, "", url);
    window.dispatchEvent(new CustomEvent("booking-selection-change"));
    onClose();
    window.setTimeout(() => {
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  };

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/28 px-3 pb-3 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-modal-title"
            className="max-h-[92dvh] w-full max-w-5xl overflow-y-auto rounded-[1.75rem] border border-border bg-background shadow-[0_28px_90px_rgb(35_33_36_/_0.16)]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[19rem] bg-[#f4e6dd] md:min-h-full">
                <Image
                  src={member.imageUrl}
                  alt={`${member.name}: ${member.specialty}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover"
                  style={{ objectPosition: member.imagePosition }}
                />
              </div>
              <div className="p-5 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-primary">{member.role}</p>
                    <h2 id="team-modal-title" className="mt-2 text-3xl font-semibold tracking-tight">
                      {member.name}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Закрыть окно мастера"
                    className="tap-motion flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Info label="Стаж" value={member.experience} />
                  <Info label="Специализация" value={member.specialty} />
                </div>

                <p className="mt-6 text-sm leading-6 text-muted-foreground">{member.description}</p>

                <div className="mt-6">
                  <p className="text-sm font-semibold">Сертификаты</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {member.certificates.map((item) => (
                      <span key={item} className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-semibold">Лучшие работы</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {member.bestWorks.map((item) => (
                      <span key={item} className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1.5 text-xs text-primary">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 rounded-[1.25rem] border border-border bg-card p-4 sm:p-5">
                  <p className="text-sm font-semibold">Быстрая запись</p>
                  <div className="mt-4 grid gap-4">
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Услуга</p>
                      <Select value={selectedService?.id ?? serviceId} onChange={(event) => setServiceId(event.target.value)}>
                        {serviceOptions.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.shortName}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Дата</p>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                        {bookingDates.map((item) => (
                          <Button
                            key={item.value}
                            type="button"
                            variant={item.value === date ? "default" : "outline"}
                            size="sm"
                            className={cn("h-auto flex-col gap-0.5 py-2", item.value === date && "selected-pop")}
                            onClick={() => setDate(item.value)}
                          >
                            <span className="text-[11px] opacity-75">{item.weekday}</span>
                            <span>{item.day}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Время</p>
                      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                        {bookingTimeSlots.slice(0, 8).map((slot) => (
                          <Button
                            key={slot.value}
                            type="button"
                            variant={slot.value === time ? "default" : "outline"}
                            size="sm"
                            className={cn(slot.value === time && "selected-pop")}
                            onClick={() => setTime(slot.value)}
                          >
                            {slot.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                    <Button asChild size="lg" className="w-full sm:w-auto">
                      <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={onClose}>
                        <MessageCircle className="size-4" aria-hidden="true" />
                        Записаться к мастеру
                      </a>
                    </Button>
                    <Button type="button" variant="secondary" size="lg" className="w-full sm:w-auto" onClick={moveToBooking}>
                      Открыть полную форму
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
      day: String(date.getDate()).padStart(2, "0"),
    };
  });
}

function Info({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className="rounded-[1.1rem] border border-border bg-card p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}
