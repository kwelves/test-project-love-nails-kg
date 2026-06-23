import type { BookingRecord, NotificationProviderResult } from "@/lib/booking/types";

function formatTelegramBookingMessage(booking: BookingRecord) {
  return [
    "New Love Nails booking",
    `ID: ${booking.id}`,
    `Branch: ${booking.branch}`,
    `Address: ${booking.branchAddress}`,
    `Service: ${booking.service}`,
    `Master: ${booking.master}`,
    `Date: ${booking.date}`,
    `Time: ${booking.time}`,
    `Name: ${booking.name}`,
    `Phone: ${booking.phone}`,
    `Messenger: ${booking.messenger}`,
    booking.comment ? `Comment: ${booking.comment}` : "Comment: -",
    `Source: ${booking.source}`,
    `WhatsApp: ${booking.whatsappUrl}`,
  ].join("\n");
}

export async function sendTelegramBookingNotification(booking: BookingRecord): Promise<NotificationProviderResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return {
      provider: "telegram",
      ok: true,
      skipped: true,
      message: "Telegram notification skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set.",
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatTelegramBookingMessage(booking),
        disable_web_page_preview: true,
      }),
      signal: controller.signal,
    });
    const data = (await response.json().catch(() => null)) as { ok?: boolean; result?: { message_id?: number }; description?: string } | null;

    if (!response.ok || !data?.ok) {
      return {
        provider: "telegram",
        ok: false,
        message: data?.description ?? `Telegram API returned ${response.status}.`,
      };
    }

    return {
      provider: "telegram",
      ok: true,
      externalId: data.result?.message_id ? String(data.result.message_id) : undefined,
    };
  } catch (error) {
    return {
      provider: "telegram",
      ok: false,
      message: error instanceof Error ? error.message : "Telegram notification failed.",
    };
  } finally {
    clearTimeout(timeout);
  }
}
