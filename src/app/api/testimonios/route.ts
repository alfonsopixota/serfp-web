import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getAllTestimoniosFromDB, createTestimonio } from "@/lib/testimonios";

export async function GET() {
  const data = await getAllTestimoniosFromDB();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await req.json();
  const nuevo = await createTestimonio(body);

  if (!nuevo) {
    return NextResponse.json({ error: "Error al crear testimonio" }, { status: 500 });
  }

  return NextResponse.json(nuevo);
}
