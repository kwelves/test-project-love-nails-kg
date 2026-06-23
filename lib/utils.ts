import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(service: { priceFrom?: number; priceTo?: number; priceNote?: string }) {
  if (service.priceFrom && service.priceTo) {
    return `от ${service.priceFrom}-${service.priceTo} сом`;
  }

  if (service.priceFrom) {
    return `от ${service.priceFrom} сом`;
  }

  return service.priceNote ?? "уточняется";
}

export function formatDuration(from?: number, to?: number) {
  if (!from && !to) {
    return "время уточняется";
  }

  const render = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0 && mins > 0) {
      return `${hours} ч ${mins} мин`;
    }
    if (hours > 0) {
      return `${hours} ч`;
    }
    return `${mins} мин`;
  };

  if (from && to && from !== to) {
    return `${render(from)} - ${render(to)}`;
  }

  return render(from ?? to ?? 0);
}
