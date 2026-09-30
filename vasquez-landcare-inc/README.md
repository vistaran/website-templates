# Vasquez Landcare INC

Marketing site for **Vasquez Landcare INC** - Charlotte, North Carolina.

- **Stack:** Vite 8 + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion (`motion`)
- **Deploys to:** Vercel - static build plus serverless functions in `api/`
- **Live:** https://vasquez-landcare-inc.vercel.app
- **Phone:** (704) 369-4499

All copy, services, reviews and FAQs live in **`src/data/content.ts`** - that is
the single file to edit for text changes.

## Local development

```bash
npm install
npm run dev        # `vercel dev` - the site AND the api/ functions on :3000
npm run dev:ui     # Vite only (no serverless functions) on :3000
npm run build      # production build to dist/
npm run lint       # tsc --noEmit
```

`.npmrc` pins `legacy-peer-deps=true`; the scaffold pulls pre-release peers
(Vite 8, TypeScript 7, `@vitejs/plugin-react` 6) that npm would otherwise refuse.

## Booking calendar (optional)

The quote section embeds a Google Calendar booking widget backed by these
serverless routes:

- `GET /api/appointments/status` - whether scheduling is configured; drives the widget's UI
- `GET /api/appointments/slots?date=YYYY-MM-DD` - free 30-minute slots for a day
- `POST /api/appointments/book` - creates the event + confirmation email
- `GET /api/admin/google-calendar` - starts the Google OAuth flow
- `GET /api/admin/oauth2callback` - OAuth callback; prints the refresh token

**Without credentials the site is fully functional** - the widget renders a
Call / Email panel instead of an empty date picker, so visitors never hit a dead
end. Set the variables from `.env.example` on the Vercel project and follow the
OAuth flow at `/api/admin/google-calendar` to enable scheduling.

### Timezone

`BUSINESS_TIMEZONE` defaults to `America/New_York`. The original scaffold
defaulted to `Asia/Kolkata`, which silently shifted every slot label by 9.5
hours. Slot labels are formatted with `formatInTimeZone` because this version of
`date-fns-tz` ignores the `timeZone` option on `format()`.

## Deployment

```bash
npx vercel --prod
```

### Auto-deploy on push

Pushing to `main` is mirrored to Vercel production by a poller,
`website_autodeploy.py` (Hermes cron job `18bed2ac9be9`, every 5 minutes). It reads
the remote `main` SHA of every client site and runs a production deploy whenever
one moves, recording the SHA only after the deploy is accepted. Vercel builds
remotely, so nothing is built locally.

This exists because Vercel's own Git integration cannot be linked for these
projects - the Vercel account (`jay-vistaran` / `jay@vistaran.tech`) has no GitHub
login connection, and deploy hooks are unavailable for the same reason.

> Commits must be authored by a member of the Vercel team, or Vercel rejects the
> deployment with *"the commit author doesn't have permission to create
> deployments for this project."* Author commits as `jay@vistaran.tech`.

## Outstanding content items

This project arrived from the designer as a clone of a previously built site.
The name, phone and geo data were updated; the rest of the content was not.
Needs client input before launch:

1. Contact details were another company's. The source ZIP reused `info@mjtreeservice.com` and the matching social handles. They now hold neutral placeholders so no visitor is misdirected.
