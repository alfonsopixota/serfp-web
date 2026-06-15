interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "unknown";
}

export function checkRateLimit(
  req: Request,
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number } {
  const ip = getClientIp(req);
  const now = Date.now();
  const fullKey = `${key}:${ip}`;

  const entry = store.get(fullKey);

  if (!entry || now > entry.resetAt) {
    store.set(fullKey, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count };
}
