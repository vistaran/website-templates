# Trikha Interiors

Marketing + consultation-booking site for **Trikha Interiors**, an architectural interior
design studio at Y/8, Sujata Flats, Shahibag, Ahmedabad 380004.

**Live:** https://trikha-interiors.vercel.app

## Stack

Vite 8 · React 19 · TypeScript · Tailwind CSS v4 (`@theme` in `src/index.css`) · lucide-react

## Pages

Single-page app with hash routing (`#home`, `#services`, `#portfolio`, `#about`, `#journal`,
`#contact`, `#book`, `#manage`, `#admin`).

| Route | What it is |
|-------|------------|
| `#book` | 5-step consultation booking flow with slot availability, buffers, lead-time and blocked dates |
| `#manage` | Client self-service: look up a booking by reference + management token, reschedule or cancel |
| `#admin` | Studio dashboard: appointment list, status changes, CSV export, services, availability rules, blocked dates, contact settings |

## Data & integrations — read this before promising a client anything

There is **no backend and no database**. Every record lives in the visitor's own browser
`localStorage` (see `src/services/bookingStorage.ts`), seeded from `src/data/initialData.ts`.
That means:

- A booking made on one device is **not visible** on another, and is not visible to the studio
  unless they open the site in the same browser. The admin dashboard reads that same local storage.
- Nothing is emailed. There is no transactional email, no payment capture, and no Stripe.
- To make bookings real, run the PostgreSQL schema in `src/services/integrationStatus.ts`
  against Supabase (or any Postgres), then replace the `bookingStorage` localStorage calls with
  API calls. Paid consultations additionally need a server-side Stripe Checkout session and webhook.

The contact form and the journal newsletter sign-up have **no endpoint** — they open the
visitor's own mail client addressed to the studio inbox (`mailto:`), so an inquiry is never
silently swallowed by a fake "message received" screen.

## Admin passcode

The dashboard is gated by a client-side passcode (`AdminDashboard.tsx`). It is a demo gate,
not security — anyone can read it in the bundle, and the data is per-browser anyway. Replace it
with real auth before this ever fronts shared data.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # -> dist/
npm run lint     # tsc --noEmit
```

`.npmrc` pins `legacy-peer-deps=true` because the export pins futuristic majors
(Vite 8, TypeScript 7, `@vitejs/plugin-react` 6) whose peer ranges npm will not resolve otherwise.

## Deploy

Static Vite build plus `vercel.json` (`framework: vite`, output `dist`). Its own Vercel project
under the `jay-shahs-projects-ecf58304` team:

```bash
npx vercel --prod --yes --scope jay-shahs-projects-ecf58304 --token "$VERCEL_TOKEN"
```
