import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FAQ } from '../data/faq.js'
import { PRODUCTS } from '../data/products.js'
import { SERVICES } from '../data/services.js'
import { SITE, waLink, AREAS } from '../data/site.js'

const STOP = new Set('a an the is are am i me my we our you your do does can could would will to of for in on at and or with how what which who where when why it this that be have has about please tell want need get any some there'.split(' '))
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9₦&\s]/g, ' ').split(/\s+/).filter((w) => w && !STOP.has(w)).map((w) => (w.length > 4 && w.endsWith('s') ? w.slice(0, -1) : w))

// Build the knowledge base once: FAQ answers plus one entry per product and service.
const KB = [
  ...FAQ.map((f) => ({ q: f.q, k: f.k, a: f.a, link: f.cat === 'Contact' || f.q === 'How do I get started?' ? { to: '/contact/', label: 'Book a free demo' } : null })),
  ...PRODUCTS.map((p) => ({
    q: p.name, k: `${p.name} ${p.keywords.join(' ')} ${p.who.join(' ')} ${p.modules.map((m) => m[0]).join(' ')}`,
    a: `${p.name}: ${p.short}\n\nIt includes ${p.modules.slice(0, 5).map((m) => m[0].toLowerCase()).join(', ')} and more. Best for ${p.who.slice(0, 3).join(', ').toLowerCase()}.`,
    link: { to: `/products/${p.slug}/`, label: `See ${p.name}` },
  })),
  ...SERVICES.map((s) => ({
    q: s.name, k: `${s.name} ${s.keywords.join(' ')} ${s.offers.map((o) => o[0]).join(' ')}`,
    a: `${s.name}: ${s.short}\n\nThis covers ${s.offers.map((o) => o[0].toLowerCase()).join(', ')}.`,
    link: { to: `/services/${s.slug}/`, label: `See ${s.name}` },
  })),
  { q: 'Which areas in Abuja do you serve?', k: `areas serve near me ${AREAS.join(' ')} council fct`, a: `All of Abuja and the FCT, including ${AREAS.slice(0, 16).join(', ')} and more, plus the rest of Nigeria.`, link: { to: '/areas-we-serve/', label: 'Areas we serve' } },
].map((e) => ({ ...e, qt: norm(e.q), kt: norm(e.k), at: norm(e.a) }))

function answer(text) {
  const t = text.toLowerCase().trim()
  if (/^(hi|hello|hey|good (morning|afternoon|evening)|salam|assalam|howdy)\b/.test(t) && t.split(' ').length <= 4)
    return { text: "Hello! I can answer questions about ByAruf's products, services, pricing, setup time and how to reach us. What would you like to know?" }
  if (/\b(thanks|thank you|ok thanks|great)\b/.test(t) && t.split(' ').length <= 4)
    return { text: 'You are welcome. Anything else you would like to know?' }
  if (/\b(human|real person|live agent|customer care|(talk|speak|chat) (to|with) (someone|somebody|a person|you|aruf|ma'?aruf))\b/.test(t))
    return { text: `You can chat with Ma'aruf directly on WhatsApp at ${SITE.whatsappLabel}.`, wa: text }
  if (/\b(how much|price|prices|pricing|cost|costs|charge|fee|fees|rate|budget|quote|quotation|naira|₦)\b/.test(t)) {
    const f = FAQ.find((x) => x.q === 'How much does it cost?')
    return { text: f.a, link: { to: '/contact/', label: 'Get a quote' }, wa: text }
  }
  const words = norm(text)
  if (!words.length) return { text: 'Could you say a little more about what you need?' }
  let best = null, score = 0
  for (const e of KB) {
    let s = 0
    for (const w of words) {
      if (e.qt.includes(w)) s += 3
      if (e.kt.includes(w)) s += 2
      else if (e.kt.some((k) => k.length > 3 && (k.startsWith(w) || w.startsWith(k)))) s += 1
      if (e.at.includes(w)) s += 0.5
    }
    s = s / Math.sqrt(words.length)
    if (s > score) { score = s; best = e }
  }
  if (!best || score < 1.6)
    return { text: "I don't have a ready answer for that. Send your question on WhatsApp and you'll get a reply from Ma'aruf directly.", wa: text }
  return { text: best.a, link: best.link }
}

const START = ['What products do you sell?', 'How much does it cost?', 'Do you do blockchain development?', 'Can you build a mobile app?', 'How long does setup take?', 'Where are you located?']

export default function Chatbot({ onClose }) {
  const [log, setLog] = useState([{ from: 'bot', text: "Hi, I'm the ByAruf assistant. Ask me anything about our software, services, pricing or how to get started." }])
  const [input, setInput] = useState('')
  const end = useRef(null)
  const field = useRef(null)
  useEffect(() => { end.current?.scrollIntoView({ block: 'end' }) }, [log])
  useEffect(() => { field.current?.focus() }, [])
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose])

  const ask = (q) => {
    const text = q.trim()
    if (!text) return
    setLog((l) => [...l, { from: 'me', text }, { from: 'bot', ...answer(text) }])
    setInput('')
  }

  return (
    <section className="chat" role="dialog" aria-label="ByAruf assistant">
      <header>
        <div><strong>ByAruf assistant</strong><small>Instant answers, or chat on WhatsApp</small></div>
        <button type="button" onClick={onClose} aria-label="Close chat">Close</button>
      </header>
      <div className="log" aria-live="polite">
        {log.map((m, i) => (
          <div key={i} className={'msg ' + m.from}>
            {m.text}
            {m.link && <><br /><Link to={m.link.to} onClick={onClose}>{m.link.label}</Link></>}
            {m.wa !== undefined && <><br /><a href={waLink(`Hello ByAruf, ${m.wa}`)} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a></>}
          </div>
        ))}
        {log.length < 3 && <div className="sugg">{START.map((s) => <button key={s} type="button" onClick={() => ask(s)}>{s}</button>)}</div>}
        <div ref={end} />
      </div>
      <form onSubmit={(e) => { e.preventDefault(); ask(input) }}>
        <input ref={field} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your question" aria-label="Your question" />
        <button className="btn" type="submit">Send</button>
      </form>
    </section>
  )
}

export { answer }
