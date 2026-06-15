"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Inicio", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Testimonios", href: "/testimonios" },
  { label: "Empleabilidad", href: "/empleabilidad" },
  { label: "Recursos", href: "/recursos" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900">
          <span className="bg-blue-700 text-white rounded px-1.5 py-0.5 text-sm font-black tracking-tight">
            ser
          </span>
          <span className="text-blue-700 font-black">FP</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Navegación principal">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                pathname === l.href
                  ? "text-blue-700"
                  : "text-slate-600 hover:text-blue-700"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/#newsletter"
          className="hidden md:inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Únete gratis
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1" aria-label="Navegación móvil">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium py-2 transition-colors ${
                  pathname === l.href ? "text-blue-700" : "text-slate-700 hover:text-blue-700"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/#newsletter"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex justify-center bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              Únete gratis
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
