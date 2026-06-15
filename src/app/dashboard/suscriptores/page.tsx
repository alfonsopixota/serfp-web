import { getSubscribers } from "@/lib/brevo";

export const metadata = { title: "Suscriptores — Dashboard" };

export default async function SuscriptoresPage() {
  const subscribers = await getSubscribers();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Suscriptores</h1>
          <p className="text-sm text-slate-400 mt-1">{subscribers.length} contactos en la lista de Brevo</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left font-semibold text-slate-600 px-5 py-3">Email</th>
              <th className="text-left font-semibold text-slate-600 px-5 py-3 hidden sm:table-cell">Fecha de suscripción</th>
              <th className="text-left font-semibold text-slate-600 px-5 py-3 hidden md:table-cell">ID</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub) => (
              <tr key={sub.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4">
                  <p className="font-medium text-slate-900">{sub.email}</p>
                </td>
                <td className="px-5 py-4 text-xs text-slate-400 hidden sm:table-cell">
                  {new Date(sub.createdAt).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td className="px-5 py-4 text-xs text-slate-300 hidden md:table-cell">#{sub.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {subscribers.length === 0 && (
          <p className="text-center text-slate-400 py-12">No hay suscriptores todavía</p>
        )}
      </div>
    </div>
  );
}
