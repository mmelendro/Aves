# AVES Colombia — handoff, 6 November 2026

This checkout contains the full Colombian application and the completed local bird/region redesign. The readiness branch has not yet replaced the urgent hotfix currently serving https://aves.bio/.

## Select the correct source and release

- Repository: https://github.com/mmelendro/Aves.
- Colombia branch: `webmaster/readiness-2026-11-05`; Australia branch: `australia/preview`.
- Keep separate checkouts and independent histories. Do not merge the Australian application into Colombia or `main`.
- Colombia hosting project: `mmelendro-9273s-projects/v0-company-landing-page`.
- Current public Colombia code: urgent hotfix `1c9038d`; deployment: `dpl_6D1i9xctR1qzXGxQDRa8KuzSKMz4`.
- Australia is published separately at https://aves.bio/australia from `88601b6`, deployment `dpl_96tkV7vQzoJYAVJLQTZSvu1SuFFc`, in `mmelendro-9273s-projects/aves-australia`.
- Preserve the branch-specific automatic-deployment guard in `vercel.json`. A GitHub backup is not an intentional release.

## Completed local implementation

- Homepage, navigation, mobile menu, footer, `/how-it-works`, species directory, credits and regional pages preserve the AVES visual style.
- The catalogue is complete: 22 bird profiles, genuine credited photos, 14 licensed recordings and 37 sourced local selections across all 11 regions. `content/birds.ts`, `content/regions.ts`, their catalogue and credit manifests, and the local media now exist. These are no longer missing-build blockers.
- The shared carousel displays regional collections and local occurrence alongside wider species ranges. Leave unavailable audio absent; never substitute another species or invent a recording licence.
- The active `components/colombian-birds-explorer.tsx` retains the existing map artwork and marker geometry. Its descriptions and bird labels now derive from the sourced catalogue; unsupported old totals, seasonal claims and Central Andes highest-peaks wording were removed.
- Every map region links to `/regions/{slug}` and `/contact?region={slug}` through `lib/region-links.ts`. The form maps canonical slugs to its checkbox choices; `/regions/cauca-river` remains a legacy redirect.
- Public XML and human sitemaps, per-page canonicals and footer discovery links are implemented. Private/auth/API routes are omitted. Robots exclusions are indexing instructions, not access controls.
- Contact mail goes to the configured owner inbox, with `mmelendro@gmail.com` as fallback. Automatic replies to unverified visitor addresses were removed; cross-origin browser requests are rejected. This is not complete bot/rate protection.

Canonical region slugs: `pacific`, `western-andes`, `central-andes`, `eastern-andes`, `cauca-valley`, `magdalena-valley`, `caribbean`, `sierra-nevada-de-santa-marta`, `llanos`, `amazonia`, `colombian-massif`.

## Verification and remaining release work

The full production build passes, but `next.config.mjs` still bypasses global TypeScript/ESLint build validation. A separate full TypeScript check reports 86 legacy errors across 19 files: 41 auth/dashboard/booking contract errors, 18 blog prop/implicit-type errors, 3 shopping duplicate keys and 24 older UI/media/calendar/chart errors. Do not describe this application as globally strict-typecheck clean.

Focused map/routing tests pass 11/11. The active map, its YouTube hero and region-link dependency closure pass strict checking; all 11 marker positions, colors, gradients and icons match the previous artwork configuration. Final release verification must cover the exact staged redesign, including mobile/desktop navigation, all regional carousels, licensed audio, credits and enquiry presets. The public hotfix and local full redesign are distinct releases.

## Colombia database migration — not complete

- New project: `gfxirgzvbpytgfffolhj`. The secure baseline has been applied; there is no application data. This is not an application/data migration or a completed production cutover.
- Old project: `krzmqusxxrfljjkdbklx`. It is paused, not deleted. Backup download is disabled; no usable backup/export is established by this handoff.
- Legacy Colombia account/booking code must not be presented as restored by the empty new project. Verify the account maintenance state and plan the migration before switching connections.
- The owner retained Supabase Free. Managed backups and leaked-password checking are not enabled. Owner MFA still requires enrollment.
- Australia's working accounts, saved plans and proposals use a separate backend and must remain intact.

## Continue safely

1. Review and verify the exact staged Colombia redesign before promoting it; update the release identifiers above only after publication succeeds.
2. Resolve legacy type errors deliberately, prioritizing account/booking contract correctness. Passing a build with disabled type validation is not evidence these paths work.
3. Establish the old-project recovery/export path, complete owner MFA and plan data/auth migration before any destructive operation or backend cutover. Do not delete the paused project.
4. Preserve the Colombian project's exact `/australia` and descendant forwarding rules to `https://aves-australia.vercel.app`, including the upstream `/australia` prefix. Do not change broader routing or DNS.

Contact address: `mmelendro@gmail.com`. AVES is pursuing B Corp certification, not certified. Enquiries lead to personal quotes, not instant reservations or payments.

Use Node 22 and pnpm 10.34.5. Install with `corepack pnpm install --frozen-lockfile --ignore-scripts`; run `corepack pnpm test`, a separate `tsc --noEmit` and `corepack pnpm build`. Credentials, environment files, customer data and hosting-auth files are excluded from Git. Reconnect services securely for backend testing or deployment; never paste secrets into chat or commit them.
