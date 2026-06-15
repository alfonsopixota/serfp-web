export default function Hero() {
  return (
    <section
      id="inicio"
      className="pt-32 pb-20 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6">
          La comunidad FP que habla claro
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight mb-6">
          Decide tu FP con{" "}
          <span className="text-blue-700">información real,</span>
          <br className="hidden sm:block" /> no con humo
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Todo lo que nadie te cuenta sobre Formación Profesional en España.
          Testimonios de alumnos reales, comparativas de ciclos y salidas
          profesionales concretas — sin exageraciones.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#newsletter"
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-xl text-base transition-colors shadow-lg shadow-blue-700/20"
          >
            Únete gratis a la comunidad
          </a>
          <a
            href="#blog"
            className="bg-white hover:bg-slate-50 text-slate-800 font-semibold px-8 py-4 rounded-xl text-base border border-slate-200 transition-colors"
          >
            Explorar contenidos
          </a>
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-slate-500">
          <Stat value="100K" label="objetivo de seguidores" />
          <div className="hidden sm:block w-px h-8 bg-slate-200" />
          <Stat value="2–3" label="artículos a la semana" />
          <div className="hidden sm:block w-px h-8 bg-slate-200" />
          <Stat value="0€" label="completamente gratis" />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center sm:items-start gap-0.5">
      <span className="text-2xl font-black text-slate-900">{value}</span>
      <span className="text-slate-500 text-xs font-medium uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}
