# Editing and releasing AVES

The live combined application serves all destinations and the shared account. Read [ARCHITECTURE.md](docs/ARCHITECTURE.md) and [CONTINUE-HERE.md](CONTINUE-HERE.md). Do not base consolidation on stale `main` or directly merge the two old application roots.

## Local development and verification

Use Node.js 22 and `corepack pnpm` 10.34.5. Install with `corepack pnpm install --frozen-lockfile --ignore-scripts`. All routes run at one origin with `corepack pnpm dev`; `/australia` is an explicit route prefix, not a Next.js basePath.

Use `.env.example` for configuration names. Keep values in untracked `.env.local` or private provider configuration. Public pages do not require service secrets. `VERCEL_ENV=preview` disables sign-in, confirmation exchanges, enquiry submissions and private API writes for review. Preview indexing is disabled. Do not use real guest data or send mail merely to test a layout.

Before a functional commit:

```sh
corepack pnpm check:architecture
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
```

Stop a local dev server before building in the same checkout. Build skips ESLint; a successful build alone is not a full review. Tests use local doubles for database/auth/email boundaries. They do not prove real provider behaviour. Review affected routes on desktop and phone-sized viewports, including links, keyboard controls, media, credits and absence of horizontal overflow.

## Publication

Git automatic deployments remain disabled. Within the owner's existing publication authorization, push the reviewed feature/field-guide-card commit and build that exact SHA on the retained aves-australia project. Test a production-mode candidate through the existing public project alias before assigning aves.bio and www.aves.bio. Do not create temporary access links or weaken deployment protection. Verify both aliases and record rollback, runtime and scoped error checks. Names describe infrastructure, not a separate public brand.

The combined production cutover is complete. Do not deploy either old standalone application over it. Old domain-registration moves/project retirement, customer-data operations, new spend and billing/access changes are separate tasks with their own scope. Existing authorization persists; do not invent a new approval gate for routine tested releases.

## Dependencies and data

Preserve `pnpm-lock.yaml` and the reviewed security overrides. Never introduce npm/Yarn lockfiles or expose provider credentials in source, output or screenshots. Existing migrations are history, not scripts to rerun. This consolidation adds no schema changes and must preserve the shared database, stable record IDs, RLS and immutable submissions/proposals.
