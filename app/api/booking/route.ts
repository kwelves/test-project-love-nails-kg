import { NextResponse } from "next/server";
import { saveBooking } from "@/lib/booking/provider";
import { validateBookingPayload } from "@/lib/booking/validators";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { form: "Некорректный JSON в запросе." } },
      { status: 400 },
    );
  }

  const validation = validateBookingPayload(payload);
  if (!validation.ok) {
    return NextResponse.json({ ok: false, errors: validation.errors }, { status: 400 });
  }

  try {
    const result = await saveBooking(validation.data);
    return NextResponse.json({ ok: true, ...result }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        errors: {
          form: error instanceof Error ? error.message : "Не удалось сохранить заявку.",
        },
      },
      { status: 500 },
    );
  }
}
