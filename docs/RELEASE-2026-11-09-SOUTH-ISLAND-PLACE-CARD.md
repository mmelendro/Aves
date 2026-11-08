# South Island 3D place-card pilot — 9 November 2026

Published source runtime **3ef94db**, deployment **dpl_CwtAGCjuBe4XdYHw72GKxNrJYwHC**.
Live: https://aves.bio/new-zealand/south-island#places
Tested production candidate: https://v0-company-landing-page-ow655ttgt-mmelendro-9273s-projects.vercel.app/new-zealand/south-island#places
Australia/shared account runtime remains **3f644a1**; no account, database or provider configuration changes.

## Shipped

One Arthur’s Pass card flips between two local landscape photographs and a north-up local map. A stable Photos/Local map toggle remains outside the rotating faces; previous/next photo buttons wrap and retain the chosen photo when returning from the map. Text guidance and the DOC park link remain below both faces. The other three place cards are preserved. This is the selected015/037 pilot, not the full four-place carousel or map-zoom rollout.

Both hidden faces use aria-hidden/inert, keyboard focus stays with explicit controls, a status announces the face, and CSS swaps instantly instead of rotating under prefers-reduced-motion. No autoplay, new map SDK, API key, audio system or booking flow. A noscript note keeps public guidance available.

Map: a checked-in ODbL OpenStreetMap extract of selected roads/rivers and two public village/pass points, generated offline by scripts/generate-arthurs-pass-map.py. Correctly fitted Mercator coordinates, approximate1km reference scale at the map centre, north arrow and attribution. This local diagram has no terrain/park boundaries/tracks, current access conditions or wildlife locations. It is not the existing LCDB habitat map and does not add its queued zoom/scale feature038.

Photos: mountain beech forest/ridges from Devils Punchbowl Walking Track, Mike Dickison (CC BY4.0), and Devils Punchbowl Falls, Alan Liefting (public domain). Commons metadata and DOC place information checked9November2026. WebP renditions total538444bytes; originals/source/licence and display modifications are credited on the card and /credits. The map locates village/pass context, not exact camera positions. Photographs are not current conditions. No unused winter-village test assets were committed.

## Verification and limits

-118 source tests passed, including reversible flip/hidden-face state, photo wrapping/selection retention, media attribution, local Mercator marker/scale checks and existing destination/account-link checks. TypeScript passed; exact hosted production build became READY and was promoted without rebuilding.
-Desktop browser: both faces, two photographs, Enter/Space activation, Tab skipping the hidden photo controls to map attribution, photo retention after flipping, loaded local images and no observed console errors. Native accessibility state also excluded the hidden face.
-Phone-sized layouts: tested narrow layouts including a measured390x844 CSS viewport, smaller widths in the low300s and a short650px frame. Explicit flip/photo controls, retained selection, loaded images, approximately44px controls and no horizontal overflow were checked at stable measured sizes. Browser zoom/resizing made screenshot dimensions unstable; several mobile captures were blank/clipped. Therefore physical iPhone/touch-pinch, native OS reduced-motion and a reliable mobile visual screenshot are NOT independently verified. No pinch/photograph zoom is implemented in this release; it is queued051.
-Live HTTP200 for page, both photographs, /credits, /site-map and /sitemap.xml; live canonical remains https://aves.bio/new-zealand/south-island. Public sitemaps retain the existing route and exclude private account/admin/auth/API entries. No new routes, hierarchy or inventory needed. Protected staged sitemaps checked through the authenticated Vercel CLI; protection was not disabled.
-Live browser verified both directions of flip and photograph2of2. Evidence is local under audit/evidence/nov9-place-card-* (screenshots/logs/HTTP checks); no guest data was used or saved.

## Stop point

Published and paused. Keep Sol medium for the next selected implementation. Do not automatically expand to the other three places or destinations. Next proposed existing item is038 South Island map zoom/pan/reset/accurate scale, subject to owner selection. Full place-card expansion037 remains queued. Latest follow-ups047–052 are planning only: continuous calls; species native/introduced facets; acronym review; flying3D logo birds; optional photo zoom; sourced conservation-project/lodge maps. See NEXT-WEEK-PROMPT.md and ROADMAP-DETAILS.md.
