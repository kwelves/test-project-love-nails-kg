import { branches } from "@/lib/data/branches";
import { masterBookingOptions } from "@/lib/data/booking";
import { salon } from "@/lib/data/salon";
import { services } from "@/lib/data/services";
import type { BookingInput, BookingRecord } from "@/lib/booking/types";
import { formatDuration } from "@/lib/utils";

export function normalizeKgPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("996") && digits.length === 12) {
    return `+${digits}`;
  }
  if (digits.startsWith("0") && digits.length === 10) {
    return `+996${digits.slice(1)}`;
  }
  if (digits.length === 9) {
    return `+996${digits}`;
  }
  return phone.trim();
}

export function buildWhatsappMessage(booking: Pick<BookingRecord, "branch" | "service" | "master" | "date" | "time" | "name" | "phone" | "comment">) {
  return [
    "Здравствуйте! Хочу записаться в Love Nails.",
    `Филиал: ${booking.branch}`,
    `Услуга: ${booking.service}`,
    `Мастер: ${booking.master}`,
    `Дата: ${booking.date}`,
    `Время: ${booking.time}`,
    `Имя: ${booking.name}`,
    `Телефон: ${booking.phone}`,
    booking.comment ? `Комментарий: ${booking.comment}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildWhatsappUrl(booking: Pick<BookingRecord, "branch" | "service" | "master" | "date" | "time" | "name" | "phone" | "comment">) {
  return `https://wa.me/${salon.contact.whatsappPhone}?text=${encodeURIComponent(buildWhatsappMessage(booking))}`;
}

export function createBookingRecord(input: BookingInput): BookingRecord {
  const branch = branches.find((item) => item.id === input.branchId);
  const service = services.find((item) => item.id === input.serviceId);
  const master = masterBookingOptions.find((item) => item.id === input.masterId);

  if (!branch || !service || !master) {
    throw new Error("Не удалось собрать запись: филиал, услуга или мастер не найдены.");
  }

  const durationMinutes = service.durationToMinutes ?? service.durationFromMinutes ?? 90;
  const booking: BookingRecord = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    branch: branch.shortName,
    branchAddress: `${branch.address}, ${branch.floorRoom}`,
    serviceCategory: service.category,
    service: service.shortName,
    master: master.name,
    date: input.date,
    time: input.time,
    duration: formatDuration(service.durationFromMinutes, service.durationToMinutes),
    durationMinutes,
    name: input.name.trim(),
    phone: normalizeKgPhone(input.phone),
    messenger: input.messenger,
    comment: input.comment.trim(),
    status: "new",
    source: input.source,
    consentAccepted: input.consentAccepted,
    whatsappUrl: "",
  };

  return {
    ...booking,
    whatsappUrl: buildWhatsappUrl(booking),
  };
}

export function formatBookingForGoogleDescription(booking: BookingRecord) {
  return [
    `Телефон: ${booking.phone}`,
    `Услуга: ${booking.service}`,
    `Мастер: ${booking.master}`,
    `Дата: ${booking.date}`,
    `Время: ${booking.time}`,
    booking.comment ? `Комментарий: ${booking.comment}` : "Комментарий: -",
    `Источник: ${booking.source}`,
    `WhatsApp: ${booking.whatsappUrl}`,
  ].join("\n");
}
