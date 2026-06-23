import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "love_nails_admin_session";
const sessionValue = "admin";

function getSecret() {
  return process.env.ADMIN_PASSWORD || "change-me";
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createAdminSessionToken() {
  return `${sessionValue}.${sign(sessionValue)}`;
}

export function verifyAdminSessionToken(token?: string) {
  if (!token) {
    return false;
  }

  const [value, signature] = token.split(".");
  if (value !== sessionValue || !signature) {
    return false;
  }

  const expected = sign(value);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);

  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(cookieName)?.value);
}

export { cookieName };
