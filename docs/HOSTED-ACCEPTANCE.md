# AVES hosted acceptance

Updated 10 November 2026. C3 remains partial, not a production release gate pass.

The owner explicitly allowed necessary synthetic test accounts/records in the
live backend and confirmed the dedicated test email. This supersedes the prior
blanket fixture restriction, while retaining no-new-spend, privacy, no schema/
provider change, and explicit production-release/retirement gates.

## Verified

1. Live database: ten check groups inside a rolled-back transaction. Three
   transient synthetic Auth rows, owned plans, strict budgets, consent/revocation,
   ownership RLS, service-only grants and immutable quote snapshots. No fixtures
   committed, schema altered, owner grant added or email sent by this SQL check.
2. Actual live service: one owner-inbox-alias account received the AVES confirmation
   email, was confirmed by the owner and signed in. Three destination drafts were
   created/reopened, NZ budgets/wishes retained, retries deduplicated, stale edits
   rejected, anonymous/non-owner access denied, and drafts deleted through their
   owned API. Fixture sessions were revoked and its Auth row removed only after
   checking it had no plans, quotes, admin grant or subscription. Zero fixtures
   remain. The existing live API uses /australia/api; this is not proof that the
   unified root API or unified hosted browser flow has passed.
3. Maintained source consent and private-draft function bodies match hosted
   definitions. Budget validation matches after CRLF/outer-whitespace normalization.
   The last three deployed migration timestamps differ from source filenames;
   see the mapping in the checkpoint. Do not replay them or alter migration history.

## Remaining gate

The read-only unified preview intentionally cannot perform account writes. The
exact unified candidate needs protected production-mode staging without moving
live aliases, then authenticated browser, Google/email callbacks, recovery,
owner/manual-proposal receipt delivery and deployed-session handover checks.

The Vercel connector has no explicit skip-domain staging control. The dashboard
Deployment Actions menu was inspected; automatic approval review rejected the
Redeploy click because it may immediately start a build. It was not retried.
Approval is required before retrying that action; inspect its exact environment
and alias controls before any production-mode deployment. No live alias, domain,
provider configuration or production code was changed.

[Current evidence and limits](CHECKPOINT-2026-11-10-UNIFIED-C1D-C2.md).
[Controlled C3 scope and remaining gate](C3-CONTROLLED-HOSTED-ACCEPTANCE-PROPOSAL.md).
The older paid-branch proposal was declined. No branch/resource was created or
retried. Historical preflight remains in evidence/aves-unified-hosted-preflight.json.
Keep PR #3 in draft. C3 success would still not approve C4 cutover or C5 retirement.
