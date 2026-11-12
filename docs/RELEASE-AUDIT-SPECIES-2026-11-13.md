# Audit and species-reference increment, 13 November 2026 Sydney

## Implemented

- Partners and generic Colombia contact now have the skip-link main target. Partner groups use keyboard-operable buttons with expanded state and consistent heading levels. Three placeholder partner logos use the existing names instead.
- The Australian feather marker delegates to the shared component.
- Explorer history preserves the mounted route while changing country/region query state. Refresh and Back/Forward can restore the same explorer context without switching to a different editorial route.
- Account pages use their compact navigation/introduction shell without importing the public map/gallery shell.
- Node 22.23.5 and pnpm 10.34.5 are pinned. Dependencies are installed locally from the frozen lockfile. ESLint runs noninteractively and is enforced in the build. Minimatch overrides preserve the major versions required by consumers rather than forcing every consumer onto one incompatible major.
- Task 70 has a shared national reference browser at `/species/reference?country=colombia`, `australia` or `new-zealand`. Large national records stay server-side with native GET filters and 40-row pagination. The data pipeline records source editions, hashes, incomplete rows, unknown facts, and explicit regional/place evidence. Existing NZ wish-list IDs and private saving remain unchanged.

## Validation

- 696 tests pass, including seven new source/identity/pagination/evidence-boundary tests. Strict TypeScript and the production build pass.
- ESLint: zero errors, 34 existing warnings. Warnings remain follow-up work, not hidden failures or a dependency-security clearance.
- Source reachability: 399 modules, no unreachable modules within the scanner. This does not establish that every route or branch is useful.
- Production dependency advisory check reports zero known advisories across 218 dependencies at this review. This is a point-in-time advisory check, not a general security guarantee.
- Node 22 frozen-lockfile install passes. The production build generates 77 static pages and the dynamic reference route.
- Local production HTTP checks pass for all three country inventories, pagination, source/country canonical metadata, NZ reviewed place links, Partners and contact main targets. Invalid foreign-region input renders the explicit noindex not-found recovery page without another country's results. With streamed Next rendering, that recovery can have HTTP 200 after headers were sent.

| Build estimate | Baseline | This increment |
| --- | ---: | ---: |
| Sign-in first-load JavaScript | 612 kB | 236 kB |
| Account dashboard | 629 kB | 399 kB |
| Global homepage | 503 kB | 507 kB |
| New national reference page | New route | 175 kB |

These are build estimates, not mobile timing measurements. Homepage and existing planner payload work remains open.

## Open acceptance and data work

The protected hosted candidate could not be inspected because its browser surface required Vercel login. Automatic approval review rejected a fetch method that would create a temporary share link. No access protection was weakened. Local HTTP, unit and build results do not establish hosted visual acceptance, physical Safari touch behaviour or authenticated save flows. Do not claim the candidate is live on the canonical domain solely because its build is READY.

Task 70 is a delivered national-reference increment, not a claim of complete regional inventories or one reconciled global taxonomy. Source coverage and limitations are in [SPECIES-DATA-ROADMAP.md](SPECIES-DATA-ROADMAP.md). Commercial eBird access remains unresolved. Further business connections require independently reviewed evidence and must not turn nearby businesses into species-presence or partnership claims.

The owner requested the full investor/lender business-plan rewrite after independent website changes. The current owner draft is not financially validated or ready for external reliance. No business financials or private traveller records belong in repository release evidence.
