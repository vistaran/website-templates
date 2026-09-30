# Aguilars Hardscape and Concrete

Marketing site for **Aguilars Hardscape and Concrete** — Charlotte, North Carolina
(Mecklenburg County, ZIP 28212).

- **Stack:** Vite 8 + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion (`motion`)
- **Deploys to:** Vercel — static build plus serverless functions in `api/`
- **Live:** https://aguilars-hardscape-and-concrete.vercel.app
- **Phone:** (980) 234-9287 · **Hours:** Mon – Sat, 8:00 AM – 5:00 PM

## Sections

- Sticky nav + mobile menu — `src/components/Navbar.tsx`
- Hero — `src/components/Hero.tsx`
- Services grid — `src/components/Services.tsx`
- Before/after gallery — `src/components/TransformationGallery.tsx`
- Sod calculator modal — `src/components/SodCalculatorModal.tsx`
- Reviews — `src/components/Reviews.tsx`
- Service area + hours — `src/components/BusinessHoursAndArea.tsx`
- FAQ — `src/components/FAQ.tsx`
- Quote form + booking — `src/components/QuoteFormSection.tsx`, `BookingCalendar.tsx`
- Mobile call bar — `src/components/MobileQuickBar.tsx`
- Footer — `src/components/Footer.tsx`

All copy, services, reviews and FAQs live in **`src/data/content.ts`** — that is
the single file to edit for text changes.

## Local development

```bash
npm install
npm run dev        # `vercel dev` — the site AND the api/ functions on :3000
npm run dev:ui     # Vite only (no serverless functions) on :3000
npm run build      # production build to dist/
npm run lint       # tsc --noEmit
```

`.npmrc` pins `legacy-peer-deps=true`; the scaffold pulls pre-release peers
(Vite 8, TypeScript 7, `@vitejs/plugin-react` 6) that npm would otherwise refuse.

## Booking calendar (optional)

The quote section embeds a Google Calendar booking widget backed by these
serverless routes:

- `GET /api/appointments/status` — whether scheduling is configured; drives the widget's UI
- `GET /api/appointments/slots?date=YYYY-MM-DD` — free 30-minute slots for a day
- `POST /api/appointments/book` — creates the event + confirmation email
- `GET /api/admin/google-calendar` — starts the Google OAuth flow
- `GET /api/admin/oauth2callback` — OAuth callback; prints the refresh token

**Without credentials the site is fully functional** — the widget renders a
Call (980) 234-9287 / Email panel instead of an empty date picker, so visitors
never hit a dead end.

To enable scheduling, set the variables from `.env.example` on the Vercel project
and follow the OAuth flow at `/api/admin/google-calendar` to mint
`GOOGLE_REFRESH_TOKEN`.

### Timezone

`BUSINESS_TIMEZONE` defaults to `America/New_York`. The original scaffold
defaulted to `Asia/Kolkata`, which silently shifted every slot label by 9.5
hours. Slot labels are formatted with `formatInTimeZone` because this version of
`date-fns-tz` ignores the `timeZone` option on `format()`.

## Deployment

```bash
npx vercel --prod
```

`vercel.json` sets the framework, build command and output directory.

> Commits must be authored by a member of the Vercel team, or Vercel rejects the
> deployment with *"the commit author doesn't have permission to create
> deployments for this project."* Author commits as `jay@vistaran.tech`.

## ⚠️ Outstanding content items

This project arrived from the designer as a rebrand of another site. The
business name, phone and geo data were updated, but the rest of the content
was not. The following need client input before launch:

1. **Copy is still lawn/sod, not hardscape/concrete.** The tagline, sub-headline,
   all five services, the gallery captions, the reviews and the FAQ are about sod
   installation, mulch and mowing — nothing about hardscaping, pavers, patios,
   retaining walls or concrete work. `<title>`, the meta description and the Open
   Graph tags still read "Landscaping & Sod Installation".
2. **Email and social links belonged to another company.** The source ZIP pointed
   `email` at `info@mjtreeservice.com` and both social links at
   `facebook.com/mjtreeservice` / `instagram.com/mjtreeservice`. They now hold
   neutral placeholders (`info@example.com`, empty socials — the footer hides the
   icon row until real URLs are supplied) so no visitor is misdirected.
3. **Google Maps `cid`** in the footer probably belongs to the other business.
4. **`package.json`**'s `dev:server` script references a `server.js` that does not
   exist in this project; use `npm run dev` (`vercel dev`) instead.
