# AVES agile priorities and release plan

Updated 10 November 2026, Sydney.

This is the retained roadmap order, including AVES-020 consolidation. C0 and owner-selected C1a/C1b/C1c are complete; see [the C1c checkpoint](CHECKPOINT-2026-11-10-UNIFIED-C1C.md). Production is unchanged. HANDOFF-CURRENT.md owns runtime/status and release permission; this plan owns sequencing; ROADMAP-DETAILS.md and AVES-CHANGE-INBOX.md retain acceptance criteria.

Next recommendation: C1d, verified-account consent and owner usability with AI requests deferred, not selected. C2/C3 public/private hosted acceptance remains required before cutover. Select one increment before implementation; each production release requires explicit approval. Older next-priority/automatic-continuation passages do not override this plan or handoff.

## Baseline and findings

| Item | Verified repository baseline |
| --- | --- |
| Main branch | webmaster/readiness-2026-11-05 at b726f4342dd6bcd4cd64d69f4211536198b9e09c before this documentation change |
| Main runtime | d34faabc3d09bee8b671b618998606ed06994bea; Production dpl_3WU7VC5jQjiN5TWBEGBGxVB82gWB, as recorded in the current handoff |
| Australia branch | australia/preview at 68711fd53bbc4882511e3d2226344828ccda208f |
| Australia runtime | 2ff09e92b25a57d89c5966352393bcdb0369db45; Production dpl_56y3bD1RTE2fngcHBr14obkGu2bx, as recorded in the current handoff |
| Consolidation | Open draft PR #3, integration/aves-unified-2026-11-08 at 33fcd0e99895257a6610c36fd30f407d3e67d4b1; GitHub reports not mergeable |
| Hosted acceptance | Draft's HOSTED-ACCEPTANCE.md records an unresolved authorised test-environment gate. Earlier temporary database provisioning was declined; no resource was created. Do not retry provisioning or spending |
| Scope of this review | Repository documents, current branch commits, PR metadata and retained acceptance evidence. No fresh live/provider verification or application QA |
| Deployment behaviour | Main vercel.json disables Git-triggered deployment for both maintained production branches. A documentation sync is not a website release |

