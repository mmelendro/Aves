# AVES delivery priorities

Reassessed 11 November 2026. This is the single active backlog. CONTINUE-HERE.md is the execution prompt; HANDOFF-CURRENT.md holds release evidence. Earlier dated inventories are historical where they conflict with this plan. This reassessment changes documentation only.

## Product outcome

A visitor chooses North Island or South Island, starting town, trip dates or duration, departure town, birds, interests, pace and allowances. They receive a credible editable itinerary, understand missing information, compare genuinely different options where available, and retain their choices privately. Both islands use the same interaction model. Useful coverage matters more than equal listing counts or decorative features.

The owner's established Eco-Tourism Business Plan direction is broader nature travel with birding as an entry point, human coordination and local benefit. The original plan file remains unavailable in this checkout; financial assumptions and commercial commitments must not be invented. Use the existing planning/inquiry service while validating the wider marketplace idea.

## Current assessment

| Area | Source finding | Priority decision |
| --- | --- | --- |
| Function | South Island has 48 catalogue references, 15 bases, itinerary editing, road references and partial price comparisons. North Island has an overview anchor, no dedicated planner route. | Bring a complete, bounded North Island journey forward now. |
| Form | The South Island page combines an explorer, landscapes, bird wishes, planner, base buttons, daily cards, catalogue and resources. | Consolidate repeated choices into one clear planning sequence; retain the map as the main discovery entry. This is a source/layout assessment, not a new usability study. |
| Functionality | Draft storage, gateway choices, data imports, copy text and account handoff are tied to South Island. | Introduce an explicit island context at these boundaries before North Island data is added. Preserve existing drafts. |
| Efficiency | Shared planner children already exist; pricing and road logic still import South Island records. | Reuse the working components and pure functions; pass island data explicitly. Avoid a copied planner or a new generic framework. |
| Scientific coverage | Featured island memberships are curated examples, not complete distributions. National checklist inclusion cannot establish local opportunity. | Source local bird/site links separately for each island, with managed/wild distinctions. |
| Design confidence | Previous hosted checks cover desktop and 340px containment; physical Safari/touch and usability with independent visitors remain open. | Treat keyboard, touch, focus, small screens and independent task completion as release criteria, not final polish. |

## Current increment

NZ-01a centralizes the operational South Island configuration and adds explicit island identity to new draft envelopes and default inputs. Untagged historical South Island drafts remain valid. Explicit foreign/unknown island inputs are rejected without consuming their stored data. Only South Island is registered as operational. This is the first bounded part of NZ-01, not a reusable North Island route generator yet.

Next, NZ-01b: parameterize route generation, price/road lookup and shared presentation around the context; make private import selection and storage independent per island. Keep existing copied note markers compatible. Then deliver NZ-02. Do not mark NZ-01 complete until both contexts can be isolated in meaningful tests.

## Delivery order

Each row is a sequence of small releases, not one large merge. Finish and verify one increment before starting the next. Reassess after each completed visitor task; do not add a framework, taxonomy or form field without a clear use.

| Order / ID | Smallest useful release | Completion evidence |
| --- | --- | --- |
| 1 / NZ-01 | Shared island-aware planning foundation. Extract island configuration for labels, gateways, catalogue, road/price sources and handoff. Keep existing South Island UI/URLs; make storage and validation island-aware with an explicit legacy South Island reader. | Existing South Island route, generated choices, old drafts and account import still work. Unknown island IDs fail clearly. Switching cannot relabel, erase or import the other island's draft silently. No cross-island road inference. |
| 2 / NZ-02 | North Island pilot on its own canonical guide route using the shared planner. First release covers one researched, coherent corridor with several usable bases, rather than scattered pins across the whole island. Update overview, explorer, public tree, metadata and sitemap together. | A visitor completes a 3 to 7 day North Island trip with fixed endpoints, locally sourced birds, stays, food and at least two chosen activity categories. Base count and listing target follow source review. Unsupported endpoints/short durations produce an explicit limitation. Preserve South Island behavior. |
| 3 / NZ-03 | Coherent discovery and planning layout on both islands. One island/area selection shared by map, bird views and planner; compact map expands in place. Use a brief, results and day-detail hierarchy with progressive disclosure. | No duplicate conflicting controls or lost input. Selected region and bird remain clear. Main next action stays visible. Browser back, island switch, keyboard focus and narrow-screen editing work. No horizontal page overflow at 340px; tables scroll within their own containers. |
| 4 / NZ-04 | Practical feasibility on both islands. Add pace, transport mode and relevant walk/access needs only where they affect suggestions. Enforce sourced opening days/season constraints; distinguish a closed outing from a warning requiring confirmation. | Closed or incompatible choices are excluded from automatic suggestions where evidence is definitive; existing manual choices receive a clear correction path. Travel days, endpoint deadlines, rest/time for food and weather alternatives remain credible. Missing road/season/access evidence stays unknown. |
| 5 / NZ-05 | Useful catalogue and cost coverage on both islands. Fill gaps along the tested corridors before expanding geography. Add current product-specific costs and quote links, then compare partial or complete known costs against allowances honestly. | Each pilot base offers a stay, a food option and an appropriate outing or an explicit gap. Units, occupancy, currency, dates, inclusions and missing costs are visible. Airbnb searches remain unreviewed searches until individual listings are checked. No invented full-trip total or availability. |
| 6 / NZ-06 | Compare and retain plans. Show meaningful route differences in bird coverage, transfers, pace, known costs and gaps. Improve explicit save/reopen/edit flows through the current private model. | Compare two genuinely distinct plans when feasible; explain when only one exists. Editing one plan preserves others. Island identity, dates, sources and notes survive sign-in, save and reopen. Validate privately with synthetic records; no unsolicited enquiry/email. |
| 7 / NZ-07 | Broaden researched coverage and validate with independent visitors. Add further corridors according to unmet bird/activity wishes and real task failures. | Both islands pass the same task checklist. Physical iPhone/Safari and touch are checked when available; document any remaining device limit. Expansion does not weaken existing local evidence or make a thin catalogue look complete. |

