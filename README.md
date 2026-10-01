# Vistaran Tech — Website Templates

A monorepo of production-ready business websites built and maintained by
[Vistaran Tech](https://www.vistaran.com/).

Every folder is a **standalone, independently deployable project** with its own live
Vercel demo. Nothing is shared between projects — copy a folder, customise it, deploy it.

---

## Repository structure

This repository is the **source of truth** for every site below. It holds two kinds of
project side by side:

| Kind | Folders | Also mirrored to a standalone repo? |
|------|---------|-------------------------------------|
| **Business templates** | `interior-design-website`, `js-dye-chem`, `lab-equipments`, `new-grass-life-llc`, `new-sonal-travels`, `pani-puri-masala` | No — this repo is their only home |
| **Client sites** | `aguilars-hardscape-and-concrete`, `cab-lawn-care`, `landscaping-and-tree-service-solutions`, `mnj-tree-services`, `union-lawn-services-llc`, `vasquez-landcare-inc` | Yes — a private `vistaran/<name>` mirror |

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

**All six client sites share one architecture** — a single-page marketing site plus a
serverless `api/` layer that offers appointment booking backed by Google Calendar:

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
- **Mirrors:** `vistaran/<name>` on GitHub (private)
- **Booking env vars:** `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`,
  `GOOGLE_CALENDAR_ID`, `BUSINESS_TIMEZONE` (optional: `BOOKING_SLOT_MINUTES`,
  `BOOKING_START_HOUR`, `BOOKING_END_HOUR`). See each project's `.env.example`.

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
  and redeploys every client-site folder that was touched.
- It also watches each `vistaran/<name>` mirror, so pushes made straight to those repos
  still deploy.
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

**Vite projects** (`new-grass-life-llc` and all six client sites):

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
