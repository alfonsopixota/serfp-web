import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso legal — SerFP",
  description: "Aviso legal del sitio web serfp.es.",
};

export default function AvisoLegalPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 px-4 sm:px-6 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-8">
            Aviso legal
          </h1>

          <div className="prose prose-slate max-w-none">
            <h2>1. Datos del responsable</h2>
            <p>
              <strong>SerFP</strong><br />
              Sitio web: serfp.es<br />
              Email de contacto: info@serfp.es
            </p>

            <h2>2. Objeto</h2>
            <p>
              El presente aviso legal regula el uso y utilización del sitio web
              serfp.es, del cual es responsable SerFP. La navegación por este
              sitio web atribuye la condición de usuario del mismo e implica la
              aceptación plena de todas las condiciones establecidas en este
              aviso legal.
            </p>

            <h2>3. Condiciones de uso</h2>
            <p>
              El usuario se compromete a hacer un uso adecuado del sitio web de
              conformidad con la ley, la buena fe y el presente aviso legal. El
              usuario responderá frente a SerFP o frente a terceros de cualquier
              daño o perjuicio que pudiera causarse como consecuencia del
              incumplimiento de dicha obligación.
            </p>

            <h2>4. Propiedad intelectual</h2>
            <p>
              Todos los contenidos del sitio web, incluyendo textos, imágenes,
              gráficos, iconos, tecnología, software, enlaces y demás contenido
              audiovisual o sonoro, son propiedad intelectual de SerFP o de
              terceros, sin que puedan entenderse cedidos al usuario ninguno de
              los derechos de explotación reconocidos por la normativa vigente
              sobre propiedad intelectual.
            </p>

            <h2>5. Exclusión de garantías y responsabilidad</h2>
            <p>
              SerFP no se hace responsable, en ningún caso, de los daños y
              perjuicios de cualquier naturaleza que pudieran ocasionar, a
              título enunciativo: errores u omisiones en los contenidos, falta
              de disponibilidad del sitio web o la transmisión de virus o
              programas maliciosos en los contenidos, a pesar de haber adoptado
              todas las medidas tecnológicas necesarias para evitarlo.
            </p>

            <h2>6. Enlaces</h2>
            <p>
              El sitio web puede incluir enlaces a sitios de terceros. SerFP no
              asume ninguna responsabilidad respecto al contenido de dichos
              sitios enlazados, ni garantiza la disponibilidad técnica,
              calidad, fiabilidad, exactitud, amplitud, veracidad y validez de
              cualquier material o información en los mismos.
            </p>

            <h2>7. Legislación aplicable</h2>
            <p>
              La relación entre SerFP y el usuario se regirá por la normativa
              española vigente. Para la resolución de cualquier controversia, las
              partes se someterán a los juzgados y tribunales competentes de
              España.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
