import Icon, { WhatsAppIcon } from '../components/Icons.jsx'
import EnquiryForm from '../components/EnquiryForm.jsx'
import { PageHead } from '../components/Blocks.jsx'
import { openAssistant } from '../components/Layout.jsx'
import { SITE, waLink } from '../data/site.js'

const Side = () => (
  <div className="side-contact">
    <a href={`mailto:${SITE.email}`}><span className="ic"><Icon name="mail" /></span><span><small>Email</small><strong>{SITE.email}</strong></span></a>
    <a href={`tel:${SITE.phoneTel}`}><span className="ic"><Icon name="call" /></span><span><small>Phone</small><strong>{SITE.phone}</strong></span></a>
    <a href={waLink('Hello ByAruf, I would like to discuss a project.')} target="_blank" rel="noopener noreferrer"><span className="ic"><WhatsAppIcon width="20" /></span><span><small>WhatsApp</small><strong>{SITE.phone}</strong></span></a>
    <a href="#chat" onClick={(e) => { e.preventDefault(); openAssistant() }}><span className="ic"><Icon name="chat" /></span><span><small>AI assistant</small><strong>Ask a question now</strong></span></a>
    <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '18px 0' }}><span className="ic" style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--ink)', color: 'var(--signal-hi)', display: 'grid', placeItems: 'center' }}><Icon name="pin" width="20" /></span><span><small className="mute" style={{ display: 'block', fontSize: 14 }}>Location</small><strong style={{ fontWeight: 600 }}>Kubwa, Abuja, FCT, Nigeria</strong></span></div>
  </div>
)

export function Contact() {
  return (
    <>
      <PageHead crumbs={[['Contact']]} title="Contact us" lede="Questions, project ideas or partnerships. Send a message and we will reply by email, or reach us directly on WhatsApp." />
      <section className="sec">
        <div className="wrap formgrid">
          <div className="box"><h2 style={{ fontSize: 28, marginBottom: 24 }}>Send a message</h2><EnquiryForm type="contact" /></div>
          <div><h2 style={{ fontSize: 28, marginBottom: 24 }}>Reach us directly</h2><Side /></div>
        </div>
      </section>
    </>
  )
}

export function Quote() {
  return (
    <>
      <PageHead crumbs={[['Get a Quote']]} title="Start a project" lede="Tell us what you need. We review every request and reply with next steps, usually a short consultation call followed by a written proposal with scope, timeline and cost." />
      <section className="sec">
        <div className="wrap formgrid">
          <div className="box"><EnquiryForm type="quote" /></div>
          <div>
            <h2 style={{ fontSize: 26, marginBottom: 20 }}>What happens next</h2>
            <ol className="steps" style={{ gridTemplateColumns: '1fr', rowGap: 28, marginBottom: 40 }}>
              <li><h3>We review your request</h3><p>We read your brief and come back with any questions.</p></li>
              <li><h3>Consultation</h3><p>A short call to understand your goals and constraints.</p></li>
              <li><h3>Written proposal</h3><p>Scope, milestones, timeline and cost, before any commitment.</p></li>
            </ol>
            <h2 style={{ fontSize: 22, marginBottom: 12 }}>Prefer to talk?</h2>
            <Side />
          </div>
        </div>
      </section>
    </>
  )
}
