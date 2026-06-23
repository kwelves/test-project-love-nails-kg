"use client";

import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { BookingTimeSlot } from "@/lib/domain/types";
import { cn } from "@/lib/utils";

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

interface AppointmentSchedulerProps {
  date: string;
  time: string;
  minDate: string;
  timeSlots: BookingTimeSlot[];
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

export function AppointmentScheduler({
  date,
  time,
  minDate,
  timeSlots,
  onDateChange,
  onTimeChange,
}: AppointmentSchedulerProps) {
  const selectedDate = parseDateValue(date);
  const minimumDate = parseDateValue(minDate);
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(selectedDate ?? minimumDate ?? new Date()));
  const monthStart = visibleMonth;
  const days = buildMonthDays(monthStart);
  const monthLabel = new Intl.DateTimeFormat("ru-RU", {
    month: "long",
    year: "numeric",
  }).format(monthStart);

  const previousMonth = addMonths(monthStart, -1);
  const nextMonth = addMonths(monthStart, 1);
  const canGoPrevious = !minimumDate || endOfMonth(previousMonth) >= startOfDay(minimumDate);

  useEffect(() => {
    setVisibleMonth(startOfMonth(parseDateValue(date) ?? parseDateValue(minDate) ?? new Date()));
  }, [date, minDate]);

  return (
    <div className="rounded-[1.1rem] border border-border bg-background p-3 sm:rounded-[1.25rem] sm:p-4">
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-2 flex items-center justify-between gap-3 sm:mb-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary sm:text-xs">дата</p>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-8 sm:size-9"
                disabled={!canGoPrevious}
                onClick={() => setVisibleMonth(previousMonth)}
                aria-label="Предыдущий месяц"
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-8 sm:size-9"
                onClick={() => setVisibleMonth(nextMonth)}
                aria-label="Следующий месяц"
              >
                <ChevronRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
          <p className="mb-2 text-sm font-semibold capitalize sm:mb-3 sm:text-base">{monthLabel}</p>
          <div className="grid grid-cols-7 gap-1 text-center">
            {weekDays.map((day) => (
              <span key={day} className="py-0.5 text-[10px] font-semibold text-muted-foreground sm:py-1 sm:text-[11px]">
                {day}
              </span>
            ))}
            {days.map((day) => {
              const value = toDateValue(day);
              const isSelected = value === date;
              const isMuted = day.getMonth() !== monthStart.getMonth();
              const isDisabled = minimumDate ? startOfDay(day) < startOfDay(minimumDate) : false;

              return (
                <button
                  key={value}
                  type="button"
                  disabled={isDisabled}
                  aria-pressed={isSelected}
                  className={cn(
                    "flex aspect-square min-h-8 items-center justify-center rounded-lg border border-transparent text-xs font-semibold transition-[background,border-color,color,transform] active:scale-[0.97] sm:min-h-9 sm:rounded-xl sm:text-sm",
                    isMuted && "text-muted-foreground/45",
                    isDisabled && "pointer-events-none text-muted-foreground/25",
                    !isSelected && !isDisabled && "hover:border-primary/20 hover:bg-muted",
                    isSelected && "selected-pop border-primary bg-primary text-primary-foreground",
                  )}
                  onClick={() => onDateChange(value)}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-[1rem] border border-border bg-card p-3 sm:rounded-2xl">
          <div className="mb-2 flex items-center justify-between gap-3 sm:mb-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary sm:text-xs">время</p>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <Clock className="size-3.5" aria-hidden="true" />
              9:00-21:00
            </span>
          </div>
          <div className="grid max-h-[188px] grid-cols-3 gap-1.5 overflow-y-auto pr-1 sm:max-h-[252px] sm:grid-cols-4 sm:gap-2 lg:grid-cols-2">
            {timeSlots.map((slot) => {
              const isSelected = slot.value === time;

              return (
                <Button
                  key={slot.value}
                  type="button"
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  className={cn("w-full", isSelected && "selected-pop ring-2 ring-primary/20 ring-offset-2 ring-offset-card")}
                  onClick={() => onTimeChange(slot.value)}
                >
                  {slot.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function parseDateValue(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) {
    return undefined;
  }

  return new Date(year, month - 1, day);
}

function toDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function buildMonthDays(monthStart: Date) {
  const firstDayIndex = (monthStart.getDay() + 6) % 7;
  const firstVisibleDay = new Date(monthStart);
  firstVisibleDay.setDate(monthStart.getDate() - firstDayIndex);

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(firstVisibleDay);
    day.setDate(firstVisibleDay.getDate() + index);
    return day;
  });
}
