import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { setAuthCookie, COOKIE_NAME, MAX_AGE } from "@/lib/auth";
import { verifyPassword } from "@/lib/password";

export async function POST(req: NextRequest) {
  const rateLimit = checkRateLimit(req, "login", 10, 15 * 60 * 1000);
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Demasiados intentos. Espera 15 minutos." }, { status: 429 });
  }

  const { password } = await req.json();
  const storedPassword = process.env.DASHBOARD_PASSWORD;

  if (!storedPassword) {
    return NextResponse.json({ error: "Dashboard no configurado" }, { status: 500 });
  }

  const isValid = storedPassword.includes(":")
    ? verifyPassword(password, storedPassword)
    : password === storedPassword;

  if (!isValid) {
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }

  const token = setAuthCookie();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });

  return response;
}
