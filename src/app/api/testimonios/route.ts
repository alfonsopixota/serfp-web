import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getAllTestimoniosFromDB, createTestimonio } from "@/lib/testimonios";
import { corsHeaders, corsOptions } from "@/lib/cors";

export function OPTIONS() {
  return corsOptions();
}

export async function GET() {
  const data = await getAllTestimoniosFromDB();
  return corsHeaders(NextResponse.json(data));
}

export async function POST(req: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) return corsHeaders(NextResponse.json({ error: "No autorizado" }, { status: 401 }));

  const body = await req.json();
  const nuevo = await createTestimonio(body);

  if (!nuevo) {
    return corsHeaders(NextResponse.json({ error: "Error al crear testimonio" }, { status: 500 }));
  }

  return corsHeaders(NextResponse.json(nuevo));
}
