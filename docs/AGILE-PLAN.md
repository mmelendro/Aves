# AVES comprehensive delivery list

## Active owner queue · 11 November 2026

The owner reprioritized the unified interactive explorer above the remaining form, glass and bird-range audit work. Start with the South Island, then New Zealand and globe. Exactly one rendered map per page. Preserve every existing sourced layer and combine birds, landscapes, habitat, conservation, national parks, historical satellite, public places/businesses and the shared nature player in the selected-place experience. Zooming out must restore country/world content in place; region and neighbour choices must not force navigation. Keep existing layer choices and private bird wishes on return. Preserve full-size/restore, keyboard access, source coverage and rights. Do not call this app-ready until the remaining navigation/state/mobile checks are complete.

The shared explorer is now LIVE on the global homepage, New Zealand, South Island, Colombia, all eleven Colombian guides and the legacy `/aves-explorer` entry. Main runtime `60e94a4a992aafb80ddacd47ea5a9d19f332d81c`, production `dpl_BbUks6FmNboPV1DTmnrRxZ1pRS9J`, READY on aves.bio. The old legacy explorer's duplicate maps are removed. One map per view, scope-driven birds/planning, retained South Island layers and NZ wishes, regional neighbours, divider and full-screen/restore remain. Public `explore`/`region` URL state now survives refresh and browser Back/Forward. Colombia's existing page-local Spanish control is preserved. 191 tests pass. See docs/RELEASE-2026-11-11-COLOMBIA-EXPLORER.md.

Next priority: extend the same interaction through the independently deployed Australian entry pages without merging app branches or changing shared accounts/backend. Australia is selectable inside the shared main explorer today; its native `/australia` entry still uses its existing local explorer. Then finish real mobile/touch acceptance. A 337 CSS-pixel desktop zoom check passed horizontal overflow and keyboard enlargement/restore, which is not a physical Safari/touch test. Contact/glass work remains separately preserved on the named WIP branches and paused until map rollout is complete. The complete AU/NZ range audit and all-country endemic coverage remain required, not completed.

Work through this queue in order, preserving the already live private planning flow and the US$1 automatic-pausing safeguard. The owner has authorized these site changes, testing, GitHub sync and publication. Do not repeat approval questions for this scope. New messages steer this queue unless explicitly replacing it.

1. Regional maps and divider: enforce one map per page, combining bird/habitat/place/conservation controls where sourced layers exist. Remove the South Island landscape component's second-map fallback. Restore the resizable map/bird pair on all Colombian regional pages and keep Australian regional pages consistent. The maps/divider release is live: main was `5400f803209ea60f7e4e122416e772bcd9869dc5` and is now superseded by the unified explorer; AU remains `5bdd33bae0d55f5a202fe4963f692ab27e118cc4` / `dpl_99qgUavb9ArbDhyL5PGRz42MBuPo`, READY on its stable alias. All-region tests cover every Colombian and Australian guide.
2. One public contact form: synthesize Colombia, Australia, New Zealand and service contact forms into a shared guided component. Carry country/region hints correctly, retain flexible/multiple-region planning, dates/duration/group, interests, pace, comfort, experience, target wildlife/places, practical preferences, indicative budget with explicit currency, preferred reply/language, optional updates, review, back/edit and clear receipt/error states. Keep the authenticated private brief and explicit sharing separate. Implementation exists locally with model/UI tests; hosted acceptance and publication remain. Do not submit real visitor data or send test mail while browser testing.
3. Glass landscape headers: stop scrolling page text showing through mountain notches/water contours using a subtle frosted treatment across both apps. Preserve contour/flock identity, links, focus, reduced motion and opaque fallback. Implemented locally; visual scroll/phone checks remain.
4. Neutral opening maps: world and Australia start without selected subregions or automatic bird-area feathers. The global home uses the peregrine falcon. The main explorer opens neutrally and bird-area hints are optional. Australia’s native opening-map refinement is still on its WIP branch; bring it forward during the Australian rollout.
Endemic coverage is mandatory for every country and region, beyond photographed birds. Maintain a source-backed complete checklist with country/regional endemic distinctions, show missing-image states rather than silently omitting species, and do not claim completeness until the source and taxonomy have been verified. Use natural regional headings consistently: “Birding in the Caribbean”, “Birding in the Eastern Andes”, “Explore the South Island”, and equivalent region-appropriate articles in visible headings and search titles.

5. Full photographed-bird coverage audit: review every photographed Australian and New Zealand bird against authoritative species sources, including crimson rosella, Australian king-parrot, splendid and superb fairywrens. Separate photo locality, featured planning region, established species range and habitat. Correct all relevant mapped region associations using evidence, retain uncertain/offshore/vagrant limitations, and never present a representative photograph or planning marker as a complete species range. Produce a dated per-species evidence ledger and publish the verified content/map changes after tests.
6. Finish: update this prompt, AGILE-PLAN.md, HANDOFF-CURRENT.md and exact release/evidence records; sync maintained branches, keep clean code/worktrees and report what is live with remaining limits. VIDA is the long-term umbrella direction, not a current rebrand. Then pause rather than starting unrelated backlog work.


Updated 11 November 2026 after the unified-map and shared-player increments. This is the current priority and status index. ROADMAP-DETAILS.md retains full acceptance requirements; AVES-CHANGE-INBOX.md retains original requests; HANDOFF-CURRENT.md records exact production evidence. Dated sprint notes are historical.

## Latest discovery and media release

