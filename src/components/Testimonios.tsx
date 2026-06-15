import { getAllTestimonios } from "@/lib/testimonios";

export default function Testimonios() {
  const testimonios = getAllTestimonios().slice(0, 3);
  return (
    <section id="testimonios" className="py-20 px-4 sm:px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Lo que cuentan quienes ya pasaron por aquí
          </h2>
          <p className="text-slate-600 text-lg max-w-xl mx-auto">
            Sin guiones ni marketing. Experiencias reales de estudiantes de FP
            en España.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonios.map((t) => (
            <div
              key={t.nombre}
              className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm flex flex-col gap-4"
            >
              <svg
                className="w-8 h-8 text-blue-200"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-slate-700 text-sm leading-relaxed flex-1">
                {t.texto}
              </p>
              <div className="pt-4 border-t border-slate-100">
                <p className="font-bold text-slate-900 text-sm">{t.nombre}</p>
                <p className="text-blue-700 text-xs font-medium mt-0.5">
                  {t.ciclo}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#newsletter"
            className="text-blue-700 hover:text-blue-900 font-semibold text-sm underline underline-offset-4 transition-colors"
          >
            ¿Quieres compartir tu experiencia? Únete a la comunidad →
          </a>
        </div>
      </div>
    </section>
  );
}
