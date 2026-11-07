# AVES living implementation brief

**Updated: 8 November 2026 (Sydney).** Improve https://aves.bio through small, tested releases. This brief and its linked change inbox preserve the agreed work between chats.

## Working mode and project

Updating this brief is planning only. Website implementation remains paused until I explicitly resume it. When resumed, complete the selected batch through verification, GitHub sync and the established release process. Ask only for missing decisions, required access or consequential actions outside existing authorisation.

Repository: https://github.com/mmelendro/Aves
- `webmaster/readiness-2026-11-05`: global homepage, Colombia and New Zealand.
- `australia/preview`: Australia and the shared account/contact/quote backend.

These are independent applications; keep their branches separate. Treat this file on the first branch as canonical and keep its Australian copy synchronised.

## Start efficiently

1. Read the current sections of both `CONTINUE-HERE.md` files and [AVES-CHANGE-INBOX.md](AVES-CHANGE-INBOX.md). Read older history or code tours only as needed. Open the source and identify one recent edit so I can confirm you have the correct version. Distinguish live deployments, GitHub commits and laptop-only edits; report inaccessible sources honestly.
2. Reconcile new observations with the existing backlog. Check whether each issue is still present, already fixed or needs clarification. Separate confirmed bugs, factual errors, design preferences and new features. Preserve newer explicit user decisions; resolve material conflicts before dependent work.
3. Choose a coherent batch within my resumed scope; state its order, completion checks, dependencies and relative effort (small/medium/large). Prioritise broken/privacy-sensitive flows and misleading claims, then editorial fixes, world map, regional birds, wishlist and recommendations. Follow my stated priorities and carry authorised work through without repeated routine approvals.
4. Reuse the current architecture, components and verified research. Inspect the old bird-selection/itinerary tool before replacing it. Research gaps and unstable facts only; avoid repeated whole-site audits, speculative rewrites and new dependencies without a clear benefit. Do not invent estimates of my remaining ChatGPT credits.

## Preserve the completed baseline

Keep the emerald style, thin AVES lettering, country-specific birds/landscape marks, shared `/account`, and existing security/quote flows. Country, region, experience and article discovery headers already use matching portrait map/photo cards on roomy screens, including suitable unfolded-phone widths. Narrow phones show photos/calls first, then an independent map card. Preserve discreet controls, source/licence credits, accessible names, keyboard operation and selected-region cues; keep geography undistorted. Practical account, contact and policy pages retain their focused layouts.

New Zealand is public inspiration in development, not yet an enabled saved-trip destination. Consult the current registry before enabling any country. Keep private keys, guest details, personal travel plans and unconfirmed business relationships out of public files. B Corp status is pursuing, not certified. Sound availability must reflect actual licensed recordings.

## Agreed work and completion checks

### A. Editorial quality and broader regional birdlife

Give each section a clear purpose and remove redundant copy, stale dates, placeholder prices, inconsistent tone and unsupported biographies, testimonials, partnerships or sustainability claims. Preserve useful information and essential qualifications. Example: the Santa Marta bird cards repeat similar endemic-range paragraphs; move shared regional context into the introduction and make each species note distinctive and useful to a traveller.

Build a coverage matrix for Colombia's 11 planning regions, then expand in manageable batches with regional character, endemics, varied families and habitats. Retain shared species where their occurrence is valid. Each added bird needs stable identity/names, supported local occurrence and wider range, useful habitat/place notes, sources, suitable media, focal point and attribution. Use eBird primarily for occurrence, supported by BirdLife and relevant local authorities/reserves. Verify media rights independently: public availability on eBird/Macaulay does not grant reuse permission. Add video only with authorised embedding/reuse. Do not promise sightings or encourage attracting wildlife with playback.

Done when revised pages add distinct information, regional coverage demonstrably improves, facts/rights are traceable, and media, locations and navigation work.

### B. Homepage world map

Create a lightweight, geographically accurate destination map driven by the existing catalogue. Highlight Colombia, Australia and New Zealand, clearly showing New Zealand's development status. Country labels and equivalent accessible text links open the correct pages. Future countries must be easy to add without implying launch or bookability. Verify desktop, narrow-phone and wide layouts.

### C. Bird wishlist and optional bingo

Add a discreet select/remove control while people explore birds, plus a reviewable wishlist grouped by destination/region. Keep "want to see" separate from "seen"; bingo is optional. Preserve guest selections locally, then explicitly save/merge them into the signed-in user's My Trips account without duplicates. Allow removal and explain storage clearly.

Reuse the shared backend and ownership protections. Handle retries, failed saves, sign-in return paths and guest/account conflicts. Confirm persistence and isolation between users. Add countries to backend flows only when their registry, account and quote support is ready.

### D. Balanced itinerary recommendations and supplier platform

Develop a progressive questionnaire covering dates/season, party, budget/currency, comfort, pace/travel time, walking/accessibility preferences, birding/photography intensity, food, culture, wellness and evenings out. Keep sensitive questions optional and minimal.

Start recommendations with verified data and transparent constraints; introduce AI where it improves a working foundation. Offer realistic options with reasons, travel/rest/weather buffers, itemised indicative costs and inclusions/exclusions. An AVES host reviews the draft, coordinates local guides/operators/lodges, and provides the personal connection and storytelling. Recommendations, quotes, reservations and payments remain distinct states. Never invent prices, availability, agreements, certifications or wildlife guarantees.

Build supplier records around documented relationships, services, locations, seasonality, pricing provenance, cancellation/accessibility information, cultural permissions and evidence for sustainability claims. Test varied combinations of birding, kayaking, food, culture, scenic stays and wellness. Use separately supplied private pilot briefs and confirm unresolved dates; do not contact suppliers, make bookings or publish private plans without explicit instructions.

## Finish each batch

Use checks proportionate to the changes: factual/licence review, relevant automated tests, builds, route/map checks, photo crops, sound, responsive layouts, and affected account/save/quote flows. Browser viewport emulation is not physical foldable-device testing. Avoid repeating passed checks unless a change or failure justifies it. Explain what changed, evidence of success and remaining limits. Sync the correct branches, publish authorised tested work, and update handoffs and inbox statuses with commit/deployment evidence. Never mark an item complete on the strength of a plan or commit alone.
