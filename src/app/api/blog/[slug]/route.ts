import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getPostFromDB, updatePost, deletePost } from "@/lib/posts";
import { corsHeaders, corsOptions } from "@/lib/cors";

export function OPTIONS() {
  return corsOptions();
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const authed = await isAuthenticated();
  if (!authed) return corsHeaders(NextResponse.json({ error: "No autorizado" }, { status: 401 }));

  const { slug } = await params;
  const post = await getPostFromDB(slug);

  if (!post) {
    return corsHeaders(NextResponse.json({ error: "No encontrado" }, { status: 404 }));
  }

  return corsHeaders(NextResponse.json(post));
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const authed = await isAuthenticated();
  if (!authed) return corsHeaders(NextResponse.json({ error: "No autorizado" }, { status: 401 }));

  const { slug } = await params;
  const { titulo, descripcion, fecha, categoria, contenido } = await req.json();

  const ok = await updatePost(slug, { titulo, descripcion, fecha, categoria, contenido });

  if (!ok) {
    return corsHeaders(NextResponse.json({ error: "Error al guardar" }, { status: 500 }));
  }

  return corsHeaders(NextResponse.json({ ok: true }));
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const authed = await isAuthenticated();
  if (!authed) return corsHeaders(NextResponse.json({ error: "No autorizado" }, { status: 401 }));

  const { slug } = await params;
  const ok = await deletePost(slug);

  if (!ok) {
    return corsHeaders(NextResponse.json({ error: "Error al eliminar" }, { status: 500 }));
  }

  return corsHeaders(NextResponse.json({ ok: true }));
}
