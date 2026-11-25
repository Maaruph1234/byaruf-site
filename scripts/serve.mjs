// Local preview: serves dist/ like Vercel and runs api/*.js handlers. Usage: node --env-file-if-exists=.env scripts/serve.mjs
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
const dist = path.resolve('dist'), port = Number(process.env.PORT || 4173)
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json', '.webp': 'image/webp' }
http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x')
  if (url.pathname.startsWith('/api/')) {
    const file = path.resolve('api', url.pathname.slice(5).replace(/\/$/, '') + '.js')
    if (!fs.existsSync(file) || file.includes('_lib')) { res.writeHead(404).end(); return }
    let raw = ''; for await (const c of req) raw += c
    try { req.body = raw ? JSON.parse(raw) : {} } catch { req.body = {} }
    res.status = (c) => { res.statusCode = c; return res }
    res.send = (b) => res.end(b)
    const mod = await import(file + '?t=' + Date.now())
    return mod.default(req, res)
  }
  let p = path.join(dist, decodeURIComponent(url.pathname))
  if (!path.extname(p) && !url.pathname.endsWith('/')) { res.writeHead(308, { Location: url.pathname + '/' }).end(); return }
  if (url.pathname.endsWith('/')) p = path.join(p, 'index.html')
  if (!p.startsWith(dist) || !fs.existsSync(p)) { res.writeHead(404, { 'Content-Type': types['.html'] }).end(fs.readFileSync(path.join(dist, '404.html'))); return }
  res.writeHead(200, { 'Content-Type': types[path.extname(p)] || 'application/octet-stream' }).end(fs.readFileSync(p))
}).listen(port, () => console.log('http://localhost:' + port))
