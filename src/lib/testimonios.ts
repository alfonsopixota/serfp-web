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

const TESTIMONIOS_FILE = path.join(process.cwd(), "content", "testimonios.json");

export function getAllTestimonios(): Testimonio[] {
  try {
    return JSON.parse(fs.readFileSync(TESTIMONIOS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

export function writeTestimonios(data: Testimonio[]): void {
  fs.mkdirSync(path.dirname(TESTIMONIOS_FILE), { recursive: true });
  fs.writeFileSync(TESTIMONIOS_FILE, JSON.stringify(data, null, 2), "utf-8");
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
