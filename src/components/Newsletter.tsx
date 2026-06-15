"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSent(true);
  }

  return (
    <section
      id="newsletter"
      className="py-20 px-4 sm:px-6 bg-blue-700"
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
          Únete a la comunidad SerFP
        </h2>
        <p className="text-blue-100 text-lg mb-8 leading-relaxed">
          Recibe cada semana los mejores contenidos sobre FP directamente en tu
          correo. Sin spam, solo valor real.
        </p>

        {sent ? (
          <div className="bg-white/10 rounded-2xl p-8 text-white">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-blue-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-bold text-xl mb-1">¡Bienvenido/a!</p>
            <p className="text-blue-100 text-sm">
              Ya estás dentro de la comunidad. Pronto recibirás el primer
              contenido.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3.5 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-colors whitespace-nowrap"
            >
              Unirme gratis
            </button>
          </form>
        )}

        <p className="mt-4 text-blue-200 text-xs">
          Sin spam. Puedes darte de baja cuando quieras.
        </p>
      </div>
    </section>
  );
}
