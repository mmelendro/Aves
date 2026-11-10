# AVES current execution prompt

Updated 11 November 2026, Sydney. Read this status and HANDOFF-CURRENT.md before historical release notes.

## Current source and release

One consolidated application serves the global homepage, Colombia, Australia, New Zealand, accounts and APIs. The owner explicitly approved publication and continued improvements. Preserve the one-site architecture and established URLs.

Current map-first guide runtime: b9722f2c016cacb1fa979b7e8e3c824d5d87e5dd.
Production deployment: dpl_9aocQLEW3ex2EHyE4Ve9Api6ZWtP in project prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv.
Publication verification is recorded in RECIPROCAL-GUIDE-CUES-2026-11-11.md.
Use release/aves-global or feature/field-guide-card as the maintained source, after checking fresh GitHub heads. The historical country branches now contain the same consolidated source, not separate current applications.

Delivered: one shared two-sided map/bird guide, selected-region/current-bird thumbnail on the map and expanded map, explicit turning button, retained resizable comparison, reduced motion and inactive-face keyboard isolation. The global homepage opens on the world map before introductory copy. Explorer pages open on the map. The map precedes the compact bird-cue footer; turning reveals the card without resetting its camera or chosen geography. Viewport-based map/photo sizing, contained photographs and persistent guide/map controls support the responsive frame. Selection still changes bird collections and surrounding planning content. Existing map layers remain available.

Validation: 487 automated checks, strict TypeScript, hosted builds and browser acceptance. Exact phone viewport, physical Safari/touch and background playback remain unverified; desktop acceptance is not a claim of perfect mobile fit or an unbreakable site. No backend, database, auth, billing or provider configuration changed. The US$1 safeguard was unchanged, not freshly inspected.

Reciprocal cues now make both faces one card: Birds on the map side, a selected-region map thumbnail on the bird side. Both use the same compact footer and turn the mounted guide with focus restoration. The map thumbnail uses existing reviewed geography, highlights the selected region and remains unchanged when carousel slides change. Cropped photos keep authored focal points; fitted guide photos stay centred and fully visible, so cover offsets cannot clip their heads. Hidden reverse-face controls are visually excluded after the midpoint of the turn. No automatic bird-face detection or complete per-photo eye-anchor audit is claimed. See RECIPROCAL-GUIDE-CUES-2026-11-11.md.

## Prioritised remaining work

1. Complete the all-page visual/style audit: shared headers, regional right-facing birds and contours, footers, typography, titles, focus, maps and responsive controls. Review actual 320/390px phone layouts and touch/Safari. Audit individual photographed eye/head anchors, beginning with images without authored focal points; do not invent face-detection coverage. Keep the map as the main entry and surrounding content synchronised with selection. Extend the existing working pattern rather than adding duplicate maps.
2. Finish the actual Vercel project-domain registration transfer, then retire extra projects after HTTPS, redirects, account/callback routes and recovery records pass. Aliases are consolidated, but aves.bio/www registration remains on the old global project. Do not delete it first. Its autoAssignCustomDomains is disabled. Connector capability limits remain, not missing owner authorisation.
3. Finish the unified interactive contact form and frosted landscape/header treatment. Preserve existing WIP. Remaining style/cookie copy is preserved at wip/single-app-style-polish (27883a8); only its preview header offset has shipped.
4. Audit all photographed Australia/NZ birds against their complete supported ranges/habitats, including NSW examples reported by the owner. Include all national/regional endemics in the sourced checklists. Photographed selections are not complete regional checklists.
5. Source-verified B Corp tourism/business map layers, further conservation/habitat layers, public places, routes, media and context in the retained programme below. Never label an unverified operator as certified or invent a commercial relationship.

VIDA remains a future umbrella, not the current brand. The Eco-Tourism Business Plan and B Lab stewardship framework inform commercial/impact work; certifications and regenerative outcomes require evidence. Keep all private briefs and guest data private. No paid AI requests, upgrades or new subscriptions.

## Baseline and recovery

Previous consolidated core: 047d2a6edaa6850a881cc1ff4faf3be93d48c21c, deployment dpl_38Df6sJcXUseU5ZyDWh3R8mWCRes.
First published guide: b21a6bdee6194453f8d486146b35b3aa57a20971, deployment dpl_GAbL3pKQskTEFWTwL4mVBnMDQyNB.
The former split-app runtimes and C-stage proposals are historical evidence. Do not redeploy those independent roots over the consolidated site. See ROLLBACK-CHECKPOINTS.md.

## Retained product programme

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
gestures must not trap the page. Account routes remain private within the consolidated application.

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

**Habitat soundscapes 053: South Island pilot published.** Three representative
Canterbury CC0 excerpts follow existing habitat selection. Mountains are honestly
unavailable; the All habitats view labels its forest sampler. Wider recordings
require a separately selected increment. Retained quality requirements: Playback must be OFF by default and visitor initiated. Follow the
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
South Island pilot, NZ podcast/video dock and resource carousel are published.
Wider soundscape coverage, full player-family rollout and uninterrupted shared-shell
playback remain incomplete. Safe cross-app paused Resume is published.

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
shared handoff to GitHub. After the selected increment is verified and synced, pause. Continue from the owner's latest priority, not historical release instructions.

No new spend, subscriptions, broad secret pulls or weaker privacy. The owner has authorised production publishing; preserve the previous deployment for recovery. Necessary synthetic live fixtures are authorised for C3, with
scoped cleanup. Preserve customer records, policies and provider settings.
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


## AVES-068 — Safe continuity and paused handoff published; uninterrupted cross-document stream deferred

10 November release: same-app public client navigation retains the player;
main/Australia/My Trips/reload boundaries restore only a paused public-resource
checkpoint. Close clears it; cached history respects that closure. No audio,
iframe or publisher API is loaded by restoration before explicit Resume. Programme
metadata controls the bird identity independently of the page. See
[the release](RELEASE-2026-11-10-MEDIA-CONTINUITY.md) for exact scope and limits.
A truly uninterrupted cross-document stream still requires a shared-shell
architecture decision. This historical release preceded the owner-authorised consolidation now published.

Retained full target, with the older NZ-only pilot description superseded above:

Owner reaffirmed9 November2026: one discreet player continues everywhere on AVES until the visitor closes/pauses it or another media item takes priority. The original NZ-only pilot has been superseded by the safe continuity release above. Audit and convert appropriate same-app navigation without breaking native links, modifiers, Back, maps or language paths. The earlier split-app limitation is historical: all destinations and accounts now share one application. Full document navigation still pauses playback and offers an explicit Resume; uninterrupted playback across every route still needs acceptance testing. A shared persistent shell or deliberate user-controlled cross-app handoff requires a separate architecture/effort review; never claim a seamless DOM stream across a reload. Do not use popup windows, hidden autoplay, private data in URLs, automatic background resumes or weakened account boundaries as shortcuts. Other foreground audio pauses the main resource; starting a different resource replaces it. Preserve position while merely browsing previews. Test podcasts/video, calls, all destinations, accounts/auth, Back/Forward, mobile Safari, close/reopen, slow networks and publisher failures. No new paid services. This supersedes earlier ideas that unmounting every page should always stop the selected travel programme.
