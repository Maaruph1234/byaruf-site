import { Link, useParams } from 'react-router-dom'
import Icon from '../components/Icons.jsx'
import ProjectCover from '../components/ProjectCover.jsx'
import { PageHead, SectionHead, CTA } from '../components/Blocks.jsx'
import { SOLUTIONS } from '../data/solutions.js'
import NotFound from './NotFound.jsx'

const MOTIF = { tracker: 'property', travel: 'freight', field: 'portal', courier: 'route' }
const cover = (s) => ({ name: s.name, palette: ['#061611', '#3ef0a8', '#00a86b'], motif: MOTIF[s.preview] || 'portal' })

export function Solutions() {
  return (
    <>
      <PageHead crumbs={[['Solutions']]} title="Ready-made solutions" lede="Systems we have already designed and built, ready to be set up with your brand, your data and your workflow. Faster to launch than a build from scratch, and still adjusted to fit how you work." />
      <section className="sec">
        <div className="wrap work-grid">
          {SOLUTIONS.map((s) => (
            <Link key={s.slug} className="proj" to={`/solutions/${s.slug}/`}>
              <div className="cover"><ProjectCover p={cover(s)} /></div>
              <div className="body"><span className="small mute">{s.audience}</span><h3>{s.name}</h3><p>{s.short}</p><span className="tlink" style={{ marginTop: 'auto' }}>View solution <Icon name="arrow" /></span></div>
            </Link>
          ))}
        </div>
      </section>
      <CTA />
    </>
  )
}

export function SolutionPage() {
  const { slug } = useParams()
  const s = SOLUTIONS.find((x) => x.slug === slug)
  if (!s) return <NotFound />
  return (
    <>
      <PageHead crumbs={[['Solutions', '/solutions/'], [s.name]]} title={s.name} lede={s.intro} aside={<div className="pd-cover"><ProjectCover p={cover(s)} /></div>}>
        <div className="acts" style={{ marginTop: 28 }}><Link className="btn signal" to="/quote/" state={{ service: s.name }}>Request a demo <Icon name="arrow" /></Link></div>
      </PageHead>
      <section className="sec white">
        <div className="wrap two">
          <div><div className="kicker">{s.audience}</div><h2>The problem it solves</h2></div>
          <ul className="ticks">{s.problem.map((x) => <li key={x}><Icon name="check" />{x}</li>)}</ul>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <SectionHead kicker="What is included" title="Modules" />
          <div className="offers">{s.modules.map(([t, d]) => <div key={t}><h3>{t}</h3><p>{d}</p></div>)}</div>
          <p className="note" style={{ marginTop: 32 }}>{s.proof}</p>
        </div>
      </section>
      <section className="sec white">
        <div className="wrap two">
          <div><div className="kicker">Who it is for</div><h2>Suited to</h2></div>
          <ul className="ticks">{s.who.map((x) => <li key={x}><Icon name="check" />{x}</li>)}</ul>
        </div>
      </section>
      <CTA service={s.name} title={`See the ${s.name} with your own data in mind.`} />
    </>
  )
}
