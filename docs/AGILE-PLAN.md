# AVES comprehensive delivery list

Updated 10 November 2026 after hosted synthetic-planner checks. This is the current
priority and status index. ROADMAP-DETAILS.md retains full acceptance requirements,
AVES-CHANGE-INBOX.md retains original requests, and HANDOFF-CURRENT.md records the
last approved live release. Historical sprint notes do not override this index.

## Where we are

The usable NZ planning pilot is already live: questionnaire, bird wishes, private
draft/review/share and owner receipt were verified in its earlier release.
Recent refinements below are separate draft/preview work, not new live releases.
Do not describe the whole existing planner as untested because these new deltas
still need acceptance. No production publishing is currently approved.

Main candidate: feature/bcorp-source-pilot, runtime6abc13cd, PR #25, 180 tests,
strict TypeScript and full build passed. Private candidate: feature/private-place-notes,
runtime425fa33e, PR #23, 307 tests, TypeScript and full25-page build passed.
Separate synthetic UI branch: test/private-place-notes-ui, runtime44b8ac2d,
test/docs439018d4, 309 checks, TypeScript and full build passed.
Test counts apply to separate trees and must not be added together.

US$1 Vercel on-demand budget and automatic pausing were verified earlier.
Subscription fees are separate. No new billing change or fresh verification is
claimed by this documentation update. Keep the two maintained applications separate.

## Already live: preserve these

| Work | Delivered scope | Remaining scope |
| --- | --- | --- |
| Discovery map, AVES-003a | Equal Earth overview, one country-switching bird viewer, regional selection, return/reset and direct links | Ecological overlays are003b |
| Dividers/framing, AVES-006 | Responsive map/media split on three country homepages, keyboard/reset and media-first narrow layout | Physical touch/foldable testing |
| Maps and regional previews, AVES-012c/046/066 | Names-first homepage maps, real regional contours, deliberate preview/navigation, Colombia whole-shape hover | Broader page/app consistency |
| Contextual birds and language, AVES-006c | Selection-linked headers, locally sourced horizon flocks and personal planning prompts | Scroll movement is preview-only |
| NZ planning, AVES-004a/005 | Questionnaire, living-species wishes, private draft/review/share, owner receipt and Google sign-in | Real guest feedback and later refinements |
| South Island page, AVES-007/013/017/034/036/037/038 | Habitat/place/photo pilot, living-only selection, land-cover/satellite shading, place/resource carousel, map controls and scale | North Island/Rakiura and wider rollout |
| Photos and Info, AVES-012d/039/051 | Shared transparent Info, fit/full-screen pilot, 362 of377 living checklist image references | 15 references pending; deeper zoom is preview-only |
| Sound, AVES-008/053/068 | Available-call cues, opt-in South Island soundscapes, safe same-app continuity and paused cross-app Resume | Continuous cross-document audio is deferred |
| Editorial/team/cleanup | Santa Marta copy pilot, one-person team, bounded cleanup and preserved media credits | Wider editorial/source review |

## Prepared changes: finish, then seek release approval

Public stack: PR13 →14 →15 →16 →17 →18 →20 →21 →22 →24 →25.
Private stack: PR11 →19 →23. Australia map PR12 remains separate.
These are dependent stacks, not independent changes to merge in any order.

