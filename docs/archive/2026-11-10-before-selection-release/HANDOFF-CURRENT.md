# AVES current handoff

Updated 10 November 2026. Fetch current GitHub history before editing. This file
owns current status. Historical paragraphs do not reopen delivered work.

## Live baseline, unchanged by the current previews

| Application | Runtime | Deployment | Recovery branch |
| --- | --- | --- | --- |
| Global / Colombia / NZ | 33189e9f6e2d36824721e31c033c6c96e0a23879 | dpl_HdwbDsUDSkfQcK8c2mxgVRe9j6zK | checkpoint/2026-11-10-18-colombia-contours |
| Australia / shared portal | 59a8f65207d17c6c1ec5af3e3a11868f44cd832f | dpl_FNrh2YBNHFjamZk3gPu1WcL5Cb9Z | checkpoint/2026-11-10-17-australia-contours |

Maintained branches stay separate: webmaster/readiness-2026-11-05 and
australia/preview. Use Vercel mmelendro@gmail.com. A documentation sync is not a
release; Git-triggered deployment is disabled for these maintained branches.

All nine configured Australian and eleven Colombian regional contour headers,
their country headers, main-app map enlargement/controls and the one-person team
carousel are live. NZ's approved country/South Island composition remains live.
Main map controls have not been ported to the separate Australia app. AVES-053
opt-in soundscapes, AVES-066 hover and AVES-068 safe continuity/paused cross-app
Resume remain delivered. Truly uninterrupted cross-document playback is deferred.

## Completed source work, awaiting a production decision

Main review candidate: PR #10, feature/checklist-thumbnails, runtime source
1b795eb15583e2ee98a6fc0fa5260b6e2af78f06. It combines the header-selection and
satellite pilots with public checklist thumbnails. Earlier PRs #7/#8 are constituent
history, not extra implementations to redo. Australia remains separate in PR #9,
feature/au-selection-headers: runtime source b1809d5d15953f716824a6d2d66ca880d6d51b5c,
documentation head 33bea13dfa102ae506cbc556a6f98af0f0d84a2e.

- Global country/region, Colombia country/explorer, NZ island/place and Australian
  map previews update the header before navigation. State is public, route-scoped
  and separate from content/geometry for future app reuse. Crossfade is 360ms;
  reduced motion switches immediately. Native links/first activation remain.
- Every contour context retains a small loose horizon flock. Source-backed local
  species choose one of eight lighter family outlines. They are illustrative
  shorthand, not field-identification plates, live sightings or seasonal guarantees.
  Inland scenes cannot inherit ocean whales. Sources: content/header-flocks.json.
- South Island satellite remains an explicit choice using the registered NASA 2004
  image. Only the selected LCDB habitat is shaded; 0% retains its outline. All
  habitats shows clear imagery, coast uses shoreline context. These are habitat
  classes, not administrative subregions. Broader rollout needs aligned geometry.
- Public NZ checklist: 362 of 377 living entries have a visible reference image.
  Reuses 31 curated photos plus 331 local additions. Fifteen remain honestly pending.
  Illustrations are labelled. Opening credits does not select a bird. Rejected
  metadata/licence candidates are withheld. The separate private picker is not ported.
- Personal prompts consistently use “your”, including “Discuss your New Zealand trip”.

162 main integration tests and 296 AU tests passed; strict TypeScript and local
builds passed. Individual hosted header/satellite checks are complete. Main combined
hosted checklist acceptance is recorded in PREVIEW-2026-11-10-CHECKLIST-THUMBNAILS.md.
See PREVIEW-2026-11-10-SELECTION-HEADERS.md and
PREVIEW-2026-11-10-SATELLITE-OUTLINE.md for the constituent preview evidence.

Actual browser checks include 340 CSS-pixel native zoom, Colombia first map
activation, country/region and South Island place selection, menu Escape/focus,
satellite 0/50/100% shading and unchanged camera. Physical iPhone/Safari, true pinch/
swipe, exact 320/390px and telephone/background behaviour remain unverified.
Explicit approval is still required before a new production release.

## Next work

The South Island eBird follow-up has been assessed in NEXT-EBIRD-SOUTH-ISLAND.md.
Cornell requires written permission for commercial API use; no API request, key,
account, import or layer has been created. The enquiry is drafted, not sent. Do not
scrape or switch sources to bypass those terms. Keep public-place data, provider
adaptation and map presentation separate for future mobile reuse.

Independent next UX slice: port the same reference-image experience to the separate
private NZ picker, preserving stable IDs/save semantics and verifying privacy and
save/reopen. Remaining image verification can continue separately. Retain owner
priorities for saved places, origin filters, ecological/historical context, verified
places, playback, continuous calls, maps and natural-context design. See AGILE-PLAN.md.

## Constraints and blocked work

No spending, paid AI retries, weakened privacy, account/database/provider changes
or application consolidation. Preserve private guest data, original artwork, native
links, first-activation previews, country bird identity, browser zoom and AVES style.
Use UX-DELIVERY-PROCESS.md for bounded delivery, media preflight and natural context.

Source audit/cleanup is newer than live: main 670060d / AU ee9f9ed removed confirmed
unused code and fixed generic map gesture cleanup. Dependency audit found no high/
critical findings, two moderate main Tailwind build-chain findings and zero AU.
See AUDIT-2026-11-10-CODE-UX.md. Do not force major dependency overrides.

Unified C1a–C1d and C2 are complete within recorded limits. C3 exact hosted private
acceptance remains blocked on safe production-mode staging; prior automatic review
rejected the dashboard Redeploy action because it assigned a live domain. Do not
retry provisioning/spending or silently deploy integration/aves-unified-2026-11-08.
C4 cutover and C5 retirement are unapproved. Preserve its separate checkpoint and
C3-CONTROLLED-HOSTED-ACCEPTANCE-PROPOSAL.md. Earlier prompts are archived under
archive/2026-11-10-before-selection-thumbnails/ and the earlier contour archive.

Final main preview: dpl_61sAL591eVz1czja6qo5yyYp2n38, READY,
https://v0-company-landing-page-k46nvktfq-mmelendro-9273s-projects.vercel.app/new-zealand/south-island
Hosted checklist/credits/selection and 340 CSS-pixel reflow acceptance passed.
