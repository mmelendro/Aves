# AVES: one numbered pathway

Updated 12 November 2026, Sydney. This is the only active to-do list and resume prompt. Follow the next unfinished step, one useful, tested release at a time. The owner's latest instruction takes precedence.

## The outcome

A visitor explores one map, selects birds and interests, enters starting/departure cities, dates or trip length, pace and daily allowances for accommodation, food, transport and activities, then compares credible itineraries and saves a private plan. Make this useful on both New Zealand islands while preserving Colombia and Australia.

Latest correction: Colombia’s eleven approximate planning regions now share exact edges with no area overlaps or uncovered country land. A single mesh draws the borders; region selection and continuous satellite imagery remain shared.

Already delivered: the shared map/bird guide, continuous 2D satellite navigation and selectable planning-region outlines. South Island has the operational planner. North Island now has a bounded Auckland, Hamilton and Rotorua pilot. Exact runtime, limits and rollback live in [HANDOFF-CURRENT.md](docs/HANDOFF-CURRENT.md); do not rebuild completed work from old prompts.

## Latest product direction

Keep the shared map controls discreet: a globe button toggles satellite on/off directly, beside a small layers button. Keep overlays inside the existing dismissible picker, retain camera/geography and bird choices, and distinguish display layers from bird filters.

Extend each saved trip into a conscious-traveller workspace. Add a per-trip checklist with completion and optional due dates, then private references and documents for flight tickets, hotel confirmations/conversations, accommodation and activity bookings, car rentals and gear. Plan the work in small releases: checklist first, then record links, then secure attachments and explicit imports. Keep planning, requested and confirmed arrangements distinct; no automatic booking, inbox reading or sharing. Full criteria: docs/TRAVELLER-WORKSPACE-ROADMAP.md. Use official birding/ecotourism guides for route planning, with dated first-hand blogs and trip reports as attributed context. Retain backend provenance and surface compact route-specific reading links where useful.

The direct satellite toggle is implemented beside the shared layers picker. The current map refinement retains faded New Zealand context around South Island, prevents the default place from forcing a close-up, declutters satellite labels at country scale and increases the unexpanded phone canvas. Conservation/environmental organisation directory and an optional sourced layer are captured in docs/TRAVELLER-WORKSPACE-ROADMAP.md. Hosted acceptance and canonical publication passed. Itinerary ordinal/place-label separation is published in daeda011. Next, complete the reviewed precise-place pilot before the trip-workspace foundation. Keep private records isolated and preserve existing drafts.

## The pathway

1. Add verified parks and reserves. Core country pilots delivered. Colombia pilot delivered: 109 national RUNAP records on the shared satellite map, with category/source details and explicit regional/private/provisional omissions. Australia pilot delivered: 13 selected CAPAD national parks across nine jurisdictions. New Zealand pilot delivered: three North Island parks plus Rakiura, alongside the existing South Island nine-park/DOC layer. Wider reserve coverage stays optional and scoped. Deliver each country in a separate bounded release on the existing satellite map. Verify source, licence, date, geographic fit, omissions and access limits. A clearly labelled useful pilot is acceptable; fabricated completeness is not. References: MAP-04a/b/c.

2. Unify map controls. Delivered for maintained map families. Include expanded-map scrolling at very short viewport heights. Use one consistent layer picker, selection treatment, legend and source display across the maintained map families. Preserve camera, geography and bird choice through toggling, expansion and navigation. Distinguish display layers from bird filters. Load detail only when needed. Reference: MAP-05.

3. Finish the shared island planner. Delivered. Keep the delivered island configuration; finish sharing route rules, road/price references, draft storage and account handoff. Preserve old drafts and keep each island's inputs and saved plans isolated. Do not copy the planner or infer a road between islands. Reference: NZ-01b.

4. Publish a usable North Island pilot. Delivered for Auckland, Hamilton and Rotorua. Research one coherent corridor and deliver its canonical guide, map, locally supported birds, trip options, catalogue and site-directory links together. A visitor must complete a credible 3 to 7 day trip with fixed endpoints. Preserve the working South Island flow. Reference: NZ-02.

5. Make both islands' plans practical and comparable. Bounded pilot delivered: optional driving preferences, partial known road subtotals, daily pace disclosures, reviewed calendars, scoped walk times and one indoor alternative. Wider live weather, complete pricing and exact addresses remain limitations. Improve travel time, pace, season/opening constraints, weather alternatives, cost units and allowance comparisons. Offer genuinely different options where feasible; explain missing prices or limited choices. Keep editing and save/reopen reliable. References: NZ-03/04/06.

6. Fill useful content gaps along those routes. In progress: scoped walk/access improvements and one indoor Hamilton alternative delivered. Current Colombian media inventory has 22 credited catalogue images plus 40 additional bird-named repository candidates requiring taxon, source and rights review. Include useful dated first-hand trip reports, birding itineraries and blogs as attributed references, separate from current official access and operator information. Add sourced birding sites, stays, individually reviewed Airbnb options where possible, food, organic/farm-to-table evidence, markets, hot springs, hikes, adventures, ecotourism, community-led culture, wellness and transport. Audit local bird memberships and national/global conservation status. B Corp evidence stays optional and separate. Extend the verified pattern to Colombia and Australia. Expand by usefulness, not pin counts. References: NZ-05/07 and map/place coverage.

