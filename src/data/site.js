export const SITE = {
  name: 'ByAruf',
  legalName: 'BYARUF Networks & Labs',
  url: 'https://byaruf.xyz',
  owner: "Ma'aruf Yusuf",
  email: 'bookings@byaruf.xyz',
  phones: [
    { label: '0813 001 9388', tel: '+2348130019388' },
    { label: '0906 525 4589', tel: '+2349065254589' },
  ],
  whatsapp: '2349065254589',
  whatsappLabel: '0906 525 4589',
  address: {
    locality: 'Kubwa',
    area: 'Bwari Area Council',
    region: 'Federal Capital Territory',
    city: 'Abuja',
    country: 'NG',
  },
  geo: { lat: 9.1555, lng: 7.3226 },
  hours: 'Monday to Saturday, 9am to 6pm (WAT)',
}

export const waLink = (text = '') =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

// Places in Abuja and the FCT that people search with. Used in copy, keywords and schema.
export const AREAS = [
  'Kubwa', 'Bwari', 'Dutse', 'Gwarinpa', 'Wuse', 'Wuse 2', 'Maitama', 'Asokoro', 'Garki',
  'Central Business District', 'Jabi', 'Utako', 'Life Camp', 'Katampe', 'Jahi', 'Mabushi',
  'Lugbe', 'Lokogoma', 'Galadimawa', 'Apo', 'Gudu', 'Durumi', 'Karu', 'Nyanya', 'Kado',
  'Wuye', 'Idu', 'Gwagwalada', 'Kuje', 'Kwali', 'Abaji', 'Airport Road', 'Mpape', 'Dawaki',
]

export const COUNCILS = [
  'Abuja Municipal Area Council (AMAC)', 'Bwari Area Council', 'Gwagwalada Area Council',
  'Kuje Area Council', 'Kwali Area Council', 'Abaji Area Council',
]

export const BASE_KEYWORDS = [
  'software developer in Abuja', 'software company in Abuja', 'web developer Abuja',
  'website design Abuja', 'app developer Abuja', 'mobile app developer Abuja',
  'software developer FCT', 'tech company Federal Capital Territory', 'IT company Abuja',
  'software development company Nigeria', 'web developer Kubwa', 'website designer near me Abuja',
  'business software Nigeria', 'SaaS Nigeria', 'custom software Abuja', 'ByAruf', "Ma'aruf Yusuf",
]
