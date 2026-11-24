// Drawn screen previews. Sample data only, no client names.
const Bar = ({ url }) => (
  <div className="bar"><b /><b /><b /><span>{url}</span></div>
)

const Tracker = () => (
  <div className="win" role="img" aria-label="Property Portfolio Tracker dashboard showing units sold, payments and overdue buyers">
    <Bar url="yourcompany.byaruf.xyz / portfolio" />
    <div className="body side">
      <ul><li className="on">Overview</li><li>Properties</li><li>Buyers</li><li>Payments</li><li>Documents</li><li>Reports</li></ul>
      <div>
        <div className="kpis"><div className="kpi">Units sold<strong>126</strong></div><div className="kpi">This month<strong>₦41.5M</strong></div><div className="kpi">Overdue<strong>9</strong></div></div>
        <table className="mt"><tbody>
          {[['A. Bello, Plot 14', 100, 'ok', 'Paid'], ['C. Okafor, Block C', 45, 'due', 'Overdue'], ['F. Musa, Unit 3', 70, 'wait', 'Part paid'], ['T. Adeyemi, Plot 8', 20, 'wait', 'Part paid']].map(([n, w, c, t]) => (
            <tr key={n}><td>{n}</td><td style={{ width: '40%' }}><div className="meter"><i style={{ width: w + '%' }} /></div></td><td><span className={'pill ' + c}>{t}</span></td></tr>
          ))}
        </tbody></table>
      </div>
    </div>
  </div>
)

const Travel = () => (
  <div className="win" role="img" aria-label="Travel agency website with package search and Hajj, Umrah and tour packages">
    <Bar url="youragency.com" />
    <div className="body">
      <div className="thero"><strong>Hajj and Umrah 2027</strong>Choose a package, pay in parts, track your visa online.
        <div className="tsearch"><span>Package type</span><span>Travel month</span><span>2 adults</span><em>Search</em></div></div>
      <div className="pkgs">
        <div className="pkg"><div className="im" /><div><b>Ramadan Umrah</b><br />14 nights</div></div>
        <div className="pkg"><div className="im" /><div><b>Dubai tour</b><br />5 nights</div></div>
        <div className="pkg"><div className="im" /><div><b>Visa support</b><br />UK, US, Schengen</div></div>
      </div>
    </div>
  </div>
)

const Field = () => (
  <div className="win" role="img" aria-label="Field data dashboard showing sites reporting by area">
    <Bar url="fieldteam.byaruf.xyz / dashboard" />
    <div className="body">
      <div className="kpis"><div className="kpi">Sites reporting<strong>2,418</strong></div><div className="kpi">Team deployed<strong>1,960</strong></div><div className="kpi">To review<strong>37</strong></div></div>
      <table className="mt"><tbody>
        {[['Bwari', 92], ['AMAC', 78], ['Gwagwalada', 64], ['Kuje', 51]].map(([n, w]) => (
          <tr key={n}><td>{n}</td><td style={{ width: '45%' }}><div className="meter"><i style={{ width: w + '%' }} /></div></td><td>{w}%</td></tr>
        ))}
      </tbody></table>
    </div>
  </div>
)

const Courier = () => (
  <div className="phone" role="img" aria-label="Courier app showing a rider on the way from Wuse 2 to Kubwa">
    <div className="scr">
      <div className="map"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M18 82 C30 62,52 72,58 48 S78 24,84 16" fill="none" stroke="#00a86b" strokeWidth="3" /><circle cx="18" cy="82" r="4" fill="#0a0a0a" /><circle cx="84" cy="16" r="4" fill="#e0436b" /></svg></div>
      <div className="sheet"><strong>Rider on the way</strong><div style={{ color: '#555' }}>Wuse 2 to Kubwa, 18 mins</div>
        <div className="forms"><span>Parcel: small</span><span>₦3,500</span></div>
        <div className="meter"><i style={{ width: '60%' }} /></div></div>
    </div>
  </div>
)

const Chain = () => (
  <div className="win" role="img" aria-label="Solidity smart contract code in an editor">
    <Bar url="contracts / Escrow.sol" />
    <div className="body">
      <div className="code"><span className="k">contract</span> Escrow {'{'}{'\n'}  <span className="k">address</span> buyer;{'\n'}  <span className="k">address</span> seller;{'\n'}  <span className="k">uint256</span> amount;{'\n'}{'\n'}  <span className="k">function</span> release() <span className="k">external</span> {'{'}{'\n'}    require(msg.sender == buyer, <span className="s">"Only buyer"</span>);{'\n'}    payable(seller).transfer(amount);{'\n'}  {'}'}{'\n'}{'}'}{'\n'}<span className="c">// 14 tests passing</span></div>
    </div>
  </div>
)