| Priority | Task | Evidence/state | Next action |
| --- | --- | --- | --- |
| 1 | Close visual acceptance and prepare one bounded release | PR12 Australia enlargement/controls and PR13 map style prepared; Australia control checks passed, wider style acceptance incomplete | Review exact candidates, narrow layout and keyboard/focus; define release scope/rollback |
| 1 | Photo zoom and short-screen controls, AVES-051, PR14/21 | Hosted zoom/reset/slide/focus checks passed; toolbar fix passed340×234 reflow without overlap | Physical touch/pinch/Safari and exact320/390px remain unverified |
| 1 | Invitation birds/AVES transition, AVES-067, PR15 | Fixed-width reduced-motion implementation prepared | Finish exact-candidate visual/reduced-motion checks |
| 1 | Scroll-responsive regional flock, PR16 | Hosted scroll and return-to-top movement passed with regional species retained | Check changed OS reduced-motion preference and physical phone scrolling |
| 1 | Manual bird-call following, AVES-047, PR17 | Explicit session opt-in; hosted carousel handover to fantail recording played | Finish missing/rejected recording, interruption and background cases; no autoplay |
| 1 | NZ origin filters, AVES-025/048, PR18/19 | Public introduced/search/empty results checked; private synthetic picker showed35 introduced entries; choices preserved by tests | Complete real private-shell acceptance; seasonal/activity filters are separate |
| 1 | South Island sea context, AVES-042, PR20 | Hosted sea labels, habitat readability and reset/focus checked | Finish remaining narrow-layout review |
| 2 | Public place ideas, AVES-063, PR22/24 | Add/remove, landscape changes, same-tab reload and copyable notes passed hosted checks | Clipboard-denied fallback unverified; cross-host handover is not certified |
| 2 | Private thumbnails and place-note import, PR11/23 |307 candidate tests; synthetic hosted import, failed save, retry and reopen passed on separate fixture; credits dialog checked | Test exact authenticated candidate with suitable test records, real save/reopen/edit, ownership and owner receipt as affected |
| 2 | B Corp business discovery, AVES-069, PR25 | Official directory-led sourcing documented; eligibility guard tested; layer remains off with no eligible pins | Curate tourism/accommodation/restaurant candidates by country, verify entity/location scope, coordinates, dates and reuse terms |
| 2 | Remaining checklist images, AVES-039 |362/377 public references live;15 pending | Verify exact taxon, source rights, credit and visual match; retain honest missing states |

## Immediate execution order

1. Finish exact-candidate visual/accessibility gaps in the existing public stack
   and the independent Australia map-control change. Fix any confirmed defect.
2. Prepare a short, reviewable release packet naming included changes, remaining
   device limits, rollback and sitemap checks. Production approval is still needed.
3. Build a small directory-led B Corp tourism shortlist using official certification
   profiles plus business-owned public-location evidence. Do not enable map pins
   until location/coordinate and scope checks pass. No bulk scraping or logo use.
4. Resolve exact private candidate staging and test-account/data scope, then verify
   real save/reopen. Keep the existing public copy-notes handover available.
5. Continue sourced South Island route/content work and remaining image verification.

Read-only account entry approval is resolved. The account link reached the
maintained live sign-in page, not the new candidate. No credentials or real guest
records were used. Ask only for a specific missing prerequisite when one is known.
Safe source/public work can continue without waiting for private acceptance.

## Retained product backlog

