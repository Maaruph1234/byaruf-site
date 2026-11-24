import { useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import Preview from './components/Preview.jsx'
import { PRODUCTS } from './data/products.js'
import { SERVICES } from './data/services.js'
import { FAQ } from './data/faq.js'
import { SITE, AREAS, COUNCILS, waLink } from './data/site.js'

const Crumbs = ({ items }) => (
  <nav className="crumbs" aria-label="Breadcrumb">
    <Link to="/">Home</Link>
    {items.map(([label, to]) => <span key={label}>/ {to ? <Link to={to}>{label}</Link> : <span aria-current="page">{label}</span>}</span>)}
  </nav>
)

const DemoBand = ({ product }) => (
  <section className="band greenband">
    <div className="wrap two" style={{ alignItems: 'center' }}>
      <div>
        <h2>{product ? `See the ${product} in action` : 'Talk to us about your project'}</h2>
        <p style={{ marginTop: 14 }}>Book a free 30 minute demo or send a message on WhatsApp. You will get a clear answer on what fits, how long it takes and what it costs.</p>
      </div>
      <div className="acts">
        <Link className="btn" to="/contact/" state={product ? { product } : undefined} style={{ background: '#0a0a0a', color: '#fff', borderColor: '#0a0a0a' }}>Book a free demo</Link>
        <a className="btn wa" href={waLink(`Hello ByAruf, I'm interested in ${product || 'your services'}.`)} target="_blank" rel="noopener noreferrer">WhatsApp {SITE.whatsappLabel}</a>
      </div>
    </div>
  </section>
)

/* ---------------- Home ---------------- */
export function Home() {
  return (
    <>
      <section className="hero">
        <div className="copy">
          <h1>Software company in Abuja building tools that are ready to work</h1>
          <p className="lead">ByAruf sells ready-made business software for real estate, travel, field teams and delivery, and builds custom apps, blockchain systems, AI automations and brands for businesses across the FCT and Nigeria.</p>
          <div className="acts">
            <Link className="btn" to="/contact/">Book a free demo</Link>
            <Link className="btn alt" to="/products/">See the products</Link>
          </div>
        </div>
        <div className="stage" aria-hidden="true">
          <div className="s1"><Preview kind="tracker" /></div>
          <div className="s2"><Preview kind="travel" /></div>
          <div className="s3"><Preview kind="courier" /></div>
        </div>
      </section>

      <section className="band">
        <div className="wrap two" style={{ alignItems: 'end' }}>
          <h2>Four products, ready to set up for your company</h2>
          <p className="mute" style={{ margin: 0 }}>Each product started as a real client project. You get a tested system with your logo, colours and data, for a setup fee and a monthly plan that covers hosting, backups, updates and support.</p>
        </div>
      </section>

      <div>
        {PRODUCTS.map((p) => (
          <article className="prod" key={p.slug}>
            <div className="txt">
              <span className="tag">{p.audience}</span>
              <h3>{p.name}</h3>
              <p>{p.short}</p>
              <ul className="ticks">{p.modules.slice(0, 5).map((m) => <li key={m[0]}>{m[0]}</li>)}</ul>
              <p className="for">{p.proof}</p>
              <div className="acts"><Link className="btn" to={`/products/${p.slug}/`}>See {p.name}</Link></div>
            </div>
            <div className="shot"><Preview kind={p.preview} /></div>
          </article>
        ))}
      </div>

      <section className="split">
        <div>
          <h2>How it works</h2>
          <ol className="steps">
            <li><div><strong>Free demo</strong>A 30 minute call where we show you the product with sample data and learn how your business runs.</div></li>
            <li><div><strong>Setup in 2 to 4 weeks</strong>Your logo, colours, staff accounts and existing records loaded in, with small changes to fit how you work.</div></li>
            <li><div><strong>Training and launch</strong>Your team learns it in one session and you go live on your own web address.</div></li>
            <li><div><strong>Monthly plan</strong>Hosting, backups, security updates and support for one flat monthly fee.</div></li>
          </ol>
        </div>
        <div className="pinkband">
          <h2>Services</h2>
          <p style={{ marginTop: 14 }}>When a product does not fit, we build exactly what you need.</p>
          <div className="rows">
            {SERVICES.map((s) => <Link className="rowlink" key={s.slug} to={`/services/${s.slug}/`}><strong>{s.name}</strong>{s.short}</Link>)}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap two">
          <div><h2>Built in Kubwa, Abuja, for businesses everywhere</h2></div>
          <div>
            <p>ByAruf is run by Ma'aruf Yusuf, a telecoms engineer from AFIT Kaduna, AWS certified and Solidity-certified blockchain developer, and former COO of dGlobalIT. We work with businesses in every part of Abuja and the Federal Capital Territory and with clients across Nigeria.</p>
            <div className="chips" style={{ marginTop: 8 }}>
              {['Kubwa', 'Wuse', 'Maitama', 'Garki', 'Gwarinpa', 'Jabi', 'Lugbe', 'Asokoro'].map((a) => <span key={a}>{a}</span>)}
              <Link to="/areas-we-serve/">All areas</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <h2>Common questions</h2>
          <div className="faq" style={{ marginTop: 20 }}>
            {FAQ.filter((f) => ['What is ByAruf?', 'How much does it cost?', 'How long does setup take?', 'Do you do blockchain development?', 'Where are you located?'].includes(f.q)).map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
          <p style={{ marginTop: 20 }}><Link to="/faq/">Read all questions and answers</Link></p>
        </div>
      </section>
      <DemoBand />
    </>
  )
}

/* ---------------- Products ---------------- */
export function Products() {
  return (
    <>
      <section className="band">
        <div className="wrap">
          <Crumbs items={[['Products']]} />
          <h1 style={{ marginTop: 16 }}>Business software for Nigerian companies</h1>
          <p className="lead" style={{ marginTop: 16 }}>Ready-made systems built in Abuja and tested with real clients. Each one is set up with your brand, your data and your team in 2 to 4 weeks.</p>
          <div className="grid">
            {PRODUCTS.map((p) => (
              <Link className="cardlink" key={p.slug} to={`/products/${p.slug}/`}>
                <span className="tag">{p.audience}</span>
                <h3>{p.name}</h3>
                <p className="mute" style={{ margin: 0 }}>{p.short}</p>
                <span className="more">See details</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <DemoBand />
    </>
  )
}

export function ProductPage() {
  const { slug } = useParams()
  const p = PRODUCTS.find((x) => x.slug === slug)
  if (!p) return <NotFound />
  const others = PRODUCTS.filter((x) => x.slug !== slug)
  return (
    <>
      <section className="phead">
        <div className="copy">
          <Crumbs items={[['Products', '/products/'], [p.name]]} />
          <span className="tag">{p.audience}</span>
          <h1>{p.name}</h1>
          <p className="lead">{p.intro}</p>
          <div className="acts">
            <Link className="btn" to="/contact/" state={{ product: p.name }}>Book a demo</Link>
            <a className="btn alt" href={waLink(`Hello ByAruf, I'm interested in the ${p.name}.`)} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
          </div>
        </div>
        <div className="shot"><Preview kind={p.preview} /></div>
      </section>

      <section className="band pinkband">
        <div className="wrap two">
          <h2>The problem it solves</h2>
          <ul className="ticks" style={{ margin: 0 }}>{p.problem.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <h2>What is included</h2>
          <div className="grid modules">
            {p.modules.map(([t, d]) => <div className="m" key={t}><strong>{t}</strong><p>{d}</p></div>)}
          </div>
          <p className="note">{p.proof}</p>
        </div>
      </section>

      <section className="split">
        <div>
          <h2>Who it is for</h2>
          <ul className="ticks" style={{ marginTop: 20 }}>{p.who.map((x) => <li key={x}>{x}</li>)}</ul>
          <p className="mute">Available to businesses in Abuja, the FCT and anywhere in Nigeria.</p>
        </div>
        <div>
          <h2>How setup works</h2>
          <ol className="steps">
            <li><div><strong>Demo</strong>We walk through the system with sample data.</div></li>
            <li><div><strong>Setup</strong>Your branding, users and existing records loaded in, in 2 to 4 weeks.</div></li>
            <li><div><strong>Training</strong>One session for your team, plus written guides.</div></li>
            <li><div><strong>Support</strong>Hosting, backups, updates and help on a monthly plan.</div></li>
          </ol>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <h2>Other products</h2>
          <div className="grid">
            {others.map((o) => <Link className="cardlink" key={o.slug} to={`/products/${o.slug}/`}><h3>{o.name}</h3><p className="mute" style={{ margin: 0 }}>{o.short}</p><span className="more">See details</span></Link>)}
          </div>
        </div>
      </section>
      <DemoBand product={p.name} />
    </>
  )
}

/* ---------------- Services ---------------- */
export function Services() {
  return (
    <>
      <section className="band">
        <div className="wrap">
          <Crumbs items={[['Services']]} />
          <h1 style={{ marginTop: 16 }}>Tech services in Abuja, FCT</h1>
          <p className="lead" style={{ marginTop: 16 }}>Blockchain development, AI automation, web and mobile apps, tech project management, cloud setup and business branding, from one team that understands both the business and the technology.</p>
          <div className="grid">
            {SERVICES.map((s) => (
              <Link className="cardlink" key={s.slug} to={`/services/${s.slug}/`}>
                <h3>{s.name}</h3>
                <p className="mute" style={{ margin: 0 }}>{s.short}</p>
                <span className="more">See details</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <DemoBand />
    </>
  )
}

export function ServicePage() {
  const { slug } = useParams()
  const s = SERVICES.find((x) => x.slug === slug)
  if (!s) return <NotFound />
  return (
    <>
      <section className="phead">
        <div className="copy">
          <Crumbs items={[['Services', '/services/'], [s.name]]} />
          <h1>{s.name} in Abuja</h1>
          <p className="lead">{s.intro}</p>
          <div className="acts">
            <Link className="btn" to="/contact/" state={{ product: s.name }}>Get a quote</Link>
            <a className="btn alt" href={waLink(`Hello ByAruf, I need help with ${s.name.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
          </div>
        </div>
        <div className="shot"><Preview kind={s.preview} /></div>
      </section>

      <section className="band">
        <div className="wrap">
          <h2>What we offer</h2>
          <div className="grid modules">
            {s.offers.map(([t, d]) => <div className="m" key={t}><strong>{t}</strong><p>{d}</p></div>)}
          </div>
          <p className="note">{s.note}</p>
        </div>
      </section>

      <section className="split">
        <div>
          <h2>How we work</h2>
          <ol className="steps">{s.process.map((x) => <li key={x}><div><strong>{x}</strong></div></li>)}</ol>
        </div>
        <div className="pinkband">
          <h2>Other services</h2>
          <div className="rows">
            {SERVICES.filter((x) => x.slug !== slug).map((x) => <Link className="rowlink" key={x.slug} to={`/services/${x.slug}/`}><strong>{x.name}</strong>{x.short}</Link>)}
          </div>
        </div>
      </section>
      <DemoBand product={s.name} />
    </>
  )
}

/* ---------------- Areas ---------------- */
export function Areas() {
  return (
    <>
      <section className="band">
        <div className="wrap">
          <Crumbs items={[['Areas we serve']]} />
          <h1 style={{ marginTop: 16 }}>Software, website and app developer near you in Abuja</h1>
          <p className="lead" style={{ marginTop: 16 }}>ByAruf is based in Kubwa, Bwari Area Council, and works with businesses, schools, NGOs and government agencies across the Federal Capital Territory. Meetings can happen at your office, at a spot that suits you or by video call.</p>
        </div>
      </section>
      <section className="band">
        <div className="wrap two">
          <div>
            <h2>Districts and neighbourhoods</h2>
            <p className="mute" style={{ marginTop: 14 }}>Website design, app development, blockchain, AI automation and branding for businesses in:</p>
          </div>
          <div className="chips">{AREAS.map((a) => <span key={a}>{a}</span>)}</div>
        </div>
      </section>
      <section className="band pinkband">
        <div className="wrap two">
          <h2>All six area councils of the FCT</h2>
          <ul className="ticks" style={{ margin: 0 }}>{COUNCILS.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
      </section>
      <section className="band">
        <div className="wrap">
          <h2>What businesses in Abuja come to us for</h2>
          <div className="grid">
            {[...PRODUCTS.map((p) => [p.name, `/products/${p.slug}/`, p.short]), ...SERVICES.map((s) => [s.name, `/services/${s.slug}/`, s.short])].map(([n, to, d]) => (
              <Link className="cardlink" key={n} to={to}><h3>{n}</h3><p className="mute" style={{ margin: 0 }}>{d}</p></Link>
            ))}
          </div>
          <p className="note">Outside Abuja? We also work with clients in Lagos, Kano, Kaduna, Port Harcourt, Ibadan, Enugu, Jos and the rest of Nigeria, and with clients abroad.</p>
        </div>
      </section>
      <DemoBand />
    </>
  )
}

/* ---------------- About ---------------- */
export function About() {
  return (
    <>
      <section className="band">
        <div className="wrap two">
          <div>
            <Crumbs items={[['About']]} />
            <h1 style={{ marginTop: 16 }}>About ByAruf and Ma'aruf Yusuf</h1>
          </div>
          <div>
            <p className="lead">ByAruf (BYARUF Networks & Labs) is a software and technology business in Kubwa, Abuja. We turn real client projects into products other businesses can use straight away, and we take on custom work where a product does not fit.</p>
          </div>
        </div>
      </section>
      <section className="split">
        <div>
          <h2>The founder</h2>
          <p style={{ marginTop: 16 }}>Ma'aruf Yusuf is a telecommunications engineer and Solidity-certified blockchain developer. He studied Telecommunications Engineering at the Air Force Institute of Technology (AFIT), Kaduna, and holds AWS certifications.</p>
          <p>He served as COO of dGlobalIT, works as a Program Officer at Evergreen Lifecare Foundation and has long community leadership experience with Smiling Faces Empowerment Initiative. That mix of engineering, operations and community work shapes how ByAruf builds: practical systems that real teams can use.</p>
          <p>His research includes SpectraChain, an EVM-based framework for sharing radio spectrum between Nigerian telecom operators, presented at IEEE NIGERCON 2026.</p>
        </div>
        <div className="pinkband">
          <h2>Credentials</h2>
          <ul className="ticks" style={{ marginTop: 20 }}>
            <li>B.Eng Telecommunications Engineering, AFIT Kaduna</li>
            <li>AWS certified</li>
            <li>Solidity-certified blockchain developer</li>
            <li>Former COO, dGlobalIT</li>
            <li>Program Officer, Evergreen Lifecare Foundation</li>
            <li>IEEE NIGERCON 2026 paper on blockchain spectrum sharing</li>
          </ul>
        </div>
      </section>
      <section className="band">
        <div className="wrap">
          <h2>How we work</h2>
          <div className="grid modules">
            {[['Plain answers', 'You get a clear scope, price and timeline in writing before work starts.'], ['Built to be used', 'Software is designed around how your staff actually work, then tested with them.'], ['Your data is yours', 'You can export your records at any time. Access is protected with roles and secure login.'], ['Support after launch', 'Monthly plans cover hosting, backups, updates and help when you need it.']].map(([t, d]) => (
              <div className="m" key={t}><strong>{t}</strong><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>
      <DemoBand />
    </>
  )
}

/* ---------------- FAQ ---------------- */
export function Faq() {
  const cats = [...new Set(FAQ.map((f) => f.cat))]
  return (
    <>
      <section className="band">
        <div className="wrap">
          <Crumbs items={[['FAQ']]} />
          <h1 style={{ marginTop: 16 }}>Frequently asked questions</h1>
          <p className="lead" style={{ marginTop: 16 }}>Can't find your answer? Use the chat assistant at the bottom right or message us on WhatsApp at {SITE.whatsappLabel}.</p>
          <div className="faq">
            {cats.map((c) => (
              <div key={c}>
                <h2>{c}</h2>
                {FAQ.filter((f) => f.cat === c).map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
              </div>
            ))}
          </div>
        </div>
      </section>
      <DemoBand />
    </>
  )
}

/* ---------------- Contact ---------------- */
const OPTIONS = [...PRODUCTS.map((p) => p.name), ...SERVICES.map((s) => s.name), 'Something else']

export function Contact() {
  const [msg, setMsg] = useState('')
  const [via, setVia] = useState('')
  const initial = useLocation().state?.product
  const submit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = String(f.get('name') || '').trim(), contact = String(f.get('contact') || '').trim()
    if (!name || !contact) { setMsg('Add your name and an email or phone number so we can reply.'); return }
    const body = `Name: ${name}\nCompany: ${f.get('company') || ''}\nContact: ${contact}\nInterested in: ${f.get('product')}\n\n${f.get('note') || ''}`
    const href = e.nativeEvent.submitter?.value === 'wa'
      ? waLink(`Hello ByAruf, I'd like to book a demo.\n\n${body}`)
      : `mailto:${SITE.email}?subject=${encodeURIComponent('Demo request: ' + f.get('product'))}&body=${encodeURIComponent(body)}`
    setVia(href)
    setMsg('Your message is ready in your email or WhatsApp app. Press send there to deliver it.')
    window.open(href, href.startsWith('http') ? '_blank' : '_self')
  }
  return (
    <>
      <section className="band greenband">
        <div className="wrap two">
          <div>
            <nav className="crumbs" aria-label="Breadcrumb" style={{ color: '#e8fff4' }}><Link to="/">Home</Link> / <span aria-current="page">Contact</span></nav>
            <h1 style={{ marginTop: 16 }}>Book a free demo or get a quote</h1>
            <p style={{ marginTop: 16 }}>Tell us what you need and we will get back to you within one working day.</p>
            <div className="lines">
              <div>WhatsApp: <a href={waLink()} target="_blank" rel="noopener noreferrer">{SITE.whatsappLabel}</a></div>
              <div>Call: {SITE.phones.map((p, i) => <span key={p.tel}>{i ? ', ' : ''}<a href={`tel:${p.tel}`}>{p.label}</a></span>)}</div>
              <div>Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
              <div>Kubwa, Bwari Area Council, Abuja, FCT</div>
              <div style={{ fontSize: 15 }}>{SITE.hours}</div>
            </div>
          </div>
          <form className="demo" onSubmit={submit} noValidate>
            <div className="pair">
              <label>Your name<input name="name" required autoComplete="name" /></label>
              <label>Company<input name="company" autoComplete="organization" /></label>
            </div>
            <div className="pair">
              <label>Email or phone<input name="contact" required /></label>
              <label>Interested in
                <select name="product" key={initial || 'none'} defaultValue={initial || OPTIONS[0]}>{OPTIONS.map((o) => <option key={o}>{o}</option>)}</select>
              </label>
            </div>
            <label>What do you need?<textarea name="note" /></label>
            <div className="acts">
              <button className="btn wa" type="submit" value="wa">Send on WhatsApp</button>
              <button className="btn alt" type="submit" value="email">Send by email</button>
            </div>
            <p className="status" role="status">{msg} {via && <a href={via}>Open it again</a>}</p>
          </form>
        </div>
      </section>
    </>
  )
}

/* ---------------- 404 ---------------- */
export function NotFound() {
  return (
    <section className="band">
      <div className="wrap">
        <h1>This page does not exist</h1>
        <p className="lead" style={{ marginTop: 16 }}>The link may be old or mistyped. Try one of these instead.</p>
        <div className="acts"><Link className="btn" to="/">Home</Link><Link className="btn alt" to="/products/">Products</Link><Link className="btn alt" to="/services/">Services</Link></div>
      </div>
    </section>
  )
}
