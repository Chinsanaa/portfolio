# Chinsanaa Chuluunbold — Portfolio

Personal portfolio site for Chinsanaa Chuluunbold, a Data Science student at NYU Shanghai
concentrating in Finance. The site is a single-page, dark-themed showcase covering background,
projects, certifications, skills, and experience.

🔗 **Live site:** deployed via Vercel on every push to `main`.

## Overview

The homepage (`src/app/page.tsx` → `Portfolio`) is composed of the following sections, rendered
top to bottom:

| Section | Component | Description |
| --- | --- | --- |
| Hero | `Hero.tsx` + `HeroCanvas.tsx` | Full-viewport intro with name, tagline, "View Projects" / "Download CV" CTAs, a syntax-highlighted code snippet, and an interactive `<canvas>` particle trail that follows the cursor. |
| About | `About.tsx` | Bio plus quick facts (education, concentration, languages). |
| Projects | `Projects.tsx` | Card grid of projects with client-side tag filtering (All / Machine Learning / Finance / Data Analysis / Web Dev). |
| Certifications | `Certificates.tsx` | Cards linking out to verified certificates (Claude Code, Bloomberg, Google AI). |
| Skills | `Skills.tsx` | Grouped skill chips across Programming Languages, Tools & Platforms, Data & Finance, and Soft Skills. |
| Experience | `Experience.tsx` | Vertical timeline of roles and internships. |
| Contact | `Contact.tsx` | Email, LinkedIn, and GitHub links. |

All sections reveal on scroll using an `IntersectionObserver` (`useScrollReveal.ts`).

## Tech stack

- **[Next.js 16](https://nextjs.org/)** (App Router, Turbopack)
- **[React 19](https://react.dev/)**
- **TypeScript**
- **CSS** — hand-written, design-token-based stylesheet (`src/components/portfolio/portfolio.css`); no Tailwind utility classes are used on this page
- **Google Fonts** — [Fraunces](https://fonts.google.com/specimen/Fraunces) (headings) and [Inter](https://fonts.google.com/specimen/Inter) (body), loaded via `next/font/google`
- **Canvas API** — used directly (no animation library) for the hero particle effect
- **ESLint** + **TypeScript** for linting/type-checking

## Design system

The visual design was originally prototyped in [Claude Design](https://claude.ai/design) and
implemented pixel-for-pixel as React components. Key tokens:

- **Palette:** near-black background (`#0f1419` / `#0d1117`) with blue (`#3b82f6`) and purple
  (`#8b5cf6`) accents, used for gradients, borders, and hover states throughout.
- **Typography:** Fraunces (serif, 600–900 weight) for headings; Inter (300–700 weight) for body
  text and UI.
- **Motion:** scroll-reveal fade/slide-up on section content, hover lift/glow on cards, and a
  live particle trail in the hero.
- **Components:** pill-shaped filter tags, gradient-bordered project/certificate cards, skill
  chips, and a dotted timeline for experience entries — all defined as reusable CSS classes in
  `portfolio.css`.

## Project structure

```
src/
  app/
    layout.tsx          # Fonts + global metadata
    page.tsx             # Renders <Portfolio />
    globals.css           # Base reset, CSS variables, keyframes
  components/portfolio/
    Portfolio.tsx         # Composes all sections
    Hero.tsx               # Hero copy + CTAs
    HeroCanvas.tsx          # Particle trail canvas effect
    About.tsx
    Projects.tsx            # Filterable project grid
    Certificates.tsx
    Skills.tsx
    Experience.tsx
    Contact.tsx
    data.ts                  # Content: projects, certificates, skills, experience
    portfolio.css             # All section styling
    useScrollReveal.ts        # IntersectionObserver hook
  config/
    resources.ts               # Centralized external URLs and asset paths
public/
  Chinsanaa_Chuluunbold_CV.pdf
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

- **Projects, certificates, skills, experience:** edit `src/components/portfolio/data.ts`.
- **External links (email, GitHub, LinkedIn, project repos, certificate URLs) and the CV file
  path:** edit `src/config/resources.ts`.
- **Copy in the Hero/About/Contact sections:** edit the respective component directly.
- **Styling:** all section styles live in `src/components/portfolio/portfolio.css`; global
  resets and fonts are in `src/app/globals.css` and `src/app/layout.tsx`.
