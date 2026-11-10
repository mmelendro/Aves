# Current unified explorer checkpoint

Main runtime `2c0deea666e7350e6b2e51fc08b65916c36881f4`, deployment `dpl_9i3f5PKdu6DCWUxeASvJysX64sHE`, READY on aves.bio. The South Island and New Zealand entry pages and homepage share one explorer. One rendered map per view, retained existing South Island layers, contextual birds/places/planning, in-place region and world navigation, and private NZ bird basket are preserved. 187 exact-release tests pass; strict TypeScript, full local and hosted builds pass. Desktop browser acceptance and screenshot are in docs/RELEASE-2026-11-11-UNIFIED-EXPLORER.md. Phone-specific acceptance and other country-entry rollout remain next.

The owner made this the urgent priority over contact/glass and the full bird-range/endemic audit. Both pending form/glass source sets are saved on WIP branches listed in that release file. All endemics must be included beyond photographed birds, with authoritative taxonomy and geographic coverage. Do not claim the all-country endemic/range audit complete.

Australia production remains `5bdd33bae0d55f5a202fe4963f692ab27e118cc4` / `dpl_99qgUavb9ArbDhyL5PGRz42MBuPo`. Preserve the separate app. The prior US$1 safeguard was not changed; not freshly inspected in this increment.

Read CONTINUE-HERE.md and docs/AGILE-PLAN.md for the active owner queue.

## Earlier checkpoint

# AVES current handoff

Published 11 November 2026 (Sydney), following the owner's explicit production instruction and subsequent map/listening refinements. Both applications are READY and the exact source hashes below are confirmed.

| Application | Maintained branch | Live runtime | Production deployment |
| --- | --- | --- | --- |
| Global / Colombia / NZ | `webmaster/readiness-2026-11-05` | `094a4e0c255f43dce83da1ac1c69550a892f91cd` | `dpl_AQRa1CBwc6tfAPXFp5nKBF5m6F92` |
| Australia / shared portal | `australia/preview` | `cc1a45d471def6367d4758ad54f820a3a4046adf` | `dpl_7neXSNAYigyDfQgQi4xnAPXuN5iG` |

## Current behavior

One active map viewer per page. The homepage shares its viewer between world, country and region; visible neighbouring regions stay selectable. Dedicated guides navigate to neighbouring guides directly. All map viewers retain full-size/restore controls. South Island places/landscapes connect to the single hero map rather than a second rendered map.

The South Island map has a region-listen button corresponding to bird listening on the photo panel. Bird calls, regional soundscapes, podcasts and videos use one shared player. Region locality and recording credits remain explicit; mountains have no substitute recording. The separate soundscape panel and mixing engine are removed. A stable player host moves into an expanded map and back without restarting audio. Closing/pausing cancels optional bird-follow, and pause/resume retains position.

Curated travel-resource handoff remains paused across reload/app boundaries. Dynamic bird/soundscape sources are never stored and do not restore after reload/app boundary. No media loads before a deliberate request.

## Evidence and limits

182 main tests and 316 Australia tests, strict TypeScript and both complete builds passed. Browser previews checked the complete one-dock audio handoffs, source identity, follow/close behavior, pause/resume, expanded-map controls, regional neighbour navigation, and shared South Island place/landscape state. A 340 CSS-pixel viewport check found no horizontal document overflow; physical Safari/touch checks remain.

Live https://aves.bio/new-zealand/south-island showed no audio before request, then played the verified regional recording in the shared dock. The dock remained in the expanded map, kept its position on restore and paused correctly. Live https://aves.bio/australia played Superb Fairywren through the same player with the correct /australia audio path. Playback was stopped/paused after checking. No visitor/account write, email, booking or payment was made.

Error/fatal scans scoped to both exact deployments returned no matching logs in the 15-minute windows ending 10 November 2026 at 13:49:49 UTC. This is a short observation window, not ongoing monitoring.

Evidence: `evidence/2026-11-11-shared-player-live.png`. Details: RELEASE-2026-11-11-MAPS.md and RELEASE-2026-11-11-SHARED-PLAYER.md. AGILE-PLAN.md is the comprehensive current backlog. VIDA-FUTURE-DIRECTION.md records the long-term umbrella idea; AVES is still the current brand.

## Preserve

No schema/auth, dependency, paid provider or billing setting changed. Keep the two applications, production routing, deployment protection, private planning and original media provenance. B Corp eligibility/source guard remains live with zero eligible pins and no visible B Corp layer. Synthetic test fixtures and unified-app cutover were not published. The previously verified US$1 on-demand cap/automatic pausing remains unchanged; subscription fees are separate.

Rollback to maps-only: main `dpl_2RD7uJy1KWAxviTziF1WwuNRRx9J`, Australia `dpl_3tnYnxUNdyp4yEY3ms73ivuEeCCw`. The preceding regional-artwork release is retained in RELEASE-2026-11-10-REFINEMENTS.md. Documentation heads may be newer than runtime hashes without another rebuild.

## Next

Follow AGILE-PLAN.md: source-backed B Corp tourism shortlist with business-location/reuse checks, suitable test-account acceptance of the new private delta, physical browser/audio-failure checks, remaining 15 checklist references and sourced regional content. No fabricated certification/impact claims. Launch-itinerary costs, margins and measurable local/conservation outcomes remain explicit business work before broader sales expansion. No further increment was started after the owner's request to finish.
