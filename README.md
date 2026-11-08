# AVES

One Next.js application for the global homepage, Colombia, Australia, New Zealand and the shared AVES account portal. Public brand: AVES. Public domain: [aves.bio](https://aves.bio). Package: `aves-web`.

This is the **AVES-020 integration branch**, `integration/aves-unified-2026-11-08`. It is a review candidate, not the currently published production architecture. Read [CONSOLIDATION.md](docs/CONSOLIDATION.md) before releasing. Production still uses the two deployments recorded in [CONTINUE-HERE.md](CONTINUE-HERE.md).

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
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
```

Read [CONTRIBUTING.md](CONTRIBUTING.md) for verification/release boundaries and [CONSOLIDATION.md](docs/CONSOLIDATION.md) for source snapshots, routing, preview safeguards and cutover/rollback steps. Earlier beginner/frontend guides describe the two-app production arrangement and are historical where they differ from this branch.

The eco-tourism business plan is still to be created. AVES is pursuing B Corp certification and is not certified. Preserve factual claims, community attribution, privacy choices, media licences and responsible wildlife guidance.