| Application | Runtime | Production deployment |
| --- | --- | --- |
| Global / Colombia / New Zealand | `094a4e0c255f43dce83da1ac1c69550a892f91cd` | `dpl_AQRa1CBwc6tfAPXFp5nKBF5m6F92` |
| Australia / shared portal | `cc1a45d471def6367d4758ad54f820a3a4046adf` | `dpl_7neXSNAYigyDfQgQi4xnAPXuN5iG` |

One map viewer per page; visible neighbouring regions stay selectable; full-size and restore controls retain selection. South Island landscapes use the single hero map. Map-side region listening and bird listening share the player with podcasts/videos. The old soundscape panel and separate mixing engine are removed.

182 main / 316 Australia tests, strict TypeScript and both complete builds passed. See RELEASE-2026-11-11-MAPS.md, RELEASE-2026-11-11-SHARED-PLAYER.md and HANDOFF-CURRENT.md for precise scope, deployment evidence, rollback and limits. No auth/database, dependency, paid-provider or billing change. Preserve the previously verified US$1 cap/automatic pausing; Pro subscription charges are separate.

The earlier refinement release remains included. The synthetic planner fixture and unified-app cutover remain separate. VIDA is a long-term umbrella direction, documented in VIDA-FUTURE-DIRECTION.md; AVES remains the current brand.

## Already live: preserve these

| Work | Delivered scope | Remaining scope |
| --- | --- | --- |
| Discovery map, AVES-003a | Equal Earth overview, one country-switching bird viewer, regional selection, return/reset and direct links | Ecological overlays are003b |
| Dividers/framing, AVES-006 | Responsive map/media split on three country homepages, keyboard/reset and media-first narrow layout | Physical touch/foldable testing |
| Maps and regional previews, AVES-012c/046/066 | Names-first homepage maps, real regional contours, deliberate preview/navigation, Colombia whole-shape hover | Single-map layout and neighbour navigation live; physical touch review remains |
| Contextual birds and language, AVES-006c | Selection-linked headers, locally sourced horizon flocks and personal planning prompts | Scroll movement live; physical-device checks remain |
| NZ planning, AVES-004a/005 | Questionnaire, living-species wishes, private draft/review/share, owner receipt and Google sign-in | Real guest feedback and later refinements |
| South Island page, AVES-007/013/017/034/036/037/038 | Habitat/place/photo pilot, living-only selection, land-cover/satellite shading, place/resource carousel, map controls and scale | North Island/Rakiura and wider rollout |
| Photos and Info, AVES-012d/039/051 | Shared transparent Info, fit/full-screen pilot, 362 of377 living checklist image references | 15 references pending; deeper zoom is preview-only |
| Sound, AVES-008/053/068 | One dock for bird calls, map-side region soundscapes and travel media; opt-in following; curated paused handoff | Dynamic call/soundscape reload restore and physical-browser checks remain |
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
| Wider map language, AVES-012/012a/012b/012c/018 | Consistent regional duos, bird carousels and collection titles | Single-map explorer layout live; broader data rollout queued |
| Satellite/city layers, AVES-021 | Accurately aligned, licensed region imagery and useful transport/city labels | South Island pilot live; wider coverage queued |
| Bird diversity and copy, AVES-001/002 | One sourced Colombian bird/content batch without repetitive or unsupported claims | Santa Marta copy pilot complete; expansion queued |
| Origin beyond NZ, AVES-025/048 | Apply reliable sourced classification elsewhere; separate origin from migration/activity | NZ origin live; broader categories queued |
| Seasonal observations, AVES-057 | Dated, licensed observation layer with honest season/location uncertainty | eBird commercial permission required; enquiry unsent |
| Pronunciation/cultural content, AVES-010/022/056 | Permissioned bird/place-name audio, Māori pilot, logo-species name/pronunciation | Queued; native-speaker/community source and rights |
| Place-name/hover motion, AVES-043/044 | One restrained world-map preview or paired-name animation | Queued; reduced-motion and navigation checks |
| Regional card flips, AVES-015/037 | Extend the delivered South Island pilot while preserving accessible alternatives | Wider rollout queued |
| Atmospheric media, AVES-041/053 | Habitat-led background/soundscapes with licensed, lightweight assets | Forest/stream/coast pilot live; mountains/wider regions pending |
| Owner video library, AVES-031/060 | Inventory verified uploads/masters, efficient web renditions and adaptive playback | Queued; originals, rights and cost review; no raw8K default |
| Bird logos/3D/feather controls, AVES-050/058 | Regional artwork delivered; later lightweight 3D/species-control pilot | 3D queued; original artwork and rights preserved |
| Navigation/sitemap, AVES-033 | Expandable country/region/page hierarchy and discreet journey links | Tree UI queued; sitemap review required for every release |
| Currency, AVES-035 | Discreet optional conversion with source/date and explicit currency | Queued; no misleading live-rate claims |
| Team/host role, AVES-030/045 | Explain real host review, coordination and current team accurately | One-person page live; operational expansion queued |
| Human-reviewed proposals, AVES-023/059 | Reuse private brief for sourced, realistic itinerary/options and short trip story | Manual editor exists; generation/provider/evaluation separately scoped |
| Sydney launch product, AVES-024 | One validated itinerary with operators, costs, pacing and sustainability evidence | Queued before advertising/bookings |
| Community/wishlist, AVES-004/054 | Optional account wishes, community connections and later bingo | Existing pilot selection live; broader social features queued |
| Colombian Spanish, AVES-014 | Natural es-CO translation with retained English, locale metadata and tested layouts | Lower priority |
| International branding, AVES-032 | Evaluate pronunciation/identity and optional landscape-contour direction | VIDA umbrella recorded for the long term; retain AVES now |
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
