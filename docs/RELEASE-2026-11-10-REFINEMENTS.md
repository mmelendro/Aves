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
