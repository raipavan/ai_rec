# TalentPool365 — Landing Page

Single-page marketing site for TalentPool365, built to the brand handoff v1.0.

## Stack

React 19 + TypeScript, bundled with Vite.

- `src/App.tsx` — page composition
- `src/components/` — one component per page section
- `src/data/content.ts` — all page copy and structured content
- `src/lib/` — scroll reveals, counters, carousel and nav hooks
- `src/styles/global.css` — brand tokens, layout, motion and responsive rules
- `src/styles/showcase.css` — hero walkthrough, product showcase tabs, scroll-linked process rail
- `public/assets/` — logo lockups, favicons and product UI imagery

## Motion

Everything that moves on its own can be paused and stops under
`prefers-reduced-motion`.

- **Header** sits transparent on the hero and turns solid once the page scrolls.
- **Hero** rotates the role in the headline (`heroRoles`) and steps the stage
  rail under the dashboard through five stages (`heroStages`). Runs only while
  on screen; pauses on hover, focus or the pause button.
- **AI agents** (`Agents.tsx`) is a pinned, scroll-scrubbed canvas scene: a bot
  flies station to station and does each job (search, scan resumes, grade,
  interview, sign the offer) while five
  agents hand one requisition down the line and everyone not advanced sinks
  into the talent pool. Copy and figures live in `agents` in `content.ts`;
  the section height in `showcase.css` (`.agents`) sets how long the scroll is.
  Under reduced motion it becomes a plain five-item list.
- **Hero image** floats up and down (`shot-float` in `showcase.css`).
- **Solutions by industry** drifts left to right in a seamless loop
  (`useAutoDrift`; the track renders its cards three times). It pauses on
  hover and briefly after touch, wheel, keyboard or the arrows.
- **Case studies** (`CaseStudies.tsx`, `caseStudies` in `content.ts`) is a
  three-card grid: company, headline result, challenge, what changed, outcomes.
- **People-hired cards** (`hires` in `content.ts`) show avatar, name and role;
  employer and hiring story open on hover or focus, and stay open on touch
  screens.
- **Products** is an auto-advancing tab set (`useAutoRotate`, 6.5 s per tab)
  with a coded vignette per product in `ProductMock.tsx`. Choosing a tab hands
  control to the visitor.
- **How it works** fills a rail and lights each step as it passes the middle of
  the viewport (`useScrollProgress`).

Timings live at the top of `showcase.css` (`--journey-ms`, `--showcase-ms`) and
must match the intervals passed to `useAutoRotate` in `Hero.tsx` / `Products.tsx`.

- **Bot** (`lib/bot.ts`) is the canvas-drawn mascot, shaded to read as a 3D
  render (glossy white shell, glass visor,
  blue eyes, headphones, chest logo, short legs with glowing soles) with five roles (radar dish, scanner visor,
  examiner's cap and glasses, headset and microphone, tie). It
  is reused beside the demo call-to-action (`BotBuddy.tsx`), where it gives a
  thumbs-up and watches the pointer.
- **Smaller touches**: connected-points backdrop in the hero (`Network.tsx`),
  reading-progress line under the header, section headings that wipe in,
  cards that light up under the pointer, a sync pulse across the integration
  tiles, metric rules that draw across, and the interview screenshot swinging
  into place.

- **3D**: the hero dashboard leans toward the pointer with its floating cards
  shifting at a different depth; cards and product screens tilt under the
  pointer; product screens flip up when a tab changes; and `Orbit.tsx` draws
  the integrations circling a turning hub on three tilted rings (canvas with
  its own perspective projection, no 3D library).

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
`#FFFFFF` · `#F8FAFC`. Type: Plus Jakarta Sans (headings, regular with a bold italic accent), Inter (body),
DM Sans (CTAs).

## Headline accent

Wrap a phrase in asterisks in any `SectionHead` title (`"Do more *with less*"`)
or use `<em className="accent">`. It renders bold italic: Royal Violet on light
sections, Cyan on Deep Navy.

## Theme

The page sits on Deep Navy `#172554`, with light `#F8FAFC` bands in between.
Add `section--light` to a `<section>` to make it a light band (Products, How it
works, Case studies and About use it); the rules are the "Round 6" block at the
end of `showcase.css`. The dark token overrides are the "Round 3" block in
`showcase.css`; white product screens (`.mock`,
`.hero-chip`) keep the light tokens. Logo height is set there too
(`.site-header .brand-logo--light`).
