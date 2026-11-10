# Shared nature player release · 11 November 2026

This increment follows the unified-maps release. The owner asked for region listening on the map, symmetrically opposite bird listening, and one player for bird calls, soundscapes, podcasts and videos.

| Application | Runtime | Production deployment |
| --- | --- | --- |
| Global / Colombia / New Zealand | `094a4e0c255f43dce83da1ac1c69550a892f91cd` | `dpl_AQRa1CBwc6tfAPXFp5nKBF5m6F92` |
| Australia / shared portal | `cc1a45d471def6367d4758ad54f820a3a4046adf` | `dpl_7neXSNAYigyDfQgQi4xnAPXuN5iG` |

## Delivered

The South Island map has a region-listen button beside its full-size control. The separate soundscape panel, mixing engine and unused styles are removed. The map button requests a reviewed Canterbury forest/stream/coastal recording according to the habitat choice. Mountain sound remains explicitly unavailable. Recording locality stays Canterbury even when the selected map place is Fiordland, Nelson Lakes or Otago.

Bird carousels in both apps and the Chocó article recording use the shared player. Podcasts and videos keep their existing curated entries and source controls. Exactly one dock owns requested audio, with pause, resume, seek, volume, mute, expansion, close and credits. Region soundscapes begin at 25 percent volume; bird/podcast audio begins at 75 percent. Nothing loads before deliberate playback.

The same portal container moves into an expanded map's top layer and back, preserving the mounted audio and position. Closing or pausing the player cancels optional bird-follow mode. A stale bird cleanup cannot close a newly selected regional track. Bird-follow still stops when leaving or hiding the viewer.

Only allowlisted curated travel resources retain the existing paused cross-app/reload handoff. Dynamic bird and soundscape requests never persist arbitrary media sources. They continue through client navigation within the app and stop on reload or app boundary; their player copy says this explicitly.

## Verification

182 main tests and 316 Australia tests passed, including source/rights hashes, explicit soundscape selection, unavailable mountain handling, native region navigation, stale-track cleanup, paused handoff and map gestures. Strict TypeScript and both complete production builds passed.

Browser preview checks verified zero audio/dock before request; Kea to region soundscape to DOC podcast replacement with one audio element and one dock; Australian bird playback with the correct /australia media path; optional Kea-to-tūī following; closing follow then changing birds without playback; map-side pause/resume retaining position; and uninterrupted region audio through enlargement/restore. The player fit a 340 CSS-pixel viewport without document overflow. This is a resized desktop check, not physical Safari/pinch acceptance.

Production alias, live browser and scoped error-log results are recorded in HANDOFF-CURRENT.md after publication. No auth, database/schema, dependency, paid-provider or billing settings changed. The previously verified US$1 on-demand cap and automatic pausing remain unchanged; subscription fees are separate.

Rollback to the maps-only release: main `dpl_2RD7uJy1KWAxviTziF1WwuNRRx9J`; Australia `dpl_3tnYnxUNdyp4yEY3ms73ivuEeCCw`.
