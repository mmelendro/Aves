# Private trip preparation and journal foundation

Roadmap23–28. One private workspace per saved trip, separate from planning details and immutable quote snapshots. Open Checklist and Journal on a saved trip. Both draft and submitted-plan owners can maintain their own preparations without changing the submitted record. Sharing a brief does not share the workspace.

The shared account frame now contains preparation titles/categories, completion, optional due dates, owner notes, HTTPS references and independently labelled arrangement states. A completed preparation is not booking evidence. References open in another tab with no referrer; the server never fetches them. Journal entries have editable title/body, optional date/day and a public place/region association in the trip’s country. These are owner labels, not confirmed sightings or visits. Removed entries and tasks remain recoverable.

## Persistence and access

The new trip_workspaces table uses the existing visitor-scoped Supabase client, verified nonanonymous/confirmed Auth, parent ownership checks and owner-only RLS. No service-key shortcut, administrator read grant or public sharing path is added. Insert/update column grants prevent identity reassignment. Revision comparisons reject stale saves. Exact matching next-revision data can confirm a retry after a lost response. GET never inserts an empty replacement. HTTP responses are private/no-store and writes require the existing same-origin, streamed bounded-JSON checks.

Version1 content accepts at most50 preparations and50 entries including removed records, with a24KB application limit and32KB database limit. Dates, public place membership, IDs, HTTPS links, duplicate IDs and field lengths are validated. Raw JSON is not markup. Save is explicit; a successful stored receipt confirms persistence. Failed saves keep unsaved content. New item titles must be added before saving the workspace. Leaving a dirty page invokes the browser’s existing unsaved-change prompt.

## Verification

The rollback-only database test creates reserved synthetic identities and records, then verifies owner read/update, cross-owner and anonymous rejection, revision/identity/shape guards, conflicting writes and recoverable removal/restoration. Local model/API/UI tests cover invalid input, foreign-origin writes, incorrect public place associations, exact retry receipts and save-failure retention. Hosted acceptance and exact runtime are recorded in HANDOFF-CURRENT after publication.

No actual traveller record is imported, shared or modified by the development checks. Physical Safari and independent visitor acceptance remain pending. Media uploads follow as the next bounded release. Existing private-schema advisor info and the pre-existing leaked-password-protection warning remain unchanged; this release introduces no new advisor finding.

The migration was created with CLI2.81.3, then its filename was reconciled to hosted migration version20261112074154 after application. No historical migration was rerun.
