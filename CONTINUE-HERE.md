# AVES: one numbered pathway

Updated 11 November 2026, Sydney. This is the only active to-do list and resume prompt. Follow the next unfinished step, one useful, tested release at a time. The owner's latest instruction takes precedence.

## The outcome

A visitor explores one map, selects birds and interests, enters starting/departure cities, dates or trip length, pace and daily allowances for accommodation, food, transport and activities, then compares credible itineraries and saves a private plan. Make this useful on both New Zealand islands while preserving Colombia and Australia.

Already delivered: the shared map/bird guide, continuous 2D satellite navigation and selectable planning-region outlines. South Island has the operational planner. North Island does not yet have a complete planning flow. Exact runtime, limits and rollback live in [HANDOFF-CURRENT.md](docs/HANDOFF-CURRENT.md); do not rebuild completed work from old prompts.

## The pathway

1. Add verified parks and reserves. NEXT. Start with Colombia, then Australia, then remaining New Zealand coverage. Deliver each country in a separate bounded release on the existing satellite map. Verify source, licence, date, geographic fit, omissions and access limits. A clearly labelled useful pilot is acceptable; fabricated completeness is not. References: MAP-04a/b/c.

2. Unify map controls. Use one consistent layer picker, selection treatment, legend and source display across the maintained map families. Preserve camera, geography and bird choice through toggling, expansion and navigation. Distinguish display layers from bird filters. Load detail only when needed. Reference: MAP-05.

3. Finish the shared island planner. Keep the delivered island configuration; finish sharing route rules, road/price references, draft storage and account handoff. Preserve old drafts and keep each island's inputs and saved plans isolated. Do not copy the planner or infer a road between islands. Reference: NZ-01b.

4. Publish a usable North Island pilot. Research one coherent corridor and deliver its canonical guide, map, locally supported birds, trip options, catalogue and site-directory links together. A visitor must complete a credible 3 to 7 day trip with fixed endpoints. Preserve the working South Island flow. Reference: NZ-02.

5. Make both islands' plans practical and comparable. Improve travel time, pace, season/opening constraints, weather alternatives, cost units and allowance comparisons. Offer genuinely different options where feasible; explain missing prices or limited choices. Keep editing and save/reopen reliable. References: NZ-03/04/06.

6. Fill useful content gaps along those routes. Add sourced birding sites, stays, individually reviewed Airbnb options where possible, food, organic/farm-to-table evidence, markets, hot springs, hikes, adventures, ecotourism, community-led culture, wellness and transport. Audit local bird memberships and national/global conservation status. B Corp evidence stays optional and separate. Extend the verified pattern to Colombia and Australia. Expand by usefulness, not pin counts. References: NZ-05/07 and map/place coverage.

7. Complete the journey from discovery to a private trip brief. Keep map, birds, wishes, itinerary and the shared contact flow connected. Make explicit save, sign-in, reopen, edit and voluntary inquiry clear. Separate planning estimates from confirmed availability and a human quote. No automatic booking or unsolicited sending.

8. Validate and refine for launch. Test complete visitor tasks on both islands and representative Colombia/Australia routes. Fix actual friction in mobile layout, Safari/touch where available, keyboard/focus, typography, images, loading, media and performance. Validate with independent visitors before claiming launch readiness. Then choose further corridors or advanced features from demonstrated needs.

Steps 1 and 2 cover the core map expansion, not every optional layer or business worldwide. Do not let unlimited layer/catalogue expansion postpone steps 3 and 4. Physical-device checks, evidence quality and useful design apply throughout, not only at step 8.

## Run each round

Read [HANDOFF-CURRENT.md](docs/HANDOFF-CURRENT.md), [ARCHITECTURE.md](docs/ARCHITECTURE.md) and [CONTRIBUTING.md](CONTRIBUTING.md), then inspect current source/GitHub head. Deliver the smallest useful increment in the next unfinished step. Reuse shared modules and one regional map. Explain non-obvious code; remove superseded implementations while preserving provenance, compatibility and drafts.

For functional changes, follow the required tests/build and hosted acceptance, publish the exact tested source under existing authorization, verify both domains, and sync source plus concise evidence/rollback to GitHub. Documentation-only changes need link/diff checks, not an application deployment. Update this pathway when milestones change; keep detailed release logs in the handoff.

## Keep these boundaries

Protect private traveller records and sensitive wildlife locations. Source environmental, bird and supplier claims, with locality and review dates. Approximate planning areas are not official boundaries or bird ranges; historical imagery and public land do not establish current conditions or access. Apply [B Lab's stewardship guidance](https://usca.bcorporation.net/putting-stewardship-to-work-tracking-esc-standards/) as an evidence framework, not certification. The original Eco-Tourism Business Plan is unavailable here; preserve its nature-travel direction without invented financial assumptions.

3D terrain/globe, offline/installable access, optional eBird import, wider media, marketplace tools and automatic booking remain future requirements. Old Vercel project retirement is separate. No new spend, weaker access, private-data changes or external outreach is implied.

[Map coverage](docs/MAP-LAYER-COVERAGE.md) and [source criteria](docs/MAP-LAYER-ROLLOUT.md) are technical references, not queues. Wider requirements remain in [ROADMAP-DETAILS.md](docs/ROADMAP-DETAILS.md), [AVES-CHANGE-INBOX.md](docs/AVES-CHANGE-INBOX.md) and the [archived prompts](docs/archive/2026-11-11-before-agile-reset/README.md). Only this numbered pathway sets delivery order.
