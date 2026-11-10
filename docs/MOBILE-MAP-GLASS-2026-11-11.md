# Mobile map and heading glass release

Published 11 November 2026, Sydney.

Runtime: ab66589b433eaaa185b4d05eed11a9c49f3f5f2b
Source tree: aca0c1c3239dff37b52e2f822f6547e928290607
Production: dpl_4K28GQMoq7mMSxVStynGMRtTd9jj, READY, project prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv.
Both aves.bio and www.aves.bio aliases verified on this deployment.
Recovery: checkpoint/2026-11-11-mobile-map-glass.

## Changes

South Island's canvas now precedes a single compact control row. Five 44px controls retain zoom, reset, Move and layer choices. Background, opacity, conservation and public-place choices open in an on-demand scrollable drawer. Long place, habitat, attribution and navigation details use a closed native disclosure. Scope navigation takes one row. Map and bird full-screen cues retain their existing state and return behavior.

The shared landscape heading has a local, masked glass backing: 16px backdrop blur with a WebKit prefix and opaque/reduced-transparency fallbacks. The terrain line remains crisp. Removed negative header overlap and matched its 132px height to guide offsets so the new glass does not blur the guide buttons. No new image assets, provider, dependency or global blur layer.

Hosted acceptance caught a toolbar backdrop filter creating a 44px containing block for the layer drawer. Removed that unnecessary toolbar filter so the drawer anchors to the map card. It now measures 384px high at the reviewed desktop size and scrolls its 552px contents.

## Evidence and limits

492 automated checks passed, including actual component tests for initially closed controls, preserved satellite opacity choices, auto-closing layer selections and canvas-before-controls order. Strict TypeScript and hosted production build passed. The last code adjustment is CSS only and was verified in the staged production browser.

Staged production browser: satellite selection closes the drawer, National parks adds nine park features, expanded map retains layers, and the small bird cue opens the full carousel. Closing the bird viewer restores the originating map side.

Native Chromium browser zoom measured a 340 × 234 CSS px viewport: page scroll width 337px, card width 287px, toolbar 269 × 44px, all five control buttons 44 × 44px, long details closed. This tests narrow layout and horizontal fit, not phone-height or physical mobile behavior. Exact 320/390/402 viewports, Safari and touch remain unverified. An iframe-based viewport harness was refused by existing frame protection; it was removed from the release without weakening that protection.

Public South Island shows the new controls and computed heading backdrop blur. Post-publication error/fatal runtime scan found no matching entries in the 10-minute window ending 2026-11-10T23:55:12.806Z. This is a bounded scan, not a guarantee of zero future errors.

No backend, database, account, customer data, email, payment, billing or provider configuration changed. The previously checked US$1 safeguard remains unchanged, not freshly inspected. Existing independent style/contact WIP is preserved. The broader route/style audit, photo eye-anchor audit, contact form synthesis, AU/NZ range/endemic coverage, B Corp layers and safe project retirement remain queued in NEXT-WEEK-PROMPT.md.
