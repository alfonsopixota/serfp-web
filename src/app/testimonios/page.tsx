import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonios — SerFP",
  description:
    "Historias reales de alumnos de FP en España. Lo que nadie te cuenta sobre estudiar Formación Profesional.",
};

const testimonios = [
  {
    nombre: "Marta G.",
    ciclo: "CFGS Desarrollo de Aplicaciones Web",
    año: "2023",
    provincia: "Madrid",
    texto:
      "Tardé dos años en decidirme por la FP porque pensaba que era una opción de segunda. Ojalá hubiera encontrado antes esta comunidad. En 8 meses de terminar tenía trabajo y ganaba más que muchos compañeros con carrera universitaria. El ciclo es muy exigente, más de lo que la gente cree, pero cada hora que pasé en el aula valió la pena.",
  },
  {
    nombre: "Carlos R.",
    ciclo: "CFGM Electromecánica de Vehículos",
    año: "2024",
    provincia: "Sevilla",
    texto:
      "Nadie me dijo la verdad sobre las FCT ni sobre cuánto influye el centro que eliges. Aquí encontré información real de alumnos que habían pasado por lo mismo. Las prácticas en el taller fueron donde aprendí de verdad. Me contrataron antes de terminar.",
  },
  {
    nombre: "Lucía P.",
    ciclo: "CFGS Educación Infantil",
    año: "2024",
    provincia: "Barcelona",
    texto:
      "Estaba entre una carrera y la FP y no sabía qué hacer. Gracias a los testimonios que leí entendí cuál era la salida real de cada opción. Al terminar encontré plaza en una escuela infantil en tres meses. La demanda en este sector es real, pero hay que estar dispuesta a trabajar de verdad.",
  },
  {
    nombre: "Iván M.",
    ciclo: "CFGS Sistemas Microinformáticos y Redes",
    año: "2022",
    provincia: "Valencia",
    texto:
      "Lo que más me sorprendió fue la cantidad de empresas que venían al centro a buscar alumnos antes de que termináramos el ciclo. Acabé en una empresa de hosting como técnico de soporte y en dos años pasé a ser responsable de infraestructura. La FP te enseña a trabajar, no solo a estudiar.",
  },
  {
    nombre: "Ana S.",
    ciclo: "CFGM Cuidados Auxiliares de Enfermería",
    año: "2023",
    provincia: "Zaragoza",
    texto:
      "Después de 10 años trabajando en retail decidí cambiar de sector. Tenía miedo de volver a estudiar con más de 30 años pero fue la mejor decisión de mi vida. Mis compañeros de clase eran de todas las edades y el ambiente era genial. Hoy trabajo en una residencia y me levanto con ganas de ir a trabajar.",
  },
  {
    nombre: "Diego F.",
    ciclo: "CFGS Administración y Finanzas",
    año: "2024",
    provincia: "Bilbao",
    texto:
      "El ciclo está muy bien orientado al mercado real. Aprendimos a usar las herramientas que usan las empresas de verdad, no simulaciones. El módulo de FCT lo hice en una asesoría y me quedé a trabajar con ellos. Si tuviera que repetir, elegiría lo mismo.",
  },
];

export default function TestimoniosPage() {
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
              <p className="text-2xl font-black text-slate-900">6</p>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Testimonios publicados</p>
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">6</p>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Ciclos distintos</p>
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">5</p>
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
