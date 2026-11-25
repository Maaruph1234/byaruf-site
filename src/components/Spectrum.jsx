import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SERVICES } from '../data/services.js'

// Hero picture: the seven service lines drawn as seven frequency bands. One band lights up at a time.
const W = 600, H = 612, TOP = 64, BAND = (H - TOP - 24) / SERVICES.length

function wave(y, cycles, amp) {
  const wl = W / cycles
  const pts = []
  for (let x = -wl; x <= W + wl * 2; x += 6) pts.push(`${x.toFixed(1)},${(y + Math.sin((x / wl) * Math.PI * 2) * amp).toFixed(1)}`)
  return { d: 'M' + pts.join(' L'), wl }
}

const BANDS = SERVICES.map((s, i) => {
  const y = TOP + BAND * i + BAND / 2 + 8
  const { d, wl } = wave(y, 2 + i * 0.9, 9 + (i % 3) * 3)
  return { s, y, d, wl, label: s.name.replace(' and ', ' & ') }
})

export default function Spectrum() {
  const [on, setOn] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setOn((v) => (v + 1) % BANDS.length), 2600)
    return () => clearInterval(t)
  }, [paused])

  return (
    <div className="spectrum" onMouseLeave={() => setPaused(false)}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label="ByAruf's seven service lines shown as frequency bands">
        <g className="grid">
          {Array.from({ length: 11 }, (_, i) => <line key={i} x1={i * 60} y1={TOP - 14} x2={i * 60} y2={H} />)}
          {BANDS.map((b, i) => <line key={'h' + i} x1="0" x2={W} y1={TOP + BAND * i} y2={TOP + BAND * i} />)}
        </g>
        <text className="hdrtxt" x="24" y="36">Service spectrum</text>
        <text className="hdrtxt hi" x={W - 24} y="36" textAnchor="end">{String(on + 1).padStart(2, '0')} / 07</text>
        {BANDS.map((b, i) => (
          <g key={b.s.slug} className={i === on ? 'band-on' : ''}>
            <path className="wave" d={b.d} style={{ '--shift': `-${b.wl.toFixed(1)}px`, '--d': `${7 + i * 1.3}s` }} />
            <Link to={`/services/${b.s.slug}/`} onMouseEnter={() => { setPaused(true); setOn(i) }} onFocus={() => { setPaused(true); setOn(i) }}>
              <rect x="0" y={TOP + BAND * i} width={W} height={BAND} fill="transparent" />
              <text className="band-label" x="24" y={TOP + BAND * i + 22}>{b.label}</text>
            </Link>
          </g>
        ))}
        <g className="scan-g" style={{ '--scan': `${W - 80}px` }}>
          <line className="scan" x1="40" x2="40" y1={TOP - 10} y2={H - 10} />
        </g>
      </svg>
    </div>
  )
}
