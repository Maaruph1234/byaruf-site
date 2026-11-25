# byaruf.xyz

Official website of ByAruf, a technology and digital solutions company in Abuja.

- React 18 + Vite, every page pre-rendered to static HTML for SEO (`scripts/prerender.mjs`)
- Vercel serverless functions in `api/` for the AI assistant and the enquiry forms
- All site content lives in `src/data/` (services, solutions, projects, FAQ, contact details)

## Run locally

```bash
npm install
npm run build
node --env-file-if-exists=.env scripts/serve.mjs   # http://localhost:4173, serves dist/ and runs api/
```

`npm run dev` gives hot reload for design work (the `/api` routes are not available in Vite dev).

## Environment variables

Set these in Vercel: Project > Settings > Environment Variables (Production and Preview). See `.env.example`.

| Variable | Needed for | Notes |
|---|---|---|
| `ANTHROPIC_API_KEY` | AI assistant | From console.anthropic.com. Without it the assistant still works, but answers only from site content and says so. |
| `ANTHROPIC_MODEL` | optional | Defaults to `claude-haiku-5-5`. |
| `RESEND_API_KEY` | Contact and quote forms, enquiries from the assistant | From resend.com. Without it the forms show a one-tap WhatsApp or email fallback, so no enquiry is lost. |
| `ENQUIRY_FROM_EMAIL` | forms | A sender on a domain verified in Resend, e.g. `ByAruf Website <website@byaruf.xyz>`. |
| `ENQUIRY_TO_EMAIL` | optional | Where enquiries are delivered. Defaults to `bookings@byaruf.xyz`. |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | optional | Shared rate limiting across all serverless instances. Without them, limits are kept per instance. |
| `VITE_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | optional | Cloudflare Turnstile spam check on forms. Set both, then redeploy. |

After changing variables, redeploy (Deployments > ... > Redeploy).

## Security and spam protection

- API keys are only read on the server (`api/`), never shipped to the browser.
- Origin check, request size limit, input validation and HTML escaping on every endpoint.
- Rate limits: chat 20 messages per 10 minutes and 150 per day per IP; forms 5 per hour per IP; enquiries from the assistant 3 per hour per IP.
- Forms use a hidden honeypot field and a minimum fill time, plus optional Turnstile.
- The assistant is grounded on `src/data/kb.js` and instructed not to invent prices, clients, results or services.

## Deployment (Vercel)

The domain and DNS are on Vercel. Pushing to `main` deploys production. `vercel.json` sets the build command (`npm run build`), output (`dist`), trailing slashes, security headers, long caching for assets and redirects from the old URLs. The apex to www redirect is handled by the Vercel domain settings.

### Domain and DNS

In Vercel > Project > Settings > Domains, keep both:

- `www.byaruf.xyz` as the primary domain (this is how it is set up now, and the site's canonical URLs use it)
- `byaruf.xyz` set to redirect to `www.byaruf.xyz`

Because the nameservers are Vercel's (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`), Vercel manages the records and HTTPS certificates automatically. If you ever move DNS elsewhere, use:

| Type | Name | Value |
|---|---|---|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

To send email from the forms, add the DNS records Resend shows when you verify `byaruf.xyz` (usually an MX, a TXT for SPF and a TXT for DKIM on a `send` or `resend` subdomain). Add them in Vercel > Domains > byaruf.xyz > DNS Records. They do not affect the `bookings@byaruf.xyz` mailbox as long as you do not change the root MX records.

### GitHub Pages

The repository also has an old GitHub Pages setup. It is not serving the domain. Turn it off in GitHub > Settings > Pages to avoid confusion.

## Analytics

The app dispatches a `byaruf:pageview` browser event on every route change. To add analytics (Vercel Web Analytics, Plausible or Google Analytics), load the script in `index.html` and listen for that event to record client-side navigations.

## Adding portfolio screenshots

Projects show drawn covers in each project's own colours. To use a real screenshot, add `public/work/<slug>.webp` (1600 x 1000) and set `image: '/work/<slug>.webp'` on the project in `src/data/projects.js`.
