# Private AI proposal draft checkpoint — 9 November 2026

## Published implementation

Account app branch `australia/preview`, runtime **3ad0f97**, production deployment **dpl_A5sJF1wxVx57bagAjwB3KnWQyZtg** (`aves-australia-gd35gg19y-mmelendro-9273s-projects.vercel.app`). Owner workspace: https://aves.bio/australia/admin/quotes. Source/global/Colombia/NZ app remains separately deployed; do not merge branches.

New Zealand requests have an owner-only AI working-draft panel. The server reads the saved snapshot, allowlists trip preferences and named wishlist birds, excludes contact fields/title/record IDs, and redacts common email/phone/URL tokens from free text. A strictly numeric year title can supply the year without forwarding the title. Free prose is not guaranteed anonymous. Curated primary-source planning facts cover islands, habitat/conservation outings, selected lodging and requested activity geography; this is not live supplier research or availability.

One bounded Gateway model call (`openai/gpt-5.4-mini`, pinned `ai@7.0.165`) requests no-training and zero-data-retention routing, no automatic retry, 90-second model timeout and bounded structured output. Hosted OIDC is intended authentication. No additional persistent AI key, paid plan or billing change was made. Do not claim these model policies or generation are verified end-to-end until a successful hosted request is confirmed.

Unpriced notes persist in `private.quote_ai_drafts`, separate from `public.quote_proposals`. Migration `20261109001033_private_ai_proposal_drafts.sql` applied. Service-only invoker RPC independently checks the active owner; browser roles have neither table access nor RPC execution. RLS enabled with no client policy intentionally. Per-request serialization, generation lease, three-attempt cap and 15-minute start spacing limit repeat calls; completed drafts replay without inference. These are not a team-wide monetary budget. Owner edits use an exact timestamp revision. No client share URL or send action exists for these notes.

Owner can reopen/edit/save and use saved text in the existing proposal editor. Price remains blank; formal review/issue is separate. This implementation has not sent any proposal, notification, booking or payment. It does not solve live availability, validated bird ranges, route optimisation, currency conversion, supplier contracting or marketplace transactions.

## Verification completed

- 287 automated account-app tests passed; final type check passed (removed only a stale generated type file for the deleted synthetic fixture).
- Synthetic Playwright UI at 1280/390/320px and 700px height: generate once, reopen, edit/save three times, copy into proposal with blank price, cancel; zero sends, no browser errors or horizontal overflow.
- Isolated PostgreSQL execution: migration compiles; generation lease, attempt spacing, replay, completion, editable save, stale-write refusal, owner check and anon/authenticated denial pass. Service invoker can read the authorized draft.
- Hosted DB confirms anon/authenticated RPC execution false, service execution true, RLS enabled. Advisor flags intentional private no-policy tables and pre-existing leaked-password protection disabled on the owner-selected free plan; no billing upgrade performed.
- Exact staged build READY; unsigned endpoint 401 and temporary QA page 404 before promotion. Live unsigned endpoint 401, QA fixture 404, both XML sitemaps 200 with private routes excluded. No public inventory/hierarchy change; sitemap routes unchanged.

## Outstanding verification — do not hide this

A real generation for the selected owner request is **not yet confirmed**. Owner sign-in was confirmed, but Windows Computer Use could not click the off-screen generator and then stopped because it could not reliably determine the browser URL. No safety barrier was bypassed. On resumption, request a manual click of Generate private AI draft and verify the saved result/any error; do not claim synthetic tests prove provider access. The earlier local OIDC check returned 401. A broad production environment pull was previously rejected because it would include unrelated secrets; do not retry it or retrieve those secrets indirectly. Use hosted OIDC or appropriately authorized narrow credentials.

Keep all guest answers, request identifiers and generated drafts out of repository docs/logs. UI screenshots/evidence should use synthetic data. Read actual saved request before assuming an island, party or date leg; don't silently replace it with earlier conversational plans.

## Explicit roadmap details retained

- AVES-061: extend the logo landscape contour across the responsive header, without stretching bird/wordmark or hiding navigation; static/reduced-motion support.
- AVES-058: feather-shaped button pilot, recognizable icons, hover/focus labels, contrast and 44px touch targets; regional/3D assets separate later.
- Full stages/acceptance/dependencies and complexity: DEVELOPMENT-STAGES.md. Record every concrete new request with an ID or linked existing item, scope, status and acceptance criteria, including small visual details.

Finish real generation and persistence checks, update this checkpoint and sync both relevant branches, then pause. Do not start queued visual work automatically.


## Resumption — real-call failure confirmed; connection diagnostics published

Owner manually invoked the real generator and reported the generic unavailable message. Hosted DB confirms one attempt, generation lease released, and no generated text persisted. This is a confirmed failure, not an end-to-end success. No issued proposal or notification was produced by this feature.

Diagnostic runtime **d693512**, deployment **dpl_9hrh2H4xuQumccS1qiPupqZuozV7** (`aves-australia-qgncq3xj7-mmelendro-9273s-projects.vercel.app`) is now published. Owner-only Check AI connection calls the Gateway credit/authentication check without model inference or another draft attempt. Raw provider messages, prompts, headers and credentials are never returned; fixed diagnostics distinguish authentication, credit/verification, forbidden, rate limit, invalid request, output validation and timeout when supported by error metadata.

289 automated tests and type check pass, including owner-only diagnostic access and safe error handling. READY candidate diagnostic endpoint denied unsigned access with 401 before promotion. Pending: owner connection-check result, fix the identified account/runtime issue within authorization, then verify one real draft and persistence/edit flow. Do not buy credits, change billing, weaken privacy routing or retrieve broad production secrets without appropriate authorization.

GitHub now contains the implementation and detailed stages/contour/feather requests; keep both branches synced with the final diagnostic checkpoint. The actual draft content remains private and must never be committed.
