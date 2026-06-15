import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { updateTestimonio, deleteTestimonio } from "@/lib/testimonios";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authed = await isAuthenticated();
  if (!authed) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const ok = await updateTestimonio(id, body);

  if (!ok) {
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authed = await isAuthenticated();
  if (!authed) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  const ok = await deleteTestimonio(id);

  if (!ok) {
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
