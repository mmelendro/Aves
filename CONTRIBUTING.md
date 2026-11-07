# Editing and releasing AVES

Start with [the beginner's guide](docs/BEGINNERS-GUIDE.md) and [CONTINUE-HERE.md](CONTINUE-HERE.md). The latter identifies the current release. The two maintained branches are independent applications: `webmaster/readiness-2026-11-05` and `australia/preview`. Work from the appropriate current branch, not an assumed up-to-date `main`, and do not merge the two applications.

## Local development

Use Node.js 22 and pnpm 10.34.5 as used by the project. Install from the committed lockfile:

```sh
corepack pnpm install --frozen-lockfile --ignore-scripts
```

In the Australian checkout, `corepack pnpm dev` runs http://127.0.0.1:3000/australia. In the root/global checkout, use `corepack pnpm exec next dev --hostname 127.0.0.1 --port 3001` to preview http://127.0.0.1:3001. The root app forwards local Australian/account requests to the server on port 3000. Review each public application directly when checking its own assets.

The root/global application does not need database credentials for public pages. The shared Australian account backend uses private environment configuration; see its `.env.example` and backend guide. Keep actual values in an untracked `.env.local` or provider settings. Never paste private keys into code, comments, screenshots or GitHub. Use labelled test data when a test needs storage; routine styling reviews need no real form submissions.

## Before saving a functional change

```sh
corepack pnpm exec tsc --noEmit
corepack pnpm test
corepack pnpm build
```

The Australian branch also offers `corepack pnpm typecheck`. Stop the development process before building in the same checkout, since both use `.next`. Both applications use TypeScript checks; the root configuration skips ESLint during the build, so a build alone is not a complete review. Tests use local doubles where documented and do not prove every live service still works.

Review changed screens on desktop and mobile. Check keyboard focus, image crops, licensed media credits, sound controls and links. For account/backend changes, check ownership, validation, redirects and durable saved-state behavior. Do not send real emails merely to test a cosmetic change.

## GitHub and publication are different steps

Commit reviewed changes and push the correct branch. Automatic Git deployments are deliberately disabled. A GitHub push preserves the code online but does not publish it. Deploy the corresponding Vercel project, inspect its build/preview, then promote the reviewed release when publication is authorized. Update `CONTINUE-HERE.md` with the deployed application commit and exact deployment URL. Documentation-only commits may subsequently advance the branch head.

Do not enable automatic deployment, change provider credentials, run database migrations or modify customer records as part of routine content/style work. Existing approved scope governs release actions; deployment approval is not permission for unrelated billing or destructive changes.

## Dependency and database maintenance

Keep `pnpm-lock.yaml` with dependency changes; do not introduce npm/Yarn lockfiles. Dependency overrides retain reviewed compatible security patches. Recheck known advisories and production builds before removing overrides. An advisory scan is not proof of application security.

Existing SQL migrations are history, not scripts to rerun casually. Read the Australian `supabase/README.md` and use a new reviewed migration for a new schema change. The root application's old `scripts/` and replacement database files are historical material, not the current shared backend setup.
