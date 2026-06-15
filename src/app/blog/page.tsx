import { getAllPosts } from "@/lib/posts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — SerFP",
  description:
    "Artículos sobre Formación Profesional en España: guías, empleabilidad, testimonios y actualidad del sector.",
};

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

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 px-4 sm:px-6 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <span className="inline-block text-xs font-semibold text-blue-700 uppercase tracking-widest mb-3">
              Contenidos
            </span>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">
              Blog
            </h1>
            <p className="text-slate-600 text-lg">
              Información clara y honesta sobre FP en España. Sin humo.
            </p>
          </div>

          {/* Posts */}
          <div className="flex flex-col divide-y divide-slate-100">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group py-8 flex flex-col sm:flex-row gap-4 sm:gap-8 hover:bg-slate-50 -mx-4 px-4 rounded-xl transition-colors"
              >
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        CATEGORIA_COLORS[post.categoria] ?? "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {post.categoria}
                    </span>
                    <span className="text-xs text-slate-400">{post.tiempoLectura}</span>
                  </div>
                  <h2 className="font-bold text-xl text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                    {post.titulo}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                    {post.descripcion}
                  </p>
                  <span className="text-xs text-slate-400 mt-1">
                    {formatFecha(post.fecha)}
                  </span>
                </div>
                <div className="shrink-0 self-center hidden sm:flex items-center text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