7. Complete the journey from discovery to a private trip brief. Town-base visual journey foundation delivered on both islands, with previous/next steps, the existing map, local bird context, nearby activity cards and free exploration. NEXT: reviewed public airport/property points and marker-label polish on one corridor. Arrival, transfer, hotel/overnight and outing steps should highlight the current verified place and update sourced local bird/activity carousel content. Start with labelled planning bases where exact airport/property points are not yet reviewed. Never invent precise points or road paths. Preserve free exploration, static/reduced-motion use and a useful mobile map. Keep map, birds, wishes, itinerary and the shared contact flow connected. Make explicit save, sign-in, reopen, edit and voluntary inquiry clear. Separate planning estimates from confirmed availability and a human quote. No automatic booking or unsolicited sending.

8. Validate and refine for launch. Desktop guided journeys and representative Colombia/Australia shared-shell checks passed. Physical Safari/touch, independent visitors, precise-place and wider content/rights review remain incomplete. Test complete visitor tasks on both islands and representative Colombia/Australia routes. Fix actual friction in mobile layout, Safari/touch where available, keyboard/focus, typography, images, loading, media and performance. Validate with independent visitors before claiming launch readiness. Then choose further corridors or advanced features from demonstrated needs.

Steps 1 and 2 cover the core map expansion, not every optional layer or business worldwide. Do not let unlimited layer/catalogue expansion postpone steps 3 and 4. Physical-device checks, evidence quality and useful design apply throughout, not only at step 8.

## Run each round

Read [HANDOFF-CURRENT.md](docs/HANDOFF-CURRENT.md), [ARCHITECTURE.md](docs/ARCHITECTURE.md) and [CONTRIBUTING.md](CONTRIBUTING.md), then inspect current source/GitHub head. Deliver the smallest useful increment in the next unfinished step. Reuse shared modules and one regional map. Explain non-obvious code; remove superseded implementations while preserving provenance, compatibility and drafts.

For functional changes, follow the required tests/build and hosted acceptance, publish the exact tested source under existing authorization, verify both domains, and sync source plus concise evidence/rollback to GitHub. Documentation-only changes need link/diff checks, not an application deployment. Update this pathway when milestones change; keep detailed release logs in the handoff.

## Shared design requirement

Latest gallery direction: use one shared control/count and compact in-place credit pattern for bird, place, resource and team carousels. Place galleries target at least five distinct, relevant, locality-checked and credited photographs per subregion across all countries, also applying to more detailed place galleries. Every country overview should curate a balanced selection from each subregion using those same photo records, with region labels, map/gallery selection sync and an All regions return. Current four South Island galleries have two each, so each needs three more. Bird portraits, repeated crops and illustrations do not count. Opening references must preserve the active slide, page and enlargement state. Bird slideshows pause when credits open. Reviewed South Island pilot now has two photos per place; hosted acceptance and canonical publication passed for c75a535.

Keep headers, footers, map controls, carousel interactions, typography, spacing and colours consistent through shared components. Every release checks visual hierarchy, actual unclipped map size, current-stop labels, easy return from text/images, marker overlap, mobile overflow and clarity. Make each page beautiful through deliberate layout and useful content, without introducing a separate design system per destination.

## Keep these boundaries

Protect private traveller records and sensitive wildlife locations. Source environmental, bird and supplier claims, with locality and review dates. Approximate planning areas are not official boundaries or bird ranges; historical imagery and public land do not establish current conditions or access. Apply [B Lab's stewardship guidance](https://usca.bcorporation.net/putting-stewardship-to-work-tracking-esc-standards/) as an evidence framework, not certification. Keep nature-travel and stewardship claims grounded in documented evidence.

3D terrain/globe, offline/installable access, optional eBird import, wider media, marketplace tools and automatic booking remain future requirements. Old Vercel project retirement is separate. No new spend, weaker access, private-data changes or external outreach is implied.

[Map coverage](docs/MAP-LAYER-COVERAGE.md) and [source criteria](docs/MAP-LAYER-ROLLOUT.md) are technical references, not queues. Wider requirements remain in [ROADMAP-DETAILS.md](docs/ROADMAP-DETAILS.md), [AVES-CHANGE-INBOX.md](docs/AVES-CHANGE-INBOX.md) and the [archived prompts](docs/archive/2026-11-11-before-agile-reset/README.md). Only this numbered pathway sets delivery order.

## Launch evidence still needed

The bounded conservation/resources claim correction discovered 12 November is published. Wider historical content and media rights still need review. Physical mobile Safari/touch, independent visitors, current source/rights coverage, imagery reliability and the complete private save/reopen/edit journey remain unclaimed. Do not replace these checks with test counts.
