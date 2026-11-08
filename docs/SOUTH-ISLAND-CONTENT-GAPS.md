# South Island content-gap inventory — B2, 9 November 2026

Completed source review; documentation only. No website deployment or new route. Recommended model for this bounded inventory: Luna low; actual selected app model not independently observable. B1 live private-brief verification is complete. Next proposed implementation: B3 practical guidance, Sol medium; pause until selected.

## Business direction

Owner confirmed: AVES should grow into a marketplace of sustainable tourism businesses connected through birds, habitats and places. Bird interests lead to habitats/regions, then a balanced mix of local guides, stays, food, culture, wellness and adventure. The AVES host supplies human review, coordination, storytelling and continuity. South Island is the first service-design pilot, Sydney the next product. This is a business direction to validate, not a forecast of success or permission to build a marketplace now.

Before scaling, validate guest demand, local partner benefit, evidence behind sustainability claims, workable coordination and fair commercial terms. Later business-plan discovery must cover supplier consent/verification, quality and complaints, availability, pricing/commissions or other revenue options, cancellations, operational responsibility and unit economics. No commercial model, partner agreement or automated booking has been selected. Keep the existing private planning/quote system as the pilot; no new database, checkout, supplier portal, ads, outreach or spend in B2/B3.

## Inspected source

- app/new-zealand/page.tsx; app/new-zealand/south-island/page.tsx.
- content/new-zealand.ts; content/south-island.ts: four broad place/habitat starting points with DOC links (Arthur's Pass, Nelson Lakes, Fiordland, Otago/Catlins).
- Colombia comparison: app/travel-tips/page.tsx and app/resources/ResourcesPageClient.tsx; topic coverage only, not an endorsement of existing facts.
- Existing catalogue/carousel/checklist and B1 checkpoint reviewed by reference; do not rebuild them. All species do not have media, and country checklist inclusion is not South Island occurrence.

## Ranked gaps and smallest useful response

| Priority | Topic | Current South Island coverage | Smallest useful addition |
| --- | --- | --- | --- |
| 1 | Choosing bases and realistic travel | Four habitat/place cards; no practical comparison or route logic | One compact base/area comparison: what habitat it offers, pace/comfort considerations, gateway candidates and suitable nearby non-birding time. Explain choosing a manageable subset, not doing every place. Verify transport before specifying times. |
| 1 | Preparation, weather and access | General mountain/coastal caution and DOC links | Concise before-you-go checklist with current official weather/access/road guidance, suitable walks, clothing and contingency/rest planning; no evergreen claim that a particular route is open/safe. |
| 1 | Season and expectations | Species notes but little trip-level timing help | Explain place/season-dependent bird opportunities and ethical managed viewing. Verify regional seasonal facts; no guaranteed sightings or invented January availability. Actual trip dates/year remain private and unconfirmed in this inventory. |
| 1 | Practical arrival/transport | No consolidated gateway/transport explanation | A short planning section linking official transport/entry/biosecurity sources; verify rules by nationality/date at implementation rather than copying Colombia's entry checklist. |
| 2 | Comfort, accessibility and balanced days | Good general copy and private pace/comfort fields | Turn existing four place cards into useful examples of morning birding plus food/rest/culture/scenery; describe access needs as preferences to discuss, not verified accessible inventory. |
| 2 | Resources | NZ eBird/BirdLife/DOC/Tiaki outbound links; no curated NZ library | B4: a small purpose-labelled reading/listening/viewing list. Research specific podcasts/documentaries/videos once, verify rights and relevance; link rather than embed by default until performance/privacy/permission checked. |
| 2 | Geography of featured places | Country/island navigation, no guide-place overlays | Queued034: verified broad-area points/labels tied to cards. Not required for B3 text. Retain country/region navigation and avoid sensitive nest coordinates. |
| 2 | Checklist clarity | Historical/extinct entries still visible; selection disabled | Queued017: remove relevant visitor-facing historical/extinct entries while preserving old briefs/stable IDs; threatened living species and rare visitors remain. Separate compatible release, not silently included in B3. |
| 3 | Cultural depth/pronunciation | Respectful general acknowledgement, no specific cultural-provider inventory | Community-led/permissioned examples later; no invented legends, totemic claims or endorsement. Pronunciation022 remains separate. |
| 3 | Wider NZ coverage | North/Rakiura overview sections; South dedicated page | Separate later guide batches. North Island extensions do not expand the shared South Island trip scope automatically. |

## B3 bounded implementation brief

Keep the current hero/map/carousel and four habitat cards. Add one concise practical-planning section to the existing South Island page, with clear internal navigation: choosing a base/pace, preparing for conditions, and useful official planning links. Reuse existing typography/cards and a small content module rather than a new resource platform or duplicate carousel. Keep private-brief CTA and planning-beta truthfulness. No hotels/operators presented as confirmed partners, no public prices, no exact drive times or changing rules without current evidence.

Acceptance: guests can identify sensible planning areas, understand why a slower route helps, find authoritative current conditions/access guidance and save their own preferences privately. New text adds decisions rather than repeating range/habitat paragraphs. Verify source/date and locality, desktop/phone layout, keyboard links, existing carousel and private-brief entry; review touched code/comments, check sitemap/canonical inventory unchanged if no new route, build/publish affected app and live-check, sync and pause. Effort3 relative units, not credits or hours.

B4 resources can ship separately after specific resource research. B5 private route options need actual dates, gateways and guest preferences. Neither a media library nor a full marketplace is a prerequisite for using the working private brief.

## Source register and verification limits

- Existing DOC park/species links in content/south-island.ts were recorded reviewed8 November; preserve and revisit when changing their claims. Arthur's Pass park page opened9 November: https://www.doc.govt.nz/parks-and-recreation/places-to-go/canterbury/places/arthurs-pass-national-park/ . Retrieved page text was limited; do not infer current access/closures from it.
- DOC Be prepared, opened9 November: https://www.doc.govt.nz/parks-and-recreation/know-before-you-go/be-prepared/ . Supports preparation suited to the trip, weather, equipment and checking current advice. Not a substitute for a route-specific conditions check.
- NZTA Plan your journey: https://nzta.govt.nz/travelling-on-our-roads/plan-your-journey . Official search result identifies a current transport-planning resource; direct retrieval returned403. Reopen in a browser at B3 before treating specific contents as verified. No travel-time assertions made here.
- Existing NZ page links to eBird NZ, BirdLife and Tiaki; reuse after relevant verification. Entry/biosecurity/weather agencies and specific podcasts/films are still candidates for B3/B4 discovery, not fully researched recommendations.

This is a source/content audit, not live itinerary feasibility, a full accessibility/security audit, partner due diligence or a guarantee of business success. No guest data included. Documentation checks only; no app tests/build needed for this artifact. Stay paused after GitHub sync.