Research and seasonal/access checks necessary for the North Island pilot belong in NZ-02, not deferred to NZ-04. NZ-04 deepens the shared constraints. Inter-island ferry/flight itinerary generation follows successful single-island planning; do not connect the islands with a road line. Rakiura keeps its existing overview until separately researched. Colombia and Australia remain supported and must not regress.

## Categories to preserve on both islands

Birding; ordinary and environmentally evidenced accommodation; individually reviewed Airbnb options where possible; food, organic ingredient and farm/garden-to-table statements; local produce; markets with operating days; hot springs; walks/hikes; adventures; ecotourism; community-led culture; wellness; transport. Category support is not a claim that every base has every option. Show useful alternatives or gaps rather than irrelevant filler.

## Design and maintenance rules

1. Keep the established AVES bird/map card identity, clear typography, restrained colours and consistent spacing. Use photographs with verified rights and useful focal crops. Do not use animation to hide loading or navigation problems.
2. Put decisions and results first. Keep provenance, detailed costs and supporting guidance available through consistent disclosures. Warnings that affect a choice remain visible without expansion. Avoid long repeated caveats on every card.
3. Reuse shared controls, daily cards, evidence displays and account flows. Separate island records from route rules and presentation. Load island-specific map/media data when needed; measure before adding performance work. No new dependencies without a concrete need.
4. Preserve stable species/place IDs and old drafts deliberately. Remove obsolete implementations and their obsolete tests after replacement works; retain licences, source records, compatibility redirects and release evidence. Comments explain non-obvious decisions, not every JSX line.
5. Define loading, empty, unavailable, invalid, stale and storage-disabled states. Keep work usable without an account until explicit save. Never lose a draft through a filter or island change.

## Evidence and stewardship

Each new record needs publisher, source URL, locality/scope and review date. Separate wild opportunities, managed populations, national/global threat status and actual observations. No invented probability, nest coordinates or implied permission to enter. Track missing/review-due evidence internally by island and category.

Apply B Lab's environmental stewardship and supplier-evidence principles through transparent environmental claims, biodiversity considerations and evidence review. B Corp certification is optional and separately verified for the named entity; it is not an eco score. Local/organic claims describe only their documented scope. No operator is implied to be a partner or endorsed supplier. Reference reviewed 11 November 2026: https://usca.bcorporation.net/putting-stewardship-to-work-tracking-esc-standards/ . This article guides the approach; it does not certify AVES or these listings.

## Release checklist

For each functional release: architecture audit, relevant domain tests, TypeScript and production build; hosted desktop and small-screen task check; keyboard/focus and existing-island regression; exact tested SHA published to both domains; canonical navigation and aliases verified; scoped error scan; record evidence/limits and rollback in HANDOFF-CURRENT.md. Use the same acceptance scenarios for North and South: fixed-endpoint short trip, longer balanced trip, unmatched bird, unavailable outing, unknown price, currency/room units, island switching and save/reopen. Expand checks only for affected risks. A docs-only change needs link/path and diff checks, not another application build/deployment.

Do not claim impeccable design from automated checks alone. Require clear visual hierarchy, consistent interaction, accessible controls, good phone behavior and successful visitor tasks.

## Parked work

3D bird models, decorative motion, automatic booking, supplier portals, new paid routing/booking APIs and multi-country expansion wait until both island journeys are useful. Old Vercel project/domain retirement remains a separate infrastructure task documented in HANDOFF-CURRENT.md. No new spend, schema migration, external outreach or access change is included. Avoid duplicating this queue in dated reports.
