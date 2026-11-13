# AVES incremental improvement roadmap

Reset on 13 November 2026 from Revamp bird inventory experience, the recovered handoff and the album-current working tree. This is the continuation index; older numbered queues remain evidence, not a second active work list. New IDs below are distinct from historic audit numbers.

## Where we are — 14 November 2026

| State | What is included | Evidence / next action |
|---|---|---|
| **Live and verified** | Carousel/map repairs, national inventories, region-aware AVES labels and bird-list links, all-edge desktop map/guide resizing, keyboard/reset controls and narrow-phone layout fix | Production `a4acaed` on both aves.bio and www.aves.bio; deployment `dpl_7BwVzLgpDKJvWfCHGHMgjieihJdy`. Full CI and live 320px/1365px checks passed |
| **Release gate passed** | Landscape-region dropdown no longer expands the phone page | CI 43516111175: 782 unit tests, 33 priority journeys, 161 full browser checks, lint/types/build/audits/accessibility passed. Both domain assignments independently verified |
| **Next locally tested draft** | Bounded desktop search input, real header search submission and 200% text sizing | Production build plus 3 focused Chromium/Firefox checks pass. Still uncommitted; requires its own clean full release check |
| **Other local drafts** | Team/guide profiles, creator album/credits, About/copy/footer, admin-plan cleanup | Preserve and review as separate increments. Not included in the pushed feature candidate; no live deletion authorized |
| **Content work queued** | Comprehensive regional evidence/status coverage, Colombia journal, stories, contribution invitations, drones and 3D | Existing national catalogues are substantial; regional evidence and verified conservation coverage remain incomplete. See R32 audit below |

**Next action:** develop and verify R04 camera continuity as a separate increment. A shared geographic canvas is in development for the main explorer; the specialist South Island habitat map requires its own follow-up. Do not publish either until the applicable full checks pass.

**Latest diagnostic and correction:** CI 43515115628 identified the landscape-region label/select as the concrete width offender: its box extended from x=16 to x=350 on a 320px screen. The label and select now have explicit bounded width and `min-width: 0`. The correction passed full CI and live checks; earlier cookie/map-containment attempts were insufficient.

### Next map priority: one camera across planning and satellite layers

Switching Planning ↔ Satellite must change the map style only. Preserve geographic centre, zoom/ground scale, visible geographic extent, viewport size, and selected country/region/place in both directions. Example: a visitor viewing Colombia in the planning layer must see the same Colombia framing immediately after selecting satellite, without a world reset, extra pan or auto-fit. Preserve subsequent pan/zoom changes when switching back. Apply the same rule to other base layers, desktop/mobile, fullscreen and panel resizing; resizing may change visible extent with the new viewport, but must not silently reset the camera.

Implementation should share geographic camera state between renderers (or use one renderer with multiple layers), rather than equating unrelated SVG scale and tile zoom values. Keep geographic size and framing consistent; decorative planning shapes must not force a different extent. Acceptance tests must switch both directions after country, region and place selection and after manual pan/zoom. This is **in development, not published**, prioritized ahead of decorative map motion.

### Pushed implementation commits

| Commit | Increment | Publication status |
|---|---|---|
| `f5319dd` | Regional AVES identity and country/regional bird-list entry links | Live in `a4acaed` |
| `54ff0ae` | Landscape navigation wrapping and browser readiness checks | Live in `a4acaed` |
| `4d8ad0d` | Desktop map/guide edge and corner resizing, keyboard controls and geometry/browser tests | Live in `a4acaed`; CI and live resize/reset checks pass |
| `2c87765` | Separate, scrollable cookie choices with adequate touch targets | Pushed; did not resolve the underlying page-width problem |
| `a4527a0` | Paint containment for zoomed map artwork | Pushed; local matrix passes; Linux page overflow remains |
| `a4acaed` | Bound the actual landscape-region label/select width | Live; full CI and phone checks pass |
| `1e229d4` through `c8b7376` | Phone touch/viewport diagnostics and early deployable-page regression gate | Pushed; diagnostic/test changes, not additional public features |

Supporting records: [repair release](RELEASE-2026-11-14-ALBUM-MAP-REPAIRS.md), [inventory release](RELEASE-2026-11-14-INVENTORY-ALBUM.md), [regional/resizing release](RELEASE-2026-11-14-REGIONS-RESIZING.md).

