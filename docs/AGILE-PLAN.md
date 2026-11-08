# AVES — proposed agile release plan

Planning review: 8 November 2026 (Sydney). Nothing here starts implementation automatically.

## Completion estimate

**Approximately 50% complete / 50% remaining**, with a broad 40–60% remaining range for the defined website roadmap. This is a subjective effort-weighted planning judgement based on the delivered foundation and documented backlog, not measured engineering progress or historical credits. The AI/supplier/booking platform still needs discovery and is excluded from that percentage. An exact all-vision percentage would be misleading.

## Relative usage, not credit promises

Effort units compare scope: **2 lower; 3 medium; 5 higher; 8+ very high / multiple releases**. Every implementation estimate includes proportionate verification, a build where needed, publication, live checks, GitHub sync and checkpoint notes. Units are neither actual credits nor guaranteed linear cost ratios. Assumes reusing current code/data and staying on one bounded task. Model, speed, context, research, debugging, provider access and media rights can change usage substantially. I cannot see the remaining allowance or predict a percentage of the weekly limit.

Official usage guidance: https://learn.chatgpt.com/docs/pricing (reviewed 8 November 2026).

## Suggested near-term sequence

Each item below is its own release/checkpoint, not all work for one week. Choose only one when conserving allowance. This recommendation does not silently replace the owner's established priority order.

Delivered: NZ translucent Info overlay pilot (task 01), published and live-verified on 8 November. Pause before selecting the next release. Candidate sequence:

1. Three homepage map cards: shared names/callouts/style — 3 units.
2. South Island page with the shared map/media template — 3 units.
3. South Island practical planning tips — 3 units.
4. Curated NZ resources — 3 units.

Country-homepage rollout (task 02 / AVES-012d-3) is delivered for Colombia and Australia, matching NZ. Other viewer templates remain task 02b; the country frames do not establish suitability for shorter frames without further checks.

AVES-012d-2 is delivered: more of the bird shows through the NZ Info sheet, with darker readable notes/links. Local and hosted desktop/phone-sized checks, builds and sync are complete. Other-viewer template rollout remains task 02b, separately selected.

The map standard precedes card animation. Useful NZ content can proceed independently of ecological overlays or a whole-site map rollout. Only task selection is authorised by a later user instruction, not by a checkbox in a planning view.

## Release register — completed pilot and remaining candidates

