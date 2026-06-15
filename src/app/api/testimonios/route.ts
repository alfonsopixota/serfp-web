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

export async function GET() {
  const data = readData();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await req.json();
  const data = readData();
  const nuevo = { id: crypto.randomUUID(), ...body };
  data.push(nuevo);
  writeData(data);
  return NextResponse.json(nuevo);
}
