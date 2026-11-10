# AVES comprehensive delivery list

Updated 10 November 2026 after hosted synthetic-planner checks. This is the current
priority and status index. ROADMAP-DETAILS.md retains full acceptance requirements,
AVES-CHANGE-INBOX.md retains original requests, and HANDOFF-CURRENT.md records the
last approved live release. Historical sprint notes do not override this index.

## Published refinement release

The owner approved production publication on10 November2026. Both releases are
READY and their production aliases were verified after publication.

| Application | Runtime | Production deployment |
| --- | --- | --- |
| Global / Colombia / New Zealand |4e4e7f3f03f3f8b4982d37884c03173d9bea9086|dpl_87fCw4BSLvttUrdzUK2AFKTsr1xP|
| Australia / shared portal |48722c870a6f804ef964280e41e5ddc985658f1c|dpl_FYT3WsL52euwC46SYq2tFRsKtqDB|

183 main and315 combined Australia tests, strict TypeScript and both complete
builds passed. No API, auth, database, dependencies, provider or billing changes.
Production error/fatal scans for both exact deployments returned no matching logs
in the15-minute windows ending12:55 UTC. This is a short observation window, not
ongoing monitoring or a guarantee against all errors.

The US$1 on-demand budget and automatic pausing remain as previously verified.
No billing setting changed; Pro subscription fees are separate. The synthetic
planner fixture and unified app remain outside this production release.
See RELEASE-2026-11-10-REFINEMENTS.md and HANDOFF-CURRENT.md for evidence and rollback.

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

## Published refinements and remaining verification

All prepared runtime changes in PRs11–27 are integrated in the two maintained
applications. The map/control and private stacks were combined for Australia.
Older preview-only wording in dated records is historical.

| Work | Live scope | Remaining verification / work |
| --- | --- | --- |
| Maps, PR12/13 | Australia enlargement/zoom/reset, sage/green style, named alternatives and feather markers; Colombia/NZ style parity | Physical Safari/touch and wider device review |
| Photo zoom, PR14/21 | Resolution-aware zoom/reset and short-screen toolbar spacing | Physical pinch/Safari; native-pixel limits remain deliberate |
| Invitations, PR15 | Shared fixed-width birds/AVES transition | OS reduced-motion preference checks |
| Scroll flock, PR16 | Bounded reversible motion with regional species | Physical phone and dynamic preference tests |
| Call following, PR17 | Session opt-in follows manual bird choices | Broader autoplay-rejection, missing recording and interruption cases |
| Origin filters, PR18/19 | Sourced NZ origin controls in public checklist and private picker | Seasonal/activity filters remain separate |
| Sea context, PR20 | Sourced South Island sea labels and quiet water treatment | Wider device review |
| Place ideas, PR22/24 | Tab-only public choices and copyable notes | Clipboard-denied fallback needs browser coverage |
| Private media/notes, PR11/23 | Checklist photographs and explicit append into existing draft notes | New delta has automated and synthetic UI evidence; real authenticated persistence still needs suitable test-account coverage |
| B Corp preparation, PR25 | Eligibility/source guard deployed with no eligible pins | Visible layer remains off; verify tourism shortlist, locations, coordinates and reuse terms |
| Regional logos, PR26/27 | All23 regions and four place contexts,25 new illustrations, right-facing marks and matching contours | Not every region individually browser-reviewed; physical/narrow checks remain |
| Remaining checklist images |362/377 public and private references | Verify15 pending sources; retain missing states |

Live browser checks covered Australia region selection/enlargement and regional
logo context; South Island place context,35 introduced entries, place-note controls,
photo dialog and return to the global homepage. The account handover reached
sign-in with NZ/South Island next preserved. No credentials, guest records, hosted
draft save, email, booking or payment was used. Public test place choices were
removed. Preview acceptance still supplies the broader documented interaction
checks, not a claim that every flow was independently exercised live.

## Next execution order

1. Build a small directory-led B Corp tourism/accommodation/restaurant shortlist,
   with dated official certification plus business-location evidence. Enable no
   pins until scope, coordinates and source/reuse checks pass.
2. Complete suitable test-account acceptance of the new private notes/media delta.
   Preserve the existing working private planning flow and minimise test data.
3. Close remaining mobile/Safari, reduced-motion and audio-failure checks. Fix
   confirmed defects in bounded releases.
4. Verify remaining15 checklist image references and sourced South Island
   routes/conservation/lodge context.
5. Continue the retained product backlog below, one selected increment at a time.

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

This production refinement release is approved and complete. New spend/provider/accounts,
weakened privacy or app consolidation are not part of that approval. Do not send supplier/permission enquiries
without explicit sending instructions. Keep source/credits, rollback points and
private guest data intact. Essential-flow/privacy defects take priority.
