import { bookingTimeSlots } from "@/lib/data/booking";

const availableTimes = new Set(bookingTimeSlots.map((slot) => slot.value));

export function isAvailableBookingTime(time: string) {
  return availableTimes.has(time);
}

export function isPastBookingDate(date: string) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const selected = new Date(`${date}T00:00:00`);

  if (Number.isNaN(selected.getTime())) {
    return true;
  }

  return selected < today;
}
