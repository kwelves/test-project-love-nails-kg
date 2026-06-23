"use client";

import type { AnalyticsEventName, AnalyticsPayload } from "@/lib/domain/types";

type AnalyticsProvider = "debug" | "ga4" | "yandex_metrica" | "meta_pixel";

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, payload?: AnalyticsPayload) => void;
    ym?: (counterId: string, method: "reachGoal", goal: string, payload?: AnalyticsPayload) => void;
    fbq?: (command: "trackCustom", eventName: string, payload?: AnalyticsPayload) => void;
  }
}

function getEnabledProviders(): AnalyticsProvider[] {
  const providers: AnalyticsProvider[] = ["debug"];
  if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    providers.push("ga4");
  }
  if (process.env.NEXT_PUBLIC_YANDEX_METRICA_ID) {
    providers.push("yandex_metrica");
  }
  if (process.env.NEXT_PUBLIC_META_PIXEL_ID) {
    providers.push("meta_pixel");
  }
  return providers;
}

export function trackEvent(name: AnalyticsEventName, payload: AnalyticsPayload = {}) {
  const providers = getEnabledProviders();

  if (providers.includes("debug") && process.env.NODE_ENV === "development") {
    console.info("[analytics]", name, payload);
  }

  if (providers.includes("ga4") && typeof window.gtag === "function") {
    window.gtag("event", name, payload);
  }

  const yandexId = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;
  if (providers.includes("yandex_metrica") && yandexId && typeof window.ym === "function") {
    window.ym(yandexId, "reachGoal", name, payload);
  }

  if (providers.includes("meta_pixel") && typeof window.fbq === "function") {
    window.fbq("trackCustom", name, payload);
  }

  window.dispatchEvent(
    new CustomEvent("love-nails:analytics", {
      detail: { name, payload },
    }),
  );
}
