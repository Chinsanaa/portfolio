# Sanaa Chuluunbold — Portfolio

Soft pixel-art portfolio site built with Next.js. Game-style title screen, retro desktop UI, and folder navigation for About, Projects, Skills, and Socials.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- Framer Motion

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Import this repository on [Vercel](https://vercel.com/new).
2. Use the default settings (framework: Next.js).
3. Deploy.

## Content

Edit data in `src/data/`:

- `projects.ts` — GitHub projects
- `skills.ts` — skills and interests
- `socials.ts` — social links

To enable the Work section later, add `"work"` to `ENABLED_SECTIONS` in `src/app/globals.ts`.
