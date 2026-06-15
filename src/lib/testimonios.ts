import fs from "fs";
import path from "path";
import { supabase } from "./supabase";

export interface Testimonio {
  id: string;
  nombre: string;
  ciclo: string;
  año: string;
  provincia: string;
  texto: string;
}

const TESTIMONIOS_FILE = path.join(process.cwd(), "content", "testimonios.json");

// Fallback a archivo local (para SSG / cuando no hay Supabase)
export function getAllTestimonios(): Testimonio[] {
  try {
    return JSON.parse(fs.readFileSync(TESTIMONIOS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

// --- Supabase CRUD ---

export async function getAllTestimoniosFromDB(): Promise<Testimonio[]> {
  const { data, error } = await supabase
    .from("testimonios")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    nombre: row.nombre,
    ciclo: row.ciclo,
    año: row.año,
    provincia: row.provincia,
    texto: row.texto,
  }));
}

export async function createTestimonio(t: Omit<Testimonio, "id">): Promise<Testimonio | null> {
  const { data, error } = await supabase
    .from("testimonios")
    .insert({
      nombre: t.nombre,
      ciclo: t.ciclo,
      año: t.año,
      provincia: t.provincia,
      texto: t.texto,
    })
    .select()
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    nombre: data.nombre,
    ciclo: data.ciclo,
    año: data.año,
    provincia: data.provincia,
    texto: data.texto,
  };
}

export async function updateTestimonio(id: string, t: Partial<Testimonio>): Promise<boolean> {
  const { error } = await supabase
    .from("testimonios")
    .update({
      nombre: t.nombre,
      ciclo: t.ciclo,
      año: t.año,
      provincia: t.provincia,
      texto: t.texto,
    })
    .eq("id", id);
  return !error;
}

export async function deleteTestimonio(id: string): Promise<boolean> {
  const { error } = await supabase.from("testimonios").delete().eq("id", id);
  return !error;
}

export function getTestimonioStats() {
  const testimonios = getAllTestimonios();
  const provincias = new Set(testimonios.map((t) => t.provincia));
  const ciclos = new Set(testimonios.map((t) => t.ciclo));
  return {
    total: testimonios.length,
    provincias: provincias.size,
    ciclos: ciclos.size,
  };
}
