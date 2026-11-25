import { Link } from 'react-router-dom'
import Icon from '../components/Icons.jsx'
import { PageHead, SectionHead, CTA } from '../components/Blocks.jsx'
import { SITE } from '../data/site.js'

const DIFF = [
  ['layers', 'Breadth with depth', 'We cover software, web, mobile, cloud, AI, blockchain and brand, and we understand how they connect. You deal with one team that sees the whole picture.'],
  ['wave', 'An engineering foundation', 'ByAruf grew out of telecommunications engineering. We think about reliability, security and how systems behave under real load, not just how they look.'],
  ['target', 'Business first', 'Operations experience means we ask about your process, your staff and your customers before we talk about technology.'],
  ['shield', 'Honest about fit', 'If a simpler tool will do, we say so. If blockchain or AI is not the right answer, we say that too.'],
]

export default function About() {
  return (
    <>
      <PageHead crumbs={[['About']]} title="About ByAruf" lede="ByAruf is a technology and digital solutions company based in Kubwa, Abuja. We give businesses, startups, entrepreneurs and organisations the digital infrastructure they need to grow: software, websites, apps, automation, cloud, blockchain and brand." />

      <section className="sec">
        <div className="wrap two">
          <div>
            <div className="kicker">Our mission</div>
            <h2>Help businesses turn ideas into working digital products.</h2>
            <p className="mute" style={{ marginTop: 20 }}>We help organisations automate processes, improve efficiency and use emerging technology where it genuinely adds value.</p>
          </div>
          <div>
            <div className="kicker">Our vision</div>
            <h2>Dependable digital infrastructure for every serious business.</h2>
            <p className="mute" style={{ marginTop: 20 }}>A future where a growing Nigerian business can access the same quality of technology as an established international company.</p>
          </div>
        </div>
      </section>

      <section className="sec white">
        <div className="wrap">
          <SectionHead kicker="What makes us different" title="Why clients work with ByAruf" />
          <div className="why">{DIFF.map(([ic, t, d]) => <div key={t}><Icon name={ic} className="ic" /><h3>{t}</h3><p>{d}</p></div>)}</div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap intro">
          <div>
            <div className="kicker">Founder</div>
            <h2>{SITE.founder}</h2>
            <p className="lede" style={{ marginTop: 20 }}>Ma'aruf founded ByAruf to bring engineering discipline and business sense to the digital projects of growing organisations.</p>
            <p className="mute">His final-year research, SpectraChain, applies blockchain to radio spectrum sharing between Nigerian telecom operators. A paper on the work was accepted to IEEE NIGERCON 2026.</p>
            <div className="acts" style={{ marginTop: 24 }}><a className="btn ghost" href={SITE.github} target="_blank" rel="noopener noreferrer"><Icon name="github" /> GitHub</a><Link className="btn ghost" to="/work/">Our work</Link></div>
          </div>
          <ul className="facts">
            <li><span>Education</span><span>B.Eng Telecommunications Engineering, Air Force Institute of Technology (AFIT), Kaduna</span></li>
            <li><span>Cloud</span><span>AWS certified</span></li>
            <li><span>Blockchain</span><span>Solidity-certified developer</span></li>
            <li><span>Operations</span><span>Former COO, dGlobalIT</span></li>
            <li><span>Research</span><span>SpectraChain, paper accepted to IEEE NIGERCON 2026</span></li>
            <li><span>Based in</span><span>Kubwa, Abuja, Federal Capital Territory</span></li>
          </ul>
        </div>
      </section>

      <section className="sec white">
        <div className="wrap two">
          <div>
            <div className="kicker">Our approach</div>
            <h2>Innovation that holds up in production.</h2>
          </div>
          <ul className="ticks">
            <li><Icon name="check" />We start every project by understanding the business problem and the people who will use the solution.</li>
            <li><Icon name="check" />We agree scope, timeline and cost in writing before work begins.</li>
            <li><Icon name="check" />We build in stages and show progress early, so there are no surprises at the end.</li>
            <li><Icon name="check" />We test, secure and document what we build, and keep secret keys off the browser.</li>
            <li><Icon name="check" />We stay available after launch to support, improve and grow what we built together.</li>
          </ul>
        </div>
      </section>
      <CTA />
    </>
  )
}
