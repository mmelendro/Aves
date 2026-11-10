# Unified explorer · 11 November 2026

Status: LIVE. Main runtime `2c0deea666e7350e6b2e51fc08b65916c36881f4`, tree `08a2c46076940f2a0b06a1bfbb2d0cf5e9d7d225`, production `dpl_9i3f5PKdu6DCWUxeASvJysX64sHE`, READY with `aves.bio` and `www.aves.bio` aliases. Maintained branch: `webmaster/readiness-2026-11-05`. Preview acceptance used `51bcf5d1a5de4bb2f2807ffa037346002ea00173` and `02ecfae4d4832522c4fc371cb9684c57a49c1d75`; final production additionally preserves contact routing and fixes map containment.

## Scope

The South Island and New Zealand pages use the same explorer as the global homepage. A single map slot changes between South Island land-cover/layers, New Zealand islands, other featured countries/regions and world geography. Region selection updates birds, habitat context, place descriptions and planning links in place. Repeating a region selection keeps the explorer rather than navigating away. Editorial content only appears for its matching starting destination/region.

South Island keeps the existing LCDB habitat geometry, DOC national parks and conservation boundaries, historical NASA satellite background, curated nature/heritage/conservation/town/business points, public landscape references and region soundscape. Layer choices and habitat/place state are owned above changing map views. No new providers, paid map service or invented coverage. One rendered `data-aves-map` per view is required; the landscape carousel never creates a map.

The full published New Zealand living-bird checklist remains available beyond photographs, including endemics. It remains a country checklist, not a claim every entry occurs in the selected island. The existing validated one-day tab basket and explicit private draft/share flow remain. Wider Australian/New Zealand range audit and complete endemic coverage for other countries remain queued and must not be claimed finished.

Natural geographic articles apply to headings and Explore links, such as Birding in the Caribbean, Birding in the Eastern Andes and Explore the South Island. Map labels remain short geographic names.

## Validation

187 tests pass on an isolated source snapshot without the pending form/glass changes. Strict TypeScript and a full local build pass. Interaction tests cover all 23 planning regions, one map per view, South Island to country to world and back, repeating selection without navigation, contextual photo/planning changes, and canonical guide links. Browser acceptance covered South Island and New Zealand entry pages, one map per view, habitat changes, combining national parks/DOC/public nature/business layers, historical satellite choice, full-screen and restore, in-place neighbouring-island selection, country/world transitions and retained layer choices on return. Live checks repeated the one-map count, full-screen/restore and world/country/region retention. A visual containment issue found after the first release was fixed in the final runtime. At desktop size the map bottom was 1208px and the following planning card started at 1321px, with no overlap. Phone-specific acceptance remains pending.

Evidence: [Live unified explorer](evidence/2026-11-11-unified-explorer-live.png). No real inquiry or account write was submitted.

The existing US$1 safeguard has not been changed. No billing/auth/database/dependency changes, real inquiry submission, mail send, booking or payment are part of this increment.

## Remaining work

Continue the unified experience through other country/regional entry pages, durable public navigation state, keyboard/mobile/physical zoom transitions, and sourced layer coverage outside the existing South Island pilot. Keep unavailable coverage honest. Finish the paused contact/glass/default-map refinements and all photographed birds/endemic checklist audits in the master queue.

## Preserved work in progress

The guided public form/glass work is saved separately on GitHub, not production:

- `wip/unified-contact-glass-main`: `3679648b7723d35d9d9c4192e74f904a666bc4ab`.
- `wip/unified-contact-glass-au`: `919a4e5228c90ff46ee1b529384a34740c9792d2`.

Keep the new map runtime when later bringing that work forward; do not replace maintained branches with old trees. Australian entry-page convergence and its wording refinements are not part of this main-app production release.

Production error/fatal log scan: no matching logs for 2026-11-10 14:56–15:11 UTC, scoped to the final deployment. This short post-release window is not long-term monitoring.
