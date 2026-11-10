# AVES verified release checkpoints

The current site is one consolidated application. Check current GitHub heads and Vercel project before recovery. Historical separate-app checkpoints below are recovery evidence, not current deployment targets.

## Current direct preview expansion · 11 November 2026

Runtime 79bba2f209555250414a21cb277946a893e9c208; tree 988ca6468114a1a04bcb222a117f616a28844261.
Production dpl_EP7mSzuuNicjtRg9srnLqPFuif8x in prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv.
Recovery branch checkpoint/2026-11-11-direct-guide-previews.
Immediate previous source b9722f2c016cacb1fa979b7e8e3c824d5d87e5dd / deployment dpl_9aocQLEW3ex2EHyE4Ve9Api6ZWtP.
For rollback, inspect that deployment's READY status and pinned source, assign BOTH aves.bio/www aliases to it, then verify destinations, accounts and HTTPS. If needed, rebuild its pinned source in the same surviving project. Preserve Git history and domain registration.

## Previous reciprocal guide cues · 11 November 2026

Runtime b9722f2c016cacb1fa979b7e8e3c824d5d87e5dd; tree 24d99a81d20bdb0ac886ef6dd6b4ff053a7eb760.
Production dpl_9aocQLEW3ex2EHyE4Ve9Api6ZWtP in prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv.
Recovery branch checkpoint/2026-11-11-reciprocal-guide-cues.
Previous published runtime d091314c0764448f6f1367115b1184bd95914ac7 and production dpl_CrYVdpeTESBACZcnkp7zi311skMz remain the immediate rollback.
Inspect the previous deployment's READY/source status, then reassign BOTH aves.bio and www.aves.bio aliases and verify public/account routes. Rebuild its pinned source in the same surviving project if needed. Keep Git history and domain registration intact. Do not publish an old separate-app root.

## Previous map-first guide release · 11 November 2026

- Runtime: d091314c0764448f6f1367115b1184bd95914ac7.
- Tree: b191aa83489e0e3c4e793c6a90f891a6aa66083c.
- Deployment: dpl_CrYVdpeTESBACZcnkp7zi311skMz.
- Recovery branch: checkpoint/2026-11-11-map-first-guide.
- Surviving project: prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv.
- Both aves.bio and www.aves.bio aliases verified on this deployment.
- Previous guide: b21a6bdee6194453f8d486146b35b3aa57a20971 / dpl_GAbL3pKQskTEFWTwL4mVBnMDQyNB.
- Previous consolidated core: 047d2a6edaa6850a881cc1ff4faf3be93d48c21c / dpl_38Df6sJcXUseU5ZyDWh3R8mWCRes.

For a guide-only rollback, first inspect the previous deployment's READY status and source. Reassign both custom-domain aliases to dpl_GAbL3pKQskTEFWTwL4mVBnMDQyNB, then verify global, Colombia, Australia, South Island and account routes. If the old artifact is unavailable, rebuild the pinned previous source in the surviving project before alias assignment. Do not reset GitHub history or republish an old separate application. Domain registration still needs transfer before old-project deletion.

