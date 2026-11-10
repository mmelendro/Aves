# AVES approved selection and checklist release

Published and live-verified 10 November 2026 after the owner approved both reviewed
candidates. PR #10 and PR #9 are merged. The applications remain independently deployed.

| Application | Runtime | Production | Recovery |
| --- | --- | --- | --- |
| Global / Colombia / NZ | a3445b7fd6e4ee1e454f0da0778845e7df5be5b2 | dpl_8TFWkxR8BVDmgTzDmHRpxcypMTpi | checkpoint/2026-11-10-20-selection-thumbnails |
| Australia / shared portal | 34037f09990ea354bc4c53c6127b205f576f6477 | dpl_DX5Rx141ExqZsMRE4PBfVg9jEZDg | checkpoint/2026-11-10-19-australia-selection |

Previous main: 33189e9 / dpl_HdwbDsUDSkfQcK8c2mxgVRe9j6zK,
checkpoint/2026-11-10-18-colombia-contours. Previous Australia: 59a8f65 /
dpl_FNrh2YBNHFjamZk3gPu1WcL5Cb9Z, checkpoint/2026-11-10-17-australia-contours.
Rollback either application independently; a paired UI release does not consolidate them.

## Published behaviour

Map country, region, island and South Island place selections update their context
header before navigation. Every contour context has a small source-backed local
flock, using one of eight lighter family outlines. These are illustrative shorthand,
not field-identification plates or live/seasonal sighting claims. Unknown/inland
contexts cannot inherit marine whales. Route-scoped public state, content/geometry
and rendering remain separate for later mobile-app reuse. Crossfade respects reduced
motion. Original geographic artwork, native links and first-activation previews remain.

South Island's opt-in satellite background uses the registered NASA 2004 image at
full opacity. Only the selected LCDB habitat is shaded, with a visible 0–100% control.
Zero retains the selected outline; All habitats leaves imagery clear. Coast is
shoreline context without an invented offshore polygon. This is a habitat-area
pilot, not administrative-subregion registration or a worldwide satellite rollout.

The public NZ checklist displays reference images for 362 of 377 living entries:
31 existing curated photos plus 331 new local assets. Fifteen await verified safe
sources. Illustrations are labelled, image failure has a text fallback, and image
viewing/credits do not select a bird. Stable saved IDs/storage are unchanged. The
separate private NZ picker is not yet ported. Per-file rights, creator, modifications
and source links remain, with a complete public attribution directory. Conflicting
licence and personal-metadata candidates rejected during review are excluded.
Personal prompts use “your”, including “Discuss your New Zealand trip”.

## Verification

162 main integration tests and 296 AU tests passed. Strict unused-local/parameter
TypeScript checks and local builds passed. The merged production trees differ from
the reviewed runtime sources only in documentation. Both exact production builds
finished READY and received their established aliases. No environment/configuration,
account/database/provider or application-boundary changes were made.

363 live HTTP checks passed: 32 public route/metadata checks across both apps and all
331 new asset files, with SHA-256 identity checks. Evidence:
evidence/2026-11-10-selection-thumbnails-live.json.

Actual live browser checks: global NZ selection changed to terns; Colombia's first
Caribbean map activation changed to ibises while staying on /colombia; Australia
Western Australia selection changed to Carnaby’s flock while staying on /australia;
Fiordland selected the kākā/fiord context. Satellite shading reached 0 and 100 while
the selected outline stayed opaque. Prior exact-source preview acceptance covers
50%, unchanged camera and map enlargement/reset.

Five Apteryx reference controls loaded, Tahi's CC BY 3.0 source was confirmed, viewing
did not select a bird, and Escape restored the image trigger. Actual active-tab native
400% zoom gave 340 CSS pixels with no horizontal overflow in the NZ checklist and
Australian page. No private save/account operation was exercised by this public release.

Post-release error/fatal log queries scoped to each new deployment returned no
matching entries in their 15-minute windows. These static/public checks do not
certify private account flows. Physical iPhone/Safari, true pinch/swipe, exact 320/390px
and telephone/background behaviour remain unverified. Earlier recorded limits remain.

Proof: aves-checklist-thumbnails-live.png, aves-checklist-thumbnails-live-340px.png,
aves-australia-selection-live-340px.png (actual browser screenshots).

## Next and retained gates

Port references to the separate private NZ picker as one bounded UI increment,
preserving IDs/provenance and checking view-without-select, save/reopen/privacy.
Remaining image verification can continue independently. Australia map enlargement
is a separate later port. eBird readiness is assessed, but its commercial API use
requires written permission; the enquiry is drafted, not sent. No data/key/account
was obtained. C3 exact unified private staging remains blocked; C4/C5 are unapproved.
Further production releases require explicit approval.
