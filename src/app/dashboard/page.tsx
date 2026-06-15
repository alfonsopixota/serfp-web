import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getSubscriberCount } from "@/lib/brevo";
import { getAllPosts } from "@/lib/posts";
import { getAllTestimonios } from "@/lib/testimonios";

export const metadata = { title: "Panel — SerFP" };

export default async function DashboardPage() {
  const authed = await isAuthenticated();
  if (!authed) redirect("/dashboard/login");

  const [subscriberCount, posts, testimonios] = await Promise.all([
    getSubscriberCount(),
    getAllPosts(),
    getAllTestimonios(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-black text-slate-900 mb-6">Panel principal</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <p className="text-sm text-slate-500 font-medium mb-1">Suscriptores</p>
          <p className="text-3xl font-black text-slate-900">{subscriberCount}</p>
          <p className="text-xs text-slate-400 mt-1">En la lista de Brevo</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <p className="text-sm text-slate-500 font-medium mb-1">Artículos publicados</p>
          <p className="text-3xl font-black text-slate-900">{posts.length}</p>
          <p className="text-xs text-slate-400 mt-1">En el blog</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <p className="text-sm text-slate-500 font-medium mb-1">Testimonios</p>
          <p className="text-3xl font-black text-slate-900">{testimonios.length}</p>
          <p className="text-xs text-slate-400 mt-1">Experiencias reales</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-bold text-slate-900 mb-4">Accesos rápidos</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/dashboard/blog/nuevo" className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo artículo
          </a>
          <a href="/dashboard/blog" className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors">
            Gestionar blog
          </a>
          <a href="/dashboard/testimonios" className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors">
            Gestionar testimonios
          </a>
          <a href="/dashboard/suscriptores" className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors">
            Ver suscriptores
          </a>
        </div>
      </div>
    </div>
  );
}
