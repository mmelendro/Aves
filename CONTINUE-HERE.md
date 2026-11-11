# Continue AVES development

Read docs/AGILE-PLAN.md for the single active delivery queue, docs/ARCHITECTURE.md for current code boundaries and docs/HANDOFF-CURRENT.md for validation and infrastructure limits. Dated reports supply evidence, not competing task lists.

## Current production checkpoint

Branch: feature/field-guide-card. Runtime: 0984fc3cd3df89c8878e0c0a5a98b1ce9cee82f7. Combined Vercel project: prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv. Deployment: dpl_F4c2rMAGB5dKvqym4LwMfRpAgeHb. Both aves.bio and www.aves.bio verified. Rollback: a0278216ee93537c5afc3ce1e1ee6a904f0af415 / dpl_6r8i8AdJJCTaV2gkymugf1stzt4r. Latest functional evidence: 556 passing tests, TypeScript, local/hosted 75-page builds, source audit 344 modules with zero unreachable modules. Documentation commits do not change this runtime.

## Goal and next increment

Make North Island and South Island useful through one consistent planning experience: island/area, starting town, duration/dates and departure town, birds, activities, pace, allowances, editable suggestions and explicit private save. Preserve all requested travel categories and distinguish source evidence from certification.

Next: MAP-01 in docs/AGILE-PLAN.md. Consolidate South Island planning bases and itinerary overlay into the existing explorer, removing the second TripBaseMap without losing route information. Apply the one-map rule at all regional template boundaries, including fullscreen. Then MAP-02 adds external Google Maps directions/business lookup links without an API key or new billing. Both remain unimplemented. Follow the acceptance checklist and verify each regional template.

After MAP-01/02: NZ-01b in docs/AGILE-PLAN.md. NZ-01a centralized configuration and added explicit island identity while preserving untagged South Island drafts. Parameterize the working route generator, price/road lookup and shared presentation using the context. Add separate island draft slots and an explicit private import selection. Preserve current South Island routes, stable IDs, legacy note markers and drafts. Test both contexts for isolation before adding the North Island pilot; only South Island is operational today. Do not create a copied planner or publish an empty North Island page.

Then deliver NZ-02: a sourced North Island corridor with a dedicated canonical guide and a usable complete itinerary flow. Do not defer this until the South Island is perfect. Continue in bounded tested releases using the shared acceptance/design rules in the backlog.

## Working rules

Preserve existing private records and immutable submissions. No unsolicited enquiry, email, booking, payment, new access, paid API or schema change. Current price references are partial tariffs, not date-specific quotes or availability. Featured bird memberships are local examples, not full island distributions. Original Eco-Tourism Business Plan file remains unavailable; do not invent financial assumptions or commercial terms.

Keep one combined app and the retained production project. Never deploy old standalone roots over it. Follow CONTRIBUTING.md for exact-SHA hosted verification, both-domain publication and rollback. Keep release evidence in HANDOFF-CURRENT.md and update only the completed row/next concrete increment here. Do not repeat historical validation logs or recreate competing queues.
