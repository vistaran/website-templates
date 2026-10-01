# G & T Lawn Care

Marketing site for **G & T Lawn Care** — lawn mowing, edging, mulch and property
cleanups in Gastonia, North Carolina.

- **Stack:** Vite 8 + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion (`motion`)
- **Deploys to:** Vercel — static build plus serverless functions in `api/`
- **Live:** https://g-and-t-lawn-care.vercel.app
- **Address:** 940 Etta Pl, Gastonia, NC 28054
- **Serves:** Gastonia, Belmont and Gaston County
- **Phone:** +1 (716) 462-3657
- **Email:** estimates@gtlawncarenc.com

All copy, services, reviews and FAQs live in **`src/data/content.ts`** — that is
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

- `GET /api/appointments/status` — whether scheduling is configured; drives the widget's UI
- `GET /api/appointments/slots?date=YYYY-MM-DD` — free 30-minute slots for a day
- `POST /api/appointments/book` — creates the event + confirmation email
- `GET /api/admin/google-calendar` — starts the Google OAuth flow
- `GET /api/admin/oauth2callback` — OAuth callback; prints the refresh token

**Without credentials the site is fully functional** — the widget renders a
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
npx vercel --prod --scope jay-shahs-projects-ecf58304
```

> Commits must be authored by a member of the Vercel team, or Vercel rejects the
> deployment with *"the commit author doesn't have permission to create
> deployments for this project."*

> Leave the Vercel project's **Root Directory** empty. Setting it to the folder
> name breaks CLI deploys — the CLI resolves the local folder joined with that
> value (`<folder>/<folder>`).

This project lives in the [`website-templates`](https://github.com/vistaran/website-templates)
monorepo; pushing to that repo's `main` mirrors client-site changes to production
automatically.

## Outstanding content items

This project arrived as a clone of a previously built site. The name, address,
phone and geo data were updated; please confirm before it goes on a custom domain:

1. **The phone number's area code may be wrong.** The site advertises
   `+1 (716) 462-3657` — area code **716 is Buffalo, NY**, but the business, its
   address and its email domain (`gtlawncarenc.com`) are all North Carolina. If
   this is a cell or forwarding number it is fine; otherwise it should be a
   704/980 Gastonia number. `phone` and `phoneRaw` agree with each other, so
   every `tel:` link dials the number shown.
2. **The canonical URL and Open Graph image were wrong.** `index.html` used a
   `maps.app.goo.gl` shortlink as its `canonical` tag, and `og:image` /
   `twitter:image` were root-relative paths. All now point at this project's own
   production URL.
3. **`metadata.json` and this README were another project's.** Both said
   "Landscaping and tree service solutions — Charlotte, NC". Corrected.
