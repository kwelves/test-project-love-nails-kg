"use client";

import Link from "next/link";
import { CalendarCheck, MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { salon } from "@/lib/data/salon";

export function MobileCTABar() {
  return (
    <div className="mobile-cta-enter safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/94 px-4 pt-3 shadow-[0_-16px_40px_rgb(35_33_36_/_0.08)] backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <Link
          className="button-soft-glow tap-motion inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground"
          href="#booking"
          onClick={() => trackEvent("booking_start", { placement: "mobile_bar" })}
        >
          <CalendarCheck className="size-4" aria-hidden="true" />
          Записаться
        </Link>
        <a
          className="tap-motion inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-secondary px-4 text-sm font-semibold"
          href={`https://wa.me/${salon.contact.whatsappPhone}`}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent("click_whatsapp", { placement: "mobile_bar" })}
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