## Prioritized delivery plan

Updated from the pasted Revamp conversation and subsequent requests on 13 November 2026. This section supersedes older status snapshots below. P0 blocks publication; P1 completes the requested discovery experience; P2 creates the Colombia journal; P3 adds collaboration and future media. Existing R IDs remain stable.

| Priority | Category | Included tasks | Completion criteria |
|---|---|---|---|
| P0 | Release reliability | R01, R15, R21: repair failures resolved and repair release live; retain full checks and evidence for each subsequent candidate | Exact commit passes lint, types, unit/browser suites, builds, audits and budgets; desktop/mobile visual review; live smoke check and recorded rollback after deployment |
| P0 | Carousel and maps | R02–R05: consistent compact albums, bird thumbnails and visible eyes; nonoverlapping controls; map/place continuity | Initial load, slide changes and resizing work in bird-only and side-by-side modes; zoom/reset/layers/fullscreen and keyboard focus work on supported map backgrounds |
| P1 | Collectible bird guide and search | R06–R08: Jet sticker-album inspiration; photo/video-first cards; tap to reveal identity, habitat and location; visually scannable search and wishlist | Responsive cards, accessible reveal, working filters/history/search focus; preserve species IDs and saved wishes; source detail available without dominating the story |
| P1 | People and attribution | R09, R13: nine recovered guide and four advisory profiles; portrait thumbnails; creator album and Nicolás filter | Verify profiles, original links and credits; thumb/touch/keyboard browsing; distinguish existing media from an unfinished Instagram import |
| P1 | Shared navigation and brand | R10–R12: consistent contextual header/footer, separate AVES/home and displayed-bird/species links, warm copy and broader About | Colombia menu simplified; Australia/NZ menus consistent; country/region travel tips match location; recover original barranquero voice before claiming to reproduce it |
| P1 | Motion and map clarity | R22–R24 and R31: changing flock, birds/map transition, country labels on interaction, edge/corner resizing | Mobile and keyboard usable; reduced-motion fallback; no loss of map camera, selected bird, focus or scroll; no hover-only information |
| P1 | Regional bird coverage | R32: extend the existing national catalogues with dated regional evidence and verified global/national conservation sources | Preserve taxonomy and assessment provenance; distinguish unknown status and missing photographs from absent species; measure combined regional coverage after each import |
| P2 | Colombia first trip | R25–R28: dated journal, complete species list, curated photographs, linked map/places/guides and public chapters | Actual trip evidence anchors dates and claims; photo matching carries confidence; sources/credits retained; chapters usable for others planning a similar trip |
| P3 | Sharing and growth | R16–R20, R29–R30: verified species/media expansion, contribution invitations, South Island planning, drones and 3D | Explicit sharing controls and contributor attribution; real supplied assets; invitation drafts before any separately authorized sending |
| Separate | Administration and business | R14 and retained owner-dependent scopes | Validate admin access and cleanup independently; no live deletion implied by preparing tools or publishing visual improvements |

### Current candidate and deployment gate

**Latest live release:** `231e8e9`, deployment `dpl_2eyPYqT6PZu3wvGbuuXu9kH9AJhu`, on both live domains. The inventory/search album passed CI 43462694524 (777 unit tests, 33 priority browser journeys and 157 full-suite browser checks), then live desktop/phone checks for all three national inventories, conservation sources and Spanish search navigation. The duplicate search photo/title link uncovered by the earlier run was combined into a single accessible destination link. See `docs/RELEASE-2026-11-14-INVENTORY-ALBUM.md`. Regional data completeness and new assessments remain open.

**Current candidate:** `a4acaedc130548eb3e94af9f86b87674fb3a8e4f`, awaiting complete CI 43516111175. The earlier application snapshot `a4527a0` passed the isolated local 84-check matrix; Linux diagnostics subsequently identified the native landscape-region selector as the remaining width offender. Its label/select now have bounded width and can shrink. The newest correction is not yet fully verified or published.

**R31 candidate behavior:** desktop resizing from all map/guide edges and corners, bounded to the available page width. Shared edges adjust the split; outer edges adjust workspace width; top/bottom edges adjust height. Includes keyboard controls, Escape cancellation, Reset and a narrow-screen stacked fallback. Four new geometry tests pass; the local suite passes 785 tests including unrelated drafts. Exact-commit CI remains required. Restored team/creator content and admin drafts are separate unpublished work.

