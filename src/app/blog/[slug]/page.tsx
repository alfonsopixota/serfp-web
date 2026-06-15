import { getPost, getAllPosts } from "@/lib/posts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPost(slug);
    return {
      title: `${post.titulo} — SerFP`,
      description: post.descripcion,
      openGraph: {
        title: post.titulo,
        description: post.descripcion,
        type: "article",
        publishedTime: post.fecha,
      },
    };
  } catch {
    return { title: "SerFP" };
  }
}

const CATEGORIA_COLORS: Record<string, string> = {
  Guías: "bg-blue-50 text-blue-700",
  Empleabilidad: "bg-emerald-50 text-emerald-700",
  "Mitos vs realidad": "bg-amber-50 text-amber-700",
  Testimonios: "bg-purple-50 text-purple-700",
  Noticias: "bg-slate-100 text-slate-700",
};

function formatFecha(fecha: string) {
  return new Date(fecha).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  let post;
  try {
    post = getPost(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 px-4 sm:px-6 min-h-screen">
        <div className="max-w-2xl mx-auto">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-700 transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Volver al blog
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  CATEGORIA_COLORS[post.categoria] ?? "bg-slate-100 text-slate-700"
                }`}
              >
                {post.categoria}
              </span>
              <span className="text-xs text-slate-400">{post.tiempoLectura}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight tracking-tight mb-4">
              {post.titulo}
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed mb-4">
              {post.descripcion}
            </p>
            <p className="text-sm text-slate-400">{formatFecha(post.fecha)}</p>
          </header>

          {/* Content */}
          <article className="prose prose-slate prose-lg max-w-none
            prose-headings:font-black prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:leading-relaxed prose-p:text-slate-700
            prose-a:text-blue-700 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-slate-900
            prose-ul:text-slate-700 prose-ol:text-slate-700
            prose-li:my-1
            prose-table:text-sm prose-th:bg-slate-50 prose-th:font-semibold
            prose-hr:border-slate-200
            prose-blockquote:border-blue-700 prose-blockquote:text-slate-600
          ">
            <MDXRemote source={post.contenido} />
          </article>

          {/* CTA */}
          <div className="mt-14 p-7 bg-blue-50 rounded-2xl border border-blue-100 text-center">
            <h3 className="font-black text-slate-900 text-xl mb-2">
              ¿Te ha sido útil este artículo?
            </h3>
            <p className="text-slate-600 text-sm mb-5">
              Únete a la comunidad SerFP y recibe cada semana los mejores contenidos sobre FP.
            </p>
            <Link
              href="/#newsletter"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              Únete gratis
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
