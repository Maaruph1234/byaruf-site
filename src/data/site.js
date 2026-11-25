export const SITE = {
  name: 'ByAruf',
  url: 'https://byaruf.xyz',
  founder: "Ma'aruf Yusuf",
  email: 'bookings@byaruf.xyz',
  phone: '+234 906 525 4589',
  phoneTel: '+2349065254589',
  whatsapp: '2349065254589',
  location: 'Kubwa, Abuja, Federal Capital Territory, Nigeria',
  github: 'https://github.com/Maaruph1234',
  geo: { lat: 9.1555, lng: 7.3226 },
}

export const waLink = (text = '') =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const POSITIONING = 'ByAruf is a technology and digital solutions company in Abuja. We help businesses, startups and organisations turn ideas into working digital products, automate their processes and put emerging technology to practical use.'

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

export const BUDGETS = [
  'Under ₦500,000', '₦500,000 to ₦1.5M', '₦1.5M to ₦5M', '₦5M to ₦15M', 'Above ₦15M', 'Not sure yet',
]

export const BASE_KEYWORDS = [
  'software company in Abuja', 'software developer in Abuja', 'tech company Abuja', 'IT company Abuja',
  'web developer Abuja', 'website design Abuja', 'mobile app developer Abuja', 'app development company Abuja',
  'software development company Nigeria', 'digital solutions company Nigeria', 'custom software Abuja',
  'AI automation Abuja', 'blockchain developer Abuja', 'tech company Federal Capital Territory',
  'web developer Kubwa', 'ByAruf', "Ma'aruf Yusuf",
]

// Technologies actually used in ByAruf's repositories and projects.
export const STACK = [
  { layer: 'Web and front end', items: ['React', 'Next.js', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Radix UI'] },
  { layer: 'Mobile', items: ['React Native', 'Expo'] },
  { layer: 'Back end and data', items: ['Node.js', 'Express', 'Supabase', 'PostgreSQL', 'Edge Functions', 'REST APIs', 'Web Push'] },
  { layer: 'Cloud and delivery', items: ['AWS', 'Vercel', 'Railway', 'GitHub'] },
  { layer: 'Blockchain', items: ['Solidity', 'Foundry', 'Hardhat', 'Ethers.js', 'Chainlink'] },
  { layer: 'AI and automation', items: ['LLM APIs', 'Retrieval grounding', 'Tool calling', 'Chatbots', 'Workflow automation'] },
]
