import Link from "next/link";

export default function DashboardNotFound() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center max-w-md">
        <p className="text-6xl font-black text-blue-700 mb-4">404</p>
        <h1 className="text-2xl font-black text-slate-900 mb-3">
          Página no encontrada
        </h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          La página que buscas no existe o ha sido movida.
        </p>
        <Link
          href="/dashboard"
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
        >
          Volver al panel
        </Link>
      </div>
    </div>
  );
}
