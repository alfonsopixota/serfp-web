import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllTestimonios, getTestimonioStats } from "@/lib/testimonios";

export const metadata: Metadata = {
  title: "Testimonios — SerFP",
  description:
    "Historias reales de alumnos de FP en España. Lo que nadie te cuenta sobre estudiar Formación Profesional.",
};

export default function TestimoniosPage() {
  const testimonios = getAllTestimonios();
  const stats = getTestimonioStats();
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 px-4 sm:px-6 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-4">
            <span className="inline-block text-xs font-semibold text-blue-700 uppercase tracking-widest mb-3">
              Experiencias reales
            </span>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">
              Testimonios
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl">
              Lo que cuentan los alumnos que ya pasaron por la FP. Sin guiones,
              sin marketing. Solo experiencias reales.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 py-8 mb-8 border-y border-slate-100">
            <div>
              <p className="text-2xl font-black text-slate-900">{stats.total}</p>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Testimonios publicados</p>
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">{stats.ciclos}</p>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Ciclos distintos</p>
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">{stats.provincias}</p>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Provincias</p>
            </div>
          </div>

          {/* Testimonios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {testimonios.map((t) => (
              <div
                key={t.nombre}
                className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col gap-4 shadow-sm"
              >
                <svg className="w-7 h-7 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-slate-700 text-sm leading-relaxed flex-1">{t.texto}</p>
                <div className="pt-4 border-t border-slate-100">
                  <p className="font-bold text-slate-900 text-sm">{t.nombre}</p>
                  <p className="text-blue-700 text-xs font-medium mt-0.5">{t.ciclo}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{t.provincia} · {t.año}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA compartir */}
          <div className="bg-blue-50 rounded-2xl border border-blue-100 p-8 text-center">
            <h2 className="font-black text-slate-900 text-2xl mb-3">
              ¿Estudiaste FP? Cuenta tu experiencia
            </h2>
            <p className="text-slate-600 text-sm max-w-lg mx-auto mb-6">
              Tu historia puede ayudar a alguien a tomar la decisión correcta.
              Únete a la comunidad y cuéntanos cómo fue tu experiencia real
              estudiando FP.
            </p>
            <Link
              href="/#newsletter"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              Unirme a la comunidad
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
