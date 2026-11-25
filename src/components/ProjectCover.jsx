// Project covers drawn from each project's own colour palette (taken from its repository),
// with a motif for what it does. If a project has a real screenshot (`image`), that is shown instead.
const M = {
  spectrum: (a, b, c) => (
    <g>
      {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M-20 ${150 + i * 48} ${Array.from({ length: 22 }, (_, k) => `Q${k * 40 + 20 - 20} ${150 + i * 48 + (k % 2 ? -1 : 1) * (8 + i * 3)} ${k * 40 + 20} ${150 + i * 48}`).join(' ')}`} fill="none" stroke={i === 2 ? b : c} strokeOpacity={i === 2 ? 1 : 0.35} strokeWidth={i === 2 ? 3 : 1.5} />)}
      {[[180, 222], [420, 222], [300, 270]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="16" fill={a} stroke={b} strokeWidth="2" /><circle cx={x} cy={y} r="5" fill={b} /></g>)}
      <path d="M180 222 300 270 420 222" fill="none" stroke={b} strokeWidth="1.5" strokeDasharray="4 6" />
    </g>
  ),
  wallet: (a, b, c) => (
    <g>
      <rect x="150" y="110" width="300" height="180" rx="22" fill={b} transform="rotate(-8 300 200)" />
      <rect x="190" y="140" width="300" height="180" rx="22" fill={c} opacity=".95" transform="rotate(4 340 230)" />
      <rect x="220" y="170" width="54" height="38" rx="8" fill={b} opacity=".5" transform="rotate(4 340 230)" />
      <text x="230" y="290" fontSize="26" fontWeight="700" fill={a} transform="rotate(4 340 230)" fontFamily="Archivo,sans-serif">₦ 48,250.00</text>
    </g>
  ),
  portal: (a, b, c) => (
    <g>
      <rect x="110" y="80" width="380" height="250" rx="14" fill="#fff" />
      <rect x="110" y="80" width="380" height="44" rx="14" fill={a} /><rect x="110" y="108" width="380" height="16" fill={a} />
      <rect x="130" y="144" width="100" height="60" rx="8" fill={b} opacity=".15" /><rect x="244" y="144" width="100" height="60" rx="8" fill={c} opacity=".15" /><rect x="358" y="144" width="112" height="60" rx="8" fill={b} opacity=".3" />
      {[0, 1, 2].map((i) => <g key={i}><rect x="130" y={220 + i * 32} width="160" height="10" rx="5" fill={a} opacity=".25" /><rect x="310" y={220 + i * 32} width={150 - i * 40} height="10" rx="5" fill={b} /></g>)}
    </g>
  ),
  route: (a, b, c) => (
    <g>
      {Array.from({ length: 9 }, (_, i) => <line key={i} x1={i * 75} y1="0" x2={i * 75} y2="375" stroke={b} strokeOpacity=".08" />)}
      <path d="M120 300 C 200 180, 260 330, 330 200 S 470 90, 500 100" fill="none" stroke={c} strokeWidth="5" strokeLinecap="round" />
      <circle cx="120" cy="300" r="12" fill={b} /><circle cx="500" cy="100" r="16" fill={c} /><circle cx="500" cy="100" r="6" fill={a} />
    </g>
  ),
  freight: (a, b, c) => (
    <g>
      {[[140, 210], [240, 210], [340, 210], [190, 150], [290, 150], [240, 90]].map(([x, y], i) => (
        <g key={i}><rect x={x} y={y} width="96" height="56" rx="4" fill={i % 2 ? b : c} opacity={i % 2 ? 1 : 0.9} />{[1, 2, 3, 4].map((k) => <line key={k} x1={x + k * 19} y1={y + 8} x2={x + k * 19} y2={y + 48} stroke={a} strokeOpacity=".25" />)}</g>
      ))}
      <path d="M100 276 H500 L470 318 H130Z" fill={c} opacity=".35" />
    </g>
  ),
  property: (a, b, c) => (
    <g>
      {[[120, 170, 110], [250, 120, 130], [400, 190, 90]].map(([x, y, w], i) => (
        <g key={i}><path d={`M${x} ${y + 40} L${x + w / 2} ${y} L${x + w} ${y + 40} V${300} H${x}Z`} fill="none" stroke={b} strokeWidth="2" />
          {[0, 1].map((r) => [0, 1].map((k) => <rect key={`${r}${k}`} x={x + 18 + k * (w / 2 - 6)} y={y + 60 + r * 50} width={w / 2 - 36} height="28" fill={b} opacity=".25" />))}</g>
      ))}
      <line x1="80" x2="520" y1="300" y2="300" stroke={c} strokeOpacity=".6" />
    </g>
  ),
  contract: (a, b, c) => (
    <g fontFamily="ui-monospace,Menlo,monospace" fontSize="17">
      <rect x="110" y="70" width="380" height="250" rx="14" fill={a} stroke={b} strokeOpacity=".4" />
      {['contract FundMe {', '  uint256 MIN_USD = 5e18;', '  function fund() public payable {', '    require(getConversion…);', '  }', '}'].map((t, i) => <text key={i} x="134" y={112 + i * 34} fill={i === 0 || i === 5 ? b : c} opacity={i === 0 || i === 5 ? 1 : 0.85}>{t}</text>)}
    </g>
  ),
  store: (a, b, c) => (
    <g>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const x = 120 + (i % 3) * 125, y = 80 + Math.floor(i / 3) * 125
        return <g key={i}><rect x={x} y={y} width="110" height="110" rx="10" fill={c} opacity={0.08 + (i % 2) * 0.06} />{i % 2 ? <circle cx={x + 55} cy={y + 55} r="30" fill={b} /> : <rect x={x + 28} y={y + 35} width="54" height="40" rx="6" fill={c} opacity=".85" />}</g>
      })}
    </g>
  ),
  community: (a, b, c) => (
    <g>
      {[[200, 190, 54], [300, 160, 70], [400, 195, 50], [250, 270, 40], [355, 270, 44]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={i % 2 ? b : c} opacity={i % 2 ? 0.9 : 0.85} />)}
    </g>
  ),
}

export default function ProjectCover({ p }) {
  if (p.image) return <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" width="1600" height="1000" />
  const [a, b, c] = p.palette
  return (
    <svg viewBox="0 0 600 375" role="img" aria-label={`${p.name} cover illustration`} preserveAspectRatio="xMidYMid slice">
      <rect width="600" height="375" fill={a} />
      <circle cx="520" cy="-40" r="220" fill={b} opacity=".08" />
      {(M[p.motif] || M.portal)(a, b, c)}
      <text x="28" y="350" fontFamily="Archivo,sans-serif" fontSize="15" fontWeight="600" fill={a === '#f5f5f5' ? '#000' : '#fff'} opacity=".7">{p.name}</text>
    </svg>
  )
}
