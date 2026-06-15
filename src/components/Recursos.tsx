const recursos = [
  {
    tipo: "Guía",
    titulo: "Cómo elegir tu ciclo formativo paso a paso",
    desc: "Un proceso claro para que no te pierdas entre familias profesionales, grados y modalidades.",
    tiempo: "8 min lectura",
  },
  {
    tipo: "Checklist",
    titulo: "10 preguntas antes de matricularte en un centro",
    desc: "Lo que deberías preguntar a cualquier centro de FP antes de comprometerte.",
    tiempo: "3 min lectura",
  },
  {
    tipo: "Comparativa",
    titulo: "FP presencial vs. a distancia: ¿cuál te conviene?",
    desc: "Pros y contras reales de cada modalidad según tu situación personal y laboral.",
    tiempo: "6 min lectura",
  },
];

export default function Recursos() {
  return (
    <section id="recursos" className="py-20 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block text-xs font-semibold text-blue-700 uppercase tracking-widest mb-3">
              Recursos prácticos
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Herramientas para decidir mejor
            </h2>
          </div>
          <a
            href="#newsletter"
            className="text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors whitespace-nowrap"
          >
            Ver todos los recursos →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recursos.map((r) => (
            <div
              key={r.titulo}
              className="group bg-white rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-md hover:shadow-blue-50 transition-all p-6 flex flex-col gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                  {r.tipo}
                </span>
                <span className="text-xs text-slate-400 font-medium">{r.tiempo}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 text-base mb-2 leading-snug group-hover:text-blue-700 transition-colors">
                  {r.titulo}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{r.desc}</p>
              </div>
              <div className="flex items-center gap-1 text-blue-700 text-sm font-semibold">
                Leer
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
