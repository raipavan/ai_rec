# TalentPool365 — Website

Marketing site for TalentPool365, built to the brand handoff v1.0: the landing
page plus the header pages from the sitemap.

## Pages

| Header item | Path | Source |
|---|---|---|
| Home | `/` | `src/pages/Home.tsx` |
| Products | `/products` (platform overview) | `src/pages/ProductsOverview.tsx` |
| | `/products/talent-sourcing`, `candidate-screening`, `ai-assessments`, `ai-interviews`, `recruiter-workspace`, `candidate-engagement`, `hiring-offer-management`, `analytics-reporting`, `compliance-security` | `src/pages/ProductPage.tsx`, content in `content/products/*.json` |
| Solutions | `/solutions` (`#by-industry`, `#by-company-size`, `#by-use-case`) | `src/pages/SolutionsPage.tsx`, `content/solutions.json` |
| Pricing | `/pricing` (`#compare-plans`, `#custom-quote`) | `src/pages/PricingPage.tsx` |
| About Us | `/company/about`, `leadership`, `careers`, `partners`, `technology`, `news`, `contact` | `src/pages/CompanyPages.tsx`, `content/company/*.json` |

Integrations is deliberately not in the header: the footer links to the
integrations section of the home page (`/#integrations`). Customers, Resources,
Support and Legal from the sitemap are footer-only and not built yet.

Each product capability from the sitemap has its own anchor, for example
`/products/talent-sourcing#resume-database-search`.

### Routing

`src/lib/router.ts` is a small History API router with no dependency.
`src/routes.tsx` maps each path to a page, its tab title and its meta
description. Pages use plain `<a href="/pricing">` links; `App.tsx` intercepts
internal links so they change page without a reload. To add a page, add an
entry to `routes` and link to it.

Because routes are real paths, the host must serve `index.html` for unknown
paths. `render.yaml` has that rewrite; `npm run dev` and `npm run preview` do it
out of the box.

## Content manager

The site has a content management system: [Decap CMS](https://decapcms.org), a
React admin app that runs at `/admin/` and saves straight to this repository.
There is no database and no extra server for the site itself.

**How it works.** All editable copy is JSON under `content/`. The files in
`src/data/` only give that JSON its types. An editor signs in at `/admin/`,
changes a field and presses Publish; Decap commits the JSON file to GitHub,
the host rebuilds the site, and the change is live a couple of minutes later.
Every change is a commit, so history and rollback come from git.

| In the content manager | File | Covers |
|---|---|---|
| Pages → Home page | `content/home.json` | hero words, logos, agents, product tabs, industries, steps, metrics, integrations, case studies, timeline, people hired, FAQs |
| Pages → Solutions page | `content/solutions.json` | industries, company sizes, use cases |
| Pages → Pricing page | `content/pricing.json` | plans, comparison table, billing questions |
| Product pages | `content/products/*.json` | one entry per product; a new entry becomes a new page at `/products/<slug>` |
| Company pages | `content/company/*.json` | leadership, careers (open roles), partners, technology, news, contact |
| Site settings → Navigation and footer | `content/navigation.json` | header menus, footer columns and links |

Uploaded images go to `public/assets/uploads/`. Section headings, the home
hero paragraph, the About story and form labels are still in the components
and are not editable from `/admin` yet.

**Try it locally (no GitHub needed).**

```bash
npm run dev     # the site, http://localhost:5173
npm run cms     # in a second terminal: lets /admin save to your working copy
```

Open http://localhost:5173/admin/ and press Login. Saving writes the JSON
files on disk and the site hot-reloads.

**Go live (one-time setup).**

1. In `public/admin/config.yml`, set `backend.repo` to the GitHub repository,
   and `site_url` / `display_url` to the site address.
2. Create a GitHub OAuth app (GitHub → Settings → Developer settings → OAuth
   Apps). Its callback URL is `https://<cms-auth service>/callback`.
3. Deploy `cms-auth/` (already in `render.yaml` as `talentpool365-cms-auth`)
   and set `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` and `SITE_ORIGIN` (the
   site address) on it. Put its address in `backend.base_url` in `config.yml`.
4. Give each editor write access to the repository. That is the permission
   model: whoever can push to the repo can edit the site.

`cms-auth/server.mjs` exists because a browser app cannot hold the OAuth
client secret; it has no dependencies. If the site moves to Netlify, delete it
and use Netlify's built-in sign-in instead.

To add a field: add it to the JSON, to the type in `src/data/`, and to the
matching `fields` list in `public/admin/config.yml`.

### Placeholder content

Leadership names, vacancies, partner programmes, press releases, team email
addresses and the pricing FAQ in `content/company/*.json` and `content/pricing.json` are illustrative, like
the case studies on the home page. Replace them with approved content before
launch. The forms (`LeadForm.tsx`, `Contact.tsx`) show a confirmation but do
not send anywhere yet.

## Stack

React 19 + TypeScript, bundled with Vite.

- `src/App.tsx` — header, current page, footer
- `src/routes.tsx` — path to page map
- `src/pages/` — one component per page (or page template)
- `src/components/` — sections and shared parts (`PageHero`, `SubNav`, `LeadForm`)
- `content/` — all editable copy as JSON (see "Content manager")
- `src/data/*.ts` — types for that copy
- `public/admin/` — the content manager page and its `config.yml`
- `cms-auth/` — GitHub sign-in service for the content manager
- `src/lib/` — scroll reveals, counters, carousel and nav hooks
- `src/styles/global.css` — brand tokens, layout, motion and responsive rules
- `src/styles/showcase.css` — hero walkthrough, product showcase tabs, scroll-linked process rail
- `src/styles/pages.css` — inner pages: page hero, sub-navigation, product, solutions and company layouts
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
- **Inner pages** share the home page's motion. `PageHero.tsx` has the same
  photo backdrop and connected-points canvas, a staged entrance, an optional
  rotating headline word (`rotate`) and a visual that floats and leans toward
  the pointer; product pages add the bot in that product's costume. The product
  capability list and the platform overview fill a rail as you scroll
  (`useScrollProgress`), figures count up (`AnimatedValue.tsx`), careers,
  partners and technology use the home page's step rail (`RailSteps.tsx`), a
  pulse runs along the hiring line, and each page fades in on navigation. The
  rules are the "Motion on inner pages" block in `pages.css`.
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
`#FFFFFF` · `#F8FAFC` (light bands now use ice blue `#E8EFFB`). Type: Plus Jakarta Sans (headings, regular with a bold italic accent), Inter (body),
DM Sans (CTAs).

## Headline accent

Wrap a phrase in asterisks in any `SectionHead` title (`"Do more *with less*"`)
or use `<em className="accent">`. It renders bold italic: Royal Violet on light
sections, Cyan on Deep Navy.

## Theme

The page sits on Deep Navy `#172554`, with light ice-blue `#E8EFFB` bands in between (`--color-bg-alt` in `showcase.css`).
Add `section--light` to a `<section>` to make it a light band (Products, How it
works, Case studies and About use it); the rules are the "Round 6" block at the
end of `showcase.css`. The dark token overrides are the "Round 3" block in
`showcase.css`; white product screens (`.mock`,
`.hero-chip`) keep the light tokens. Logo height is set there too
(`.site-header .brand-logo--light`).
