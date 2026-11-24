import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App.jsx'
export { ROUTES, NOT_FOUND, headHtml } from './seo.js'

export function render(url) {
  return renderToString(<StaticRouter location={url} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><App /></StaticRouter>)
}
