# AVES Colombia — live handoff, 6 November 2026

The shared AVES account and country-aware inquiry system are now live. Colombia and Australia remain separate public applications, using one account/backend.

## Current production

- Repository: https://github.com/mmelendro/Aves.
- Colombia branch and verified Vercel production branch: `webmaster/readiness-2026-11-05`.
- Colombia project: `mmelendro-9273s-projects/v0-company-landing-page`.
- **Live Colombia code: `731c871`; deployment: `dpl_G5yHCqQ5PXfk1KVJHMvBamH6hC9k`.**
- Public: https://aves.bio/. Exact deployment: https://v0-company-landing-page-ltdx9ntqo-mmelendro-9273s-projects.vercel.app.
- This final Colombia deployment was rebuilt and promoted after obsolete environment removal. It supersedes the earlier same-code deployment and all previous redesign/hotfix releases.
- **Live Australia/shared portal code: `caa1d01`; deployment: `dpl_275hNaQAeiofr3BsQjL6NX7P8BYo`.**
- Public: https://aves.bio/australia. Exact deployment: https://aves-australia-oktxnqfwi-mmelendro-9273s-projects.vercel.app.
- Australia branch/project: `australia/preview` / `mmelendro-9273s-projects/aves-australia`. Keep independent histories/checkouts and preserve branch-specific deployment guards.

## One account and maintained backend

The user explicitly chose one AVES account/database for both countries and abandoned migration of old Colombian account data.

- Shared project: **AVES Shared Accounts**, reference `qeyprwftrouztlqmwuzv`, healthy in Sydney. Its project display name was verified.
- Shared migration `20261106113240_shared_country_plans_and_contacts.sql` is applied. Hosted rollback verification passed without changing the pre-existing rows.
- The shared portal supports signup/sign-in, country-specific saved plans, quote requests and owner-issued priced proposals. These are not instant reservations or payments.
- Colombia's legacy account routes redirect to `/australia/account`; My Trips is available in desktop/mobile navigation, the footer and region guides. Safe country/region presets survive entry into the portal.
- Old Colombia auth clients, conflicting profile/booking models, document collection and mock checkout are retired. `/shopping` leads to personal inquiry with recognised presets preserved.
- The old project `krzmqusxxrfljjkdbklx` and unused empty replacement `gfxirgzvbpytgfffolhj` **still exist**. Their deletion is pending the action-time user confirmation already requested. Do not claim deletion or resume the abandoned data migration.

## Inquiries and configuration

The Colombia form submits to same-origin `/australia/api/contact`, explicitly identifying Colombia and its selected regions. Updates consent is separate and optional. Unchanged retries reuse a UUID; success requires a stored receipt confirming Colombia. The legacy `/api/contact` is a bounded compatibility proxy without database/email credentials.

After cutover and verification, **18 obsolete Colombia environment entries were removed**. Only the application setting `NEXT_PUBLIC_SITE_URL` remains. The initial pre-cutover removal attempt was blocked by automatic approval review; the safer post-cutover retry was allowed. The final Colombia deployment was rebuilt without the old secrets. Shared-app credentials were unchanged.

Removing environment entries **does not revoke old external-provider keys**. Review/revoke any obsolete provider credentials separately when their remaining dependencies are understood. Never print or commit them.

SMTP sender branding is AVES and persistence was verified after reload. Generic AVES authentication templates preserve their existing links; all four configured security-alert switches persisted. The shared project's display-name change does not change its reference or credentials.

## Verified release evidence

- Colombia: **61 automated tests pass**, full strict TypeScript check and production build pass. Australia/shared app: **191 tests**, strict type checking and production build pass.
- Both public releases were verified after publication; local, staged and public navigation were checked.
- A controlled Colombia draft was saved, reloaded and verified in the database with country Colombia and region `central-andes`. That exact temporary draft was subsequently deleted by guarded SQL.
- A clearly labelled internal Colombia inquiry returned stored success and reached the owner's Gmail inbox with country Colombia, `central-andes` and updates consent false. **One labelled internal test inquiry is retained.**
- The public probe examined 34 JavaScript bundles: only the shared `qeyprwftrouztlqmwuzv` Supabase host was found, with no private-key patterns. Unauthenticated private APIs returned 401; configuration probes returned 404; security headers were verified. This is scoped verification, not a claim that every vulnerability is excluded.
- At 390px mobile width, changing country switched between 9 Australian and 11 Colombian region choices, cleared incompatible selection and caused no horizontal overflow.

Colombia's 22 bird profiles, credited real media, 14 recording links with provenance/rights notes, 37 local bird selections across 11 regions, map, carousels, credits and public sitemaps remain intact. Preserve missing-call notices and legacy-media limitations.

## Remaining operational limits and next steps

- Supabase Free remains selected. Paid managed backups and leaked-password checking are not enabled. Establish an available export/recovery process; do not describe backups as configured.
- Security alerts do not establish owner MFA enrollment. Complete or verify enrollment separately.
- Requests/proposals may be saved while their email notification is pending or failed. Provider acceptance is not final delivery. Unchanged browser retries do not resend notifications; operational review/retry remains necessary when delivery is unavailable. No unattended retry worker is established.
- Resolve the pending deletion confirmation for the two unused Colombian projects, then verify any authorised deletion. Keep shared project `qeyprwftrouztlqmwuzv` intact.
- Preserve exact `/australia` and descendant forwarding to `https://aves-australia.vercel.app`, including the prefix. Do not broaden routing over Colombia's assets/API or change DNS.
- Historical SQL in `scripts/` is archived review evidence, not deployment instructions. See `docs/shared-accounts.md` and nonsecret `.env.example` for architecture/configuration; any release-order discussion there describes the completed cutover sequence.

Contact: `mmelendro@gmail.com`. AVES is pursuing B Corp certification, not certified.

Use Node 22 and pinned pnpm 10.34.5; frozen installs with lifecycle scripts disabled, automated tests, strict type checking and production builds remain required. ESLint is still a separate unchecked build step. Never disable package-integrity checks or commit credentials, private environment files, customer data or hosting-auth files.
