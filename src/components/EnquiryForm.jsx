import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Icon, { WhatsAppIcon } from './Icons.jsx'
import { SERVICES } from '../data/services.js'
import { SOLUTIONS } from '../data/solutions.js'
import { BUDGETS, SITE, waLink } from '../data/site.js'

const SERVICE_OPTIONS = [...SERVICES.map((s) => s.name), ...SOLUTIONS.map((s) => s.name), 'Not sure yet', 'Other']
const TURNSTILE = import.meta.env.VITE_TURNSTILE_SITE_KEY
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

function useTurnstile(ref) {
  const [token, setToken] = useState('')
  useEffect(() => {
    if (!TURNSTILE || !ref.current) return
    const render = () => window.turnstile?.render(ref.current, { sitekey: TURNSTILE, callback: setToken, 'expired-callback': () => setToken('') })
    if (window.turnstile) { render(); return }
    const s = document.createElement('script')
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    s.async = true
    s.onload = render
    document.head.appendChild(s)
  }, [ref])
  return token
}

export default function EnquiryForm({ type = 'quote' }) {
  const { state } = useLocation()
  const quote = type === 'quote'
  const [f, setF] = useState({ name: '', email: '', phone: '', company: '', service: state?.service || '', budget: '', message: '', website: '' })
  const [errs, setErrs] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | fallback | error
  const [serverMsg, setServerMsg] = useState('')
  const started = useRef(Date.now())
  const tsRef = useRef(null)
  const tsToken = useTurnstile(tsRef)

  useEffect(() => { if (state?.service) setF((v) => ({ ...v, service: state.service })) }, [state?.service])
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (f.name.trim().length < 2) e.name = 'Please enter your name.'
    if (!EMAIL.test(f.email.trim())) e.email = 'Please enter a valid email address.'
    if (f.phone && !/^[+()\d\s-]{7,24}$/.test(f.phone.trim())) e.phone = 'Please enter a valid phone number.'
    if (quote && !f.service) e.service = 'Please choose a service.'
    if (f.message.trim().length < 10) e.message = 'Please write at least a sentence about what you need.'
    setErrs(e)
    return !Object.keys(e).length
  }

  const summary = () => `Hello ByAruf, ${quote ? "I'd like a quote" : 'I have an enquiry'}.\n\nName: ${f.name}\nEmail: ${f.email}${f.phone ? `\nPhone: ${f.phone}` : ''}${f.company ? `\nCompany: ${f.company}` : ''}${f.service ? `\nService: ${f.service}` : ''}${f.budget ? `\nBudget: ${f.budget}` : ''}\n\n${f.message}`

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) { setTimeout(() => document.querySelector('[aria-invalid=true]')?.focus(), 0); return }
    setStatus('sending'); setServerMsg('')
    try {
      const r = await fetch('/api/enquiry', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, type, startedAt: started.current, turnstileToken: tsToken }),
      })
      const j = await r.json().catch(() => ({}))
      if (r.ok) setStatus('sent')
      else if (r.status === 503 || r.status === 404) setStatus('fallback')
      else { setStatus('error'); setServerMsg(j.error || 'Something went wrong.'); if (j.field) setErrs({ [j.field]: j.error }) }
    } catch {
      setStatus('fallback')
    }
  }

  if (status === 'sent') return (
    <div className="result ok" role="status">
      <h3>Thank you, {f.name.split(' ')[0]}. Your {quote ? 'request' : 'message'} has been sent.</h3>
      <p>We will reply to {f.email}. If it is urgent, message us on WhatsApp at {SITE.phone}.</p>
    </div>
  )

  if (status === 'fallback') return (
    <div className="result" role="status">
      <h3>Your message is ready to send</h3>
      <p>Our online form could not deliver it right now. Send the same details with one tap below, and nothing you typed is lost.</p>
      <div className="acts">
        <a className="btn wa" href={waLink(summary())} target="_blank" rel="noopener noreferrer"><WhatsAppIcon width="20" /> Send on WhatsApp</a>
        <a className="btn ghost" href={`mailto:${SITE.email}?subject=${encodeURIComponent((quote ? 'Quote request: ' : 'Enquiry: ') + (f.service || 'General'))}&body=${encodeURIComponent(summary())}`}><Icon name="mail" /> Send by email</a>
      </div>
      <button type="button" className="tlink" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', font: 'inherit' }} onClick={() => setStatus('idle')}>Edit my details</button>
    </div>
  )

  const field = (k, label, props = {}, hint) => (
    <div className="field">
      <label htmlFor={`f-${k}`}>{label}{hint && <span className="hint"> {hint}</span>}</label>
      {props.as === 'textarea'
        ? <textarea id={`f-${k}`} name={k} value={f[k]} onChange={set(k)} aria-invalid={!!errs[k]} aria-describedby={errs[k] ? `e-${k}` : undefined} maxLength={3000} placeholder={props.placeholder} />
        : <input id={`f-${k}`} name={k} value={f[k]} onChange={set(k)} aria-invalid={!!errs[k]} aria-describedby={errs[k] ? `e-${k}` : undefined} {...props} />}
      {errs[k] && <span className="err" id={`e-${k}`}>{errs[k]}</span>}
    </div>
  )

  return (
    <form className="form" onSubmit={submit} noValidate>
      {quote && (
        <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend>What do you need?</legend>
          <div className="choice" role="radiogroup" aria-invalid={!!errs.service} style={{ marginTop: 8 }}>
            {SERVICE_OPTIONS.map((o) => <label key={o}><input type="radio" name="service" value={o} checked={f.service === o} onChange={set('service')} /><span>{o}</span></label>)}
          </div>
          {errs.service && <span className="err">{errs.service}</span>}
        </fieldset>
      )}
      {!quote && (
        <div className="field">
          <label htmlFor="f-service">Topic <span className="hint">(optional)</span></label>
          <select id="f-service" name="service" value={f.service} onChange={set('service')}>
            <option value="">General enquiry</option>
            {SERVICE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      )}
      {field('message', quote ? 'Describe your project' : 'Your message', { as: 'textarea', placeholder: quote ? 'What are you building, who is it for, and what should it do? Any deadline?' : 'How can we help?' })}
      {quote && (
        <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend>Budget range <span className="hint">(optional, helps us shape the proposal)</span></legend>
          <div className="choice" style={{ marginTop: 8 }}>
            {BUDGETS.map((o) => <label key={o}><input type="radio" name="budget" value={o} checked={f.budget === o} onChange={set('budget')} /><span>{o}</span></label>)}
          </div>
        </fieldset>
      )}
      <div className="row2">
        {field('name', 'Full name', { autoComplete: 'name', required: true })}
        {field('company', 'Company', { autoComplete: 'organization' }, '(optional)')}
      </div>
      <div className="row2">
        {field('email', 'Email', { type: 'email', autoComplete: 'email', inputMode: 'email', required: true })}
        {field('phone', 'Phone or WhatsApp', { type: 'tel', autoComplete: 'tel', inputMode: 'tel' }, '(optional)')}
      </div>
      <div className="hp" aria-hidden="true"><label>Leave this empty<input tabIndex={-1} autoComplete="off" name="website" value={f.website} onChange={set('website')} /></label></div>
      {TURNSTILE && <div ref={tsRef} />}
      {status === 'error' && <div className="result bad" role="alert"><p>{serverMsg}</p></div>}
      <div className="acts" style={{ alignItems: 'center' }}>
        <button className="btn signal" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : quote ? 'Request a proposal' : 'Send message'} <Icon name="arrow" /></button>
        <span className="small mute">We only use your details to reply. <a href="/privacy/">Privacy</a></span>
      </div>
    </form>
  )
}
