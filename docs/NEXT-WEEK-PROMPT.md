# AVES next work session: discovery, editorial quality and the trip-planning app

Continue improving the existing AVES website at https://aves.bio. Work carefully in small, reviewable phases to conserve usage. Inspect the current project before proposing a rebuild or repeating completed research.

## Project and current baseline

Repository: https://github.com/mmelendro/Aves
- Global homepage, Colombia and New Zealand: branch `webmaster/readiness-2026-11-05`.
- Australia and the shared account/contact/quote backend: branch `australia/preview`.

These are independent applications: do not merge the branches. Read both `CONTINUE-HERE.md` files and beginner/code-tour guides. Identify one recent source edit to prove you have the correct version. Check what is actually published versus only committed. Preserve the existing shared account at `/account`, security controls, thin AVES lettering, country identities and emerald visual style.

The paired discovery headers are already implemented: centred introduction, matching portrait map/photo cards side by side on roomy screens and unfolded-phone widths; photos and sound first, then an independent map card on narrow phones. Preserve discreet image controls, captions, credits, keyboard access and selected-region cues. Existing collections include 22 Colombian, 20 Australian and 31 New Zealand birds; confirm current figures. New Zealand remains in development and is not yet an enabled saved-trip destination. Some birds lack suitably licensed recordings: show their actual availability honestly.

## 1. Editorial and regional bird quality

Audit all three countries and the global homepage for repetition, stale facts, inconsistent tone, excessive caveats, placeholder prices, unsupported biographies, testimonials, partnerships and sustainability claims. Give each section one clear purpose and improve the flow from curiosity to a personal trip request.

For example, several Sierra Nevada de Santa Marta bird cards repeat almost the same endemic-range paragraph. Put shared regional context in the introduction and give each bird useful, distinctive information: habitat, verified local places, elevation/season where supported, and what makes the encounter interesting. Keep essential range, attribution and safety information accessible without repeating it everywhere. AVES is pursuing B Corp certification; do not imply certification or invent achievements.

Broaden Colombia's regional bird selections substantially. Start with a coverage matrix across the 11 planning regions and propose sensible targets, then expand in batches. Prioritise regional character, endemics, different families, habitats and traveller interests; retain genuine shared species where appropriate. Each species needs a stable ID, correct names, supported regional occurrence and wider range, sources, usable media, focal point and attribution. Use eBird primarily for occurrence, with BirdLife and relevant local authorities/reserve sources for supporting facts. Verify media licences separately: a public eBird/Macaulay page is not permission to copy or embed its content. Use video only where embedding/reuse is authorised. Do not promise sightings or encourage field playback.

## 2. Global destination map

Add an attractive, lightweight, geographically accurate world map to the main homepage. Highlight and label Colombia, Australia and New Zealand, with its development status clear. Link countries to their destination pages and provide equivalent accessible text links. Drive it from the existing destination catalogue so future countries can be added consistently. Test mobile, desktop and wide/foldable layouts; avoid a heavy mapping service unless it adds clear value.

## 3. Bird wishlist and optional bingo experience

Recover or inspect any previous bird-selection/itinerary tool before replacing it. Let visitors discreetly save birds while exploring photos, calls and future videos: a bird wishlist or shopping basket, with an optional playful bingo view. Keep "want to see" separate from "seen" and never turn wildlife viewing into pressure to disturb animals.

Begin with a small working release: select/remove birds, review them grouped by destination/region, preserve a guest selection locally, and explicitly save/merge it into the signed-in user's My Trips account. Show where saved choices are stored and allow removal. Preserve existing ownership checks, row-level security, input validation and retry handling. Avoid another database, unnecessary dependencies or exposing private keys. Enable new backend destinations only after their account/data flow is ready.

## 4. From wishes to balanced itineraries

Design the questionnaire and recommendation model around dates, season, party size, budget/currency, comfort, pace, travel time, walking/accessibility preferences, birding intensity, photography, food, culture, wellness and evenings out. Keep sensitive questions optional and collect only what is needed.

Recommend realistic route options with reasons, trade-offs, rest/weather buffers, travel times, indicative itemised costs and clear inclusions/exclusions. Start with verified data and transparent rules; introduce AI where useful after the foundation works. AI produces a draft for an AVES host to review, coordinate with local guides/operators/lodges and confirm arrangements. Quotes, reservations and payments are distinct stages. Never invent live prices, availability, supplier agreements, certifications or guaranteed wildlife encounters.

Longer-term, build a curated sustainable-travel aggregator around documented local relationships and evidence of sustainability, not green marketing labels. Include supplier services, locations, seasonal availability, price provenance, cancellation rules, cultural permissions and accessibility information. Human review and storytelling remain central to AVES.

Test balanced combinations of birding, kayaking, food, cultural experiences, scenic stays, wellness and suitable wildlife outings. Obtain private pilot briefs directly from the owner; confirm dates and operator relationships before using them. Keep guest details, personal travel plans and unconfirmed relationships out of public source files. Do not contact operators, make bookings or publish private itinerary details without explicit instructions.

## Delivery and verification

First provide a concise source-based audit, priorities, phased implementation plan and the smallest useful release. Distinguish missing information from assumptions. Carry out authorised work efficiently and keep beginner-friendly comments/guides current. Test source accuracy, licences, duplicate content, maps, route links, photo crops, sound, mobile/wide layouts, wishlist persistence and account isolation. Check signup/sign-in, saved trips and quote/proposal regressions when affected. Report limitations and deployment status accurately, sync the correct GitHub branches and publish tested changes within the established release process. Do not claim real foldable-hardware testing when only viewport emulation was performed.
