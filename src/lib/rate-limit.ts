const buckets = new Map<string, { count: number; expires: number }>();

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.expires < now) {
    buckets.set(key, { count: 1, expires: now + windowMs });
    return { success: true, remaining: limit - 1, reset: now + windowMs };
  }

  if (bucket.count >= limit) {
    return { success: false, remaining: 0, reset: bucket.expires };
  }

  bucket.count += 1;
  return { success: true, remaining: limit - bucket.count, reset: bucket.expires };
}
