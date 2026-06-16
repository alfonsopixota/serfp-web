import { describe, it, expect, beforeEach } from "vitest";

beforeEach(() => {
  process.env.DASHBOARD_PASSWORD = "test-secret";
});

// Importación dinámica para que la variable de entorno esté lista
async function getAuth() {
  return await import("../auth");
}

describe("createToken / verifyToken", () => {
  it("verifica un token recién creado", async () => {
    const { createToken, verifyToken } = await getAuth();
    const token = createToken();
    expect(verifyToken(token)).toBe(true);
  });

  it("rechaza un token manipulado", async () => {
    const { createToken, verifyToken } = await getAuth();
    const token = createToken();
    const tampered = token.slice(0, -4) + "xxxx";
    expect(verifyToken(tampered)).toBe(false);
  });

  it("rechaza un string vacío", async () => {
    const { verifyToken } = await getAuth();
    expect(verifyToken("")).toBe(false);
  });

  it("rechaza base64 sin punto separador", async () => {
    const { verifyToken } = await getAuth();
    const fake = Buffer.from("sinpunto").toString("base64");
    expect(verifyToken(fake)).toBe(false);
  });
});
