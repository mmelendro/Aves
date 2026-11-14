# Current AVES development handoff

> **Paused at the user’s request.** Read [the batch handoff](docs/PAUSED-BATCH-2026-11-14.md) first. Spacing candidate `ded0e2f` is pushed; CI 43577619807 is in progress. Production remains `036fa28`. South Island is an uncommitted draft. Future batches: at most five commits.

Updated 14 November 2026. The active implementation queue is [the incremental roadmap](docs/INCREMENTAL-ROADMAP-2026-11-13.md). Its R identifiers supersede older implementation queues; historical audit IDs remain evidence and retain owner-dependent scopes.

Published application: `036fa286dfd063298cc201894331557438400c12`, production deployment `dpl_6LNCBWt2DXAVBSHRpQHXPVrAz2ME`, https://aves.bio. Exact CI [43568426791](https://github.com/mmelendro/Aves/actions/runs/43568426791) succeeded: 782 unit tests, 33 priority journeys, 179 full browser checks and 211 intentional project skips, plus build/lint/types/audits/budgets/accessibility. Domain assignment and CI success rechecked on 14 November. Detailed live checks are recorded in the camera release record; they were not rerun by the records audit.

Development branch: `feature/album-experience`. The two commits after the live application, `3b2e52f` and `75a09f2`, contain documentation only and are already pushed. Work continues in the isolated `release-sticky-camera` checkout to preserve unrelated drafts in `album-current`.

Authorized sequence: reconcile records; fix enlarged-text sticky header/toolbar spacing; complete South Island habitat-map camera continuity. Develop, test, push and deploy each application increment after exact-commit checks pass; record live acceptance and rollback. Documentation-only changes do not require a runtime deployment.

Main world/country/regional camera continuity, national inventory albums, regional branding, panel resizing and horizontal phone reflow are live. Remaining immediate issues are sticky vertical overlap and the specialist South Island adapter. Preserve LCDB/DOC overlays, habitat/place selection and itinerary behavior.

Unpublished drafts: header search, global navigation, team profiles, creator album, About copy and admin cleanup. Do not sweep these into a release. Admin tooling does not authorize record deletion; invitations and private-journal publication require their separately defined scope.

Immediate rollback: `3c7d1ed6a14057ab5c16295a0118b9a71479e4d6`, deployment `dpl_C4u25RDNJZAw1tywRvyxph64PQS3`. Preserve the www-to-aves.bio path/query redirect.

Historical audit and business requirements remain available in `docs/AUDIT-QUEUE-2026-11-13.md` and its JSON. Their numbered items are not a competing active implementation order. Live two-account isolation, restore drills, physical-device acceptance, independent traveller testing and business facts are not established by public browser CI.
