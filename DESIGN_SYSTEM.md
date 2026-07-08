# Midnight Studio — Design System

The visual language of this portfolio: a dark, premium, high-motion tech
aesthetic — near-black canvas, glassy cards, cursor spotlight glow, tilt-on-
hover, magnetic buttons, and two flat accent colors (violet for actions,
cyan for data). Every future addition should be buildable from this document
without inventing new values.

## Hard rules

1. **No gradients. Ever.** `linear-gradient`/`radial-gradient` must never appear in CSS, SVG, `style` props, or generated imagery — not on text, borders, buttons, backgrounds, or masks. "Glow" is a flat-color shape rendered soft via `filter: blur()` + opacity, never a gradient fill.
2. **Two flat accents, split roles.** `--violet` is for actions (CTAs, headline emphasis, links, primary interactive state). `--cyan` is for data (chart series, the route-map line/nodes). They sit side by side — never blended into each other.
3. **No emojis in the UI.** Use the icon set (`src/components/icons`) or typographic marks (numbers, mono labels, `*` glyphs).
4. **No raw hex outside `src/styles/tokens.css`.** Components reference tokens only.
5. **Animate `transform`, `opacity`, and SVG `pathLength` only.** Glow/shadow effects are static `filter: blur()` on a solid shape, or a `box-shadow`, and are never scroll-linked to a color change — only position/opacity.
6. **Certificate and other real photos always render in full color, always visible.** No `filter: grayscale()`, no hover-to-reveal — this was a real bug in a prior version and must not come back.

## Palette

| Token | Value | Use for |
|---|---|---|
| `--bg` | `#0B0B10` | Page canvas (near-black, faint blue cast) |
| `--bg-2` | `#12121A` | Raised sections: footer/contact |
| `--surface` | `rgba(255,255,255,0.035)` | Glass card fill |
| `--surface-2` | `rgba(255,255,255,0.06)` | Glass hover fill |
| `--border-glass` | `rgba(255,255,255,0.09)` | Card / hairline borders |
| `--text` | `#EDEDF2` | Primary text |
| `--text-soft` | `#9A9AA8` | Secondary text, body copy |
| `--text-dim` | `#6B6B78` | Meta, mono labels |
| `--violet` | `#7C5CFF` | Accent A (flat) — CTAs, headline emphasis, links, primary interactive states |
| `--violet-soft` | `rgba(124,92,255,0.16)` | Flat violet wash for chips/badges |
| `--cyan` | `#35E0C6` | Accent B (flat) — chart series, route-map line/nodes, data visuals |
| `--cyan-soft` | `rgba(53,224,198,0.16)` | Flat cyan wash |
| `--glow-violet` / `--glow-cyan` | translucent rgba | Blurred orb / spotlight / box-shadow glow color only |

Contrast: text/bg ≈ 14.8:1 (AAA), text-soft/bg ≈ 6.9:1 (AA), violet/bg ≈ 5.3:1 (large type & UI only — never small body text).

**Text always wears text tokens** (`--text`/`--text-soft`/`--text-dim`), never the accent color, except for a deliberate emphasis word/link (hero name second line, contact email) — accent-colored body text is the exception, not the rule.

## Typography

| Role | Font | Weights | Used for |
|---|---|---|---|
| Display | Sora (`--font-display`) | 600–800 | Headlines, section titles, project/role names, stat values |
| Body | Inter (`--font-body`) | 400–600 | Paragraphs, descriptions, ledes (600) |
| Meta | IBM Plex Mono (`--font-mono`) | 400, 500 | Labels, dates, tags, section numbers, nav. Always via `.mono-label` (uppercase, +0.09em tracking, 0.75rem, `--text-dim`) |

Scale (tokens): `--text-display` `clamp(2.75rem, 7.5vw, 6.5rem)` · `--text-h2` `clamp(2rem, 4.5vw, 3.5rem)` · `--text-h3` `clamp(1.25rem, 2.2vw, 1.75rem)` · body `1.0625rem` · `--text-label` `0.75rem`.

Fonts load in `src/app/layout.tsx` via `next/font/google`.

## Shape & glass

- Cards use `--radius-card` (18px) and are **glass**: `background: var(--surface)`, `border: var(--border-hair)`, `backdrop-filter: blur(14px)` (see `.tilt-card` in `editorial.css`). Hover raises to `--surface-2` with a violet border + soft box-shadow glow.
- The only pill shape is `.tag-chip` / nav links (`--radius-chip`, 999px).
- Glow is always a flat-color circle rendered soft via `filter: blur()`, positioned absolutely behind or within content, never a CSS gradient.

## Motion vocabulary

