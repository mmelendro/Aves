# AVES product journey audit, 13 November 2026

This audit examines connections between the existing discovery, planning, account, offline and collection features. It adds 20 incremental scopes, numbered 36 to 55, without renumbering or closing existing items 20 to 35. The original audit changed documentation only. The subsequent requested implementation of 36 to 54 is now published, as recorded in the implementation result below.

## Original audit baseline and evidence

Audited source: `1cd1aaf2b69b370a373bed252e4f9434539c3c3c`. At the time of the original audit, live runtime was `bfe1192176813c4e273c1636d5fabc22807161e0`, deployment `dpl_FkVGxkbsQay9K36rDz9ZX1ei4Qbr`. The production alias was checked during this audit. Existing 751 unit tests, 109 browser checks and 81 public URL results are previous release evidence. This audit did not rerun or relabel that full suite as a new pass.

Fresh direct interaction used a synthetic seven-day North Island route, two adults, one room and entered NZD allowances. Changing the day count to six disabled account carry but still copied the old seven-day text. Reload before carry restored five-day defaults and removed the generated draft. No real traveller content was entered, saved, modified or deleted.

Fresh isolated source execution confirmed: date-only 2026-11-13 becomes 14 Nov in Pacific/Auckland; world endemic filtering returns 5 versus 45 combined country results; world native filtering returns 22 versus 72; a valid 30-day route with 15 bird wishes and four allowances creates 5,659 characters and cannot fit the 5,000-character notes contract; one optional alternative changes a three-day per-experience allowance from 300 to 400; distinct Colombian places share one region URL. Those are source reproductions, not authenticated production writes.

Other findings below are source and asset review findings. In particular, album navigation loss was not reproduced against a real account, image source sizes are not observed visitor transfer measurements, and build estimates are not measured speed. The native departure-date field did not retain a synthetic fill in the cloud test, but that was not established as a product defect and is not counted as a finding.

Real positive hosted account isolation, isolated restore, physical iPhone Safari gestures/PWA/offline acceptance and independent traveller completion remain pending under 29 to 31. No new assurance about those flows follows from the public audit. There was no production database change, public sharing, invitation or restore.

## Keep the working foundation

Discovery already includes country and region maps, conservation filters, a species picker, favourites and reviewed place references. New Zealand planning already offers route variants, bird coverage, dated road references, workload review, entry-price comparisons and user-entered allowances. These features need connection repairs rather than duplicate replacements.

Private accounts already offer saved briefs, comparison, protected destinations, revision checks, preparation records, journals, photo uploads, desired/observed albums and complete JSON backups. The practical pack already exports selected saved tasks and records as private script-free HTML. Desired and observed records are distinct; an observation is not independently verified. None of those existing capabilities is being relisted as unfinished.

## Commit order and involvement

Repair and verify 36 to 47 first. Then 48 to 50 retain an editable saved route and import preferences deliberately. Items 51 to 54 connect that foundation to useful offline information and the private bird collection. These scopes require no new owner figures, originals or paid API decisions. They still require implementation and testing; audit completion is not feature completion. Item 55 requires the actual export and rights prerequisites from the retained source work.

Each entry below is a separate reviewable commit scope. Item 47 is the repaired-journey release checkpoint. Later features require their own appropriate checks and publication evidence rather than inheriting item 47's result.

## 36. Keep calendar dates unchanged across time zones

Repair. Priority: High. Involvement: No owner input. Dependencies: None. Status: Published and verified.

Evidence: components/account/account-api.ts:55 anchors date-only strings at UTC noon. Source execution renders 2026-11-13 as 14 Nov 2026 in Pacific/Auckland, while UTC and Sydney render 13 Nov.

Complete when: Separate calendar dates from timestamps. Test New Zealand summer and winter, Sydney, UTC and a negative UTC offset. Preserve legitimate timestamp localisation.

## 37. Recover guest itinerary edits and respect cleared bird wishes

Repair. Priority: High. Involvement: No owner input. Dependencies: None. Status: Published and verified.

Evidence: Live North Island journey generated a seven-day draft with entered allowances. Reload before handoff restored the five-day default. components/island-trip-planner.tsx:80,134,154,175 stores only when carrying to My Trips. Its restore path overlays only nonempty bird baskets, so an explicitly cleared basket can resurrect old wishes.

