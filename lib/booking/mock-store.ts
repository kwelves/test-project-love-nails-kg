import type { BookingProvider, BookingProviderResult, BookingRecord } from "@/lib/booking/types";

const bookingStore: BookingRecord[] = [];

export const mockBookingProvider: BookingProvider = {
  name: "mock",
  async saveBooking(booking) {
    bookingStore.unshift(booking);
    return {
      provider: "mock",
      ok: true,
      externalId: booking.id,
      message: "Заявка сохранена в mock-store. На Vercel это временное in-memory хранение.",
    };
  },
};

export function listMockBookings() {
  return [...bookingStore];
}

export function getBookingStats() {
  const today = new Date().toISOString().slice(0, 10);
  return {
    total: bookingStore.length,
    new: bookingStore.filter((booking) => booking.status === "new").length,
    today: bookingStore.filter((booking) => booking.date === today).length,
  };
}

export function makeProviderError(provider: BookingProviderResult["provider"], message: string): BookingProviderResult {
  return {
    provider,
    ok: false,
    message,
  };
}
