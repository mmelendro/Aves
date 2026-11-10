# Reciprocal map and bird guide cues · 11 November 2026

Runtime: b9722f2c016cacb1fa979b7e8e3c824d5d87e5dd.
Tree: 24d99a81d20bdb0ac886ef6dd6b4ff053a7eb760.
Production: dpl_9aocQLEW3ex2EHyE4Ve9Api6ZWtP in prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv.
Previous live source/deployment: d091314c0764448f6f1367115b1184bd95914ac7 / dpl_CrYVdpeTESBACZcnkp7zi311skMz.

## Change

The same compact footer appears on both guide faces. The map face offers the current bird thumbnail. The bird face offers a map thumbnail with its selected region highlighted. Both use matching spacing, typography, separator and turning cue. Clicking either turns the existing mounted card, restores focus and preserves the map camera, layer choices, bird slide and private selections. Comparison mode hides the reciprocal cues because both sides are already visible.

The map previews use the existing reviewed world, Australian state, NZ island and Colombian planning-region geometry. Four static SVG assets total 103,120 bytes before compression. No new maps, providers, geometry downloads, raster generation or JavaScript map library were introduced. Country outlines provide overview context; selected regional shapes and tiny-territory markers show the deliberate selection. A thumbnail is not a separate live layer viewer or a bird-range map. Reproduce assets with scripts/generate-guide-map-cues.cjs.

The owner also requested bird-eye/head focus and selected-map-region focus. Existing authored focal points remain in cropped views. The fitted guide now centres the entire source photograph instead of incorrectly applying cover-crop offsets that could push the bird's head outside the frame. Reverse-face controls are visually hidden after the midpoint of the turn, avoiding mirrored map controls over the photograph. Space is reserved for the existing credits and optional bird-call controls, including narrow-screen wrapping. Map selection remains stable as carousel slides change.

## Validation

487 automated checks passed, including every selected region's map cue, valid generated assets, preserved map selection through bird changes, reciprocal turning without remounting, and fitted-photo bounds for portrait/landscape images at narrow and wide card sizes. Strict TypeScript passed. Exact hosted build and desktop browser acceptance are recorded with this release.

No automatic bird-face recognition or complete audit of per-photo eye anchors is claimed. Images missing authored focal points still need that visual audit; a fully fitted photograph preserves visible heads/eyes without inventing anchors. Physical phone/Safari, exact 320/390px and short landscape layouts remain unverified, as previously recorded. The older complete-site design, range/endemic, domain-transfer and account/provider acceptance work remains queued.

No backend, schema, authentication, dependency, billing or provider changes. No paid AI requests or external messages. The prior US$1 safeguard was unchanged, not freshly inspected.

See ROLLBACK-CHECKPOINTS.md and the earlier FIELD-GUIDE-2026-11-11.md for recovery and the underlying guide release.

## Published acceptance

The exact final production build was READY before both aves.bio and www.aves.bio aliases were assigned. Live checks covered Australia → NSW selection, reciprocal map/bird cue activation, next-image navigation with the region preserved, a loaded highlighted NSW thumbnail and centred fitted photograph. The live bird face had equal scroll/client heights of 631px, so credits, bird-call controls and the map cue fit the tested frame without an inner scroll. Hidden-face visibility and head rendering were also reviewed in staging. Browser protocol timeouts were resolved by inspecting current state and using the normal keyboard controls; no security or browser policy was changed.

The 10-minute error/fatal scan ending 2026-11-10T22:55:46.369Z returned no matching logs. This is a bounded check, not proof of absence of all defects. Physical mobile testing remains pending.
