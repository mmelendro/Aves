# AVES current handoff

Runtime: c4cdf8a7d8206f96e94db8ca0b35cecc312bf693. Deployment: dpl_35he3Ds2giC92xDWwx5yoqEGrj2P, READY on combined project prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv. Both aves.bio and www.aves.bio verified. Rollback: a47ac96b3c18fd04993d4569edc7c58edc7dc009 / dpl_7KVkvDizXKegXh3RBpDmFzqCoZYe. Branch: feature/field-guide-card.

## Continuous satellite acceptance

The owner clarified the goal as a Google Earth experience for birders. Published a shared geographic tile map, replacing static world/country satellite renderers. Satellite persists across world, country and region choices, client routes and tab reloads. Uses lazy-loaded Leaflet 1.9.4 and the EOX CC BY 4.0 2016 tile endpoint, zooms capped at 14. Historical landscape imagery, not live conditions, species evidence or a current habitat survey. The 3D candidate failed initialization in the acceptance browser and was replaced before publication. No 3D globe, elevation or high-resolution aerial coverage is claimed.

Colombia's planning-region choices now focus actual geographic camera extents. These broad editorial focus boxes are not ecological/admin boundaries. Country/state/island selectors retain bird collections and named controls. South Island retains its existing LCDB/DOC geometry, public points, B Corp pilot and schematic itinerary with the original geographic extent. No new protected areas or species coordinates were invented. The broader layer-parity request remains open.

Acceptance: 563 automated tests, strict TypeScript, source audit (351 modules, zero unreachable) and the local 75-page build passed for the Leaflet base. The final camera timing fix passed strict TypeScript, the exact-SHA hosted 75-page build and the focused browser regression below. Hosted browser verified satellite on Colombia regional zoom, Australia/NSW, world and North Island, shared preference on Colombia/Australia tours entry points, one active map, South Island nine park previews and selected Arthur's Pass focus, loaded transparent park overlay and forest shading. The public base-order route overlay was ported; a fresh saved-itinerary round trip was not run in this increment. No private records were changed.

Final timing regression: selecting Sierra Nevada de Santa Marta immediately while expanding the map must retain its 20 km regional scale rather than stop at the country overview. Scope camera moves now finish without animation; native zoom/drag/pinch remain. This passed on the exact final candidate and canonical site, including close/reopen of the expanded map. Live proof: /workspace/shared/aves-continuous-satellite-colombia.png. Snapshot shows 21 loaded tiles, one map and the correct selected region. Browser zoom measured 340 CSS px viewport / 337 px document on the older Australian entry, with a 281 px map and no horizontal overflow. Physical touch/Safari remain unverified.

Both custom aliases resolve to the exact final deployment. Error/fatal runtime scan for this deployment, 10:21:05–10:31:05 UTC on 11 November 2026, returned no matching logs. Scope is that window only. No paid account, subscription, API key, database/schema, access policy, mail or booking change was introduced. The public tile service has no availability guarantee. See CONTINUOUS-SATELLITE-2026-11-11.md for primary source terms and limitations.

Next: MAP-04 source-backed protected areas outside South Island, then MAP-05 shared layer controls/coverage. Expand geographic bird/site evidence separately, without exposing sensitive nest locations or treating a map marker as a species range. Preserve the North/South shared-planner work queued behind this request.

## Editing and privacy boundaries

ARCHITECTURE.md is the code/source map, AGILE-PLAN.md is the active backlog and CONTINUE-HERE.md specifies the next increment. One Next.js application owns public countries and shared accounts. Preserve stable bird/place IDs, old drafts, existing private records, ownership checks and immutable submissions. Earlier real synthetic draft save/reopen and cancelled enquiry review evidence is in REGIONAL-ITINERARY-PLANNER-2026-11-11.md. No private write was needed for these imagery releases. Do not print private identifiers or customer contents in public evidence.

Earlier source cleanup, route references, price comparisons and single-map acceptance remain in dated reports, HOSTED-ACCEPTANCE.md's referenced evidence and Git history. Avoid copying every historical validation log into the execution prompt. The original Eco-Tourism Business Plan remains unavailable in this checkout; do not invent financial assumptions. Distinguish company certification, operator statements, mapped land status and visitor access.

## Old project retirement

Do not delete either older project yet. Project-domain registration for aves.bio/www remains on prj_ZKEHgaFrywRyoEo9IfSFcln9k8pv in the last inspected state; normal add returned domain_already_in_use. Its autoAssignCustomDomains was disabled to prevent old builds reclaiming domains. Complete a real project-domain move, verify HTTPS/aliases/account/callbacks, and obtain Vercel's required project-deletion confirmation. The connector exposes deletion links, not deletion or project-domain moves. This remains a capability limit, not missing user authorization.

Also review older project prj_0cUcHh3lkewUHSqiObAzhux88Dpn, named aves, separately. Preserve unrelated databases, records, domain registrations and recovery history. This source cleanup did not alter these resources.
