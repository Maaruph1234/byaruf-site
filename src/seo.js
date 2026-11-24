import { SITE, AREAS, COUNCILS, BASE_KEYWORDS } from './data/site.js'
import { PRODUCTS } from './data/products.js'
import { SERVICES } from './data/services.js'
import { FAQ } from './data/faq.js'

const abs = (p) => SITE.url + p

const ORG_ID = SITE.url + '/#business'

const business = {
  '@context': 'https://schema.org',
  '@type': ['ProfessionalService', 'LocalBusiness'],
  '@id': ORG_ID,
  name: 'ByAruf',
  legalName: SITE.legalName,
  alternateName: ['BYARUF', 'ByAruf Networks & Labs', 'byaruf.xyz'],
  url: SITE.url + '/',
  logo: abs('/logo.png'),
  image: abs('/og.png'),
  description: 'Software company in Kubwa, Abuja selling ready-made business software and offering web and mobile app development, blockchain development, AI automation, tech project management, cloud setup and business branding.',
  email: SITE.email,
  telephone: SITE.phones.map((p) => p.tel),
  founder: { '@type': 'Person', name: SITE.owner },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kubwa, Abuja',
    addressRegion: 'Federal Capital Territory',
    addressCountry: 'NG',
  },
  geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00', closes: '18:00',
  }],
  areaServed: [
    { '@type': 'City', name: 'Abuja' },
    { '@type': 'AdministrativeArea', name: 'Federal Capital Territory' },
    ...AREAS.map((a) => ({ '@type': 'Place', name: `${a}, Abuja` })),
    { '@type': 'Country', name: 'Nigeria' },
  ],
  contactPoint: [{
    '@type': 'ContactPoint', contactType: 'sales', email: SITE.email,
    telephone: '+2349065254589', areaServed: 'NG', availableLanguage: ['English'],
  }],
  knowsAbout: ['Software development', 'Blockchain', 'Smart contracts', 'Solidity', 'AI automation', 'AWS', 'Cloud computing', 'Project management', 'Branding', 'Telecommunications'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog', name: 'Products and services',
    itemListElement: [
      ...PRODUCTS.map((p) => ({ '@type': 'Offer', itemOffered: { '@type': 'SoftwareApplication', name: p.name, applicationCategory: 'BusinessApplication', operatingSystem: 'Web, Android, iOS', url: abs(`/products/${p.slug}/`) } })),
      ...SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, url: abs(`/services/${s.slug}/`) } })),
    ],
  },
}

const website = {
  '@context': 'https://schema.org', '@type': 'WebSite', '@id': SITE.url + '/#website',
  url: SITE.url + '/', name: 'ByAruf', publisher: { '@id': ORG_ID }, inLanguage: 'en-NG',
}

const crumbs = (items) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [['Home', '/'], ...items].map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) })),
})

const areaWords = ['Abuja', 'FCT', 'Federal Capital Territory', 'Nigeria']

