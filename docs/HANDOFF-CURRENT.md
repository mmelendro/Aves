# AVES current handoff

Updated 10 November 2026, Sydney. This is the single current release/status entry
point. Detailed criteria and smaller requests remain in the linked prompt/inbox.
Archives and older release reports record history, not current execution orders.

## Current instruction

All nine Australian regional contour headers and the Australian country header
are live at 59a8f65207d17c6c1ec5af3e3a11868f44cd832f /
dpl_FNrh2YBNHFjamZk3gPu1WcL5Cb9Z. Ten live public header checks passed.
294 tests, TypeScript/builds, desktop and 340 CSS-pixel menu/reflow checks passed.
See RELEASE-2026-11-10-AU-CONTOURS.md. Physical Safari/touch remains unverified.

The owner next requested a code/UX audit and cleanup, then the selected satellite
map task. Seventeen unreachable terrain definitions are removed in source only,
newer than live runtime. Strict unused-local/parameter checks pass. Dependency
audit reports zero AU findings. No account/admin/auth/backend behaviour changed.
Main is now 33189e9 / dpl_HdwbDsUDSkfQcK8c2mxgVRe9j6zK, all eleven Colombia region
headers and country, main map controls and one-person team carousel published.
Follow the main branch HANDOFF-CURRENT.md and UX-first NEXT-WEEK-PROMPT.md for
current execution. Do not deploy the separate unified draft or reopen completed
safe playback continuity from old pending prose.

The following older table is historical for AVES-068, not the current runtime.

## Published applications

| App | Branch | Runtime | Production | Recovery |
| --- | --- | --- | --- | --- |
| Global/Colombia/NZ | webmaster/readiness-2026-11-05 | 5d96fa02e45fb18304fc07a97bb5084948ab4afd | dpl_EY3YBYBfbPWZ79yoDN1wcxC4m5DH | checkpoint/2026-11-10-12-media-handoff-main |
| Australia/shared portal | australia/preview | 2ff09e92b25a57d89c5966352393bcdb0369db45 | dpl_56y3bD1RTE2fngcHBr14obkGu2bx | checkpoint/2026-11-10-12-media-handoff-australia |

Previous main: 6856389 / dpl_DQVWzUrsUbzd4Lqg57niLDMikYVw, checkpoint 11.
Previous AU: e0c766a / dpl_67GnFTnfkgrjN2scQL7QWBqvo1zq, checkpoint 04.
These are independent app roots. This release changes both layouts and adds the
same public dock/catalogue to AU, without merging apps or changing account logic.
Inspect fresh Git history before edits. Documentation heads may be newer than
runtime commits. See [the release](RELEASE-2026-11-10-MEDIA-CONTINUITY.md) and
[recovery instructions](ROLLBACK-CHECKPOINTS.md).

## AVES-068 change and verification limits

Public same-app routes retain the mounted player, including Colombian guides.
Preview handlers run first; native modifiers/new tabs, browser history, hash links,
account/auth/API and other-app requests retain their boundaries. App/reload
boundaries restore only a paused, validated tab-scoped public media checkpoint.
No audio/iframe/API loads until explicit Resume. Close clears it and cached history
respects closure. Slow loading does not erase saved seconds. No private data,
URLs or credentials are stored. Foreground HTML audio pauses the programme.

139 main and 293 AU tests passed; both TypeScript checks and exact final hosted
builds passed. Browser audio continuity, reload/Resume, bird-call interruption,
content-matched identity and 340 CSS-pixel reflow were checked. Live same-origin
Australia/Regions/My Trips signed-out/return/close-through-Back behaviour passed.
No private account operation was tested. Physical phone/Safari, exact 320/390px,
telephone interruptions and native pinch/background behaviour remain unverified.
See the release and public route/sitemap evidence for actual limits. Do not
inherit older releases' test claims.

## Foundation to preserve

