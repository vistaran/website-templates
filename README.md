# Vistaran Tech — Website Templates

A monorepo of production-ready business website templates built and maintained by
[Vistaran Tech](https://www.vistaran.com/).

Every folder is a **standalone, independently deployable project** with its own live
Vercel demo. Nothing is shared between projects — copy a folder, customise it, deploy it.

---

## Live demos

| # | Project | Live demo | Stack | Type |
|---|---------|-----------|-------|------|
| 1 | [interior-design-website](./interior-design-website) | **https://interior-design-website-iota-sable.vercel.app** | HTML5 · CSS · Vanilla JS | Single-page |
| 2 | [js-dye-chem](./js-dye-chem) | **https://js-dye-chem.vercel.app** | Next.js 16 · React 19 · Tailwind CSS | Multi-page |
| 3 | [lab-equipments](./lab-equipments) | **https://lab-equipments-demo.vercel.app** | HTML5 · CSS · Vanilla JS | Multi-page |
| 4 | [new-grass-life-llc](./new-grass-life-llc) | **https://new-grass-life-llc.vercel.app** | Vite · React 19 · TypeScript · Tailwind v4 | Single-page |
| 5 | [new-sonal-travels](./new-sonal-travels) | **https://newsonaltravels.com** · [vercel.app](https://new-sonal-travels.vercel.app) | Next.js 16 · React 19 · Tailwind CSS | Single-page |
| 6 | [pani-puri-masala](./pani-puri-masala) | **https://pani-puri-masala.vercel.app** | HTML5 · CSS · Vanilla JS | Single-page |

All demos are hosted on Vercel and served over HTTPS from Vistaran Tech's team scope
(`jay-shahs-projects-ecf58304`).

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

---

## Repository layout

```
website-templates/
├── interior-design-website/   # static single-page
├── js-dye-chem/               # Next.js app
├── lab-equipments/            # static multi-page (public/ output dir)
├── new-grass-life-llc/        # Vite + React + TS app
├── new-sonal-travels/         # Next.js app
├── pani-puri-masala/          # static single-page
├── .gitignore                 # ignores node_modules, .next, dist, .vercel, .env*
└── README.md
```

Build output, dependencies, the Vercel link folder (`.vercel/`) and all env files are
git-ignored — the repo holds source only.

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

**Vite project** (`new-grass-life-llc`):

```bash
cd new-grass-life-llc
npm install          # uses .npmrc (legacy-peer-deps=true)
npm run dev          # http://localhost:3000
npm run build        # outputs dist/
```

---

## Deployment workflow

Each project deploys to Vercel **as its own project** (this repo is not wired to a
Git-integration monorepo deploy — folders are deployed individually).

```bash
cd <project-folder>
npx vercel --prod --yes --scope jay-shahs-projects-ecf58304
```

**Standing rule for this repo:** after every Vercel production deploy, push the latest
code back here so the repo always matches what is live.

```bash
cd D:/Development/website-templates
git add -A
git commit -m "deploy(<project>): <what changed>"
git push origin main
```

---

## Adding a new template

1. Create the project folder under `D:/Development/website-templates/<project-name>/`.
2. Keep it self-contained (its own `package.json`, build config and `vercel.json`).
3. Make sure a `.gitignore` covers `node_modules/`, build output and `.env*`.
4. Deploy: `npx vercel --prod --yes --scope jay-shahs-projects-ecf58304`.
5. Add a row to the **Live demos** table above and a short section under **Projects**.
6. Commit and push to `main`.

---

## Conventions

- **Mobile-first** responsive layouts — checked at 375 / 768 / 1024 / 1440 px.
- **SEO by default** — descriptive `<title>`, meta description, Open Graph tags, semantic headings.
- **No placeholder content** shipped: real business name, contact details and imagery.
- Icons from **Lucide** (never emoji), motion kept subtle and 150–400 ms.
- Contact forms route enquiries to WhatsApp or email rather than leaving dead endpoints.

---

<sub>Maintained by [Vistaran Tech](https://www.vistaran.com/) — RAG systems, AI infrastructure, legacy-to-AI modernisation, edge AI, full-stack web & cloud.</sub>
