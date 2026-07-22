# Chinsanaa Chuluunbold — Portfolio

Personal portfolio site for Chinsanaa Chuluunbold, a Data Science student at NYU Shanghai
concentrating in Finance. A single-page, dark, high-motion showcase ("Midnight Studio")
covering background, projects, experience, skills, and certificates.

**Live site:** deployed via Vercel on every push to `main`.

## Overview

The homepage (`src/app/page.tsx` → `Portfolio`) is composed of the following sections, rendered
top to bottom:

| Section | Component | Description |
| --- | --- | --- |
| Nav | `Nav.tsx` | Floating glass pill nav; hides on scroll-down, returns on scroll-up. |
| Hero | `sections/Hero.tsx` | Dark canvas with a cursor-following spotlight glow and a drifting glow-orb background, an oversized name, and magnetic CTA buttons. |
| About №01 | `sections/About.tsx` | 3-card bento of glass tilt-cards: a tall portrait art card spanning both rows on the left, bio and a "why hire me" achievement-highlight list stacked as wide cards on the right. |
| Skills №02 | `sections/Skills.tsx` | Typographic "spec sheet": four hairline-ruled columns of numbered skills. |
| Projects №03 | `sections/Projects.tsx` | Glass tilt-cards per project — cover art, title, impact, tag chips, GitHub link — that tilt in 3D toward the cursor. |
| Experience №04 | `sections/Experience.tsx` | Dark timeline whose rail draws itself as you scroll, with a glowing node per role, plus an animated route-map diagram of the cities visited on the business-trip role. |
| Certificates №05 | `sections/Certificates.tsx` | Grid of glass cards with full-color, always-visible certificate photos — title, issuer, date, link out. |
| Contact №06 | `sections/Contact.tsx` | Glass CTA block with a soft terracotta glow, an oversized mailto paired tightly under the headline, magnetic social buttons, marquee, and colophon footer. |

## Tech stack

- **[Next.js 16](https://nextjs.org/)** (App Router, Turbopack)
- **[React 19](https://react.dev/)**
- **TypeScript**
- **[framer-motion](https://motion.dev/)** — cursor spotlight glow, pointer 3D tilt, scroll-linked drawing (timeline rail + route map), parallax, staggered reveals, magnetic buttons
- **CSS** — hand-written, token-based (`src/styles/tokens.css` + `src/components/portfolio/editorial.css`); no CSS framework
- **Google Fonts** — [Montserrat](https://fonts.google.com/specimen/Montserrat) (display), [Inter](https://fonts.google.com/specimen/Inter) (body), [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) (labels), via `next/font/google`
- **ESLint** + **TypeScript** for linting/type-checking

## Design system

See **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** — palette, typography, motion vocabulary,
primitive component APIs, and the recipe for adding new sections. Headline rules: **no
gradients, ever** — glow effects are flat solid colors rendered soft via `filter: blur()` — a
dark canvas with two flat accents split by role (terracotta for actions, amber for data), and every
color sourced from `src/styles/tokens.css`.

## Project structure

```
src/
  app/
    layout.tsx            # Fonts + global metadata
    page.tsx              # Renders <Portfolio />
    globals.css           # Reset, dark base, marquee keyframes, reduced-motion kill-switch
  styles/
    tokens.css            # Design tokens — single source of truth for all values
  components/
    icons/index.tsx       # Hand-rolled inline SVG icon set
    ui/                   # Primitives: SectionHeader, Button, Reveal, Marquee, TagChip,
                          # ArtImage (+ SVG fallbacks), Spotlight, TiltCard, RouteMap, GlowField
    portfolio/
      Portfolio.tsx       # Composes Nav + all sections inside MotionConfig
      Nav.tsx
      content.ts          # Content: projects, certificates, skills, highlights,
                          # experience, travelCities
      editorial.css       # All section styling (token-only, no gradients)
      sections/           # Hero, About, Skills, Projects, Experience, Certificates, Contact
  config/
    resources.ts          # External URLs, asset paths, editorial-art manifest
public/
  Chinsanaa_Chuluunbold_CV.pdf
  images/certificates/    # Certificate photos (rendered full color, always visible)
  images/art/             # Placeholder paths for editorial artwork — see below
```

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Deploy on Vercel

1. Import this repository on [Vercel](https://vercel.com/new).
2. Use the default settings (framework: Next.js).
3. Deploy.

## Editing content

- **Projects, certificates, skills, highlights, experience, travel cities:** edit
  `src/components/portfolio/content.ts`.
- **External links (email, GitHub, LinkedIn, project repos, certificate URLs) and asset paths:**
  edit `src/config/resources.ts`.
- **Editorial artwork (Earnio, ICDS Chat, Financing, About):** `resources.ts` already points
  `IMAGES.art.{earnio,chat,financing,about}` at `public/images/art/{name}.png` — just drop a file
  with the matching name into that folder and it appears automatically, no code changes needed.
  `ArtImage` renders its flat SVG fallback until a matching file exists (a missing/placeholder
  path fails gracefully rather than showing a broken image).
- **Copy in the Hero/About/Contact sections:** edit the respective component in
  `src/components/portfolio/sections/`.
- **Styling:** section styles live in `src/components/portfolio/editorial.css`; design tokens in
  `src/styles/tokens.css`; global resets in `src/app/globals.css`. Follow DESIGN_SYSTEM.md — no
  gradients, ever.
