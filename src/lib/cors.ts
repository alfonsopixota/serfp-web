import { NextResponse } from "next/server";
import { SITE_URL } from "./config";

export function corsHeaders(response: NextResponse): NextResponse {
  response.headers.set("Access-Control-Allow-Origin", SITE_URL);
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Access-Control-Max-Age", "86400");
  return response;
}

export function corsOptions(): NextResponse {
  return corsHeaders(NextResponse.json({ ok: true }));
}
