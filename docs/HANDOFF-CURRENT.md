# AVES — current handoff and next action

Updated 9 November 2026, Sydney. This is the authoritative resumption checkpoint. Earlier append-only release notes are historical. Read the linked detailed requirements; do not infer that every idea in the conversation has shipped.

## Latest map-layer checkpoint

South Island satellite, nine national parks and public conservation land are published from `14798a1`. Read RELEASE-2026-11-09-SOUTH-ISLAND-LAYERS.md and checkpoint 05 in ROLLBACK-CHECKPOINTS.md. Continue automatically with verified public nature/conservation/heritage places and towns on South Island, then appropriate map rollouts. Soundscapes remain the next media priority. Do not treat every requested filter as delivered.

## What to do next

**Active follow-up authorized: continue through selected map fixes and filter pilots automatically.** Runtime `14798a1`, Production `dpl_DBHMyn8kGx78oNg7oikUkWEwz3mM`. First-tap previews and restored Colombia boundaries are live; see RELEASE-2026-11-09-REGION-PREVIEW-BOUNDARIES.md. The owner rejected the diagonal leader and remaining connected-map mismatch. The [feather correction](RELEASE-2026-11-09-MAP-FEATHER-REVISION.md) now aligns the homepage cards and connected regional map palette/markers. The [first card release](RELEASE-2026-11-09-HOMEPAGE-MAP-CARDS.md) is historical. Desktop, 340px reflow, keyboard and all 23 selectors passed; exact 320/390px and physical touch remain unverified. Save each small verified step and previous deployment in ROLLBACK-CHECKPOINTS.md. Continue the selected map/filter sequence; other backlog work remains separate. The owner also requested Google Maps, birding sites, intervening towns and travel times for every subregion: queued as [AVES-062](AVES-062-SUBREGION-ROUTE-PLANNING.md). No new purchases/subscriptions, no AI retries, and no app-branch merge.

## Active owner follow-up after the pilot

Continue with mobile first-tap region preview, then map filters one at a time using South Island as the selected sample, then reuse verified layers on other appropriate maps. Earlier pause instructions apply to completed releases, not a requirement to stop this newly authorized sequence. See NEXT-WEEK-PROMPT.md for exact interaction and data gates. AVES-053 habitat soundscapes is promoted to the next media priority, starting on South Island, opt-in with volume/mute, licensed provenance and foreground-audio fading. Soundscapes are queued, not shipped by this prompt update. No new spending or privacy relaxation is authorized.

## Repository, branches and deployment

- Repository: https://github.com/mmelendro/Aves
- `webmaster/readiness-2026-11-05`, local `source/`: global homepage, Colombia, New Zealand. Published runtime `14798a1`, Vercel deployment `dpl_DBHMyn8kGx78oNg7oikUkWEwz3mM`.
- `australia/preview`, local `australia/`: Australian website and shared account/admin/backend. Published runtime `e0c766a`, deployment `dpl_67GnFTnfkgrjN2scQL7QWBqvo1zq`.
- These are two app branches of the same repository. Keep them separate; do not merge their different app roots. GitHub documentation commits are newer than the published runtime commits. Documentation-only commits do not require a production deployment.
- Live site: https://aves.bio/ ; country routes `/colombia`, `/australia`, `/new-zealand`; dedicated guide `/new-zealand/south-island`.
- Shared customer account: `/account`. Owner inbox currently `/australia/admin/quotes`. Account implementation still lives in the Australian app; the route name does not restrict accounts to Australia.
- Local workspace: `C:/Users/mmele/OneDrive/Documents/ChatGPT/🐦Aves`. Inspect each app's Git status and history before changing work possibly made from a second chat. Do not overwrite uncommitted work.
- Vercel scope `mmelendro-9273s-projects`; source project `v0-company-landing-page`, account project `aves-australia`. Existing project links are in each `.vercel/project.json`. Git pushes do not automatically publish this setup; stage, test and promote deliberately.
- Shared Supabase project `qeyprwftrouztlqmwuzv`, free plan. Use existing secure configuration; never commit secrets or broadly retrieve production environment variables.

## Current live foundation and limits

