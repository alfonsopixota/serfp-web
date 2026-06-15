"use client";

import { useState, useEffect } from "react";

interface Testimonio {
  id: string;
  nombre: string;
  ciclo: string;
  año: string;
  provincia: string;
  texto: string;
}

export default function TestimoniosDashboard() {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ nombre: "", ciclo: "", año: "", provincia: "", texto: "" });

  useEffect(() => {
    fetch("/api/testimonios")
      .then((r) => r.json())
      .then(setTestimonios)
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    if (editing === "new") {
      const res = await fetch("/api/testimonios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const nuevo = await res.json();
        setTestimonios([...testimonios, nuevo]);
        setEditing(null);
      }
    } else if (editing) {
      const res = await fetch(`/api/testimonios/${editing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setTestimonios(testimonios.map((t) => (t.id === editing ? { ...t, ...form } : t)));
        setEditing(null);
      }
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este testimonio?")) return;
    const res = await fetch(`/api/testimonios/${id}`, { method: "DELETE" });
    if (res.ok) {
      setTestimonios(testimonios.filter((t) => t.id !== id));
    }
  }

  function startEdit(t?: Testimonio) {
    if (t) {
      setEditing(t.id);
      setForm({ nombre: t.nombre, ciclo: t.ciclo, año: t.año, provincia: t.provincia, texto: t.texto });
    } else {
      setEditing("new");
      setForm({ nombre: "", ciclo: "", año: "", provincia: "", texto: "" });
    }
  }

  if (loading) return <p className="text-slate-400">Cargando...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-slate-900">Testimonios</h1>
        <button
          onClick={() => startEdit()}
          className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo testimonio
        </button>
      </div>

      {editing && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 space-y-4">
          <h2 className="font-bold text-slate-900">{editing === "new" ? "Nuevo testimonio" : "Editar testimonio"}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input placeholder="Ciclo" value={form.ciclo} onChange={(e) => setForm({ ...form, ciclo: e.target.value })} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input placeholder="Año" value={form.año} onChange={(e) => setForm({ ...form, año: e.target.value })} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input placeholder="Provincia" value={form.provincia} onChange={(e) => setForm({ ...form, provincia: e.target.value })} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <textarea placeholder="Testimonio..." value={form.texto} onChange={(e) => setForm({ ...form, texto: e.target.value })} rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <div className="flex gap-3">
            <button onClick={handleSave} className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">Guardar</button>
            <button onClick={() => setEditing(null)} className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">Cancelar</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {testimonios.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-900 text-sm">{t.nombre}</p>
              <p className="text-blue-700 text-xs font-medium">{t.ciclo}</p>
              <p className="text-slate-400 text-xs mt-0.5">{t.provincia} · {t.año}</p>
              <p className="text-slate-500 text-sm mt-2 line-clamp-2">{t.texto}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(t)} className="text-xs font-semibold text-blue-700 hover:text-blue-900 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">Editar</button>
              <button onClick={() => handleDelete(t.id)} className="text-xs font-semibold text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
