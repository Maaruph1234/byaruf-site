import { Link } from 'react-router-dom'
import Icon from '../components/Icons.jsx'
import { PageHead, SectionHead, CTA } from '../components/Blocks.jsx'
import { openAssistant } from '../components/Layout.jsx'
import { FAQ } from '../data/faq.js'
import { SITE, AREAS, COUNCILS } from '../data/site.js'
import { SERVICES } from '../data/services.js'

export function Faq() {
  const cats = [...new Set(FAQ.map((f) => f.cat))]
  return (
    <>
      <PageHead crumbs={[['FAQ']]} title="Frequently asked questions" lede="Quick answers about our services, work and process.">
        <div className="acts" style={{ marginTop: 28 }}><button type="button" className="btn signal" onClick={() => openAssistant()}>Ask the AI assistant</button></div>
      </PageHead>
      <section className="sec">
        <div className="wrap faq" style={{ maxWidth: 900 }}>
          {cats.map((c) => (
            <div key={c}>
              <h2>{c}</h2>
              {FAQ.filter((f) => f.cat === c).map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
            </div>
          ))}
        </div>
      </section>
      <CTA />
    </>
  )
}

export function Areas() {
  return (
    <>
      <PageHead crumbs={[['Areas we serve']]} title="Software, website and app developer in Abuja" lede="ByAruf is based in Kubwa, Bwari Area Council, and works with businesses, schools, NGOs and organisations across the Federal Capital Territory and the rest of Nigeria." />
      <section className="sec">
        <div className="wrap two">
          <div><div className="kicker">Across Abuja</div><h2>Districts and neighbourhoods</h2><p className="mute" style={{ marginTop: 16 }}>Websites, software, mobile apps, AI automation, cloud, blockchain and branding for businesses in:</p></div>
          <div className="chips">{AREAS.map((a) => <span key={a}>{a}</span>)}</div>
        </div>
      </section>
      <section className="sec white">
        <div className="wrap two">
          <div><div className="kicker">The FCT</div><h2>All six area councils</h2></div>
          <ul className="ticks">{COUNCILS.map((c) => <li key={c}><Icon name="check" />{c}</li>)}</ul>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <SectionHead kicker="Services" title="What Abuja businesses come to us for" />
          <div className="cards">{SERVICES.map((s) => <Link key={s.slug} className="card" to={`/services/${s.slug}/`}><span className="ic"><Icon name={s.icon} /></span><h3>{s.name}</h3><p>{s.short}</p></Link>)}</div>
          <p className="note" style={{ marginTop: 32 }}>Outside Abuja? We also work with clients in Lagos, Kano, Kaduna, Port Harcourt and every other state, and with clients abroad.</p>
        </div>
      </section>
      <CTA />
    </>
  )
}

export function Privacy() {
  return (
    <>
      <PageHead crumbs={[['Privacy']]} title="Privacy notice" lede="How we handle the information you send through this website." />
      <section className="sec">
        <div className="wrap" style={{ maxWidth: 780 }}>
          <h2 style={{ fontSize: 24, marginBottom: 12 }}>What we collect</h2>
          <p>When you use the contact form, the quote form or the AI assistant, we receive what you choose to send: usually your name, email address, phone number, company, the service you are interested in, your budget range and a description of your project.</p>
          <h2 style={{ fontSize: 24, margin: '36px 0 12px' }}>How we use it</h2>
          <p>We use it only to reply to you and to prepare a proposal. We do not sell or share it for marketing.</p>
          <h2 style={{ fontSize: 24, margin: '36px 0 12px' }}>Service providers</h2>
          <p>Form messages are delivered to our inbox by an email delivery provider. Messages to the AI assistant are processed by an AI model provider to generate replies. Your chat history is kept in your browser for the current session only.</p>
          <h2 style={{ fontSize: 24, margin: '36px 0 12px' }}>Your choices</h2>
          <p>To ask what we hold about you or to have it deleted, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
        </div>
      </section>
    </>
  )
}
