# AVES current handoff

Updated 9 November 2026. This is the single current release/status entry point.
Detailed requirements live in NEXT-WEEK-PROMPT.md, ROADMAP-DETAILS.md and
AVES-CHANGE-INBOX.md. Historical release reports record what was true then.

## Current instruction

AVES-066, Colombia whole-region homepage-card hover, is delivered. **Pause.**
The owner requested only this increment, verification, publication, GitHub sync
and document cleanup. No other upgrade is selected. Older automatic-continuation
text is not permission to start the remaining backlog.

## Published main app

- Source: `685638984d721f16ee9cc2e7a035a148cfee709e`.
- Production: `dpl_DQVWzUrsUbzd4Lqg57niLDMikYVw`, https://aves.bio .
- Branch: `webmaster/readiness-2026-11-05`. Global homepage, Colombia and NZ.
- Recovery: `checkpoint/2026-11-09-11-colombia-region-hover`.
- Previous runtime: `3f3c9dc`, Production `dpl_FCSgEsC91SzzB63onP9Kh8pYGHFc`.
- Previous recovery: `checkpoint/2026-11-09-10-persistent-player`.
- See [AVES-066 release](RELEASE-2026-11-09-COLOMBIA-REGION-HOVER.md) and
  [recovery instructions](ROLLBACK-CHECKPOINTS.md) for verification and rollback.

The two applications remain separate. `australia/preview` serves Australia and
shared accounts/backend/admin; it was not edited, deployed or synced by AVES-066.
Its last recorded runtime in this handoff is `e0c766a`, Production
`dpl_67GnFTnfkgrjN2scQL7QWBqvo1zq`; do not assume that historical record replaces
a fresh inspection before future Australia work. No app-root merge.

## AVES-066 change and limits

All eleven existing Colombia planning-region paths on the main homepage country
card now respond across their shapes to hover, keyboard focus and deliberate
activation. Shape and location dot use the same region identity, description
and guide URL. Hover/focus does not arm navigation. First activation previews;
a later activation or the explicit Explore link opens the guide. Native
modified/new-tab links and browser history remain.

The reviewed path geometry, holes, marker centres and visible dot sizes are
unchanged. Fixed artwork paint order resolves tiny smoothing overlaps. Removed
invisible oversized dot disks that could steal neighbouring narrow-region hits.
The artwork describes AVES planning/birding regions, not official administrative
or precise ecological boundaries. No species or habitat coverage was invented.

135 tests and TypeScript passed; local production build and exact final Vercel
Preview passed. Browser checks covered all 11 shapes and dots, all 22 keyboard
controls/first activations, repeat guide navigation, Back/Forward, 340 CSS-pixel
reflow and all 12 AU/NZ homepage-card region controls. Physical iPhone/Safari
and exact 320/390px viewport tests were unavailable in this environment. See
the release for actual live checks and evidence; do not borrow older results.

## Foundation to preserve

| Area | Published scope | Still incomplete |
| --- | --- | --- |
| Global discovery | Equal Earth map, connected country/region birds, first-tap preview, responsive dividers, Info overlays, homepage country-card consistency | Complete globe-like continuity through every detail level |
| Colombia | English-default homepage with page-local Spanish switch, planning artwork/boundaries, eleven guides, AVES-066 whole-shape card interaction | Site-wide translation and wider map redesign |
| South Island discovery | Shared four-place/five-photo landscape carousel, thirty sourced bird-media profiles, habitat/map/photo connection, zoom/pan/reset/scale | Several photos for every place/habitat and North Island parity |
| South Island layers | Adjustable historical satellite plus ecosystem colours, nine parks, DOC conservation and curated public-place/business references | Full geographic coverage and country/subregion rollout |
| Full-screen media | South Island bird/place complete-photo pilot, controls and credits preserved | Every map/card and deeper source-supported photo zoom |
| Resources/player | Six-resource carousel, field-guide publisher links, opt-in kea podcast/video dock persisting through connected NZ navigation | AVES-068 full-site/Australia/My Trips continuity and AVES-053 habitat soundscapes |
| Private planning | Existing Google sign-in, private briefs/wishes, budgets, explicit sharing, manual proposals and email-update consent | eBird-connected wishlist, saved places, broader community/marketplace and successful paid AI generation |

Source detail remains explicit: NASA satellite is a historical 2004 overview;
LCDB imagery 2023/24 is generalised to about 2 km. Public place markers are
approximate references, not nests, access rights, certifications, AVES partners
or promised sightings. NZ national checklist has 377 extant species; it does
not establish local South Island occurrence. Keep licensed credits/provenance.

The NZ media dock introduced in `3f3c9dc` remains scoped to connected NZ
navigation. Refresh, plain document navigation and crossing applications can
end playback. No claim of global continuity or physical-device playback support.

## Retained backlog, not selected now

065 private eBird-connected wishes; 067 birds/AVES invitation word flip;
068 truly global player; 061 header landscape contour; 053 soundscapes/ducking;
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
- [ROADMAP-DETAILS.md](ROADMAP-DETAILS.md): detailed product criteria.
- [MAP-LAYER-ROLLOUT.md](MAP-LAYER-ROLLOUT.md): source/projection gates.
- AGILE-PLAN.md, DEVELOPMENT-STAGES.md and SITE-ARCHITECTURE.md: planning criteria.
- [Pre-066 archive](archive/2026-11-09-before-aves-066/README.md): verbatim former
  entry points, including their older repeated checkpoints and AI diagnosis.

The current files no longer stack competing latest-release notices. Archives
and immutable release reports preserve evidence, not active execution orders.
Future updates should reconcile these current sections instead of prepending
another contradictory checkpoint. Inspect current GitHub history before edits.
