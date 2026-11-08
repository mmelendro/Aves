# Editing and releasing AVES

This integration branch runs one application with all destination routes and the shared account backend. Read [CONSOLIDATION.md](docs/CONSOLIDATION.md) and the top of [CONTINUE-HERE.md](CONTINUE-HERE.md). Do not base consolidation on stale `main` or directly merge the two old application roots.

## Local development and verification

Use Node.js 22 and `corepack pnpm` 10.34.5. Install with `corepack pnpm install --frozen-lockfile --ignore-scripts`. All routes run at one origin with `corepack pnpm dev`; `/australia` is an explicit route prefix, not a Next.js basePath.

Use `.env.example` for configuration names. Keep values in untracked `.env.local` or private provider configuration. Public pages do not require service secrets. `VERCEL_ENV=preview` disables sign-in, confirmation exchanges, enquiry submissions and private API writes for review. Preview indexing is disabled. Do not use real guest data or send mail merely to test a layout.

Before a functional commit:

```sh
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
```

Stop a local dev server before building in the same checkout. Build skips ESLint; a successful build alone is not a full review. Tests use local doubles for database/auth/email boundaries. They do not prove real provider behaviour. Review affected routes on desktop and phone-sized viewports, including links, keyboard controls, media, credits and absence of horizontal overflow.

## Publication

Git automatic deployments stay disabled for the entire repository. Push the integration branch, build the exact commit explicitly as a Vercel **Preview**, inspect it, and record the commit/deployment and remaining limits. Neither a Git push nor merging a draft PR authorizes changing `aves.bio`.

Use the existing `aves-australia` project's Preview environment for review, retaining its current configuration without copying service secrets to a new project. Leave its name/hostname unchanged while the current global production app still depends on it. At separately approved cutover, the one retained production project can be renamed `aves-web` after dependent hostnames/integrations are checked. Package/project names describe infrastructure; page content, established URLs and accurate metadata serve visitors and search engines.

Production cutover, project retirement, domain/DNS changes, customer-data operations and billing changes require their applicable authorization. Record rollback before cutover and keep both previous production deployments available until sign-in, session continuity, saved plans, enquiries and owner permissions have passed approved live checks.

## Dependencies and data

Preserve `pnpm-lock.yaml` and the reviewed security overrides. Never introduce npm/Yarn lockfiles or expose provider credentials in source, output or screenshots. Existing migrations are history, not scripts to rerun. This consolidation adds no schema changes and must preserve the shared database, stable record IDs, RLS and immutable submissions/proposals.
