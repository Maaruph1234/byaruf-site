// Small helpers shared by the API routes.
const ALLOWED = [/^https:\/\/(www\.)?byaruf\.xyz$/, /^https:\/\/[a-z0-9-]+\.vercel\.app$/, /^http:\/\/localhost(:\d+)?$/, /^http:\/\/127\.0\.0\.1(:\d+)?$/]

export function clientIp(req) {
  const f = req.headers['x-forwarded-for']
  return (Array.isArray(f) ? f[0] : (f || '')).split(',')[0].trim() || req.socket?.remoteAddress || 'unknown'
}

// Reject cross-site posts from other origins. Requests without an Origin header (curl) are allowed
// but still rate limited.
export function originOk(req) {
  const o = req.headers.origin
  return !o || ALLOWED.some((r) => r.test(o))
}

export function send(res, status, body) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.status(status).send(JSON.stringify(body))
}

export function guard(req, res) {
  if (req.method === 'OPTIONS') { res.status(204).end(); return false }
  if (req.method !== 'POST') { send(res, 405, { error: 'method_not_allowed' }); return false }
  if (!originOk(req)) { send(res, 403, { error: 'forbidden_origin' }); return false }
  const len = Number(req.headers['content-length'] || 0)
  if (len > 40_000) { send(res, 413, { error: 'too_large' }); return false }
  return true
}

export const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim().slice(0, max)
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
