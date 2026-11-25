import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icons.jsx'
import ProjectCover from './ProjectCover.jsx'
import { openAssistant } from './Layout.jsx'
import { SITE, waLink } from '../data/site.js'
import { SERVICES } from '../data/services.js'

export const Crumbs = ({ items }) => (
  <nav className="crumbs" aria-label="Breadcrumb">
    <Link to="/">Home</Link>
    {items.map(([label, to]) => (
      <span key={label} style={{ display: 'contents' }}>
        <span aria-hidden="true">/</span>
        {to ? <Link to={to}>{label}</Link> : <span aria-current="page">{label}</span>}
      </span>
    ))}
  </nav>
)

export function PageHead({ crumbs, title, lede, icon, children, aside }) {
  return (
    <section className="phead">
      <div className="hero-glow" aria-hidden="true" />
      <div className="wrap">
        <Crumbs items={crumbs} />
        <div className="grid2">
          <div>
            {icon && <div className="phead-ic"><Icon name={icon} /></div>}
            <h1>{title}</h1>
            {lede && <p className="lede">{lede}</p>}
            {children}
          </div>
          {aside && <div>{aside}</div>}
        </div>
      </div>
    </section>
  )
}

export const SectionHead = ({ kicker, title, children }) => (
  <div className="shead">
    <div>{kicker && <div className="kicker">{kicker}</div>}<h2>{title}</h2></div>
    {children && <div className="lede">{children}</div>}
  </div>
)

export const statusClass = (s) => (/^live/i.test(s) ? 'live' : /development/i.test(s) ? 'dev' : /academic/i.test(s) ? 'academic' : '')

export const ProjectCard = ({ p }) => (
  <Link className="proj" to={`/work/${p.slug}/`}>
    <div className="cover"><ProjectCover p={p} /></div>
    <div className="body">
      <div className="top"><span className={'status ' + statusClass(p.status)}><i />{p.status}</span><span>{p.kind}</span></div>
      <h3>{p.name}</h3>
      <p>{p.summary}</p>
      <div className="tags">{p.stack.slice(0, 5).map((t) => <span key={t}>{t}</span>)}</div>
    </div>
  </Link>
)

const lc = (t) => (/^[A-Z][a-z]/.test(t) ? t[0].toLowerCase() + t.slice(1) : t)

export function ServiceExplorer() {
  const [i, setI] = useState(0)
  const s = SERVICES[i]
  const onKey = (e) => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return
    e.preventDefault()
    const n = (i + (e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1) + SERVICES.length) % SERVICES.length
    setI(n)
    document.getElementById(`tab-${SERVICES[n].slug}`)?.focus()
  }
  return (
    <div className="explorer">
      <div className="tabs" role="tablist" aria-label="Services" aria-orientation="vertical" onKeyDown={onKey}>
        {SERVICES.map((x, k) => (
          <button key={x.slug} id={`tab-${x.slug}`} role="tab" type="button" aria-selected={k === i} aria-controls="svc-panel" tabIndex={k === i ? 0 : -1} className="tab" onClick={() => setI(k)}>
            <span className="ic"><Icon name={x.icon} /></span>
            <span><strong>{x.name}</strong></span>
            <Icon name="arrow" className="chev" />
          </button>
        ))}
      </div>
      <div className="panel" id="svc-panel" role="tabpanel" aria-labelledby={`tab-${s.slug}`}>
        <h3>{s.name}</h3>
        <p>{s.intro}</p>
        <ul className="offer-list">{s.offers.slice(0, 6).map((o) => <li key={o[0]}><Icon name="check" />{o[0]}</li>)}</ul>
        <div className="foot">
          <span className="small mute">For {[s.who[0], s.who[1]].filter(Boolean).map(lc).join(' and ')}</span>
          <Link className="tlink" to={`/services/${s.slug}/`}>Explore {s.name} <Icon name="arrow" /></Link>
        </div>
      </div>
    </div>
  )
}

export function CTA({ title = 'Have an idea? Let us build it properly.', text = 'Tell us what you need. You will get a clear proposal with scope, timeline and cost before any work starts.', service }) {
  return (
    <section className="cta sec">
      <svg className="cta-lines" viewBox="0 0 1200 400" preserveAspectRatio="none" aria-hidden="true">
        {[0, 1, 2, 3].map((k) => <path key={k} d={`M0 ${220 + k * 30} C 300 ${120 + k * 40}, 600 ${340 - k * 30}, 1200 ${180 + k * 25}`} fill="none" stroke={k === 1 ? '#3ef0a8' : 'rgba(232,241,236,.12)'} strokeWidth={k === 1 ? 1.5 : 1} />)}
      </svg>
      <div className="wrap">
        <div>
          <div className="kicker">Start a project</div>
          <h2>{title}</h2>
          <p className="lede" style={{ marginTop: 20 }}>{text}</p>
          <div className="acts" style={{ marginTop: 32 }}>
            <Link className="btn signal" to="/quote/" state={service ? { service } : undefined}>Book a consultation <Icon name="arrow" /></Link>
            <button type="button" className="btn ghost" onClick={() => openAssistant()}>Talk to our AI assistant</button>
          </div>
        </div>
        <div className="contact-lines">
          <a href={`mailto:${SITE.email}`}><Icon name="mail" />{SITE.email}</a>
          <a href={`tel:${SITE.phoneTel}`}><Icon name="call" />{SITE.phone}</a>
          <a href={waLink('Hello ByAruf, I would like to discuss a project.')} target="_blank" rel="noopener noreferrer"><Icon name="chat" />WhatsApp {SITE.phone}</a>
          <span style={{ display: 'inline-flex', gap: 10, alignItems: 'center', color: 'var(--mute-inv)' }}><Icon name="pin" width="18" height="18" style={{ color: 'var(--signal-hi)' }} />Kubwa, Abuja, FCT</span>
        </div>
      </div>
    </section>
  )
}