| Task | Stream | Increment | Roadmap | Effort units | Expected usage pressure |
| --- | --- | --- | --- | --- | --- |
| 01 | Delivered 8 November | NZ translucent Info overlay pilot, live f5eee01 | AVES-012d-1 | 2 (original estimate) | Complete; no remaining pilot work |
| 02 | Delivered 8 November | Matching Info overlays on Colombia and Australia country homepages | AVES-012d-3 | 3 (original estimate) | Complete for country homepages |
| 02b | Visual rollout remaining | Other global/regional/experience/article viewer templates | AVES-012d | Estimate per selected template | Split shorter frames and applications into tested batches |
| 03 | Suggested first | Uniform names and styling on three map cards | AVES-012c | 3 | Medium |
| 04 | Visual rollout | Roll shared map style through page templates | AVES-012c / 012a | 5 | Higher |
| 05 | Suggested first | Dedicated South Island page and local carousel | AVES-007 / 012a | 3 | Medium |
| 06 | Suggested first | South Island practical travel guidance | AVES-016 | 3 | Medium |
| 07 | Suggested first | NZ podcasts, films, YouTube and reading pack | AVES-016 | 3 | Medium |
| 08 | NZ expansion | North Island and Rakiura page batches | AVES-007 / 016 | 5 | Higher |
| 09 | Regional quality | NSW text cards to a richer regional bird viewer | AVES-012b | 3 | Medium |
| 10 | Regional quality | First Colombian regional bird-variety expansion | AVES-002 | 3 | Medium |
| 11 | Regional quality | One editorial cleanup batch | AVES-001 | 2 | Lower |
| 12 | Regional quality | One cultural-experience / bird-significance batch | AVES-010 | 3 | Medium |
| 13 | Ecological map | Megadiverse-country layer and plain-language legend | AVES-003b | 2 | Lower |
| 14 | Ecological map | Hotspot boundaries: source and rights review | AVES-003b | 3 | Medium |
| 15 | Ecological map | Hotspot layer, explanations and accessible controls | AVES-003b | 3 | Medium |
| 16 | Animation later | NZ regional map/photo card-flip pilot | AVES-015 | 3 | Medium |
| 17 | Animation later | Photo/details 3D flip experiment | AVES-015 | 3 | Medium |
| 18 | Planning expansion | Useful questionnaire-field refinement batch | AVES-005 | 3 | Medium |
| 19 | Planning expansion | Cross-destination wishlist and safe account merge | AVES-004 | 5 | Higher |
| 20 | Planning expansion | Optional want-to-see / seen / bingo pilot | AVES-004 | 5 | Higher |
| 21 | Planning expansion | Optional multi-guest collaborative planning | AVES-004 / 005 | 8+ | Very high |
| 22 | Low priority / deferred | Full Colombian Spanish translation | AVES-014 | 8+ | Very high |
| 23 | Low priority / deferred | Facebook sign-in | Deferred | 3 | Medium |
| 24 | Low priority / deferred | First authorised species-video batch | Deferred | 3 | Medium |
| 25 | Low priority / deferred | Friendlier expired-Google-session landing | Deferred | 2 | Lower |
| 26 | Later / catalogue clarity | Hide extinct species from visitor-facing lists; NZ first | AVES-017 | 2 | Lower; verify counts, scope and saved-data compatibility |
| 27 | Architecture / planned | Consolidate into one app/project, with AVES naming/branding and SEO, through an inventory, unified preview and reviewed cutover | AVES-020 | Not yet estimated | Scope separate checkpoints; production and later retirement need explicit approval |

Several entries are optional or multi-release streams, not one-session commitments. Re-estimate after the first completed pilot; do not turn every estimate into a guarantee.

## Separate draft consolidation checkpoint — AVES-020

Phone-chat PR #3 contains an unmerged unified preview. Hosted gates and separately approved production cutover remain; carry later source fixes such as 8948ccb into that candidate before release. This transparency release does not merge or publish consolidation.

Added at the owner's request on 8 November 2026 (Sydney): consolidate the existing independent applications into one Next.js application and one production Vercel project, preserving the existing shared database and repository. Include the owner's requested naming/branding/SEO review and permission to rename projects or create a new target where useful. Start with a route/file/dependency and search-compatibility inventory, then size code integration, unified preview verification, approved cutover/rollback and later project retirement separately. Effort is not yet estimated; do not assign a credit/time guarantee or silently reprioritise the owner's current work. Recording this task does not authorise implementation or production changes. See ROADMAP-DETAILS.md for acceptance criteria.

## Unscoped / unconfirmed vision

- Small queued discovery follow-ups AVES-018 (discreet carousel collection titles) and AVES-019 (sourced approximate country species totals on map selection) need separate bounded estimates when selected. They do not resume implementation or alter the owner priority order.
- Human-reviewed itinerary/routing assistance and a verified sustainable supplier directory need a separately bounded pilot.
- AI recommendations, live supplier availability, reservations and payments are not yet sized or implemented; define the guest journey, data rights, operational responsibilities and acceptance criteria first.
- Detailed local ecosystem maps remain unconfirmed (AVES-013).
- A real guest/physical-device trial is still pending; do not send invitations or use private guest data without explicit authorisation.

## Definition of done per selected release

One clear outcome; no regressions to the current foundation; proportionate evidence and checks; affected app published and checked live; code and planning mirrors synced; actual limits recorded; then pause.