export const ROUTES = (() => {
  const r = []
  r.push({
    path: '/',
    title: 'ByAruf | Software Company in Abuja, FCT | Web, App, Blockchain and AI',
    description: 'ByAruf is a software company in Kubwa, Abuja, FCT. Ready-made business software for real estate, travel, field teams and delivery, plus web and app development, blockchain, AI automation, tech project management and branding.',
    keywords: [...BASE_KEYWORDS, ...PRODUCTS.flatMap((p) => p.keywords.slice(0, 2)), ...SERVICES.flatMap((s) => s.keywords.slice(0, 2))],
    jsonld: [business, website],
  })
  r.push({
    path: '/products/',
    title: 'Business Software Products for Nigerian Companies | ByAruf Abuja',
    description: 'Ready-made business software from Abuja: Property Portfolio Tracker, Travel Booking Platform, Field Data Platform and Courier and Delivery App. Set up with your brand in 2 to 4 weeks.',
    keywords: ['business software Nigeria', 'SaaS Abuja', 'ready made software Nigeria', ...PRODUCTS.flatMap((p) => p.keywords.slice(0, 3))],
    jsonld: [crumbs([['Products', '/products/']]), {
      '@context': 'https://schema.org', '@type': 'ItemList',
      itemListElement: PRODUCTS.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/products/${p.slug}/`), name: p.name })),
    }],
  })
  for (const p of PRODUCTS) {
    r.push({
      path: `/products/${p.slug}/`,
      title: `${p.seoTitle} | ByAruf`,
      description: p.seoDescription,
      keywords: [...p.keywords, `${p.name} Abuja`, `${p.name} Nigeria`],
      jsonld: [crumbs([['Products', '/products/'], [p.name, `/products/${p.slug}/`]]), {
        '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: p.name,
        applicationCategory: 'BusinessApplication', operatingSystem: 'Web, Android, iOS',
        description: p.seoDescription, url: abs(`/products/${p.slug}/`),
        provider: { '@id': ORG_ID }, areaServed: areaWords,
        featureList: p.modules.map((m) => m[0]).join(', '),
      }],
    })
  }
  r.push({
    path: '/services/',
    title: 'Tech Services in Abuja | Blockchain, AI Automation, Apps, Branding | ByAruf',
    description: 'Technology services in Abuja, FCT: blockchain development, AI automation, web and mobile app development, tech project management, AWS cloud setup and business branding for businesses across Nigeria.',
    keywords: [...SERVICES.flatMap((s) => s.keywords.slice(0, 3)), 'IT services Abuja', 'tech services FCT'],
    jsonld: [crumbs([['Services', '/services/']])],
  })
  for (const s of SERVICES) {
    r.push({
      path: `/services/${s.slug}/`,
      title: `${s.seoTitle} | ByAruf`,
      description: s.seoDescription,
      keywords: [...s.keywords, `${s.name} Abuja`, `${s.name} FCT`, `${s.name} Nigeria`],
      jsonld: [crumbs([['Services', '/services/'], [s.name, `/services/${s.slug}/`]]), {
        '@context': 'https://schema.org', '@type': 'Service', name: s.name, serviceType: s.name,
        description: s.seoDescription, url: abs(`/services/${s.slug}/`), provider: { '@id': ORG_ID },
        areaServed: [{ '@type': 'City', name: 'Abuja' }, { '@type': 'AdministrativeArea', name: 'Federal Capital Territory' }, { '@type': 'Country', name: 'Nigeria' }],
        hasOfferCatalog: { '@type': 'OfferCatalog', name: s.name, itemListElement: s.offers.map((o) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: o[0], description: o[1] } })) },
      }],
    })
  }
  r.push({
    path: '/areas-we-serve/',
    title: 'Software, Website and App Developer Near You in Abuja and the FCT | ByAruf',
    description: `ByAruf serves businesses across Abuja and the Federal Capital Territory, including ${AREAS.slice(0, 12).join(', ')} and all six area councils. Websites, apps, blockchain, AI and branding.`,
    keywords: AREAS.flatMap((a) => [`web developer ${a}`, `software developer ${a} Abuja`]).concat(COUNCILS.map((c) => `tech company ${c}`), ['website designer near me Abuja', 'app developer near me Abuja']),
    jsonld: [crumbs([['Areas we serve', '/areas-we-serve/']]), business],
  })
  r.push({
    path: '/about/',
    title: "About Ma'aruf Yusuf and ByAruf | Software and Blockchain Developer, Abuja",
    description: "Meet Ma'aruf Yusuf, founder of ByAruf in Kubwa, Abuja. Telecoms engineer (AFIT Kaduna), AWS certified, Solidity-certified blockchain developer and former COO building software for Nigerian businesses.",
    keywords: ["Ma'aruf Yusuf", 'Maaruf Yusuf', 'Aruf developer', 'ByAruf founder', 'blockchain developer Abuja', 'telecom engineer Abuja', 'AWS certified Abuja'],
    jsonld: [crumbs([['About', '/about/']]), {
      '@context': 'https://schema.org', '@type': 'Person', name: SITE.owner, alternateName: ['Aruf', 'Maaruf Yusuf'],
      url: abs('/about/'), jobTitle: 'Founder, Software and Blockchain Developer', worksFor: { '@id': ORG_ID },
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Air Force Institute of Technology, Kaduna' },
      address: { '@type': 'PostalAddress', addressLocality: 'Abuja', addressRegion: 'Federal Capital Territory', addressCountry: 'NG' },
      knowsAbout: ['Blockchain', 'Solidity', 'AWS', 'Telecommunications', 'Software development', 'Project management'],
    }],
  })
  r.push({
    path: '/contact/',
    title: 'Contact ByAruf | Book a Free Demo | Kubwa, Abuja, FCT',
    description: 'Contact ByAruf in Kubwa, Abuja. WhatsApp 0906 525 4589, call 0813 001 9388 or email bookings@byaruf.xyz to book a free demo or get a quote.',
    keywords: ['contact software developer Abuja', 'hire developer Abuja', 'ByAruf contact', 'ByAruf phone number', 'ByAruf WhatsApp'],
    jsonld: [crumbs([['Contact', '/contact/']]), business],
  })
  r.push({
    path: '/faq/',
    title: 'Frequently Asked Questions | ByAruf Software, Abuja',
    description: 'Answers about ByAruf products, services, pricing, setup time, training, data ownership and how to get started. Software company in Abuja, FCT.',
    keywords: ['ByAruf FAQ', 'software cost Nigeria', 'how much does a website cost in Abuja', 'how much does an app cost in Nigeria'],
    jsonld: [crumbs([['FAQ', '/faq/']]), {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    }],
  })
  return r
})()

export const findRoute = (path) => {
  const p = path.endsWith('/') ? path : path + '/'
  return ROUTES.find((r) => r.path === p)
}

export const NOT_FOUND = {
  path: '/404/', title: 'Page not found | ByAruf', description: 'This page does not exist. Go to the ByAruf home page.', keywords: [], jsonld: [], noindex: true,
}

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
    `<link rel="alternate" hreflang="en-ng" href="${url}">`,
    `<link rel="alternate" hreflang="x-default" href="${url}">`,
    `<meta name="geo.region" content="NG-FC">`,
    `<meta name="geo.placename" content="Kubwa, Abuja, Federal Capital Territory">`,
    `<meta name="geo.position" content="${SITE.geo.lat};${SITE.geo.lng}">`,
    `<meta name="ICBM" content="${SITE.geo.lat}, ${SITE.geo.lng}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="ByAruf">`,
    `<meta property="og:locale" content="en_NG">`,
    `<meta property="og:title" content="${esc(route.title)}">`,
    `<meta property="og:description" content="${esc(route.description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${abs('/og.png')}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="ByAruf, software company in Abuja">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(route.title)}">`,
    `<meta name="twitter:description" content="${esc(route.description)}">`,
    `<meta name="twitter:image" content="${abs('/og.png')}">`,
    ...route.jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`),
  ].filter(Boolean).join('\n    ')
}
