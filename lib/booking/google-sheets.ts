import type { BookingProvider, BookingProviderResult } from "@/lib/booking/types";
import { getGoogleAccessToken } from "@/lib/booking/google-auth";
import { makeProviderError } from "@/lib/booking/mock-store";

const sheetsScope = "https://www.googleapis.com/auth/spreadsheets";

export const googleSheetsProvider: BookingProvider = {
  name: "google_sheets",
  async saveBooking(booking) {
    try {
      const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
      if (!spreadsheetId) {
        return makeProviderError("google_sheets", "GOOGLE_SHEETS_SPREADSHEET_ID не задан.");
      }

      const token = await getGoogleAccessToken({
        clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
        scopes: [sheetsScope],
      });

      const values = [
        [
          booking.createdAt,
          booking.branch,
          booking.branchAddress,
          booking.serviceCategory,
          booking.service,
          booking.master,
          booking.date,
          booking.time,
          booking.duration,
          booking.name,
          booking.phone,
          booking.messenger,
          booking.comment,
          booking.status,
          booking.source,
          booking.consentAccepted ? "yes" : "no",
        ],
      ];

      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Bookings!A:P:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({ values }),
        },
      );

      if (!response.ok) {
        return makeProviderError("google_sheets", `Google Sheets append failed: ${response.status} ${response.statusText}`);
      }

      const data = (await response.json()) as { updates?: { updatedRange?: string } };
      return {
        provider: "google_sheets",
        ok: true,
        externalId: data.updates?.updatedRange,
        message: "Заявка добавлена в Google Sheets.",
      } satisfies BookingProviderResult;
    } catch (error) {
      return makeProviderError("google_sheets", error instanceof Error ? error.message : "Google Sheets adapter error.");
    }
  },
};
