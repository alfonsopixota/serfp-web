import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

let ratelimit: Ratelimit | null = null;

if (redisUrl && redisToken) {
  const redis = new Redis({ url: redisUrl, token: redisToken });

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "60 s"), // 5 requests per 60 seconds
    analytics: true,
  });
}

function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "unknown";
}

// In-memory fallback when Upstash is not configured
const memoryStore = new Map<string, { count: number; resetAt: number }>();

export async function checkRateLimit(
  req: Request,
  key: string,
  maxRequests: number,
  windowMs: number
): Promise<{ allowed: boolean; remaining: number }> {
  const ip = getClientIp(req);
  const fullKey = `${key}:${ip}`;

  // Use Upstash if configured
  if (ratelimit) {
    const { success, remaining } = await ratelimit.limit(fullKey);
    return { allowed: success, remaining };
  }

  // Fallback: in-memory (resets on cold start)
  const now = Date.now();
  const entry = memoryStore.get(fullKey);

  if (!entry || now > entry.resetAt) {
    memoryStore.set(fullKey, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count };
}
