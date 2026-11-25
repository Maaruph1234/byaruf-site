import fs from 'node:fs'
import path from 'node:path'

const dist = path.resolve('dist')
const { render, ROUTES, NOT_FOUND, headHtml } = await import(path.resolve('dist-ssr/entry-server.js'))
const tpl = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const page = (route, url) => tpl.replace('<!--head-->', headHtml(route)).replace('<!--app-->', render(url))

for (const r of ROUTES) {
  const dir = path.join(dist, r.path)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), page(r, r.path))
}
fs.writeFileSync(path.join(dist, '404.html'), page(NOT_FOUND, '/404/'))

const today = new Date().toISOString().slice(0, 10)
const pri = (p) => (p === '/' ? '1.0' : p.split('/').length > 3 ? '0.8' : '0.9')
fs.writeFileSync(path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  ROUTES.map((r) => `  <url><loc>https://byaruf.xyz${r.path}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${pri(r.path)}</priority></url>`).join('\n') +
  `\n</urlset>\n`)
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: https://byaruf.xyz/sitemap.xml\n`)
console.log(`Prerendered ${ROUTES.length} pages + 404`)