Complete when: Provide an explicit, truthful tab recovery contract for generated routes and day edits. Preserve per-island separation, expiry, empty selections and blocked-storage feedback. Do not imply an account save.

## 38. Prevent copying an outdated itinerary

Repair. Priority: High. Involvement: No owner input. Dependencies: None. Status: Published and verified.

Evidence: Live seven-day North Island draft changed to six days. Carry was disabled, but Copy itinerary remained enabled and copied the seven-day route. components/island-trip-planner.tsx:173 guards carry, while :185 does not guard copy.

Complete when: Copy must use the current reviewed draft or require rebuilding. Cover changes to days, dates, currency, allowances and bird wishes. Keep a readable fallback when clipboard access fails.

## 39. Carry valid longer routes without overflowing planning notes

Repair. Priority: High. Involvement: No owner input. Dependencies: None. Status: Published and verified.

Evidence: Source reproduction: valid 30-day South Island Christchurch to Queenstown route, 15 sourced bird wishes and four allowances creates 5,659 characters. mergeTripNotes rejects it even with empty notes because of its 5,000-character limit. Existing notes are correctly preserved.

Complete when: Support a valid maximum-length draft through private handoff without silent truncation or dropped warnings. Preserve existing notes and an inspectable full route. Do not merely raise a client limit without checking API, database and backup contracts.

## 40. Price optional alternatives consistently

Repair. Priority: Medium. Involvement: No owner input. Dependencies: None. Status: Published and verified.

Evidence: lib/island-trip-planner.ts:432 counts primary and optional alternative experiences together. A valid three-day draft at 100 per experience increases from 300 to 400 after adding an alternative to day one. The workload and reference-price views describe that outing as an alternative.

Complete when: Distinguish replacements from additional outings consistently in scheduling, allowance totals, copied output and reference comparisons. Leave free and unquoted references clearly distinct.

## 41. Apply world bird filters using each bird's country

Repair. Priority: High. Involvement: No owner input. Dependencies: None. Status: Published and verified.

Evidence: components/homepage-destination-explorer.tsx:87,95 uses the default country, Colombia, to filter the combined world catalogue. Source reproduction returns five endemics rather than 45 combined country matches, and 22 native birds rather than 72. DestinationCardMedia and HomepageBirdCarousel repeat the country filter.

Complete when: Retain country provenance through world filtering and the carousel. World counts must equal combined country results. Keep map highlighting, bird identity and sound context consistent.

## 42. Open the exact place selected in search or favourites

Repair. Priority: High. Involvement: No owner input. Dependencies: None. Status: Published and verified.

Evidence: lib/discovery-index.ts:20 gives Cocora Valley, Nevado del Ruiz and Laguna del Otun the same regional gallery URL. components/place-gallery.tsx keeps photo choice only in memory. Favourites reuse the broad URLs.

Complete when: Use validated stable place identifiers. Search, favourites, refresh and Back must focus the chosen public place and correct region without inventing precise wildlife coordinates. Check North and South Island place destinations too.

## 43. Protect unsaved album journal and media edits during navigation

Repair. Priority: High. Involvement: No owner input. Dependencies: 14. Status: Published and verified.

Evidence: components/account/bird-album.tsx:16 and trip-workspace.tsx:34 use unload warnings only. They do not register with the shared unsaved-changes guard used by the plan editor. Logo/footer Next navigation and history can bypass unload. Source-evidenced gap, not a reproduced loss of real private data.

Complete when: Register all dirty private editors with the shared guard. Test cancel and discard through logo, footer and Back. Successful saves must clear only the saved editor's warning.

## 44. Finish evidence-based wording in media credits and tour features

Repair. Priority: Medium. Involvement: No owner input. Dependencies: None. Status: Published and verified.

Evidence: content/birds-catalogue.json:19,100,129 retains AVES Guide appointments and obsolete partner fragments rendered by species-details-panel.tsx. Live tours still links maximum-four participation to minimal environmental impact and describes services without the point-of-use qualifications added to the price table.

Complete when: Preserve creator attribution using neutral roles and valid reviewed links. Qualify proposed group size and unconfirmed services. Remove unsupported impact guarantees. Current appointments and commercial/editorial review remain item 21.

## 45. Use smaller existing renditions throughout the NZ bird picker

Repair. Priority: Medium. Involvement: No owner input. Dependencies: None. Status: Published and verified.

