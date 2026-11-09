# AVES-066: Colombia whole-region homepage-card hover

Published source: `685638984d721f16ee9cc2e7a035a148cfee709e`.
Final staged Preview: `dpl_CaFonw4tMJGfiTAroDZRvHVqiUt2`, READY and browser verified.
Production: `dpl_DQVWzUrsUbzd4Lqg57niLDMikYVw`, READY with aves.bio/www.aves.bio.
Production was built from the same exact staged source commit; this report does
not claim that a Preview artifact was promoted unchanged across environments.
Recovery branch: `checkpoint/2026-11-09-11-colombia-region-hover`.
Previous source: `3f3c9dc`, Production `dpl_FCSgEsC91SzzB63onP9Kh8pYGHFc`.
Starting documentation/source head: `1f02aec` on `webmaster/readiness-2026-11-05`.

## Change

Only the main homepage's Colombian country-map card is changed. All eleven
reviewed planning-region paths are now named, native SVG links using the same
hover/focus/preview handlers as the existing country cards. Paths join to stable
region IDs through the existing full names, not a guessed coordinate box or
source order. The select, description, feather cue, Explore action and all guide
URLs remain connected to the same selected region. No new media collection or
species/habitat claim is introduced.

Hover and focus preview without arming navigation. The first deliberate plain
activation previews; a later activation or explicit Explore opens the guide.
Native modifier and middle-click links remain. All eleven dots keep their exact
centres and visible sizes. Removed the old oversized invisible dot hit disks,
which otherwise steal interaction from adjacent narrow shapes. Full-name select
and list controls retain the existing large-target alternatives.

The original PNG and boundary JSON are unchanged. Geometry retains even-odd
holes/disconnected components, strokes and smooth joins. The existing .8px
source smoothing produces tiny overlaps (largest audited pair about 30.45
source square pixels). They resolve deterministically in fixed artwork paint
order; selection never raises/reorders a shape and only fill receives shape
hits, so thick focus/border strokes do not change ownership. These are AVES
planning/birding regions, not official administrative or precise ecological
boundaries. The card credit now says that explicitly.

## Verification

- 135 Node tests passed, including every Colombian shape and dot, original path
  reuse, stable paint order, unchanged dot size, descriptions, links, first/second
  activation, focus/hover not arming navigation, and native modified events.
- TypeScript no-emit passed. Local production build passed. Exact final Vercel
  candidate built READY with its own clean production build/type validation.
- Staged browser: actual mouse movement inside all eleven shape areas away from
  dots changed the correct preview/highlight. All eleven dot hovers passed.
  All 22 shape/dot keyboard-focus controls and first plain activations passed.
  All 22 first Enter activations passed; repeat activation opened the correct
  Colombian Massif guide. Native Ctrl-click opened the Pacific guide in a new
  tab from both its marker and its actual region area. Back/Forward passed.
- All 22 first keyboard activations passed again at 340 CSS-pixel browser reflow,
  with no document horizontal overflow. Exact 320/390px viewport and physical
  iPhone/Safari/touch testing were unavailable. No unsupported mobile emulation
  or native pinch test is claimed. No page gesture interception was added.
- Australia and NZ main-homepage cards: all nine state/territory and three island
  controls still preview their correct ID without first-activation navigation.
  Their geometry and canonical targets remain in the existing automated checks.
- Live aves.bio: eleven shapes and eleven one-circle markers present; all eleven
  shape hover areas and first Enter selections passed. No oversized invisible
  dot disks remain. The deployment API confirmed the exact source SHA and aliases.

[Live map evidence](evidence/2026-11-09-colombia-region-hover.png).
The public route/asset/human/XML sitemap check report is
[saved separately](evidence/2026-11-09-colombia-region-hover-checks.json).
All 32 live public route/asset/sitemap checks returned HTTP 200, including all
eleven Colombia guides and the AU/NZ targets/anchors. Main XML sitemap has
42 unique URLs; Australia has 32. Account/admin/API routes remain excluded.
No hierarchy or route change was made, so no sitemap entry was fabricated.

## Code and documentation cleanup

Replaced the decorative-only Colombian boundary loop instead of retaining a
second unused overlay. Removed obsolete enlarged invisible marker disks. Shared
preview hooks, other country map code and all player/media code are unchanged.
No dependencies, SDK, provider, credentials or paid services were added.

The current handoff, execution prompt and root continue pointer now have one
current checkpoint rather than stacked competing latest-release notices. The
request inbox drops repeated release/order announcements, reconciles known
published pilot statuses and marks 066 delivered. The roadmap retains detailed
acceptance criteria while retiring obsolete top-level runtime/priority notices.
Recovery entries form one table and include checkpoint 11. Verbatim snapshots
of the five former entry points plus the map-layer rollout note are in the
[pre-066 archive](archive/2026-11-09-before-aves-066/README.md); historical details
and smaller requirements are not discarded. Immutable older release reports
remain historical evidence, not current execution instructions.

The Australia application/branch was not edited, deployed or documentation-synced.
No account, database, private brief, request, proposal, email, billing or security
change. Existing no-new-spend and paid-AI/privacy deferral remain.

## Recovery and next action

Use ROLLBACK-CHECKPOINTS.md: roll back the main app to previous Production when
available; otherwise rebuild its exact checkpoint 10 source in the same project.
Do not change DNS/protection or reset over another chat's newer Git commits.
No database rollback is needed for this UI-only increment.

AVES-066 is complete. Pause before any further upgrade. AVES-065, 067, 068,
soundscapes, header contours, saved places and other retained work remain separate.
