import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon, { WhatsAppIcon } from './Icons.jsx'
import { SITE, waLink } from '../data/site.js'

const KEY = 'byaruf-assistant-v1'
const GREETING = { role: 'assistant', content: "Hi, I'm the ByAruf AI Assistant. I can explain our services, help you work out what you need, talk through our past projects, or send your enquiry to the team. What are you working on?" }
const STARTERS = ['What does ByAruf do?', 'I need a website for my business', 'Can you automate our WhatsApp replies?', 'Show me your blockchain work', 'I want to send a project enquiry']

const load = () => { try { const v = JSON.parse(sessionStorage.getItem(KEY)); return Array.isArray(v) && v.length ? v : null } catch { return null } }
const save = (m) => { try { sessionStorage.setItem(KEY, JSON.stringify(m.slice(-30))) } catch { /* storage unavailable */ } }

// Turns plain text into text with clickable site paths, URLs and email addresses.
function Rich({ text, onNav }) {
  const re = /(\*\*[^*]+\*\*|https?:\/\/[^\s)]+|\/(?:[a-z0-9-]+\/)+|[\w.+-]+@[\w-]+\.[\w.]+)/g
  return String(text).split(re).map((part, i) => {
    if (!part) return null
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
    if (/^https?:\/\//.test(part)) return <a key={i} href={part} target="_blank" rel="noopener noreferrer">{part.replace(/^https?:\/\/(www\.)?/, '')}</a>
    if (part.startsWith('/') && part.endsWith('/')) return <Link key={i} to={part} onClick={onNav}>{part}</Link>
    if (part.includes('@')) return <a key={i} href={`mailto:${part}`}>{part}</a>
    return <Fragment key={i}>{part}</Fragment>
  })
}

async function offlineAnswer(q) {
  const { retrieve } = await import('../data/kb.js')
  const [d] = retrieve(q, 1)
  if (!d) return { content: `I don't have an answer for that here. The team can help directly: ${SITE.email} or WhatsApp ${SITE.phone}. You can also describe your project on /quote/.` }
  return { content: `${d.brief || d.text}\n\nMore on ${d.url}` }
}

export default function Assistant({ open, onClose, seed }) {
  const [msgs, setMsgs] = useState([GREETING])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [offline, setOffline] = useState(false)
  const logRef = useRef(null)
  const inRef = useRef(null)
  const seeded = useRef(null)

  useEffect(() => { const v = load(); if (v) setMsgs(v) }, [])
  useEffect(() => { save(msgs) }, [msgs])
  useEffect(() => { logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' }) }, [msgs, busy])
  useEffect(() => { if (open) setTimeout(() => inRef.current?.focus(), 50) }, [open])
  useEffect(() => {
    if (!open) return
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open, onClose])

  const ask = useCallback(async (text) => {
    const q = text.trim()
    if (!q || busy) return
    const history = [...msgs, { role: 'user', content: q }]
    setMsgs(history)
    setInput('')
    setBusy(true)
    try {
      if (offline) { const a = await offlineAnswer(q); setMsgs((m) => [...m, { role: 'assistant', ...a }]); return }
      const payload = history.filter((m) => m.role === 'user' || m.role === 'assistant').map(({ role, content }) => ({ role, content }))
      const r = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: payload.slice(-16) }) })
      const j = await r.json().catch(() => ({}))
      if (r.status === 503 && j.error === 'not_configured') {
        setOffline(true)
        const a = await offlineAnswer(q)
        setMsgs((m) => [...m, { role: 'assistant', ...a }])
      } else if (!r.ok) {
        setMsgs((m) => [...m, { role: 'error', content: j.error || 'Something went wrong. Please try again, or contact the team on WhatsApp.' }])
      } else {
        setMsgs((m) => [...m, { role: 'assistant', content: j.reply, sources: j.sources || [], enquiry: j.enquiry || null }])
      }
    } catch {
      setMsgs((m) => [...m, { role: 'error', content: 'Could not reach the assistant. Check your connection and try again, or message us on WhatsApp.' }])
    } finally {
      setBusy(false)
    }
  }, [msgs, busy, offline])

  useEffect(() => {
    if (open && seed && seeded.current !== seed) { seeded.current = seed; ask(seed) }
  }, [open, seed, ask])

  const reset = () => { setMsgs([GREETING]); setOffline(false) }

  if (!open) return null
  const showStarters = msgs.length === 1

  return (
    <section className="chatbox" role="dialog" aria-modal="false" aria-label="ByAruf AI Assistant">
      <header>
        <span className="dot" aria-hidden="true" />
        <div><strong>ByAruf AI Assistant</strong><small>{offline ? 'Quick answers from our site' : 'Answers about our services and work'}</small></div>
        <button type="button" className="x" onClick={reset} aria-label="Start a new conversation" title="New conversation"><Icon name="chat" /></button>
        <button type="button" className="x" style={{ marginLeft: 0 }} onClick={onClose} aria-label="Close assistant"><Icon name="close" /></button>
      </header>
      {offline && <div className="mode">The AI service is not connected yet, so these answers come straight from our website. For anything else, message the team.</div>}
      <div className="alog" ref={logRef} aria-live="polite">
        {msgs.map((m, i) => (
          <div key={i} className={'m ' + ({ user: 'u', assistant: 'a', error: 'err' }[m.role] || 'a')}>
            <Rich text={m.content} onNav={onClose} />
            {m.sources?.length > 0 && <div className="srcs">{m.sources.map((s) => <Link key={s.url} to={s.url} onClick={onClose}>{s.title}</Link>)}</div>}
            {m.enquiry && m.enquiry.status !== 'sent' && (
              <div style={{ marginTop: 10 }}>
                <a className="btn wa" style={{ minHeight: 42, fontSize: 14 }} target="_blank" rel="noopener noreferrer"
                  href={waLink(`Hello ByAruf, project enquiry:\nName: ${m.enquiry.data.name}\nEmail: ${m.enquiry.data.email}\n${m.enquiry.data.phone ? 'Phone: ' + m.enquiry.data.phone + '\n' : ''}${m.enquiry.data.service ? 'Service: ' + m.enquiry.data.service + '\n' : ''}${m.enquiry.data.budget ? 'Budget: ' + m.enquiry.data.budget + '\n' : ''}\n${m.enquiry.data.message}`)}>
                  <WhatsAppIcon /> Send on WhatsApp
                </a>
              </div>
            )}
          </div>
        ))}
        {busy && <div className="typing" aria-label="Assistant is typing"><i /><i /><i /></div>}
        {showStarters && <div className="sugg">{STARTERS.map((s) => <button key={s} type="button" onClick={() => ask(s)}>{s}</button>)}</div>}
      </div>
      <form className="acomp" onSubmit={(e) => { e.preventDefault(); ask(input) }}>
        <label className="sr" htmlFor="assistant-input">Your message</label>
        <textarea id="assistant-input" ref={inRef} rows={1} value={input} maxLength={1500} placeholder="Ask about services, projects or your idea"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(input) } }} />
        <button type="submit" disabled={busy || !input.trim()} aria-label="Send message"><Icon name="send" /></button>
      </form>
      <div className="afoot">AI can make mistakes. Confirm details with the team. See our <Link to="/privacy/" onClick={onClose}>privacy notice</Link>.</div>
    </section>
  )
}
