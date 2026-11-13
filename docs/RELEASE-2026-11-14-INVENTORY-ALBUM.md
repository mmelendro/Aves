# Inventory album increment

## Scope

`e63e65e` changes national inventory and search results into visual cards. Each bird retains its stable identity, source records, filters and pagination; the card opens habitat/place/source detail with a native keyboard-operable disclosure. Directory photographs use contain framing. Australian directory cards include the existing wishlist control.

Conservation labels reuse the existing dated snapshot. Verified global categories, national classifications and their sources remain distinct. Missing assessments say “Status not verified”. This increment does not add species, fill regional occurrence gaps or claim complete conservation coverage.

`231e8e9` combines each destination search photo and heading into one link, removing a redundant keyboard stop and resolving the ambiguous-link browser failure. Original photograph sources remain separate links inside the details.

## Verification

Nine species-reference tests and local typecheck passed. The local production build passed. Twenty-six representative inventory/accessibility checks passed across phone and desktop (one deliberately excluded viewport combination). A further two inventory screenshot journeys passed. Local checks include the separately uncommitted region-label draft; exact-commit CI establishes the release scope.

Initial candidate CI 43460650035 passed all non-browser gates and 155 browser checks, but failed the two search navigation checks because the new photo and title produced duplicate matching links. Corrected candidate CI [43462694524](https://github.com/mmelendro/Aves/actions/runs/43462694524) is pending full browser completion. A development-mode attempt was inconclusive because repeated development compilation prevented the cookie banner from appearing; it does not replace production-build checks.

## Exact candidate acceptance

Corrected commit `231e8e9d819294e8a1aa3464f3654b0f2e05490d` passed CI 43462694524: 777 unit tests, all source/build/performance gates, 33 priority browser journeys and 157 full-suite browser checks (185 intentionally excluded project combinations). Both search navigation checks and the new inventory journeys pass. Production deployment `dpl_2eyPYqT6PZu3wvGbuuXu9kH9AJhu` has been requested for that exact commit; build and live verification are pending.

## Release state

Published to both `aves.bio` and `www.aves.bio`: READY deployment `dpl_2eyPYqT6PZu3wvGbuuXu9kH9AJhu`, exact commit `231e8e9d819294e8a1aa3464f3654b0f2e05490d`. The prior repair deployment `dpl_2FaQN8WrWeWz7UeGGEn8wcyoXZMC` at commit `57d811f` is the rollback target.

Live checks passed at 390px and 1365px: Colombia, Australia and NZ inventories return HTTP 200 with 40 records on the initial page and no horizontal overflow; production is not read-only. Kea shows the recorded Endangered category with an accessible source disclosure. Spanish El Dorado search has one destination link and opens the correct Sierra Nevada context. No forms were submitted. The deployment-scoped ten-minute error/fatal runtime count returned no rows.

The region-aware logo, additional full-inventory entry links, recovered team, creator album, navigation refinements, admin cleanup and remaining roadmap are outside this candidate.