- One easing: `--ease-out-expo` (`cubic-bezier(0.16, 1, 0.3, 1)`). Durations: `--dur-fast` 200ms (hovers), `--dur-base` 600ms (reveals), `--dur-slow` 900ms (hero).
- **Spotlight** (`Spotlight.tsx`): a blurred violet glow that follows the cursor via motion values + `useSpring`. Always rendered in the DOM (never conditionally omitted) so reduced-motion never causes a hydration mismatch — only the pointer-tracking behavior is gated by `useReducedMotion()`.
- **Tilt** (`TiltCard.tsx`): subtle pointer-driven 3D `rotateX`/`rotateY` on glass cards, spring-eased. The `style` object is always the same shape (values just stay at 0deg under reduced motion) — never toggle `style`/children presence based on `useReducedMotion()`, for the same hydration-safety reason as Spotlight.
- Scroll reveals: `Reveal` / `RevealItem` (framer-motion `whileInView`, fires once, -10% margin).
- Scroll-linked: `useScroll` + `useTransform`/`useSpring` (hero content drift, Experience rail + `RouteMap` `pathLength` draw, `GlowField` orb drift, `SkillChart` bar draw-in).
- Pointer-driven: motion values + `useSpring`, never React state per-frame (magnetic `Button`, `TiltCard`, `Spotlight`).
- Marquees are pure CSS (`marquee-scroll` keyframes in `globals.css`).
- Reduced motion: root `<MotionConfig reducedMotion="user">` plus a global CSS kill-switch in `globals.css`. Any component using `useReducedMotion()` must gate *behavior* (pointer tracking, transform ranges), never DOM structure or the shape of a `style`/attribute — see the hydration-safety note above.

## Primitives (`src/components/ui/`)

| Component | API | Notes |
|---|---|---|
| `SectionHeader` | `number, title, kicker?` | Mono kicker + counting violet № + clip-revealed title, no hard rule underneath |
| `Button` | `variant: "solid" \| "ghost" \| "subtle"`, `href?/onClick`, `download?`, `external?` | Magnetic hover. `solid` = flat violet fill + soft glow on hover; `ghost` = glass border; `subtle` = text-only underline |
| `Reveal` / `RevealItem` | `delay?`, `stagger?` | Wrap any block; use `stagger` + `RevealItem` for lists/grids |
| `Marquee` | `tone: "glass" \| "solid"`, `duration?`, `reverse?` | Children render twice (second `aria-hidden`) |
| `TagChip` | `label` | Mono glass hairline pill |
| `ArtImage` | `src: string \| null`, `variant`, `alt`, `priority?` | Bordered frame with fixed aspect; `null` renders the flat SVG fallback (dark surface + one blurred violet/cyan glow + flat geometric shapes) |
| `AnimatedCounter` | `value`, `decimals?`, `prefix?`, `suffix?` | Expo-out count-up on first view |
| `Spotlight` | `children`, `className?` | Cursor-following blurred violet glow inside its container |
| `TiltCard` | `children`, `className?`, `as?: "div" \| "article"` | Glass card, pointer 3D tilt, violet border+glow on hover |
| `SkillChart` | *(reads `skillCategories` from `content.ts`)* | Hand-rolled animated bar chart, flat cyan series, one metric — no legend needed (see `dataviz` skill before changing) |
| `RouteMap` | `cities: string[]` | Stylized (non-geographic) journey diagram; SVG line draws via `pathLength` on scroll, cyan nodes spring in |
| `GlowField` | *(no props)* | Fixed decorative background: flat-dot pattern (SVG data-URI, not a gradient) + two blurred violet/cyan orbs that drift on scroll |

Icons: `src/components/icons/index.tsx` — 24px viewBox, `currentColor`, 1.5px stroke. Add new icons in the same style; never import an icon library.

## Adding a new section — recipe

1. Create `src/components/portfolio/sections/YourSection.tsx` (`"use client"`).
2. Structure: `<section className="section your-section" id="your-section">` → `<SectionHeader number="07" title="…" kicker="…" />` → content wrapped in `Reveal`/`RevealItem`, using `TiltCard` for any card-shaped content.
3. Style in `editorial.css` under a new `/* ----- YourSection ----- */` block, tokens only, no gradients. Ask "does this need an accent?" — violet for an action, cyan only if it's genuinely data.
4. Compose it in `Portfolio.tsx` and add the anchor to `Nav.tsx` `LINKS`.
5. Verify: `npm run lint && npm run build`, then a fresh production server (`npm run start`, killing any prior instance first — a stale server serving an old `.next` build is the most common false-positive source) and screenshot desktop + 390px mobile + a reduced-motion pass (watch for horizontal overflow and hydration console errors).

## Generated imagery spec

Artwork lands in `public/images/art/` and is wired through `IMAGES.art` in `src/config/resources.ts` (`null` → SVG fallback, so the site never depends on it).

Prompt template — append to any subject description:

> flat color illustration, matte solid colors only, absolutely no gradients, dark palette: near-black #0B0B10 background, one soft blurred violet #7C5CFF or cyan #35E0C6 glow accent, muted glass-gray geometric primitives, minimal bauhaus-inspired shapes, clean negative space, premium dark UI editorial art, no text

Aspect ratios in use: hero 4:5, project covers 3:2, about 1:1. Reject any output containing gradients or more than one accent-colored element. Real photographs (certificates) always render in full color — never desaturated or gated behind hover.
