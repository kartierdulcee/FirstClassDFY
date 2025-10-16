# First Class AI — Done-For-You Systems

A production-ready Next.js 14 platform for the "First Class AI" automation studio. The experience combines a Notion-inspired marketing site, lead qualification funnel, Calendly scheduling, transactional email, and authenticated portals for clients and operators.

## Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **UI:** Tailwind CSS, shadcn/ui-inspired primitives, lucide-react
- **Auth:** next-auth (magic link via Resend)
- **Database:** PostgreSQL (Supabase ready) with Prisma ORM
- **Email:** Resend + React Email templates
- **Scheduling:** Calendly inline embed + webhook ingestion
- **Analytics:** Vercel Analytics
- **Integrations:** Optional Airtable sync, Calendly webhook verification, in-memory rate limiting (TODO: swap for Upstash Redis)

## Getting Started

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Copy environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in all required secrets. Calendly and Resend credentials are mandatory for the funnel to operate.

3. **Generate Prisma Client & run migrations**
   ```bash
   pnpm prisma:generate
   pnpm prisma:migrate
   ```

4. **Seed the database with an admin user**
   ```bash
   pnpm db:seed
   ```
   The seeder creates an admin magic-link user (`ops@firstclassai.com`). Update the script if you need different bootstrapped accounts.

5. **Start the dev server**
   ```bash
   pnpm dev
   ```
   Visit [http://localhost:3000](http://localhost:3000).

## Testing

```bash
pnpm test
```

Vitest covers the typed env loader and Calendly signature verification helpers. Extend this suite as you add critical business rules.

## Integrations & Webhooks

### Calendly

1. Set `CALENDLY_WEBHOOK_SIGNING_KEY`, `CALENDLY_ORG_URI`, `CALENDLY_API_TOKEN`, and (optionally) `CALENDLY_SCHEDULING_URL`.
2. Register a webhook pointing to `https://your-domain.com/api/webhooks/calendly` for the `invitee.created` and `event.scheduled` events. The handler marks leads as booked and dispatches confirmation emails.
3. Calendly embed uses the scheduling URL you provide; update the `.env` when you create a dedicated event type.

### Airtable (optional)

Set `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, and (optionally) `AIRTABLE_TABLE_NAME`. When enabled, admins can sync leads to Airtable from the dashboard or via the `/api/airtable-sync` endpoint.

## Deployment (Vercel)

1. Create a new Vercel project and link this repository.
2. Add all environment variables from `.env.example` to the Vercel dashboard (Production + Preview).
3. Provision a managed Postgres database (Supabase, Neon, etc.) and update `DATABASE_URL`.
4. Configure the Calendly webhook URL using your deployed domain.
5. Trigger a build—Vercel will run `pnpm install`, `pnpm prisma:generate`, and build the app.

## Project Structure Highlights

- `src/app/(marketing)` – Marketing pages (`/`, `/apply`, `/book`, `/thank-you`)
- `src/components/lead/LeadForm.tsx` – Intake form with server action + zod validation
- `src/app/(dashboard)` – Authenticated portal & admin experiences
- `src/app/api/*` – REST endpoints for leads, Calendly webhooks, and Airtable sync
- `src/emails` – React Email templates rendered through Resend
- `prisma/schema.prisma` – Data model for users and leads

## Notes & Next Steps

- The in-memory rate limiter is suitable for a single instance only. Swap `lib/rate-limit` for Upstash Redis (or similar) before scaling.
- UI components follow a monochrome, Notion-esque aesthetic. Adjust `tailwind.config.ts` and `globals.css` to extend the design system.
- The admin dashboard exposes server actions for changing lead status, assigning owners, and syncing to Airtable. Extend these with realtime capabilities (e.g., Pusher) if needed.

Welcome aboard—ship confidently.
