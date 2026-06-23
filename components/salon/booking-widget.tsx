"use client";

import { useMemo, useState } from "react";
import { CalendarCheck, CheckCircle2, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";
import { bookingTimeSlots, masterBookingOptions } from "@/lib/data/booking";
import { branches } from "@/lib/data/branches";
import { salon } from "@/lib/data/salon";
import { services } from "@/lib/data/services";
import type { BookingRequest, BranchId } from "@/lib/domain/types";

const today = new Date().toISOString().slice(0, 10);

const initialState: BookingRequest = {
  branchId: "suerkulova",
  serviceId: "combo-color",
  masterId: "any",
  date: today,
  time: "12:00",
  name: "",
  phone: "",
  comment: "",
  consent: false,
  status: "new",
};

interface BookingWidgetProps {
  selectedBranchId?: BranchId;
}

export function BookingWidget({ selectedBranchId }: BookingWidgetProps) {
  const [form, setForm] = useState<BookingRequest>({
    ...initialState,
    branchId: selectedBranchId ?? initialState.branchId,
  });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverWhatsappUrl, setServerWhatsappUrl] = useState("");

  const selectedService = services.find((service) => service.id === form.serviceId);
  const selectedBranch = branches.find((branch) => branch.id === form.branchId);
  const selectedMaster = masterBookingOptions.find((master) => master.id === form.masterId);

  const whatsappMessage = useMemo(() => {
    return [
      "Здравствуйте! Хочу записаться в Love Nails.",
      selectedBranch ? `Филиал: ${selectedBranch.shortName}` : "",
      selectedService ? `Услуга: ${selectedService.shortName}` : "",
      selectedMaster ? `Мастер: ${selectedMaster.name}` : "",
      `Дата: ${form.date}`,
      `Время: ${form.time}`,
      form.name ? `Имя: ${form.name}` : "",
      form.phone ? `Телефон: ${form.phone}` : "",
      form.comment ? `Комментарий: ${form.comment}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }, [form, selectedBranch, selectedMaster, selectedService]);

  const update = <K extends keyof BookingRequest>(key: K, value: BookingRequest[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (key === "branchId") {
      trackEvent("booking_branch_selected", { branch_id: String(value) });
    }
    if (key === "serviceId") {
      trackEvent("booking_service_selected", { service_id: String(value) });
    }
    if (key === "masterId") {
      trackEvent("booking_master_selected", { master_id: String(value), is_any_master: value === "any" });
    }
    if (key === "date") {
      trackEvent("booking_date_selected", { date: String(value) });
    }
    if (key === "time") {
      trackEvent("booking_time_selected", { time: String(value) });
    }
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    trackEvent("booking_submit", {
      branch_id: form.branchId,
      service_id: form.serviceId,
      master_id: form.masterId,
      has_comment: Boolean(form.comment),
    });

    setError("");
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          branchId: form.branchId,
          serviceId: form.serviceId,
          masterId: form.masterId,
          date: form.date,
          time: form.time,
          name: form.name,
          phone: form.phone,
          messenger: "whatsapp",
          comment: form.comment,
          source: "site_booking_widget",
          consentAccepted: form.consent,
        }),
      });
      const data = (await response.json()) as {
        ok: boolean;
        errors?: Record<string, string>;
        booking?: { id: string; whatsappUrl: string };
      };

      if (!response.ok || !data.ok || !data.booking) {
        setFieldErrors(data.errors ?? {});
        const message = data.errors?.form ?? Object.values(data.errors ?? {})[0] ?? "Не удалось отправить заявку.";
        setError(message);
        trackEvent("booking_error", { reason: message });
        return;
      }

      setServerWhatsappUrl(data.booking.whatsappUrl);
      setSubmitted(true);
      trackEvent("booking_success", { delivery_channel: "api", booking_id: data.booking.id, branch_id: form.branchId });
    } catch {
      const message = "Не получилось отправить заявку. Попробуйте еще раз или напишите в WhatsApp.";
      setError(message);
      trackEvent("booking_error", { reason: "network_error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Card className="overflow-hidden p-6 sm:p-8">
        <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="size-7" aria-hidden="true" />
        </div>
        <h3 className="mt-5 text-2xl font-semibold">Заявка собрана</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Это frontend-прототип: заявка не отправлена в реальный backend. Для клиента здесь будет подтверждение,
          а администратор получит данные в CRM, Google Sheets или мессенджер.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <a
              href={serverWhatsappUrl || `https://wa.me/${salon.contact.whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("click_whatsapp", { placement: "booking_success" })}
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Отправить в WhatsApp
            </a>
          </Button>
          <Button variant="secondary" onClick={() => setSubmitted(false)}>
            Изменить заявку
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-border bg-secondary/55 px-4 py-4 sm:px-6">
        <Badge variant="secondary">frontend booking MVP</Badge>
        <h3 className="mt-3 flex items-center gap-2 text-[1.45rem] font-semibold leading-tight sm:text-2xl">
          <CalendarCheck className="size-6 shrink-0 text-primary" aria-hidden="true" />
          Запись в Love Nails
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Выберите филиал, услугу и удобное время. Администратор подтвердит запись.
        </p>
      </div>
      <form className="grid gap-4 p-4 sm:gap-5 sm:p-6" onSubmit={submit} onFocus={() => trackEvent("booking_start")}>
        <div className="rounded-2xl border border-border bg-background p-4">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">выбор</p>
          <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground">Филиал:</span> {selectedBranch?.shortName}
            </p>
            <p>
              <span className="font-semibold text-foreground">Услуга:</span> {selectedService?.shortName}
            </p>
            <p>
              <span className="font-semibold text-foreground">Мастер:</span> {selectedMaster?.name}
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Филиал" error={fieldErrors.branchId}>
            <Select value={form.branchId} onChange={(event) => update("branchId", event.target.value as BranchId)}>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.shortName} - {branch.district}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Услуга" error={fieldErrors.serviceId}>
            <Select value={form.serviceId} onChange={(event) => update("serviceId", event.target.value)}>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.shortName}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Мастер" error={fieldErrors.masterId}>
            <Select value={form.masterId} onChange={(event) => update("masterId", event.target.value)}>
              {masterBookingOptions.map((master) => (
                <option key={master.id} value={master.id}>
                  {master.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Дата" error={fieldErrors.date}>
            <Input value={form.date} min={today} type="date" onChange={(event) => update("date", event.target.value)} />
          </Field>
          <Field label="Время" error={fieldErrors.time}>
            <Select value={form.time} onChange={(event) => update("time", event.target.value)}>
              {bookingTimeSlots.map((slot) => (
                <option key={slot.value} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Имя" error={fieldErrors.name}>
            <Input value={form.name} placeholder="Например, Айгерим" onChange={(event) => update("name", event.target.value)} />
          </Field>
          <Field label="Телефон" error={fieldErrors.phone}>
            <Input
              value={form.phone}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+996 ..."
              onChange={(event) => update("phone", event.target.value)}
            />
          </Field>
          <Field label="Комментарий" className="md:col-span-2">
            <Textarea
              value={form.comment}
              placeholder="Например: нужен френч, снятие или конкретный дизайн"
              onChange={(event) => update("comment", event.target.value)}
            />
          </Field>
        </div>
        <label className="flex items-start gap-3 rounded-2xl border border-border bg-background p-4 text-sm leading-6">
          <Checkbox checked={form.consent} onChange={(event) => update("consent", event.target.checked)} />
          <span>Согласна на обработку данных для подтверждения записи.</span>
        </label>
        {fieldErrors.consentAccepted && <p className="-mt-2 text-sm text-destructive">{fieldErrors.consentAccepted}</p>}
        {error && (
          <p className="rounded-2xl border border-destructive/25 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}
        <div className="flex flex-col gap-3 pb-1 sm:flex-row sm:pb-0">
          <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
            {isSubmitting ? "Отправляем..." : "Отправить заявку"}
          </Button>
          <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
            <a
              href={`https://wa.me/${salon.contact.whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("click_whatsapp", { placement: "booking_form" })}
            >
              Написать в WhatsApp
            </a>
          </Button>
        </div>
      </form>
    </Card>
  );
}

function Field({
  label,
  children,
  className,
  error,
}: Readonly<{ label: string; children: React.ReactNode; className?: string; error?: string }>) {
  return (
    <div className={className}>
      <Label className="mb-2 block">{label}</Label>
      {children}
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}
