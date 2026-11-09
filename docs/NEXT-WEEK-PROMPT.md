# AVES current execution prompt

Updated 9 November 2026. AVES-066 is the only selected increment: whole-region
Colombia hover on the main homepage country card, verification, publication,
GitHub sync and then pause. The release/status authority is HANDOFF-CURRENT.md.
Do not start another upgrade automatically. Broader requirements below remain
retained scope, not instructions to redo published pilots.

## Start from the correct checkpoint

Read [HANDOFF-CURRENT.md](HANDOFF-CURRENT.md), inspect current GitHub history and
working trees, then read the linked detailed requirements before editing. Name
one recent source edit and its commit so the owner can recognise the baseline.
Do not overwrite another chat's work.

Repository: https://github.com/mmelendro/Aves

| App branch | Scope | Published runtime | Production deployment |
| --- | --- | --- | --- |
| webmaster/readiness-2026-11-05 | Global homepage, Colombia, New Zealand | 6856389 | dpl_DQVWzUrsUbzd4Lqg57niLDMikYVw |
| australia/preview | Australia and shared accounts/backend/admin | e0c766a | dpl_67GnFTnfkgrjN2scQL7QWBqvo1zq |

Keep the app roots separate. Documentation commits are newer than these runtime
commits; a documentation sync is not a deployment. Preserve AVES naming,
branding, canonical URLs, search visibility and existing country/region links.
This visual programme does not require project renaming or branch consolidation.

## What is already live

The homepage country-card consistency pilot, feather-inspired selection cues,
first-tap region previews and restored Colombia internal planning boundaries
are published. Colombia's original artwork and verified marker centres remain
the geographic baseline, not official administrative/ecological boundaries.

South Island has a connected bird/habitat map and landscape carousel, four place
contexts, zoom/pan/reset, distance scale and licensed media/credits. Thirty
sourced bird-media profiles and a separate 377-species NZ reference checklist
are available; national checklist inclusion is not proof of South Island range.

Both South Island maps combine historical NASA satellite imagery at adjustable
55% default visibility, optional visible/selectable ecosystem colours, nine
national parks, hatched DOC conservation land and curated public-place layers.
Ten public references cover nature/birding places, a conservation project,
public heritage, six settlements and two ecotourism visitor enterprises, with
overlapping categories deduplicated. This is a pilot, not complete coverage.
Satellite imagery dates to 2004; LCDB land cover is 2023/24 and generalised to
about 2 km. Zoom does not create new detail or guaranteed wildlife sightings.

The newer South Island releases also deliver shared featured-place/photo/habitat
selection, bird/place full-screen pilots, a six-resource carousel, field-guide
links and a layout-owned kea podcast/video dock. The dock persists through
connected New Zealand navigation only. Full-site/Australia/My Trips continuity
is still AVES-068, not delivered. Habitat soundscapes remain unimplemented.

AVES-066 uses the existing eleven Colombia paths, full-name keyboard controls
and existing guide URLs. Shapes and visible dots preview the same region; hover
and focus do not arm navigation. Boundaries, positions and existing media are
unchanged. See RELEASE-2026-11-09-COLOMBIA-REGION-HOVER.md for exact evidence and
limitations. Earlier immutable release reports remain under docs/RELEASE-*.

## Coherent experience to build next

Use **South Island as the sample**, then apply verified shared patterns across
the appropriate Colombia, Australia and New Zealand maps and content. The aim
is one coherent exploration experience, with content and visual style responding
naturally to the selected geography. The following are requirements, not claims
of completed implementation.

### 1. Continuous world, country, region and habitat exploration

Make moving from the world to countries, regions, subregions and habitats feel
like zooming or pinching into a globe. Keep the map frame stable and animate the
camera toward the actual selected area. Change the surrounding heading, summary,
birds, landscape photos, available layers and relevant resources immediately
with that selection. Avoid awkward full-page jumps, blank panels, stale cards,
unnecessary loaders, scroll resets and a delayed content change after animation.

Retain accurate geography. The Equal Earth world overview, Australian projection,
Colombian artwork and geographic detail layers are different representations;
transition between them honestly rather than stretching imagery or pretending
they are one continuous tile projection. A globe-like experience is the desired
interaction, not an instruction to add a heavy 3D globe or new paid provider.

Keep deliberate first-tap preview on mobile. The first tap changes the map and
paired content immediately. A later tap on the selected region, or an explicit
Explore action, opens its guide/detail level through the same coherent visual
language. Do not require a rapid double tap. Hover/default highlights do not arm
navigation. Preserve native modifier/new-tab links, shareable URLs, browser
Back/Forward, clear breadcrumbs/zoom-out controls, focus and reduced motion.
Preserve ordinary page scrolling and browser pinch zoom; intentional map
gestures must not trap the page. Shared account routes remain separate/private.

