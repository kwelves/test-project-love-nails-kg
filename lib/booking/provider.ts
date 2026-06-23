import { createBookingRecord } from "@/lib/booking/formatters";
import { googleCalendarProvider } from "@/lib/booking/google-calendar";
import { googleSheetsProvider } from "@/lib/booking/google-sheets";
import { mockBookingProvider } from "@/lib/booking/mock-store";
import type { BookingInput, BookingProvider, BookingProviderName, BookingSaveResult } from "@/lib/booking/types";

function getProviderName(): BookingProviderName {
  const raw = process.env.BOOKING_PROVIDER;
  if (raw === "google_sheets" || raw === "google_calendar" || raw === "both" || raw === "mock") {
    return raw;
  }
  return "mock";
}

function getProviders(): BookingProvider[] {
  const providerName = getProviderName();
  if (providerName === "google_sheets") {
    return [mockBookingProvider, googleSheetsProvider];
  }
  if (providerName === "google_calendar") {
    return [mockBookingProvider, googleCalendarProvider];
  }
  if (providerName === "both") {
    return [mockBookingProvider, googleSheetsProvider, googleCalendarProvider];
  }
  return [mockBookingProvider];
}

export async function saveBooking(input: BookingInput): Promise<BookingSaveResult> {
  const booking = createBookingRecord(input);
  const providers = getProviders();
  const providerResults = await Promise.all(providers.map((provider) => provider.saveBooking(booking)));

  return {
    booking,
    providerResults,
  };
}
