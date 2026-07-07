# Cobalt Press — Design System

The visual language of this portfolio: a flat-color editorial magazine style.
Every future addition should be buildable from this document without inventing
new values.

## Hard rules

1. **No gradients.** Ever. Flat colors only — `linear-gradient`/`radial-gradient` must never appear in CSS, SVG, or generated imagery.
2. **No purple.** The palette below is exhaustive; do not add hues.
3. **No emojis in the UI.** Use the icon set (`src/components/icons`) or typographic marks (numbers, rules, asterisks).
4. **No raw hex outside `src/styles/tokens.css`.** Components reference tokens only.
5. **Animate `transform`, `opacity`, and SVG `pathLength` only.** Never layout properties, filters, or shadows.

## Palette

| Token | Hex | Use for |
|---|---|---|
| `--color-paper` | `#F4EFE2` | Page background |
| `--color-paper-2` | `#ECE5D2` | Raised surfaces: art frames, ghost numerals |
| `--color-ink` | `#181611` | Text, headings, hard borders |
| `--color-ink-soft` | `#4E4A3E` | Secondary/body text |
| `--color-cobalt` | `#1C3AEE` | Brand blue: links, buttons, accents, the inverse Contact block |
| `--color-cobalt-deep` | `#0F1F96` | Hover/pressed states on cobalt |
| `--color-persimmon` | `#E8542F` | The one warm accent. ~5% of any view: marquee stars, timeline dots, underlines. Decoration and large type only (3.8:1 contrast — never small body text) |
| `--color-line` | `#C9C0A6` | Hairline rules |

Contrast: ink/paper ≈ 13:1, cobalt/paper and paper/cobalt ≈ 6.5:1 (AA at all sizes).

One full-bleed cobalt "inverse moment" per page (currently Contact). Don't add more — its impact comes from being singular.

## Typography

| Role | Font | Weights | Used for |
|---|---|---|---|
| Display | Space Grotesk (`--font-display`) | 500, 700 | Headlines, section titles, project/role names, stat values. Uppercase for titles |
| Body | Inter (`--font-body`) | 400–600 | Paragraphs, descriptions |
| Meta | IBM Plex Mono (`--font-mono`) | 400, 500 | Labels, dates, tags, section numbers, nav. Always via `.mono-label` (uppercase, +0.08em tracking, 0.75rem) |

Scale (tokens): `--text-display` `clamp(2.75rem, 9.5vw, 9rem)` · `--text-h2` `clamp(2.25rem, 6vw, 4.5rem)` · `--text-h3` `clamp(1.4rem, 2.5vw, 2rem)` · body `1.0625rem` · `--text-label` `0.75rem`.

Fonts load in `src/app/layout.tsx` via `next/font/google`.

## Shape & rules

- Radius is `--radius` (2px, near-square). The only pill is `.tag-chip` (`--radius-chip`).
- Hairlines everywhere: `--border-hair` (1px, `--color-line`) separates rows and columns; `--border-hard` (1.5px ink) tops section headers, ledgers, and frames images.
- Sections are numbered (№01–№06) via `SectionHeader`; the ghost numerals in Projects use `--color-paper-2`.

## Motion vocabulary

- One easing: `--ease-out-expo` (`cubic-bezier(0.16, 1, 0.3, 1)`). Durations: `--dur-fast` 200ms (hovers), `--dur-base` 600ms (reveals), `--dur-slow` 900ms (hero).
- Scroll reveals: `Reveal` / `RevealItem` (framer-motion `whileInView`, fires once, -10% margin).
- Scroll-linked: `useScroll` + `useTransform` (hero parallax + shape drift, project cover drift, Experience rail `pathLength` draw). One `useScroll` per section.
- Pointer-driven: motion values + `useSpring`, never React state per-frame (magnetic `Button`, Certificates floating thumbnail).
- Marquees are pure CSS (`marquee-scroll` keyframes in `globals.css`).
- Reduced motion: root `<MotionConfig reducedMotion="user">` plus a global CSS kill-switch in `globals.css`. Anything pointer-cute (magnetic pull) checks `useReducedMotion()`.

## Primitives (`src/components/ui/`)

| Component | API | Notes |
|---|---|---|
| `SectionHeader` | `number, title, kicker?` | Hard rule + counting № + clip-revealed title |
| `Button` | `variant: "solid" \| "outline" \| "paper"`, `href?/onClick`, `download?`, `external?` | Magnetic hover. `paper` variant is for cobalt/ink backgrounds |
| `Reveal` / `RevealItem` | `delay?`, `stagger?` | Wrap any block; use `stagger` + `RevealItem` for lists |
| `Marquee` | `tone: "paper" \| "cobalt"`, `duration?`, `reverse?` | Children render twice (second `aria-hidden`) |
| `TagChip` | `label` | Mono hairline pill |
| `ArtImage` | `src: string \| null`, `variant`, `alt`, `priority?` | Bordered frame with fixed aspect; `null` renders the flat SVG fallback for that variant |
| `AnimatedCounter` | `value`, `decimals?`, `prefix?`, `suffix?` | Expo-out count-up on first view |

Icons: `src/components/icons/index.tsx` — 24px viewBox, `currentColor`, 1.5px stroke. Add new icons in the same style; never import an icon library.

## Adding a new section — recipe

1. Create `src/components/portfolio/sections/YourSection.tsx` (`"use client"`).
2. Structure: `<section className="section your-section" id="your-section">` → `<SectionHeader number="07" title="…" kicker="…" />` → content wrapped in `Reveal`/`RevealItem`.
3. Style in `editorial.css` under a new `/* ----- YourSection ----- */` block, tokens only.
4. Compose it in `Portfolio.tsx` and add the anchor to `Nav.tsx` `LINKS`.
5. Verify: `npm run lint && npm run build`, then screenshot desktop + 390px mobile (watch for horizontal overflow — wrap wide/ghost elements in `overflow: clip`).

## Generated imagery spec

Artwork is generated (Higgsfield `nano_banana_pro`), lands in `public/images/art/`, and is wired through `IMAGES.art` in `src/config/resources.ts` (`null` → SVG fallback, so the site never depends on it).

Prompt template — append to any subject description:

> flat color illustration, matte solid colors only, absolutely no gradients, no purple, palette: cream #F4EFE2 background, cobalt blue #1C3AEE, warm off-black #181611, persimmon orange #E8542F, minimal bauhaus-inspired geometric 3D primitives, soft studio shadow only, clean negative space, editorial magazine cover art, no text

Aspect ratios in use: hero 4:5, project covers 3:2, about 1:1. Reject any output containing gradients or purple.
