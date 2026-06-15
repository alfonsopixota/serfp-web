import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import DeletePostButton from "@/components/DeletePostButton";

export const metadata = { title: "Blog — Dashboard" };

export default function BlogDashboard() {
  const posts = getAllPosts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-slate-900">Blog</h1>
        <Link
          href="/dashboard/blog/nuevo"
          className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo artículo
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left font-semibold text-slate-600 px-5 py-3">Título</th>
              <th className="text-left font-semibold text-slate-600 px-5 py-3 hidden sm:table-cell">Categoría</th>
              <th className="text-left font-semibold text-slate-600 px-5 py-3 hidden sm:table-cell">Fecha</th>
              <th className="text-right font-semibold text-slate-600 px-5 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.slug} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4">
                  <Link href={`/blog/${post.slug}`} target="_blank" className="font-medium text-slate-900 hover:text-blue-700 transition-colors">
                    {post.titulo}
                  </Link>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{post.descripcion}</p>
                </td>
                <td className="px-5 py-4 hidden sm:table-cell">
                  <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                    {post.categoria}
                  </span>
                </td>
                <td className="px-5 py-4 text-xs text-slate-400 hidden sm:table-cell">{post.fecha}</td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/dashboard/blog/${post.slug}/edit`}
                      className="text-xs font-semibold text-blue-700 hover:text-blue-900 px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Editar
                    </Link>
                    <DeletePostButton slug={post.slug} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && (
          <p className="text-center text-slate-400 py-12">No hay artículos todavía</p>
        )}
      </div>
    </div>
  );
}
