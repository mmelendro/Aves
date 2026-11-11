# South Island price reference increment

Adds seven named published price references across three stays and four adult activities, plus adult/room cost-sharing inputs and partial allowance comparisons. Six named references support arithmetic. Te Anau TOP 10's broad multi-product range is deliberately quote-only because it does not identify a room or site type. These are references checked on 11 November 2026, not fetched quotes for the selected trip dates or inventory.

## Product and unit evidence

| Place / product | Published NZD reference | Unit and scope | Source |
| --- | --- | --- | --- |
| Arthur's Pass Alpine Motel cabin starting band | 135–165 | Starting band for two guests, varies by season/room | https://selwyn.nz/thingstodo/walkingtracks/listing/arthurs-pass-alpine-motel |
| Larnach Stable Stay | 180 | Room for two adults; shared bathrooms, breakfast and castle/garden entry. Other Larnach products excluded | https://www.newzealand.com/int/plan/business/larnach-castle-stables/ |
| Te Anau TOP 10 | 45–350 | Property-wide range, no named unit. Not used in comparison arithmetic | https://www.newzealand.com/nz/plan/business/te-anau-kiwi-holiday-park-4146298/ |
| Hanmer Springs Flexi single entry | 43 | Adult 16+, excludes extras. Not the advance-purchase Saver product | https://hanmersprings.co.nz/pricing |
| Orokonui self-guided admission | 27 | Adult, self-guided. Published Thu–Mon opening | https://orokonui.nz/visit/ |
| Whale Watch Ocean Cabin | 185 | Adult, tariff 1 Oct 2026–30 Sep 2027, not VIP or transport | https://whalewatch.co.nz/your-experience/our-tours/whale-watch-tour/ |
| Albatross Encounter standard | 200 | Adult 15+, published to 31 Aug 2028, not extended specialist tour | https://www.albatrossencounter.co.nz/our-tours/ |

Larnach's own Stable Stay page confirms the product, shared bathroom scope, inclusions and a 2% credit-card surcharge. That surcharge is not silently included in the 180 reference. https://www.larnachcastle.co.nz/stay/stable-stay . Undated lodging references do not acquire a travel-validity period merely from the review date. Older 2024 Forest Camp tariffs, ambiguous converted albatross-centre prices, individual booking-engine inventory and unnamed Onsen rates were not used.

## Comparison behavior

Allowances remain per person. Room-night references multiply by rooms and divide across adults. Adult admission never divides by the party. The current two-adult room reference is not extrapolated to larger room occupancy. Children, extra guests, room allocation, payment fees and exact product availability require a quote. Existing saved/session drafts without new optional adult/unit fields remain valid and default to one adult and one unit.

Daily activity mode sums known references for that day's main outing and optional alternative, retaining unpriced entries as missing. Per-experience mode compares individually. Optional outings can replace the main outing, so a daily subtotal is conditional on choosing both. Food, transport and unpriced outings remain open. No partial total is labelled a fully priced or affordable trip.

Currency mismatches receive no arithmetic/FX conversion. Explicit tariff-date limits, dates before review, published closed weekdays, unknown product types and reviews older than 90 days block numeric comparison. Date/access conflicts also appear beside the affected daily selection, outside the collapsed source disclosure. Existing user choices are preserved for review rather than silently deleted. Complete source data, original units, conditions and review dates appear in the catalogue and daily cards. A filter exposes references with published prices. Copied/private itinerary text retains adult/unit choices and deduplicated price provenance, using the existing explicit import and 5,000-character guard.

No paid API, new dependency, booking, enquiry, email, new access or database schema is introduced. No claim that the operator meets B Corp requirements is inferred from a price. Environmental evidence remains separately scoped. The original Eco-Tourism Business Plan was not available for a financial review.

## Verification

553 tests, TypeScript, local and hosted 75-page builds passed. Source audit checks 343 modules with zero unreachable application modules. Hosted browser checked shared rooms, adult admission, currency mismatch, dated closed-day warnings, copied sources and 340px containment (337px document). Both live aliases point to a027821 / dpl_6r8i8AdJJCTaV2gkymugf1stzt4r. Canonical shared-room comparison verified. Error/fatal scan 07:54:39–08:04:39 UTC returned no matches. Physical Safari/touch, dated accommodation quotes and availability, child pricing, food and transport costs, full route feasibility and actual bookable budget matching remain future work.
