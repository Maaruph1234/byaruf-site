import { useCallback, useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import Icon, { Mark, WhatsAppIcon } from './Icons.jsx'
import Assistant from './Assistant.jsx'
import { SITE, waLink } from '../data/site.js'
import { SERVICES } from '../data/services.js'
import { SOLUTIONS } from '../data/solutions.js'
import { findRoute, NOT_FOUND } from '../seo.js'

export const openAssistant = (prompt) => window.dispatchEvent(new CustomEvent('byaruf:assistant', { detail: { prompt } }))

function useHead() {
  const { pathname } = useLocation()
  useEffect(() => {
    const r = findRoute(pathname) || NOT_FOUND
    document.title = r.title
    const set = (sel, attr, val) => document.head.querySelector(sel)?.setAttribute(attr, val)
    set('meta[name="description"]', 'content', r.description)
    set('link[rel="canonical"]', 'href', SITE.url + r.path)
    set('meta[property="og:title"]', 'content', r.title)
    set('meta[property="og:description"]', 'content', r.description)
    set('meta[property="og:url"]', 'content', SITE.url + r.path)
    window.scrollTo(0, 0)
    // Analytics-ready: pages can be tracked by listening for this event.
    window.dispatchEvent(new CustomEvent('byaruf:pageview', { detail: { path: pathname } }))
  }, [pathname])
}

const NAV = [['/services/', 'Services'], ['/solutions/', 'Solutions'], ['/work/', 'Work'], ['/about/', 'About'], ['/contact/', 'Contact']]

export default function Layout() {
  useHead()
  const { pathname } = useLocation()
  const [menu, setMenu] = useState(false)
  const [chat, setChat] = useState({ open: false, seed: null })
  useEffect(() => setMenu(false), [pathname])
  useEffect(() => {
    const h = (e) => setChat({ open: true, seed: e.detail?.prompt || null })
    window.addEventListener('byaruf:assistant', h)
    return () => window.removeEventListener('byaruf:assistant', h)
  }, [])
  const close = useCallback(() => setChat((c) => ({ ...c, open: false })), [])

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="hdr">
        <div className="in">
          <Link className="brand" to="/" aria-label="ByAruf home"><Mark />ByAruf</Link>
          <button className="burger" type="button" aria-expanded={menu} aria-controls="nav" aria-label={menu ? 'Close menu' : 'Open menu'} onClick={() => setMenu((m) => !m)}><Icon name={menu ? 'close' : 'menu'} /></button>
          <nav id="nav" className={'nav' + (menu ? ' open' : '')} aria-label="Main">
            {NAV.map(([to, label]) => <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'on' : '')}>{label}</NavLink>)}
            <Link className="btn signal" to="/quote/">Start a project</Link>
          </nav>
        </div>
      </header>

      <main id="main"><Outlet /></main>

      <footer className="ftr">
        <div className="wrap">
          <div className="cols">
            <div>
              <Link className="brand" to="/"><Mark />ByAruf</Link>
              <p style={{ maxWidth: '36ch' }}>Technology and digital solutions for businesses, startups and organisations. Based in Kubwa, Abuja.</p>
              <ul style={{ marginTop: 18 }}>
                <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
                <li><a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a></li>
                <li><a href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp us</a></li>
                <li><a href={SITE.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
              </ul>
            </div>
            <div><h4>Services</h4><ul>{SERVICES.map((s) => <li key={s.slug}><Link to={`/services/${s.slug}/`}>{s.name}</Link></li>)}</ul></div>
            <div><h4>Solutions</h4><ul>{SOLUTIONS.map((s) => <li key={s.slug}><Link to={`/solutions/${s.slug}/`}>{s.name}</Link></li>)}</ul></div>
            <div><h4>Company</h4><ul>
              <li><Link to="/about/">About</Link></li>
              <li><Link to="/work/">Our work</Link></li>
              <li><Link to="/quote/">Get a quote</Link></li>
              <li><Link to="/contact/">Contact</Link></li>
              <li><Link to="/faq/">FAQ</Link></li>
              <li><Link to="/areas-we-serve/">Areas we serve in Abuja</Link></li>
              <li><Link to="/privacy/">Privacy</Link></li>
            </ul></div>
          </div>
          <div className="base">
            <span>© 2026 ByAruf. Kubwa, Abuja, Federal Capital Territory, Nigeria.</span>
            <span>Software, web, mobile, AI, cloud, blockchain and branding.</span>
          </div>
        </div>
      </footer>

      {!chat.open && (
        <div className="launch">
          <a className="wa-btn" href={waLink('Hello ByAruf, I would like to discuss a project.')} target="_blank" rel="noopener noreferrer" aria-label="Chat with ByAruf on WhatsApp"><WhatsAppIcon /></a>
          <button type="button" className="ai-btn" onClick={() => setChat({ open: true, seed: null })} aria-label="Open the ByAruf AI Assistant"><span className="dot" aria-hidden="true" /><span className="t">Ask ByAruf AI</span><Icon name="chat" width="20" height="20" className="ic-only" /></button>
        </div>
      )}
      <Assistant open={chat.open} seed={chat.seed} onClose={close} />
    </>
  )
}
