"use client";

import Link from "next/link";
import { Instagram, MessageCircle, Send } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { salon } from "@/lib/data/salon";
import type { AnalyticsPayload } from "@/lib/domain/types";

interface ContactButtonProps extends Omit<ButtonProps, "children"> {
  channel: "whatsapp" | "instagram" | "telegram";
  label?: string;
  message?: string;
  payload?: AnalyticsPayload;
}

export function ContactButton({ channel, label, message, payload, ...props }: ContactButtonProps) {
  const href =
    channel === "whatsapp"
      ? `https://wa.me/${salon.contact.whatsappPhone}?text=${encodeURIComponent(
          message ?? "Здравствуйте! Хочу записаться в Love Nails.",
        )}`
      : channel === "instagram"
        ? salon.contact.instagramUrl
        : salon.contact.telegramUrl || "#";

  const Icon = channel === "whatsapp" ? MessageCircle : channel === "instagram" ? Instagram : Send;
  const text = label ?? (channel === "whatsapp" ? "WhatsApp" : channel === "instagram" ? "Instagram" : "Telegram");

  return (
    <Button
      asChild
      onClick={() =>
        trackEvent(
          channel === "whatsapp" ? "click_whatsapp" : channel === "instagram" ? "click_instagram" : "click_telegram",
          payload,
        )
      }
      {...props}
    >
      <Link href={href} target={href === "#" ? undefined : "_blank"} rel="noreferrer">
        <Icon className="size-4" aria-hidden="true" />
        {text}
      </Link>
    </Button>
  );
}
