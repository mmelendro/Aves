# Homepage map cards — resumption verification

9 November 2026, Sydney. Owner requested matching Colombia/Australia/New Zealand cards, working region links, desktop/mobile checks, publish/GitHub sync and pause.

## Baseline and outcome

The laptop initially held36d5186. Fetching GitHub revealed newer source0dde307, which was fast-forwarded into the clean local checkout. The other chat had already implemented/published the requested consistency. A recent source change1aed534 preserves combined layers when previewing places; the map-card renderer and first-tap/boundary corrections were also already present. No newer work was overwritten.

The live homepage confirms matching cards, full-name selection callouts, sage/emerald palette, feather markers, regional selectors and Explore links. Colombia retains original marker centres and internal planning lines. Geographic levels are explicitly different:11 Colombia planning regions,9 Australian states/territories,3 NZ main islands. The work is already published; no new code or redundant production deployment was needed.

Published main runtime remains1aed534, deployment dpl_EpZR2p99nc9zy5gp8z83zpueMCKp. Australia remains e0c766a / dpl_67GnFTnfkgrjN2scQL7QWBqvo1zq according to the latest release checkpoint; this resumption changed neither app runtime. No rollback checkpoint is needed for a documentation-only change; retain checkpoint06 and previous recovery entries.

## Fresh verification

- Live browser desktop1280x900: all23 selectors changed the full region name and Explore target correctly. All three cards measured equal width/height, without internal horizontal overflow.
- Live browser390x700 and320x700: all23 selectors passed at each width; cards stacked without document/card horizontal overflow. Native selectors retained their44px minimum touch-height (fractional browser measurements rounded to CSS pixels).
- Live keyboard Enter: first SVG link activation previews without navigating; second opens the correct guide for Pacific Coast & Choco, Northern Territory and South Island. Focused regional action was visually checked on desktop.
- All29 checked public URLs returned200: global/country/South Island pages,11 Colombia region pages,9 Australia region pages, both human sitemaps and both XML sitemaps. NZ North Island/Rakiura anchor IDs were present. XML sitemaps excluded private account/admin/API routes. No route inventory changed.
- Local node test suite:128 passed,0 failed. TypeScript noEmit passed.
- No physical iPhone/touch-device test or new hosted build was performed. The review tested the existing live release, not a newly deployed candidate. Initial phone assertion was corrected for a fractional43.99px rendering measurement; no product defect or code change was required.

## Scope and next action

Only verification and documentation. No new spend, account changes, AI retries, media uploads, migrations, guest communications or application edits. Updated source branch documentation is synced to GitHub. Pause here; the broader continuous map/full-screen/multi-photo/player programme remains queued until the next selected instruction. Keep its full requirements in NEXT-WEEK-PROMPT.md and linked detailed files.
