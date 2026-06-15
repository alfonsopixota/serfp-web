import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "dashboard_auth";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  return process.env.DASHBOARD_PASSWORD ?? "";
}

export function createToken(): string {
  const secret = getSecret();
  const payload = JSON.stringify({ iat: Date.now() });
  const signature = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return Buffer.from(`${payload}.${signature}`).toString("base64");
}

export function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const lastDot = decoded.lastIndexOf(".");
    if (lastDot === -1) return false;

    const payload = decoded.slice(0, lastDot);
    const signature = decoded.slice(lastDot + 1);

    const secret = getSecret();
    const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME);
  if (!token) return false;
  return verifyToken(token.value);
}

export function setAuthCookie(): string {
  return createToken();
}

export { COOKIE_NAME, MAX_AGE };
