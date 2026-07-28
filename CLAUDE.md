# project-portfolio

Single-page static portfolio for Engr. Reinhard Mari Ramirez, ECT.
Astro + TypeScript + Tailwind. Static output only. Deploys to Vercel.

## Positioning — the whole point of the site

**"Data engineer who automates with AI agents."**

The differentiator is the *pair*: production data engineering (ETL, AWS, enterprise
pipelines) AND agent tooling (Claude Code Skills, hooks, MCP). Most people selling AI
automation cannot build a production pipeline. This person can, and has, for five years.

Lead with engineering credibility, then agent work as what it enables.
NOT "AI enthusiast". NOT "full-stack developer".

Two audiences: recruiters skimming 30s, and technical buyers who want proof.
Outcome-first copy up top, depth below.

## Hard constraints

- Static output only. No SSR, no API routes, no CMS.
- Client-side JS is allowed but stays exceptional. Every script must be inline
  (`is:inline`) so it costs no extra request, must leave the page correct and readable
  when stripped, and must respect `prefers-reduced-motion` where it drives motion. No
  frameworks, no bundled JS, no third-party scripts, no trackers — the footer claims
  "no trackers, no cookies" and that has to stay true. Reach for CSS first; add script
  only where CSS genuinely cannot do the job.
  Current scripts: theme toggle, and the hero name replay observer in `index.astro`.
- Fonts self-hosted in `/public/fonts` via `@font-face`. No Google Fonts CDN call.
- Node 20.13.1 on this machine. `create-astro` requires Node 22+, so the project was
  scaffolded manually. Astro 5.13.x supports `^20.3.0` — do not bump past what
  `engines.node` allows without checking.
- Responsive 360px → wide desktop. No horizontal body scroll at any width.
- Semantic HTML, single `h1`, logical heading order, keyboard navigable, visible focus
  rings, alt text everywhere.
- External links: `target="_blank" rel="noopener noreferrer"`.
- Lighthouse targets: 95+ accessibility, 95+ performance.

## Content architecture

All content lives in typed files under `src/data/`:

| File | Holds |
|---|---|
| `src/data/site.ts` | name, title, email, URLs, OG meta, availability placeholder |
| `src/data/experience.ts` | career entries, most recent first |
| `src/data/projects.ts` | four project cards |
| `src/data/skills.ts` | capability groups + credentials |

**Adding an entry means editing data, never markup.** If a change requires touching
`.astro` markup to add content, the data model is wrong — fix the model.

## Section order (deliberate — do not reorder)

1. Hero
2. **Experience** — ABOVE projects. Career history is the credibility anchor;
   recruiters need it before they care about projects.
3. Projects
4. What I do
5. Credentials
6. Contact

## Design direction

Dark-first, light mode via toggle respecting `prefers-color-scheme`, persisted to
localStorage. Typography-led. Generous whitespace. ~72ch for prose, wider for the
project grid. Must not look like a Tailwind template.

### Signature: the ledger grid

Every section is a labeled row. Left column = fixed-width monospace field label
(`01 / EXPERIENCE`, `2024—`). Right column = prose. This mirrors a data dictionary /
schema definition — the subject's own vernacular. The career timeline genuinely is
ordered, so numbering encodes real information rather than decorating.

Applied consistently across experience, skills, and credentials. This is the one bold
element — everything around it stays quiet.

### Tokens

Type: Instrument Serif (display), Inter Tight (body), JetBrains Mono (field labels).
The serif/mono tension is the point: engineering discipline plus editorial weight.

Colors — one accent, used sparingly (links, tags, CTA only):

| Token | Dark | Light |
|---|---|---|
| bg | `#0B0D0F` | `#FAF9F7` |
| surface | `#131619` | `#F1EEE9` |
| text | `#EDEAE4` | `#16181B` |
| muted | `#8B9099` | `#5C6169` |
| rule | `#22262B` | `#DEDAD2` |
| accent | `#D98E32` | `#9A5B12` |

Banned: gradients, glassmorphism, animated blobs, stock photos, hero illustrations,
skill-percentage bars, logo walls.

### Motion

Motion is typographic and structural — things composing, settling, or drawing
themselves. Never decorative shapes moving for their own sake.

- Everything gated behind `prefers-reduced-motion: no-preference`, and the un-animated
  state must be the *finished* state. If an animation never runs, the page reads
  correctly.
- Nothing loops forever beside text a visitor is trying to read.
- CSS first: `animation-timeline: view()` for scroll-driven reveals, plain keyframes for
  load-triggered ones. `view()` degrades to nothing where unsupported, which is fine.
- Known CSS limit: a scroll timeline cannot restart a time-based animation. Replay on
  re-entry needs an IntersectionObserver — this is why `index.astro` has one.

Current motion: hero name reveals word by word (~2.6s, replays on re-entry), section
contents fade and rise on scroll, the accent rule beside the positioning line draws
itself, project cards lift a hairline accent on hover.

## Copy rules

- First person, plain, specific.
- **Banned words:** passionate, innovative, cutting-edge, leveraging, synergy,
  seasoned, results-driven, proven track record.
- **Do not invent metrics**, percentages, time savings, client names, or testimonials.
  "Roughly five orchestrations" and "5 years" are the ONLY quantities available.
- Where a metric belongs but none was supplied, leave a marked `TODO` comment in the
  source. Do not fill with a plausible number.
- Card 4 (Data & Automation Tooling): do NOT name any client, company, or client code.

## Known content facts

- Availability line is a **placeholder** — hours/week and remote-only status are
  unknown. Marked `TODO(reinhard)` in `src/data/site.ts`. Do not invent.
- `csv-profiler` repo has `demo.tape` (VHS script) but **no `demo.gif` committed**.
  Both `main` and `master` raw URLs 404. A marked placeholder renders instead; the
  data file carries a `demoGif.status` flag to flip once the GIF is pushed.
- PH tax calculator: repo name (`ph-freelancer-tax-calculator`) and live URL
  (`project-exp.onrender.com`) deliberately differ — repo renamed, Render service was
  not. **Both are correct. Do not "fix" either.**
- Render free tier cold-starts — the card notes a 30–60s wake time.

## Emphasis rules

- Project card 1 (`csv-profiler`) gets more visual weight than the other three.
- Experience: surface "AWS Administrator" and the agent tooling line prominently.
- Accenture: "led a team" and "roughly five end-to-end orchestrations" are the
  seniority evidence — do not bury them.

## Commands

```bash
npm install
npm run dev      # localhost:4321
npm run build    # → dist/
npm run preview
```

## Deploy

Vercel, preset Astro, build `npm run build`, output `dist`. Zero config beyond the
preset. **Do not git commit or push** — the owner reviews first.