const Ai = () => (
  <div className="win" role="img" aria-label="Automation workflow from WhatsApp enquiry to AI reply to staff alert">
    <Bar url="automations / new enquiry" />
    <div className="body flow">
      <div><i /><span><b>New WhatsApp message</b><br />"How much is a 2-bed in Lugbe?"</span><span className="pill ok">Trigger</span></div>
      <div><i /><span><b>AI drafts a reply</b><br />Answers from your price list</span><span className="pill wait">Step</span></div>
      <div><i /><span><b>Lead saved and staff alerted</b><br />Added to sheet, sales team notified</span><span className="pill ok">Done</span></div>
    </div>
  </div>
)

const Pm = () => (
  <div className="win" role="img" aria-label="Project board with tasks and a timeline">
    <Bar url="project / website rebuild" />
    <div className="body">
      <div className="kan">
        <div><b>To do</b><span>Content review</span><span>Payment setup</span></div>
        <div><b>In progress</b><span>Admin dashboard</span></div>
        <div><b>Done</b><span>Scope signed</span><span>Design approved</span></div>
      </div>
      <div className="gantt">
        {[['Design', '0 0 0 0', 30], ['Build', '0 0 0 22%', 50], ['Testing', '0 0 0 60%', 25], ['Launch', '0 0 0 85%', 12]].map(([n, m, w]) => (
          <div key={n}><span>{n}</span><span><i style={{ marginLeft: m.split(' ')[3], width: w + '%' }} /></span></div>
        ))}
      </div>
    </div>
  </div>
)

const Brand = () => (
  <div className="win" role="img" aria-label="Brand board with logo mark, colour swatches and typeface">
    <Bar url="brand kit / guide.pdf" />
    <div className="body brandboard">
      <div className="mark">Ko.</div>
      <div>
        <div className="sw">
          <span style={{ background: '#00a86b', color: '#fff' }}>Primary</span>
          <span style={{ background: '#ffd6e0' }}>Accent</span>
          <span style={{ background: '#0a0a0a', color: '#fff' }}>Ink</span>
          <span style={{ background: '#fff' }}>Paper</span>
        </div>
        <div className="typesp"><strong>Aa Bb Cc</strong>Headings and body type</div>
      </div>
    </div>
  </div>
)

const Web = () => (
  <div className="win" role="img" aria-label="Business website and admin dashboard">
    <Bar url="yourbusiness.ng" />
    <div className="body">
      <div className="thero" style={{ background: '#0a0a0a' }}><strong>Fresh bakes, delivered in Abuja</strong>Order online and pay with card or transfer.</div>
      <div className="kpis"><div className="kpi">Orders today<strong>34</strong></div><div className="kpi">Revenue<strong>₦186k</strong></div><div className="kpi">Visitors<strong>1,204</strong></div></div>
    </div>
  </div>
)

const Cloud = () => (
  <div className="win" role="img" aria-label="Cloud monitoring panel showing healthy services and backups">
    <Bar url="cloud / status" />
    <div className="body">
      <table className="mt"><tbody>
        {[['Web server', 'ok', 'Healthy'], ['Database', 'ok', 'Healthy'], ['Daily backup', 'ok', 'Completed 02:00'], ['SSL certificate', 'wait', 'Renews in 21 days']].map(([n, c, t]) => (
          <tr key={n}><td>{n}</td><td><span className={'pill ' + c}>{t}</span></td></tr>
        ))}
      </tbody></table>
      <div className="kpis" style={{ marginTop: 8 }}><div className="kpi">Uptime<strong>99.9%</strong></div><div className="kpi">Response<strong>180ms</strong></div><div className="kpi">Alerts<strong>0</strong></div></div>
    </div>
  </div>
)

const MAP = { tracker: Tracker, travel: Travel, field: Field, courier: Courier, chain: Chain, ai: Ai, pm: Pm, brand: Brand, web: Web, cloud: Cloud }

export default function Preview({ kind }) {
  const C = MAP[kind] || Web
  return <C />
}
