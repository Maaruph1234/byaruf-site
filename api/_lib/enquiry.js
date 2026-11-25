import { clean, esc } from './http.js'
import { SERVICES } from '../../src/data/services.js'
import { SOLUTIONS } from '../../src/data/solutions.js'
import { BUDGETS, SITE } from '../../src/data/site.js'

export const SERVICE_OPTIONS = [...SERVICES.map((s) => s.name), ...SOLUTIONS.map((s) => s.name), 'Not sure yet', 'Other']
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,24}$/i

// Validate and normalise an enquiry. Returns { data } or { error, field }.
export function validateEnquiry(input) {
  const d = {
    name: clean(input.name, 80),
    email: clean(input.email, 160).toLowerCase(),
    phone: clean(input.phone, 24),
    company: clean(input.company, 100),
    service: clean(input.service, 80),
    budget: clean(input.budget, 40),
    message: clean(input.message, 3000),
    type: clean(input.type, 20) || 'enquiry',
  }
  if (d.name.length < 2) return { error: 'Please enter your name.', field: 'name' }
  if (!EMAIL.test(d.email)) return { error: 'Please enter a valid email address.', field: 'email' }
  if (d.phone && !/^[+()\d\s-]{7,24}$/.test(d.phone)) return { error: 'Please enter a valid phone number.', field: 'phone' }
  if (d.service && !SERVICE_OPTIONS.includes(d.service)) d.service = 'Other'
  if (d.budget && !BUDGETS.includes(d.budget)) d.budget = ''
  if (d.message.length < 10) return { error: 'Please tell us a little more about your project (at least 10 characters).', field: 'message' }
  return { data: d }
}

// Cloudflare Turnstile, only enforced when TURNSTILE_SECRET_KEY is set.
export async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
  if (!token) return false
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    })
    return (await r.json()).success === true
  } catch { return false }
}

// Deliver an enquiry by email through Resend. Returns { ok, configured }.
export async function deliverEnquiry(d, source) {
  const key = process.env.RESEND_API_KEY
  const from = process.env.ENQUIRY_FROM_EMAIL
  const to = process.env.ENQUIRY_TO_EMAIL || SITE.email
  if (!key || !from) return { ok: false, configured: false }
  const rows = [['Name', d.name], ['Email', d.email], ['Phone', d.phone], ['Company', d.company], ['Service', d.service], ['Budget', d.budget], ['Source', source]].filter((r) => r[1])
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\n${d.message}`
  const html = `<h2 style="font-family:sans-serif">New ${esc(d.type)} from byaruf.xyz</h2><table style="font-family:sans-serif;font-size:14px">${rows.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#555">${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')}</table><p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${esc(d.message)}</p>`
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: d.email, subject: `${d.type === 'quote' ? 'Quote request' : 'Enquiry'}: ${d.service || 'General'} from ${d.name}`, text, html }),
    })
    if (!r.ok) { console.error('resend_error', r.status, await r.text().catch(() => '')); return { ok: false, configured: true } }
    return { ok: true, configured: true }
  } catch (e) {
    console.error('resend_exception', e?.message)
    return { ok: false, configured: true }
  }
}
