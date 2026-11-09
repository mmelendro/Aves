# Unified AVES C1d and C2 checkpoint

10 November 2026, Sydney. C1 source refresh is complete. C2 public preview review
passed within the explicit device/media limits below. C3 is partial; C4/C5 are
not approved or executed. No production application code/domain was changed.

## Exact candidate

Runtime: 6c7cb0bba913ed4c1a0315c5fa89f690519d792b. Native harness/source checkpoint: 1e0fbfefd7672ed09961c856b8d4732d37861b70.
Initial C1d source d296165eaafa9fd511011f099503e86f3d63308d; final runtime fixes
email-preference redirects to stay on the current deployment. The later harness
change removes a brittle HTTP-only assertion about Next's streamed page redirect;
component tests and the final hosted browser verify that behaviour instead.

Protected read-only preview: https://aves-australia-eqy20tn17-mmelendro-9273s-projects.vercel.app.
Deployment dpl_4VBHrNqq7XYUCb8Da9bc9oUuHaqn, READY in the existing Australia/backend
project. Vercel protection, preview no-index and write/auth guards remain intact.
Do not promote this preview artifact; production-mode staging remains a gate.

## Result

Optional email-update signup/sign-in/resend intent leads to explicit verified
confirmation, with strict service-only identity and unsubscribe support. Preview
presentation cannot read or save preferences. Root callback URLs and safe nested
return intent are preserved. Owner Open Request and proposal editor reveal/focus
repairs are carried forward, including reduced-motion behaviour. Manual proposals
remain available. Maintained consent and AI schema history is preserved as source;
no AI SDK, generation route, connection check or active AI UI was introduced.

423 automated tests passed, zero failures/skips. All 22 isolated native checks
passed, including real local Auth/HTTP/database consent, ownership, frozen briefs,
budgets and manual proposals. TypeScript, final local preview build and hosted
build passed. The exact preview passed all 82 HTTP checks for 74 public pages,
sitemaps/private responses, plus 16 asset/redirect checks. The 19 formerly dynamic
public routes are now included in hosted HTTP review.

Desktop/keyboard and 340 CSS-pixel browser-zoom reflow passed. The public UI review
began on d296165; public UI files are unchanged in 6c7cb0b, whose preference fix
was retested in the hosted browser. The recorded podcast continued from South
Island into Australia with the kea identity; an Australian bird call took foreground
priority. This sampled continuity does not complete the wider AVES-068 programme.
Exact 320/390px, physical iPhone/Safari, touch, real background/telephone behaviour,
listening quality and sustained YouTube remain unverified. Managed browser policy
blocked DevTools; no device-emulation claim is made. Authenticated owner usability
has handler/focus tests, not a new live owner-browser certification.

## C3 live fixtures and cleanup

The owner authorised necessary live test accounts/records and confirmed the test
email. Ten live SQL check groups used three uncommitted synthetic Auth identities,
owned plans, budgets, consent and a frozen quote; the entire transaction rolled
back. No login credentials, owner grant, schema change or external email was added
by that SQL test. Post-check counts were zero.

One separate real signup used an owner-inbox alias. Gmail confirmed actual arrival
of the AVES confirmation message, and the owner confirmed it. Sign-in succeeded.
Five service check groups verified three-country persistence, wish/budget fidelity,
idempotent retries, stale-edit rejection, anonymous/non-owner denial and owned
API deletion. This ran against the existing two-app live service at the legacy
/australia/api namespace, not the unified read-only candidate. Its three drafts
were deleted, sessions revoked, and its Auth row removed only after scoped checks
found no plans, quotes, admin grant or subscription. Final fixture counts are
zero and temporary credentials were removed. No customer record was read/changed.

## Hosted schema history mapping

| Source migration | Already deployed history | Result |
| --- | --- | --- |
| 20261108192239_private_trip_budget_preferences | 20261108192418_private_trip_budget_preferences | Validator body matches after CRLF/outer-whitespace normalization |
| 20261108225245_account_email_updates | 20261108225441_account_email_updates | Function body matches exactly |
| 20261109001033_private_ai_proposal_drafts | 20261109001934_private_ai_proposal_drafts | Function body matches exactly; no generation/check executed |

Do not replay the different source filenames as new hosted migrations, rename
applied history, or change policies. This release needs no new hosted SQL.

The preview screenshot is kept outside the public repository after automatic
approval review rejected its upload. Text evidence contains no guest data, raw
mail, credentials or temporary share tokens.

## Remaining gate and approval

The exact unified candidate still needs a protected production-mode staging build,
Google/email callback and recovery checks, authenticated private/owner browser
acceptance, actual authorised owner/proposal delivery and deployed-session handover.
The connected deployment API lacks an explicit skip-domain staging control.
Automatic approval review rejected clicking the dashboard Redeploy action because
it may immediately create a build. No retry, promotion, domain/provider change,
new paid resource or production deployment was made. Approval is needed before
retrying the blocked action; live domain assignment must remain excluded.
[C3 scope and remaining gate](C3-CONTROLLED-HOSTED-ACCEPTANCE-PROPOSAL.md).

C4 release still needs explicit approval of the tested production candidate and
alias mapping. C5 follows an agreed observation period and separate retirement
approval. Keep both existing production projects, hostnames and recovery sources.

## Evidence

- [Checks](evidence/2026-11-10-unified-c1d-c2-checks.json)
- [Native checks](evidence/2026-11-10-unified-c1d-native.json)
- [Hosted HTTP matrix](evidence/2026-11-10-unified-c2-http.json)
- [Assets and redirects](evidence/2026-11-10-unified-c2-assets.json)
- [Browser scope and limits](evidence/2026-11-10-unified-c2-browser.json)
- [Live service checks and cleanup](evidence/2026-11-10-unified-c3-live-service.json)
- [Live database checks and cleanup](evidence/2026-11-10-unified-c3-database.json)
- [Live database rollback reproduction](evidence/2026-11-10-c3-live-rollback.sql)
