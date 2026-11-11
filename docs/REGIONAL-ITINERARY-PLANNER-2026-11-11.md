# South Island regional itinerary planner

## User-directed scope

The owner expanded the request from a small B Corp map pilot to useful regional trip planning. Inputs now include starting city, departure city/date, trip length, selected birds, activities and per-person allowances for accommodation per night, food per day, transport per day and activities per day or planned experience. Suggestions offer bird priorities, fewer bases and more variety when those constraints yield distinct routes. No new spend, paid API, schema migration or booking integration was authorized or introduced.

The catalogue has 48 manually reviewed place/experience references across 15 planning/gateway areas and 20 selectable city/town gateways. Categories: birding, stays, food/local produce, markets, natural thermal/commercial heated pools, hikes/walks, adventures, ecotourism, host-led culture, wellness and transport. Some properties have separately sourced stay and dining experiences; this count is not 48 distinct accommodation businesses. Three gateway-only areas provide endpoint and Airbnb search support, without fabricated local listings.

## Sources and eco evidence

content/south-island-trip-catalogue.json retains every place's source URL, review date, access limits, categories, locality and supported species IDs. Bird-site associations use DOC and the sanctuary's own current pages. Park-wide evidence is labelled as such; no nest coordinates, restricted access or invented range matches. Managed Te Anau takahē and sanctuary populations are separate from wild encounters and can be excluded. Unknown selected birds remain visible as unmatched rather than silently dropped.

Commercial entries use business-owned pages. Organic ingredients, garden/farm-to-table and environmental practices are operator claims with scope and native links, not property-wide or organic certification. B Corp remains a separate optional map layer with its own eligibility review. Existing B Corp data is preserved.

Important current exclusions: Curio Scape publishes a temporary campground/café/visitor-facility closure from April 2026, so it is not an active stay option. The Curio Bay public walk carries an access/facilities check. Natural Maruia/Hanmer pools and commercial heated Onsen pools are distinguished. Markets have documented weekday/season checks and cannot auto-populate an undated or mismatching day. A matching weekday is not proof of holiday opening.

Airbnb links are area searches, not reviewed individual homes, inventory, eco filters, quoted prices or confirmed availability. A draft overnight may explicitly be an Airbnb home with the listing still to choose. Guests can add the chosen listing URL in private notes. Property addresses and within-base driving still need verification.

The Eco-Tourism Business Plan informed the existing project requirement to combine birding with local food, culture, stays, rest and responsible access. The original plan document was not located in the available title/content search during this increment; no financial assumptions, margins or plan contents are asserted as reviewed or changed. B Lab ESC reference remains https://usca.bcorporation.net/putting-stewardship-to-work-tracking-esc-standards/ . Evidence and measured outcomes stay distinct.

## Route and allowance behavior

The planner uses documented species opportunity coverage, bounded base counts and separate transfer days. Start and departure bases are enforced, including return loops. Fixed departure days remain free of scheduled outings. Departure date minus inclusive trip length yields daily dates. A schematic line shows base order, not a road. Public Google Maps URL links permit road-time checking without a key or paid Routes API. No straight-line distance is presented as driving duration, and no arrival/flight/ferry timing is promised. Broader bases such as Otago and Queenstown/Glenorchy/Wānaka can require substantial driving; individual day sources state known longer excursions.

Allowance arithmetic is per person and currency-specific, without exchange-rate conversion. Accommodation multiplies by nights, food/transport by days, and activity allowances by days or scheduled outing slots. Missing categories remain missing and explicit zero remains zero. The total is an entered allowance envelope, not a live-priced itinerary or affordability verdict. No price-based best-value claim is made without checked prices. Physical source/connection checks remain part of itinerary review.

## State and private handoff

Day outings and stays can be edited within their base; alternatives retain separate edits. Selected bird IDs synchronize between guide and planner. A bounded one-day session draft carries the itinerary choices, dates and allowances only when the guest chooses the handoff. No personal preferences go into public URLs, analytics or booking platform requests. Explicit Add Itinerary to Notes preserves existing private notes and region/bird choices. It refuses overflow above the existing 5,000-character note limit and consumes the temporary draft only after a matching confirmed save. The private model and immutable enquiry snapshot already preserve these readable notes; no new schema is required.

Private generated text is not autosaved or sent as an enquiry. Copy/manual fallback remains available if session storage or clipboard is unavailable. The default map now shows planning bases with a direct link to the regional planner; markers remain broad areas, not fictional property entrances.

## Validation

551 automated checks and TypeScript passed. New tests cover category/source completeness, bird coverage versus unmatched choices, sanctuary exclusion, short trip limits, all 1–30 day lengths, separate transfers, edited IDs, exact endpoints/return loops, invalid dates, leap/month boundaries, market weekdays/season, budget units/totals, distinct alternatives, expiry, overflow, deduplicated note import, private editor preservation and immutable submission payload/privacy using mocked API tests.

Local build, exact hosted runtime, browser controls, phone-width layout and real private save/reopen evidence will be recorded before publication. Physical Safari/touch and verified live pricing/road durations remain separate work. AVES-062 is advanced but not complete for automatic in-page road times or other countries.
