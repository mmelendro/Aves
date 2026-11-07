# AVES living implementation brief

**Updated: 8 November 2026 (Sydney).** Improve https://aves.bio through small, tested releases. This brief and its linked change inbox preserve the agreed work between chats.

**Checkpoint:** AVES-008 (speaker highlight), AVES-001a (Santa Marta editorial pilot), AVES-009 (Google sign-in and verified AVES branding with info@aves.bio support), and AVES-011 (country-card carousels) are published and verified. Paused after AVES-011. The latest homepage decision is to replace the mixed-country hero carousel with the world destination map, retaining the three country-card carousels below. That replacement, the broader editorial task and AVES-012 design alignment remain queued. Preserve completed work when resuming.

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

Replace the main mixed-country carousel in the global homepage hero with a lightweight, geographically accurate world destination map driven by the existing catalogue. This supersedes retaining that carousel alongside the map: do not add a second hero media block or repeat the country-card bird experience. Keep the headline and copy on the left and map on the right on roomy screens; use a natural stacked layout on narrow phones. Retain each country’s existing carousel inside its destination card below, with the same emerald visual style.

Highlight Colombia, Australia and New Zealand, clearly showing New Zealand’s development status. Country labels/targets and equivalent accessible text links open the correct pages. Keep the map useful without hover and without a heavy mapping dependency. Future countries must be easy to add without implying launch or bookability. Verify desktop, narrow-phone and wide layouts, keyboard access, labels, geography and all three links. Publish and sync only this increment when explicitly resumed, then pause.

**Country-card carousels (AVES-011, verified):** the global homepage now uses each country’s full existing selection (Colombia 22, Australia 20, New Zealand 31) inside its own compact card viewer, with discreet controls, dynamic credits, country links and development status. Navigation is independent, audio is opt-in with one recording at a time, and card images load lazily. The existing mixed-country hero remains. This was released independently of the future world map; do not repeat the implementation. See CONTINUE-HERE.md for the release checkpoint.

### Recommended incremental order when work resumes

This is an efficient suggested sequence, not permission to execute the whole backlog. Complete only the owner-selected increment and stop. Effort is relative, not an estimate of ChatGPT quota.

1. **AVES-003 — homepage hero map (small–medium):** replace the mixed-country hero carousel as described above; keep the three card carousels. One independently testable release. No itinerary or database changes.
2. **AVES-012 — static explorer alignment (small–medium):** match the existing bird/map and map/subregion layouts without adding a divider. Pilot one shared layout and verify it across the country pages; publish separately from interaction changes.
3. **AVES-007 — New Zealand regions (medium per page):** South Island first with existing verified birds/calls and coherent map links; North Island and Rakiura in subsequent separate releases. Do not claim exhaustive species coverage or enable bookings.
4. **AVES-001 — editorial batches (small per page):** choose one page or region at a time, following the completed Santa Marta pilot. Correct misleading factual claims before cosmetic polish when found.
5. **AVES-002 / AVES-010 — bird variety and cultural context:** create the regional coverage matrix, then research and add one bounded region/species batch at a time. Totemic/cultural content needs suitable community sources/permissions; do not fill gaps speculatively.
6. **AVES-006 — adjustable duo (medium):** implement only after static layout alignment, with a keyboard/touch/pointer divider and sensible stacking/reset; release separately.
7. **AVES-004 — wishlist in stages:** visitor-local selection/removal first; account save/merge/ownership next; optional bingo separately. Inspect the earlier itinerary tool before rebuilding.
8. **AVES-005 — itinerary platform in stages (large overall):** questionnaire, verified supplier records, deterministic recommendations, human review, then AI assistance. Each requires its own scoped release. Private pilot inputs, current supplier prices/availability and business permissions are still inputs to obtain, not existing public facts.

Deferred independently: Facebook Login, translation/localisation, authorised video expansion, and a friendlier expired-Google-session landing. The approved Google login/branding is complete. Do not revive these side projects inside the map release. If a newly found security/privacy or essential-route defect is confirmed, report it and address that boundary before unrelated enhancements.

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
- **Google sign-in (AVES-009, verified):** preserve the working shared-account flow and `info@aves.bio` public support address. Read the [release/setup record](https://github.com/mmelendro/Aves/blob/australia/preview/docs/social-sign-in.md) before changing provider settings. The mailbox now has the approved CAD $11/month plus tax flexible-plan licence. Keep personal Gmail hidden and Facebook deferred. Google AVES brand/display-name verification is now also approved and published, with the existing global falcon and info@aves.bio support. Preserve the matching Google privacy disclosures. Only the friendlier provider-expired-state landing remains a separately scoped follow-up; do not reimplement working login, repeat brand verification or start another billing change. The earlier optional domain-ownership permission request is obsolete; do not act on a later reply to it.

## Finish each batch

Use checks proportionate to the changes: factual/licence review, relevant automated tests, builds, route/map checks, photo crops, sound, responsive layouts, and affected account/save/quote flows. Browser viewport emulation is not physical foldable-device testing. Avoid repeating passed checks unless a change or failure justifies it. Explain what changed, evidence of success and remaining limits. Sync the correct branches, publish authorised tested work, and update handoffs and inbox statuses with commit/deployment evidence. Never mark an item complete on the strength of a plan or commit alone.
