# Portfolio — Salman Kabir

Personal portfolio site built with [Astro](https://astro.build), deployed on [Cloudflare Pages](https://pages.cloudflare.com).

Built with a focus on performance and minimalism. Features include a predictive ML model for student exam scores, project showcase, and blog via Sanity CMS.

## Stack

- **Framework** — Astro v6 (SSR mode)
- **UI** — React 19, Tailwind CSS v4
- **CMS** — Sanity (project & blog content)
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
