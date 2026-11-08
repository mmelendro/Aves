# AVES — paused checkpoint, 8 November 2026 (Sydney)

The owner requested an immediate pause after saving the prompt to GitHub. Do not implement, publish or promote anything until they explicitly resume. This checkpoint takes precedence over older release narratives.

## Exact versions

Repository: https://github.com/mmelendro/Aves

| State | Source: global, Colombia, NZ | Australia/shared portal |
| --- | --- | --- |
| LIVE application commit | `95c9f75` | `721370e` |
| LIVE deployment | `dpl_DJzpKPbaZkSpKTXiJ9XPdT8z4iLv` | `dpl_EhUG5kSNUSkW6YwhgaarDJWecJ56` |
| New candidate, committed/pushed | `5847eb7` on `webmaster/readiness-2026-11-05` | `6ba7fee` on `australia/preview` |
| READY staged build, NOT promoted | `dpl_GMPLFwPviWsLq73i9JJBjCNvkaja` | `dpl_9ZrHC1jyd3SGzMeVn248kcFBwmcv` |

Source staging: https://v0-company-landing-page-4nswrs9r2-mmelendro-9273s-projects.vercel.app/new-zealand/south-island

Australia staging: https://aves-australia-1rs659n8o-mmelendro-9273s-projects.vercel.app/australia

Documentation-only branch heads may advance beyond these app commits. The new South Island page is NOT live on aves.bio yet. Do not confuse a ready build with publication.

## Resume with this bounded release

1. Finish hosted checks of the existing South Island/regional-zoom candidate; do not rebuild the feature. It adds `/new-zealand/south-island`, canonical/sitemap links, 30 verified South Island profiles with existing calls, rights, Info, wishlist and private-brief links. Old island anchors remain valid; North Island/Rakiura dedicated pages are still queued.
2. Verify the bird's-eye regional glide and connected context: country → region zoom updates local birds/calls, overview and planning links, with Back at each level. The homepage covers all23regions; country heroes also preview regions. AU/NZ use real geometry; Colombia focuses a sourced planning marker without inventing precise boundaries. Complete guides remain at canonical URLs. Keep north-up orientation, uniform scale, stable divider and reduced motion. This is not a full in-place replacement of every guide's body.
3. Latest local checks passed:112source +273AU tests (385total), final32focusedsource checks, strictTypeScript and both local/hosted builds. Browser checks covered South Island desktop/390/320, call playback/cleanup, 30-picker options, Info bounds, wishlist add/remove/restoration, divider drag, all23homepage regional choices, all9AUcountry choices and mobile layouts. The final NZ Back-focus fix, COmarker hiding and heading separator are in the hosted source candidate and still need hosted confirmation. AUstaging region/call-cleanup/phone checks passed. Final source hosted checks and all post-promotion live checks are unfinished.
4. When resumed and checks pass, promote exact tested production builds (Australia first, source second), verify live country/region links, calls, Info, wishlist and private-brief entry, sync final checkpoint, then pause. No new database, credentials, billing or service changes are part of this release.

## New requests saved after the candidate was staged

- **AVES-027 — hide public experience prices:** remove numeric prices and price comparisons/teasers from public Birding Experiences listings/details and relevant structured metadata. Use personal-quote invitations. Preserve private priced proposals, account/quote flows and underlying saved customer data. AU public styles already appear to use personal confirmation; verify scope rather than deleting private pricing. A partial, untested source draft exists in `app/tours/adventure/page.tsx` and new `components/tour-quote-section.tsx`. Preserve it on `checkpoint/paused-2026-11-08-pricing`; inspect before resuming and never deploy it as finished.
- **AVES-028 — credits carousel:** simplify `/credits` around the existing shared photo carousel, with translucent photographer/recordist information over the image. Reuse navigation, calls, focal framing and Info behavior. Preserve every author, source, licence/modification notice, NZphoto credits and `#audio-<id>` deep links. Retain an accessible complete recording/non-photo directory where needed. No implementation was made; the current page has imagecards and recordingcards. Avoid a second carousel state machine or forced bird-profile labels for audio-only assets.
- **AVES-029 — world recentering/rotation:** selected countries, especially NZ near the edge, should become centered as the overhead glide zooms in. Preserve genuine Equal Earth; assess geographic central-meridian rotation/reprojection and correct antimeridian clipping rather than spinning/stretching a flat SVG. Keep selected-country centering, familiar orientation, Back/reset, accessible text controls, native page gestures and reduced motion. Current zoom translates/scales toward the country; geographic rotation is not implemented. Keep this a separately verified map increment.

## Further confirmed requests — planning only

- **030, AVES host and human oversight:** AI drafts itinerary options; a designated AVES host reviews them, coordinates local guides/operators/lodges and booking arrangements, accompanies guests where agreed, and shapes the storytelling, pacing and connections throughout the journey. Define responsibilities, handoffs and approval gates before automation. Keep guest preferences and operational contacts private; outreach, bookings and commitments require their own authorisation.
- **031, existing YouTube library and future 8K footage:** build on the owner's existing YouTube uploads used for older page backgrounds. Identify the exact channel/videos and available original masters before adding media; do not assume all uploads are 8K or that unrelated resource embeds belong to AVES. Integrate videos into the existing species/region/carousel experience with the same AVES styling and controls. Assess a hybrid approach: YouTube for discovery/sharing, with official embeds or native website playback selected for quality, privacy, mobile speed, maintenance and actual delivery cost. Keep high-resolution masters and serve suitable adaptive/web versions rather than forcing raw 8K downloads. Preserve rights, accessible alternatives, controlled playback and secure media handling; no new hosting plan or charges while paused.
- **032, branding discussion:** review how AVES works in Spanish and English, including pronunciation, meaning, recall and international growth. Compare keeping AVES with any proposed alternatives before deciding; preserve the current name, thin lettering and coherent bird/landscape country marks meanwhile. Consider the previously discussed motmot/fairywren/kea family and global peregrine concept without restarting approved logo work. Public rebranding is a separate owner decision, distinct from renaming internal projects; no automatic domain purchase, logo replacement or migration.

## Retain the rest of the plan

After the current release: South Island practical travel guidance/resources and a real private-brief trial, then the Sydney launch product. Broader NZ island pages and map/media consistency, sourced checklist filters/extinct-species cleanup, collection titles/species totals, editorial/bird variety, cultural/totemic interpretation, pronunciation, satellite/city layers, ecological overlays, later card flips, Colombian Spanish, and the separate unified-app draft remain in NEXT-WEEK-PROMPT/ROADMAP-DETAILS/AVES-CHANGE-INBOX/AGILE-PLAN. Keep AVES-020 PR3 unmerged; carry newer app fixes into it before any separately approved cutover.

Use eBird primarily for occurrence with BirdLife/DOC/local authorities and verified media rights. Keep private guest information out of pages/GitHub/logs. No guest/operator outreach, travel bookings, ads, new spend or unrequested provider changes. Review affected code/comments, remove verified redundant/legacy logic, preserve working behavior, verify proportionately, publish only the selected increment, sync and pause.
