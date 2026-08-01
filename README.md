# Portfolio — Salman Kabir

Personal portfolio site built with [Astro](https://astro.build), deployed on [Cloudflare Pages](https://pages.cloudflare.com).

**Live site:** https://portfolio-22m.pages.dev

## Design

Editorial, magazine-inspired theme blending references from Ravi Klaassens and Perry Wang:

- **Typography** — Gloock serif for display headlines, Instrument Serif italic for accent words, Inter/system sans for body
- **Palette** — dark monochrome with a warm gold accent (`#e8b65a`)
- **Layout** — statement hero, full-width numbered project rows, marquee tech ticker, editorial multi-column footer
- **Interactions** — scroll-triggered fade-ins, hover overlays, live clock, smooth theme toggle

## Stack

- **Framework** — Astro v6 (SSR mode, Cloudflare adapter)
- **UI** — React 19, Tailwind CSS v4
- **CMS** — Sanity (blog content)
- **Database** — Cloudflare D1 (contact form submissions)
- **Email** — Resend (transactional emails)
- **ML** — Python, scikit-learn (student score predictor)
- **Hosting** — Cloudflare Pages

## Development

```bash
npm install
npm run dev
```

## Environment

Copy `.env.example` to `.env` and fill in:

```
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
RESEND_API_KEY=re_...
CONTACT_EMAIL=you@example.com
FROM_EMAIL=contact@yourdomain.com
```

## Deploy

```bash
npm run build
npx wrangler pages deploy dist --project-name=portfolio
```

## Studio

Content is managed via Sanity Studio at https://salmaaaankabir-portfolio.sanity.studio
