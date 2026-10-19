# Labh Air Conditioning Services — web app + admin console

Marketing site, online booking flow, customer tracking page and an internal admin
console for **Labh Air Conditioning Services** (Ahmedabad). Built with Next.js 16
(App Router), React 19, Prisma and PostgreSQL (Supabase).

**Live:** https://laabh-ac-services.vercel.app

## What's in it

| Area | Routes | Notes |
| --- | --- | --- |
| Marketing site | `/` | Hero, 8 services, technicians, testimonials, FAQ, WhatsApp CTAs |
| Service detail | `/services/[slug]` | Per-service page, statically prerendered from the DB at build time |
| Booking | `/book` | Creates a `Booking` + `Customer`, fires vendor/customer WhatsApp notifications |
| Order tracking | `/track` | Public lookup by booking reference (`?ref=`), optional phone filter |
| Admin console | `/admin/*` | Login, dashboard, bookings, customers, technicians, services, WhatsApp, settings |
| Scheduler | `POST /api/reminders/process` | "Appointment today" reminders to vendor + customer |

## API

All admin endpoints require the `laabh_admin_token` session cookie (or a
`Authorization: Bearer <jwt>` header). `GET /api/settings` and the reminder dispatcher
are **not** anonymous — settings hold the WhatsApp Cloud API token.

- `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- `GET|POST /api/bookings`, `PATCH /api/bookings/[id]`, `POST /api/bookings/[id]/notes`
- `GET /api/customers`, `PATCH /api/customers/[id]`
- `GET|POST|PATCH /api/technicians`
- `GET|POST /api/services`
- `GET|PATCH /api/settings` *(authenticated)*
- `GET|POST /api/notifications` *(authenticated)*
- `GET|POST /api/reminders/process` *(admin session or `Authorization: Bearer $CRON_SECRET`)*
- `GET|POST /api/webhook/whatsapp` — Meta webhook verification + inbound messages
- `GET /api/track?ref=...` — public, minimal booking payload

## Setup

```bash
npm install                # postinstall runs `prisma generate`
cp .env.example .env.local # fill in DATABASE_URL / DIRECT_URL / WhatsApp creds
npx prisma db push         # or apply prisma/production_setup.sql
npx prisma db seed         # admin user, 8 services, 3 technicians, business settings
npm run dev                # http://localhost:3005
```

`DATABASE_URL` must be the **pooled** (port 6543, `?pgbouncer=true`) URL for serverless
runtime; `DIRECT_URL` (port 5432) is used for migrations.

## Deployment

Vercel project `laabh-ac-services` under team `jay-shahs-projects-ecf58304`, root
directory empty, framework auto-detected. All environment variables are set on the
project for production, preview and development.

```bash
npx vercel --prod --yes --scope jay-shahs-projects-ecf58304 --token "$VERCEL_TOKEN"
```

## Security notes

- The WhatsApp Cloud API token lives in `business_settings` **and** in env vars; env wins.
  `GET /api/settings` returns 401 without an admin session so the token is never public.
- `/api/reminders/process` sends real, billable WhatsApp messages and therefore requires
  an admin session or `CRON_SECRET`.
- The seeded admin password is a **placeholder** — change it before handing the console to
  the client, and remove the pre-filled credentials from `/admin/login`.

## Repo

Part of the [`website-templates`](https://github.com/vistaran/website-templates) monorepo —
one folder per client site, each independently deployable.
