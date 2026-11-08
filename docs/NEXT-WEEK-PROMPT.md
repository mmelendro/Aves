# AVES — current execution prompt

Updated 8 November 2026 (Sydney). AVES-012d-1, the New Zealand Info-overlay pilot, is published and verified. Pause before choosing another release or rolling it out elsewhere.

Continue improving aves.bio in https://github.com/mmelendro/Aves. Keep the emerald style, thin AVES lettering, country bird/landscape marks and discreet media controls.

## Start with the correct project

- `webmaster/readiness-2026-11-05`: homepage, Colombia and NZ. Published app `f5eee01`, deployment `dpl_BA2SbW56xbfkktQqPQw8TBHqQsje`.
- `australia/preview`: Australia and shared accounts/contact/quotes. Published app `10554a3`, deployment `dpl_4J7C7ecQeG2YovNNwYvbWHnH6QEX`.
- Keep these independent apps/branches separate for current releases until an explicitly selected AVES-020 migration replaces this arrangement. Do not directly merge the application branches. Read the current `CONTINUE-HERE.md`, then the selected ID in [AVES-CHANGE-INBOX.md](AVES-CHANGE-INBOX.md). Read only the relevant section of [ROADMAP-DETAILS.md](ROADMAP-DETAILS.md). Use [AGILE-PLAN.md](AGILE-PLAN.md) for proposed batches and relative effort. Documentation commits may be newer than deployed code.

## Preserve completed work

Shared accounts at `/account`, Google sign-in, private drafts/requests, owner proposals and notifications work. The private NZ questionnaire, review/submission and bird wishlist are delivered. Its published checklist has 432 species (377 living selectable; 55 historical extinct); 31 profiles have licensed photos/calls. A real guest/physical-phone trial remains pending.

The three country homepages have working dividers and featured-bird region associations (CO 22, AU 20, NZ 31). The global homepage has a centered title, Equal Earth map, one switching carousel, its divider and three regional map cards. Speaker highlighting and the Santa Marta editorial pilot are delivered. Do not redo these foundations. Biodiversity overlays remain unfinished.

AVES-012d-1 is delivered only on the main NZ destination hero: Info opens a bounded translucent sheet over the photo. Complete notes, picker and credits remain; close/Escape/focus, scrolling, sound, slideshow, wishlist and responsive layouts were checked locally and live. Other viewers retain below-photo details. See INFO-OVERLAY-PILOT.md and the current handoff for evidence and rollout limits.

## Planned application consolidation — AVES-020

**Backlog only; scope and select this separately before implementation.** Consolidate the global/Colombia/NZ and Australian/shared-account applications into one Next.js application and one production Vercel project, retaining the existing GitHub repository and shared account database. Reuse delivered code and content; do not rebuild the site or directly merge the independent branch heads.

First inventory route/file collisions, shared components, assets, configuration and deployment dependencies, then prepare a dedicated integration branch and unified preview. Preserve existing country/deep URLs, SEO/canonicals/redirects, Google/email sign-in and recovery, root-path sessions, private plans/wishlists/quotes, owner permissions, inquiry/notification handling, accessibility and media licences/credits. Keep the existing database, ownership policies and saved records.

Include an AVES naming, branding and SEO review in the consolidation: consistent public page names, unique titles/descriptions, canonical/social metadata, useful URL structure, accurate structured data and complete sitemap/redirect coverage. The owner authorises renaming projects or creating a new target project where useful; choose clear AVES names after checking dependent URLs and configuration. Internal hosting names alone are not the SEO outcome. Preserve existing search value and review any public URL/brand changes in the cutover plan.

Test the unified preview on desktop/mobile and verify essential public and private journeys with controlled test data. Prepare a cutover and rollback plan and obtain explicit production approval before switching routing or deployment settings. Keep both current applications available for rollback; retiring the extra project requires a separately approved, verified step. No DNS, billing, credential or customer-data changes are authorised by this planning entry. Full acceptance criteria are in ROADMAP-DETAILS.md.

## Small release options

1. **AVES-012d remainder — Info-overlay rollout:** the NZ destination pilot is complete. Apply the proven opt-in pattern to the remaining source viewers and independent Australian app in separately selected batches. Check shorter frames, bright/dark photos, phones and divider extremes; preserve complete notes/picker/credits, close/Escape/focus, sound/navigation/wishlist and country-change behavior. Do not repeat the pilot or bundle 3D animation.

   **AVES-012d-2, later refinement:** let more of the bird remain visibly recognisable through the Info sheet. Tune the backing transparency and blur (or a subtle gradient), while keeping text, links and controls clearly readable over bright, dark and busy photographs. Keep text fully opaque; test desktop, phone and narrow divider layouts. Start on NZ before any wider rollout; planning only until selected.

