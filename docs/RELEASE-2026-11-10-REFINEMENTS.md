# Approved AVES refinement release, 10 November 2026

Owner explicitly requested publishing all prepared changes live after accepting the
previews. This authorises the two maintained applications' refinement release.
It does not select unified-app cutover, project retirement or test-fixture release.

Main source combines map style, photo zoom/short-screen fix, invitations,
scroll-responsive local flock, manual-call following, origin filters, sea context,
place ideas/copy notes, guarded B Corp source preparation and regional logos.
Australia combines map enlargement/style, private checklist thumbnails, origin
filters, explicit place-note import and regional logos. No API/schema/auth/provider
or billing change is included. B Corp layer stays off without eligible locations.

183 main and315 combined Australia automated checks pass, strict TypeScript and
complete builds pass. Regional-logo hosted checks are recorded separately; the
combined Australia map/style candidate receives a final hosted check before release.
No synthetic planner route or transport override is included in maintained code.
Physical device and actual private candidate persistence checks remain limited as
recorded; earlier live private planning remains available. No guest records are
used in public evidence.

Rollback deployments before release:
- Main: dpl_8TFWkxR8BVDmgTzDmHRpxcypMTpi, runtime a3445b7.
- Australia: dpl_DX5Rx141ExqZsMRE4PBfVg9jEZDg, runtime34037f0.
Git recovery branches: checkpoint/2026-11-10-before-refinements-main and
checkpoint/2026-11-10-before-refinements-au. Preserve custom routing and protection.

Publish the tested Australia source first, then main, and verify live routes,
controls/assets, public-to-account entry and scoped runtime errors. Roll back the
affected application if an essential regression appears. US$1 on-demand budget and
automatic pausing stay enabled; subscription fees are separate.

## Published and verified

Both applications were published with the owner's explicit approval on10 November2026.

| App | Live source | Production deployment | Verified alias |
| --- | --- | --- | --- |
| Main |4e4e7f3f03f3f8b4982d37884c03173d9bea9086|dpl_87fCw4BSLvttUrdzUK2AFKTsr1xP|https://aves.bio/|
| Australia/shared |48722c870a6f804ef964280e41e5ddc985658f1c|dpl_FYT3WsL52euwC46SYq2tFRsKtqDB|https://aves.bio/australia|

Both builds READY with production target. Exact stable-alias deployment records
match these source hashes. Both maintained Git branches contain the released
feature heads; PR ancestry was checked before cleanup. Recovery checkpoints preserve
the prior maintained branches and prior production artifacts remain available.

Combined Australia preview: Tasmania selection, enlargement, zoom to1.3×, reset
to1.0×, attribution, Escape/focus return and matching regional logo context passed.
Live Australia: new map controls and enlargement present and usable; Western
Australia selection changes header/footer identity to Zanda latirostris.

Live main: South Island Otago/Catlins selection changes header/footer to hoiho;
origin filter shows35 introduced entries; public place-note add/text/copy control
and removal were exercised, and test choices were removed. The photo dialog opened
with source-resolution controls (zoom may correctly disable at available native
pixels). Return through the AVES home link reached the global homepage. The loaded
country bird faces right. Public account handover reached sign-in with exact NZ/
South Island next preserved. No credentials, real guest plans or hosted saves used.

Production runtime error/fatal queries for each exact deployment returned no
matching records in15-minute windows ending12:55 UTC. This is a short scoped scan,
not continuous monitoring. Browser error samples were extension metadata errors
from chrome-extension URLs, not application errors.

Main live screenshot: docs/evidence/2026-11-10-live-refinements.png.
Earlier preview screenshot/acceptance documents retain broader source interaction
evidence. Not every feature/region was separately re-exercised live. Physical
Safari/touch, dynamic OS preferences and some audio-failure/interruption cases
remain unverified. The new private-delta persistence check remains for suitable
test-account coverage. Do not describe the existing delivered private pilot as
unavailable. B Corp source guard is live; eligible pins remain zero/layer off.
No unified cutover, synthetic fixture, paid provider or new account was published.