Evidence: components/new-zealand-checklist-photo.tsx:13,29 uses original image sources instead of the existing responsive-photo adapter. The kea original is 1,267,937 bytes despite an available 640-pixel rendition. This bypasses the lower-bandwidth preference. Source and asset-size finding, not measured visitor bandwidth.

Complete when: Use existing responsive renditions for thumbnails, quick looks and dialogs. A fresh lower-bandwidth test must avoid the original, retain attribution and illustration labels, and recover from failed images.

## 46. Load country gallery data only when needed

Performance. Priority: Medium. Involvement: No owner input. Dependencies: None. Status: Published and verified.

Evidence: Published homepage estimated initial gzip is 366,440 bytes against 367,210. lib/place-gallery.ts imports all gallery data and responsive-photo.tsx imports the full rendition map. Their source JSON files total 287,464 raw bytes. Raw source size is not emitted transfer size.

Complete when: Defer noncurrent-country media data or pass bounded records from the server. Measure resulting production chunks without increasing budgets. Preserve switching, focus, credits, language and failure states.

## 47. Verify and publish the repaired planning journey

Verification. Priority: High. Involvement: No owner input. Dependencies: 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46. Status: Published and verified.

Evidence: This audit found integration failures despite individually passing release checks. Existing release evidence remains valid for its original scopes, not these new findings.

Complete when: Run focused regressions and required release checks, then follow a synthetic public route through recovery, copying and private handoff. Publish only passing changes, verify both domains and retain rollback. Real positive account, restore, Safari and independent-person acceptance remain 29 to 31.

## 48. Store an owned versioned editable itinerary

New capability. Priority: High. Involvement: No owner input. Dependencies: 39, 47. Status: Published and verified.

Evidence: Confirmed private save consumes the tab draft, while persisted itinerary content is prose. lib/island-trip-planner.ts already defines a validated structured draft. Saved plans currently do not retain that complete editable representation.

Complete when: Add a bounded versioned owner-only itinerary contract with revision conflicts, destination validation, complete backup coverage and compatibility for existing prose-only plans. Additive migration, no fabricated legacy routes and no production restore.

## 49. Review and import structured travel preferences

New capability. Priority: High. Involvement: No owner input. Dependencies: 48. Status: Published and verified.

Evidence: trip-plan-editor.tsx:140 imports notes, bird IDs and regions, while timing, party and questionnaire preferences remain separate. Public allowances include currency, transport and per-experience basis that do not map directly to the private budget questions.

Complete when: Preview dates, adults, rooms, currency, activity basis and transport preferences before explicit import. Preserve existing answers unless the owner chooses replacement. Never silently convert currency or reinterpret daily and per-experience figures.

## 50. Reopen and edit saved itinerary days

New capability. Priority: High. Involvement: No owner input. Dependencies: 48, 49. Status: Published and verified.

Evidence: Existing private comparison and notes editing work, but do not reopen the saved daily TripDraft in the island planner.

Complete when: Reopen the owned saved route, edit days and save with conflict handling. Preserve notes, expenses and journal data. Changing a generated route must never claim to change an actual booking.

## 51. Include selected saved brief details in the offline pack

New capability. Priority: Medium. Involvement: No owner input. Dependencies: 48, 49. Status: Published and verified.

Evidence: trip-pack-handler.ts reads complete details but sends only details.message and title into the renderer. A useful saved destination, timing, party or budget can be omitted if not repeated in notes. Existing selected tasks and practical records work.

Complete when: Offer an explicit saved-brief selection covering destination, timing, party and entered budget with currency and basis. Include a saved structured route when selected. Preserve no-script offline behaviour, exclusions, revision checks and private-only delivery.

## 52. Add selected planning wishes to the private bird album

New capability. Priority: Medium. Involvement: No owner input. Dependencies: 47. Status: Published and verified.

Evidence: The planning bird wishes and the private desired/observed album are separate working features. There is no explicit bridge for the owner to choose which wishes become album records.

Complete when: Preview and add selected stable species IDs as desired only. Make repeated imports idempotent, preserve existing observations, apply catalogue and record limits, and never invent an observation date or sighting.

## 53. Link owned journal entries and photos to bird records

New capability. Priority: Medium. Involvement: No owner input. Dependencies: 43, 52. Status: Published and verified.

