import type { BookingTimeSlot } from "@/lib/domain/types";

export const bookingTimeSlots: BookingTimeSlot[] = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
].map((time) => ({ label: time, value: time }));

export const masterBookingOptions = [
  { id: "any", name: "Любой свободный мастер" },
  { id: "nazik", name: "Назик" },
  { id: "zharkynai", name: "Жаркынай" },
  { id: "ishengul", name: "Ишенгуль" },
  { id: "aizhan", name: "Айжан" },
  { id: "kumush", name: "Кумуш" },
  { id: "other", name: "Другое / уточнить в WhatsApp" },
] as const;
