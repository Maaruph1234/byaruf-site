import { SITE, AREAS, COUNCILS, BASE_KEYWORDS, POSITIONING } from './data/site.js'
import { SOLUTIONS } from './data/solutions.js'
import { SERVICES } from './data/services.js'
import { PROJECTS } from './data/projects.js'
import { FAQ } from './data/faq.js'

const abs = (p) => SITE.url + p
const ORG = SITE.url + '/#organization'

const organization = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService'],
  '@id': ORG,
  name: 'ByAruf',
  alternateName: ['BYARUF', 'byaruf.xyz'],
  url: SITE.url + '/',
  logo: abs('/logo.png'),
  image: abs('/og.png'),
  description: POSITIONING,
  email: SITE.email,
  telephone: SITE.phoneTel,
  founder: { '@type': 'Person', name: SITE.founder },
  sameAs: [SITE.github],
  address: { '@type': 'PostalAddress', addressLocality: 'Kubwa, Abuja', addressRegion: 'Federal Capital Territory', addressCountry: 'NG' },
  geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  areaServed: [{ '@type': 'City', name: 'Abuja' }, { '@type': 'AdministrativeArea', name: 'Federal Capital Territory' }, { '@type': 'Country', name: 'Nigeria' }],
  contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', email: SITE.email, telephone: SITE.phoneTel, areaServed: 'NG', availableLanguage: ['English'] }],
  knowsAbout: ['Software development', 'Web development', 'Mobile app development', 'AI automation', 'Cloud computing', 'AWS', 'Blockchain', 'Smart contracts', 'Branding', 'UI/UX design'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog', name: 'ByAruf services',
    itemListElement: SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, url: abs(`/services/${s.slug}/`) } })),
  },
}

const website = { '@context': 'https://schema.org', '@type': 'WebSite', '@id': SITE.url + '/#website', url: SITE.url + '/', name: 'ByAruf', publisher: { '@id': ORG }, inLanguage: 'en-NG' }

const crumbs = (items) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [['Home', '/'], ...items].map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) })),
})

const NG = ['Abuja', 'FCT', 'Nigeria']

