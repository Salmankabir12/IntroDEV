# Portfolio — AGENTS.md

## Stack

| Aspect | Choice |
|---|---|
| Framework | **Astro v6** (SSR, `output: 'server'`) |
| Adapter | `@astrojs/cloudflare` (session disabled) |
| UI | React 18 + Tailwind CSS v4 |
| CMS | Sanity (blog — dynamic, fetched at request time) |
| Database | Cloudflare D1 (contact form) |
| Email | Resend (raw `fetch`, not SDK) |
| Hosting | Cloudflare Pages |

## Commands

```bash
npm run dev       # astro dev
npm run build     # astro build + post-build script (see below)
npm run preview   # astro preview
```

**No test, lint, format, or typecheck scripts exist.** Only TypeScript compilation during build catches errors.

## Build — custom post-processing

`astro build` runs first, then a Node inline script:

1. Writes `dist/_worker.js` — a 2-line wrapper importing `./server/entry.mjs`
2. Copies `dist/client/_astro` → `dist/_astro`
3. Deletes `dist/server/wrangler.json`, `dist/server/.prerender/wrangler.json`, `dist/client`, `.wrangler`

This is fragile. If build breaks, check this script first.

## D1 binding

API routes import `cloudflare:workers`:
```ts
import { env } from 'cloudflare:workers'
const db = env.DB
```
Not `Astro.locals` or `context.locals`. Configured in `wrangler.toml` with `nodejs_compat` flag.

## Environment

`.env` is committed with real secrets. Required vars (`.env.example` is incomplete — needs 5, not 3):

```
SANITY_PROJECT_ID
SANITY_DATASET
RESEND_API_KEY
CONTACT_EMAIL
FROM_EMAIL
```

Sanity client has fallback hardcoded values (`projectId: '2hf9u675'`, `dataset: 'production'`).

Admin panel (in `src/pages/admin/`) needs two more secrets on Cloudflare:
- `ADMIN_PASSWORD` — login password
- `ADMIN_SECRET` — HMAC signing key (falls back to `SANITY_PROJECT_ID` then `'fallback-secret'` if unset)

## Resend

The `resend` npm dependency exists but is **never imported**. Contact form uses raw `fetch` to `https://api.resend.com/emails`.

## Sanity Studio

Subdirectory `studio/` — separate npm project, separate config, own lockfile.

- `npm run dev` / `npm run build` / `npm run deploy` (inside `studio/`)
- Project ID: `2hf9u675`, dataset: `production`
- Prettier config: `{ bracketSpacing: false, printWidth: 100, semi: false, singleQuote: true }`
- ESLint via `@sanity/eslint-config-studio`

## Tailwind v4

Uses `@tailwindcss/vite` plugin (not PostCSS). Minimal config — just `@import "tailwindcss"` in `global.css`. Custom properties for theming.

## Theme

CSS custom properties (not Tailwind `dark:` class). Inline `<script>` in layout prevents flash of wrong theme.

## Projects vs Blog

| Content | Source | Location |
|---|---|---|
| Projects | Static data | `src/data/projects.ts` (6 hardcoded objects) |
| Blog | Dynamic (Sanity GROQ) | `src/lib/queries.ts` |

## Notes

- Student predictor at `/api/predict` has **hardcoded linear regression coefficients** in `predict.ts`.
- Navbar, Footer, StudentPredictor are React components hydrated with `client:load`.
- `scripts/` directory is empty.
- No CI workflows (`no .github/`).
