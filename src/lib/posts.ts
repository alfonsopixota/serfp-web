import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { getSupabase } from "./supabase";

const POSTS_DIR = path.join(process.cwd(), "content/blog");

export interface PostMeta {
  slug: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  categoria: string;
  imagen?: string;
  tiempoLectura: string;
}

export interface Post extends PostMeta {
  contenido: string;
}

export function getAllPosts(): PostMeta[] {
  try {
    const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

    return files
      .map((file) => {
        const slug = file.replace(/\.md$/, "");
        const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
        const { data, content } = matter(raw);
        return {
          slug,
          titulo: data.titulo,
          descripcion: data.descripcion,
          fecha: data.fecha,
          categoria: data.categoria,
          imagen: data.imagen ?? null,
          tiempoLectura: readingTime(content).text.replace("read", "lectura"),
        } as PostMeta;
      })
      .sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
  } catch {
    return [];
  }
}

export function getPost(slug: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    titulo: data.titulo,
    descripcion: data.descripcion,
    fecha: data.fecha,
    categoria: data.categoria,
    imagen: data.imagen ?? null,
    tiempoLectura: readingTime(content).text.replace("read", "lectura"),
    contenido: content,
  };
}

// --- Supabase CRUD ---

export async function getAllPostsFromDB(): Promise<PostMeta[]> {
  const { data, error } = await getSupabase()
    .from("blog_posts")
    .select("*")
    .order("fecha", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    slug: row.slug,
    titulo: row.titulo,
    descripcion: row.descripcion,
    fecha: row.fecha,
    categoria: row.categoria,
    imagen: row.imagen ?? null,
    tiempoLectura: readingTime(row.contenido).text.replace("read", "lectura"),
  }));
}

export async function getPostFromDB(slug: string): Promise<Post | null> {
  const { data, error } = await getSupabase()
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;

  return {
    slug: data.slug,
    titulo: data.titulo,
    descripcion: data.descripcion,
    fecha: data.fecha,
    categoria: data.categoria,
    imagen: data.imagen ?? null,
    tiempoLectura: readingTime(data.contenido).text.replace("read", "lectura"),
    contenido: data.contenido,
  };
}

export async function createPost(post: Omit<PostMeta, "tiempoLectura"> & { contenido: string }): Promise<boolean> {
  const { error } = await getSupabase().from("blog_posts").insert({
    slug: post.slug,
    titulo: post.titulo,
    descripcion: post.descripcion,
    fecha: post.fecha,
    categoria: post.categoria,
    contenido: post.contenido,
  });
  return !error;
}

export async function updatePost(slug: string, post: Partial<Post> & { contenido?: string }): Promise<boolean> {
  const { error } = await getSupabase()
    .from("blog_posts")
    .update({
      titulo: post.titulo,
      descripcion: post.descripcion,
      fecha: post.fecha,
      categoria: post.categoria,
      contenido: post.contenido,
    })
    .eq("slug", slug);
  return !error;
}

export async function deletePost(slug: string): Promise<boolean> {
  const { error } = await getSupabase().from("blog_posts").delete().eq("slug", slug);
  return !error;
}
