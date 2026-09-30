# Union Lawn Services LLC

> Transforming Charlotte Lawns into Extraordinary Landscapes.

Marketing website for **Union Lawn Services LLC** — sod installation, mulch, lawn
maintenance and yard clean-ups across Charlotte, NC and Mecklenburg County.

- **Stack:** Vite 8 + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion (`motion`)
- **Deploys to:** Vercel (static build + serverless functions in `api/`)
- **Live:** https://union-lawn-services-llc.vercel.app

## Sections

Hero → Services (+ sod calculator modal) → Before/After transformation gallery →
Google reviews → Hours & service area → Consultation booking → FAQ → Footer,
plus a mobile sticky quick-action bar.

Contact details, services, reviews, gallery items and FAQs all live in
`src/data/content.ts` — edit that one file to change copy.

## Run locally

```bash
npm install
cp .env.example .env   # optional, only needed for live calendar booking
npm run dev            # Vite on :3000 + the Express dev server on :3001
```

`npm run dev` boots both processes via `concurrently`:

- `vite` — the front end on <http://localhost:3000>
- `server.js` — the local booking API on <http://localhost:3001>

Other scripts: `npm run build` (production bundle into `dist/`),
`npm run preview`, `npm run lint` (`tsc --noEmit`).

## Booking widget

`src/components/BookingCalendar.tsx` drives the "Schedule Your Free
Consultation" card — a 4-step flow: pick a date → pick a slot → enter details →
confirmation, with the event pushed straight to the business Google Calendar.

Locally it targets `http://localhost:3001/api/appointments` (the Express dev
server); in production it targets the same-origin `/api/appointments`. API errors
(including "Google Calendar not connected") are shown inline in the widget rather
than as a browser alert.

### API routes

| Route | Purpose |
| --- | --- |
| `GET /api/appointments/slots?date=YYYY-MM-DD` | Bookable half-hour slots for a day |
| `POST /api/appointments/book` | Creates the calendar event, emails the invite |
| `GET /api/admin/google-calendar?password=…` | Starts the one-time OAuth consent flow |
| `GET /api/admin/oauth2callback` | Exchange callback — prints your `GOOGLE_REFRESH_TOKEN` |

Shared Google/calendar helpers live in `api/_lib/google.js` (anything under `api/`
whose name starts with `_` is not exposed as a route by Vercel). `server.js` is the
local-dev equivalent of these endpoints and is not deployed.

### Enabling live booking

1. Create an OAuth2 client in Google Cloud Console and enable the Google Calendar
   API. Add `https://union-lawn-services-llc.vercel.app/api/admin/oauth2callback`
   as an authorised redirect URI.
2. Set `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI` and
   `ADMIN_PASSWORD` as **Vercel project environment variables** (Production +
   Preview), and redeploy.
3. Visit
   `https://union-lawn-services-llc.vercel.app/api/admin/google-calendar?password=<ADMIN_PASSWORD>`
   and approve access. The callback page prints your `GOOGLE_REFRESH_TOKEN`.
4. Add that as a `GOOGLE_REFRESH_TOKEN` env var, plus `GOOGLE_CALENDAR_ID` and
   `BUSINESS_TIMEZONE`, then redeploy once more.
5. The widget switches to the live date picker automatically.

Until `GOOGLE_REFRESH_TOKEN` is set, `/api/appointments/slots` returns 401 and the
widget surfaces that message inline instead of dead-ending the visitor.

Booking slots default to 30 minutes, 8:00 AM – 5:00 PM, in `America/New_York`;
override with `BOOKING_SLOT_MINUTES`, `BOOKING_START_HOUR`, `BOOKING_END_HOUR`
and `BUSINESS_TIMEZONE`.

## Deploy

```bash
npx vercel --prod --scope jay-shahs-projects-ecf58304 --token "$VERCEL_TOKEN"
```

`vercel.json` pins the framework to `vite`, builds with `npm run build` and
publishes `dist/`, while anything under `api/` is deployed as a serverless
function.