This extends 003a-2, 006c and 055. Existing homepage zoom is only a foundation;
continuous transitions through every map/detail level remain incomplete. South Island already has the connected discovery pilot; do not rebuild it.

### 2. Full-screen maps, photos and complete carousels

Every map card and bird/place/habitat slider should offer a discreet, clearly
labelled expand control. Expand the actual current map or carousel, preserving
the selected geography, layers, photograph, filters, slide position and controls.
The expanded view must retain previous/next, captions, credits and available
media controls, so visitors can browse the full collection rather than one
isolated enlarged thumbnail.

Show the entire photograph in a fit/contain view, with optional deliberate
zoom/pan where source resolution supports it. Request the highest existing
licensed rendition on demand; do not label a small asset as full resolution or
invent detail. Expanded maps need useful viewport space, zoom/pan/reset, accurate
aspect ratio and readable labels/legends. Keep Close/Escape, focus containment
and restoration, mobile/short-screen usability and native gestures. Opening and
closing must not reset wishes, duplicate audio or restart a slideshow.

This extends photo zoom 051 and shared map/media controls. South Island bird/place full-screen access is published. Full-screen maps and
full-site coverage remain incomplete; extend the working pilot rather than
replacing it.

### 3. Several photographs for each location and habitat

Build a small, useful multi-photo collection for each location/habitat rather
than a single static image. Use a smooth, discreet slider with consistent
previous/next and keyboard/touch alternatives, a subtle position indicator and
reduced-motion support. Keep the selected place/habitat and matching map/card
synchronised. The same collection must work inline and expanded.

Every photograph needs its own accurate locality/habitat description, creator,
source, licence and credit. Audit the current licensed collection before adding
assets. Do not reuse another location's photograph under a misleading label,
fabricate a photo count, or imply every location already has multiple images.
Keep high-quality originals/provenance, load nearby slides efficiently and avoid
layout shifts, intrusive autoplay, heavy effects or artificial wildlife detail.

The existing South Island landscape carousel is a starting point. Multiple
photos for every location/habitat remain incomplete and need source/rights work.

### 4. Compatible map layers and relevant bird filters

Satellite must remain a transparent background that works with ecosystem
colours, parks, conservation and public-place/business markers. Keep visibility
adjustable and all enabled layers legible, with one consistent legend and
selection treatment. Preserve Colombia's internal subregion lines and keep
dots over their respective regions. Smoothing may refine those lines without
changing their meaning or moving verified markers.

Inventory and add relevant filters one at a time on South Island, verify them,
then roll them across suitable maps using local data:

1. Satellite and habitat/land cover.
2. National parks and protected/conserved areas, with honest private-land gaps.
3. Conservation/restoration projects and initiatives.
4. Ecotourism and birding/nature hotspots, distinct from global biodiversity hotspots.
5. A distinct ecotourism business layer, including verified relevant birding lodges/stays.
6. Public archaeological/heritage visitor sites, excluding restricted cultural locations.
7. Cities, towns and useful travel gateways.
8. Relevant sourced native/introduced/endemic/migratory and month/season facets.

Distinguish display layers from filters that change the bird collection. Never
infer species status from migration or show a working toggle with fabricated
coverage. Keep existing wishes/briefs intact and explain source/date/scale/access
limits. Public place markers are not nests, access permission, AVES partnerships,
certifications, verified impact ratings or booking guarantees.

Follow [MAP-LAYER-ROLLOUT.md](MAP-LAYER-ROLLOUT.md) for DOC, CAPAD and RUNAP source,
licence and projection gates. The current South Island pilot does not establish
whole-country or all-subregion coverage. North Island and Rakiura need their own
verified ecological/media records before claiming parity; Sydney remains the
next broader product priority after the selected NZ foundation.

### 5. One discreet, bird-inspired media-player family

Use the same discreet player design and shared playback behaviour for ecosystem
soundscapes, bird calls, podcasts and compatible video/documentary controls.
The player should merge naturally with the AVES website: restrained feather/bird
cues, thin typography, existing colours, quiet translucent controls and clear
states. No competing player styles, intrusive chrome or decorative birds that
hide basic controls. Keep explicit play/pause, mute, volume, progress/seek where
appropriate, current recording/title, creator/source/credits and accessible labels.

