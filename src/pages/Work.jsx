import { Link, useParams } from 'react-router-dom'
import Icon from '../components/Icons.jsx'
import ProjectCover from '../components/ProjectCover.jsx'
import { PageHead, ProjectCard, CTA, statusClass } from '../components/Blocks.jsx'
import { PROJECTS } from '../data/projects.js'
import { SERVICES } from '../data/services.js'
import { SITE } from '../data/site.js'
import NotFound from './NotFound.jsx'

export function Work() {
  return (
    <>
      <PageHead crumbs={[['Work']]} title="Selected work" lede="A curated set of projects from our GitHub. Each one is labelled with its real status, whether it is live, in development, a client website, academic research or a learning project.">
        <div className="acts" style={{ marginTop: 28 }}><a className="btn ghost" href={SITE.github} target="_blank" rel="noopener noreferrer"><Icon name="github" /> View GitHub profile</a></div>
      </PageHead>
      <section className="sec">
        <div className="wrap"><div className="work-grid">{PROJECTS.map((p) => <ProjectCard key={p.slug} p={p} />)}</div></div>
      </section>
      <CTA title="Want something like this for your business?" />
    </>
  )
}

export function ProjectPage() {
  const { slug } = useParams()
  const i = PROJECTS.findIndex((x) => x.slug === slug)
  const p = PROJECTS[i]
  if (!p) return <NotFound />
  const next = PROJECTS[(i + 1) % PROJECTS.length]
  const services = p.services.map((s) => SERVICES.find((x) => x.slug === s)).filter(Boolean)
  return (
    <>
      <PageHead crumbs={[['Work', '/work/'], [p.name]]} title={p.name} lede={p.summary}
        aside={<div className="pd-cover"><ProjectCover p={p} /></div>}>
        <div className="acts" style={{ marginTop: 28 }}>
          {p.live && <a className="btn signal" href={p.live} target="_blank" rel="noopener noreferrer">Visit live site <Icon name="external" /></a>}
          <a className="btn ghost" href={p.repo} target="_blank" rel="noopener noreferrer"><Icon name="github" /> View code on GitHub</a>
        </div>
      </PageHead>

      <section className="sec">
        <div className="wrap two">
          <div>
            <div className="kicker">The problem</div>
            <p className="lede" style={{ color: 'var(--text)' }}>{p.problem}</p>
            <div className="kicker" style={{ marginTop: 40 }}>What was built</div>
            <ul className="ticks">{p.built.map((b) => <li key={b}><Icon name="check" />{b}</li>)}</ul>
            {p.note && <p className="note" style={{ marginTop: 32 }}>{p.note}</p>}
          </div>
          <div>
            <div className="box">
              <div className="pd-meta">
                <div><span>Type</span><span>{p.kind}</span></div>
                <div><span>Status</span><span><span className={'status ' + statusClass(p.status)}><i />{p.status}</span></span></div>
                <div><span>Year</span><span>{p.year}</span></div>
                <div><span>Services</span><span>{services.map((s, k) => <span key={s.slug}>{k ? ', ' : ''}<Link to={`/services/${s.slug}/`}>{s.name}</Link></span>)}</span></div>
                <div><span>Code</span><span><a href={p.repo} target="_blank" rel="noopener noreferrer">{p.repo.replace('https://', '')}</a></span></div>
                {p.live && <div><span>Live</span><span><a href={p.live} target="_blank" rel="noopener noreferrer">{p.live.replace(/^https?:\/\/(www\.)?/, '')}</a></span></div>}
              </div>
              <h3 style={{ fontSize: 18, margin: '24px 0 12px' }}>Technologies</h3>
              <div className="tags" style={{ paddingTop: 0 }}>{p.stack.map((t) => <span key={t}>{t}</span>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-sm white">
        <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
          <Link className="tlink" to="/work/">All projects</Link>
          <Link className="tlink" to={`/work/${next.slug}/`}>Next: {next.name} <Icon name="arrow" /></Link>
        </div>
      </section>
      <CTA title="Have a similar project in mind?" service={services[0]?.name} />
    </>
  )
}
