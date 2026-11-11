# AVES continue here

Sprint checkpoint, 10 November 2026. Read docs/AGILE-PLAN.md first for the current
selected sequence and acceptance state. Earlier historical next-task paragraphs
must not reopen delivered work.

Three new source increments are pushed as stacked draft PRs:
- PR #14, feature/photo-zoom-pilot, runtime 769109d: shared South Island bird/place
  photo zoom, native-pixel cap, keyboard/reset and intentional drag/pinch.
- PR #15, feature/invitation-word-parity, runtime c4134b4: reuse the existing
  birds/aves interaction in NZ and all shared Colombian regional invitations.
- PR #16, feature/scroll-responsive-flock, runtime 2422603: subtle reversible
  scroll motion of the existing region-matched flock, reduced-motion safe.

Each runtime passed 163 tests, strict TypeScript and a complete production build.
No production release occurred. PR #14 is based on map-style PR #13; PR #15 is
based on #14 and #16 on #15. Preserve the stacking order and separate Australia.
GitHub trees match the locally tested source despite different commit metadata.
The local worktree is clean; shell push was blocked by a 403, so connected GitHub
saved the reviewed source trees. No changes were lost.

The photo preview built READY automatically: dpl_89TB3WoVRGeGXUqAtg5wbbaqz29j,
source 769109d. Automatic review rejected manual preview creation and then browser
access because project identity and preview scope were not established to the
reviewer. Do not bypass that decision with another browser/deployment route.
Finish authorized exact-candidate desktop/narrow/keyboard/photo/motion review
before release. Physical Safari/touch remains unverified. Existing NZ map preview
4ddab4a passed desktop modal geometry, zoom, reset, Escape and focus return.
Map-style Colombia/Australia acceptance and PR #11 private acceptance remain open.

Next: resolve candidate preview acceptance, review the stacked source, then obtain
explicit production approval. Continuous bird-call listening is the next selected
functional increment after acceptance. Keep the US$1 team on-demand budget and
automatic pausing enabled. It was saved and verified after reload this session;
Pro subscription charges are separate.

Preserve maintained main/Australia deployments, rollback sources, private guest
data, existing artwork/source credits and native links. No provider/database,
paid AI, eBird import or app-consolidation changes. Unified C3/C4/C5 remain behind
their separate gates. Read docs/HANDOFF-CURRENT.md for retained live baselines and
docs/PREVIEW-2026-11-10-PHOTO-ZOOM.md for scoped evidence and limitations.
