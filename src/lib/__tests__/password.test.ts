import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword } from "../password";

describe("hashPassword", () => {
  it("devuelve formato salt:hash", () => {
    const hash = hashPassword("mi-contraseña");
    expect(hash).toMatch(/^[a-f0-9]+:[a-f0-9]+$/);
  });

  it("genera hashes distintos para la misma contraseña (sal aleatoria)", () => {
    const h1 = hashPassword("igual");
    const h2 = hashPassword("igual");
    expect(h1).not.toBe(h2);
  });
});

describe("verifyPassword", () => {
  it("acepta la contraseña correcta", () => {
    const hash = hashPassword("secreta");
    expect(verifyPassword("secreta", hash)).toBe(true);
  });

  it("rechaza una contraseña incorrecta", () => {
    const hash = hashPassword("secreta");
    expect(verifyPassword("otra", hash)).toBe(false);
  });

  it("devuelve false con formato de hash inválido", () => {
    expect(verifyPassword("x", "sin-dos-puntos")).toBe(false);
  });
});
