# Project context

Running log of decisions and state for this portfolio, so future sessions can pick up where the last one stopped. Newest entries go at the top.

## Live site
- Domain: https://chinsanaa.me (Vercel project `portfolio`, team `chinsanaa`)
- `NEXT_PUBLIC_SITE_URL` is set to `https://chinsanaa.me` in Vercel; `src/config/resources.ts` falls back to the same value.
- Vercel Deployment Protection (SSO) is on for everything except custom domains, so `*.vercel.app` preview URLs redirect to a Vercel login. That is expected.

## Stack and conventions
- Next.js 16 (App Router, Turbopack), React 19, TypeScript, framer-motion, Tailwind v4 (utilities only, no preflight), Lenis (own RAF loop), three.js via @react-three/fiber, cmdk. No GSAP or anime.js (Motion covers it; don't mix engines).
- Design system "Editorial ink" (Oct 2026): cool paper by default, dark follows the OS, theme override in ⌘K. One sky-blue accent (nod to the Mongolian flag). Fonts: Bricolage Grotesque (display), Geist (body); no monospace. Tokens in `src/styles/tokens.css`; rules in `DESIGN_SYSTEM.md`.
- Design skills are installed in `.claude/skills/` (Anthropic frontend-design, impeccable, design-taste-frontend, redesign-existing-projects, find-skills; pinned in `skills-lock.json`). Read them before UI work. Banned "AI tells": section numbers, eyebrows/kickers, cards as layout, glows/orbs, gradient text, custom cursor, preloader, marquee, fake terminal, em/en dashes in visible copy.
- The impeccable launcher script can download a binary from its GitHub releases; it has not been run here. ESLint ignores `.claude/**`.
- Heavy pieces are lazy-loaded with `next/dynamic` (`ssr: false`): the globe and the palette dialog. Keep it that way.
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
- Update `FILES.cvUpdated` in `resources.ts` whenever a new CV PDF is uploaded.

## History
- 2026-10-09, redesign v2 "Editorial ink": critiqued the site against impeccable + taste-skill and cut every AI tell (preloader, cursor, glow orbs, dot grid, spotlight, marquee, scramble text, scroll-lit words, tilt cards, magnetic buttons, progress bar, back-to-top, section numbers, kickers, sun/moon toggle, terminal). New: cool paper/ink palette with a sky-blue accent (moved off cream + terracotta, which Anthropic's frontend-design skill flags as the #1 AI look) and system dark mode, Bricolage/Geist type, split hero with portrait and pointer-proximity name, ruled About/Skills, expandable project index with hover preview, dated Experience list (globe kept), mat-framed certificates, big-email Contact. Skills content: Soft Skills and VS Code dropped; Next.js and SwiftUI added under Web (both used in real projects). Dates now "May to Aug 2026" style. Owner should confirm the hero line and the "looking for internships in data and finance" contact line.
- 2026-10-09: removed the Lab section (Financing classifier demo) at the owner's request; it didn't fit the portfolio. Deleted its components and data, the nav/palette entries, the "Try the live demo" link, and the llms.txt link; renumbered Experience 04, Certificates 05, Contact 06. Recover from git history (PR #24/#26) if ever wanted again.
- 2026-09-27, Lab presets: replaced "Uber" (not in mainland China, and it misread as Shopping) with 大众点评; "静安寺 station" → "静安寺站". Model now needs stronger evidence (STRONG_MATCH 0.7) and anything under 60% shows "Needs review" with a best guess, so junk input never looks like a confident answer. Pick future presets from real China merchants and test them first.
- 2026-09-27, text polish: About grammar, correct About photo alt text, "PostgreSQL" typo, highlight wording, consistent month abbreviations, llms.txt gains the Entrepreneur Club role and the Lab demo link. "554+ merchant rules" is correct (554 global seeds in Financing) and stays.
- 2026-09-26, interactive redesign (one PR): preloader, custom cursor, scroll progress + back-to-top, Lenis smooth scroll, hero letter reveal + scrambling tagline + interactive dot grid, About scroll-lit words, Skills bento, Projects stacking cards, new Lab section (live Financing categorizer), 3D route globe in Experience, Certificates fan-out, copy-email button, ⌘K palette + terminal, light theme toggle. Also fixed a pre-existing reduced-motion hydration mismatch in `SectionHeader`.
- 2026-09-26: Owner added https://chinsanaa.me to the LinkedIn "Website" field and GitHub bio (backlinks for search discovery).
- 2026-09-26, PR #22: added this context.md.
- 2026-09-16, PR #21: fixed the meta description (removed the "Click here" copy), added `llms.txt`, enriched Person JSON-LD.
- 2026-09-13, PR #19: skip link, reduced-motion fix for `SectionHeader`, `error.tsx`, security headers, Speed Insights, LazyMotion migration, image recompression, "Resume updated" label, fewer `"use client"` files.
- 2026-09-13, PR #18: Vercel Analytics, robots.txt, sitemap, canonical URL, Person JSON-LD.
- 2026-09-13, Google indexing issue: the homepage briefly served a 404 with `noindex` during a redeploy, which likely spoiled the first "Request Indexing". Fixed by merging PR #18 and re-requesting after confirming the live site was stable.
- 2026-09-13, PR #17: LinkedIn icon in the nav (the official LinkedIn badge embed was skipped because it clashes with the design), art images converted to WebP (~10MB down to ~195KB), certificates on `next/image`, Open Graph/Twitter metadata, app icons, web manifest.
