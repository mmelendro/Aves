# Owner-only journal photos and recordings

Roadmap29–32. Saved journal entries accept private photo copies and audio uploads. Photo/recording titles, creator, date, display order and notes use explicit saved revisions. Playback uses native audio controls without autoplay. Photos reuse PhotoZoom; the account header/footer and shared fields/buttons are retained. No public gallery, community publication, email, receipt import or new map is introduced.

## Files and persistence

The browser prepares selected JPEG/PNG/WebP photos as JPEG copies up to2048pixels, using a white canvas and fresh encoding; originals remain unchanged. The prepared copy must fit the3MiB limit. Audio supports MP3/M4A/WAV/Ogg/WebM under3MiB. Unsupported browser photo formats need a JPEG copy. APIs verify supported signatures, declared type, exact byte count and SHA256. A signature check is not a malware scanner or a full media decoder; all content stays owner-only and is served with a fixed media type and nosniff.

The private trip-journal-private bucket enforces its own MIME and size limits. There are20 reserved/ready/deleting uploads per account and250 across the project, at most750MiB of reserved file capacity. These are bounded pilot limits, not a billing-plan change. A private definer trigger counts all owners under one transaction lock; it explicitly checks the signed actor, owned parent and saved active entry before counting. It is in the private schema, has fixed search_path and is not callable by public/anon/authenticated roles. Other handlers use the existing user-scoped client and RLS, never a service key.

Paths contain generated owner/trip/upload UUIDs, not original filenames. Stable retry IDs plus content hashes prevent different bytes from reusing a path. Uploads never overwrite. Interrupted rows stay pending; a retry verifies an already-stored copy before marking ready. Only matching next revisions acknowledge lost receipts. Photo/audio metadata rejects stale edits. Content requests verify ownership and file integrity before returning private/no-store bytes; audio supports bounded single byte ranges. No public or signed share URL is created.

## Removal and recovery

Journal/task removal stays recoverable and keeps its media. Existing entry IDs cannot disappear in a workspace replacement. Upload removal is a separate two-step permanent action. A revision check reserves deleting state before removing bytes, then clears metadata only after storage removal. Retry can finish interrupted removal. A parent trip cannot be deleted while media reservations exist; the API asks the owner to remove uploads first. This prevents orphaned files from escaping quotas. File notes that fail to save stay visible; selected files retain their retry ID until confirmation.

## Verification and limits

Model/API/UI tests cover signature rejection, streamed size limits, stable retry, failed upload retention, authenticated content, integrity checks, metadata revisions, playback controls, range seeking, confirmed removal and browser photo-copy preparation. Rollback-only SQL checks cover RLS, a noncallable quota trigger, active-entry/ready guards, quota atomicity, recoverable entry preservation and restricted parent deletion. Real generated photo/audio fixtures exercise the application APIs and private storage; exact acceptance evidence belongs in HANDOFF-CURRENT after release.

Physical iPhone/Safari, independent visitor feedback and authenticated photo/audio visual playback remain pending. Read-only desktop workspace acceptance passed without changes to saved records. Resumable large uploads, shared exports, account-wide exports and expense/document models are future increments. An application rollback preserves database records/bucket/policies; do not drop them. Use a media-capable release to remove existing files.

Supabase advisors introduce no new finding. Existing private-schema no-policy info is intentional service-only access. The pre-existing leaked-password-protection warning is unchanged: https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection . This release does not change authentication settings.

Created with CLI2.81.3, reconciled to hosted migration version20261112080701. Storage access guidance: https://supabase.com/docs/guides/storage/security/access-control . Stewardship evidence and consent remain separate from certification and public sharing.

Accepted runtime0c230211fb33cbd77fabbf745089664dff019977, deployment dpl_AndCEUYMCzKKbQftaSunXPyKC3fk. Both aliases verified.651 tests, strict types,76-page build and387 reachable modules passed. Local and canonical synthetic photo/audio integration passed, including206 byte-range responses, metadata persistence, hashes, stale/anonymous/format rejection and removal. Two disposable identities await cleanup confirmation; uploaded copies were removed.
