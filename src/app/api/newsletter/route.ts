import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { corsHeaders } from "@/lib/cors";

export async function OPTIONS() {
  return corsHeaders(NextResponse.json({ ok: true }));
}

export async function POST(req: NextRequest) {
  const rateLimit = checkRateLimit(req, "newsletter", 5, 60 * 1000);
  if (!rateLimit.allowed) {
    return corsHeaders(NextResponse.json({ error: "Demasiadas solicitudes. Inténtalo más tarde." }, { status: 429 }));
  }

  let email: string;
  try {
    const body = await req.json();
    email = body?.email;
  } catch {
    return corsHeaders(NextResponse.json({ error: "Body inválido" }, { status: 400 }));
  }

  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return corsHeaders(NextResponse.json({ error: "Email inválido" }, { status: 400 }));
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID ?? "3";

  if (!apiKey) {
    console.warn("[newsletter] BREVO_API_KEY no configurada — devolviendo OK sin registrar");
    return corsHeaders(NextResponse.json({ ok: true }));
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [Number(listId)],
        updateEnabled: true,
      }),
    });

    if (res.ok || res.status === 204) {
      return corsHeaders(NextResponse.json({ ok: true }));
    }

    const body = await res.json().catch(() => ({}));

    // Contacto ya existente → tratar como éxito
    if (body?.code === "duplicate_parameter") {
      return corsHeaders(NextResponse.json({ ok: true }));
    }

    console.error("[newsletter] Brevo error:", res.status, body);
    return corsHeaders(NextResponse.json({ error: "Error al suscribir" }, { status: 500 }));
  } catch (err) {
    console.error("[newsletter] Error de red:", err);
    return corsHeaders(NextResponse.json({ error: "Error de conexión" }, { status: 503 }));
  }
}
