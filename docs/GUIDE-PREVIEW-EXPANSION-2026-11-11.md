# Direct map and carousel previews · 11 November 2026

Runtime: 79bba2f209555250414a21cb277946a893e9c208.
Tree: 988ca6468114a1a04bcb222a117f616a28844261.
Production: dpl_EP7mSzuuNicjtRg9srnLqPFuif8x in prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv.
Previous live source: b9722f2c016cacb1fa979b7e8e3c824d5d87e5dd; deployment dpl_9aocQLEW3ex2EHyE4Ve9Api6ZWtP.

## Behavior

The small map on the bird face now opens the real map directly in full screen. The small bird on the map face opens the full, current carousel, including previous/next, audio, details, credits and wish controls. The viewers register their existing native-dialog openers with the shared guide context. No second carousel, duplicated map, image-only enlargement, new provider or dependency was added.

The originating card face and focus return on Close/Escape. If a switching control has unmounted, focus falls back to the visible turning button. The selected geography, carousel slide, map camera, layers and private wishes stay mounted. An expanded map retains its current bird cue; an expanded bird carousel retains a small fixed map preview. Visitors can switch directly between these full-screen viewers. The explicit turning button and paired comparison layout remain available.

Full-screen close and map-preview controls stay available while scrolling. Zoom controls sit below the bird's head area instead of covering its face. Existing fitted-image behavior and authored crop focal points are preserved. This is not automatic bird-face recognition or a complete audit of every photo's eye anchor.

## Verification

490 automated checks passed, including registered preview opening, preserved mounted content, originating-face/focus restoration, safe opener removal, and exclusion of landscape viewers from bird registration. A focused nine-check run passed after the focus fallback adjustment. Strict TypeScript and hosted build checks passed.

Desktop browser acceptance covers opening the carousel from the small bird cue, browsing a later bird, closing to the original map face with the updated cue focused, opening the map from its miniature, switching full-screen map ↔ birds, and Escape restoring normal document scrolling. Exact final build and live checks are recorded after publication below.

Physical mobile/Safari and exact phone viewports remain unverified. Region changes that replace a map implementation still need a full-screen-transition audit; this increment does not claim uninterrupted expansion through every geographic implementation change. The broad style, eye-anchor, ecological/range/endemic, domain-registration and provider acceptance work remains in NEXT-WEEK-PROMPT.md.

No database, schema, authentication, payment, email, billing, AI request or provider configuration changed. The previous US$1 safeguard was unchanged, not freshly inspected. Recovery is recorded in ROLLBACK-CHECKPOINTS.md.

## Published acceptance

Both custom-domain aliases were verified on the final READY deployment. The exact production build passed direct preview opening, cross-viewer switching, Escape, body-scroll restoration and fallback focus to the visible turning button. Full-screen bird controls were visually reviewed below the head area. Live South Island checks opened the full 30-bird carousel from Kea's miniature, switched through the small South Island map to the existing layered map, verified one modal and the same region, then closed to the original bird card. No media was started during these read-only checks.

The error/fatal scan for the final production deployment returned no matching entries in the 10-minute window ending 2026-11-10T23:15:28.852Z. This is a bounded observation, not a universal security or availability guarantee.
