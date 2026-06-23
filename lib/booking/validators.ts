import { branches } from "@/lib/data/branches";
import { masterBookingOptions } from "@/lib/data/booking";
import { services } from "@/lib/data/services";
import { isAvailableBookingTime, isPastBookingDate } from "@/lib/booking/availability";
import type { BookingInput, Messenger, ValidationFailure, ValidationResult } from "@/lib/booking/types";

const branchIds = new Set<string>(branches.map((branch) => branch.id));
const serviceIds = new Set(services.map((service) => service.id));
const masterIds = new Set<string>(masterBookingOptions.map((master) => master.id));
const messengers = new Set<Messenger>(["whatsapp", "instagram", "telegram", "phone"]);

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function isValidKgPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return /^996[2579]\d{8}$/.test(digits) || /^0[2579]\d{8}$/.test(digits) || /^[2579]\d{8}$/.test(digits);
}

export function validateBookingPayload(payload: unknown): ValidationResult<BookingInput> | ValidationFailure {
  const raw = typeof payload === "object" && payload !== null ? (payload as Record<string, unknown>) : {};
  const errors: Record<string, string> = {};

  const branchId = readString(raw.branchId);
  const serviceId = readString(raw.serviceId);
  const masterId = readString(raw.masterId);
  const date = readString(raw.date);
  const time = readString(raw.time);
  const name = readString(raw.name);
  const phone = readString(raw.phone);
  const messenger = readString(raw.messenger) || "whatsapp";
  const comment = readString(raw.comment);
  const source = readString(raw.source) || "site";
  const consentAccepted = raw.consentAccepted === true;

  if (!branchIds.has(branchId)) {
    errors.branchId = "Выберите филиал.";
  }
  if (!serviceIds.has(serviceId)) {
    errors.serviceId = "Выберите услугу.";
  }
  if (!masterIds.has(masterId)) {
    errors.masterId = "Выберите мастера или любого свободного мастера.";
  }
  if (!date) {
    errors.date = "Выберите дату.";
  } else if (isPastBookingDate(date)) {
    errors.date = "Дата записи не может быть в прошлом.";
  }
  if (!isAvailableBookingTime(time)) {
    errors.time = "Выберите доступное время записи.";
  }
  if (!name || name.length < 2) {
    errors.name = "Введите имя.";
  }
  if (!phone || !isValidKgPhone(phone)) {
    errors.phone = "Введите корректный телефон Кыргызстана.";
  }
  if (!messengers.has(messenger as Messenger)) {
    errors.messenger = "Выберите корректный способ связи.";
  }
  if (!consentAccepted) {
    errors.consentAccepted = "Нужно согласие на обработку данных.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      branchId: branchId as BookingInput["branchId"],
      serviceId,
      masterId,
      date,
      time,
      name,
      phone,
      messenger: messenger as Messenger,
      comment,
      source,
      consentAccepted,
    },
  };
}
