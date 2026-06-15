export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-blue-700 text-white rounded px-1.5 py-0.5 text-sm font-black">
                ser
              </span>
              <span className="text-white font-black text-xl">FP</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              La comunidad de referencia para estudiar Formación Profesional en
              España. Información clara, honesta y sin humo.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contenidos</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {["Blog", "Testimonios", "Empleabilidad", "Recursos", "Noticias"].map(
                (l) => (
                  <li key={l}>
                    <a href="#inicio" className="hover:text-white transition-colors">
                      {l}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Síguenos</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {[
                { red: "Instagram", href: "#" },
                { red: "TikTok", href: "#" },
              ].map((s) => (
                <li key={s.red}>
                  <a href={s.href} className="hover:text-white transition-colors">
                    {s.red}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© 2025 SerFP. Todos los derechos reservados.</p>
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
