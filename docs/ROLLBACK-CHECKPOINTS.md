# AVES verified release checkpoints

Use one checkpoint per small verified increment. Check the current GitHub heads
and Vercel project before any recovery. Main and Australian apps are independent;
do not merge their roots or roll back both merely because one UI changed.

| Checkpoint branch | Source commit | Main Production deployment | State |
| --- | --- | --- | --- |
| checkpoint/2026-11-09-01-feather-maps | 6f123b0dcd7d6e4a9d0718a5aff4a798c4d254a5 | dpl_9bzZ17LFvxTSR8Dr5c2gYPPAfPYV | Prior feather presentation, verified |
| checkpoint/2026-11-09-02-region-preview | 15c19f159cd600a7a6aa7885b00e7e1b5ea4bcad | dpl_DeyZmLZ4GRG4KoC7EaDVoFiS15Ze | First-tap preview published; mouse first/second guide flow verified live; SVG Enter follow-up included with boundaries |

Australia's unchanged recovery baseline: source d693512 and Production
`dpl_9hrh2H4xuQumccS1qiPupqZuozV7`; current documentation head c182101.
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
