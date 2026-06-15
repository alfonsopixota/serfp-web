import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 pt-16">
        <div className="text-center max-w-md">
          <p className="text-8xl font-black text-blue-700 mb-4">404</p>
          <h1 className="text-2xl font-black text-slate-900 mb-3">
            Esta página no existe
          </h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Puede que hayas seguido un enlace roto o que la página haya sido
            movida. Vuelve al inicio y encuentra lo que buscas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              Volver al inicio
            </Link>
            <Link
              href="/blog"
              className="bg-white hover:bg-slate-50 text-slate-800 font-semibold px-6 py-3 rounded-xl text-sm border border-slate-200 transition-colors"
            >
              Ver el blog
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
