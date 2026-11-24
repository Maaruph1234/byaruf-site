import { useEffect, useState, lazy, Suspense } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { SITE, waLink } from '../data/site.js'
import { PRODUCTS } from '../data/products.js'
import { SERVICES } from '../data/services.js'
import { findRoute, NOT_FOUND } from '../seo.js'

const Chatbot = lazy(() => import('./Chatbot.jsx'))

function useHead() {
  const { pathname } = useLocation()
  useEffect(() => {
    const r = findRoute(pathname) || NOT_FOUND
    document.title = r.title
    const set = (sel, attr, val) => { const el = document.head.querySelector(sel); if (el) el.setAttribute(attr, val) }
    const url = SITE.url + r.path
    set('meta[name="description"]', 'content', r.description)
    set('meta[name="keywords"]', 'content', [...new Set(r.keywords)].join(', '))
    set('link[rel="canonical"]', 'href', url)
    set('meta[property="og:title"]', 'content', r.title)
    set('meta[property="og:description"]', 'content', r.description)
    set('meta[property="og:url"]', 'content', url)
    window.scrollTo(0, 0)
  }, [pathname])
}

const WaIcon = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="#0a0a0a" d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.7 12.7-12.7S23 3 16 3zm0 23.1c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-4.1 1.3 1.3-4-.3-.4a10.5 10.5 0 1 1 8.9 4.8zm5.8-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.4 1.4.6 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" /></svg>
)
const ChatIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9.5h8M8 12.5h5" strokeLinecap="round" /></svg>
)

export default function Layout() {
  useHead()
  const [menu, setMenu] = useState(false)
  const [chat, setChat] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setMenu(false), [pathname])

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="top">
        <div className="nav">
          <Link className="logo" to="/"><i aria-hidden="true" />ByAruf</Link>
          <button className="menu" type="button" aria-expanded={menu} aria-controls="mainnav" onClick={() => setMenu((m) => !m)}>{menu ? 'Close' : 'Menu'}</button>
          <nav id="mainnav" className={'links' + (menu ? ' open' : '')} aria-label="Main">
            <NavLink to="/products/" className={({ isActive }) => (isActive ? 'on' : '')}>Products</NavLink>
            <NavLink to="/services/" className={({ isActive }) => (isActive ? 'on' : '')}>Services</NavLink>
            <NavLink to="/about/">About</NavLink>
            <NavLink to="/faq/">FAQ</NavLink>
            <NavLink to="/contact/">Contact</NavLink>
            <Link className="btn" to="/contact/">Book a demo</Link>
          </nav>
        </div>
      </header>

      <main id="main"><Outlet /></main>

      <footer className="foot">
        <div className="fgrid">
          <div>
            <Link className="logo" to="/"><i aria-hidden="true" />ByAruf</Link>
            <p className="mute" style={{ marginTop: 14 }}>Software products and tech services from Kubwa, Abuja, Federal Capital Territory, Nigeria.</p>
            <div className="lines" style={{ fontSize: 15, marginTop: 10, gap: 4 }}>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <span>WhatsApp: <a href={waLink()} target="_blank" rel="noopener noreferrer">{SITE.whatsappLabel}</a></span>
              <span>Call: {SITE.phones.map((p, i) => <span key={p.tel}>{i ? ', ' : ''}<a href={`tel:${p.tel}`}>{p.label}</a></span>)}</span>
            </div>
          </div>
          <div><strong>Products</strong><ul>{PRODUCTS.map((p) => <li key={p.slug}><Link to={`/products/${p.slug}/`}>{p.name}</Link></li>)}</ul></div>
          <div><strong>Services</strong><ul>{SERVICES.map((s) => <li key={s.slug}><Link to={`/services/${s.slug}/`}>{s.name}</Link></li>)}</ul></div>
          <div><strong>Company</strong><ul>
            <li><Link to="/about/">About</Link></li>
            <li><Link to="/areas-we-serve/">Areas we serve in Abuja</Link></li>
            <li><Link to="/faq/">FAQ</Link></li>
            <li><Link to="/contact/">Contact and demo</Link></li>
          </ul></div>
        </div>
        <div className="fbase">
          <span>© {new Date().getFullYear()} {SITE.legalName}. Kubwa, Abuja, FCT, Nigeria.</span>
          <span>Software development, blockchain, AI automation and branding in Abuja</span>
        </div>
      </footer>

      {chat && <Suspense fallback={null}><Chatbot onClose={() => setChat(false)} /></Suspense>}
      <div className="fab">
        <button type="button" onClick={() => setChat((c) => !c)} aria-label={chat ? 'Close chat assistant' : 'Open chat assistant'} aria-expanded={chat}><ChatIcon /></button>
        <a className="wa" href={waLink('Hello ByAruf, I would like to know more about your services.')} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"><WaIcon /></a>
      </div>
    </>
  )
}