Evidence: lib/bird-album.ts stores species, state, date, region and notes. Existing private media attaches to journal entries rather than bird records. This is a missing connection, not a missing uploader.

Complete when: Let the owner explicitly link an existing journal entry or photo. Enforce same-owner and same-trip access, retain creator information and handle removed media. Photo linking grants no verified-sighting status. Original Colombia imports remain item 25.

## 54. Show a private bird collection across trips

New capability. Priority: Medium. Involvement: No owner input. Dependencies: 52, 53. Status: Published and verified.

Evidence: bird-album.tsx and its handlers scope each working album to one plan. No owner-level view brings those albums together.

Complete when: Show distinct desired and owner-observed species with linked trips, licensed reference or owned photos and clear no-photo states. Deduplicate stable IDs while retaining repeated observations. Name the catalogue denominator and award no verification, invented rarity or competitive score.

## 55. Preview and reconcile a supplied eBird trip import

New capability. Priority: Later. Involvement: Source files, permissions and taxonomy reconciliation. Dependencies: 23, 25, 26, 52. Status: Open.

Evidence: The user intends to supply the trip report and originals. The current reviewed route is planned travel, not a source of actual daily records. No exact export schema, original sightings or reuse rights were supplied in this audit.

Complete when: Once source prerequisites are supplied, map the actual export in a private dry run. Show matched species, unmatched taxonomy, dates, duplicate records and withheld sensitive places before an explicit import. Keep evidence and owner-entered status distinct and never publish automatically.

## Existing pending work remains authoritative

20 to 24 retain actual business financials, current appointments and editorial review, service capacity, consent rules, measurement and spending limits. 25 to 28 retain the original Colombia material, regional species evidence, original videos/models and selected story permissions. 29 to 35 retain real account/restore proof, physical device and independent traveller acceptance, feedback, specifically authorised cleanup, the paid-pilot decision and the next evidence-led cycle. See the active queue for the unchanged individual scopes and dependencies.

## Business and stewardship priorities

The current owner Eco Tourism Business Plan v3 remains the reference: validate a bounded planning service, pay the founder from month one, and use actual delivery hours, costs and customer feedback. Illustrative figures are not actual revenue or a public price. Route recovery, complete handoff and reuse of saved plans support that service directly. The collection adds value after those foundations; subscriptions, paid integrations and broad public community features should follow demand and cost evidence under 20, 23, 24 and 34.

B Lab's environmental stewardship guidance remains the reference for identifying risks, recording action and reviewing supplier evidence: https://usca.bcorporation.net/putting-stewardship-to-work-tracking-esc-standards/ . Apply it through reviewed access guidance, biodiversity precautions, attributed sources, consent, actual supplier payments and documented results under the existing business and measurement work. An optional trip-readiness/stewardship view should be assessed after the independent traveller trial, using existing preparation records before adding another dashboard. Do not assign an invented environmental score or imply certification, automatic offsets or guaranteed community benefits.

## Deferred candidates, not implementation commitments

Revisit a joined readiness view, accessibility/pace preference expansion and richer collection styling after items 30 to 32 produce actual user evidence. Public social feeds, automatic AI trip generation from scraped blogs, paid live booking integrations and 3D models are not prerequisites for the first bounded planning service. Original models and video remain item 27. Current sharing and invitation decisions remain 23 and 28 rather than duplicate new features.

## Implementation result

The requested batches 35 to 44 and 45 to 54 are released. Technical items 36 to 54 are completed. Item 35 was reviewed and remains pending actual cost, usage, paid-pilot and traveller evidence under dependencies 24, 32 and 34. Items 20 to 35 and 55 remain open. No independent technical item remains in this queue.

Runtime `0e832635514f1ec2232f63d7776996ed64993d1e`, deployment `dpl_XmJLienyDhuJRqRrVBUweQUyGK1L`, on both aves.bio and www.aves.bio. [Release checks](https://github.com/mmelendro/Aves/actions/runs/43379516403): 770 unit tests, 118 full browser checks and 128 intentional project-specific skips. 14 focused checks pass with 4 intentional skips. Build, TypeScript, unchanged performance budgets, catalogue deferral, geometry and gallery snapshots pass. Lint: zero errors, 31 warnings. Source reachability: 470 modules, none unreachable.

See [the release evidence](BATCHES-35-54-2026-11-13.md). Original audit findings above describe the pre-repair state.
