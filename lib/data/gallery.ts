import type { GalleryItem } from "@/lib/domain/types";

export const galleryItems: GalleryItem[] = [
  {
    id: "nude",
    title: "Nude",
    tone: "молочный nude",
    description: "Чистый оттенок на каждый день",
    imageUrl: "/visuals/nude.svg",
  },
  {
    id: "french",
    title: "French",
    tone: "тонкая линия",
    description: "Аккуратный френч без перегруза",
    imageUrl: "/visuals/french.svg",
  },
  {
    id: "berry",
    title: "Berry",
    tone: "глубокий лак",
    description: "Акцентный berry для уверенного образа",
    imageUrl: "/visuals/berry.svg",
  },
  {
    id: "minimal-art",
    title: "Minimal art",
    tone: "минимальный дизайн",
    description: "Небольшой акцент на 1-4 ногтя",
    imageUrl: "/visuals/minimal-art.svg",
  },
  {
    id: "clean",
    title: "Clean manicure",
    tone: "чистая форма",
    description: "Маникюр без лишних деталей",
    imageUrl: "/visuals/clean.svg",
  },
  {
    id: "extension",
    title: "Extension",
    tone: "форма и длина",
    description: "Плейсхолдер для работ по наращиванию",
    imageUrl: "/visuals/extension.svg",
  },
];
