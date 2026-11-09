# AVES development stages and relative complexity

Updated 9 November 2026. This is a direction and acceptance framework, not a promise that queued features are implemented. Complexity 1–5 is comparative engineering/research effort, not a credit estimate. Usage allowance and automatic model switching are not available to this agent.

## Product journey

Discover birds and places → save interests → private trip brief → researched draft → AVES host review → confirmed arrangements → travel companion → feedback and measured conservation/community contribution.

| Stage | Deliverable | Acceptance / dependencies | Complexity |
|---|---|---|---|
| 1 — current increment | Private AI draft from a frozen NZ request: story, route options, source references and missing details | Owner-only generate/save/reopen/edit. Unpriced notes separate from issued proposals. No auto-send or booking. Verify real model access, authentication, persistence and phone layout. | 3/5 |
| 2 | Coherent NZ brief and separate solo/shared legs | Explicit year, dates, gateways, party size, transport, food/access requirements, existing arrangements and must-haves. Flag conflicts; never merge different people's preferences silently. | 2–3/5 |
| 3 | Reliable bird-led recommendations | Wishlist → verified island/region/habitat/season/access. Native/introduced/endemic filters where supported. Separate national checklist from local, seasonally realistic visitor opportunities. | 4/5 |
| 4 | Compare flexible itineraries | Two/three distinct routes and trade-offs; sensible bases, travel/weather buffers, food/culture/wellness, birding frequency and alternatives. Explain changes when preferences change. | 4/5 |
| 5 | Budgets and transport | Separate accommodation/food/activities/transport/host costs/contingency. Currency explicitly labelled; conversion dated if introduced. Estimates distinguished from supplier quotes. Compare car/transfers/guided outings. | 3–4/5 |
| 6 | Supplier/conservation directory | Structured locations, experiences, contact process, sustainability evidence and AVES relationship status. Maintain provenance; distinguish candidate/contacted/confirmed partner. | 4/5 |
| 7 | AVES host review and formal proposals | Check route, species, access, suppliers, price/inclusions and terms. Preserve versions. Explicit owner issuance after review; no generated claims of confirmed bookings. | 3–4/5 |
| 8 | Booking coordination | Enquiries, holds, confirmations, deadlines, cancellations, payments and changes. Begin manually; integrate only useful supplier systems. Handle partial failures, responsibility and customer support. | 5/5 |
| 9 | Travelling companion | Secure mobile itinerary/maps/documents/meeting points; later scoped offline access, sightings and change notifications. Clear authoritative itinerary version and privacy boundaries. | 4/5 |
| 10 | Feedback and demonstrated regeneration | Define measurements first; guest feedback, supplier quality and verifiable conservation/community contributions. Evidence for claims; no implied certification or guaranteed net-positive impact. | 3–4/5 |
| 11 | Repeat proven workflow | South Island depth → North Island parity → Sydney launch product → wider Australia and Colombia. Same reusable components and privacy/content gates, locally verified data. | 3/5 per rollout plus research |
| 12 | Marketplace and optional community | Supplier onboarding/availability/transactions/commissions/disputes; opt-in profiles and mutual connections with moderation, blocking and revocation. No public customer directory by default. | 5/5 |

## Website work supporting those stages

- Shared map/carousel system: consistent controls, labels, proportions, Info overlays, divider, ecosystem selection, responsive behaviour and image focal positioning.
- Destination depth: useful places, practical planning and embedded resources, South Island first then North Island. Preserve existing country content and links.
- Media library: verify Royann species/localities against the actual trip checklist; preserve provenance, credits and originals. Continue existing YouTube/8K library efficiently; no unverified or unlicensed media publication.
- Languages: expand the Colombia EN/ES homepage pilot through a scalable site-wide locale system retaining page, filters and private trip context. English remains default for now.
- Explicit design details: AVES-061 contour extends from logo across responsive header; AVES-058 accessible feather-shaped control pilot; pronunciation/logo-name tooltip; later static-friendly 3D birds and card effects. These are queued, not silently omitted or shipped.

## Efficient implementation and model use

Finish one demonstrable user journey per increment: inspect actual code/deployment → small implementation → relevant automated/security checks → desktop/phone/short frames → stage exact build → verify → promote → live checks → GitHub checkpoint → pause. Keep the two application branches separate. Update human/XML sitemap when inventory changes; always verify private exclusions and canonical links.

Sol medium suits scoped implementation and routine verification. Recommend a deeper model/reasoning review for material authorization, architecture, supplier/booking state, or itinerary constraint decisions; do not switch automatically or claim unavailable credit percentages. Use small research batches, shared components and existing evidence; avoid parallel feature expansion.

Near-term order: finish private AI pilot → resolve NZ brief/leg details and invite voluntary guest trial → improve bird/route realism and compare options → verify suppliers/transport/costs manually → reuse proven service for Sydney. The human AVES host supplies judgment, storytelling, relationships and coordination throughout.

## Request-recording rule

Record every concrete request—including minor visual details—with a unique ID or explicit link to an existing item, intended behaviour, scope, status (LIVE / IN PROGRESS / QUEUED), acceptance criteria and dependencies. Keep active prompt concise and link detailed entries. Every release distinguishes shipped work, verification limits, blockers and remaining goals. Do not put private trip answers, contact details, credentials or original media into GitHub.
