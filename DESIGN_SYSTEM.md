# Monograph — Design System

The visual language of this portfolio: a monochrome editorial magazine style —
ink on paper, massive display type, one orange-red accent used sparingly.
Every future addition should be buildable from this document without inventing
new values.

## Hard rules

1. **No gradients.** Ever. Flat colors only — `linear-gradient`/`radial-gradient` must never appear in CSS, SVG, or generated imagery.
2. **Monochrome plus one accent.** The palette below is exhaustive; do not add hues. Accent lives on ~2% of any view.
3. **No emojis in the UI.** Use the icon set (`src/components/icons`) or typographic marks (numbers, rules, `*` and `+` glyphs).
4. **No raw hex outside `src/styles/tokens.css`.** Components reference tokens only.
5. **Animate `transform`, `opacity`, and SVG `pathLength` only.** Never layout properties or shadows. A static `filter: grayscale(1)` on photographs is allowed (B&W editorial treatment) but must never be animated or scroll-linked.

## Palette

| Token | Hex | Use for |
|---|---|---|
| `--color-paper` | `#F0EEE9` | Page background (cool newsprint off-white) |
| `--color-paper-2` | `#E4E2DB` | Raised surfaces: art frames, ghost numerals |
| `--color-ink` | `#141412` | Text, headings, hard borders, **inverse blocks** (Contact, cert-row hover, ink marquee) |
| `--color-ink-soft` | `#56544D` | Secondary/body text, mid-gray fills in artwork |
| `--color-accent` | `#F04E23` | The ONLY color. ~2% of any view: `+`/`*` glyphs, timeline dots, section numbers, hover underlines, selection, and the single solid block in Contact. Decoration and large type only (≈3.5:1 — never small body text) |
| `--color-line` | `#D3D0C7` | Hairline rules |

Contrast: ink/paper ≈ 15:1 both ways (AAA).

Drama comes from **black inverse moments** (ink background, paper text) — currently the Contact block, the hero marquee band, and certificate-row hover. Photographs render `grayscale(1)`.

## Typography

| Role | Font | Weights | Used for |
|---|---|---|---|
| Display | Archivo Black (`--font-display`) | 400 (its only weight — never synthesize bold) | Headlines, section titles, project/role names, stat values. Uppercase, `--leading-display` 0.85, slight negative tracking |
| Body | Inter (`--font-body`) | 400–600 | Paragraphs, descriptions, ledes (600) |
| Meta | IBM Plex Mono (`--font-mono`) | 400, 500 | Labels, dates, tags, section numbers, nav. Always via `.mono-label` (uppercase, +0.08em tracking, 0.75rem) |

Scale (tokens): `--text-display` `clamp(3rem, 11.5vw, 11.5rem)` · `--text-h2` `clamp(2.5rem, 7vw, 5.5rem)` · `--text-h3` `clamp(1.4rem, 2.5vw, 2rem)` · body `1.0625rem` · `--text-label` `0.75rem`.

Fonts load in `src/app/layout.tsx` via `next/font/google`.

**Type over image** is a signature move: the hero name overlaps the art panel and project titles ride over their covers via negative margins (`z-index` keeps type on top; reset the overlap below 860px).

## Shape & rules

- Radius is `--radius` (2px, near-square). The only pill is `.tag-chip` (`--radius-chip`).
- Hairlines everywhere: `--border-hair` (1px, `--color-line`) separates rows and columns; `--border-hard` (1.5px ink) tops section headers, ledgers, and frames images.
- Sections are numbered (№01–№06) via `SectionHeader` (number renders accent); ghost numerals in Projects use `--color-paper-2`; accent `++` marks index each project.

## Motion vocabulary

- One easing: `--ease-out-expo` (`cubic-bezier(0.16, 1, 0.3, 1)`). Durations: `--dur-fast` 200ms (hovers), `--dur-base` 600ms (reveals), `--dur-slow` 900ms (hero).
- Scroll reveals: `Reveal` / `RevealItem` (framer-motion `whileInView`, fires once, -10% margin).
- Scroll-linked: `useScroll` + `useTransform` (hero parallax + glyph drift, project cover drift, Experience rail `pathLength` draw). One `useScroll` per section.
- Pointer-driven: motion values + `useSpring`, never React state per-frame (magnetic `Button`, Certificates floating thumbnail).
- Marquees are pure CSS (`marquee-scroll` keyframes in `globals.css`).
- Reduced motion: root `<MotionConfig reducedMotion="user">` plus a global CSS kill-switch in `globals.css`. Anything pointer-cute (magnetic pull) checks `useReducedMotion()`.

## Primitives (`src/components/ui/`)

| Component | API | Notes |
|---|---|---|
| `SectionHeader` | `number, title, kicker?` | Hard rule + counting accent № + clip-revealed title |
| `Button` | `variant: "solid" \| "outline" \| "paper"`, `href?/onClick`, `download?`, `external?` | Magnetic hover. `solid` inverts to paper on hover; `paper` variant is for ink backgrounds |
| `Reveal` / `RevealItem` | `delay?`, `stagger?` | Wrap any block; use `stagger` + `RevealItem` for lists |
| `Marquee` | `tone: "paper" \| "ink"`, `duration?`, `reverse?` | Children render twice (second `aria-hidden`) |
| `TagChip` | `label` | Mono hairline pill |
| `ArtImage` | `src: string \| null`, `variant`, `alt`, `priority?` | Bordered frame with fixed aspect; `null` renders the flat SVG fallback for that variant (ink/gray shapes + one accent element) |
| `AnimatedCounter` | `value`, `decimals?`, `prefix?`, `suffix?` | Expo-out count-up on first view |

Icons: `src/components/icons/index.tsx` — 24px viewBox, `currentColor`, 1.5px stroke. Add new icons in the same style; never import an icon library.

## Adding a new section — recipe

1. Create `src/components/portfolio/sections/YourSection.tsx` (`"use client"`).
2. Structure: `<section className="section your-section" id="your-section">` → `<SectionHeader number="07" title="…" kicker="…" />` → content wrapped in `Reveal`/`RevealItem`.
3. Style in `editorial.css` under a new `/* ----- YourSection ----- */` block, tokens only. Ask "does this need accent?" — the answer is almost always no.
4. Compose it in `Portfolio.tsx` and add the anchor to `Nav.tsx` `LINKS`.
5. Verify: `npm run lint && npm run build`, then screenshot desktop + 390px mobile (watch for horizontal overflow — wrap wide/ghost/overlapping elements in `overflow: clip`).

## Generated imagery spec

Artwork lands in `public/images/art/` and is wired through `IMAGES.art` in `src/config/resources.ts` (`null` → SVG fallback, so the site never depends on it).

Prompt template — append to any subject description:

> flat color illustration, matte solid colors only, absolutely no gradients, monochrome palette: warm off-white #F0EEE9 background, near-black #141412, mid gray #56544D, one small orange-red #F04E23 accent element, minimal bauhaus-inspired geometric primitives, soft studio shadow only, clean negative space, black and white editorial magazine art, no text

Aspect ratios in use: hero 4:5, project covers 3:2, about 1:1. Reject any output containing gradients or more than one accent-colored element. Photographs (e.g. certificates) render through `filter: grayscale(1)`.