**Habitat soundscapes 053 is the next media priority, soon, beginning on South
Island.** Playback must be OFF by default and visitor initiated. Follow the
selected habitat with appropriately located licensed recordings and gentle
crossfades; cancel stale loads during rapid selection. Fade ambience beneath
bird calls, videos and podcasts, then restore only the visitor's chosen level.
Avoid competing foreground audio, preserve mute/volume, and stop on off,
navigation or hidden page. Handle unavailable/blocked media honestly and follow
browser playback rules. No invented local soundscape or sensitive recording
location. Do not autoplay third-party embeds or remove publisher controls/credits
where embedding terms require them; make the surrounding AVES player treatment
consistent and disclose legitimate provider limits.

Coordinate the embedded resource carousel 036, checklist media previews 039 and
audio coordination instead of building separate players per page. The prompt
priority is recorded; habitat soundscape playback and the unified player family
are incomplete: the NZ podcast/video dock and resource carousel are published,
but habitat soundscapes and a fully global player are not.

### 6. Route planning for each subregion

Retain [AVES-062](AVES-062-SUBREGION-ROUTE-PLANNING.md): main public birding sites,
intervening cities/towns and estimated travel times, with Google Maps integration
where feasible under the existing no-new-spend constraint. Distinguish driving
time from straight-line distance; state mode, source, estimate date and access/
weather uncertainty. No invented routes, current conditions or paid API setup.
This request is saved, not delivered by the static map-layer pilot.

## Style, business plan and stewardship

Keep content and presentation connected: selected geography drives the story,
photos, habitats and relevant learning resources. Preserve AVES's established
visual identity and search-friendly naming without unnecessary project changes.
The Eco-Tourism Business Plan remains work to develop/verify, not a completed
deliverable. Link this programme to its actual current brief and business-plan
requirements before choosing commercial features or making impact claims.

Use B Lab's [ESC stewardship guidance](https://usca.bcorporation.net/putting-stewardship-to-work-tracking-esc-standards/)
as an evidence framework for environmental impacts, biodiversity/access risks,
supplier claims, local benefit and measurable outcomes. Record sources, unknowns
and review dates. B Corp pursuit and regenerative ambitions are not achieved
certifications or guarantees. Do not invent commercial partnerships or contact,
list private guest data, book or send anything without relevant authorisation.

## Release discipline and recovery

After the owner resumes, implement one coherent increment at a time. Check the
actual recent code, reuse shared components, verify desktop/mobile including
320px where supported, keyboard/touch alternatives, reduced motion, browser
history, map/media synchronisation, media cleanup and all existing region links.
State exact unavailable tests. Build, stage the exact commit, check it before
publishing and verify live routes, human/XML sitemaps and private exclusions.

Save small source commits, named recovery branches, the previous/new exact
Production deployments and quick rollback/rebuild instructions in
[ROLLBACK-CHECKPOINTS.md](ROLLBACK-CHECKPOINTS.md). Do not overwrite a shared branch
or assume deployment artifacts are retained forever. Sync the correct app and
shared handoff to GitHub. After the selected AVES-066 release is verified and synced, pause. The owner
chooses the next increment. Do not revive older automatic-continuation orders.

No new spend, subscriptions, broad secret pulls, weaker privacy or app-root merge.
AI proposal drafting 059 remains deferred because the account cannot satisfy the
required zero-data-retention entitlement with its current free credits. Do not
retry, buy credits, upgrade or relax ZDR/no-training. Manual proposals remain.
All guest answers, wishes, requests and proposals remain private.

## Preserve the rest of the project

[ROADMAP-DETAILS.md](ROADMAP-DETAILS.md), [AVES-CHANGE-INBOX.md](AVES-CHANGE-INBOX.md),
[AGILE-PLAN.md](AGILE-PLAN.md) and [SITE-ARCHITECTURE.md](SITE-ARCHITECTURE.md) retain
the full requirements. Unselected account/community/marketplace, branding/acronym,
logo pronunciation/3D bird, Colombian Spanish, photography/8K library, Royann media
audit and other backlog work remain separate. Do not discard their detailed
requirements merely because this prompt concentrates on discovery and media.

The previous prompt is preserved in
[EXECUTION-PROMPT-ARCHIVE-2026-11-09-BEFORE-CONNECTED-DISCOVERY.md](EXECUTION-PROMPT-ARCHIVE-2026-11-09-BEFORE-CONNECTED-DISCOVERY.md).
Historical release notes are evidence, not current instructions to overwrite a
newer owner decision. This older consolidation originally preceded the later South Island discovery,
full-screen and player pilots. Current delivered scope is in HANDOFF-CURRENT.md.


### Retained owner refinement — contextual history064

