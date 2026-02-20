const bucket = new Map<string, { count: number; resetAt: number }>();

export function assertRateLimit(ip: string, key: string, max = 30, windowMs = 60_000) {
  const now = Date.now();
  const composite = `${ip}:${key}`;
  const current = bucket.get(composite);

  if (!current || current.resetAt < now) {
    bucket.set(composite, { count: 1, resetAt: now + windowMs });
    return;
  }

  if (current.count >= max) {
    throw new Error("Rate limit exceeded");
  }

  current.count += 1;
}
