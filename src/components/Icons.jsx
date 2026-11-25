// Line icon set drawn for ByAruf: 24px grid, 1.6 stroke, round joins.
const P = {
  code: <><path d="m8 8-4 4 4 4" /><path d="m16 8 4 4-4 4" /><path d="m13.5 5-3 14" /></>,
  browser: <><rect x="3" y="4.5" width="18" height="15" rx="2.5" /><path d="M3 9h18" /><path d="M6.5 6.8h.01M9 6.8h.01" /><path d="M7 13h6M7 16h10" /></>,
  phone: <><rect x="6.5" y="2.5" width="11" height="19" rx="2.5" /><path d="M10.5 18.5h3" /></>,
  spark: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="m12 8 1.4 2.6L16 12l-2.6 1.4L12 16l-1.4-2.6L8 12l2.6-1.4z" /></>,
  cloud: <><path d="M7 18.5h10a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7.1 9.6 4.5 4.5 0 0 0 7 18.5Z" /><path d="M12 12.5v4M10.2 14.8 12 16.5l1.8-1.7" /></>,
  chain: <><rect x="3" y="9" width="7" height="6" rx="1.5" /><rect x="14" y="9" width="7" height="6" rx="1.5" /><path d="M10 12h4" /><path d="M6.5 9V6.5M17.5 15v2.5" /></>,
  brand: <><circle cx="12" cy="12" r="8.5" /><path d="M12 3.5v17M3.5 12h8.5" /><path d="M12 12a5 5 0 0 1 5 5" /></>,
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  arrowUp: <><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>,
  check: <path d="m5 12.5 4.2 4.2L19 7" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></>,
  call: <path d="M5 4h3.5l1.7 4.3-2.2 1.4a11 11 0 0 0 6.3 6.3l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />,
  chat: <><path d="M4 5.5h16v11H10l-5 4v-4H4z" /><path d="M8 10h8M8 13h5" /></>,
  pin: <><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.3" /></>,
  github: <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  close: <><path d="M6 6l12 12M18 6 6 18" /></>,
  send: <><path d="M4 12 20 4l-6 16-2.5-6.5z" /><path d="m11.5 13.5 3-3" /></>,
  shield: <><path d="M12 3 5 6v5.5c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V6z" /><path d="m9 12 2.2 2.2L15.5 10" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5z" /><path d="m3 13 9 5 9-5" /></>,
  target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r=".8" /></>,
  handshake: <><path d="M3 12.5 7 8.5h3l2 1.5 2-1.5h3l4 4" /><path d="m7 15 3 3 1.5-1.5M10 13l3.5 3.5L15 15l-2.5-2.5M13 11l3 3 1.5-1.5" /></>,
  wave: <path d="M2 12c2-5 4-5 6 0s4 5 6 0 4-5 6 0 2 3 2 3" />,
  external: <><path d="M14 4h6v6" /><path d="M20 4 11 13" /><path d="M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" /></>,
}

export default function Icon({ name, title, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden={title ? undefined : true} role={title ? 'img' : undefined} {...rest}>
      {title && <title>{title}</title>}
      {P[name]}
    </svg>
  )
}

export const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 32 32" aria-hidden="true" {...props}><path fill="currentColor" d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.7 12.7-12.7S23 3 16 3zm0 23.1c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-4.1 1.3 1.3-4-.3-.4a10.5 10.5 0 1 1 8.9 4.8zm5.8-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.4 1.4.6 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" /></svg>
)

// ByAruf mark: a signal wave passing through a frame.
export const Mark = (props) => (
  <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
    <rect x="1" y="1" width="30" height="30" rx="8" fill="#00a86b" />
    <path d="M6 17.5c2.2-6 4.3-6 6.5 0s4.3 6 6.5 0 4.3-6 6.5 0" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
)