| Checkpoint branch | Source commit | Production deployment for named app | State |
| --- | --- | --- | --- |
| checkpoint/2026-11-09-01-feather-maps | 6f123b0dcd7d6e4a9d0718a5aff4a798c4d254a5 | dpl_9bzZ17LFvxTSR8Dr5c2gYPPAfPYV | Prior feather presentation, verified |
| checkpoint/2026-11-09-02-region-preview | 15c19f159cd600a7a6aa7885b00e7e1b5ea4bcad | dpl_DeyZmLZ4GRG4KoC7EaDVoFiS15Ze | First-tap preview published; mouse first/second guide flow verified live; SVG Enter follow-up included with boundaries |
| checkpoint/2026-11-09-03-colombia-boundaries | da820552e1c4a9a5536c36904bd11f531ede0dca | dpl_9uif85cMYtEpqv4Dy6WPtPre62jx | Main app: restored boundaries, verified marker centres and SVG Enter flow; published |
| checkpoint/2026-11-09-04-australia-preview | e0c766a80d1150c7a0c24e1ccf54adc1336530b7 | dpl_67GnFTnfkgrjN2scQL7QWBqvo1zq | AU app: first preview/second guide; published |
| checkpoint/2026-11-09-05-south-island-layers | 14798a16b4363d27bfff6b563470dc984520b057 | dpl_DBHMyn8kGx78oNg7oikUkWEwz3mM | Main app: satellite, nine national parks and DOC conservation pilot; published and checked |
| checkpoint/2026-11-09-06-combined-ecotourism-layers | 1aed534d5a295168cf445d3185876184425c671e | dpl_EpZR2p99nc9zy5gp8z83zpueMCKp | Main app: combined transparency/ecosystems and curated public places/businesses |
| checkpoint/2026-11-09-07-south-island-discovery | d7e39e5 | dpl_EmKES8YcrhCjWVz7J3kRmBX3JUgx | Shared featured place/photo/habitat state in both maps;129 tests, desktop/390/320px and34 live route/asset checks |
| checkpoint/2026-11-09-08-south-island-fullscreen | 4aa0939 | dpl_31oP6mrnBhN8MW5CbTZCXXaVNLQz | Bird/place full-screen pilot;129 tests, desktop/phone layouts, nine live routes/sitemaps |
| checkpoint/2026-11-09-09-south-island-resources | bf49517 | dpl_CD46PdiKxApLx6ZvQhcJiFVd11Q1 | Kea resource carousel, embedded DOC audio/video, map actions and field-guide purchase links;132 tests and desktop/phone verification |
| checkpoint/2026-11-09-10-persistent-player | 3f3c9dc | dpl_FCSgEsC91SzzB63onP9Kh8pYGHFc | Layout-owned kea dock; NZ route continuity,133 tests, desktop/phone/short-frame and live checks; global cross-app target pending |
| checkpoint/2026-11-09-11-colombia-region-hover | 685638984d721f16ee9cc2e7a035a148cfee709e | dpl_DQVWzUrsUbzd4Lqg57niLDMikYVw | Main homepage Colombia whole-region hover/focus; prior runtime 3f3c9dc remains checkpoint 10 |
| checkpoint/2026-11-10-12-media-handoff-main | 5d96fa02e45fb18304fc07a97bb5084948ab4afd | dpl_EY3YBYBfbPWZ79yoDN1wcxC4m5DH | Main safe media continuity/paused handoff |
| checkpoint/2026-11-10-12-media-handoff-australia | 2ff09e92b25a57d89c5966352393bcdb0369db45 | dpl_56y3bD1RTE2fngcHBr14obkGu2bx | AU/shared portal public player/paused handoff |
| checkpoint/2026-11-10-13-south-island-soundscapes | d34faabc3d09bee8b671b618998606ed06994bea | dpl_3WU7VC5jQjiN5TWBEGBGxVB82gWB | Main app: opt-in three-track South Island habitat ambience and shared ducking |
| checkpoint/2026-11-10-14-checklist-photos | 8c7f297b15b70678a3b4bc087a98939b37d8460e | dpl_AuSANAJzDMdddtHb53rArqvJqM1B | Main public NZ checklist photos; approved, published and live-verified |

Australia's previous recovery baseline: source d693512 and Production
`dpl_9hrh2H4xuQumccS1qiPupqZuozV7`; the later first-tap release is checkpoint 04 above.
Main Vercel project: `prj_ZKEHgaFrywRyoEo9IfSFcln9k8pv`.
Australia project: `prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv`.
Team: `team_Th6ddqWyWKU1mLzTbJPlduDx` under the authorized account.

## Fast recovery

1. Identify the affected app and the last verified Production deployment above.
2. Use Vercel's production rollback to that deployment, verify READY/current
   aliases, then check the live homepage and the affected flow. Do not change
   DNS, protection, billing or environment variables as a recovery shortcut.
3. If the saved deployment is no longer available for rollback, build that exact
   checkpoint commit in the SAME app/project, verify Preview, then release it.
   Named GitHub checkpoint branches retain the source independently of Vercel's
   artifact retention. No historical deployment is promised permanent retention.
4. Repair source with a focused revert or follow-up commit. Do not reset a shared
   branch over another chat's newer work. Keep the previous runtime and docs
   checkpoint recorded, and repeat the live route/sitemap checks.

These UI increments contain no database migrations or destructive data edits.
A hosting rollback restores application routing, not database contents, third-party
account settings or subsequently issued communications. No recovery is needed
or being performed now. Add the next verified source/deployment before continuing.

AVES-068 previous main: 6856389 / dpl_DQVWzUrsUbzd4Lqg57niLDMikYVw. Previous AU: e0c766a / dpl_67GnFTnfkgrjN2scQL7QWBqvo1zq. Revert only the affected app, or main then AU if both need recovery. No database rollback.

AVES-053 recovery: main only, to runtime 5d96fa0 / dpl_EY3YBYBfbPWZ79yoDN1wcxC4m5DH, checkpoint 12. Australia is unchanged and needs no rollback. This is a public UI/audio increment with no database changes.


## Unified C1d/C2 preview checkpoint, 10 November 2026

No production release. Runtime 6c7cb0bba913ed4c1a0315c5fa89f690519d792b;
protected read-only preview dpl_4VBHrNqq7XYUCb8Da9bc9oUuHaqn. Native harness
checkpoint 1e0fbfefd7672ed09961c856b8d4732d37861b70. See the C1d/C2 checkpoint.
Production anchors remain main dpl_3WU7VC5jQjiN5TWBEGBGxVB82gWB and Australia
 dpl_56y3bD1RTE2fngcHBr14obkGu2bx. No rollback is being performed. Scoped C3
synthetic fixtures were fully removed; no schema or customer-data rollback applies.

AVES-039 recovery: main only, to d34faabc3d09bee8b671b618998606ed06994bea /
dpl_3WU7VC5jQjiN5TWBEGBGxVB82gWB, checkpoint 13. Australia is unchanged.
