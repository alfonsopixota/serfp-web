import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad — SerFP",
  description: "Política de privacidad y protección de datos de serfp.es.",
};

export default function PrivacidadPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 px-4 sm:px-6 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-8">
            Política de privacidad
          </h1>

          <div className="prose prose-slate max-w-none">
            <h2>1. Responsable del tratamiento</h2>
            <p>
              <strong>SerFP</strong><br />
              Sitio web: serfp.es<br />
              Email de contacto: info@serfp.es
            </p>

            <h2>2. Datos que recogemos</h2>
            <p>
              A través de nuestro formulario de newsletter, recogemos
              exclusivamente tu <strong>dirección de email</strong> con el fin
              de enviarte contenidos relacionados con Formación Profesional.
            </p>
            <p>
              No recopilamos datos personales adicionales como nombre,
              apellidos, dirección postal o número de teléfono.
            </p>

            <h2>3. Finalidad del tratamiento</h2>
            <p>
              Tu email se utiliza exclusivamente para:
            </p>
            <ul>
              <li>Enviarte newsletter con contenidos sobre FP en España.</li>
              <li>Comunicarte novedades y recursos publicados en SerFP.</li>
            </ul>

            <h2>4. Base legal</h2>
            <p>
              El tratamiento de tus datos se basa en tu <strong>consentimiento
              </strong>, otorgado al suscribirte a nuestra newsletter. Puedes
              retirar tu consentimiento en cualquier momento haciendo clic en el
              enlace de baja que incluimos en cada email.
            </p>

            <h2>5. Servicio de envío de emails</h2>
            <p>
              Utilizamos <strong>Brevo</strong> (antes Sendinblue) como
              plataforma de envío de emails. Brevo cumple con el RGPD y
              almacena los datos en servidores dentro de la Unión Europea.
            </p>

            <h2>6. Conservación de los datos</h2>
            <p>
              Tus datos se conservarán mientras permanezcas suscrito a la
              newsletter. Si te das de baja, eliminaremos tu email de nuestra
              lista de distribución de forma inmediata.
            </p>

            <h2>7. Tus derechos</h2>
            <p>
              De acuerdo con el RGPD, tienes derecho a:
            </p>
            <ul>
              <li><strong>Acceso:</strong> saber qué datos tenemos sobre ti.</li>
              <li><strong>Rectificación:</strong> corregir datos inexactos.</li>
              <li><strong>Supresión:</strong> solicitar la eliminación de tus datos.</li>
              <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos.</li>
              <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado.</li>
            </ul>
            <p>
              Para ejercer estos derechos, envíanos un email a info@serfp.es.
            </p>

            <h2>8. Cookies</h2>
            <p>
              Este sitio web no utiliza cookies de rastreo ni de análisis. Únicamente
              se emplea una cookie técnica para el funcionamiento del panel de
              administración (dashboard).
            </p>

            <h2>9. Cambios en esta política</h2>
            <p>
              SerFP se reserva el derecho de modificar esta política de
              privacidad para adaptarla a novedades legislativas o cambios en
              nuestra actividad. Te recomendamos revisar esta página
              periódicamente.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
