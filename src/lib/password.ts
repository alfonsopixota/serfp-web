import crypto from "crypto";

const ALGORITHM = "pbkdf2";
const DIGEST = "sha256";
const ITERATIONS = 100_000;
const KEY_LENGTH = 64;
const SALT_LENGTH = 32;

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(SALT_LENGTH).toString("hex");
  const key = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST);
  return `${salt}:${key.toString("hex")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const key = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST);
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), key);
}
