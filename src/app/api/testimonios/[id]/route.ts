import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getAllTestimonios, writeTestimonios, Testimonio } from "@/lib/testimonios";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authed = await isAuthenticated();
  if (!authed) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const data = getAllTestimonios();
  const index = data.findIndex((t: Testimonio) => t.id === id);

  if (index === -1) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  data[index] = { ...data[index], ...body };
  writeTestimonios(data);
  return NextResponse.json(data[index]);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authed = await isAuthenticated();
  if (!authed) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  const data = getAllTestimonios();
  const filtered = data.filter((t: Testimonio) => t.id !== id);

  if (filtered.length === data.length) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  writeTestimonios(filtered);
  return NextResponse.json({ ok: true });
}
