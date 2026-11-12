# Private travel records: published release

Published on aves.bio and www.aves.bio on12 November2026. Ten concrete fixes implement the bounded practical-record scope in roadmap33–36:

1. Private expense records.
2. Receipt links to saved journal entries.
3. Exact money units and separate currency/payment totals.
4. Provider, ticket/reference and arrangement status for bookings.
5. Bounded private PDF uploads.
6. Private document details and download-only PDF handling.
7. Authenticated individual file downloads.
8. Upload timeout recovery retaining the original retry reference.
9. Saved private trip JSON export.
10. Recoverable practical-record removal and restoration.

669 tests, strict TypeScript, production build, database ownership/revision checks, hosted synthetic save/reopen/conflict, PDF download integrity, anonymous denial, owner export and cleanup passed. Both domains verified. No real traveller data was imported or shared. Physical Safari, narrow authenticated layout and independent visitor checks remain pending.

JSON exports include saved private references and removed records, excluding unsaved edits and file bytes. PDFs download without an embedded preview. Format checks do not scan for malware. The current file-size and quota limits remain. Larger resumable uploads, file bundles, inbox imports and sharing remain future work.

Next numbered task:37, reconstruct the Colombia route from actual records. Preserve evidence gates9–11 and22. These ten fixes do not claim completion of ten later roadmap milestones or establish launch readiness.
