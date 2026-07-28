# project-portfolio

Single-page static portfolio for **Engr. Reinhard Mari Ramirez, ECT** — data engineer.

Astro + TypeScript + Tailwind CSS v4. Static output, no SSR, no API routes, no CMS.
Two small inline scripts, no bundle: the theme toggle and the hero name replay.

---

## Local development

Requires Node **20.3+** (this machine runs 20.13.1) and npm 9.6.5+.

```bash
npm install
npm run dev        # http://localhost:4321
```

| Script | Does |
|---|---|
| `npm run dev` | Dev server with HMR on port 4321 |
| `npm run build` | Type-checks with `astro check`, then builds to `dist/` |
| `npm run preview` | Serves the built `dist/` locally |

> **Note on Node version.** `npm create astro@latest` requires Node 22+, so this
> project was scaffolded by hand. Astro itself only needs `^20.3.0`, which is why
> `astro` is pinned to `5.13.11` in `package.json` — the last line that supports
> Node 20. Two transitive dev dependencies (`chokidar@5`, `readdirp@5`) print an
> `EBADENGINE` warning on install. They affect the dev watcher only; install,
> build, and preview all complete cleanly. Upgrading to Node 22 silences them and
> lets you unpin Astro.

## Editing content

**All content is data. Adding an entry means editing a typed file, never markup.**

| File | Holds |
|---|---|
| `src/data/site.ts` | Name, title, positioning, email, URLs, OG meta, availability |
| `src/data/experience.ts` | Career entries, most recent first |
| `src/data/projects.ts` | The four project cards |
| `src/data/skills.ts` | Capability groups and credentials |

Each file exports an interface alongside the data, so `astro check` catches a
malformed entry at build time rather than at render time.

### Common edits

**Add a job** — append to `EXPERIENCE` in `src/data/experience.ts`. Set
`emphasis: true` on a role to render its label in the accent colour; that is how
"AWS Administrator" and "Lead ETL Developer" are surfaced.

**Add a project** — append to `PROJECTS` in `src/data/projects.ts`. Exactly one
project should carry `featured: true`; it spans the full grid row and splits into
a prose/demo two-column layout.

**Set your availability** — `src/data/site.ts`, the `availability` field. It is
`null` right now, which renders a dashed "to be confirmed" chip. Set it to a
string and the chip becomes a real claim.

### Regenerating the OG image and favicons

```bash
node scripts/generate-assets.mjs
```

Writes `og.png`, `favicon.svg`, `favicon.ico`, and `apple-touch-icon.png` into
`public/`. The output is committed, so the build itself never needs `sharp`.
The script points fontconfig at `public/fonts` so the OG image renders with the
same typefaces as the site rather than a system fallback.

## Fonts

Self-hosted in `public/fonts` as woff2, loaded via `@font-face` in
`src/styles/global.css`. No Google Fonts request at runtime. The three faces used
above the fold are preloaded.

| Face | Role |
|---|---|
| Instrument Serif | Display — headings, name, project titles |
| Inter Tight | Body copy |
| JetBrains Mono | Ledger field labels, chips, code |

## Measured Lighthouse scores

Run on 2026-07-28 against the built `dist/` served statically, Lighthouse 12.8.2,
headless Chrome. Both runs scored **100 across all four categories**.

Audit the production build, not `npm run dev` — the dev server ships Vite's client
and the Astro dev toolbar, roughly 1.3 MB of tooling that never reaches production,
and scores about 90 on performance as a result.

| | Desktop | Mobile (default throttling) |
|---|---|---|
| Performance | **100** | **100** |
| Accessibility | **100** | **100** |
| Best Practices | **100** | **100** |
| SEO | **100** | **100** |
| First Contentful Paint | 0.3 s | 1.1 s |
| Largest Contentful Paint | 0.4 s | 1.5 s |
| Total Blocking Time | 0 ms | 0 ms |
| Cumulative Layout Shift | 0 | 0 |

