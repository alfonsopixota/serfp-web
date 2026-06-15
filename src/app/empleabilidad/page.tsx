import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Empleabilidad — SerFP",
  description:
    "Análisis real de la demanda laboral por familia profesional en España. Datos concretos para que elijas tu ciclo de FP con los ojos abiertos.",
};

const familias = [
  {
    nombre: "Informática y Comunicaciones",
    demanda: "Muy alta",
    salarioEntrada: "22.000€ – 28.000€",
    plazoEmpleo: "< 3 meses",
    ciclosDestacados: ["DAW", "DAM", "ASIR", "Ciberseguridad"],
    nota: "Sector con mayor déficit de profesionales en España. Alta empleabilidad garantizada en ciclos de desarrollo y sistemas.",
  },
  {
    nombre: "Sanidad",
    demanda: "Muy alta",
    salarioEntrada: "18.000€ – 24.000€",
    plazoEmpleo: "< 3 meses",
    ciclosDestacados: ["Aux. Enfermería", "Farmacia", "Anatomía Patológica", "Documentación Sanitaria"],
    nota: "Demanda estructural sostenida. Las residencias y hospitales públicos tienen contratación prácticamente continua.",
  },
  {
    nombre: "Electricidad y Electrónica",
    demanda: "Alta",
    salarioEntrada: "20.000€ – 26.000€",
    plazoEmpleo: "3 – 6 meses",
    ciclosDestacados: ["Instalaciones Eléctricas", "Automatización", "Electrónica Industrial"],
    nota: "La transición energética está disparando la demanda de instaladores y técnicos de mantenimiento.",
  },
  {
    nombre: "Edificación y Obra Civil",
    demanda: "Alta",
    salarioEntrada: "19.000€ – 25.000€",
    plazoEmpleo: "3 – 6 meses",
    ciclosDestacados: ["Construcción", "Proyectos de Obra Civil", "Eficiencia Energética"],
    nota: "El boom de rehabilitación de edificios y obra nueva mantiene la demanda en niveles altos.",
  },
  {
    nombre: "Administración y Gestión",
    demanda: "Alta",
    salarioEntrada: "17.000€ – 22.000€",
    plazoEmpleo: "3 – 6 meses",
    ciclosDestacados: ["Administración y Finanzas", "Asistencia a Dirección"],
    nota: "Ciclo versátil que abre puertas en prácticamente todos los sectores. Buena demanda en pymes.",
  },
  {
    nombre: "Transporte y Mantenimiento de Vehículos",
    demanda: "Alta",
    salarioEntrada: "18.000€ – 24.000€",
    plazoEmpleo: "3 – 6 meses",
    ciclosDestacados: ["Electromecánica de Vehículos", "Vehículos Eléctricos"],
    nota: "La electrificación del parque vehicular está creando escasez de técnicos especializados.",
  },
  {
    nombre: "Hostelería y Turismo",
    demanda: "Media",
    salarioEntrada: "16.000€ – 20.000€",
    plazoEmpleo: "6 – 12 meses",
    ciclosDestacados: ["Cocina y Gastronomía", "Agencias de Viajes", "Gestión de Alojamientos"],
    nota: "Alta demanda en temporada, pero con más estacionalidad. Salarios más bajos que otros sectores.",
  },
  {
    nombre: "Comercio y Marketing",
    demanda: "Media",
    salarioEntrada: "16.000€ – 21.000€",
    plazoEmpleo: "6 – 12 meses",
    ciclosDestacados: ["Marketing y Publicidad", "Comercio Internacional", "E-commerce"],
    nota: "El comercio digital está revalorizando estos ciclos, especialmente los perfiles con competencias en marketing digital.",
  },
  {
    nombre: "Imagen Personal",
    demanda: "Media",
    salarioEntrada: "14.000€ – 19.000€",
    plazoEmpleo: "6 – 12 meses",
    ciclosDestacados: ["Estética y Belleza", "Peluquería y Cosmética Capilar"],
    nota: "Muchos titulados optan por el autoempleo. El éxito depende mucho del emprendimiento personal.",
  },
];

const DEMANDA_STYLES: Record<string, { badge: string; bar: string; width: string }> = {
  "Muy alta": { badge: "bg-emerald-50 text-emerald-700", bar: "bg-emerald-500", width: "w-full" },
  Alta: { badge: "bg-blue-50 text-blue-700", bar: "bg-blue-500", width: "w-3/4" },
  Media: { badge: "bg-amber-50 text-amber-700", bar: "bg-amber-400", width: "w-1/2" },
};

export default function EmpleabilidadPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 px-4 sm:px-6 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <span className="inline-block text-xs font-semibold text-blue-700 uppercase tracking-widest mb-3">
              Mercado laboral
            </span>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">
              Empleabilidad por sector
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl">
              Datos reales de demanda laboral, salarios de entrada y tiempo
              hasta el primer empleo para cada familia profesional.
            </p>
          </div>

          {/* Leyenda */}
          <div className="flex flex-wrap gap-4 mb-8">
            {Object.entries(DEMANDA_STYLES).map(([nivel, s]) => (
              <span key={nivel} className={`text-xs font-semibold px-3 py-1.5 rounded-full ${s.badge}`}>
                {nivel}
              </span>
            ))}
          </div>

          {/* Familias */}
          <div className="flex flex-col gap-4">
            {familias.map((f) => {
              const style = DEMANDA_STYLES[f.demanda];
              return (
                <div
                  key={f.nombre}
                  className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <h2 className="font-bold text-slate-900 text-lg leading-tight">{f.nombre}</h2>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        {f.ciclosDestacados.map((c) => (
                          <span key={c} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full ${style.badge}`}>
                      {f.demanda}
                    </span>
                  </div>

                  {/* Barra de demanda */}
                  <div className="h-1.5 bg-slate-100 rounded-full mb-4 overflow-hidden">
                    <div className={`h-full rounded-full ${style.bar} ${style.width}`} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">Salario entrada</p>
                      <p className="font-bold text-slate-900 text-sm">{f.salarioEntrada}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">1er empleo</p>
                      <p className="font-bold text-slate-900 text-sm">{f.plazoEmpleo}</p>
                    </div>
                  </div>

                  <p className="text-slate-500 text-sm leading-relaxed">{f.nota}</p>
                </div>
              );
            })}
          </div>

          {/* Disclaimer */}
          <p className="mt-8 text-xs text-slate-400 leading-relaxed">
            Los datos de salario y plazo de empleo son orientativos y se basan en
            estudios de inserción laboral autonómicos y análisis de ofertas de
            empleo. Pueden variar según provincia, centro y año de titulación.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
