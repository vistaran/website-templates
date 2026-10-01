# Vistaran Tech — Website Templates

A monorepo of production-ready business websites built and maintained by
[Vistaran Tech](https://www.vistaran.com/).

Every folder is a **standalone, independently deployable project** with its own live
Vercel demo. Nothing is shared between projects — copy a folder, customise it, deploy it.

---

## Repository structure

This repository is the **source of truth** for every site below — all of them live only
here. (The per-project `vistaran/<name>` mirrors described in older revisions of this file
no longer exist; nothing pushes to them.)

| Kind | Folders |
|------|---------|
| **Business templates** | `interior-design-website`, `js-dye-chem`, `lab-equipments`, `new-grass-life-llc`, `new-sonal-travels`, `pani-puri-masala` |
| **Client sites** | `aguilars-hardscape-and-concrete`, `cab-lawn-care`, `carolina-lawn-enhancement`, `j-n-son-landscaping-concord-nc-lawn-n-hardscaping`, `jp-lawn-and-landscaping`, `landscaping-and-tree-service-solutions`, `mnj-tree-services`, `union-lawn-services-llc`, `vasquez-landcare-inc` |

Each folder is self-contained: its own `package.json`, build config, `vercel.json`,
`.npmrc` and `.gitignore`. **No folder references another folder, and no config contains an
absolute path**, so any folder can be moved, copied or deployed on its own without edits.

Each folder is also its **own Vercel project**, deployed independently. This repo is not
wired to a Git-integration deploy — see *Auto-deploy* below for how pushes reach
production.

---

## Live demos

### Business templates

| # | Project | Live demo | Stack | Type |
|---|---------|-----------|-------|------|
| 1 | [interior-design-website](./interior-design-website) | **https://interior-design-website-iota-sable.vercel.app** | HTML5 · CSS · Vanilla JS | Single-page |
| 2 | [js-dye-chem](./js-dye-chem) | **https://js-dye-chem.vercel.app** | Next.js 16 · React 19 · Tailwind CSS | Multi-page |
| 3 | [lab-equipments](./lab-equipments) | **https://lab-equipments-demo.vercel.app** | HTML5 · CSS · Vanilla JS | Multi-page |
| 4 | [new-grass-life-llc](./new-grass-life-llc) | **https://new-grass-life-llc.vercel.app** | Vite · React 19 · TypeScript · Tailwind v4 | Single-page |
| 5 | [new-sonal-travels](./new-sonal-travels) | **https://newsonaltravels.com** · [vercel.app](https://new-sonal-travels.vercel.app) | Next.js 16 · React 19 · Tailwind CSS | Single-page |
| 6 | [pani-puri-masala](./pani-puri-masala) | **https://pani-puri-masala.vercel.app** | HTML5 · CSS · Vanilla JS | Single-page |

### Client sites

| # | Project | Live demo | Stack | Type |
|---|---------|-----------|-------|------|
| 7 | [aguilars-hardscape-and-concrete](./aguilars-hardscape-and-concrete) | **https://aguilars-hardscape-and-concrete.vercel.app** | Vite · React 19 · TS · Tailwind v4 · booking API | Single-page |
| 8 | [cab-lawn-care](./cab-lawn-care) | **https://cab-lawn-care-plum.vercel.app** | Vite · React 19 · TS · Tailwind v4 · booking API | Single-page |
| 9 | [landscaping-and-tree-service-solutions](./landscaping-and-tree-service-solutions) | **https://landscaping-and-tree-service-soluti.vercel.app** | Vite · React 19 · TS · Tailwind v4 · booking API | Single-page |
| 10 | [mnj-tree-services](./mnj-tree-services) | **https://mnj-tree-services-snowy.vercel.app** | Vite · React 19 · TS · Tailwind v4 · booking API | Single-page |
| 11 | [union-lawn-services-llc](./union-lawn-services-llc) | **https://union-lawn-services-llc.vercel.app** | Vite · React 19 · TS · Tailwind v4 · booking API | Single-page |
| 12 | [vasquez-landcare-inc](./vasquez-landcare-inc) | **https://vasquez-landcare-inc.vercel.app** | Vite · React 19 · TS · Tailwind v4 · booking API | Single-page |
| 13 | [carolina-lawn-enhancement](./carolina-lawn-enhancement) | **https://carolina-lawn-enhancement-pi.vercel.app** | Vite · React 19 · TS · Tailwind v4 | Single-page |
| 14 | [j-n-son-landscaping-concord-nc-lawn-n-hardscaping](./j-n-son-landscaping-concord-nc-lawn-n-hardscaping) | **https://j-n-son-landscaping-concord-nc-lawn.vercel.app** | Vite · React 19 · TS · Tailwind v4 | Single-page |
| 15 | [jp-lawn-and-landscaping](./jp-lawn-and-landscaping) | **https://jp-lawn-and-landscaping.vercel.app** | Vite · React 19 · TS · Tailwind v4 · booking API | Single-page |

All demos are hosted on Vercel and served over HTTPS from Vistaran Tech's team scope
(`jay-shahs-projects-ecf58304`).

> **Hostname note.** Vercel only assigns the plain `<name>.vercel.app` hostname if it is
> free globally. Some projects were issued a suffixed alias instead (`-plum`, `-snowy`) and
> one was truncated at 40 characters. The URLs above are the real, verified aliases. A
> symptom of a wrong hostname is a **200 on `/` but 404 on every `/api/*` route** — that is
> the host, not the build.

---

## Projects

### 1. interior-design-website — *UrbanNest Studio*
> Luxury architecture & interior design studio landing page.

Elegant editorial layout for a high-end design practice: hero, studio story, service
pillars, project gallery and enquiry CTA. Pure static — `index.html` plus `vercel.json`.

- **Folder:** `interior-design-website/`
- **Demo:** https://interior-design-website-iota-sable.vercel.app

### 2. js-dye-chem
> Marketing site for JS Dye Chem — textile chemicals & inks wholesaler (Kadodara, Surat).

Full Next.js App Router site with Home, Products, About, Contact, Privacy Policy and
Terms routes, generated `sitemap.xml` / `robots.txt`, dynamic OG image, WhatsApp enquiry
float, map embed and SEO metadata throughout.

- **Folder:** `js-dye-chem/`
- **Demo:** https://js-dye-chem.vercel.app
- **Contact:** WhatsApp +91 97129 22210

### 3. lab-equipments
> Multi-page laboratory equipment template set, plus two alternate product-page themes.

Ships a primary lab-solutions site (BioLab Tech) and two campaign/landing themes
(Loco Coco) with matching product-detail pages. Routes are mapped through `vercel.json`
rewrites (`/template-1`, `/template-1-product`, `/template-3`, `/template-3-product`).

- **Folder:** `lab-equipments/`
- **Demo:** https://lab-equipments-demo.vercel.app

### 4. new-grass-life-llc
> Single-page site for New Grass Life LLC — landscaping & sod installation, Charlotte, NC.

Vite + React 19 + TypeScript + Tailwind v4. Includes an interactive sod cost calculator
modal, transformation gallery, services grid, reviews, FAQ, service-area/hours block and
quote form, with Framer-style motion via `motion` and Lucide icons.

- **Folder:** `new-grass-life-llc/`
- **Demo:** https://new-grass-life-llc.vercel.app

### 5. new-sonal-travels
> Travel agency website — fleet, routes, pricing tiers, reviews and WhatsApp booking.

Next.js 16 with a component-per-section architecture, animated reveals, floating WhatsApp
CTA and business data isolated in `src/lib/`. Runs on the client's own domain.

- **Folder:** `new-sonal-travels/`
- **Demo:** https://newsonaltravels.com (custom domain) · https://new-sonal-travels.vercel.app

### 6. pani-puri-masala — *चटपटा KING*
> Single-page product landing for a pani puri masala brand.

Bold, appetite-driven layout with product highlights, trust badges and order CTAs.
Static `index.html` — the fastest possible load with no build step.

- **Folder:** `pani-puri-masala/`
- **Demo:** https://pani-puri-masala.vercel.app

### 7. aguilars-hardscape-and-concrete
> Client site — Aguilars Hardscape and Concrete (hardscape & concrete contractor, Charlotte, NC).

### 8. cab-lawn-care
> Client site — CAB Lawn Care (lawn care & landscaping).

### 9. landscaping-and-tree-service-solutions
> Client site — Landscaping & Tree Service Solutions. Phone: +1 (980) 253-5692.

### 10. mnj-tree-services
> Client site — M&J Tree Service (tree removal, trimming & land clearing).

### 11. union-lawn-services-llc
> Client site — Union Lawn Services LLC, Charlotte, NC. Phone: (704) 352-0436.

### 12. vasquez-landcare-inc
> Client site — Vasquez Landcare Inc (landcare & landscaping).

### 13. carolina-lawn-enhancement
> Client site — Carolina Lawn Enhancement (landscaping, lawn maintenance & sod, Charlotte NC). Est. 1988.

Vite + React 19 + TS + Tailwind v4. Booking is **entirely client-side**: the appointment is
saved to `localStorage` and the visitor is handed a prefilled Google Calendar link plus an
`.ics` download — no server, no API key, nothing to configure. Also ships a sod & yard cost
calculator and a before/after transformation gallery.

- **Folder:** `carolina-lawn-enhancement/`
- **Demo:** https://carolina-lawn-enhancement-pi.vercel.app

### 14. j-n-son-landscaping-concord-nc-lawn-n-hardscaping
> Client site — J & Son Landscaping (lawn care, brick patios, retaining walls & tree work, Concord NC).

Vite + React 19 + TS + Tailwind v4. Before/after slider, project gallery, service-area
checker and sod calculator. `ImageFallback` guarantees no broken images. Enquiries hand off
to call / WhatsApp / mailto — no backend.

- **Folder:** `j-n-son-landscaping-concord-nc-lawn-n-hardscaping/`
- **Demo:** https://j-n-son-landscaping-concord-nc-lawn.vercel.app

### 15. jp-lawn-and-landscaping
> Client site — JP Lawn and Landscaping (lawn care, landscaping, paver patios & sod, Kannapolis NC).

Vite + React 19 + TS + Tailwind v4. Booking works client-side (`localStorage` + Google
Calendar / Outlook / `.ics` links) and *optionally* POSTs to a same-origin serverless
endpoint, wrapped in a `try/catch` so the UI never depends on it:

- `api/appointments/status.js` — health/contact probe.
- `api/appointments/slots.js` — the four bookable time windows.
- `api/appointments/book.js` — accepts a booking; `400` on a payload missing `date`/`slot`,
  `405` on non-POST.

These were originally dev-only Vite middleware in `vite.config.ts`, so the routes worked in
`npm run dev` and 404'd in production; they are now real functions.

- **Folder:** `jp-lawn-and-landscaping/`
- **Demo:** https://jp-lawn-and-landscaping.vercel.app

### Client-site architectures

Two patterns, chosen per project:

**1. Google Calendar backed (six original client sites)** — a single-page marketing site plus
a serverless `api/` layer:

- `api/appointments/status.js` — reports whether live booking is configured.
- `api/appointments/slots.js` — free/bookable slots for a date, computed in the
  business timezone (`BUSINESS_TIMEZONE`, default `America/New_York`).
- `api/appointments/book.js` — creates the calendar event.
- `api/admin/*` — one-time Google OAuth consent flow that mints the refresh token.

When the Google credentials are absent the booking form **degrades gracefully** to a
Call/Email panel with the business's real phone number and a prefilled mailto — there is
never a dead end and never an `alert()`. Booking credentials live only in Vercel
environment variables, never in the repo.

- **Folders:** `aguilars-hardscape-and-concrete/`, `cab-lawn-care/`,
  `landscaping-and-tree-service-solutions/`, `mnj-tree-services/`,
  `union-lawn-services-llc/`, `vasquez-landcare-inc/`
- **Booking env vars:** `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`,
  `GOOGLE_CALENDAR_ID`, `BUSINESS_TIMEZONE` (optional: `BOOKING_SLOT_MINUTES`,
  `BOOKING_START_HOUR`, `BOOKING_END_HOUR`). See each project's `.env.example`.

**2. Fully client-side (the three newest client sites)** — `carolina-lawn-enhancement`,
`j-n-son-landscaping-concord-nc-lawn-n-hardscaping` and `jp-lawn-and-landscaping` need **no
environment variables and no backend**. The appointment is stored in the browser and the
visitor is given a Google Calendar / Outlook / `.ics` handoff, so these deploy as pure
static builds and cannot break when a credential expires.

---

## Repository layout

```
website-templates/
├── interior-design-website/               # static single-page
├── js-dye-chem/                           # Next.js app
├── lab-equipments/                        # static multi-page (public/ output dir)
├── new-grass-life-llc/                    # Vite + React + TS app
├── new-sonal-travels/                     # Next.js app
├── pani-puri-masala/                      # static single-page
├── aguilars-hardscape-and-concrete/       # client site — Vite + booking API
├── cab-lawn-care/                         # client site — Vite + booking API
├── carolina-lawn-enhancement/             # client site — Vite, client-side booking
├── j-n-son-landscaping-concord-nc-lawn-n-hardscaping/  # client site — Vite, client-side booking
├── jp-lawn-and-landscaping/               # client site — Vite + api/ booking functions
├── landscaping-and-tree-service-solutions/# client site — Vite + booking API
├── mnj-tree-services/                     # client site — Vite + booking API
├── union-lawn-services-llc/               # client site — Vite + booking API
├── vasquez-landcare-inc/                  # client site — Vite + booking API
├── .gitignore                             # ignores node_modules, .next, dist, .vercel, .env*
└── README.md
```

Build output, dependencies, the Vercel link folder (`.vercel/`) and all env files are
git-ignored — the repo holds source only.

> **Do not commit** `node_modules/`, `dist/`/`.next/`, `.vercel/`, any real `.env`
> (only `.env.example`), or a `tokens/` directory. The client sites ship an OAuth helper
> that writes `tokens/google-token.json`; that path must stay ignored.

---

## Auto-deploy (push to production)

Vercel's own Git integration is **not** available on this account — linking a project is
rejected with *"You need to add a Login Connection to your GitHub account first"*, deploy
hooks are unavailable for the same reason, and a GitHub Actions workflow cannot be
committed because the available GitHub tokens lack the `workflow` scope.

Push-to-deploy is therefore handled by a small poller that runs every 5 minutes:

- **Script:** `website_autodeploy.py` (Hermes cron job `18bed2ac9be9`)
- It watches **this monorepo's `main`**. When the SHA moves it diffs the changed paths,
  and redeploys every client-site folder that was touched. The watched folders are:
  `cab-lawn-care`, `landscaping-and-tree-service-solutions`, `mnj-tree-services`,
  `vasquez-landcare-inc`, `aguilars-hardscape-and-concrete`, `union-lawn-services-llc`,
  `carolina-lawn-enhancement`, `j-n-son-landscaping-concord-nc-lawn-n-hardscaping`,
  `jp-lawn-and-landscaping`.
- It does **not** watch the `vistaran/<name>` mirrors — they no longer exist. Deploys build
  from the local folders in this repo, so honouring a mirror-only push would quietly ship
  this repo's code under that push, which is worse than not deploying.
- Vercel builds remotely, so nothing is built locally.
- A remote SHA is recorded only after the deploy is accepted, so a failure is retried on
  the next tick rather than being silently swallowed.
- It runs as a quiet watchdog: silence means "nothing to do".

Touched paths that are **not** client sites (README edits, template folders) are
deliberately ignored, so documentation changes never trigger a deploy.

**Deploys are only accepted when the commit author is a Vercel team member.** The team is
`jay@vistaran.tech` (owner) and `het41664@gmail.com`. Commits authored by any other
address can produce *"the deployment was blocked because the commit author doesn't have
permission to create deployments for this project"*.

---

## Running a project locally

**Static templates** (`interior-design-website`, `pani-puri-masala`, `lab-equipments`) —
no build step, just serve the folder:

```bash
# run from inside the project folder
npx serve .
```

> `lab-equipments` serves from `public/`, so run from `lab-equipments/public`.

**Next.js projects** (`js-dye-chem`, `new-sonal-travels`):

```bash
cd js-dye-chem
npm install
npm run dev          # http://localhost:3000
npm run build        # production build check
```

**Vite projects** (`new-grass-life-llc` and all nine client sites):

```bash
cd new-grass-life-llc
npm install          # uses .npmrc (legacy-peer-deps=true)
npm run dev          # http://localhost:3000
npm run build        # outputs dist/
```

---

## Deployment workflow

Each project deploys to Vercel **as its own project**.

```bash
cd <project-folder>
npx vercel --prod --yes --scope jay-shahs-projects-ecf58304
```

**Standing rule for this repo:** after every Vercel production deploy, push the latest
code back here so the repo always matches what is live.

```bash
git add -A
git commit -m "deploy(<project>): <what changed>"
git push origin main
```

> **Leave the Vercel project's Root Directory empty.** Setting it to the folder name
> breaks CLI deploys: the CLI resolves the local folder *joined with* that value
> (`<folder>/<folder>`). A Root Directory is only correct when Vercel builds from this
> repo's root via a Git integration, which is not available here.

---

## Adding a new project

1. Create the project folder under `website-templates/<project-name>/`.
2. Keep it self-contained (its own `package.json`, build config and `vercel.json`).
3. Make sure a `.gitignore` covers `node_modules/`, build output, `.env*` and `tokens/`.
4. Deploy: `npx vercel --prod --yes --scope jay-shahs-projects-ecf58304`.
5. Read the **real** hostname back from the dashboard or the deployments API — do not
   assume `<project-name>.vercel.app` was assigned.
6. Add a row to the **Live demos** table above and a short section under **Projects**.
7. Commit and push to `main`.

---

## Conventions

- **Mobile-first** responsive layouts — checked at 375 / 768 / 1024 / 1440 px.
- **Never give both sides of a header `shrink-0`.** A long brand wordmark in a `shrink-0`
  flex zone plus a `shrink-0` action cluster cannot yield, so the right-hand buttons push
  past the viewport. Symptom: `document.documentElement.scrollWidth > clientWidth` at 375px
  (carolina-lawn-enhancement overflowed by 16px this way). Keep the brand zone `min-w-0`
  with `truncate` on the name and let the actions stay `shrink-0`.
- **Check `scrollWidth === clientWidth` at 375px, not just a screenshot.** Chrome enforces a
  500px minimum window width, so `--window-size=375` in headless renders a 375px *crop* of a
  500px layout and looks broken when it isn't. Measure with CDP
  `Emulation.setDeviceMetricsOverride` or Chrome DevTools device mode.
- **SEO by default** — descriptive `<title>`, meta description, Open Graph tags, semantic headings.
- **No placeholder content** shipped: real business name, contact details and imagery.
- Icons from **Lucide** (never emoji), motion kept subtle and 150–400 ms.
- Contact forms route enquiries to WhatsApp or email rather than leaving dead endpoints.

---

## Security note

An obfuscated remote-code-execution loader was found appended to
`js-dye-chem/postcss.config.mjs` and `new-sonal-travels/postcss.config.mjs`. It ran on
every build that loaded those PostCSS configs. Both files were restored to the plain
Tailwind config; **the payload is still present in this repository's history**, so treat
any clone made before that fix as untrusted.

---

<sub>Maintained by [Vistaran Tech](https://www.vistaran.com/) — RAG systems, AI infrastructure, legacy-to-AI modernisation, edge AI, full-stack web & cloud.</sub>
