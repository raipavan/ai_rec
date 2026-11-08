# TalentPool365 — Landing Page

Single-page marketing site for TalentPool365, built to the brand handoff v1.0.

## Stack

Plain HTML, CSS and vanilla JS. No build step.

- `index.html` — the landing page
- `css/styles.css` — brand tokens, layout and responsive rules
- `js/main.js` — navigation, reveals, counters, pricing toggle
- `assets/` — product UI imagery (optimised JPEG)

## Local preview

```bash
python -m http.server 8931
```

Then open http://127.0.0.1:8931

## Deploy (Render)

`render.yaml` defines a free static site with the repository root as the publish
directory. Connect this repo to Render and apply the Blueprint.

Brand tokens: `#172554` Deep Navy · `#4F46E5` Royal Violet · `#06B6D4` Cyan ·
`#FFFFFF` · `#F8FAFC`. Type: Plus Jakarta Sans (headings), Inter (body),
DM Sans (CTAs).