- Shared map/bird discovery, portrait media, resizable desktop pairing and mobile stacking; discreet translucent controls, available-call cue, transparent in-photo Info panels. Preserve calls, credits, wishlists, selected geography and keyboard/touch support.
- Homepage: Equal Earth world discovery and connected country bird carousel, with regional country-map cards below; matching lowercase italic birds/aves word animation. Do not reintroduce duplicate country carousels in cards.
- South Island: 30 sourced media profiles, ecosystem filtering, generalized LCDB layer, four-place landscape carousel (Arthur's Pass, Nelson Lakes, Fiordland, Otago/Catlins), synchronized place/habitat/map selection, zoom/pan/reset and responsive metric scale, expandable practical planning, six curated resource cards. Resources are not yet the requested embedded carousel.
- LCDB imagery is 2023/24 with about 2 km generalization. Habitat is broad context, not exact occurrences, marine extent, navigation or guaranteed sightings. Preserve sources and avoid exposing sensitive wildlife locations.
- NZ reference checklist: 377 extant entries; 55 extinct entries excluded from public/private selection. A national checklist includes rare visitors and is not proof of South Island availability. Visible wording should say species, without repetitive living/historical labels.
- Private NZ briefs, bird wishes, budget inputs, saved plans, optional email-update consent and Google login are implemented. Budgets separate accommodation/food/activities and selected currency; automatic currency conversion is not implemented. Consent is not a newsletter campaign system.
- Owner inbox opening/proposal-editor focus and privacy repairs were tested; manual priced proposal editing remains available. Do not describe the AI draft as working until real generation succeeds. Keep owner-only authorization at both API and database boundaries.
- Colombia homepage defaults to English, with explicit EN/ES flag switch for Colombian Spanish. This is only a homepage pilot, not whole-site translation. Other pages remain English.
- Recent validation: source language release 121 tests/typecheck and responsive/live checks; account AI diagnostics 289 tests/typecheck, real database authorization and synthetic UI checks. No physical iPhone verification, and no successful real AI draft save/reopen/edit has been completed.

## Deferred paid AI — do not retry or remove privacy

The owner explicitly chose to skip paying for this now. The AI implementation is published but real generation failed. Vercel dashboard shows two 403 requests, zero tokens and $0 inference cost, with per-request ZDR requested. Team has $5 free credits on Hobby; no custom routing rules/budgets were found.

Vercel's current Settings and official documentation say **per-request ZDR requires Pro/Enterprise or purchased Gateway credits; free credit does not qualify**. This is the entitlement blocker consistent with the failures. Reference: https://vercel.com/docs/ai-gateway/security-and-compliance/zdr#availability . The dashboard offered a one-time $20 top-up, one-year expiry, auto-reload disabled; no purchase was made. Currency/taxes/final terms need checking if resumed. Do not substitute a hosting upgrade or weaken ZDR/no-training to avoid payment.

- Runtime/model: `ai@7.0.165`, `openai/gpt-5.4-mini`, max 6,000 output tokens, no automatic retries, 90-second timeout; current catalog/privacy must be rechecked on future resumption.
- Code: `lib/ai-proposal-input.ts`, `ai-proposal-generator.ts`, `ai-proposal-handlers.ts`, `components/account/ai-proposal-draft.tsx`, `app/api/admin/quotes/[id]/ai-draft/route.ts`, `content/nz-proposal-sources.ts` in the account app.
- Storage: private RLS table, service-only owner-checking RPC, per-request lease, 15-minute retry interval, maximum three attempts, optimistic edit revision. Do not reset safeguards merely to force another test.
- Generator allowlists/redacts inputs; this reduces exposure but is not a guarantee of anonymity. It has no sending/booking tools. Source-backed notes remain private/unpriced, separate from formal reviewed proposals.
- Owner's retained request is titled “2027”. Read its actual private snapshot when needed; do not put identifiers, answers or generated drafts in GitHub. It differs from some earlier South Island discussion; never silently replace island/dates/party/budgets from chat history.
- When payment is explicitly authorized in a future increment: verify real generation, persistence, reopen/edit/save and separate human-review issuance. Nothing is sent without owner instruction.
- A broad production environment pull was previously rejected because it included unrelated secrets. Do not retry it indirectly. Use existing hosted OIDC and narrow authorized tooling.

## AVES-012c acceptance criteria (homepage pilot now published)

Historical problem, resolved for homepage cards in the linked release: the three homepage country cards mixed Colombian numbered points and varied green shading, Australian abbreviations, and NZ full-name callouts. The owner finds this jarring.

1. Inventory the existing shared renderer and country-card layout once. Relevant files in source: `components/destination-map-cards.tsx`, `destination-regional-map.tsx`, `colombia-map-artwork.tsx`, `content/colombia-map-markers.ts`, `content/global-australian-map.ts`, `content/new-zealand-map.json` and associated styles.
2. Create one names-first map presentation system: consistent sage/emerald palette, outline weights, marker/label/callout treatment, hover/focus/selected states, spacing, map frames, credits and action hierarchy. Use full region names in equivalent accessible navigation. Avoid overlapping labels on phones or forcing meaningless identical geographic divisions.
3. Preserve real geometry and aspect ratios, correct regional URLs and all 11 Colombian planning regions, nine Australian states/territories and three NZ island destinations. Colombia planning regions, Australia administrative divisions and NZ islands are different geographic levels; disclose this clearly. Do not invent boundaries or distort maps to force visual uniformity.
4. Keep the first release scoped to the homepage cards. Do not accidentally change the connected hero's zoom/filter behaviour or expand the task to all regional templates. Reuse a shared component where useful; follow with country/subregion batches later.
5. Test desktop, 390px and 320px, short frames, keyboard focus/activation and touch alternatives, text overflow, all three country links and region targets. Preserve credits and existing media/account functions. Use appropriate targeted checks, then build/stage verification.
6. Verify the exact READY production candidate before promotion; check live homepage and links afterward. Review human/XML sitemap and private-route exclusions; update inventories only if routes change. Commit source plus checkpoint, push the correct branch, report verification limits, then pause.

## Remaining sequence and relative effort

Complexity is comparative (1 easiest–5 hardest), not an estimate of remaining account credits. No reliable usage percentage is available. Use Sol medium for focused code changes; use a stronger model only for a clearly identified hard architecture/security/design decision. The agent cannot automatically switch the user's chat model.

| Order | Work | Relative effort / notes |
|---|---|---|
| Delivered | 012c homepage map-card consistency | Published; see release evidence and testing limits |
| New queued request | 062 subregion birding route planner | Sites, towns, travel times and Google Maps; verify data, privacy, licensing and no-new-spend approach first |
| Next selected batches | Shared map/carousel consistency across country/subregion templates (012a/b/c), accessible habitat controls near viewers | 3; reuse tested layout, preserve state |
| South Island depth | 036 embedded podcast/video/resource carousel; 039 checklist media hover/focus/tap previews | 2–3 each; licensed native embeds, lazy load, no autoplay |
| South Island context | 006c complete subregion content changes; 055 homepage region selection drives ecosystem/place section | 3–4; avoid duplicate state/routes, source real geography |
| Planning quality | Verified regional species breadth and native/introduced/endemic/migratory/breeding/feeding filters where evidence supports them | 3–4; source/data work, not just UI |
| After South Island | 040 North Island parity with its own verified birds/calls/habitats/resources; then Sydney launch itinerary | 3–4 per area; reuse templates |
| Small selected design pilots | 061 logo contour across header; 058 feather controls; 056 logo name/pronunciation; photo focal sizing/zoom and refined labels | 2–3 each; keep accessible/static fallbacks |
| Editorial/brand/media | Reduce repetition; Colombia regional species variety; honest biography/B Corp timeline; team/credits refresh; acronym/brand review; verified Royann library; existing YouTube/8K library | 2–4 by batch; verify facts and rights |
| Later optional layers | Month-first eBird seasonality with year/effort disclaimers, conservation/lodge maps, cities/satellite, habitat imagery/soundscapes, Indigenous pronunciation/context | 3–5; confirm licensing/API cost/rights before implementation |
| Low priority | Full Colombian Spanish/site-wide language switching with English default and retained context | 3–4; scalable locale system |
| Deferred paid | Private AI drafting and future automation | Blocked until explicitly authorized eligible access |
| Long term | Regenerative tourism marketplace and optional member community | 5; human operations, evidence, moderation/privacy, separate scoped releases |

## Vision and details that must not be lost

AVES connects birds to habitats, places, local people and balanced enjoyable trips: food/farm-to-table, culture, hiking, beaches/hot springs, wellness and downtime. An AVES host reviews plans, builds narrative/flow, coordinates guides/lodges/operators and accompanies guests. South Island is the immediate product priority, North Island next, then Sydney. Peter and Lisa's personal plans stay private. Regenerative-tourism leadership and leaving a place better are aspirations that need measured evidence; B Corp is being pursued, not achieved.

Retain explicit queued requirements: landscape line extending from logo; feather-shaped buttons; consistent thin wordmark and country bird/land connection; optional 3D flying logo birds with static/reduced-motion fallback; future map/photo flips; high-resolution photo pinch/zoom; optional continuous calls with sensible volume; opt-in habitat soundscapes that fade below calls/videos/podcasts; licensed YouTube/native video delivery building on the existing library; map ocean labels; verified community-specific totemic birds and pronunciation without invented/restricted cultural claims; eBird as primary observation/taxonomy source supplemented by BirdLife/local authorities; Equal Earth world megadiverse countries and biodiversity hotspots with a clear narrative; conservation/lodge maps; optional private community connections. Use the full acceptance documents below before implementing an item.

Royann RAW/JPEG/ZIP intake exists in an ignored local library; species/locality verification against the actual Colombia eBird trip remains unfinished. Original files and pending MP4s may be laptop-only, not available in a cloud chat. Do not claim they are on GitHub or caption them from filenames alone. Do not copy large RAWs/private trip material into Git.

## Durable requirements and work rules

- `NEXT-WEEK-PROMPT.md`: selected priorities and execution rules.
- `ROADMAP-DETAILS.md`: full retained acceptance criteria; `AVES-CHANGE-INBOX.md`: individual request IDs/observations.
- `DEVELOPMENT-STAGES.md`: detailed product stages/dependencies; `AGILE-PLAN.md`: release slices/effort; `SITE-ARCHITECTURE.md`: hierarchy; release checkpoints: implementation/test evidence.
- Preserve the visual style. Keep guest data private by default, owner access enforced server-side and in DB, secrets outside Git, no auto-send/book/spend.
- Record every concrete new request explicitly, including small visual details. Keep code and useful beginner-friendly comments accurate; remove verified redundancy/legacy items within the touched scope, not a speculative whole-site rewrite.
- Do one selected small increment, test the actual flow and relevant privacy/desktop/mobile behaviour, publish only the verified build, sync GitHub/checkpoint, then pause. Confirm costs before adding any paid external service or integration. Existing services still have their normal limits; do not promise unlimited free hosting.
