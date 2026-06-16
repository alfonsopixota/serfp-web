import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { updateTestimonio, deleteTestimonio } from "@/lib/testimonios";
import { corsHeaders, corsOptions } from "@/lib/cors";

export function OPTIONS() {
  return corsOptions();
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authed = await isAuthenticated();
  if (!authed) return corsHeaders(NextResponse.json({ error: "No autorizado" }, { status: 401 }));

  const { id } = await params;
  const body = await req.json();
  const ok = await updateTestimonio(id, body);

  if (!ok) {
    return corsHeaders(NextResponse.json({ error: "Error al actualizar" }, { status: 500 }));
  }

  return corsHeaders(NextResponse.json({ ok: true }));
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authed = await isAuthenticated();
  if (!authed) return corsHeaders(NextResponse.json({ error: "No autorizado" }, { status: 401 }));

  const { id } = await params;
  const ok = await deleteTestimonio(id);

  if (!ok) {
    return corsHeaders(NextResponse.json({ error: "Error al eliminar" }, { status: 500 }));
  }

  return corsHeaders(NextResponse.json({ ok: true }));
}
