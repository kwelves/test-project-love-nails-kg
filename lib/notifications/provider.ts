import type { BookingRecord, NotificationProviderResult } from "@/lib/booking/types";
import { sendTelegramBookingNotification } from "@/lib/notifications/telegram";

export async function sendBookingNotifications(booking: BookingRecord): Promise<NotificationProviderResult[]> {
  return [await sendTelegramBookingNotification(booking)];
}
