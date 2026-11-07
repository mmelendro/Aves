# AVES living implementation brief

**Updated: 8 November 2026 (Sydney).** Improve https://aves.bio through small, tested releases. This brief and its linked change inbox preserve the agreed work between chats.

**Checkpoint:** AVES-008 (speaker highlight) and AVES-001a (Santa Marta editorial pilot) are published and verified. Pause after this completed increment; the broader editorial task and new AVES-011/012 design requests remain queued. Preserve completed work when resuming.

## Working mode and project

Updating this brief is planning only. Website implementation remains paused until I explicitly resume it. When resumed, complete the selected batch through verification, GitHub sync and the established release process. Ask only for missing decisions, required access or consequential actions outside existing authorisation.

Repository: https://github.com/mmelendro/Aves
- `webmaster/readiness-2026-11-05`: global homepage, Colombia and New Zealand.
- `australia/preview`: Australia and the shared account/contact/quote backend.

These are independent applications; keep their branches separate. Treat this file on the first branch as canonical and keep its Australian copy synchronised.

## Start efficiently

1. Read the current sections of both `CONTINUE-HERE.md` files and [AVES-CHANGE-INBOX.md](AVES-CHANGE-INBOX.md). Read older history or code tours only as needed. Open the source and identify one recent edit so I can confirm you have the correct version. Distinguish live deployments, GitHub commits and laptop-only edits; report inaccessible sources honestly.
2. Reconcile new observations with the existing backlog. Check whether each issue is still present, already fixed or needs clarification. Separate confirmed bugs, factual errors, design preferences and new features. Preserve newer explicit user decisions; resolve material conflicts before dependent work.
3. Choose a coherent batch within my resumed scope; state its order, completion checks, dependencies and relative effort (small/medium/large). Prioritise broken/privacy-sensitive flows and misleading claims, then the inbox priorities, editorial fixes, discovery consistency/world map, regional birds, wishlist and recommendations. Follow my stated priorities and carry authorised work through without repeated routine approvals.
4. Reuse the current architecture, components and verified research. Inspect the old bird-selection/itinerary tool before replacing it. Research gaps and unstable facts only; avoid repeated whole-site audits, speculative rewrites and new dependencies without a clear benefit. Do not invent estimates of my remaining ChatGPT credits.

## Preserve the completed baseline

Keep the emerald style, thin AVES lettering, country-specific birds/landscape marks, shared `/account`, and existing security/quote flows. Country homepages and the existing Colombia/Australia regional, experience and article discovery headers use matching portrait map/photo cards on roomy screens, including suitable unfolded-phone widths. New Zealand currently has island sections, not separate regional pages; AVES-007 closes that gap. Narrow phones show photos/calls first, then an independent map card. Preserve discreet controls, source/licence credits, accessible names, keyboard operation and selected-region cues; keep geography undistorted. Practical account, contact and policy pages retain their focused layouts.

New Zealand is public inspiration in development, not yet an enabled saved-trip destination. Consult the current registry before enabling any country. Keep private keys, guest details, personal travel plans and unconfirmed business relationships out of public files. B Corp status is pursuing, not certified. Sound availability must reflect actual licensed recordings.

## Agreed work and completion checks

### A. Editorial quality and broader regional birdlife

Give each section a clear purpose and remove redundant copy, stale dates, placeholder prices, inconsistent tone and unsupported biographies, testimonials, partnerships or sustainability claims. Preserve useful information and essential qualifications. The Santa Marta pilot (AVES-001a) already consolidates its shared range context and distinct habitat notes. Review that result before applying the pattern to another page; the broader site audit remains pending.

Build a coverage matrix for Colombia's 11 planning regions, then expand in manageable batches with regional character, endemics, varied families and habitats. Retain shared species where their occurrence is valid. Each added bird needs stable identity/names, supported local occurrence and wider range, useful habitat/place notes, sources, suitable media, focal point and attribution. Use eBird primarily for occurrence, supported by BirdLife and relevant local authorities/reserves. Verify media rights independently: public availability on eBird/Macaulay does not grant reuse permission. Add video only with authorised embedding/reuse. Do not promise sightings or encourage attracting wildlife with playback.

Where appropriate, include totemic and culturally significant birds (AVES-010), supported by community-led or community-approved sources. Name the specific people/place, use their preferred terms and confirm what may be shared. Distinguish documented cultural meaning, national emblems and personal symbolism; do not infer one from another or imply community endorsement. Keep restricted stories/private knowledge out of the site and seek guidance before commercial use where needed.

