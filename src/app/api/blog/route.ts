import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import fs from "fs";
import path from "path";

const POSTS_DIR = path.join(process.cwd(), "content/blog");

export async function POST(req: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { slug, titulo, descripcion, fecha, categoria, contenido } = await req.json();

  if (!slug || !titulo || !contenido) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }

  const safeSlug = slug.replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");
  const filePath = path.join(POSTS_DIR, `${safeSlug}.md`);

  if (fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Ya existe un artículo con ese slug" }, { status: 409 });
  }

  const frontmatter = [
    "---",
    `titulo: "${titulo}"`,
    `descripcion: "${descripcion ?? ""}"`,
    `fecha: "${fecha ?? new Date().toISOString().split("T")[0]}"`,
    `categoria: "${categoria ?? "Guías"}"`,
    "---\n",
    contenido,
  ].join("\n");

  fs.mkdirSync(POSTS_DIR, { recursive: true });
  fs.writeFileSync(filePath, frontmatter, "utf-8");

  return NextResponse.json({ ok: true, slug: safeSlug });
}
