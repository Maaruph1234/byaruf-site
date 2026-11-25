import { Link, useParams } from 'react-router-dom'
import Icon from '../components/Icons.jsx'
import { PageHead, SectionHead, ProjectCard, CTA } from '../components/Blocks.jsx'
import { SERVICES } from '../data/services.js'
import { projectBySlug } from '../data/projects.js'
import NotFound from './NotFound.jsx'

export function Services() {
  return (
    <>
      <PageHead crumbs={[['Services']]} title="Digital infrastructure, end to end." lede="Seven connected service lines under one roof. Whether you need one piece or the whole system, everything is designed to work together." />
      <section className="sec">
        <div className="wrap">
          <div className="cards">
            {SERVICES.map((s) => (
              <Link key={s.slug} className="card" to={`/services/${s.slug}/`}>
                <span className="ic"><Icon name={s.icon} /></span>
                <h3>{s.name}</h3>
                <p>{s.short}</p>
                <span className="tlink">Explore <Icon name="arrow" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="sec white">
        <div className="wrap two">
          <div>
            <div className="kicker">Not sure where to start?</div>
            <h2>Start from the problem, not the technology.</h2>
          </div>
          <div>
            <ul className="ticks">
              <li><Icon name="check" /><span>Customers cannot find you or contact you online: <Link to="/services/website-development/">Website Development</Link></span></li>
              <li><Icon name="check" /><span>Your team runs on spreadsheets and WhatsApp: <Link to="/services/software-development/">Software Development</Link></span></li>
              <li><Icon name="check" /><span>Customers want to transact on their phones: <Link to="/services/mobile-app-development/">Mobile App Development</Link></span></li>
              <li><Icon name="check" /><span>Staff repeat the same replies and data entry all day: <Link to="/services/ai-automation/">AI Solutions and Automation</Link></span></li>
              <li><Icon name="check" /><span>Systems are slow, unreliable or expensive to host: <Link to="/services/cloud-it/">Cloud and IT Solutions</Link></span></li>
              <li><Icon name="check" /><span>Several parties need records nobody can quietly change: <Link to="/services/blockchain-web3/">Blockchain and Web3</Link></span></li>
              <li><Icon name="check" /><span>Your brand looks smaller than your business: <Link to="/services/branding/">Branding and Digital Identity</Link></span></li>
            </ul>
          </div>
        </div>
      </section>
      <CTA />
    </>
  )
}

export function ServicePage() {
  const { slug } = useParams()
  const s = SERVICES.find((x) => x.slug === slug)
  if (!s) return <NotFound />
  const projects = s.projects.map(projectBySlug).filter(Boolean)
  return (
    <>
      <PageHead crumbs={[['Services', '/services/'], [s.name]]} icon={s.icon} title={s.name} lede={s.intro}
        aside={<div className="glance"><h2>At a glance</h2><ul className="ticks">{s.offers.slice(0, 5).map((o) => <li key={o[0]}><Icon name="check" />{o[0]}</li>)}</ul></div>}>
        <div className="acts" style={{ marginTop: 28 }}><Link className="btn signal" to="/quote/" state={{ service: s.name }}>Discuss your project <Icon name="arrow" /></Link></div>
      </PageHead>

      <section className="sec">
        <div className="wrap">
          <SectionHead kicker="What we offer" title={`What ${s.name.toLowerCase()} covers`} />
          <div className="offers">{s.offers.map(([t, d]) => <div key={t}><h3>{t}</h3><p>{d}</p></div>)}</div>
        </div>
      </section>

      <section className="sec white">
        <div className="wrap two">
          <div>
            <div className="kicker">Who it is for</div>
            <h2 style={{ marginBottom: 28 }}>Built for</h2>
            <ul className="ticks">{s.who.map((x) => <li key={x}><Icon name="check" />{x}</li>)}</ul>
          </div>
          <div>
            <div className="kicker">Problems it solves</div>
            <h2 style={{ marginBottom: 28 }}>When you need it</h2>
            <ul className="ticks">{s.problems.map((x) => <li key={x}><Icon name="check" />{x}</li>)}</ul>
          </div>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <SectionHead kicker="Related work" title="Projects that use this capability" />
            <div className="work-grid">{projects.map((p) => <ProjectCard key={p.slug} p={p} />)}</div>
          </div>
        </section>
      )}

      <section className="sec-sm white">
        <div className="wrap">
          <h2 style={{ fontSize: 'clamp(24px,2.6vw,32px)', marginBottom: 24 }}>Other services</h2>
          <div className="chips">{SERVICES.filter((x) => x.slug !== slug).map((x) => <Link key={x.slug} to={`/services/${x.slug}/`}>{x.name}</Link>)}</div>
        </div>
      </section>
      <CTA service={s.name} title={`Let's talk about your ${s.name.toLowerCase()} project.`} />
    </>
  )
}
