import { Link } from 'react-router-dom'
import { PageHead } from '../components/Blocks.jsx'

export default function NotFound() {
  return (
    <PageHead crumbs={[['Page not found']]} title="This page does not exist" lede="The link may be old or mistyped.">
      <div className="acts" style={{ marginTop: 28 }}>
        <Link className="btn signal" to="/">Go home</Link>
        <Link className="btn ghost" to="/services/">Services</Link>
        <Link className="btn ghost" to="/work/">Our work</Link>
      </div>
    </PageHead>
  )
}
