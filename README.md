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
| Hero | `sections/Hero.tsx` | Dark canvas with a cursor-following spotlight glow and a drifting glow-orb background, an oversized name, magnetic CTA buttons, and a small glass stat bento with count-ups. |
| About №01 | `sections/About.tsx` | Bento grid of glass tilt-cards: bio, an animated skills chart, a "by the numbers" stat card, and portrait art. |
| Projects №02 | `sections/Projects.tsx` | Glass tilt-cards per project — cover art, title, impact, tag chips, GitHub link — that tilt in 3D toward the cursor. |
| Experience №03 | `sections/Experience.tsx` | Dark timeline whose SVG rail draws itself as you scroll, with a glowing node per role, plus an animated route-map diagram of the cities visited on the business-trip role. |
| Skills №04 | `sections/Skills.tsx` | Typographic "spec sheet": four hairline-ruled columns of numbered skills. |
| Certificates №05 | `sections/Certificates.tsx` | Grid of glass cards with full-color, always-visible certificate photos — title, issuer, date, link out. |
| Contact №06 | `sections/Contact.tsx` | Glass CTA block with a soft violet glow, oversized mailto with an underline draw, magnetic social buttons, marquee, and colophon footer. |

## Tech stack

- **[Next.js 16](https://nextjs.org/)** (App Router, Turbopack)
- **[React 19](https://react.dev/)**
- **TypeScript**
- **[framer-motion](https://motion.dev/)** — cursor spotlight glow, pointer 3D tilt, scroll-linked SVG drawing (timeline + route map + skill chart), parallax, staggered reveals, magnetic buttons
- **CSS** — hand-written, token-based (`src/styles/tokens.css` + `src/components/portfolio/editorial.css`); no CSS framework
- **Google Fonts** — [Sora](https://fonts.google.com/specimen/Sora) (display), [Inter](https://fonts.google.com/specimen/Inter) (body), [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) (labels), via `next/font/google`
- **ESLint** + **TypeScript** for linting/type-checking

## Design system

See **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** — palette, typography, motion vocabulary,
primitive component APIs, and the recipe for adding new sections. Headline rules: **no
gradients, ever** — glow effects are flat solid colors rendered soft via `filter: blur()` — a
dark canvas with two flat accents split by role (violet for actions, cyan for data), and every
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
                          # ArtImage (+ SVG fallbacks), AnimatedCounter, Spotlight, TiltCard,
                          # SkillChart, RouteMap, GlowField
    portfolio/
      Portfolio.tsx       # Composes Nav + all sections inside MotionConfig
      Nav.tsx
      content.ts          # Content: projects, certificates, skills, experience, travelCities
      editorial.css       # All section styling (token-only, no gradients)
      sections/           # Hero, About, Projects, Experience, Skills, Certificates, Contact
  config/
    resources.ts          # External URLs, asset paths, generated-art manifest
public/
  Chinsanaa_Chuluunbold_CV.pdf
  images/certificates/    # Certificate photos (rendered full color, always visible)
  images/art/             # Generated editorial artwork (optional; SVG fallbacks otherwise)
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

- **Projects, certificates, skills, experience, travel cities:** edit
  `src/components/portfolio/content.ts`.
- **External links (email, GitHub, LinkedIn, project repos, certificate URLs), asset paths, and
  generated artwork:** edit `src/config/resources.ts` (set an `IMAGES.art.*` entry to a path
  under `public/images/art/` to replace its SVG fallback).
- **Copy in the Hero/About/Contact sections:** edit the respective component in
  `src/components/portfolio/sections/`.
- **Styling:** section styles live in `src/components/portfolio/editorial.css`; design tokens in
  `src/styles/tokens.css`; global resets in `src/app/globals.css`. Follow DESIGN_SYSTEM.md — no
  gradients, ever.
