# AVES current handoff

## Latest style/functionality checkpoint

Owner selected all nine tasks one by one. Australia map controls are implemented
and hosted-verified as a preview (7e2d7ab / dpl_BYQfL3MYBM6vsbPEJpDQpKHTxZfc).
The next map-style increment is prepared in main draft PR #13 (4ddab4a) and AU
draft PR #12 (2b623db). It passes 162 main / 301 AU tests, strict TypeScript and
both local production builds. Hosted styling acceptance remains pending because
Vercel rejected new deployments at its free daily cap. No production, billing,
account, protection, API or database changes were made. The tested control-only
preview does not include the new styling. Read
STYLE-FUNCTIONALITY-CHECKPOINT-2026-11-10.md and AGILE-PLAN.md before continuing.
Finish styling browser acceptance when capacity returns, then start photo zoom.
Preserve PR #11's signed-in gate, fifteen pending images and existing release rules.


Updated 10 November 2026 after the approved release. Fetch current GitHub history
before editing. Historical pending paragraphs do not reopen completed work.

## Live baseline

| Application | Runtime | Production | Recovery |
| --- | --- | --- | --- |
| Global / Colombia / NZ | a3445b7fd6e4ee1e454f0da0778845e7df5be5b2 | dpl_8TFWkxR8BVDmgTzDmHRpxcypMTpi | checkpoint/2026-11-10-20-selection-thumbnails |
| Australia / shared portal | 34037f09990ea354bc4c53c6127b205f576f6477 | dpl_DX5Rx141ExqZsMRE4PBfVg9jEZDg | checkpoint/2026-11-10-19-australia-selection |

Maintained branches remain separate: webmaster/readiness-2026-11-05 and
australia/preview. Use Vercel mmelendro@gmail.com. Documentation heads may be newer
than these runtime commits. Git-triggered deploys are disabled for maintained branches.

PRs #10 and #9 are merged and live. Map selections automatically update contextual
headers and small, sourced local flocks. Family silhouettes are shorthand, not field
identification plates. Inland contexts do not inherit marine wildlife. South Island
satellite shading is selected-habitat only, with a zero-capable slider and retained
outline; imagery is the registered historical NASA 2004 composite. Habitat classes
are not administrative subregions. Broader satellite rollout needs aligned geometry.

The public NZ checklist now has reference images for 362/377 living entries; fifteen
remain pending. It reuses 31 curated photos and adds 331 local assets, with complete
credits and labelled illustrations. Viewing does not select a bird. Rejected metadata/
licence candidates are excluded. Personal prompts use “your”. The separate private
picker has a prepared 362-reference port in draft PR #11; it is not live. Australia still lacks the main-app map enlargement port.

162 main integration and 296 AU tests, strict TypeScript, local and exact production
builds passed. All 363 live route/metadata/asset checks passed, including SHA-256 for
the 331 new assets. Live browser verified selection/header changes in both apps,
shading endpoints, thumbnail/credit independence, Escape focus and 340 CSS-pixel
native zoom reflow. No matching error/fatal logs returned for the new deployments in
the scoped 15-minute queries. Physical Safari/true touch, exact 320/390px and real
telephone/background behaviour remain unverified. No private save was exercised.
See RELEASE-2026-11-10-SELECTION-THUMBNAILS.md and its evidence file.

Preserve the earlier delivered regional contours, main map controls, one-person
team carousel, AVES-053 opt-in soundscapes, AVES-066 hover and AVES-068 safe continuity/
paused cross-app Resume. Truly uninterrupted cross-document playback remains deferred.
The bounded code cleanup is included; prior dependency audit found no high/critical
findings, two moderate main Tailwind build-chain findings and zero AU. Do not force
major dependency overrides or present that audit as certification.

## Next work and gates

Private picker port is prepared in draft PR #11, source 6e802f0 on
feature/private-checklist-thumbnails, targeting australia/preview. 299 tests, strict
TypeScript and local build passed. Mocked editor save/reopen preserves stable IDs;
actual signed-in save/reopen/edit and surrounding private-shell acceptance remain
pending. The exact unchanged picker passed an isolated, protected public-data
component check: thumbnail/credit independence, keyboard/focus, Escape, search,
filters, pending-image selection and 340px native-zoom short-frame reflow. This
check has no account or save controls and is not a persistence test. Read the
feature branch's docs/PREVIEW-2026-11-10-PRIVATE-THUMBNAILS.md. Do not redo the port.
Finish its private preview acceptance before explicit production approval.
Continue remaining image-source verification independently. Retain owner focus on
saved places, origin filters, ecological/historical context, verified places, playback,
continuous calls, maps and natural-context design. Follow AGILE-PLAN.md and the
UX-DELIVERY-PROCESS.md, including media metadata preflight and personal language.

Owner also requested AVES-069, an optional Certified B Corp business map layer.
It is recorded in the roadmap/inbox, with a sourced South Island pilot before
broader regional reuse. Certification scope, real public locations, dates and
source rights must be verified. No layer/import/release has been implemented.

South Island eBird readiness is assessed in NEXT-EBIRD-SOUTH-ISLAND.md. Written
commercial API permission is required. Its enquiry is unsent; no API request/key,
new account or data import was made. Do not scrape or bypass those conditions.
Keep provider adaptation, public place records and rendering separate for app reuse.

No spending, paid AI retries, weakened privacy, account/database/provider changes or
app consolidation. Preserve private guest data, original artwork, native links,
first-activation previews, browser zoom and country bird identity. This release was
explicitly approved; obtain approval for any further production increment.

Unified C1a–C1d/C2 remain complete within recorded limits. C3 exact hosted private
acceptance remains blocked on safe staging; prior automatic review rejected a
Redeploy that assigned a live domain. C4 cutover/C5 retirement are unapproved. Do not
retry provisioning/spending or deploy the unified draft. Preserve its separate
checkpoint and C3-CONTROLLED-HOSTED-ACCEPTANCE-PROPOSAL.md. Earlier prompts are archived.
