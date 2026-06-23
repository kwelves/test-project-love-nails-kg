import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Love Nails Бишкек - маникюр, педикюр, покрытие и наращивание",
    template: "%s | Love Nails KG",
  },
  description:
    "Love Nails - сеть nail-студий в Бишкеке с 2016 года. Маникюр от 500 сом, покрытие от 850 сом, френч, дизайн, педикюр и наращивание. Запись ежедневно с 9:00 до 21:00.",
  openGraph: {
    title: "Love Nails - nail-студии в Бишкеке",
    description:
      "Маникюр, педикюр, покрытие, дизайн и наращивание в удобных филиалах Бишкека.",
    url: "/",
    siteName: "Love Nails KG",
    locale: "ru_KG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Love Nails - nail-студии в Бишкеке",
    description:
      "Маникюр, педикюр, покрытие, дизайн и наращивание в удобных филиалах Бишкека.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fffdf9",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className="surface-noise antialiased">{children}</body>
    </html>
  );
}
