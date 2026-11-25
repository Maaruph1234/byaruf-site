// Structured knowledge base for the ByAruf AI Assistant.
// Used on the server for retrieval grounding, and in the browser as an offline fallback.
import { SITE, POSITIONING, STACK, AREAS } from './site.js'
import { SERVICES } from './services.js'
import { SOLUTIONS } from './solutions.js'
import { PROJECTS } from './projects.js'
import { FAQ } from './faq.js'

const list = (a) => a.join('; ')

export const KB = [
  {
    id: 'company', title: 'Company overview', url: '/about/', always: true, brief: POSITIONING,
    text: `${POSITIONING} Founder: ${SITE.founder} (B.Eng Telecommunications Engineering, AFIT Kaduna; AWS certified; Solidity-certified blockchain developer; former COO of dGlobalIT). Location: ${SITE.location}. Service lines: ${SERVICES.map((s) => s.name).join(', ')}. Ready-made solutions: ${SOLUTIONS.map((s) => s.name).join(', ')}.`,
  },
  {
    id: 'contact', title: 'Contact and enquiry process', url: '/contact/', always: true, brief: `Email ${SITE.email}, call or WhatsApp ${SITE.phone}, or describe your project on the Get a Quote page.`,
    text: `Email ${SITE.email}. Phone and WhatsApp ${SITE.phone}. Website ${SITE.url}. Enquiries: the Get a Quote page (/quote/) collects service, project description, budget range, name, email and phone. The Contact page (/contact/) takes general messages. Visitors can also send an enquiry through this assistant. Process: discovery conversation, written proposal with scope, timeline and cost, staged design and build, launch and support. Prices are not published; every project is quoted on scope.`,
  },
  ...SERVICES.map((s) => ({
    id: 'service-' + s.slug, title: `Service: ${s.name}`, url: `/services/${s.slug}/`,
    brief: `${s.short} ${s.intro}`,
    text: `${s.name}. ${s.short} ${s.intro} Offers: ${s.offers.map((o) => `${o[0]} (${o[1]})`).join('; ')}. Who it is for: ${list(s.who)}. Problems it solves: ${list(s.problems)}. Related projects: ${s.projects.map((p) => PROJECTS.find((x) => x.slug === p)?.name).filter(Boolean).join(', ')}.`,
    keys: s.keywords.join(' '),
  })),
  ...SOLUTIONS.map((p) => ({
    id: 'solution-' + p.slug, title: `Ready-made solution: ${p.name}`, url: `/solutions/${p.slug}/`,
    brief: `${p.name}: ${p.short} ${p.intro}`,
    text: `${p.name} (${p.audience}). ${p.short} ${p.intro} Modules: ${p.modules.map((m) => m[0]).join(', ')}. Suited to: ${list(p.who)}. ${p.proof}`,
    keys: p.keywords.join(' '),
  })),
  ...PROJECTS.map((p) => ({
    id: 'project-' + p.slug, title: `Portfolio project: ${p.name}`, url: `/work/${p.slug}/`,
    brief: `${p.name} (${p.kind}, ${p.status.toLowerCase()}): ${p.summary}`,
    text: `${p.name}, ${p.kind}. Status: ${p.status}. ${p.summary} Problem: ${p.problem} What was built: ${list(p.built)}. Technologies: ${p.stack.join(', ')}. ${p.note || ''} GitHub: ${p.repo}.${p.live ? ' Live site: ' + p.live + '.' : ''}`,
  })),
  {
    id: 'stack', title: 'Technology stack', url: '/#stack',
    text: STACK.map((g) => `${g.layer}: ${g.items.join(', ')}`).join('. ') + '.',
  },
  {
    id: 'areas', title: 'Areas served', url: '/areas-we-serve/',
    text: `Based in Kubwa, Abuja. Serves all of Abuja and the FCT, including ${AREAS.join(', ')}, the rest of Nigeria, and clients abroad.`,
  },
  ...FAQ.map((f, i) => ({ id: 'faq-' + i, title: `FAQ: ${f.q}`, url: '/faq/', brief: f.a, text: `${f.q} ${f.a}`, keys: f.k })),
]

const STOP = new Set('a an the is are am i me my we our you your do does can could would will to of for in on at and or with how what which who where when why it this that be have has about please tell want need get any some there can just like also'.split(' '))
export const tokens = (s) => String(s).toLowerCase().replace(/[^a-z0-9₦\s]/g, ' ').split(/\s+/)
  .filter((w) => w.length > 1 && !STOP.has(w)).map((w) => (w.length > 4 && w.endsWith('s') ? w.slice(0, -1) : w))

const INDEX = KB.map((d) => ({ d, title: new Set(tokens(d.title + ' ' + (d.keys || ''))), body: tokens(d.text) }))

// Simple keyword retrieval: title and keyword hits weigh more than body hits.
export function retrieve(query, k = 5) {
  const q = [...new Set(tokens(query))]
  if (!q.length) return []
  return INDEX.map(({ d, title, body }) => {
    let s = 0
    for (const w of q) {
      if (title.has(w)) s += 3
      const n = body.filter((b) => b === w || (w.length > 4 && b.startsWith(w))).length
      s += Math.min(n, 3) * 0.7
    }
    return { d, s: s / Math.sqrt(q.length) }
  }).filter((x) => x.s > 0.6).sort((a, b) => b.s - a.s).slice(0, k).map((x) => x.d)
}
