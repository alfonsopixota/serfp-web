"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      import("@sentry/nextjs").then(({ captureException }) => captureException(error));
    }
  }, [error]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-black text-red-500 mb-4">500</p>
        <h1 className="text-2xl font-black text-slate-900 mb-3">
          Algo salió mal
        </h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Intentar de nuevo
          </button>
          <Link
            href="/"
            className="bg-white hover:bg-slate-50 text-slate-800 font-semibold px-6 py-3 rounded-xl text-sm border border-slate-200 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
