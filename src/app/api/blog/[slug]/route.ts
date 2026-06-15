import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getPost } from "@/lib/posts";
import { buildFrontmatter } from "@/lib/frontmatter";
import fs from "fs";
import path from "path";

const POSTS_DIR = path.join(process.cwd(), "content/blog");

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const authed = await isAuthenticated();
  if (!authed) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { slug } = await params;

  try {
    const post = getPost(slug);
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const authed = await isAuthenticated();
  if (!authed) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { slug } = await params;
  const filePath = path.join(POSTS_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Artículo no encontrado" }, { status: 404 });
  }

  const { titulo, descripcion, fecha, categoria, contenido } = await req.json();

  const frontmatter = buildFrontmatter({
    titulo: titulo ?? "",
    descripcion: descripcion ?? "",
    fecha: fecha ?? new Date().toISOString().split("T")[0],
    categoria: categoria ?? "Guías",
  });

  fs.writeFileSync(filePath, frontmatter + contenido, "utf-8");
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const authed = await isAuthenticated();
  if (!authed) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { slug } = await params;
  const filePath = path.join(POSTS_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Artículo no encontrado" }, { status: 404 });
  }

  fs.unlinkSync(filePath);
  return NextResponse.json({ ok: true });
}
