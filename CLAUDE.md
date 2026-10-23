# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev            # start dev server on port 2931 (not 3000)
bun run build       # production build
bun run start        # run production build
bun run lint         # eslint
bun run format       # prettier --write .
bun run format:check
```

No test suite exists in this repo.

## What this is

Aycainvitation — a multi-tenant Next.js (App Router) SaaS that generates digital wedding invitation microsites. Each client gets a themed invitation at `/{clientSlug}`, backed by a self-hosted shared Postgres instead of a traditional per-client codebase fork.

## Architecture

**Multi-tenancy via one dynamic route.** `src/app/[clientSlug]/page.tsx` resolves a slug against the database in this order:
1. `clients` table (real paying customers, via `getClientConfig` in `src/lib/clients.ts`) — if `status: "Pending"`, renders a payment-activation waiting screen instead of the invitation.
2. `demo_themes` table (public theme previews used on the landing page catalog, via `getDemoThemeConfig` in `src/lib/themes.ts`) — served with hardcoded dummy RSVP wishes and `isDemo: true`.
3. Neither → `notFound()`.

All per-client customization (couple names, event dates/locations, bank accounts, music, etc.) lives in one JSONB column (`clients.settings`, typed as `WeddingConfig` in `src/types/index.ts`) — no schema migration needed to add a new invitation field, just extend the interface and read it in the theme component.

**Themes are swappable presentation components, not routes.** `src/themes/{theme-slug}/index.tsx` (e.g. `emerald-elegance`, `creamy-sage`) is a single large client component that takes `config: WeddingConfig` + `wishes` + callbacks as props and renders the entire invitation page (hero, countdown, event cards, gift/bank section, RSVP form, wishes wall). `ClientThemeWrapper.tsx` picks which theme component to mount based on `clientConfig.theme` and owns the shared preloader, wish-fetching, and demo-mode local-storage wish merging. New themes: add `src/themes/{slug}/index.tsx` + matching components under `src/components/{slug}/`, then wire the slug into the `switch` in `ClientThemeWrapper.tsx`.

**Database access is one direct Postgres connection** (`src/lib/db.ts`, postgres.js, server-only): `sql` tagged-template queries with `DATABASE_URL`; `DB_SCHEMA` sets `search_path` so queries use bare table names (the shared DB isolates apps by schema). `json()` wraps values for JSONB columns. Never import it from client components. There is no RLS — access control lives in the server code and the DB role's grants.

**Tables**: `clients` (slug, email, phone, theme, status Active/Pending, settings JSONB), `rsvps` (client_slug FK, name, attendance, guests_count, wish), `demo_themes` (slug, name, tagline, colors, settings JSONB for previews). See `docs/SUPABASE_MIGRATION.md` for the original table definitions (its RLS policies no longer apply) — this project migrated off Google Sheets/OAuth, then off Supabase to plain Postgres; do not reintroduce either.

**Admin area** (`/admin/*` and `/api/admin/*`) is protected by HTTP Basic Auth checked in `src/proxy.ts` (Next middleware, matcher on those two path prefixes) against `ADMIN_USERNAME`/`ADMIN_PASSWORD` env vars — not a database-backed auth system. `src/lib/auth.ts` has an equivalent check for use inside server components/routes directly.

**Order flow**: `src/components/landing-page/OrderForm.tsx` → `POST /api/order` validates + slugifies input, inserts a new `clients` row with `status: "Pending"`, and returns a WhatsApp deep link so the admin gets notified and the client pays manually — there's no payment gateway integration.

**RSVP flow**: `POST /api/rsvp` inserts into `rsvps` (deduped by case-insensitive name per client_slug); `GET /api/rsvp?slug=` returns settings + wish list, with special-cased responses for demo slugs (dummy data) and pending clients (event summary only, no wishes).

**Client-specific overrides outside the database**: `CLIENT_MUSIC` in `src/lib/clients.ts` is a hardcoded slug→audio-file map for clients with custom music that doesn't go through `settings.music_url`; per-client visual one-offs (e.g. `isKarinaAnton` in the emerald theme) are conditional branches inside the theme component itself, not database-driven.

## Conventions

- Path alias `@/*` → `src/*`.
- User-facing strings, comments, and commit-adjacent docs in this repo are written in Bahasa Indonesia; keep new UI copy and inline comments consistent with that.
- Tailwind v4 (CSS-based config, no `tailwind.config.js`) — theme tokens/colors are defined in `src/app/globals.css`.
- Styling in theme components is heavily inline Tailwind + `framer-motion` for animation; there is no shared design-system component library beyond `src/components/shared/`.
