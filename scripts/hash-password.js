#!/usr/bin/env node

/**
 * Genera un hash de contraseña para el dashboard.
 *
 * Uso:
 *   node scripts/hash-password.js mi-contraseña
 *
 * Copia el resultado y ponlo como valor de DASHBOARD_PASSWORD en .env.local
 * o en las Environment Variables de Vercel.
 */

const crypto = require("crypto");

const password = process.argv[2];

if (!password) {
  console.error("Uso: node scripts/hash-password.js <contraseña>");
  process.exit(1);
}

const ALGORITHM = "pbkdf2";
const DIGEST = "sha256";
const ITERATIONS = 100_000;
const KEY_LENGTH = 64;
const SALT_LENGTH = 32;

const salt = crypto.randomBytes(SALT_LENGTH).toString("hex");
const key = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST);
const hash = `${salt}:${key.toString("hex")}`;

console.log("\nHash generado:");
console.log(hash);
console.log("\nCopia esto como valor de DASHBOARD_PASSWORD");
