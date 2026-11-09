# TalentPool365 — Landing Page

Single-page marketing site for TalentPool365, built to the brand handoff v1.0.

## Stack

React 19 + TypeScript, bundled with Vite.

- `src/App.tsx` — page composition
- `src/components/` — one component per page section
- `src/data/content.ts` — all page copy and structured content
- `src/lib/` — scroll reveals, counters, carousel and nav hooks
- `src/styles/global.css` — brand tokens, layout, motion and responsive rules
- `public/assets/` — logo lockups, favicons and product UI imagery

## Local development

```bash
npm install
npm run dev
```

Then open http://127.0.0.1:5173

## Build

```bash
npm run build
```

Outputs the static site to `dist/`. `npm run preview` serves the build locally.

## Deploy (Render)

`render.yaml` defines a free static site that runs `npm ci && npm run build` and
publishes `dist/`. Connect this repo to Render and apply the Blueprint.

Brand tokens: `#172554` Deep Navy · `#4F46E5` Royal Violet · `#06B6D4` Cyan ·
`#FFFFFF` · `#F8FAFC`. Type: Plus Jakarta Sans (headings), Inter (body),
DM Sans (CTAs).
