# AVES-061 New Zealand header release

10 November 2026, Sydney. Owner approved the final visual concept and requested live launch.

Runtime: 01337b2c29ce472365ff92d6a4903bd93f5bda94
Production: dpl_FVbcCBTXsgAnXVhZtiQ83PCxcDSd
Preview: dpl_BhrHHJDAxQ4DQES4o8xsndmfJs4h
Recovery: checkpoint/2026-11-10-15-nz-header

## Scope and interpretation

Original code-native SVG paths implement the approved alpine/coastal concept, not a
raster screenshot. Two unequal summits, short ridge/gully details, a low swell with
inner contours, small whale back/dorsal and fluke, and loose tern-inspired flock.
The illustration is an evocative composite, not a surveyed panorama, identifiable
individual peak outline, local wildlife inventory, simultaneous encounter or sighting
promise. The original kea PNG is mirrored only in this header. Home and country links
remain independent; footer artwork remains unchanged. Country/NZ and South Island
routes use this pilot. No other region inherits an ocean or marine animal.

The real layout is slim and responsive rather than the concept board's large panel.
Menu and wordmark bounds drive geometry through ResizeObserver and font completion.
Nine birds become four below 640px. Animal outlines are finer than terrain; vector
coordinates preserve proportions. The static illustration needs no animation or
reduced-motion override. Small-screen native links use the existing Radix dependency
for focus management, Tab, Escape and restored trigger focus. No paid services.

## Verification

149 existing tests plus two meaningful responsive geometry tests passed (151 total).
TypeScript, local production build and protected/production Vercel builds passed.
Protected browser review: desktop 1363px, native 400% zoom giving 340 CSS pixels,
no horizontal overflow, one boundary, correct logo direction, nine/four birds.
Mobile menu opened; Tab reached Destinations; Escape closed and restored trigger.
Native home, country, planning and account URLs were checked. Live South Island
review confirmed the same boundary, flock and logo transform. Nine live HTTP checks
returned 200 including NZ overview/region, global, Colombia/region, Australia,
sitemap, robots and original bird PNG. Non-NZ pages do not contain the new header.
Evidence: [live checks](evidence/2026-11-10-header-live.json).

Physical Safari/touch, exact 320/390px browser screenshots and wide/foldable devices
remain unverified. Pure geometry checks cover 320 through 2560px but are not device
acceptance. The local preview launcher was incompatible with Next.js flags, so
browser QA used the protected hosted build. Foreground media/account/database code
is untouched; no claim of new playback/background-device verification.

## Recovery and next work

Rollback only the main app to dpl_AuSANAJzDMdddtHb53rArqvJqM1B / 8c7f297 if needed.
Australia stays at 2ff09e9 / dpl_56y3bD1RTE2fngcHBr14obkGu2bx. The owner selected
contextual contour variants next. These remain design-review work until approved.