**Unpublished navigation draft:** the replacement desktop search input in `components/new-zealand-header.tsx` caused the two local enlarged-text failures. Its width is now bounded, the input can shrink, and focus no longer expands it. A new local production build and 3 focused browser checks pass: 200% text in Chromium/Firefox and real header search submission (1 intentional project skip). This remains excluded from the current release; retain the existing Search link in production until a separate exact-commit release check. The earlier broad local run otherwise passed 82 checks (12 intentional project skips).

**R32 combined coverage audit (14 November):** the actual public index combines curated profiles, place associations and regional evidence. Colombia has 207 species with at least one regional association (of 1,983 records; 1,945 shown by default), Australia 20/977 (969 default), and New Zealand 41/432 (377 default). Source-backed global statuses match 24 Colombia, 29 Australia and 36 NZ records; these overlap between countries and must not be summed as distinct assessments. National assessments match 0, 3 and 1 respectively. Sierra Nevada has 189 reviewed regional records; other Colombian regions have 3–4, Australian regions 3–6, and NZ North/South/Rakiura 18/32/11. Next content increment should expand dated regional evidence and verified conservation sources, keeping historical/reference scope and unknown status explicit.

### Earlier checkpoints — historical, not current readiness

Repair release is now live: `57d811f`, deployment `dpl_2FaQN8WrWeWz7UeGGEn8wcyoXZMC`, both `aves.bio` and `www.aves.bio`. Exact CI passed (777 unit tests; 33 priority browser journeys; 155 full-suite browser checks). Desktop and phone live smoke checks passed, with no error/fatal runtime rows in the scoped check. See `docs/RELEASE-2026-11-14-ALBUM-MAP-REPAIRS.md` for evidence and limitations. The inventory/search album is the next separate candidate; regional completeness and assessment expansion remain open.