| Area | Published scope | Still incomplete |
| --- | --- | --- |
| Global discovery | Equal Earth map, connected country/region birds, first-tap preview, responsive dividers, Info overlays, homepage country-card consistency | Complete globe-like continuity through every detail level |
| Colombia | English-default homepage with page-local Spanish switch, planning artwork/boundaries, eleven guides, AVES-066 whole-shape card interaction | Site-wide translation and wider map redesign |
| South Island discovery | Shared four-place/five-photo landscape carousel, thirty sourced bird-media profiles, habitat/map/photo connection, zoom/pan/reset/scale | Several photos for every place/habitat and North Island parity |
| South Island layers | Adjustable historical satellite plus ecosystem colours, nine parks, DOC conservation and curated public-place/business references | Full geographic coverage and country/subregion rollout |
| Full-screen media | South Island bird/place complete-photo pilot, controls and credits preserved | Every map/card and deeper source-supported photo zoom |
| Resources/player | Six-resource carousel, field-guide links, content-matched dock, public same-app continuity and explicit paused main/AU/My Trips handoff | Truly uninterrupted cross-document shell, more country programmes, AVES-053 habitat soundscapes |
| Private planning | Existing Google sign-in, private briefs/wishes, budgets, explicit sharing, manual proposals and email-update consent | eBird-connected wishlist, saved places, broader community/marketplace and successful paid AI generation |

Source detail remains explicit: NASA satellite is a historical 2004 overview;
LCDB imagery 2023/24 is generalised to about 2 km. Public place markers are
approximate references, not nests, access rights, certifications, AVES partners
or promised sightings. NZ national checklist has 377 extant species; it does
not establish local South Island occurrence. Keep licensed credits/provenance.

The two app layouts now share the public media catalogue and player. Document
changes pause; Resume is explicit. All current programmes are NZ content and keep
the kea when browsing elsewhere. Programme country determines the bird: Colombia
motmot, NZ kea, existing Australian bird. This does not invent programmes.
YouTube buffered during checks; sustained video/nonzero video resume, playlist
sub-item restoration and physical Safari/device behaviour remain unverified.

## Retained backlog, not selected now

065 private eBird-connected wishes; 067 birds/AVES invitation word flip;
068 uninterrupted shared-shell architecture beyond paused handoff; 061 header landscape contour; 053 soundscapes/ducking;
063 private saved places; 064 ecological/historical orientation. Full criteria,
continuous transitions, expanded maps, multi-photo collections, media-library
work and route/travel-time request 062 remain in the execution prompt/inbox/roadmap.
Do not drop smaller requirements or silently implement the entire backlog.

## Privacy and spending gates

No new spend, paid AI retries, billing/security changes, broad secret pulls,
account/database policies, private-brief/request/proposal/email edits or
application consolidation. AI drafting 059 is deferred at the owner's direction;
the previously verified blocker was ZDR entitlement on free Gateway credits.
Do not buy credits, upgrade or relax ZDR/no-training. Manual proposals remain.
Do not expose guest data or secrets in GitHub, logs, screenshots or URLs, and do
not contact people, send proposals or book without relevant authorisation.

## Document navigation and history

- [NEXT-WEEK-PROMPT.md](NEXT-WEEK-PROMPT.md): execution rules and retained programme.
- [AVES-CHANGE-INBOX.md](AVES-CHANGE-INBOX.md): owner requests/acceptance.
- [ROADMAP-DETAILS.md](ROADMAP-DETAILS.md): detailed criteria, not runtime authority.
- [SITE-ARCHITECTURE.md](SITE-ARCHITECTURE.md): app boundaries and paused-handoff decision.
- [MAP-LAYER-ROLLOUT.md](MAP-LAYER-ROLLOUT.md): source/projection gates, no automatic rollout.
- [Pre-068 archive](archive/2026-11-10-before-aves-068/README.md): branch-specific former entry points.

Reconcile current sections instead of stacking another competing latest notice.
Pause before soundscapes, new content or another upgrade.
