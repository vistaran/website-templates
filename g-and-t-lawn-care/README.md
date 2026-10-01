# Landscaping and tree service solutions

Marketing site for **Landscaping and tree service solutions** - Charlotte, North Carolina.

- **Stack:** Vite 8 + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion (`motion`)
- **Deploys to:** Vercel - static build plus serverless functions in `api/`
- **Live:** https://landscaping-and-tree-service-soluti.vercel.app
- **Phone:** +1 (980) 253-5692

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

> Commits must be authored by a member of the Vercel team, or Vercel rejects the
> deployment with *"the commit author doesn't have permission to create
> deployments for this project."* Author commits as `jay@vistaran.tech`.

## Outstanding content items

This project arrived from the designer as a clone of a previously built site.
The name, phone and geo data were updated; the rest of the content was not.
Needs client input before launch:

1. **The dialled and displayed phone numbers disagreed.** `phone` showed `+1 (980) 253-5692` while `phoneRaw` - used by every `tel:` link - was `9843899209`, i.e. M&J Tree Service's number. `phoneRaw` was realigned to `9802535692`; please confirm the display number is the right one.
2. Contact details were another company's. The source ZIP reused `info@mjtreeservice.com` and the matching social handles. They now hold neutral placeholders so no visitor is misdirected.
3. **The business name looks like a description, not a brand** - "Landscaping and tree service solutions". Confirm the trading name before this goes on a custom domain.
