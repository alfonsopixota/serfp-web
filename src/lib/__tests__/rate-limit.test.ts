import { describe, it, expect } from "vitest";
import { checkRateLimit } from "../rate-limit";

function makeRequest(ip = "1.2.3.4"): Request {
  return new Request("http://localhost/api/test", {
    headers: { "x-forwarded-for": ip },
  });
}

describe("checkRateLimit (fallback en memoria)", () => {
  it("permite requests dentro del límite", async () => {
    const key = `test-allow-${Date.now()}`;
    const result = await checkRateLimit(makeRequest("10.0.0.1"), key, 3, 60_000);
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(2);
  });

  it("bloquea al superar el límite", async () => {
    const key = `test-block-${Date.now()}`;
    const ip = "10.0.0.2";
    await checkRateLimit(makeRequest(ip), key, 2, 60_000);
    await checkRateLimit(makeRequest(ip), key, 2, 60_000);
    const result = await checkRateLimit(makeRequest(ip), key, 2, 60_000);
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("no comparte límite entre IPs distintas", async () => {
    const key = `test-ips-${Date.now()}`;
    await checkRateLimit(makeRequest("10.0.0.3"), key, 1, 60_000);
    await checkRateLimit(makeRequest("10.0.0.3"), key, 1, 60_000);
    const result = await checkRateLimit(makeRequest("10.0.0.4"), key, 1, 60_000);
    expect(result.allowed).toBe(true);
  });
});
