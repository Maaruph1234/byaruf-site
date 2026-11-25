import { Link } from 'react-router-dom'
import Icon from '../components/Icons.jsx'
import Spectrum from '../components/Spectrum.jsx'
import { openAssistant } from '../components/Layout.jsx'
import { SectionHead, ServiceExplorer, ProjectCard, CTA } from '../components/Blocks.jsx'
import { PROJECTS } from '../data/projects.js'
import { SOLUTIONS } from '../data/solutions.js'
import { STACK } from '../data/site.js'

const WHY = [
  ['layers', 'One partner, the whole stack', 'Software, web, mobile, cloud, AI, blockchain and brand under one roof, so nothing gets lost between vendors.'],
  ['target', 'Built around your process', 'We start from how your business actually runs, then design the system to fit it, not the other way round.'],
  ['shield', 'Engineering discipline', 'An engineer-led practice: tested code, secure access, documented hand-over and honest advice about what you need.'],
  ['handshake', 'Clear terms up front', 'A written scope, timeline and cost before work starts, and regular check-ins while we build.'],
]

const STEPS = [
  ['Discover', 'A conversation about your goals, users and constraints. We ask the questions that shape the right solution.'],
  ['Propose', 'A written proposal with scope, milestones, timeline and cost, so you know exactly what you are getting.'],
  ['Build', 'Design and development in stages, with regular demos so you can steer before anything is final.'],
  ['Launch and support', 'Testing, deployment, training and hand-over, with ongoing support where you need it.'],
]

const AI_CAPS = ['AI customer support agents', 'WhatsApp automation', 'Website chatbots that capture leads', 'AI voice agents', 'Document and data extraction', 'Workflow automation across your tools']

export default function Home() {
  const featured = PROJECTS.filter((p) => p.featured)
  return (
    <>
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="wrap">
          <div>
            <h1>We build the digital infrastructure your business runs on.</h1>
            <p className="lede">ByAruf is a technology and digital solutions company in Abuja. We turn ideas into working software, websites and apps, automate the work that slows teams down, and put AI, cloud and blockchain to practical use.</p>
            <div className="acts">
              <Link className="btn signal" to="/quote/">Start a project <Icon name="arrow" /></Link>
              <Link className="btn ghost" to="/services/">Explore our services</Link>
            </div>
            <div className="meta">
              <span><i />Engineer-led, based in Kubwa, Abuja</span>
              <span><i />Working with clients across Nigeria</span>
            </div>
          </div>
          <Spectrum />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHead kicker="What we do" title="Seven capabilities, one digital partner.">Every service connects to the others. A website feeds your system, your system feeds your automations, and your brand ties it together.</SectionHead>
          <ServiceExplorer />
        </div>
      </section>

      <section className="sec white">
        <div className="wrap">
          <SectionHead kicker="Why ByAruf" title="Serious engineering, explained in plain terms." />
          <div className="why">
            {WHY.map(([ic, t, d]) => <div key={t}><Icon name={ic} className="ic" /><h3>{t}</h3><p>{d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHead kicker="Selected work" title="Real projects, honestly described.">From blockchain research to fintech and NGO platforms. Each project shows its real status and links to the code.</SectionHead>
          <div className="work-feat">{featured.map((p) => <ProjectCard key={p.slug} p={p} />)}</div>
          <div style={{ marginTop: 36 }}><Link className="btn ghost" to="/work/">See all projects <Icon name="arrow" /></Link></div>
        </div>
      </section>

      <section className="sec dark" id="ai">
        <div className="wrap ai">
          <div>
            <div className="kicker">AI and automation</div>
            <h2>Put AI to work where it actually saves time.</h2>
            <p className="lede" style={{ marginTop: 20 }}>We build assistants grounded in your own information and automations that move data between your tools, with a person in the loop wherever a mistake would be costly.</p>
            <ul className="caps">{AI_CAPS.map((c) => <li key={c}><Icon name="check" />{c}</li>)}</ul>
            <div className="acts">
              <button type="button" className="btn signal" onClick={() => openAssistant()}>Talk to our AI assistant</button>
              <Link className="btn ghost" to="/services/ai-automation/">AI services</Link>
            </div>
          </div>
          <div className="chatdemo" aria-label="Example conversation with the ByAruf AI Assistant">
            <div className="h"><span className="dot" /><div>ByAruf AI Assistant<small>Example conversation</small></div></div>
            <div className="bub u">We get the same 20 questions on WhatsApp every day. Can you help?</div>
            <div className="bub a">Yes. That is a good fit for WhatsApp automation with an AI assistant trained on your own answers. Common questions get instant replies, and anything unusual goes to your team.</div>
            <div className="bub u">How do we start?</div>
            <div className="bub a">Tell me roughly how many messages you get and which tools you use, and I can send your enquiry to the team for a proposal.</div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHead kicker="Ready-made solutions" title="Start faster with systems we have already built.">Proven foundations, set up with your brand, your data and your workflow.</SectionHead>
          <div className="cards">
            {SOLUTIONS.map((s) => (
              <Link key={s.slug} className="card" to={`/solutions/${s.slug}/`}>
                <span className="small mute">{s.audience}</span>
                <h3>{s.name}</h3>
                <p>{s.short}</p>
                <span className="tlink">View solution <Icon name="arrow" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec dark" id="stack">
        <div className="wrap">
          <SectionHead kicker="Technology" title="The tools behind our work.">Chosen for reliability and long-term maintainability. All of these appear in our own projects.</SectionHead>
          <div className="stack">
            {STACK.map((g) => <div key={g.layer}><h3>{g.layer}</h3><ul>{g.items.map((t) => <li key={t}>{t}</li>)}</ul></div>)}
          </div>
        </div>
      </section>

      <section className="sec white">
        <div className="wrap">
          <SectionHead kicker="How we work" title="A transparent process from first call to launch." />
          <ol className="steps">{STEPS.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}</ol>
        </div>
      </section>

      <section className="sec">
        <div className="wrap intro">
          <div>
            <div className="kicker">About ByAruf</div>
            <h2>Founded by an engineer who builds what he recommends.</h2>
          </div>
          <div>
            <p className="lede" style={{ color: 'var(--text)' }}>ByAruf was founded by Ma'aruf Yusuf, a telecommunications engineer and Solidity-certified blockchain developer with AWS certifications and senior operations experience as a former COO.</p>
            <p className="mute">That mix of engineering and operations shapes everything we do: practical systems, clear communication and work that keeps running after launch.</p>
            <Link className="tlink" to="/about/">More about ByAruf <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
