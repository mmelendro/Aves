# AVES unified draft C1c checkpoint

Updated 10 November 2026, Sydney.

C1c is complete on integration/aves-unified-2026-11-08. Source: `ebccaf22412719813fe4ab10a861feda89931185`. Parent: `4bcbca9a3a2b34359a73558aa8496b36f1982f49`. Budget behaviour/history was carried from maintained Australia `68711fd53bbc4882511e3d2226344828ccda208f`.

## Result

Existing optional NZ private budgets now survive the unified form, strict request validation, shared guest/owner summary, database save/reopen/edit and frozen quote-submission snapshot.

The draft reuses the maintained accommodation, food and activities controls and six currency codes. Blank means undecided; zero remains zero. Whole amounts are bounded from 0 to 10,000 per category. Currency labels entered numbers and does not convert them. Existing budget-free briefs and non-NZ plans remain compatible.

The existing budget-validation migration was copied unchanged as source history. It was applied only to the fresh disposable local fixture. No hosted migration, policy change, customer-record edit, provider setup, email or AI request was performed. Auth/HTTP guards, session handling, ownership rules, immutable submission behaviour, dependencies and hosting configuration remain unchanged.

## Verification

1. All 414 automated tests passed, zero skipped. Added cases cover strict bounds/unknown fields, six currencies, zero versus blank, currency changes without conversion, reopened controls, the private PATCH payload and summary units.
2. All 21 native integration checks passed through the real pinned SDK, local Auth, HTTP handlers, PostgREST and PostgreSQL. Existing no-budget NZ and other-country plans persisted; budget edits for all six currencies survived database round trips and a new session; invalid budget JSON failed database validation; another account could not read/edit the budget; owner review and immutable submitted snapshots retained it.
3. The native fixture applies nine explicitly listed maintained migrations, excluding the historical Colombia replacement baseline and later unselected consent/AI histories. Its local synthetic SMTP and application mail captures never forward messages. Fixture accounts, database, certificates, keys/mail and processes were removed/stopped on completion.
4. The harness no longer requires an untracked Vercel project link. Its exact local-origin request guard remains intact and startup explicitly checks loopback/disposable paths. A source fingerprint records actual tested code even before commit; no ignored environment file or hosted secret is read.
5. TypeScript and the local preview-mode Next 15.5.29 build passed with Node 22.23.4 and the retained pnpm 10.34.5 lockfile. All 55 generated static public pages passed canonical/title/no-index checks; the 74-route registry is unchanged. Nineteen dynamic public routes still need C2 HTTP/browser checks.
6. git diff --check passed and no unresolved merge entries remain.

[Summary checks](evidence/2026-11-10-unified-c1c-checks.json) and [native integration evidence](evidence/2026-11-10-unified-c1c-native.json).

The native report's applicationRevision is the pre-checkpoint base 4bcbca9. applicationWorkingTreeDirty is true because this work was tested before committing. Its applicationSourceFingerprint was independently matched against the staged source before upload. testedSourceCommit records the exact equivalent source tree above; no claim is made that the older base alone contains the changes.

## Boundaries and next increment

Browser/mobile layouts, hosted Google/email callbacks, real inbox delivery, live provider configuration and deployed-session handover remain unverified. Local native success does not resolve C2/C3 or the previously declined hosted test-setup decision. No alternative browser server or preview-guard bypass was introduced.

Next recommendation: C1d, preserve newer verified-account email consent and owner usability while keeping AI generation/connection checks deferred. It is not selected. Keep the PR in draft; production cutover and later project retirement each require explicit approval.

Production main remains d34faab / dpl_3WU7VC5jQjiN5TWBEGBGxVB82gWB, Australia remains 2ff09e9 / dpl_56y3bD1RTE2fngcHBr14obkGu2bx. No rollback is needed. The previous draft is 4bcbca9; recover with a focused follow-up/revert without resetting another chat's newer work.

The Eco-Tourism Business Plan and stewardship gates remain in AGILE-PLAN.md. Budget preferences are not quotations, reservations or guaranteed costs. Keep actual guest financial preferences private.

Model: kept the current selection. Pause after GitHub/status sync.
