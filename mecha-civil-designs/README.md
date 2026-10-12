# Mecha Civil Designs — Website

Marketing site for **Mecha Civil Designs**, an interior design and civil execution
studio in Chandkheda, Ahmedabad.

- **Live:** https://mecha-civil-designs.vercel.app

## Stack

- Vite 6 + React 19 + TypeScript
- Tailwind CSS v4 via `@tailwindcss/vite` (theme lives in `src/index.css`, no `tailwind.config`)
- `lucide-react` icons
- Fonts: Cormorant Garamond (display) + Plus Jakarta Sans (body), loaded from Google Fonts

## Structure

`src/App.tsx` composes: Navbar, Hero, PortfolioGallery (+ ProjectModal),
CivilCapabilities, CostEstimator, MaterialLibrary, StudioLocation, Footer and the
ConsultationBooking modal.

## Lead capture

The consultation modal is a 3-step form. There is **no backend** — on submit it:

1. validates name, 10-digit mobile, email and property address,
2. stores the record in `localStorage` under `mcd_consultations`,
3. shows a confirmation step whose primary action sends the **full request** (ref, contact,
   scope, budget, preferred slot) to the studio on WhatsApp (`wa.me/919725935504`).

An `.ics` calendar download and a Google Maps directions link are offered alongside.

> The WhatsApp send is the real delivery path — the studio does not receive a booking until
> the visitor taps it. Keep that the primary action if the confirmation step is ever redesigned.

## Business details

Single source of truth: `STUDIO_DETAILS` in `src/data/portfolioData.ts` —
also mirrored into the JSON-LD block in `index.html`.

- Phone / WhatsApp: +91 97259 35504
- Email: connect@mechacivildesigns.com
- Studio: 231, 2nd Floor, Orange Mall, Chandkheda, Ahmedabad 382424

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build & deploy

```bash
npm run build
npx vercel --prod --yes --scope jay-shahs-projects-ecf58304 --token "$VERCEL_TOKEN"
```
