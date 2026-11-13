# Continue AVES development

The only active numbered backlog is [the consolidated queue](docs/AUDIT-QUEUE-2026-11-13.md), with [machine readable state](docs/audit/queue-2026-11-13.json). The earlier 100 item roadmap is archived with its history and crosswalk preserved.

The final list was posted in chat before source edits. The independent group, 0 to 19, is completed, tested, synced to GitHub and published. Items 20 to 35 require actual figures, decisions, source files, permissions, authorised test access or real participation. Do not treat the archive's prior numbering as the active queue.

Runtime `bfe1192176813c4e273c1636d5fabc22807161e0`, production deployment `dpl_FkVGxkbsQay9K36rDz9ZX1ei4Qbr`, on both aves.bio and www.aves.bio. [CI 43359012336](https://github.com/mmelendro/Aves/actions/runs/43359012336): 751 unit tests and 109 browser checks pass, with 101 intentional skips. Nine focused checks also pass, with three intentional skips. TypeScript, production build, catalogue deferral, geometry and performance budgets pass. Lint has zero errors and 32 existing warnings. There are 451 source modules with none unreachable. Live HTTP checks cover 81 public URLs with zero basic errors. Anonymous private endpoints return application JSON 401 with no-store. Synthetic fixture routes are absent from production.

Application rollback is `dpl_2MTiqPsVevLD2PLUhiMA3BPjh7t2`, with the pre-audit baseline `dpl_3Ehyc4qsBCgHcw6LFj7YgpdQpAAn` also retained. Keep the additive fixed-destination database guard during an application rollback. Production data restoration is not application rollback.

The database migration `20261113023204_protect_saved_trip_destination` is deployed. Saved plans retain their country at the UI, API and database. The complete private JSON backup now includes bird album data/revision. Draft deletion remains an explicit user confirmation with upload restrictions. No traveller row was modified for release testing.

Account and planner Spanish controls are published, including a tested multiline translation correction. Remaining commercial, cultural and legal editorial Spanish review is item 21. Original trip material and actual daily travel remain item 25. Range evidence and data rights remain item 26. Actual hosted two-account/restore proof is item 29. Physical Safari and independent visitor acceptance remain 30 and 31. Build estimates and synthetic tests do not prove those outcomes.

The current owner Eco Tourism Business Plan v3 and cash model remain authoritative. Actual cash, pay, costs and capacity stay unknown until supplied. No invitations, public private-journal sharing, actual test-data deletion or production restore are authorised by the audit request.

See [the independent group evidence](docs/audit/INDEPENDENT-0-19-2026-11-13.md). The next owner decision is 20; do not invent figures to close it. The product audit adds independent work starting at 36, so owner actuals do not block those technical scopes.

Existing leaked-password-protection configuration remains visible under item 24. Confirm Supabase Pro eligibility, settings access and any cost decision before enabling it. The private RLS information is recorded in the queue; do not invent a completed security-setting change.

The [product journey audit](docs/audit/PRODUCT-AUDIT-2026-11-13.md) adds open items 36 to 55. Preserve published 0 to 19 and unchanged pending 20 to 35. Repair 36 to 46, then verify/publish under 47. New capabilities 48 to 54 follow; source-dependent eBird preview 55 waits for the originals and rights work. No app change or deployment was made by this audit.
