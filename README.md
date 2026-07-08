# Chinsanaa Chuluunbold — Portfolio

Personal portfolio site for Chinsanaa Chuluunbold, a Data Science student at NYU Shanghai
concentrating in Finance. A single-page, editorial-magazine-style showcase ("Monograph")
covering background, projects, experience, skills, and certificates.

**Live site:** deployed via Vercel on every push to `main`.

## Overview

The homepage (`src/app/page.tsx` → `Portfolio`) is composed of the following sections, rendered
top to bottom:

| Section | Component | Description |
| --- | --- | --- |
| Nav | `Nav.tsx` | Fixed hairline bar with numbered anchor links; hides on scroll-down, returns on scroll-up. |
| Hero | `sections/Hero.tsx` + `sections/HeroShapes.tsx` | Magazine-cover intro: masthead row, oversized name overlapping the art panel, scroll-parallaxed SVG glyphs, and a black marquee ticker. |
| About №01 | `sections/About.tsx` | Asymmetric editorial spread: sticky art aside with a rotated spine label, large-set bio, "by the numbers" stat rows with count-up animations. |
| Projects №02 | `sections/Projects.tsx` | Full-width alternating features with ghost numerals, titles riding over parallax art covers, tag chips, and GitHub links. |
| Experience №03 | `sections/Experience.tsx` | Timeline whose SVG rail draws itself as you scroll; accent node dots spring in per entry. |
| Skills №04 | `sections/Skills.tsx` | Typographic "spec sheet": four hairline-ruled columns of numbered skills. |
| Certificates №05 | `sections/Certificates.tsx` | Table-of-contents ledger; rows invert to black on hover and reveal a cursor-following grayscale certificate thumbnail. |
| Contact №06 | `sections/Contact.tsx` | Full-bleed black spread: oversized mailto, magnetic social buttons, the page's one solid accent block, marquee, and colophon footer. |

## Tech stack

- **[Next.js 16](https://nextjs.org/)** (App Router, Turbopack)
- **[React 19](https://react.dev/)**
- **TypeScript**
- **[framer-motion](https://motion.dev/)** — scroll-linked SVG drawing, parallax, staggered reveals, magnetic buttons, spring-following thumbnails
- **CSS** — hand-written, token-based (`src/styles/tokens.css` + `src/components/portfolio/editorial.css`); no CSS framework
- **Google Fonts** — [Archivo Black](https://fonts.google.com/specimen/Archivo+Black) (display), [Inter](https://fonts.google.com/specimen/Inter) (body), [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) (labels), via `next/font/google`
- **ESLint** + **TypeScript** for linting/type-checking

## Design system

See **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** — palette, typography, motion vocabulary,
primitive component APIs, and the recipe for adding new sections. Headline rules: flat colors
only (no gradients), monochrome ink-on-paper with a single orange-red accent at ~2% usage,
icons instead of emojis, and every color sourced from `src/styles/tokens.css`.

## Project structure

```
src/
  app/
    layout.tsx            # Fonts + global metadata
    page.tsx              # Renders <Portfolio />
    globals.css           # Reset, base type, marquee keyframes, reduced-motion kill-switch
  styles/
    tokens.css            # Design tokens — single source of truth for all values
  components/
    icons/index.tsx       # Hand-rolled inline SVG icon set
    ui/                   # Primitives: SectionHeader, Button, Reveal, Marquee,
                          # TagChip, ArtImage (+ SVG fallbacks), AnimatedCounter
    portfolio/
      Portfolio.tsx       # Composes Nav + all sections inside MotionConfig
      Nav.tsx
      content.ts          # Content: projects, certificates, skills, experience
      editorial.css       # All section styling (token-only)
      sections/           # Hero, HeroShapes, About, Projects, Experience,
                          # Skills, Certificates, Contact
  config/
    resources.ts          # External URLs, asset paths, generated-art manifest
public/
  Chinsanaa_Chuluunbold_CV.pdf
  images/certificates/    # Certificate photos
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

- **Projects, certificates, skills, experience:** edit `src/components/portfolio/content.ts`.
- **External links (email, GitHub, LinkedIn, project repos, certificate URLs), asset paths, and
  generated artwork:** edit `src/config/resources.ts` (set an `IMAGES.art.*` entry to a path
  under `public/images/art/` to replace its SVG fallback).
- **Copy in the Hero/About/Contact sections:** edit the respective component in
  `src/components/portfolio/sections/`.
- **Styling:** section styles live in `src/components/portfolio/editorial.css`; design tokens in
  `src/styles/tokens.css`; global resets in `src/app/globals.css`. Follow DESIGN_SYSTEM.md.
