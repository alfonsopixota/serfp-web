import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

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