Queued after the currently selected release: a concise South Island/New Zealand biological, ecological and historical orientation, with expandable detail and authoritative/mana whenua sources. Landscape origins, settlement and continuing Māori relationships with place, European settlement/land-use change, and conservation today. Start South Island; use Ngāi Tahu primary voices without invented endorsement, cultural stories or guaranteed regenerative claims. Full acceptance is in AVES-CHANGE-INBOX.md. This is separate from current-species selection rules; no new historical/extinct species are added to the trip checklist. Future regional players should reuse each region’s representative bird, and guidebook purchase links should follow the verified publisher-page pattern without stale prices or stock promises.


## AVES-065 — Private bird wishlist with eBird connections (queued, 9 November 2026)

Extend the existing private bird selections rather than introducing a second shopping/bingo list. Visitors can save want-to-see species, review/remove them and attach them to their private trip brief. Link species and regional/seasonal research to eBird using stable species IDs and attributed data. Keep sightings/life lists separate from wishes. Explore a voluntary import of the traveller’s own eBird export to identify unseen targets, with preview, minimal retained data, deletion and explicit permission. eBird provides a public observations API and personal data downloads; direct account/OAuth or personal wishlist read/write syncing has NOT been verified. Do not request eBird passwords, scrape private accounts or promise bidirectional syncing. Check official API capabilities/terms and costs before implementation. No database change or eBird connection is shipped by this entry.

Sources: https://support.ebird.org/en/support/solutions/articles/48001078113 ; https://support.ebird.org/en/support/solutions/articles/48000960317 ; https://www.birds.cornell.edu/home/ebird-api-terms-of-use/ .


## AVES-066 — Colombia whole-region map hover (delivered in this increment)

Homepage country cards: Colombia currently responds at location dots, while Australia/New Zealand respond across region shapes. Make the Colombian planning-region area itself preview/highlight the corresponding region on pointer hover and keyboard focus; retain dots as location markers and maintain first tap preview, second/Explore guide navigation, clear selected state, touch and native modifier behaviour. Inspect source geometry before mapping shapes: planning regions may overlap and must not be misrepresented as official administrative boundaries. Provide accessible equivalent region links and test all 11 destinations. Owner reported 9 November 2026. Delivered in this increment; see RELEASE-2026-11-09-COLOMBIA-REGION-HOVER.md. Remains scoped to homepage country cards.


## AVES-067 — Reuse birds ↔ AVES invitation animation (queued,9November2026)

Apply the existing homepage word-flip consistently to invitations such as “Let the birds lead you into the landscape” on South Island and matching copy across the site. Animate only the birds/AVES word, preserve surrounding wording and a stable text width; use the same borderless typography, green AVES styling, gentle 3D transition and keyboard/touch equivalent. Retain a coherent accessible sentence without duplicate announcements, and a static reduced-motion version. Audit all instances before rollout; share one component rather than copies. This is the text-word animation, separate from future 3D flying bird logo models. Queued separately from the persistent-player release.


## Ongoing quality standard — Lightweight first, high quality when chosen

Owner reaffirmed9 November2026: aim for the lightest practical site while retaining high visual/media quality when available. Defer podcasts, video embeds and third-party player scripts until explicit intent; use responsive appropriately compressed images, lazy loading below the fold, a single active player and shared components. Preserve original/licensed high-resolution assets separately; offer higher quality or full-screen viewing without forcing large downloads. Check mobile data, slow connections, reduced motion, loading/error fallbacks and changes in production bundle/media cost for each relevant release. Do not prefetch remote media, add background autoplay or ship a 3D library merely for a small decorative effect.


## AVES-068 — Truly global continuous media (next player increment; not complete)

Owner reaffirmed9 November2026: one discreet player continues everywhere on AVES until the visitor closes/pauses it or another media item takes priority. Current root-layout pilot preserves podcasts/video through the connected New Zealand client-navigation paths; it is not full-site continuity. Audit and convert appropriate same-app navigation without breaking native links, modifiers, Back, maps or language paths. Main/Colombia/NZ and Australia/shared accounts currently have separate application roots; crossing Australia/My Trips or any full document navigation ends playback. A shared persistent shell or deliberate user-controlled cross-app handoff requires a separate architecture/effort review; never claim a seamless DOM stream across a reload. Do not use popup windows, hidden autoplay, private data in URLs, automatic background resumes or weakened account boundaries as shortcuts. Other foreground audio pauses the main resource; starting a different resource replaces it. Preserve position while merely browsing previews. Test podcasts/video, calls, all destinations, accounts/auth, Back/Forward, mobile Safari, close/reopen, slow networks and publisher failures. No new paid services. This supersedes earlier ideas that unmounting every page should always stop the selected travel programme.
