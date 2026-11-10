# Private NZ planner origin-filter parity

10 November 2026. Source preview based on private-thumbnail PR #11, not a release.

The controlled private picker now uses the same filter helper as the main-app
origin pilot: all origins, native including endemic, endemic, introduced and
unknown. Name, selected-only and origin conditions intersect without changing
chosen IDs. Rare visitor status remains independent, unknown values never default
to native, and images/credits retain their separate non-submit controls. The
private warning that opening images does not save the plan is preserved.

302 tests, strict TypeScript and a complete production build passed. This includes
the retained editor round-trip tests with mocked transport plus the new origin
behavior checks. No hosted guest data was accessed, no account/schema/provider
settings changed, and no signed-in browser save/reopen is claimed. Physical touch,
exact narrow layouts and candidate private-shell acceptance remain pending.

Main counterpart: PR #18. This branch is stacked only on PR #11 and must stay
separate from the global-app stack and Australia map-control branch PR #12.
