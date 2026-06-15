const sectores = [
  { nombre: "Informática y Comunicaciones", demanda: "Muy alta", color: "bg-emerald-500" },
  { nombre: "Sanidad", demanda: "Muy alta", color: "bg-emerald-500" },
  { nombre: "Electricidad y Electrónica", demanda: "Alta", color: "bg-blue-500" },
  { nombre: "Administración y Gestión", demanda: "Alta", color: "bg-blue-500" },
  { nombre: "Edificación y Obra Civil", demanda: "Alta", color: "bg-blue-500" },
  { nombre: "Hostelería y Turismo", demanda: "Media", color: "bg-amber-500" },
  { nombre: "Imagen Personal", demanda: "Media", color: "bg-amber-500" },
  { nombre: "Comercio y Marketing", demanda: "Media", color: "bg-amber-500" },
];

export default function Empleabilidad() {
  return (
    <section id="empleabilidad" className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <span className="inline-block text-xs font-semibold text-blue-700 uppercase tracking-widest mb-4">
              Salidas profesionales
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-5">
              ¿Cuánto trabajo hay
              <br />
              en cada sector?
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              No todos los ciclos tienen la misma demanda laboral. En SerFP
              analizamos el mercado con datos reales para que elijas con los ojos
              abiertos, no con promesas vacías.
            </p>
            <a
              href="#newsletter"
              className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold text-sm transition-colors"
            >
              Ver análisis completo de empleabilidad
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Chart-style list */}
          <div className="flex flex-col gap-3">
            {sectores.map((s) => (
              <div key={s.nombre} className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${s.color}`} />
                <div className="flex-1 flex items-center justify-between gap-4 py-2.5 px-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-sm font-medium text-slate-800">{s.nombre}</span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      s.demanda === "Muy alta"
                        ? "bg-emerald-50 text-emerald-700"
                        : s.demanda === "Alta"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {s.demanda}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