| Area / references | Next useful increment | State / dependency |
| --- | --- | --- |
| NZ regional expansion, AVES-007/040 | North Island parity after South Island readiness, then Rakiura | Queued; locality/media verification |
| Routes and practical context, AVES-034/052/062 | One subregion's public birding sites, towns, conservation/lodges and dated travel estimates | Queued; no paid Maps/billing setup |
| NZ depth and orientation, AVES-016/064 | Practical and ecological/historical guidance with authoritative and mana whenua sources | Pilot resources live; wider depth queued |
| Ecological discovery, AVES-003b/019/055 | Megadiverse countries, actual hotspot boundaries, comparable species counts and sourced ecosystem context | Queued; rights, geometry and scope checks |
| Wider map language, AVES-012/012a/012b/012c/018 | Consistent regional duos, bird carousels and collection titles | Partial pilots delivered; broader rollout queued |
| Satellite/city layers, AVES-021 | Accurately aligned, licensed region imagery and useful transport/city labels | South Island pilot live; wider coverage queued |
| Bird diversity and copy, AVES-001/002 | One sourced Colombian bird/content batch without repetitive or unsupported claims | Santa Marta copy pilot complete; expansion queued |
| Origin beyond NZ, AVES-025/048 | Apply reliable sourced classification elsewhere; separate origin from migration/activity | NZ origin prepared; broader categories queued |
| Seasonal observations, AVES-057 | Dated, licensed observation layer with honest season/location uncertainty | eBird commercial permission required; enquiry unsent |
| Pronunciation/cultural content, AVES-010/022/056 | Permissioned bird/place-name audio, Māori pilot, logo-species name/pronunciation | Queued; native-speaker/community source and rights |
| Place-name/hover motion, AVES-043/044 | One restrained world-map preview or paired-name animation | Queued; reduced-motion and navigation checks |
| Regional card flips, AVES-015/037 | Extend the delivered South Island pilot while preserving accessible alternatives | Wider rollout queued |
| Atmospheric media, AVES-041/053 | Habitat-led background/soundscapes with licensed, lightweight assets | Forest/stream/coast pilot live; mountains/wider regions pending |
| Owner video library, AVES-031/060 | Inventory verified uploads/masters, efficient web renditions and adaptive playback | Queued; originals, rights and cost review; no raw8K default |
| Bird logos/3D/feather controls, AVES-050/058 | Review supplied references, one lightweight region/species pilot | Queued; original artwork and rights preserved |
| Navigation/sitemap, AVES-033 | Expandable country/region/page hierarchy and discreet journey links | Tree UI queued; sitemap review required for every release |
| Currency, AVES-035 | Discreet optional conversion with source/date and explicit currency | Queued; no misleading live-rate claims |
| Team/host role, AVES-030/045 | Explain real host review, coordination and current team accurately | One-person page live; operational expansion queued |
| Human-reviewed proposals, AVES-023/059 | Reuse private brief for sourced, realistic itinerary/options and short trip story | Manual editor exists; generation/provider/evaluation separately scoped |
| Sydney launch product, AVES-024 | One validated itinerary with operators, costs, pacing and sustainability evidence | Queued before advertising/bookings |
| Community/wishlist, AVES-004/054 | Optional account wishes, community connections and later bingo | Existing pilot selection live; broader social features queued |
| Colombian Spanish, AVES-014 | Natural es-CO translation with retained English, locale metadata and tested layouts | Lower priority |
| International branding, AVES-032 | Evaluate pronunciation/identity and optional landscape-contour direction | Decision backlog; retain AVES pending owner decision |
| Unified app, AVES-020 | C1a–C1d/C2 draft work complete within recorded limits; finish C3 safely | Exact hosted private acceptance unresolved; C4 cutover/C5 retirement need separate approval |
| Regenerative-tourism ambition | Evidence-based supplier/community/wildlife practice and human review | Business direction, not achieved certification or an impact score |

## Evidence, gates and working rules

Use the ecotourism business-plan direction: balanced nature travel, human hosting,
real local relationships and truthful guest expectations. Stewardship means dated,
traceable evidence, community/wildlife care and honest uncertainty. B Corp status
does not prove AVES partnership, bookability or uniformly low environmental impact.
The old data.world community feed retired13 July2026; no supported replacement bulk
feed or commercial reuse permission has been verified.

The synthetic planner fixture checks UI only. It is not persistent, makes no account
API/database/email write, and is disabled outside its exact preview branch.
Never merge it into maintained branches. Details are on the test branch in
PREVIEW-2026-11-10-SYNTHETIC-PLANNER.md. Test choices were cleared.

Evidence: ACCEPTANCE-2026-11-10-APPROVED-PUBLIC-PREVIEW.md,
ACCEPTANCE-2026-11-10-PHOTO-PLACE-IDEAS.md, AVES-069-DIRECTORY-SOURCING.md,
AVES-069-SOURCE-PILOT-2026-11-10.md and the test-branch fixture record.
Physical Safari/touch, OS preference changes, some audio interruptions and actual
private candidate persistence remain unverified. Do not turn source tests into
claims of hosted delivery.

No production publishing, new spend/provider/accounts, weakened privacy or app
consolidation under this list update. Do not send supplier/permission enquiries
without explicit sending instructions. Keep source/credits, rollback points and
private guest data intact. Essential-flow/privacy defects take priority.
