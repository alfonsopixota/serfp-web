import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getAllTestimonios, writeTestimonios } from "@/lib/testimonios";

export async function GET() {
  const data = getAllTestimonios();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await req.json();
  const data = getAllTestimonios();
  const nuevo = { id: crypto.randomUUID(), ...body };
  data.push(nuevo);
  writeTestimonios(data);
  return NextResponse.json(nuevo);
}
