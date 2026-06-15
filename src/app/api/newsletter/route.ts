import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    // Sin API key configurada devolvemos éxito para no romper la UI en dev
    return NextResponse.json({ ok: true });
  }

  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      listIds: [Number(process.env.BREVO_LIST_ID ?? "2")],
      updateEnabled: true,
    }),
  });

  if (!res.ok && res.status !== 204) {
    const body = await res.json().catch(() => ({}));
    // Contacto ya existente (código 400 con message duplicado) → lo tratamos como éxito
    if (body?.code === "duplicate_parameter") {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Error al suscribir" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
