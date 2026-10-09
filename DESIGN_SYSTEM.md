# Editorial ink: design system

Paper and ink. The page reads like a well-set finance journal, not a SaaS template: big confident type, hairline rules instead of cards, one accent, and one signature motion moment. Any future addition should be buildable from this document without inventing new values.

The rules below come from the installed design skills (`.claude/skills/frontend-design` from Anthropic, `.claude/skills/impeccable`, `.claude/skills/design-taste-frontend`, `.claude/skills/redesign-existing-projects`). Read them before changing the UI.

## Hard rules

1. **No AI tells.** None of these: section numbers (01/02), eyebrows or kickers above headings, floating corner labels, glow orbs, gradient text, glassmorphism, custom cursors, preloaders, scroll cues, progress bars, marquees, tilt cards, magnetic buttons, fake terminals.
2. **No cards as layout.** Separate content with hairline rules (`--hair`) and whitespace. Nested cards are never allowed.
3. **Flag colors in fixed roles.** Blue for interaction, red for the one primary action, gold for the route and Mongolian marks. Never decorate with them or put them in stripes.
4. **One radius.** `--radius` (6px) everywhere. No pills.
5. **No monospace.** Dates and indexes use Geist with `font-variant-numeric: tabular-nums`.
6. **No dashes in visible copy.** No em or en dashes; use commas, periods, "to", or parentheses.
7. **No raw hex outside `src/styles/tokens.css`** (the error page is the one exception, since it renders without the app styles).
8. **Real photos stay in full color, always visible.** No grayscale or hover-to-reveal.

## Themes

Light ("bone paper") is the designed default; dark follows the OS (`prefers-color-scheme`). A visitor can force either, or return to system, from ⌘K → Theme. `setTheme()` in `src/components/ui/theme.ts` sets `data-theme` on `<html>` and saves the choice; an inline script in `layout.tsx` applies it before first paint. `useTheme()` returns the resolved theme, so WebGL pieces (`RouteGlobe`) re-read tokens when it changes.

## Palette

| Token | Light | Dark | Use for |
|---|---|---|---|
| `--bg` | `#eceeed` | `#111317` | Page (cool paper / blue-black ink) |
| `--bg-2` | `#e1e4e3` | `#1a1d22` | Image mats, globe sphere |
| `--hover` | ink 5% | paper 6% | Hovered rows, palette selection |
| `--rule` | ink 14% | paper 13% | Hairlines |
| `--rule-strong` | ink 40% | paper 40% | Underlines, hovered borders |
| `--text` | `#17191c` | `#eceeed` | Headings, primary text (≈15:1) |
| `--text-soft` | `#43474d` | `#b0b3b5` | Body copy (≈8:1) |
| `--text-dim` | `#5a5f66` | `#8c9095` | Meta, captions (≥5:1) |
| `--accent` (flag blue) | `#0b5aa6` | `#6fb0ff` | Links, hover, focus, selection, active nav (≥6:1) |
| `--red` (flag red) | `#b81c2c` | `#ff6b73` | The primary button, project-title hover, open-row toggle, "Copied" (≥5.5:1) |
| `--gold` (Soyombo gold) | `#9a6c00` | `#f2c230` | Travel route, Ulzii, Soyombo. Graphics only on paper (≥3.6:1) |
| `--accent-ink` / `--red-ink` | `#f7f8fb` | `#111317` | Text on a blue or red fill |

Why not cream and terracotta: Anthropic's `frontend-design` skill lists a warm cream page with a terracotta accent as the most common AI-generated look, so the palette was moved off it on purpose.

Every text token clears WCAG AA on both `--bg` and `--bg-2`.

## Mongolian identity

Flag colors are **roles, not stripes** (table above). Cultural marks each have one job and fixed places; none of them may become a background, a repeated wallpaper, or an animation.

| Mark | What it is | Where it may appear |
|---|---|---|
| Ölzii knot (`Ulzii` icon) | Endless knot, luck and long life; hand-authored geometry | Favicon/app icons, nav wordmark, empty palette state, OG image |
| Alkhan khee (`KheeBand`) | Traditional hammer border in red, blue, red | Under the hero and above the colophon. Only there |
| Soyombo (`Soyombo` icon) | National emblem; paths from the public-domain flag SVG on Wikimedia Commons | Footer, 20px, gold. Only there |
| Mongol script (`HeroScript`) | The owner's name in Mongol bichig, vertical | Beside the hero portrait. Off until the owner supplies the spelling (`NAME_MONG`) |
| Cyrillic name | Чинсанаа Чулуунболд | Colophon |

## Type

| Role | Face | Token |
|---|---|---|
| Display (name, section titles, roles, project titles) | Archivo, bold neo-grotesque (variable weight, 700 to 900) | `--font-display` |
| Body and UI | Geist | `--font-body` |

Scale: `--text-hero` (max 6rem), `--text-h2`, `--text-h3`, `--text-lede`, `--text-body`, `--text-small`, `--text-meta`. Display tracking is `-0.025em` (never below `-0.04em`). Headings use `text-wrap: balance`, body uses `pretty`, and body measure stays under about 65ch. Sentence case everywhere.

## Layout

- Container `--container` (1200px) with `--gutter` side padding; sections are separated by a hairline aligned to the content column.
- `.section-split`: sticky title in a 4/12 left column, content in 8/12 (About, Skills, Experience). Projects, Certificates, and Contact run full width so the page doesn't repeat one layout.
- Breakpoints: 860px (split → stacked), 560px (rows → single column).

## Motion

One authored moment, everything else is feedback.

| Where | What | Why |
|---|---|---|
| Hero name | Each line rises out of a mask once; letters gain weight near the pointer (`ProximityText`, after React Bits "Variable Proximity") | The signature moment |
| Nav | Hides on scroll-down, returns on scroll-up | Gets out of the way |
| Projects | Rows expand inline (height + opacity); a cover preview follows the mouse over closed rows | Disclosure and a quick visual |
| Experience | The globe traces the route as you scroll | Tells the travel story |
| Copy email | "Copy" swaps to "Copied" | State change |
| Links and buttons | Color and underline transitions, 1px press | Feedback |

Easing is `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`). `MotionConfig reducedMotion="user"` turns transforms off; `ProximityText` and the project preview disable themselves; the globe falls back to the flat `RouteMap`.

## Components

| Component | Notes |
|---|---|
| `Button` | `solid` (one per view, ink fill that turns accent on hover) or `link` (underlined text) |
| `SectionHeader` | A plain `h2`. No numbers or kickers |
| `ProximityText` | Variable-weight letters; rAF loop writes styles directly, so React never re-renders |
| `CopyEmail` | Text swap with an `aria-live` announcement |
| `ArtImage` | Fixed-ratio image with a flat SVG fallback if a file is missing |
| `RouteGlobe` / `RouteMap` | Lazy-loaded three.js globe (behind `LazyMount`), flat SVG fallback |
| `CommandPalette` | ⌘K or `/`: sections, projects, actions, theme. No terminal |

## Hydration safety

Never branch rendered output on `useReducedMotion()`, `window`, or `matchMedia`. Render the server-safe state first and opt in from an effect or an event handler.
