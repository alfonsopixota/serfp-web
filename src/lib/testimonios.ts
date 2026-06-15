import fs from "fs";
import path from "path";

export interface Testimonio {
  id: string;
  nombre: string;
  ciclo: string;
  año: string;
  provincia: string;
  texto: string;
}

const CONTENT_FILE = path.join(process.cwd(), "content", "testimonios.json");
const DATA_FILE = path.join(process.cwd(), "data", "testimonios.json");

function getDataFile(): string {
  if (fs.existsSync(DATA_FILE)) return DATA_FILE;
  return CONTENT_FILE;
}

export function getAllTestimonios(): Testimonio[] {
  try {
    const file = getDataFile();
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {
    return [];
  }
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
