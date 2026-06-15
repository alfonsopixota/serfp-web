import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { createPost } from "@/lib/posts";

export async function POST(req: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { slug, titulo, descripcion, fecha, categoria, contenido } = await req.json();

  if (!slug || !titulo || !contenido) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }

  const safeSlug = slug.replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");

  const ok = await createPost({
    slug: safeSlug,
    titulo,
    descripcion: descripcion ?? "",
    fecha: fecha ?? new Date().toISOString().split("T")[0],
    categoria: categoria ?? "Guías",
    contenido,
  });

  if (!ok) {
    return NextResponse.json({ error: "Error al crear artículo" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, slug: safeSlug });
}
