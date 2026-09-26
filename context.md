# Project context

Running log of decisions and state for this portfolio, so future sessions can pick up where the last one stopped. Newest entries go at the top.

## Live site
- Domain: https://chinsanaa.me (Vercel project `portfolio`, team `chinsanaa`)
- `NEXT_PUBLIC_SITE_URL` is set to `https://chinsanaa.me` in Vercel; `src/config/resources.ts` falls back to the same value.
- Vercel Deployment Protection (SSO) is on for everything except custom domains, so `*.vercel.app` preview URLs redirect to a Vercel login. That is expected.

## Stack and conventions
- Next.js 16 (App Router, Turbopack), React 19, TypeScript, framer-motion.
- Design system "Midnight Studio": dark only, flat colors, no gradients. Tokens live in `src/styles/tokens.css`; see `DESIGN_SYSTEM.md`.
- Icons are hand-drawn inline SVGs in `src/components/icons/index.tsx`. Do not add an icon library or third-party widgets.
- framer-motion runs through `LazyMotion` + `m.*` with `strict` in `Portfolio.tsx`. Using `motion.*` anywhere will throw at runtime.
- Page copy lives in `src/components/portfolio/content.ts`; URLs and file paths in `src/config/resources.ts`.
- Checks before pushing: `npm run lint` and `npm run build`.

## SEO and AI visibility (current state)
- `src/app/robots.ts` and `src/app/sitemap.ts` generate `/robots.txt` and `/sitemap.xml`.
- `IS_INDEXABLE` in `resources.ts` allows indexing on production and local, blocks it on Vercel previews. It is read by both `robots.ts` and the `robots` metadata in `layout.tsx`.
- All crawlers are allowed, including AI bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended). The owner chose this on purpose.
- `public/llms.txt` is a plain-text summary for AI tools. It is hand-written, so update it when experience, projects, or certificates change in `content.ts`.
- `layout.tsx` has Person and WebSite JSON-LD. `knowsAbout` comes from `skillCategories` (soft skills excluded). `worksFor` is left out on purpose: the Next Group Financial Analyst role ended Aug 2026.
- Google Search Console is set up by the owner. Sitemap submitted; re-request indexing after big changes.

## Open items for the owner (cannot be done from code)
- Add https://chinsanaa.me to the LinkedIn "Website" field and the GitHub profile bio (backlinks help Google find and trust the domain).
- Update `FILES.cvUpdated` in `resources.ts` whenever a new CV PDF is uploaded.

## History
- 2026-09-16, PR #21: fixed the meta description (removed the "Click here" copy), added `llms.txt`, enriched Person JSON-LD.
- 2026-09-13, PR #19: skip link, reduced-motion fix for `SectionHeader`, `error.tsx`, security headers, Speed Insights, LazyMotion migration, image recompression, "Resume updated" label, fewer `"use client"` files.
- 2026-09-13, PR #18: Vercel Analytics, robots.txt, sitemap, canonical URL, Person JSON-LD.
- 2026-09-13, Google indexing issue: the homepage briefly served a 404 with `noindex` during a redeploy, which likely spoiled the first "Request Indexing". Fixed by merging PR #18 and re-requesting after confirming the live site was stable.
- 2026-09-13, PR #17: LinkedIn icon in the nav (the official LinkedIn badge embed was skipped because it clashes with the design), art images converted to WebP (~10MB down to ~195KB), certificates on `next/image`, Open Graph/Twitter metadata, app icons, web manifest.
