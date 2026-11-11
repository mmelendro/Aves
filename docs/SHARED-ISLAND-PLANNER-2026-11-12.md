# Shared island planner foundation

Status: published runtime c7697c6c7a9342ce5d7a322800082a42ba332a48, deployment dpl_5ntsqf5icEpDeo4poShatMJPP3pX on both canonical aliases. No North Island planner is published by this increment.

One createIslandTripPlanner factory owns validation, routing, dates, wishes, allowance arithmetic, copied notes, draft persistence and confirmed consumption. It accepts an explicit IslandPlanningContext with its own catalogue, gateways, default base, map anchor, road/price references, labels, account URL and storage key. Road and price arithmetic are shared factories. The South Island compatibility adapter retains existing exports and the original session key. Superseded standalone road/price wrappers were removed after all active consumers moved to their explicit engine.

One IslandTripPlanner view supplies the shared form and directly imported child components through a required context. Each catalogue, day editor, reference comparison and source lookup uses that same island engine. Switching the engine identity remounts the form deliberately rather than leaking a prior island's state. Existing South Island map adapters still own their geometry; the generic engine does not invent inter-island roads.

Newly generated drafts carry explicit island identity. Untagged historical envelopes/inputs are accepted only by the South Island configuration. Per-island slots are separate. Invalid foreign envelopes are rejected without deleting pending work. Confirmed account saving consumes only an exact itinerary block already present in the saved receipt. Existing notes are appended to explicitly, never silently replaced. The shared account editor displays labelled pending drafts, respects an explicit island intent, and adds only the chosen island's region on import. It changes no database contract, ownership rule, saved record or submission flow.

The registry contains only the operational South Island planner. A disjoint test fixture exercises the same engine without making an unpublished island available. Tests cover separate catalogues, gateway rejection, reference isolation, copied labels, pending draft slots, exact consumption, foreign preservation, legacy handling and expiry. Existing South Island behavioral and account API tests remain.

Hosted acceptance verified the delivered South Island generation/edit/allowance/catalogue controls and handoff presentation on the exact source. A new private save is not required to validate a refactor that preserves the API, but live provider save behavior is not newly certified by local tests. North Island content, route/map directory and pilot acceptance remain the next increment.

Validation: 590 tests, strict TypeScript, 364 reachable modules with none unreachable, local and hosted 75-page builds. Browser details and rollback are in HANDOFF-CURRENT.md.