These are local numbers against a preview server. Production numbers over the
network will differ; re-run against the deployed URL to confirm.

Reproduce with:

```bash
npm run build
npx serve dist -l 4321          # confirm nothing else holds the port
npx lighthouse http://localhost:4321/ --view
```

## Accessibility and responsive behaviour

Verified with headless Chrome at 360 / 768 / 1440 px: no horizontal body scroll at
any width (`scrollWidth === clientWidth` at all three).

- Single `h1`, logical heading order, semantic landmarks
- Skip link to `#main` as the first focusable element
- Visible focus ring on every interactive element
- `prefers-reduced-motion` respected
- All external links carry `target="_blank" rel="noopener noreferrer"` and an
  off-screen "opens in a new tab" note

## Client-side JavaScript

Two inline scripts, both `is:inline` so neither costs a request. There is no
bundle, no framework, and no third-party script. Measured Total Blocking Time is
0 ms.

**Theme toggle.** An inline script in `src/layouts/Layout.astro` stamps
`data-theme` on `<html>` before first paint, so there is no flash. The toggle
writes to `localStorage`; with no stored value the OS `prefers-color-scheme`
wins. With JavaScript disabled the page still renders correctly in whichever
theme the OS prefers — only the toggle stops working.

**Hero name replay.** An `IntersectionObserver` at the foot of
`src/pages/index.astro` replays the word-by-word reveal when the heading
re-enters the viewport. CSS alone cannot do this: the reveal is a time-based
stagger, and a scroll timeline has no way to rewind one. It honours
`prefers-reduced-motion`, and with the script stripped the name is simply
visible and correct.

---

## Deploying to Vercel

### Target repository

`github.com/reinrmz/project-portfolio` — the existing public repo, already set as
`origin`. Local `main` descends from the remote's initial commit, so pushing is an
ordinary fast-forward. No force push, and nothing on the remote is discarded.

### Steps

1. Commit and push to GitHub.

   ```bash
   git add .
   git commit -m "Build portfolio site"
   git push -u origin main
   ```

2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.

3. Vercel detects Astro automatically. Confirm the settings:

   | Setting | Value |
   |---|---|
   | Framework Preset | **Astro** |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |
   | Node.js Version | 20.x or 22.x |

   No environment variables. No other configuration.

4. Deploy. Subsequent pushes to `main` deploy automatically.

5. **Confirm the deployed domain matches `CANONICAL_URL`.**

   `src/data/site.ts` is set to `https://rein-ramirez-portfolio.vercel.app`.
   Vercel derives the default domain from the *project* name, which it seeds
   from the repo name (`project-portfolio`) — so unless you name the project
   `rein-ramirez-portfolio` during import, you will land on a different URL.

   Either set the project name to `rein-ramirez-portfolio` at import time, or
   add that domain under **Settings → Domains** afterwards. If the live URL ends
   up different, update `CANONICAL_URL` and redeploy — it drives the canonical
   link, `sitemap.xml`, `robots.txt`, and the absolute OG image URL.

## Project structure

```
public/
  fonts/               self-hosted woff2 (7 files, ~153 KB total)
  og.png               generated 1200x630 social card
  favicon.svg  favicon.ico  apple-touch-icon.png
scripts/
  generate-assets.mjs  regenerates og.png + favicons
  fonts.conf           lets sharp resolve the self-hosted faces
src/
  components/
    ProjectCard.astro  one project card; handles featured + missing-demo states
    Section.astro      ledger row wrapper (mono field label + content)
    ThemeToggle.astro  inline theme switcher
  data/                all content — see "Editing content" above
  layouts/Layout.astro <head>, meta, OG/Twitter tags, no-FOUC theme script
  pages/
    index.astro        the page
    robots.txt.ts      generated at build
    sitemap.xml.ts     generated at build
  styles/global.css    tokens, ledger grid, type scale, components
CLAUDE.md              positioning, design direction, and content rules
```