2. **AVES-012c — uniform maps:** pilot the three homepage cards together. Use full region names and matching callouts/leader lines, palette, borders, selection/focus cues, framing, captions, credits and readable region lists. Replace unexplained numbers/codes. Avoid label collisions and hover-only access. Preserve real shapes, geography, planning-region/state/island distinctions and routes. Apply the standard to country, region, experience and article templates in later batches; never invent boundaries or stretch outlines.
3. **AVES-007 / 012a — NZ regional template:** South Island page first, with the proven resizable map/media pair and locally valid birds/calls. Retain the country overview, old island anchors, credits and sitemap/canonical links. North Island/Rakiura and other regional templates follow separately.
4. **AVES-016 — NZ depth/resources:** reach at least Colombia’s planning depth with simpler navigation and less repetition. Compare existing coverage once. Add practical routes/gateways, seasons/access, travel/rest, comfort/accessibility, food/culture, wildlife and biosecurity advice in small batches. Curate useful podcasts, documentaries, YouTube, reading and conservation/travel resources with credible sources, working links and lawful embedding. South Island first; verify changing facts when implementing.

These are proposed options, not automatic work or a replacement for the owner's priorities. Completed dividers, the usable NZ pilot and base world map stay complete. Uniform map/media foundations precede card animation; NZ trip content can progress independently. Confirm the actual trip year/dates privately.

## Remaining streams

- **018 / 019, later discovery cues:** give every carousel a discreet collection title, such as “Birds of New Zealand”, “Birds of the South Island” or “Birds of Colombia’s Caribbean region”, updating when its actual country/region collection changes. When a country is selected on a map, show a small approximate country species total with source/date context. Keep that total separate from the number of featured photos and avoid implying sightings or comprehensive media coverage; research current totals at implementation.
- **012b / 001 / 002 / 010:** richer regional bird viewers instead of text-only cards, preserving notes/sources/ethics and avoiding duplicate carousels. NSW is the example. Improve Colombian bird variety and copy one verified region at a time. Include cultural experiences/totemic birds only with specific community-led sources and sharing permissions.
- **003b:** add both megadiverse-country and actual biodiversity-hotspot layers to the existing Equal Earth map, after source/licence review. Explain what/why and distinguish ecology from offered destinations. NZ belongs in the hotspot narrative. The base map alone is not the full ecological release.
- **015:** later 3D map/region-photo cards and possible photo/details flips, with clear Back/Explore actions, verified local media, hidden-face/focus/audio handling and reduced motion. NZ/South Island pilot after the foundations; animation does not block planning.
- **004 / 005 remainder:** refine missing questionnaire fields after feedback; extend cross-country wishlists, safe guest/account merge, optional bingo/collaboration in separate releases. Human-reviewed itinerary options and verified supplier records precede AI recommendations. Scope the full AI/supplier/booking platform separately; keep planning, quotes, reservations and payments truthful.
- **014, low priority:** translate the entire Colombian version into natural Colombian Spanish (`es-CO`), retaining English and consistent routes, metadata, formats, forms and accessibility/help text. Do not translate private answers automatically.
- **Deferred:** Facebook login, broader localisation, authorised species video expansion and friendlier expired-Google-session handling. Local ecosystem maps (013) remain unconfirmed and do not replace country overviews automatically.
- **017, later:** remove extinct species from visitor-facing lists/pickers, starting with NZ's 55 historical entries. Keep living threatened species and rare visitors; verify ambiguous status distinctions. Update counts/scope while preserving provenance, saved briefs and validation. This is planning only; the current published 432-entry reference remains unchanged until a separate release.

## Usage and completion rules

Rough planning judgement: about half the defined website roadmap remains, with a broad 40–60% remaining range. This is not measured progress or a percentage of ChatGPT allowance. The unscoped future AI/supplier platform is excluded; a reliable all-vision completion percentage is not yet possible.

Effort units in AGILE-PLAN are comparative, not credits, time guarantees or weekly-limit percentages. When conserving usage, select one 2–3-unit pilot, read only relevant files/criteria and research once per content batch. Split larger work. Do not create another preference model, account system/database or unnecessary service. Do not delegate unless explicitly requested or required by applicable instructions.

For each selected implementation: verify proportionately, build where needed, publish the affected app, check it live, sync GitHub, update status and pause. Preserve maps, licences/credits, audio, region links, mobile stacking and private account/quote flows. Use eBird primarily for occurrence, supported by BirdLife/local authorities; public media availability does not grant reuse rights. B Corp status is pursuing, not certified. No guest data/secrets in public pages, GitHub or logs. Do not contact guests/operators or book travel without explicit instructions. Confirmed security or essential-journey failures take precedence.

Before completing each change, review the affected code and comments for clarity and correctness; remove redundant logic, verified-unused legacy items and stale comments, keep explanations beginner-friendly, preserve required migrations/history and working behaviour, and run proportionate checks.

This checkpoint includes the published NZ Info-overlay pilot; no database, billing or provider configuration changed. Wait for the owner to select the next implementation batch.
