# AVES

One Next.js application for the global homepage, Colombia, Australia, New Zealand and the shared AVES account portal. Public brand: AVES. Public domain: [aves.bio](https://aves.bio). Package: `aves-web`.

The combined application is live on aves.bio. Current source branch: `feature/field-guide-card`. Read [CONTINUE-HERE.md](CONTINUE-HERE.md) for the single numbered pathway and resume prompt, with verified runtime and rollback in [HANDOFF-CURRENT.md](docs/HANDOFF-CURRENT.md), and [ARCHITECTURE.md](docs/ARCHITECTURE.md) before editing. Earlier consolidation plans are historical.

## Development

Use Node.js 22 and the pinned pnpm 10.34.5. Do not use npm or pnpm 11 for this repository.

```sh
corepack pnpm install --frozen-lockfile --ignore-scripts
corepack pnpm dev
```

All routes run from one server. No second Australia server or Next.js basePath is required. Public pages work without private service credentials. To review without writes or sign-in, set `VERCEL_ENV=preview` in untracked `.env.local`. Use `.env.example` for variable names. Never commit credentials or customer records.

## Code map

| Area | Location |
| --- | --- |
| Global, Colombia, NZ routes and public content | `app/`, `components/`, `content/` |
| Australia public routes | `app/australia/` |
| Australia public components, catalogues and path helpers | `features/australia/` |
| Original Colombia contact presentation | `features/colombia/contact-page.tsx` |
| Shared account, admin and auth routes | `app/account/`, `app/admin/`, `app/auth/` |
| Shared account and inquiry APIs | `app/api/`, `lib/account-*`, `lib/contact-*`, `lib/supabase/` |
| Shared UI primitives and bird viewer | `components/ui/`, `components/homepage-bird-carousel.tsx` |
| Australia media at established URLs | `public/australia/` |
| Existing database migrations and rollback tests | `supabase/` |

Country discovery, map dividers, licensed photographs/recordings, attribution, NZ questionnaire and wishlist are retained. All three enabled destinations reuse the existing account database, RLS and ownership rules. This consolidation requires no schema migration or customer-data copy.

## Checks and handoff

```sh
corepack pnpm check:architecture
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
```

Read [CONTRIBUTING.md](CONTRIBUTING.md) for verification/release boundaries and [CONSOLIDATION.md](docs/CONSOLIDATION.md) for source snapshots, routing, preview safeguards and cutover/rollback steps. Use the architecture guide as the current code map. Earlier beginner/frontend guides and consolidation snapshots are historical where they differ from it.

The owner has an Eco-Tourism Business Plan, but its original file has not been located in this checkout. Do not invent or overwrite its assumptions. AVES is pursuing B Corp certification and is not certified. Preserve factual claims, community attribution, privacy choices, media licences and responsible wildlife guidance.
