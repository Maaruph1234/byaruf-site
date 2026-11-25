// POST /api/enquiry : contact and quote forms.
import { guard, send, clientIp } from './_lib/http.js'
import { rateLimit } from './_lib/ratelimit.js'
import { validateEnquiry, verifyTurnstile, deliverEnquiry } from './_lib/enquiry.js'

export default async function handler(req, res) {
  if (!guard(req, res)) return
  const ip = clientIp(req)
  const body = typeof req.body === 'object' && req.body ? req.body : {}

  // Spam checks: hidden honeypot field and a minimum time on the form.
  if (body.website) return send(res, 200, { ok: true })
  const started = Number(body.startedAt || 0)
  if (!started || Date.now() - started < 3000) return send(res, 400, { error: 'Please take a moment to fill in the form, then try again.' })

  const rl = await rateLimit(`enq:${ip}`, 5, 3600)
  if (!rl.ok) return send(res, 429, { error: 'Too many enquiries from this connection. Please try again later or contact us on WhatsApp.' })

  if (!(await verifyTurnstile(body.turnstileToken, ip))) return send(res, 400, { error: 'Spam check failed. Please refresh the page and try again.' })

  const v = validateEnquiry(body)
  if (v.error) return send(res, 400, { error: v.error, field: v.field })

  const result = await deliverEnquiry(v.data, body.type === 'quote' ? 'Get a Quote page' : 'Contact page')
  if (!result.configured) return send(res, 503, { error: 'not_configured' })
  if (!result.ok) return send(res, 502, { error: 'We could not send your message just now. Please email or WhatsApp us instead.' })
  return send(res, 200, { ok: true })
}
