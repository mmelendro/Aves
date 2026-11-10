# AVES-039 public checklist photo release

10 November 2026, Sydney. Owner explicitly approved publication after reviewing
the protected preview. Released only the reviewed main-app increment.

Runtime: 8c7f297b15b70678a3b4bc087a98939b37d8460e
Production: dpl_AuSANAJzDMdddtHb53rArqvJqM1B
Project: prj_ZKEHgaFrywRyoEo9IfSFcln9k8pv, mmelendro@gmail.com connection.
Live: https://aves.bio/new-zealand/south-island and https://aves.bio/new-zealand.
Recovery branch: checkpoint/2026-11-10-14-checklist-photos.

31 existing local photographs now have independent hover/focus previews and an
explicit larger view with full creator/location/source/licence/modification
credits. Parent species/subspecies scope remains explicit. The remaining 346
living checklist species have no photo affordance and remain selectable. No new
media, automatic playback, database, provider, privacy or account changes.

149 tests, TypeScript and final local/preview/Production builds passed. Preview
browser review included hover persistence, keyboard/Enter/click, independent
selection across scientific/Maori searches and filters, Escape/focus restoration
without reopening, and 340 x 234 CSS-pixel reflow at 400% native browser zoom.
All 38 live public checks passed: 31 image assets and seven page/sitemap/robots
responses, including NZ canonicals and South Island sitemap inclusion. The live
South Island photo, credits, activation, Escape/focus and unchanged selection
were rechecked. A temporary browser transport disconnect recovered; final closed
state had zero dialog/preview images and focus on Photo with Kea unselected.

Physical iPhone/Safari, touch, exact 320/390 CSS-pixel layouts and forced hosted
image-error fallback remain unverified. No wider private journey was retested
because private code did not change. Evidence: evidence/2026-11-10-checklist-photos.json
and evidence/2026-11-10-checklist-photos-live.json.

Australia production/branch remains runtime 2ff09e92b25a57d89c5966352393bcdb0369db45 /
dpl_56y3bD1RTE2fngcHBr14obkGu2bx. Unified candidate 6c7cb0b lacks AVES-039:
port the published four-file source/test delta before cutover. C3 remains blocked
on workspace CLI network access, with owner approvals retained. C4/C5 are separate.

Recovery is main-only to d34faabc3d09bee8b671b618998606ed06994bea /
dpl_3WU7VC5jQjiN5TWBEGBGxVB82gWB (soundscape checkpoint 13). No database rollback.
Pause after this release. The retained priority order remains saved places,
species-origin filters, remaining checklist scope, South Island context, verified
places, playback, continuous calls, maps and design. No next increment selected.
