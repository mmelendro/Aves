# AVES verified release checkpoints

Current AU recovery: checkpoint/2026-11-10-19-australia-selection, runtime 34037f0,
production dpl_DX5Rx141ExqZsMRE4PBfVg9jEZDg. Previous 59a8f65 /
dpl_FNrh2YBNHFjamZk3gPu1WcL5Cb9Z at checkpoint 17 remains the AU-only rollback.
Current main is a3445b7 / dpl_8TFWkxR8BVDmgTzDmHRpxcypMTpi, checkpoint 20; restore
applications independently. Earlier notices below are historical.

Use one checkpoint per small verified increment. Check the current GitHub heads
and Vercel project before any recovery. Main and Australian apps are independent;
do not merge their roots or roll back both merely because one UI changed.

| Checkpoint branch | Source commit | Production deployment for named app | State |
| --- | --- | --- | --- |
| checkpoint/2026-11-09-01-feather-maps | 6f123b0dcd7d6e4a9d0718a5aff4a798c4d254a5 | dpl_9bzZ17LFvxTSR8Dr5c2gYPPAfPYV | Prior feather presentation, verified |
| checkpoint/2026-11-09-02-region-preview | 15c19f159cd600a7a6aa7885b00e7e1b5ea4bcad | dpl_DeyZmLZ4GRG4KoC7EaDVoFiS15Ze | First-tap preview published; mouse first/second guide flow verified live; SVG Enter follow-up included with boundaries |
| checkpoint/2026-11-09-03-colombia-boundaries | da820552e1c4a9a5536c36904bd11f531ede0dca | dpl_9uif85cMYtEpqv4Dy6WPtPre62jx | Main app: restored boundaries, verified marker centres and SVG Enter flow; published |
| checkpoint/2026-11-09-04-australia-preview | e0c766a80d1150c7a0c24e1ccf54adc1336530b7 | dpl_67GnFTnfkgrjN2scQL7QWBqvo1zq | AU app: first preview/second guide; published |
| checkpoint/2026-11-09-05-south-island-layers | 14798a16b4363d27bfff6b563470dc984520b057 | dpl_DBHMyn8kGx78oNg7oikUkWEwz3mM | Main app: satellite, nine national parks and DOC conservation pilot; published and checked |
| checkpoint/2026-11-09-06-combined-ecotourism-layers | 1aed534d5a295168cf445d3185876184425c671e | dpl_EpZR2p99nc9zy5gp8z83zpueMCKp | Main app: combined transparency/ecosystems and curated public places/businesses |
| checkpoint/2026-11-10-12-media-handoff-main | 5d96fa02e45fb18304fc07a97bb5084948ab4afd | dpl_EY3YBYBfbPWZ79yoDN1wcxC4m5DH | Main safe media continuity/paused handoff |
| checkpoint/2026-11-10-12-media-handoff-australia | 2ff09e92b25a57d89c5966352393bcdb0369db45 | dpl_56y3bD1RTE2fngcHBr14obkGu2bx | AU/shared portal public player/paused handoff |

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

AU contour checkpoint 17: runtime 59a8f65 / dpl_FNrh2YBNHFjamZk3gPu1WcL5Cb9Z.
Previous AU runtime 2ff09e9 / dpl_56y3bD1RTE2fngcHBr14obkGu2bx (checkpoint 12 Australia).
Main current contour checkpoint 18 is 33189e9 / dpl_HdwbDsUDSkfQcK8c2mxgVRe9j6zK.
Rollback only the affected application. No database migration/rollback applies.
