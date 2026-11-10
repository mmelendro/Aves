# Copyable public place notes

10 November 2026. Adds a fallback to the existing place-ideas pilot; preview only.

Visitors can review a read-only text box of their selected public place labels and
choose Copy Place Notes. The copied lines use the private editor's existing import
format, so pasting/importing the same ideas does not duplicate lines. No names,
contact details, answers or guest plans enter that text. Unknown/duplicate IDs
produce no copy text. Copying does not save a plan or send anything to AVES.

If clipboard access is absent or rejected, the field is focused and selected with
an explicit manual-copy message. Changing selections clears an outdated notice.
Tab basket expiry/storage behavior remains; the fallback also helps when sign-in
or cross-host routing cannot carry the same-tab basket. This does not claim that
automatic private handover is verified or that a new structured place store exists.

177 tests, strict TypeScript, complete production build and whitespace checks pass.
The extra behavior test verifies only reviewed public labels, no unknown/duplicate
copy records, and exact compatibility with duplicate-safe note merging. Actual
candidate clipboard/manual-copy UI review is recorded in the acceptance checkpoint.
No assets/dependencies, providers, accounts, schema, private storage or production
aliases changed.

## Planner gate established this sprint

Main middleware rewrites account pages to the maintained shared app, and the
private-place-notes branch has no deployment under the actual Australia project.
Read-only Vercel metadata confirms the project identity; no deployment was created.
Automatic review rejected opening the preview's private account flow because it
could expose signed-in planner content. Do not retry via another URL, connector,
header, cookie, browser surface or production account. Public-preview approval is
not private-account acceptance or permission to save a synthetic hosted draft.
A safe exact private candidate and scoped account/test-record permission remain
prerequisites for real signed-in save/reopen.