Next candidate `e63e65e` contains the seven-file inventory/search album increment, including existing verified conservation labels and expanded source detail. [CI 43460650035](https://github.com/mmelendro/Aves/actions/runs/43460650035) is pending. Nine species-reference tests, local typecheck, production build and 26 representative browser/accessibility checks pass (one deliberately excluded viewport combination). The region-aware logo and more visible country/region inventory entry links are separate local drafts, not part of this candidate.

14 November update: HEAD `57d811f` adds narrow-screen arrow placement so carousel navigation no longer shares the wishlist/expand control row. Previous `89d5b4c` corrects the complete enquiry-alert assertion; all enquiry journeys pass in CI. Run 43430116602 completed the full browser matrix with 154 passed, 181 deliberately skipped project combinations and one narrow-phone NSW target-size failure. The new exact candidate is being checked in [run 43457360282](https://github.com/mmelendro/Aves/actions/runs/43457360282); no deployment yet. The earlier candidate paragraph below is retained as diagnostic history.

R32 inventory audit: country datasets already contain 1,983 Colombia, 977 Australia and 432 New Zealand records, including reference-only/historical entries according to each source scope. These are record counts, not promised current resident species totals. The conservation snapshot contains 414 records, but only 73 have verified global status and four carry a national assessment; unknown entries are not completed conservation coverage. The separate regional evidence file has 190 Colombia edges; Australian and NZ region associations also come from curated profiles/place catalogues, so zero entries in this one file does not mean zero regional coverage. Next increment must measure the combined coverage, expose full inventories clearly and fill sourced regional/status gaps.

Branch `feature/album-experience`, HEAD `a93e552`. Uploaded repairs: `cfded29` (carousel/map/test repairs), `25053fc` (layers Escape and portable photo validation), `a93e552` (scheduler close stacking and isolated enquiry fixtures). None is recorded as published.

Exact-commit [CI run 43427605989](https://github.com/mmelendro/Aves/actions/runs/43427605989) passes lint, types, all 777 included unit tests, audits, production build and performance budgets. The priority browser run still fails the enquiry recovery scenario on desktop and phone: the expected unconfirmed-save message is missing. The full browser suite was consequently skipped. Earlier scheduling and other submission failures now pass. All 18 separate local carousel/map checks passed; these do not replace complete exact-commit verification.

Deploy in increments: first the verified repairs, then verified discovery/people/navigation changes, then motion and the Colombia journal. Review shared dependencies when staging each increment. Preserve unrelated drafts and exclude raw test logs, private source spreadsheets, expenses and personal contact details from the public repository. Before deployment verify the exact commit and target project; after deployment verify live routes, imagery, enquiry recovery and appropriate account/admin access, and update the release register. Publication authorization already exists; passing checks remains mandatory.

## Historical state and implementation detail

The following earlier snapshots explain the recovered work. Their test counts and HEAD references are historical; use the current candidate above for release readiness.

### First-priority repair candidate

The first increment is isolated on `feature/album-experience`: `cfded29` unifies compact 3:2 bird framing, keeps full photographs visible, restores working map controls and repairs test/platform assumptions; `25053fc` closes the layers panel with Escape after zoom and makes generated-photo validation independent of checkout line endings. Both commits are uploaded. Other local feature drafts remain outside this candidate.

Local verification before the final Escape follow-up: 780 unit tests passed, lint/typecheck/build passed, and 10 browser history/image-delivery checks passed. Six new carousel/map journeys passed their image/layout/zoom assertions but exposed the Escape focus failure. The follow-up passes focused component tests, lint, typecheck and generated-photo validation; its full browser rerun is pending. Exact-commit CI is https://github.com/mmelendro/Aves/actions/runs/43426126735. These are candidate results, not publication evidence.

Production was rechecked at runtime `43943bb2740dfce0fafd43577ffbafec3037ed5a`, deployment `dpl_49nEtSR46vpeufJSdLncJ8r9i8Te`. Publication remains gated on the complete checks. The historical planning snapshot below explains the recovered backlog.

Working branch: feature/album-experience; HEAD 78dca28. The recovered source is available locally. Transfer is no longer a blocker. Ten repair commits and one unfinished handoff commit are present. No commits were listed as local-only against the cached remote refs; this is not a fresh remote or deployment check. Pending commit work means the uncommitted files and unfinished features below, not eleven proven unpushed commits.

Last documented production runtime is 43943bb, deployment dpl_49nEtSR46vpeufJSdLncJ8r9i8Te. Production was not rechecked during this planning reset. The earlier user authorized testing and publication, but subsequently required carousel and map fixes before publishing. This reset itself makes no website release.

The saved local test run reports 780 tests: 769 passed and 11 failed. Lint stopped on missing eslint-plugin-react-hooks resolution. Subsequent edits mean these logs are historical diagnostics, not validation of the final candidate. Earlier passing CI applies to older source only.

## Committed repairs awaiting release verification

| Commit | Scope |
|---|---|
| 5d49f97 | Schedule Call opens without submitting an enquiry |
| e725391 | Preserve unsaved workspace edits during section history |
| b85eb8e | Protect public enquiry drafts and retain destination context |
| 02ba3c5 | Explain export limits before draft deletion |
| e29a6d8 | Source and HTML release gates; enquiry recovery checks |
| 4093e3d | Accurate cookie wording |
| e61fd01 | Dismissible scheduling and both enquiry guards |
| 284dcf8 | Hook/lint cleanup preserving editing and map behaviour |
| eeee23e | Current release references in recovery runbook |
| bb2fc99 | Scheduling load-error indicator |
| 78dca28 | Preserve unfinished map work and research; explicitly not release-ready |

Old audit items 0–7 have corresponding repair commits; item 8 is partial because business-plan evidence still needs refreshing after release. Do not repeat the repairs or label them published without checking the candidate and deployment.

## Proposed commit groups for current local changes

These are review units, not commits already created. Shared files require selective staging and dependency review.

| Group | Current files and purpose | Remaining completion |
|---|---|---|
| C1 Album and search | country-species-inventory, inventory-bird-image, search/species routes | Confirm visual reveal, filters, URL/history, pagination and source notes |
| C2 Shared carousel and wishlist | homepage-bird-carousel, Australia carousel wrapper/explorer, new bird-wish-button | Compact proportions, thumbnails everywhere, visible eyes, saved-trip behaviour |
| C3 Team and creators | team-members, team-carousel, team page, creator-album, credits and About | Verify recovered nine guide and four advisory profiles, media/links and thumbnail navigation |
| C4 Brand and navigation | brand-mark, brand-flight CSS, global-navigation, new-zealand-header | Verify separate AVES/home and bird/species links; finish contextual menus/footer |
| C5 Admin cleanup | admin plans page/API, admin-plan-cleanup, account-service, trip-plan-editor, quotes link, migration and tests | Verify admin identity, deny ordinary users, preview scope, safe bulk-delete workflow |
| C6 Media and file integrity | responsive-photo generator, rendition manifests/audit, .gitattributes, three marked GeoJSON files | Check image sizing and exact data bytes; distinguish line-ending noise from content changes |
| C7 Map completion | Existing WIP in 78dca28 | Finish controls and in-frame place view before release |

Do not include raw lint-results.txt or test-results.txt as product source. Preserve useful failure evidence in the release record. Avoid sweeping unrelated work from older worktrees into this branch.

## Ordered implementation backlog

Status Draft means some local implementation exists but acceptance remains open. Ready means a clear next implementation task. Later means deliberately outside the first repair release.

| ID | Category | Increment and acceptance | State |
|---|---|---|---|
| R01 | Release foundation | Resolve local dependency lookup; classify all 11 failures; verify geometry bytes without weakening integrity assertions | Repair release live; new candidate has one Linux phone blocker |
| R02 | Carousel | One compact album treatment across bird carousels, including Australia/NZ/article/standalone views; thumbnails; visible eyes; no empty oversized frame on load, slide or resize | Shared framing repairs live; continue visual refinement incrementally |
| R03 | Map controls | Remove overlap and duplicate hand controls; one working zoom/reset/layers/fullscreen set on satellite, roads and topographic, including South Island | Core control repairs live; continued regression gate |
| R04 | Map continuity | Planning ↔ Satellite must preserve geographic centre, scale, visible extent, viewport size and selected country/region/place. Colombia must remain identically framed when changing layers. Preserve manual pan/zoom in both directions; use shared geographic camera state, not unrelated SVG/tile zoom values. Also retain map/place continuity and honest media states | Newly clarified priority; exact layer-camera continuity not yet implemented |
| R05 | Map finish | Layer menu positioning, keyboard/Escape, opacity zero, city labels/click-to-zoom, business address/map links; correct world frame without stretching geography | Core repairs live; broader polish remains |
| R06 | Bird guide | Photo/video-first collectible cards with accessible identity/habitat/range reveal; concise copy and source disclosure; preserve search/filter/pagination and non-JS access | National album/reveal experience live; further media expansion queued |
| R07 | Search | Search expands into focused silent input; visual album results; working empty states, query URLs and browser history | Visual results live; header input draft tested locally, not pushed |
| R08 | Trip wishlist | Heart on shared cards; correct species IDs, login/save feedback and trip association; preserve existing wishes | Existing wishes preserved; continued integration work remains |
| R09 | Team | Restore all recovered profiles and original links; compact profile carousel with portrait thumbnails, keyboard and mobile browsing | Local draft; not published |
| R10 | Global navigation | Consistent menu/footer design for Colombia, Australia and NZ; locally relevant travel tips and regional links, including South Island; simplify Colombia where redundant. Location-aware logo label: AVES with the country name on country pages and the region name on regional pages (for example, AVES · Colombia → AVES · Sierra Nevada). On place pages retain the region beneath AVES and put the place name in the page heading. Keep the country available in a small breadcrumb on regional/place pages. Update from the current page or explicitly selected destination, never from map panning alone; verify mobile fit and navigation continuity | Regional labels/links pushed; combined release held; other navigation drafts remain |
| R11 | Brand | Species-changing hover/focus bird with reduced motion; AVES leads home, bird leads to displayed species; global/country/region species selection backed by evidence | Implemented and pushed in regional candidate; not live |
| R12 | Copy | Warm, light Spanish-inspired charm and discreet bird puns across discovery; factual range caveats retained quietly; broaden About beyond Colombia | Inventory copy live; About/footer/voice work remains |
| R13 | Creator album | Photo/sound contributors browse as an album; exact source links; Nicolás filter and contributor attribution throughout | Draft |
| R14 | Admin cleanup | Admin-only old-plan selection across all users, preview/count and explicit confirmation; ordinary users denied by server/database; verify owner admin access | Draft |
| R15 | Release | Typecheck, lint, unit/browser checks, build and budgets on exact candidate; desktop/mobile visual acceptance; publish then verify live URLs, admin access and rollback record | Blocked by Linux narrow-phone overflow; do not deploy current candidate |
| R16 | Species links | Canonical eBird links using verified exact taxonomy mapping; no guessed codes | Ready after core release |
| R17 | Soundscapes | Review 15 source candidates; source/listen cards with locality, creator and licence; resolve seven regional gaps; compact follow-call control with clear playback errors | Research only |
| R18 | Content growth | Reviewed regional/endemic coverage, better source images, place/business videos and guide introduction videos | Needs content |
| R19 | Community media | Nicolás Instagram import pilot, then discreet Instagram/TikTok/Facebook links/integrations and partner submissions | Needs exact account and supported import route |
| R20 | Bird models | One accurate editable model, then future regional 3D brand assets | Later; needs assets |
| R21 | Reporting | Refresh release register, runbooks, audit and business-plan product evidence after validation | Roadmap/release records updated at this checkpoint |
| R22 | Heading flock | Birds change their relative positions into flowing formations, rather than translating a rigid group; subtle wing variation; pause/reduce motion appropriately | Requested; not implemented |
| R23 | Birds and map transition | One coherent switch inspired by the AVES/Birds word flip: page turn toward the guide, restrained globe-like turn toward the map only where it improves orientation. Keep controls stationary, preserve each view's state, prevent hidden-face interaction and offer an immediate reduced-motion switch. Check phone portrait/landscape and rapid repeated taps; do not intercept map gestures | UX direction selected; implementation pending |
| R24 | Map labels | Overview country names hidden at rest, revealed on hover and keyboard focus. On touch, selection reveals the name and an explicit explore action. Accessible names remain present. Keep the selected label readable and avoid confusing the change with removal of useful city/place labels | Requested; implementation pending |
| R25 | Trip evidence | Populate the first Colombia trip from the planning spreadsheet, saved eBird PDF, live report and AVES Colombia album. Use actual checklists to anchor the route; flag planning/calendar discrepancies and approximate photo matches | Public taxa/checklist source data retrieved; import pending |
| R26 | Trip media | Curate best originals, preserve credits/capture dates and connect each to species, place and chapter where evidence supports it. Make the broader trip album browsable; inspect potentially personal media before public use | Existing Royann originals available; Google Photos album accessible, bulk download not confirmed |
| R27 | Journal and public stories | A beautiful chronological journal with full species inventory, photo discoveries, linked map, visited places and verified guides; public highlights may use the existing blog with a story per trip section. Paladin: Learn History inspires short chapters and interactive discovery, without copying its branding | Requested; implementation pending |
| R28 | Narrative voice | Locate the saved Spanish passage in earlier conversations: barranquero described as “el ingeniero del bosque” or similar. Use its warmth, curiosity and light bird wordplay across the site; keep factual/source detail concise and expandable | Original passage not yet found; clues recorded |
| R29 | Shared journey | Prepare eventual invitation/contribution experience for Lisa, Peter, Royann and Sylvain; use the Colombia journal as an introduction before shared South Island planning. Define read/contribute permissions and attribution | Future scope; no invitations sent or sending authorized |
| R30 | Future media | Add user-supplied drone videos and 3D models to appropriate places/chapters with lightweight mobile previews | Waiting for assets |
| R32 | Species coverage and conservation | Comprehensive sourced country checklists for Colombia, Australia and New Zealand, plus region-level occurrence lists. Include every supported species even without a local photograph; keep missing media distinct from absent species. Show conservation category, assessment/source date and source link; distinguish global IUCN status from national listings and explicitly label unassessed/unknown values. Preserve taxonomy IDs, synonyms and checklist scope; identify regional evidence gaps rather than inferring presence from country membership. Audit actual coverage/counts, then import and validate each country and its regions incrementally | P1 content priority after release repairs; requested |
| R31 | Adaptive split view | Let visitors resize map and bird guide from all panel edges and corners on desktop, changing width and height; this is broader than a shared divider. The neighbouring panel and containing layout adapt without overlap, with the shared divider also available. Provide keyboard resizing, accessible separator values and reset. Enforce usable minimum panel sizes; use stacked panels or the existing view switch on narrow phones. Resize the map correctly, preserve camera/selected bird, keep bird eyes visible, and test touch, rotation, zoom and repeated changes. Deliver alongside R23 after P0 repair verification | Implemented and pushed; local and CI resize journeys pass; combined release held |

The personal Spanish style note remains unfound; existing translation dictionaries are not that note. Nicolás consent was stated by the user; his exact Instagram account remains unresolved in the recovered chat. A filter is not a completed library import. Do not fabricate missing photographs, footage, biographies or regional presence.

## Retained business and owner-dependent backlog

All 19 remaining scopes from old audit 9–27 are retained here without renumbering them as implementation work.

| Category | Retained scopes and dependencies |
|---|---|
| Business facts | Identity/roles/public claims (9); support hours/timezone/emergency arrangements (10); actual financials and investor edition (11) |
| Community policy | Sharing, contributor consent and moderation (12); measurement/stewardship indicators and spending limits (13) |
| Account assurance | Hosted password protection/eligibility (14); isolated restore and two-account separation proof (15) |
| Source material | Colombia originals (16, depends 12); regional species evidence (17); real eBird trip import (18, depends 12/16/17); approved original videos (19, depends 12); bird model (20); selected story/invitation (21, depends 12/16) |
| Acceptance | Physical iPhone trial (22); independent NZ traveller trial (23); fix actual observed issues (24, depends 23) |
| Data cleanup | Delete specifically identified disposable records (25). Admin tooling R14 does not itself authorize deleting records |
| Commercial cycle | First paid pilot decision (26) after business, account and traveller checks; choose next cycle from actual use and delivery evidence (27, depends measurement/trial/pilot) |

## Incremental delivery sequence

Immediate continuation: (1) verify the dropdown correction and publish the regional/resizing release only after all checks pass; (2) implement R04 planning/satellite camera continuity; (3) finish the locally tested desktop search draft and preserve identity through inventory filters; (4) grow R32 regional/conservation evidence in sourced batches; (5) finish flock and map-label polish; (6) review people/creator content; (7) assemble the Colombia journal. Each remains a separate tested increment. Retain the broader sequence below as the original dependency plan.

1. Stabilize R01, then deliver R02–R05 as a visually checked discovery repair. These are the latest explicit blockers to publication.
2. Complete the album/search/wishlist experience R06–R08 using the shared carousel foundation.
3. Finish team, contextual navigation, brand, copy and creators R09–R13 in small reviewable commits.
4. Validate R14 separately because it changes administrative access and deletion capability. Do not let media polish conceal an unverified permission boundary.
5. Run R15 for the exact included changes and refresh R21. If splitting releases, isolate omitted WIP so it cannot accidentally ship.
6. Grow verified species/media/community features R16–R20 while owner-dependent work proceeds independently.

For each increment record: scope, commit, acceptance evidence, deployment if any, unresolved issues and rollback. A committed change, a tested candidate and a live release are separate statuses. Keep historic audit IDs as references; use R IDs for this continuation.

## Evidence

- Pasted Revamp conversation supplied on 13 November: Jet-style inventory, approachable copy, team recovery, consistent context-aware navigation, compact thumbnail carousels, visible eyes, map controls and testing before publication reconciled into the priorities above. Embedded historic assistant statements are evidence of prior work, not proof of completion.
- Subsequent requests: Paladin inspiration confirmed as Learn History; barranquero/“ingeniero del bosque” conversation clue; changing heading flock; page/globe transitions; country names revealed on interaction.
- Trip sources: [AVES Colombia photos](https://photos.app.goo.gl/arJuhS2q6QYSUhax8), [eBird report 329156](https://ebird.org/tripreport/329156), supplied trip PDF and planning spreadsheet. Live report source retrieval has 504 species plus 3 other taxa and 42 checklists; the saved PDF is an earlier snapshot with different totals. Do not silently mix versions. Planning calendar year discrepancy requires reconciliation with actual 2025 observations. Source retrieval is not yet a completed website import.

- Chat: Revamp bird inventory experience, 01a1d45e-72e7-70d2-a576-f381a759002e, including latest failed-turn requests.
- docs/handoff/2026-11-13/HANDOFF.md: transferred repairs, map gaps, soundscape research and prior validation limits.
- docs/AUDIT-QUEUE-2026-11-13.md and docs/audit/queue-2026-11-13.json: retained owner-dependent work and historical production record.
- Local git status/log and saved test-results.txt/lint-results.txt inspected on 13 November 2026.
