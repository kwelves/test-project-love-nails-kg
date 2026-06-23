import { NextResponse } from "next/server";
import { cookieName, createAdminSessionToken } from "@/lib/admin/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { password?: string };
  const configuredPassword = process.env.ADMIN_PASSWORD;

  if (!configuredPassword || configuredPassword === "change-me") {
    return NextResponse.json(
      { ok: false, message: "ADMIN_PASSWORD не настроен. Задайте переменную окружения перед использованием админки." },
      { status: 503 },
    );
  }

  if (body.password !== configuredPassword) {
    return NextResponse.json({ ok: false, message: "Неверный пароль." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(cookieName, createAdminSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
