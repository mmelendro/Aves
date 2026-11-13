# Album and map repair release

## Candidate

Commit `57d811fec839f01a16e82b8ec058432073c6f005` on `feature/album-experience`.

Compact shared 3:2 bird albums preserve full photographs and add thumbnail navigation. Map controls remain below the map surface, work across backgrounds and support Escape focus return. Narrow-phone carousel arrows are separated from wishlist and expand controls. Scheduler close stacking, enquiry test fixtures and portable media validation are repaired.

Local drafts for the team, inventory, navigation and admin cleanup are excluded. No database migration or live record deletion is included.

## Verification

- [Exact candidate CI](https://github.com/mmelendro/Aves/actions/runs/43457360282): success. Lint, typecheck, 777 unit tests, source/media audits, production build, catalogue loading and payload/HTML budgets passed.
- Priority browser journeys: 33 passed, 9 intentionally skipped viewport combinations.
- Full browser suite: 155 passed, 181 intentionally skipped project combinations. Includes the public-sitemap accessibility scan and the repaired phone-320 NSW controls.
- Local current-workspace production build completed; its build-integrated ESLint had a local plugin resolution error. Separately configured standalone lint passed. Exact-commit CI lint/build passed without that local limitation.
- Local carousel/map and representative accessibility/reflow checks: 33 passed across phone-320, phone-390 and desktop. Phone and desktop NSW screenshots visually reviewed. Local workspace screenshots include unrelated drafts and are not proof those drafts shipped.
- Enquiry submissions use intercepted synthetic responses; no real enquiry or email was sent.

## Deployment

Vercel project `prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv` (`aves-australia`), team `team_Th6ddqWyWKU1mLzTbJPlduDx`.

Production deployment `dpl_2FaQN8WrWeWz7UeGGEn8wcyoXZMC` is READY for the exact candidate. Both `aves.bio` and `www.aves.bio` were assigned and independently confirmed on this deployment.

Live checks passed at 320px and 1365px on home, NSW and South Island: photographs load with contain framing, map layers change, Escape restores focus, and no horizontal overflow occurs. Scheduler opens/closes and sign-in remains outside read-only preview mode. The www homepage returns HTTP 200. Fresh sessions used read-only requests; no real forms were submitted. The initial live smoke script needed to wait for dynamically loaded turn controls before selecting the bird face; the corrected check passed all routes. A deployment-scoped ten-minute error/fatal runtime count returned no rows.

Rollback: `dpl_49nEtSR46vpeufJSdLncJ8r9i8Te`, commit `43943bb2740dfce0fafd43577ffbafec3037ed5a`. Both `aves.bio` and `www.aves.bio` were verified on this prior deployment before release.

Physical-device/Safari testing, real authenticated saves, external email delivery and owner admin-session acceptance remain separate from the automated synthetic checks.
