# AVES site architecture

Use [the current handoff](HANDOFF-CURRENT.md) for the deployed SHA and release evidence.

## Current application and visitor tree

This checkout serves the global site, Colombia, Australia, New Zealand and shared private accounts in one Next.js application. The separate australia/preview Git branch is preserved independently. Do not change that branch as part of main-site cleanup.

The visitor journey is world map → country → region/place → private trip workspace. National bird inventories belong under their countries. Search and display are shared tools. The workspace links Overview, Route where supported, Checklist, Journal, Album, practical records and Offline pack. Country catalogue identities remain separate pending evidenced taxonomy reconciliation.

## Canonical routes and compatibility

Public route metadata comes from lib/public-pages.ts and lib/public-navigation.ts. lib/destination-site-tree.ts builds the released directory at /site-map and /australia/site-map. The directory is already live, not a design preview. Reuse those registries rather than maintaining a second navigation inventory.

Existing /regions URLs for Colombia, /australia regional URLs and /new-zealand island URLs remain valid. Old shopping/auth/dashboard/account routes are compatibility adapters, not independent cart or customer systems. Middleware and next.config.mjs retain legacy callbacks, APIs and session paths. Asset aliases retain exact old public URLs while serving a byte-identical canonical file.

## Private records and editing

Pages and APIs authorize independently. Visual shells never authorize. Preserve owner/trip/destination checks, strict receipt validation, optimistic revisions and replay handling. Historical identifiers remain readable for backup; writes require supported current catalogue references. A private trip save is separate from an enquiry, a supplier booking and an observation verification.

Guest recovery is tab-local and expires after one day. It is separate from account persistence and explicit handoff. In-page workspace navigation leaves editors mounted so it cannot discard their unsaved content. Navigation outside the workspace uses the shared dirty-editor guard.

## Media, maps and performance

Country gallery metadata and geometry are deferred. Responsive photo derivatives retain creators, licences, modification records and original assets. Audio/video begins only on explicit interaction. Existing media handoff is bounded, same-origin and paused on restoration; it does not imply uninterrupted playback across a document navigation. See the dated media release records for implementation detail.

Production JavaScript budgets remain in content/performance-budgets.json. Decoded HTML and compressed transfer are separate measurements. The public HTTP audit can enforce HTML budgets without treating byte counts as observed visitor speed. Credits keep audio anchors stable while paginating the long checklist-image directory.

## Review tools and cleanup

/design/landscapes is an unlisted public, noindex design-review gallery, not a private administrative page or a live artwork inventory. Its shared artwork helpers are used elsewhere. It provides an explicit return link.

scripts/audit-source.mjs checks import reachability. scripts/audit-cleanup.mjs inventories route purpose, export/dependency candidates and duplicate assets. Neither tool proves all reachable code is necessary or authorizes automatic deletion. Generated paths, provenance, tests, framework entry points and compatibility consumers need review. The latest reviewed inventory is docs/audit/CLEANUP-INVENTORY-56-76.json.

The prior architecture text is retained in [the dated archive](archive/2026-11-13-before-design-polish/SITE-ARCHITECTURE.md). It describes the historical two-root deployment and earlier tree proposal, not current production boundaries.
