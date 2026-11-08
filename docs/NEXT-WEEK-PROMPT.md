# AVES — current execution prompt

Updated 9 November 2026 (Sydney). The selected release is published and tested; **pause after GitHub sync**. Do not execute the backlog automatically. Use Sol medium for a focused implementation; recommend a different model only when the task warrants it. Actual credit percentages and automatic model switching cannot be verified.

## Correct project and published state

Repository: https://github.com/mmelendro/Aves

- `webmaster/readiness-2026-11-05`, workspace `source`: homepage, Colombia, New Zealand. Published runtime **f941bb9**, deployment **dpl_22U8bSe868U733p3g73qXosp6zSv**.
- `australia/preview`, workspace `australia`: Australia and shared accounts/backend. Account repair/subscription runtime **5659bea**; published deployment **dpl_DaNUuTUmMNmcL9ctnMSPaAD1EAvv**.
- Keep the apps/branches separate. Do not merge the older consolidation/pricing work. Check working trees and recent commits before edits from another chat are changed.

## Completed in this release

South Island: four-place landscape carousel (Arthur’s Pass, Nelson Lakes, Fiordland, Otago/Catlins), translucent Info and licensed credits, synchronized map/place/habitat selection, compact habitat selectors on both place and bird viewers. Map zoom/pan/reset and responsive metric scale are delivered. Map respects native page gestures unless Move is enabled. Practical planning is expandable. New Zealand “In development” badges removed. The older single flip-card pilot is superseded by the connected map/carousel layout; future 3D treatments remain separate.

Locality and scale limits remain explicit: LCDB v6 imagery 2023/24, about 2 km generalized land cover; coast is coastline context, not mapped marine extent or sightings. No exact sensitive wildlife locations. Thirty sourced South Island bird-media profiles; 377 living NZ checklist reference entries, 55 extinct excluded. Rare visitors are not promises of local availability.

Shared account repair: Open Request reveals/focuses details, including an already-selected request; proposal editor reveals/focuses its heading without opening the phone keyboard. Owner page and APIs independently enforce owner access. One active owner grant verified; ordinary-account database access denied. User-authorized older NZ request cleanup completed; retained request and saved plans preserved. Do not copy private identifiers/answers into public docs.

Optional email updates: unchecked choice on email/social sign-in/signup leads to a private confirmation screen; explicit Save confirms opt-in. Existing subscribers can reopen or unsubscribe at `/account/email-updates`. Reuses private subscriber/consent tables, verified account identity and service-only RPC; no new mailing platform or campaign send. Essential account/trip email stays separate. These controls save consent; they do not constitute a newsletter campaign engine.

Validation: source 119 tests and responsive/live South Island checks passed. Account 281 tests and type check passed; responsive synthetic checks cover 1280/390/320 px, request/proposal opening and subscription save/reopen/unsubscribe. Database subscription transitions tested inside a rollback, synthetic records removed. No physical iPhone test or new real Google/email signup was completed in this increment. Hosted build READY, promoted, and20 live check groups passed. See [release checkpoint](RELEASE-2026-11-09-PLACES-ACCOUNTS.md).

## Next priorities — one selected increment at a time

1. Essential private planning/proposal failures take precedence over visual work. Verify current behaviour before building AI generation: **Prepare a Proposal currently opens a manual draft editor**, not an automatic itinerary planner.
2. **012c:** unify the homepage country map cards (labels/callouts, colours, boundaries, spacing and selection), then country/subregion maps in scoped batches. This is the next visual priority explicitly requested by the owner.
3. Finish South Island planning depth: **036** embedded resource carousel; **039** checklist media previews; **006c** full subregion content/context changes; **055** homepage subregion selection changes its subsequent section to the appropriate ecosystem map/landscape carousel. Reuse verified data, routes and templates.
4. Once South Island is ready, **040** North Island reaches the same template/functionality/depth using its own verified birds, calls, habitats and resources. Sydney is the next product priority.
5. Remaining separately selected items are in ROADMAP-DETAILS.md and AVES-CHANGE-INBOX.md. Do not bundle them into one large release.

## Latest additions and clarifications

- **056:** logo hover/focus/tap name/pronunciation popover, verified audio where available; retain global/country navigation and static/reduced-motion fallback.
- **057:** month-first eBird seasonality filter, with observation-year/effort/coverage disclosure. Trip year belongs in private planning; historical observations do not predict booking availability or sightings.
- **058:** accessible feather-inspired regional button pilot, later regional logos/3D birds; preserve functional icons and usable hit areas.
- **059:** proposal research/story workflow. Analyze guest keywords, dates/times, desired birds/habitats, conservation projects, birding lodges, pace, food/culture/downtime and budget. Produce a coherent trip narrative plus practical alternatives; source factual claims and flag access, season, availability, travel-time and price uncertainties. AVES host reviews and coordinates local people/operators before anything is sent or booked. Keep all guest inputs/output private and owner review mandatory. Current manual editor must not be described as AI generation.
- **060:** photography direction: sharp natural feather detail, rich accurate colour, bird-in-flight movement, soft habitat background; reference screenshot supplied of Jan Wegener’s Regent Bowerbird. Treat as capture/editing aspiration, not licensed website media. Preserve originals/provenance; no invented plumage or false documentary imagery. Continue the owner’s existing YouTube/8K media library efficiently.
- Media intake: Royann originals/ZIP are stored in the ignored local media library, not GitHub. Species/locality audit against the actual Colombia eBird trip is unfinished; no unverified captions should be published. The four supplied 3D-bird MP4s still need intake/rights/content review.

## Preserve the full vision and release discipline

Stable requirements: [ROADMAP-DETAILS.md](ROADMAP-DETAILS.md). Tracking: [AVES-CHANGE-INBOX.md](AVES-CHANGE-INBOX.md). Gates: [AGILE-PLAN.md](AGILE-PLAN.md). Hierarchy: [SITE-ARCHITECTURE.md](SITE-ARCHITECTURE.md). Older prompt preserved in EXECUTION-PROMPT-ARCHIVE-2026-11-09.md; historical status notes are superseded by this prompt/checkpoint.

Retain bird-bingo/private briefs, budget sliders/currency, regenerative marketplace/community, AVES human host, conservation/lodge maps, cultural experiences, Indigenous pronunciation/totemic birds with appropriate sources, optional habitat soundscapes ducking under calls/videos, matching compact responsive map/carousels/dividers, focal image positioning/photo zoom, native/introduced/status filters, satellite/city layers where suitable, Equal Earth world map/megadiversity/hotspots, 3D pilots, branding/acronym review, thin logo typography, 8K/YouTube library, Colombian Spanish (low priority). Existing detailed entries remain authoritative acceptance criteria. B Corp is being pursued. Regenerative-tourism leadership and leaving places better are ambitions requiring evidence, not achieved certifications or guarantees.

Private trip particulars stay in owned account/private workspace, never Git. Do not contact guests/partners, send proposals/campaigns, book, spend or grant access without the relevant instruction. Avoid invented geography, local species, permissions, partnerships, prices or availability.

For each increment: inspect actual code/current deployment; reuse components and evidence; keep code/comments clear and remove only verified redundant/legacy code. Test the changed flow, responsive/short screens, keyboard/touch alternatives, privacy and media cleanup. Stage exact build, verify before promotion and verify live. Every deployment checks human/XML sitemap, hierarchy/canonicals/links and private exclusions; update changed inventories without fabricated dates. Sync source plus concise checkpoint to the correct GitHub branch, identify live versus queued and verification limits, then **pause**.
