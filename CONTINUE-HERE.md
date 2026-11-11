# Continue AVES development

Read docs/AGILE-PLAN.md for the single active delivery queue, docs/ARCHITECTURE.md for current code boundaries and docs/HANDOFF-CURRENT.md for validation and infrastructure limits. Dated reports supply evidence, not competing task lists.

## Current production checkpoint

Runtime: c4cdf8a7d8206f96e94db8ca0b35cecc312bf693. Deployment: dpl_35he3Ds2giC92xDWwx5yoqEGrj2P, READY on combined project prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv. Both aves.bio and www.aves.bio verified. Rollback: a47ac96b3c18fd04993d4569edc7c58edc7dc009 / dpl_7KVkvDizXKegXh3RBpDmFzqCoZYe. Branch: feature/field-guide-card.

## Goal and next increment

Make North Island and South Island useful through one consistent planning experience: island/area, starting town, duration/dates and departure town, birds, activities, pace, allowances, editable suggestions and explicit private save. Preserve all requested travel categories and distinguish source evidence from certification.

MAP-01/02 implemented: the existing regional explorer owns the South Island itinerary overlay and public place selection; the duplicate planner map is removed. Google directions/search links use public place names without an SDK or Places feed. Supported map data remains region-specific, with broad planning bases rather than fabricated property coordinates.

Next: MAP-04, then MAP-05 in docs/MAP-LAYER-COVERAGE.md. The shared continuous satellite map is now published across the maintained world/country/region families, including older hero explorers. Colombia regional selections focus geographic camera extents; source imagery is the dated EOX 2016 composite. This is 2D tiled navigation; 3D globe/elevation remain future work. Source and verify national park/protected-area datasets and remaining applicable layers before claiming whole-site layer parity. Keep the deterministic scope camera so resize/expansion cannot interrupt regional focus. Do not use unreviewed licences, present OSM classification as an official register, or add empty switches.

After layer parity: NZ-01b in docs/AGILE-PLAN.md. NZ-01a centralized configuration and added explicit island identity while preserving untagged South Island drafts. Parameterize the working route generator, price/road lookup and shared presentation using the context. Add separate island draft slots and an explicit private import selection. Preserve current South Island routes, stable IDs, legacy note markers and drafts. Test both contexts for isolation before adding the North Island pilot; only South Island is operational today. Do not create a copied planner or publish an empty North Island page.

Then deliver NZ-02: a sourced North Island corridor with a dedicated canonical guide and a usable complete itinerary flow. Do not defer this until the South Island is perfect. Continue in bounded tested releases using the shared acceptance/design rules in the backlog.

## Working rules

Preserve existing private records and immutable submissions. No unsolicited enquiry, email, booking, payment, new access, paid API or schema change. Current price references are partial tariffs, not date-specific quotes or availability. Featured bird memberships are local examples, not full island distributions. Original Eco-Tourism Business Plan file remains unavailable; do not invent financial assumptions or commercial terms.

Keep one combined app and the retained production project. Never deploy old standalone roots over it. Follow CONTRIBUTING.md for exact-SHA hosted verification, both-domain publication and rollback. Keep release evidence in HANDOFF-CURRENT.md and update only the completed row/next concrete increment here. Do not repeat historical validation logs or recreate competing queues.
