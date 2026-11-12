# Private travel records and document copies

This bounded ten-fix release implements the next practical workspace scope in roadmap33–36. It does not complete ten later roadmap milestones or add sharing, automatic imports or bookings.

1. Add explicitly saved owner-only expense records.
2. Associate receipt records with the correct saved journal entry and its files.
3. Keep integer money units, currency-separated totals and estimated/paid/refunded amounts distinct.
4. Add provider, ticket/reference, date and arrangement state to private booking records.
5. Support bounded private PDF copies alongside existing photo/audio formats.
6. Keep PDF titles, creator/date/order/notes private and deliver PDFs as downloads without embedded previews.
7. Offer authenticated downloads for individual photos, recordings and documents.
8. Bound upload confirmation waits and retain the same selected copy/reference after a timeout.
9. Export saved trip, workspace, practical records and attachment metadata as owner-only JSON.
10. Support recoverable removal/restoration of practical records, preserving identities and conflicting edits.

The existing private bucket and quotas remain:3MiB/file,20 files/account and250/project. Incomplete files count towards capacity. Practical records have a separate revisioned document, at most50 records/trip and24KB of validated application JSON. Existing workspace JSON and submitted briefs are unchanged. Each record amount is a total for that record, separate from planner per-person allowances. No exchange conversion, payment verification, environmental certification, live inventory or confirmed booking is inferred.

PDF header/end checks identify a supported copy; they are not a malware scan. PDFs are not rendered in an embedded viewer. Download responses use authenticated ownership checks, private/no-store caching, attachment disposition, nosniff and a sandbox policy. Metadata exports include private references and removed records, exclude unsaved edits and file bytes, and label independently saved section revisions. Individual file downloads are separate. This is an owner export, not a shareable journal edition or restoration/import format.

Validation and publication details belong in HANDOFF-CURRENT.md. Physical Safari, independent visitor feedback and launch economics retain their separate evidence gates. Larger resumable uploads, encrypted/offline exports, archive bundles, inbox imports, selective sharing and community publication remain future work.

The earlier Eco-Tourism Business Plan remains private and requires actual founder/cash/capacity inputs. These features support practical record keeping; they do not establish business viability or stewardship outcomes. B Lab's ESC guidance remains an evidence framework rather than an AVES certification claim: https://usca.bcorporation.net/putting-stewardship-to-work-tracking-esc-standards/ .