export const ROUTES = (() => {
  const r = []
  r.push({
    path: '/', title: 'ByAruf | Software, Web, App, AI and Blockchain Company in Abuja, Nigeria',
    description: 'ByAruf is a technology and digital solutions company in Abuja. Custom software, websites, mobile apps, AI automation, cloud, blockchain and branding for businesses across Nigeria.',
    keywords: [...BASE_KEYWORDS, ...SERVICES.flatMap((s) => s.keywords.slice(0, 2))], jsonld: [organization, website],
  })
  r.push({
    path: '/about/', title: 'About ByAruf | Technology and Digital Solutions Company, Abuja',
    description: "ByAruf's mission, vision and approach. A technology and digital solutions company in Kubwa, Abuja founded by Ma'aruf Yusuf, telecoms engineer, AWS certified and Solidity-certified developer.",
    keywords: ['about ByAruf', "Ma'aruf Yusuf", 'technology company Abuja', 'digital solutions company Nigeria', 'software company Kubwa'],
    jsonld: [crumbs([['About', '/about/']]), organization, {
      '@context': 'https://schema.org', '@type': 'Person', name: SITE.founder, alternateName: ['Aruf', 'Maaruf Yusuf'], url: abs('/about/'),
      jobTitle: 'Founder', worksFor: { '@id': ORG }, alumniOf: { '@type': 'CollegeOrUniversity', name: 'Air Force Institute of Technology, Kaduna' },
      knowsAbout: ['Blockchain', 'Solidity', 'AWS', 'Telecommunications', 'Software development'], sameAs: [SITE.github],
    }],
  })
  r.push({
    path: '/services/', title: 'Services | Software, Web, Mobile, AI, Cloud, Blockchain and Branding | ByAruf Abuja',
    description: 'Seven connected services from ByAruf in Abuja: software development, website development, mobile apps, AI and automation, cloud and IT, blockchain and Web3, and branding.',
    keywords: [...SERVICES.flatMap((s) => s.keywords.slice(0, 3)), 'IT services Abuja', 'digital transformation Nigeria'],
    jsonld: [crumbs([['Services', '/services/']])],
  })
  for (const s of SERVICES) r.push({
    path: `/services/${s.slug}/`, title: `${s.seoTitle} | ByAruf`, description: s.seoDescription,
    keywords: [...s.keywords, ...NG.map((n) => `${s.name} ${n}`)],
    jsonld: [crumbs([['Services', '/services/'], [s.name, `/services/${s.slug}/`]]), {
      '@context': 'https://schema.org', '@type': 'Service', name: s.name, serviceType: s.name, description: s.seoDescription,
      url: abs(`/services/${s.slug}/`), provider: { '@id': ORG }, areaServed: organization.areaServed,
      hasOfferCatalog: { '@type': 'OfferCatalog', name: s.name, itemListElement: s.offers.map((o) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: o[0], description: o[1] } })) },
    }],
  })
  r.push({
    path: '/solutions/', title: 'Ready-made Business Software for Nigerian Companies | ByAruf',
    description: 'Ready-made systems from ByAruf: property portfolio tracker, travel booking platform, field data platform and courier and delivery app, set up with your brand and data.',
    keywords: ['business software Nigeria', 'SaaS Abuja', ...SOLUTIONS.flatMap((p) => p.keywords.slice(0, 2))],
    jsonld: [crumbs([['Solutions', '/solutions/']])],
  })
  for (const p of SOLUTIONS) r.push({
    path: `/solutions/${p.slug}/`, title: `${p.seoTitle} | ByAruf`, description: p.seoDescription,
    keywords: [...p.keywords, `${p.name} Abuja`, `${p.name} Nigeria`],
    jsonld: [crumbs([['Solutions', '/solutions/'], [p.name, `/solutions/${p.slug}/`]]), {
      '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: p.name, applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, Android, iOS', description: p.seoDescription, url: abs(`/solutions/${p.slug}/`), provider: { '@id': ORG },
      featureList: p.modules.map((m) => m[0]).join(', '),
    }],
  })
  r.push({
    path: '/work/', title: 'Our Work | Selected Projects and Portfolio | ByAruf',
    description: 'Selected ByAruf projects: SpectraChain blockchain research, MHU Global fintech wallet, Evergreen Lifecare website and donor portal, MYK Global Trade and more, with technologies and GitHub links.',
    keywords: ['ByAruf portfolio', 'software projects Nigeria', 'web developer portfolio Abuja', 'blockchain projects Nigeria'],
    jsonld: [crumbs([['Work', '/work/']]), {
      '@context': 'https://schema.org', '@type': 'ItemList',
      itemListElement: PROJECTS.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/work/${p.slug}/`), name: p.name })),
    }],
  })
  for (const p of PROJECTS) r.push({
    path: `/work/${p.slug}/`, title: `${p.name}: ${p.kind} | ByAruf Work`, description: p.summary,
    keywords: [p.name, p.kind, ...p.stack.slice(0, 6), 'ByAruf project'],
    jsonld: [crumbs([['Work', '/work/'], [p.name, `/work/${p.slug}/`]]), {
      '@context': 'https://schema.org', '@type': 'CreativeWork', name: p.name, about: p.kind, description: p.summary,
      creator: { '@id': ORG }, url: abs(`/work/${p.slug}/`), keywords: p.stack.join(', '),
      sameAs: [p.repo, ...(p.live ? [p.live] : [])],
    }],
  })
  r.push({
    path: '/quote/', title: 'Get a Quote or Book a Consultation | ByAruf Abuja',
    description: 'Tell ByAruf about your project. Choose a service, describe what you need, share a budget range and get a clear written proposal.',
    keywords: ['get a quote website Abuja', 'software quote Nigeria', 'app development cost Nigeria', 'book IT consultation Abuja'],
    jsonld: [crumbs([['Get a Quote', '/quote/']])],
  })
  r.push({
    path: '/contact/', title: 'Contact ByAruf | Email, Phone and WhatsApp | Abuja, FCT',
    description: 'Contact ByAruf in Kubwa, Abuja. Email bookings@byaruf.xyz, call or WhatsApp +234 906 525 4589, or send a message through the website.',
    keywords: ['contact ByAruf', 'hire developer Abuja', 'software company contact Abuja', 'ByAruf WhatsApp'],
    jsonld: [crumbs([['Contact', '/contact/']]), organization],
  })
  r.push({
    path: '/faq/', title: 'Frequently Asked Questions | ByAruf',
    description: 'Answers about ByAruf services, portfolio, pricing, timelines, ownership and how to start a project.',
    keywords: ['ByAruf FAQ', 'how much does a website cost in Abuja', 'how much does an app cost in Nigeria'],
    jsonld: [crumbs([['FAQ', '/faq/']]), {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    }],
  })
  r.push({
    path: '/areas-we-serve/', title: 'Software, Website and App Developer Near You in Abuja and the FCT | ByAruf',
    description: `ByAruf serves businesses across Abuja and the Federal Capital Territory, including ${AREAS.slice(0, 10).join(', ')} and all six area councils.`,
    keywords: AREAS.flatMap((a) => [`web developer ${a}`, `software company ${a} Abuja`]).concat(COUNCILS.map((c) => `tech company ${c}`), ['website designer near me Abuja', 'app developer near me Abuja']),
    jsonld: [crumbs([['Areas we serve', '/areas-we-serve/']]), organization],
  })
  r.push({
    path: '/privacy/', title: 'Privacy Notice | ByAruf', description: 'How ByAruf handles information sent through byaruf.xyz forms and the AI assistant.',
    keywords: [], jsonld: [crumbs([['Privacy', '/privacy/']])],
  })
  return r
})()

export const findRoute = (path) => ROUTES.find((r) => r.path === (path.endsWith('/') ? path : path + '/'))
export const NOT_FOUND = { path: '/404/', title: 'Page not found | ByAruf', description: 'This page does not exist.', keywords: [], jsonld: [], noindex: true }

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function headHtml(route) {
  const url = abs(route.path)
  const kw = [...new Set(route.keywords)].join(', ')
  return [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}">`,
    kw && `<meta name="keywords" content="${esc(kw)}">`,
    `<meta name="robots" content="${route.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}">`,
    !route.noindex && `<link rel="canonical" href="${url}">`,
    !route.noindex && `<link rel="alternate" hreflang="en-ng" href="${url}">`,
    !route.noindex && `<link rel="alternate" hreflang="x-default" href="${url}">`,
    `<meta name="geo.region" content="NG-FC">`,
    `<meta name="geo.placename" content="Kubwa, Abuja">`,
    `<meta name="geo.position" content="${SITE.geo.lat};${SITE.geo.lng}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="ByAruf">`,
    `<meta property="og:locale" content="en_NG">`,
    `<meta property="og:title" content="${esc(route.title)}">`,
    `<meta property="og:description" content="${esc(route.description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${abs('/og.png')}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="ByAruf, technology and digital solutions company in Abuja">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(route.title)}">`,
    `<meta name="twitter:description" content="${esc(route.description)}">`,
    `<meta name="twitter:image" content="${abs('/og.png')}">`,
    ...route.jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`),
  ].filter(Boolean).join('\n    ')
}
