# AVES current handoff

Public runtime before this candidate:1ba4c8fd13515ac180698d1c390eaa238d88b93c, deployment dpl_Ac5LFVgP6StKe7fonrenNBoGLwy2. This document accompanies a private travel-records candidate awaiting hosted acceptance. Do not assume candidate source is already public. Branch:feature/field-guide-card. Prior detailed release history is retained in Git at fa360cee and the dated release notes.

## Current ten-fix group

See PRIVATE-TRAVEL-RECORDS-2026-11-12.md for the ten concrete changes implementing bounded roadmap33–36: private expenses, receipt/journal links, exact currency units and totals, booking records, PDF uploads, PDF metadata/download handling, individual authenticated downloads, upload timeout/retry recovery, saved JSON export and recoverable record removal. The ten fixes do not mean ten later roadmap milestones are complete.

Local validation:669 tests, strict TypeScript,78-route production build, source audit393 modules/zero unreachable passed. The database ownership, revision, monetary shape, journal-link and recovery tests passed in a rollback-only transaction. Migration20261112102802_private_travel_records_and_documents is applied once. New records use owner-scoped RLS and revision/identity guards. The existing private media bucket now accepts PDF copies while preserving its existing limits and policies. The advisor result introduced no new finding.

Hosted acceptance and publication are pending for this source candidate. Physical Safari, authenticated narrow layouts, independent visitor feedback and founder/cash/capacity evidence remain independent limits. Test counts do not establish launch readiness.

## Data and rollback

Keep existing workspace JSON, submitted briefs, RLS and traveller records intact. Practical records live separately in trip_records. Do not rerun migrations, drop tables, alter record identities, clear the bucket or remove private records during application rollback. Use a document-capable runtime to manage existing PDF records. An older application may not understand document media, even though the stored records remain protected.

Current pilot bounds:3MiB/file,20 files/account,250/project;50 practical records/trip and24KB validated application JSON. Pending/removing files consume capacity. JSON exports include saved private notes/references and removed records, exclude unsaved edits and file bytes, and retain independent section revisions. They are owner downloads, not public sharing or an import/restore format. No inbox import, external message, booking, payment, sharing or new subscription is part of this release.

## Continue

CONTINUE-HERE.md is the only ranked queue. Complete candidate acceptance and canonical publication, then item37:reconstruct a Colombia route from actual records. Preserve evidence gates9–11 and22. Do not invent visits, receipts, consent, sightings or financial viability. Larger resumable uploads, archive exports, selected imports and selective sharing remain separate future increments.

Read ARCHITECTURE.md and CONTRIBUTING.md before editing. Keep one shared account and map/viewer, stable bird/place IDs, shared UI and old drafts. The earlier Eco-Tourism Business Plan and all personal financial/trip material stay private. B Lab ESC guidance remains an evidence framework; no certification or measured stewardship result is implied.
