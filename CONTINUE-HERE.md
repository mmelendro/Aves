# Continue AVES development

Read docs/AGILE-PLAN.md for the single active delivery queue, docs/ARCHITECTURE.md for current code boundaries and docs/HANDOFF-CURRENT.md for validation and infrastructure limits. Dated reports supply evidence, not competing task lists.

## Current production checkpoint

Branch: feature/field-guide-card. Runtime: a0278216ee93537c5afc3ce1e1ee6a904f0af415. Combined Vercel project: prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv. Deployment: dpl_6r8i8AdJJCTaV2gkymugf1stzt4r. Both aves.bio and www.aves.bio verified. Rollback: d16c36f881eef0183faad86566f0d8f0d80f49dc / dpl_Gg1GZRddP2nsBmfcesuvLV31Cgo2. Latest functional evidence: 553 passing tests, TypeScript, local/hosted 75-page builds, source audit 343 modules with zero unreachable modules. Documentation commits do not change this runtime.

## Goal and next increment

Make North Island and South Island useful through one consistent planning experience: island/area, starting town, duration/dates and departure town, birds, activities, pace, allowances, editable suggestions and explicit private save. Preserve all requested travel categories and distinguish source evidence from certification.

Next: NZ-01 in docs/AGILE-PLAN.md. Extract only the island context needed to reuse the working planner: records, gateways, references, labels, storage and private handoff. Preserve the current South Island route, stable IDs and legacy drafts. Add island-aware validation; prevent silent cross-island draft mixing. Test the South Island migration before adding North Island records. Do not create a copied planner or publish an empty North Island page.

Then deliver NZ-02: a sourced North Island corridor with a dedicated canonical guide and a usable complete itinerary flow. Do not defer this until the South Island is perfect. Continue in bounded tested releases using the shared acceptance/design rules in the backlog.

## Working rules

Preserve existing private records and immutable submissions. No unsolicited enquiry, email, booking, payment, new access, paid API or schema change. Current price references are partial tariffs, not date-specific quotes or availability. Featured bird memberships are local examples, not full island distributions. Original Eco-Tourism Business Plan file remains unavailable; do not invent financial assumptions or commercial terms.

Keep one combined app and the retained production project. Never deploy old standalone roots over it. Follow CONTRIBUTING.md for exact-SHA hosted verification, both-domain publication and rollback. Keep release evidence in HANDOFF-CURRENT.md and update only the completed row/next concrete increment here. Do not repeat historical validation logs or recreate competing queues.