Done when revised pages add distinct information, regional coverage demonstrably improves, facts/rights are traceable, and media, locations and navigation work.

### B. Homepage world map

Create a lightweight, geographically accurate destination map driven by the existing catalogue. Highlight Colombia, Australia and New Zealand, clearly showing New Zealand's development status. Country labels and equivalent accessible text links open the correct pages. Future countries must be easy to add without implying launch or bookability. Verify desktop, narrow-phone and wide layouts.

**Country-card carousels (AVES-011):** separately replace each static destination-card bird on the global homepage with that country's existing carousel. Keep the correct local collection, compact presentation, discreet photo/sound controls, credits, development status and clear destination link. Controls must work independently; audio remains opt-in and only one recording should play across the page. Keep initial loading light, respect reduced motion and coordinate with the future world map without making this depend on it.

### C. Bird wishlist and optional bingo

Add a discreet select/remove control while people explore birds, plus a reviewable wishlist grouped by destination/region. Keep "want to see" separate from "seen"; bingo is optional. Preserve guest selections locally, then explicitly save/merge them into the signed-in user's My Trips account without duplicates. Allow removal and explain storage clearly.

Reuse the shared backend and ownership protections. Handle retries, failed saves, sign-in return paths and guest/account conflicts. Confirm persistence and isolation between users. Add countries to backend flows only when their registry, account and quote support is ready.

### D. Balanced itinerary recommendations and supplier platform

Develop a progressive questionnaire covering dates/season, party, budget/currency, comfort, pace/travel time, walking/accessibility preferences, birding/photography intensity, food, culture, wellness and evenings out. Keep sensitive questions optional and minimal.

Start recommendations with verified data and transparent constraints; introduce AI where it improves a working foundation. Offer realistic options with reasons, travel/rest/weather buffers, itemised indicative costs and inclusions/exclusions. An AVES host reviews the draft, coordinates local guides/operators/lodges, and provides the personal connection and storytelling. Recommendations, quotes, reservations and payments remain distinct states. Never invent prices, availability, agreements, certifications or wildlife guarantees.

Build supplier records around documented relationships, services, locations, seasonality, pricing provenance, cancellation/accessibility information, cultural permissions and evidence for sustainability claims. Test varied combinations of birding, kayaking, food, culture, scenic stays and wellness. Use separately supplied private pilot briefs and confirm unresolved dates; do not contact suppliers, make bookings or publish private plans without explicit instructions.

### E. Latest discovery and sign-in changes

Use the corresponding inbox entries as the detailed acceptance criteria:
- **Matching explorer format (AVES-012):** use the Australian map/subregion explorer as the visual reference for bird/map pairs. Align widths, column proportions, spacing, map presentation, card styling, typography, credits, badges and actions. Keep expanded bird details balanced with the map and preserve species facts, discreet media controls, portrait framing where practical, and mobile stacking. Share layout primitives while retaining each explorer's correct behaviour. Treat static alignment and the adjustable-divider feature as separate increments.
- **Resizable duo:** a bounded, accessible draggable divider, automatically responsive panels and overall pair, useful crops and undistorted maps; retain narrow-phone stacking. Follow the [W3C splitter pattern](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/).
- **NZ regions:** dedicated South Island, North Island and Rakiura pages with the shared design, locally valid bird carousels/calls, source notes and coherent old/new navigation. Keep development status and backend eligibility explicit.
- **Audio cue (AVES-008, verified):** preserve the speaker icon and published emerald availability accent, distinct playback state, accessible labels and visitor-initiated playback. Do not reimplement this completed step.
- **Google sign-in:** verify the [recorded setup](https://github.com/mmelendro/Aves/blob/australia/preview/docs/social-sign-in.md), restore/select the required business support address, and complete real account/redirect/session tests before showing the button. Keep personal Gmail hidden and Facebook deferred. Verify current restoration options and cost before any new billing commitment.

## Finish each batch

Use checks proportionate to the changes: factual/licence review, relevant automated tests, builds, route/map checks, photo crops, sound, responsive layouts, and affected account/save/quote flows. Browser viewport emulation is not physical foldable-device testing. Avoid repeating passed checks unless a change or failure justifies it. Explain what changed, evidence of success and remaining limits. Sync the correct branches, publish authorised tested work, and update handoffs and inbox statuses with commit/deployment evidence. Never mark an item complete on the strength of a plan or commit alone.
