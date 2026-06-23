import type { BookingProvider, BookingProviderResult } from "@/lib/booking/types";
import { formatBookingForGoogleDescription } from "@/lib/booking/formatters";
import { getGoogleAccessToken } from "@/lib/booking/google-auth";
import { makeProviderError } from "@/lib/booking/mock-store";

const calendarScope = "https://www.googleapis.com/auth/calendar.events";

export const googleCalendarProvider: BookingProvider = {
  name: "google_calendar",
  async saveBooking(booking) {
    try {
      const calendarId = process.env.GOOGLE_CALENDAR_ID;
      if (!calendarId) {
        return makeProviderError("google_calendar", "GOOGLE_CALENDAR_ID не задан.");
      }

      const token = await getGoogleAccessToken({
        clientEmail: process.env.GOOGLE_CALENDAR_CLIENT_EMAIL ?? process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        privateKey: process.env.GOOGLE_CALENDAR_PRIVATE_KEY ?? process.env.GOOGLE_SHEETS_PRIVATE_KEY,
        scopes: [calendarScope],
      });

      const start = new Date(`${booking.date}T${booking.time}:00+06:00`);
      const end = new Date(start.getTime() + booking.durationMinutes * 60_000);
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            summary: `Love Nails: ${booking.service} - ${booking.name}`,
            location: `${booking.branch}, ${booking.branchAddress}`,
            description: formatBookingForGoogleDescription(booking),
            start: { dateTime: start.toISOString(), timeZone: "Asia/Bishkek" },
            end: { dateTime: end.toISOString(), timeZone: "Asia/Bishkek" },
          }),
        },
      );

      if (!response.ok) {
        return makeProviderError("google_calendar", `Google Calendar insert failed: ${response.status} ${response.statusText}`);
      }

      const data = (await response.json()) as { id?: string };
      return {
        provider: "google_calendar",
        ok: true,
        externalId: data.id,
        message: "Событие создано в Google Calendar.",
      } satisfies BookingProviderResult;
    } catch (error) {
      return makeProviderError("google_calendar", error instanceof Error ? error.message : "Google Calendar adapter error.");
    }
  },
};
