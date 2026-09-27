# Development and preview workflow

Use the pnpm version pinned in `package.json` and commit `pnpm-lock.yaml` with dependency changes. Do not generate an npm or Yarn lockfile. Vercel already uses pnpm for this repository.

The dependency overrides replace vulnerable CSS/build-tool versions with compatible updates. Next.js 15 pins an older PostCSS internally, so `next>postcss` shares the patched direct dependency. Recheck `corepack pnpm audit` and the production build before removing overrides or upgrading the framework. An audit with no findings covers known package advisories, not application security.

## Local checks

1. Create a feature or repair branch from the current `main`.
2. Install with `corepack pnpm install --frozen-lockfile`.
3. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in an untracked `.env.local`, using a test Supabase project. Never commit credentials or reuse a service role key as a public key.
4. Run `corepack pnpm build`, then `corepack pnpm start`.
5. Check Region, Species and Tour Type discovery, tour comparisons, trip planning and contact pages on desktop and mobile.

The existing Next.js configuration skips TypeScript and ESLint checks during builds. A successful build alone is not a complete quality or security sign-off. `corepack pnpm exec tsc --noEmit` can be used to inspect the separate TypeScript backlog.

## Vercel previews and release

Push the branch and open a draft pull request against `main`. Review the Vercel **Preview** deployment for `v0-company-landing-page`, the project connected to `aves.bio`; another project named `aves` also builds this repository.

Verify the deployment is marked Preview and points to the repair branch and expected commit before testing. Use test services for any submissions; do not send real enquiries or create production records during checks.

Record build results, desktop/mobile checks and any remaining limitations on the pull request. Merging to `main`, promoting a deployment or running a production deployment requires Martin's separate explicit approval. Domain, DNS, payment and destructive settings also require separate approval.
