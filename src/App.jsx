import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import { Home, Products, ProductPage, Services, ServicePage, Areas, About, Faq, Contact, NotFound } from './pages.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:slug" element={<ProductPage />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServicePage />} />
        <Route path="areas-we-serve" element={<Areas />} />
        <Route path="about" element={<About />} />
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
