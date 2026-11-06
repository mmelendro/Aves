# AVES Australia and shared AVES portal — live handoff, 6 November 2026

The shared account/backend for Colombia and Australia is now live. The two public websites retain separate applications and Git histories.

## Current production

- Repository: https://github.com/mmelendro/Aves.
- Australia branch/project: `australia/preview` / `mmelendro-9273s-projects/aves-australia`.
- **Live Australia/shared portal code: `caa1d01`; deployment: `dpl_275hNaQAeiofr3BsQjL6NX7P8BYo`.**
- Public: https://aves.bio/australia. Exact deployment: https://aves-australia-oktxnqfwi-mmelendro-9273s-projects.vercel.app.
- **Live Colombia code: `731c871`; final deployment: `dpl_G5yHCqQ5PXfk1KVJHMvBamH6hC9k`.**
- Public: https://aves.bio/. Exact deployment: https://v0-company-landing-page-ltdx9ntqo-mmelendro-9273s-projects.vercel.app.
- Colombia branch and verified Vercel production branch: `webmaster/readiness-2026-11-05`; project `mmelendro-9273s-projects/v0-company-landing-page`.
- The final Colombia deployment was rebuilt/promoted after obsolete environment cleanup and supersedes the earlier same-code deployment, redesign release and urgent hotfix.
- Preserve independent checkouts/histories and branch-specific deployment guards. A shared backend does not mean merging the public applications.

## Shared account/database

The user explicitly chose one AVES account/database and abandoned old Colombian data migration.

- The retained project is **AVES Shared Accounts**, reference `qeyprwftrouztlqmwuzv`, healthy in Sydney; its display name was verified.
- Migration `20261106113240_shared_country_plans_and_contacts.sql` is applied. Hosted rollback verification passed without altering pre-existing rows.
- Earlier contact, accounts/quotes, draft-quota/default-privilege and client-column migrations remain applied. Preserve owner checks, immutable submitted/issued snapshots, trusted owner membership, explicit projections and least-privilege grants.
- Signup/sign-in, saved country-specific plans, quote requests and owner-priced proposals now serve both countries. There are no instant reservations or payments.
- Colombia links enter `/australia/account?country=colombia&region=<canonical-slug>`. Safe auth returns use unprefixed `next=/account?country=colombia&region=...`; arbitrary external destinations remain invalid.
- Country-aware contact validates that country's regions and records separate explicit updates consent. Colombia requires a stored receipt explicitly confirming Colombia; Australian consent compatibility is preserved.
- The old paused project `krzmqusxxrfljjkdbklx` and unused empty replacement `gfxirgzvbpytgfffolhj` **have not been deleted**. Deletion awaits the action-time user confirmation already requested. Do not restore the superseded separate-Colombia migration plan.

## Verified release and email state

- **191 shared/Australia tests and 61 Colombia tests pass.** Both full strict type checks and production builds pass.
- Both public releases, local/staged/public navigation and country-aware account entry were verified.
- A controlled owner Colombia draft was saved, reloaded and verified with region `central-andes`; the exact temporary draft was deleted afterward using guarded SQL.
- A clearly labelled internal Colombia inquiry returned stored success and reached the owner's Gmail with country Colombia, `central-andes` and updates consent false. **One labelled internal test inquiry remains stored.**
- A probe of 34 public JavaScript bundles found only the shared Supabase host and no private-key patterns. Private APIs returned 401 without authentication, configuration probes returned 404 and security headers were verified. This is bounded evidence, not a comprehensive security guarantee.
- At 390px mobile width, country switching changed 9 Australian to 11 Colombian region choices, reset incompatible selection and showed no horizontal overflow.
- Vercel `CONTACT_FROM` and Supabase SMTP sender branding use AVES. SMTP persistence was verified after reload. Generic AVES auth templates retained their existing links; all four configured account-security alert switches persisted.
- After the verified cutover, 18 obsolete Colombia environment entries were removed; only its `NEXT_PUBLIC_SITE_URL` application setting remains. Automatic review blocked the earlier pre-cutover attempt, then allowed the safer retry. Colombia was rebuilt without those secrets. **Shared-app credentials were unchanged.**
- Environment removal does **not** revoke old external-provider keys. Any obsolete-key revocation requires its own dependency-aware review.

## Public content and routing

Australian content remains intact: twenty sourced bird profiles, genuine credited photographs, seventeen licensed recordings, nine regional guides and 39 local bird selections. Preserve accurate local versus wider range notes, introduced-species labels, missing recordings and user-initiated audio.

The fixed Next base path is `/australia`. Native assets/API requests use `sitePath`; internal Next links remain unprefixed. Native anchors cross between the separately deployed apps. Colombia forwards exact `/australia` and descendants to `https://aves-australia.vercel.app`, preserving the prefix. Do not remove those rules, broaden them over Colombia's assets/API or change DNS.

The Colombian public app has retired its old auth/profile/booking/document clients and mock checkout. It links to this maintained shared portal; legacy account paths redirect and old shopping links lead to personal inquiry.

## Remaining operational limits and next steps

- Supabase Free remains selected. Paid managed backups and leaked-password checking are not enabled. Establish an available export/recovery approach; backups must not be described as configured.
- Security-alert switches do not prove owner MFA enrollment. Complete or verify enrollment separately.
- Durable requests/proposals can have pending or failed notifications. Provider acceptance is not final delivery. Unchanged browser retries do not resend notifications; review and retry failures operationally. No unattended email retry worker is established.
- Await the pending action-time answer before deleting the two unused Colombian projects; verify any authorised deletion afterward. Keep `qeyprwftrouztlqmwuzv` intact.
- Preserve verified signup/recovery links, cookie/routing behavior and country-aware permissions in future changes. Never change the real owner's password during QA.
- Record future deployed commits/IDs only after successful public verification.

Contact: `mmelendro@gmail.com`. AVES is pursuing B Corp certification, not certified. Preserve the emerald palette, rounded cards and real bird media.

Use Node 22 and pinned pnpm 10.34.5: frozen install with lifecycle scripts disabled, tests, strict type checking and production build. Keep credentials, private environment files, customer data and hosting-auth files out of Git and chat; never print recovery tokens or disable package-integrity checks.
