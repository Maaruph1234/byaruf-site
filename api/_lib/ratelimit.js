// Fixed-window rate limiting. Uses Upstash Redis when configured (shared across all serverless
// instances); otherwise falls back to per-instance memory, which still slows down abuse.
const mem = new Map()

export async function rateLimit(key, limit, windowSec) {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  const bucket = `rl:${key}:${Math.floor(Date.now() / 1000 / windowSec)}`
  if (url && token) {
    try {
      const r = await fetch(`${url}/pipeline`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify([['INCR', bucket], ['EXPIRE', bucket, String(windowSec)]]),
      })
      const j = await r.json()
      const count = Number(j?.[0]?.result || 0)
      return { ok: count <= limit, count }
    } catch { /* fall through to memory */ }
  }
  const now = Date.now()
  for (const [k, v] of mem) if (v.exp < now) mem.delete(k)
  const e = mem.get(bucket) || { n: 0, exp: now + windowSec * 1000 }
  e.n += 1
  mem.set(bucket, e)
  return { ok: e.n <= limit, count: e.n }
}
