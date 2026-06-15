import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import fs from "fs";
import path from "path";

const CONTENT_FILE = path.join(process.cwd(), "content", "testimonios.json");
const DATA_FILE = path.join(process.cwd(), "data", "testimonios.json");

function getDataFile() {
  if (fs.existsSync(DATA_FILE)) return DATA_FILE;
  return CONTENT_FILE;
}

function readData() {
  try {
    const file = getDataFile();
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {
    return [];
  }
}

function writeData(data: unknown[]) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authed = await isAuthenticated();
  if (!authed) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const data = readData();
  const index = data.findIndex((t: Record<string, string>) => t.id === id);

  if (index === -1) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  data[index] = { ...data[index], ...body };
  writeData(data);
  return NextResponse.json(data[index]);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authed = await isAuthenticated();
  if (!authed) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  const data = readData();
  const filtered = data.filter((t: Record<string, string>) => t.id !== id);

  if (filtered.length === data.length) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  writeData(filtered);
  return NextResponse.json({ ok: true });
}
