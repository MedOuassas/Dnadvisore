import Redis from "ioredis";

let client: Redis | null = null;

export function getRedis() {
  if (!process.env.REDIS_URL) return null;
  if (!client) {
    client = new Redis(process.env.REDIS_URL, { maxRetriesPerRequest: 1 });
  }
  return client;
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  const redis = getRedis();
  if (!redis) return null;
  const value = await redis.get(key);
  return value ? (JSON.parse(value) as T) : null;
}

export async function cacheSet(key: string, value: unknown, ttlSeconds = 900) {
  const redis = getRedis();
  if (!redis) return;
  await redis.setex(key, ttlSeconds, JSON.stringify(value));
}
