import Link from "next/link";

const contentLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Testimonios", href: "/testimonios" },
  {label: "Empleabilidad", href: "/empleabilidad" },
  { label: "Recursos", href: "/recursos" },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/serfp" },
  { label: "TikTok", href: "https://tiktok.com/@serfp" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="bg-blue-700 text-white rounded px-1.5 py-0.5 text-sm font-black">
                ser
              </span>
              <span className="text-white font-black text-xl">FP</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              La comunidad de referencia para estudiar Formación Profesional en
              España. Información clara, honesta y sin humo.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contenidos</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {contentLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Síguenos</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {year} SerFP. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">
              Aviso legal
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
