import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recursos — SerFP",
  description:
    "Guías, checklists y comparativas gratuitas para elegir y estudiar FP en España.",
};

const recursos = [
  {
    tipo: "Guía",
    titulo: "Cómo elegir tu ciclo formativo paso a paso",
    desc: "Un proceso de 6 pasos para que no te pierdas entre familias profesionales, grados y modalidades. Desde definir qué buscas hasta comprometerte con la decisión.",
    tiempo: "8 min",
    href: "/blog/como-elegir-tu-ciclo-formativo",
  },
  {
    tipo: "Análisis",
    titulo: "FP vs Universidad: qué dice realmente el mercado laboral",
    desc: "Datos concretos sobre empleabilidad, salarios y tiempo hasta el primer empleo. Sin opiniones, sin sesgos — lo que muestran las cifras.",
    tiempo: "6 min",
    href: "/blog/fp-vs-universidad-que-dice-el-mercado",
  },
  {
    tipo: "Checklist",
    titulo: "10 preguntas antes de matricularte en un centro",
    desc: "Lo que deberías preguntar a cualquier centro de FP antes de comprometerte. Desde instalaciones hasta tasas de inserción laboral.",
    tiempo: "3 min",
    href: "#",
  },
  {
    tipo: "Comparativa",
    titulo: "FP presencial vs. a distancia: ¿cuál te conviene?",
    desc: "Pros y contras reales de cada modalidad según tu situación personal y laboral. Incluye análisis por tipo de ciclo.",
    tiempo: "5 min",
    href: "#",
  },
  {
    tipo: "Guía",
    titulo: "Todo lo que necesitas saber sobre las FCT",
    desc: "La Formación en Centros de Trabajo es la parte más importante del ciclo y la más ignorada al elegir. Aquí explicamos cómo funcionan y cómo sacarles partido.",
    tiempo: "7 min",
    href: "#",
  },
  {
    tipo: "Análisis",
    titulo: "7 mitos sobre la FP que siguen circulando",
    desc: "Desde 'la FP es para quien no puede ir a la universidad' hasta 'no tiene futuro'. Desmontamos los tópicos más extendidos con hechos concretos.",
    tiempo: "6 min",
    href: "/blog/mitos-sobre-la-fp-que-siguen-circulando",
  },
];

const TIPO_STYLES: Record<string, string> = {
  Guía: "bg-blue-50 text-blue-700",
  Checklist: "bg-emerald-50 text-emerald-700",
  Comparativa: "bg-amber-50 text-amber-700",
  Análisis: "bg-purple-50 text-purple-700",
};

export default function RecursosPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 px-4 sm:px-6 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <span className="inline-block text-xs font-semibold text-blue-700 uppercase tracking-widest mb-3">
              Recursos gratuitos
            </span>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">
              Herramientas para decidir mejor
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl">
              Guías, checklists y comparativas para que tomes decisiones sobre tu
              FP con información real. Todo gratuito, todo sin humo.
            </p>
          </div>

          {/* Recursos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {recursos.map((r) => {
              const isExternal = r.href === "#";
              const Tag = isExternal ? "div" : "a";
              return (
                <Tag
                  key={r.titulo}
                  {...(!isExternal ? { href: r.href } : {})}
                  className={`group bg-white rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-md hover:shadow-blue-50 transition-all p-6 flex flex-col gap-3 ${
                    !isExternal ? "cursor-pointer" : "opacity-80"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${TIPO_STYLES[r.tipo] ?? "bg-slate-100 text-slate-700"}`}>
                      {r.tipo}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{r.tiempo} lectura</span>
                    {isExternal && (
                      <span className="text-xs text-slate-400 font-medium ml-auto">Próximamente</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className={`font-bold text-slate-900 text-base leading-snug mb-2 ${!isExternal ? "group-hover:text-blue-700 transition-colors" : ""}`}>
                      {r.titulo}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed">{r.desc}</p>
                  </div>
                  {!isExternal && (
                    <div className="flex items-center gap-1 text-blue-700 text-sm font-semibold pt-1">
                      Leer
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  )}
                </Tag>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-12 bg-slate-50 rounded-2xl border border-slate-100 p-8 text-center">
            <h2 className="font-black text-slate-900 text-xl mb-2">
              ¿Quieres recibir los próximos recursos?
            </h2>
            <p className="text-slate-600 text-sm mb-5 max-w-md mx-auto">
              Publicamos nuevas guías y herramientas cada semana. Únete a la
              comunidad y te avisamos cuando salga contenido nuevo.
            </p>
            <a
              href="/#newsletter"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              Únete gratis
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
