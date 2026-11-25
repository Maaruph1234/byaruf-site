import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import { Services, ServicePage } from './pages/Services.jsx'
import { Solutions, SolutionPage } from './pages/Solutions.jsx'
import { Work, ProjectPage } from './pages/Work.jsx'
import { Contact, Quote } from './pages/Contact.jsx'
import { Faq, Areas, Privacy } from './pages/Misc.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServicePage />} />
        <Route path="solutions" element={<Solutions />} />
        <Route path="solutions/:slug" element={<SolutionPage />} />
        <Route path="work" element={<Work />} />
        <Route path="work/:slug" element={<ProjectPage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="quote" element={<Quote />} />
        <Route path="faq" element={<Faq />} />
        <Route path="areas-we-serve" element={<Areas />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
