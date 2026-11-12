# Audit and species-reference increment, 13 November 2026 Sydney

## Implemented

- Partners and generic Colombia contact now have the skip-link main target. Partner groups use keyboard-operable buttons with expanded state and consistent heading levels. Three placeholder partner logos use the existing names instead.
- The Australian feather marker delegates to the shared component.
- Explorer history preserves the mounted route while changing country/region query state. Refresh and Back/Forward can restore the same explorer context without switching to a different editorial route.
- Account pages use their compact navigation/introduction shell without importing the public map/gallery shell.
- Node 22.23.5 and pnpm 10.34.5 are pinned. Dependencies are installed locally from the frozen lockfile. ESLint runs noninteractively and is enforced in the build. Minimatch overrides preserve the major versions required by consumers rather than forcing every consumer onto one incompatible major.
- Task 70 has a shared national reference browser at `/species/reference?country=colombia`, `australia` or `new-zealand`. Large national records stay server-side with native GET filters and 40-row pagination. The data pipeline records source editions, hashes, incomplete rows, unknown facts, and explicit regional/place evidence. Existing NZ wish-list IDs and private saving remain unchanged.

## Validation

- 698 tests pass, including seven new source/identity/pagination/evidence-boundary tests and two search-loading/recovery tests. Strict TypeScript and the production build pass.
- ESLint: zero errors, 34 existing warnings. Warnings remain follow-up work, not hidden failures or a dependency-security clearance.
- Source reachability: 400 modules, no unreachable modules within the scanner. This does not establish that every route or branch is useful.
- Production dependency advisory check reports zero known advisories across 218 dependencies at this review. This is a point-in-time advisory check, not a general security guarantee.
- Node 22 frozen-lockfile install passes. The production build generates 77 static pages and the dynamic reference route.
- Local production HTTP checks pass for all three country inventories, pagination, source/country canonical metadata, NZ reviewed place links, Partners and contact main targets. Invalid foreign-region input renders the explicit noindex not-found recovery page without another country's results. With streamed Next rendering, that recovery can have HTTP 200 after headers were sent.

| Build estimate | Baseline | This increment |
| --- | ---: | ---: |
| Sign-in first-load JavaScript | 612 kB | 236 kB |
| Account dashboard | 629 kB | 313 kB |
| Global homepage | 503 kB | 445 kB |
| South Island | 524 kB | 467 kB |
| New national reference page | New route | 175 kB |

These are build estimates, not mobile timing measurements. Homepage and existing planner payload work remains open.

## Checklist-loading follow-up

The existing private/public NZ picker now imports its media-heavy search module only after its native details control opens. Selected chips remain available immediately. Closing the search keeps its loaded filters mounted, while selections remain controlled by the parent. A failed module load exposes a retry without replacing or saving choices. A no-JavaScript link points to the server-rendered national inventory.

`pnpm check:catalogue-loading` inspects the actual emitted route chunks. It confirms reference media still exists in an async module and is absent from the initial homepage, account and two island-planner route graphs. The two additional behavioural tests check removal during loading, reopening, failed loading and retry. Hosted browser acceptance is still separate.

## Open acceptance and data work

Earlier agent-side hosted inspection was blocked by Vercel login, and automatic approval review rejected a temporary-share-link method. No share link was created and no access protection was weakened. The owner then reviewed the supplied build and reported that it looked good. That is owner-reported acceptance, not an independently recorded physical-device or authenticated-save test.

Task 70 is a delivered national-reference increment, not a claim of complete regional inventories or one reconciled global taxonomy. Source coverage and limitations are in [SPECIES-DATA-ROADMAP.md](SPECIES-DATA-ROADMAP.md). Commercial eBird access remains unresolved. Further business connections require independently reviewed evidence and must not turn nearby businesses into species-presence or partnership claims.

The owner requested the full investor/lender business-plan rewrite after independent website changes. The current owner draft is not financially validated or ready for external reliance. No business financials or private traveller records belong in repository release evidence.

## Production release, 13 November 2026 Sydney

Following owner review, both `aves.bio` and `www.aves.bio` were assigned to the reviewed READY deployment `dpl_AZhmj9YyGNkoFqQwXc8fLUjRL5dd`, runtime commit `fd1c588b40f55b36f086382f769737517428028d`. The promotion endpoint reported that it was already the project's production deployment, while the custom domains still pointed to the earlier build. Their explicit alias assignments completed the release. The `aves.bio` alias was read back and confirmed against the intended deployment.

Public, anonymous post-release HTTP checks returned 200 for `/` and `/species/reference?country=colombia`, `australia`, and `new-zealand`. Each inventory response contained the national-source-version content. No private account records or writes were used for these checks.

Rollback reference for both domains: `dpl_3XTdjnTiiJpyZyNGq6r9937ZW2eg`, previously recorded runtime `9f833142281caaeb685cc13483671082396bdfea`. This release made no database changes. Task 70's remaining regional, commercial-data-access and business-evidence work remains open.