The previous agile plan contained stacked historical notices and obsolete next tasks. Its complete text remains in [the immutable pre-review version](https://github.com/mmelendro/Aves/blob/b726f4342dd6bcd4cd64d69f4211536198b9e09c/docs/AGILE-PLAN.md). Detailed feature requirements remain in the existing roadmap and inbox.

Consolidation can reduce repeated work, but it cannot bypass hosted authentication, private-data or delivery checks. It is a short sequence of separately reviewable outcomes, not one large deployment and not a prerequisite for every useful content correction.

## Priority rules

| Priority | Meaning | Scheduling rule |
| --- | --- | --- |
| P0 | Confirmed production failure, privacy/security defect, broken essential journey or materially false claim | Interrupt other work, fix the demonstrated problem and verify affected journeys. No new P0 defect was established by this document review |
| P1 | Reduce structural risk or deliver a usable guest-to-owner planning outcome | Next planning horizon. Work in the numbered order below, subject to dependencies and blockers |
| P2 | Improve discovery, planning decisions and reuse after the essential journey works | Select small pilots using observed guest needs |
| P3 | Visual polish, wider media and speculative expansion | Keep queued until higher-value outcomes are met |
| Blocked | A permission, privacy, source, resource or operational prerequisite is missing | State the blocker and next decision. Continue an independent ready card; never weaken the gate |

Order uses guest/business value, demonstrated risk, dependency leverage, evidence readiness and effort. It is an ordinal judgment, not a fabricated revenue forecast or numerical ROI score. A real guest deadline or failure can change the order.

Effort points are relative: 1 very small, 2 small, 3 medium, 5 substantial. Split any card larger than 5 before starting. Points include proportionate checks and documentation, not guaranteed hours, dates, credits or allowance use. Re-estimate code work after C0. Work in progress limit: one implementation outcome; a blocked card is recorded as blocked rather than left silently in progress.

## P1 ordered delivery queue

Each row is a candidate increment. A sequence can span several sessions; it is not an instruction to deploy the whole queue.

| Order / card | Outcome / IDs | Why now | Dependency and completion gate | Effort / deliverable |
| --- | --- | --- | --- | --- |
| 1 C0 complete | Refresh consolidation delta inventory, AVES-020 | Avoid integrating an obsolete draft or losing recent releases | Compare exact current heads with PR #3; identify route/config/component collisions, backend/session dependencies and all post-draft features. Record port order, test matrix, target project options and blockers. No source merge or provider changes | 2, completed assessment; see [C0 findings](CONSOLIDATION-DELTA-2026-11-10.md) |
| 2 C1 | Update one bounded integration slice, AVES-020 | Reuse the existing draft rather than rebuild AVES | C0 and C1a/C1b/C1c complete. Remaining source slice: C1d consent/owner usability/deferred AI (3). Reconcile deliberately on the existing integration branch; retain current accounts/database/URLs and preview guards | Up to 5 per slice, code checkpoint |
| 3 C2 | Verify refreshed unified public preview, AVES-020/033 | Establish that one application preserves the site | C1. Exact candidate passes targeted suites, TypeScript/build, desktop/narrow/keyboard, route/assets/canonicals/sitemaps/redirects/private exclusions and preview protection/no-index. Preview remains read-only. Record physical-device/media limits | 3, preview only |
| 4 C3 | Complete hosted private acceptance, AVES-020 | Account, private planning and inquiry regressions are cutover blockers | C2 plus an explicitly authorised test setup. Verify Google/email callbacks, confirmation/recovery/sign-out, deployed-session compatibility, private save/reopen/edit, NZ answers/wishes/budgets, share/owner/proposal, isolation and authorised inbox delivery. Synthetic data only. Current setup gate remains unresolved | Up to 5, acceptance checkpoint; blocked until setup is resolved |
| 5 C4 | Unified production cutover, AVES-020 | Deliver one maintained AVES application | C2/C3 pass on current candidate; owner explicitly approves exact release and required provider/config changes. Review target production project, indexing/env behaviour, callbacks, aliases and rollback. Build correct production target, verify live public/private journeys. Do not promote read-only preview artifact | 3, separately approved production release |
| 6 C5 | Retire redundant deployment dependencies, AVES-020 | Finish simplification without breaking legacy paths | C4 plus an agreed observation period and live checks showing no remaining proxy, hostname, callback, asset or integration dependence. Explicit separate approval before project retirement/deletion. Keep source and recovery evidence | 1–2, operations checkpoint; no feature deployment required |
| 7 G0 | Confirm the existing South Island guest journey and capture trial feedback, 004/005/023/030 | Existing software needs a usable planning outcome | Reuse published brief/owner tests. Recheck only changed or unverified journeys; trial with the owner's actual guest workflow when authorised. Confirm dates/year, access and preferences privately. Do not silently contact guests or send notifications | 2, QA/private review; deploy only a demonstrated fix |
| 8 G1 | Small South Island route-planning pilot, 062 | Help visitors judge travel feasibility | Published map/place context, verified public entrances and dated transport sources. One route, useful towns, per-leg/total estimates and Maps links; distinguish transit, stops and rest. External links are only a first slice, not completion of embedded/in-page routing. No paid API or scraping | 3, one content/UI release |
| 9 G2 | Manual reviewed South Island trip options and host handoffs, 023/030, manual portion of 059 | Convert preferences into a concrete AVES service | G0, relevant G1 facts and current private preferences. Pair birds/habitats with food/culture/rest, feasible pacing, budget assumptions and alternatives. Human review before any authorised sending/booking. Use existing proposal editor | 3, private service outcome; not automatically a deployment |
| 10 B0 | Confirm the current Eco-Tourism Business Plan and launch economics, 024/030/business direction | Ensure the next product can support the founder and delivery costs | Locate/confirm the current plan with the owner. Record founder pay from month one, funding assumptions without assumed bank finance, operating costs, pricing/margin, cash flow, host capacity and measurable stewardship. Sources reviewed here do not establish a current approved financial plan | 3, private business review; no deployment |
| 11 S0 | Validate one Sydney offer, 024/023/030 | Move toward a commercially usable product after minimum NZ usefulness | B0 and G0/G2 learnings, not every NZ enhancement. Confirm route, season, inclusions, supplier capacity/relationships, accessibility, costs/margin and environmental evidence. Outreach, ads, bookings and spending require relevant authorisation | 3, private product/operations review |
| 12 S1 | Publish a reviewed Sydney inquiry product, 024 | Give interested visitors an honest next action | S0 and functioning inquiry/private-quote journey. Clear scope, exclusions, accessible page, truthful availability and no instant-booking claim. Sitemap and live receipt checks | 3, separately approved production release |

The business-plan review can be selected before C1 if the owner wants commercial readiness first. G0/G1, B0 and bounded factual fixes can proceed on the maintained apps while C3 is blocked, without waiting for consolidation or duplicating infrastructure. C4/C5 are conditional future steps, not approved actions.

Do not bundle AVES-068 seamless playback into "consolidation complete" without verifying it. A single shared layout makes it feasible; route/auth/reload boundaries and browser behaviour still require evidence. Reloads and externally leaving AVES remain document changes.

## P2 planning and discovery queue

The order below is the proposed order after the P1 service baseline. Each rollout is split by template, region or verified data batch.

| Order | IDs | Smallest useful outcome | Dependencies / exit | Effort |
| --- | --- | --- | --- | --- |
| 13 | 063 / 004 / 005 | Private saved-place pilot alongside existing bird wishes | Stable place IDs, add/remove/reopen/edit, deliberate sharing, owner visibility and isolation; needs separate account/data authorisation. No second planner | 3–5 |
| 14 | 025 / 048 | Consistent sourced species-origin facet, NZ first | Audit existing filters before adding any. Native/introduced/unknown by geography; preserve selected IDs and separate origin from seasonal activity | 2–3 per context |
| 15 | 039 | Checklist photo previews using existing licensed assets | Independent selection/preview, keyboard/tap/Escape, provenance and honest missing media; no assumption that all 377 species have photos | 3 |
| 16 | 033 | Expandable public directory | Reuse current route registries; useful country/region hierarchy and related links, no private records, mobile/keyboard support. Sitemap accuracy remains a gate now | 3 |
| 17 | 064 / 016 | Concise South Island ecological/historical orientation | Authoritative and Ngāi Tahu/mana whenua sources; expandable detail, macrons, clear perspectives, no invented legends/endorsement | 3 |
| 18 | 034 / 052 / 062 | Extend verified public places, conservation and travel context | One locality/data batch; current access, sensitive-site protection, distinguish public references from partners/certified suppliers/bookable stock | 3 per batch |
| 19 | 012 / 012a / 012b / 012c / 018 / 019 | One regional template consistency and collection-context pilot | South Island template already exists. Audit remaining gaps, then NSW candidate. Preserve notes/rights, full names, actual collection and sourced totals. No redo of homepage card pilot | 3 per template; titles/totals 1–2 |
| 20 | 001 / 002 / 027 / 028 / 045 | One trust/content correction batch | Audit claims, public price teasers, team facts and credit navigation; reuse isolated draft only after checking current source. Material false claims become P0; routine presentation stays P2 | 2–3 per batch |
| 21 | 040 / 007 / 016 | North Island minimum useful guide | Reuse proven regional template and North Island sources/media/access. Ship useful base first, then parity modules; no prerequisite to finish every South Island visual feature. Rakiura separate | 3–5 per module |
| 22 | 003b / 021 / 013 / 055 | Remaining ecological layers and geography-driven context | Inventory already published South Island layers first. One evidenced map/context pilot; accurate geometry/licences, genuine guide URLs and honest unavailable areas; no fabricated habitat boundaries | 2 discovery, 3–5 per slice |
| 23 | 057 / 065 | eBird capability and data-rights discovery | First useful species/regional links and monthly evidence plan; distinguish sightings from wishes. Personal export import is separate consented work. No verified direct wishlist OAuth/bidirectional sync | 2 discovery; implementation re-estimated |
| 24 | 010 / 022 / 056 | One cultural naming/pronunciation pilot | Verified community/native-speaker sources and permissions, local scope, no autoplay, optional missing audio; do not imply cultural endorsement | 2–3 |

These rows retain distinct acceptance criteria even when IDs share a line. Split rather than bundling unrelated code, data sourcing and content publication.

## P3 later queue

| Group / IDs | Retained scope | Ready condition |
| --- | --- | --- |
| Media continuity, 068 | Truly continuous public navigation through unified shared layout; retain paused handoff for real document changes | Stable unified candidate, explicit selection, route/auth/Back tests and physical Safari evidence |
| Sound/listening, 047 / 053 | Explicit continuous bird-call mode; mountain/wider soundscape recordings; regional programmes | Test existing pilot on actual devices first; licensed media, foreground priority, hidden/telephone behaviour and off/mute controls. Each is a separate increment |
| Media quality, 031 / 036 / 037 / 051 / 060 | Inventory owned YouTube/masters; several photos per place/habitat; wider resources/full-screen; source-supported magnification and video | Exact rights/localities; user-intent loading, useful quality, low mobile cost. Royann originals/eBird trip report and four MP4 references are not available merely because mentioned in GitHub |
| Map movement/context, 029 / 038 / 042 / 043 | Wider zoom/scale/full-screen maps, sea labels, projection-safe hover/recentring | Preserve valid geography, stable hit targets, native browser zoom and reduced motion. South Island map zoom/scale already delivered |
| Brand polish, 015 / 026 / 032 / 041 / 044 / 049 / 050 / 058 / 061 / 067 | Wider card/text animation, header contour, feather controls, faint backgrounds, paired names, acronym review and later 3D birds | Owner-reviewed small preview. Keep established bird/landscape identity, readable controls and lightweight static/reduced-motion fallbacks. Homepage word flip and one place flip already delivered |
| Translation, 014 | es-CO foundation then page/form batches | Verified launch/guest need, consistent locale metadata/forms/help and retained English; existing local switch is not complete translation |
| Money display, 035 | Dated estimated currency conversion | Real need and approved no-new-spend source; preserve original proposal currency. Current denomination selection does not convert amounts |

A low-effort P3 item can be selected deliberately, but small size alone does not make it higher priority than a broken journey or a useful planning improvement.

## Blocked and discovery-only platform work

| Item | Blocker / next decision | What remains usable |
| --- | --- | --- |
| 020 hosted acceptance/cutover | Authorised test setup, current candidate and explicit production approval; no retry of declined paid provisioning | Existing two apps and read-only integration review |
| 059 paid AI proposal generation | Previously recorded zero-data-retention entitlement blocker; no paid retries, upgrades or weaker privacy | Existing manual private proposal editor and human-reviewed research |
| 054 community/connections | Clear audience/age policy, field consent, blocking/reporting/rate limits, moderation owner and workload | Existing private accounts; no automatic directory or invitations |
| Marketplace / automated itinerary / reservations / payments, 023/024/030 direction | Proven service demand, supplier benefit/consent, evidence, unit economics and operating responsibilities | Manual host coordination and inquiry/quote product |
| Paid maps / routing / media hosting | Approved costs, licences, privacy and demonstrated need | Existing static maps, external source/directions links and intent-loaded media |
| New auth providers / campaign sending | Separate provider/consent/operational scope | Existing Google/email login and verified-account email-update consent. Consent storage is not campaign sending |

## Delivered work excluded from new-release estimates

The following scopes stay delivered. A wider parent request can still have remaining work.

| IDs | Delivered scope / remaining boundary |
| --- | --- |
| 003 / 003a / 003a-1 / 003a-2 / 006 / 006a / 006b / 006c / 011 | Connected country discovery, dividers, regional selection and focal framing. Whole-region guide context and continuous deeper navigation are separately scoped |
| 004a-1 / 005a-1 / 005b-1 / 009 | NZ bird choices, questionnaire, shared private support and Google sign-in; not proof of every later guest flow or unified hosted acceptance |
| 008 / 012d and subreleases | Available-call cue and shared translucent Info rollout |
| 001a / 017 | Santa Marta copy pilot; living-only NZ picker with historical provenance and old briefs preserved |
| 007 / 012a / 016 South Island portions | Dedicated South Island guide, regional template, practical planning and resource pilots; North Island/Rakiura parity incomplete |
| 012c / 046 / 066 | Homepage map-card language, deliberate preview/navigation and eleven Colombian shape-hover/focus paths; broader map rollout separate |
| 013a / 013b / 034 / 037 / 038 | South Island bird-habitat filter, land-cover/layers, place/photo discovery and map controls/scale pilots; full global coverage not delivered |
| 015 / 026 | Arthur's Pass map/photo flip and homepage birds/AVES word flip; broader rollouts remain |
| 036 / 051 / 053 / 068 | South Island resources/full-screen and soundscape pilots, same-app programme continuity and paused document handoff; wider media, deeper photo zoom, mountains and uninterrupted cross-document stream incomplete |
| Private budgets / email updates | Denomination-only budgets and verified-account consent; no automatic currency conversion or marketing campaigns |

## Stewardship and business value

Use the Eco-Tourism Business Plan as the commercial acceptance source once the current version is confirmed. A bounded title/content search did not identify that plan for this review; older chat references and repository aspirations are not an approved current cash-flow forecast. Do not infer pricing, margins, founder salary or a funding agreement.

Apply [B Lab's ESC stewardship guidance](https://usca.bcorporation.net/putting-stewardship-to-work-tracking-esc-standards/) as an evidence framework, not proof of certification. Source reviewed 10 November 2026. For the first service/product pilots record:

1. Known environmental/biodiversity/access risks and source/check date for each included place.
2. Practical mitigation choices for transport, waste, water and wildlife disturbance; mark unknowns.
3. Supplier environmental evidence and a review responsibility rather than an unverified "sustainable" badge.
4. Where relevant, reusable equipment/material practices and actual outcomes after delivery.
5. Local/community benefit, consent and cultural authority as additional AVES operating requirements.

Before advertising, define a small baseline, measurable goals and review cadence. No guaranteed sightings, regenerative outcome, partner status or B Corp certification. The article's generic manufacturing-oriented indicators should be adapted to a tourism service rather than copied mechanically.

## Release and review discipline

Keep the current model for this bounded documentation review. Before a selected implementation card, state the recommended model/reasoning and one reason; do not claim a model switch. Normal implementation: Sol medium. Bounded consolidation/privacy decision: Astra medium if offered/needed. No automatic premium or paid escalation.

For every selected card record outcome, exclusions, exact branch/head, dependencies, effort, checks, target and stop point. C0 must inspect current Git history rather than trust these baseline hashes indefinitely. Keep the production branches separate until an approved cutover; C1 work belongs only on the existing integration branch.

Definition of done:

1. Inspect/reuse current code and source evidence; preserve stable IDs, artwork, media rights, private data and native links.
2. Make one bounded change; remove touched obsolete logic only where verified safe. No broad cleanup mixed into delivery.
3. Run proportionate tests and required type/build checks for code changes. Documentation-only work needs status/link/diff checks, not application rebuilds.
4. Verify human/XML sitemaps, route registry, canonicals/redirects and private exclusions on relevant releases; record unchanged honestly.
5. Verify candidate desktop, keyboard and narrow layouts, reduced motion, media/navigation cleanup and country identity. Exact 320/390px and physical-device claims require actual checks. Keep untested iPhone/Safari, listening quality and background/telephone behaviour explicit.
6. Obtain explicit approval for a production release; verify the exact released revision and affected live journeys, then record recovery and sync GitHub.
7. Pause at the card boundary. A prioritised queue does not authorise the next card.

Use the Vercel connection for mmelendro@gmail.com for any later authorised release. Preserve no-new-spend, no account/database/provider changes without applicable authorisation, no broad secret pulls, no unsolicited communications and the paid-AI privacy deferral.

## Measures for reprioritisation

Capture observations without invasive tracking: successful save/reopen/share and owner review, guest blockers/feedback, usable reviewed itinerary/product, verified supplier/route facts, changed regressions and duplicated maintenance removed. Record performance/media cost when relevant and explicitly distinguish observed facts from targets. Review order after each selected increment, a real guest deadline, a production defect or a resolved blocker. No invented conversion baseline or calendar delivery promise.

All parent IDs 001–068 are retained across the queues, delivered-scope table and blocked work; subrelease acceptance remains in the linked roadmap/inbox. No feature is removed by this reorganisation.
