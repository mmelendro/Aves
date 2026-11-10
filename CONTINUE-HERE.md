# AVES continue here

Latest checkpoint, 10 November 2026. Fetch current GitHub refs before editing.
Read docs/ACCEPTANCE-2026-11-10-PHOTO-PLACE-IDEAS.md and docs/AGILE-PLAN.md.
All work remains preview/draft source. Production is unchanged and publishing is
not approved.

## Main-app source stack

PR #13 map style -> #14 photo zoom -> #15 invitations -> #16 scroll flock ->
#17 call following -> #18 origin filters -> #20 sea context -> #21 short-screen
photo controls -> #22 place ideas. Current code1533eca4 on feature/place-ideas.
176 tests, strict TypeScript and complete production build pass. Local and remote
commits have different metadata but changed code blobs match; use remote PR heads.

## Independent private-app stack

PR #11 private thumbnails -> #19 origin parity -> #23 explicit place-note import.
Current code425fa33e on feature/private-place-notes.307 tests, strict TypeScript
and full production build (25 pages) pass. Synthetic editor/mock-API checks cover
explicit import, preserved notes, failed-save retention, confirmed-save consumption
and reopened notes. Actual signed-in hosted save/reopen is still unverified.
Australia map controls PR #12 remains separate; do not mix application stacks.

## Browser acceptance

Owner explicitly approved read-only AVES Vercel preview testing for project
prj_ZKEHgaFrywRyoEo9IfSFcln9k8pv (v0-company-landing-page). Access works; do not
ask the same approval again. This does not authorise production publishing.
Prior desktop photo/call/filter/flock/sea checks are recorded in
ACCEPTANCE-2026-11-10-APPROVED-PUBLIC-PREVIEW.md.

The short-screen overlap is corrected and exact hosted340x234 reflow passed on
fa81e950/dpl_fYvn3jWsgFUAtmiJ6cppQsp6QkFu. Zoom targetsy167-211, heart65-109,
close64-108, scrollWidth337.172 tests, TypeScript and build passed. Escape restores
focus. Physical touch/exact320/390px remain unverified.

Public place ideas1533eca4/dpl_2RyenwQuGhguoTSVmspmtr1H8Mz6 built READY and passed
hosted add/remove, landscape changes, same-tab reload retention and native account-
link checks. Two synthetic public tab choices were cleared after testing.
https://v0-company-landing-page-elkszykg6-mmelendro-9273s-projects.vercel.app/new-zealand/south-island

## Next useful work and gates

Finish same-origin public-to-private candidate handover and real private save/reopen
before releasing the paired place-note increment. The basket contains only public
IDs for a day and is not a private-save receipt. The editor explicitly appends
readable ideas to the existing message field; no structured placeIds/schema or
migration was added. Never silently overwrite notes or claim cross-host transfer.
Broader media interruption, physical Safari/pinch and private-shell tests remain.

B Corp map-layer source/access assessment remains queued; eBird awaits written
commercial permission. C3 safe staging/C4 cutover/C5 retirement remain separate.
Preserve independent maintained apps, rollback sources, original artwork/credits
and private guest data. No paid AI, new providers/accounts, imports or billing
changes. Keep the verified US$1 on-demand budget and automatic pausing enabled;
Pro fees are separate. Shell Git push is403-blocked; connected GitHub saves tested
source trees. Documentation-only commits may be newer than code runtimes above.
