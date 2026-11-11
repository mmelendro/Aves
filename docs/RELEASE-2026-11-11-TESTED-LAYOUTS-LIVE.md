# Tested layout changes published

11 November 2026. Owner explicitly authorised publishing all tested changes live.

## Release

Runtime source: c0ac3b23a464184d58802096abbcd240b7631df4. Source tree: 747e5596b88aaea26350bb70a7608ddefde314ac. Branch: feature/field-guide-card.
Production deployment: dpl_4TidxhEacYS6YDymtCw6Ss7HMy1G, READY, target production, Node 22 project prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv (aves-australia), team team_Th6ddqWyWKU1mLzTbJPlduDx, account mmelendro@gmail.com.
Unique deployment: https://aves-australia-ike80x1fo-mmelendro-9273s-projects.vercel.app .
Both https://aves.bio and https://www.aves.bio are verified aliases of this deployment.

Includes all tested changes since the preceding live release: shared Colombian navigation/footer and Spanish switch, About/Travel Tips headings, eight editorial/legal layouts, cookie menu consolidation, narrow CTA wrapping, shared article headings/main targets/breadcrumbs, shared account header/footer with global identity, and reconciled minimatch 11.0.6 overrides. Existing combined maps, country pages, accounts/APIs and media remain included.

## Validation

Project-pinned pnpm 10.34.5 frozen install, 524 automated checks, strict TypeScript and local 75-page build passed before release. Exact pinned production build passed on Vercel. Production preflight returned HTTP 200 for sign-in, cookies and robots.txt. Preview notice was absent and data-read-only-preview=false; public robots allow crawling while private/API paths remain excluded.

After alias reassignment, live browser checks verified the new deployment asset ID on global home, Colombia, Australia, New Zealand, Cookies and a birding article. Travel Tips rendered the new heading during the live narrow check. Account sign-in changed from its earlier 73px frame to the shared 132px header. Its Sign In button is enabled; no login was attempted. No live page showed the preview notice. www home uses the new assets, read-only=false and index/follow metadata.

Chromium desktop (1363px) checks found no horizontal overflow on the inspected country/editorial pages. Native zoom produced 340px width: account sign-in, Travel Tips, Cookies and Conservation all retained 132px headers and no horizontal overflow. Live Colombia Spanish menu rendered Destinos, Cómo funciona, Mis viajes and Mapa del sitio; Escape restored Abrir menú de navegación focus and there was no overflow. Language was returned to English and browser zoom reset.

Vercel error/fatal runtime log query scoped to this production deployment returned no matches in the ten-minute window ending 2026-11-11T03:16:45.091Z. This is a scoped post-release scan, not a promise that every application path is error-free.

## Limits and rollback

Physical phone/Safari, exact 320/390px, real Google/password sign-in, signed-in dashboard/owner-inbox visual journeys, live private save/reopen and actual email delivery remain outside this release acceptance. Earlier automated private-workflow coverage is preserved. No database migration, customer-record edit, provider/billing configuration, real email, AI request, payment or project deletion was performed.

Rollback target: runtime 3562ba23849b47218bf5138687446164b88b4d77 / deployment dpl_5MtafKNyQ2uxi3Em7hcBtt7rWzb5. Reassign both live aliases together if rollback becomes necessary. Keep the old Vercel projects until the separately recorded project-domain registration move is complete; publishing this release does not retire them.

Continue remaining custom/special-route and authenticated visual coverage, the guided public contact flow, deeper Spanish explorer copy and source-backed range/endemic/B Corp work.
