# AVES current handoff

Runtime: 72833361432435f794c873f490d3bff44e19a6bc. Deployment: dpl_BRGYgKK45we79VMg8wv9z5Bw1bin, READY on combined project prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv. Both aves.bio and www.aves.bio verified. Rollback: 7d56276d7b719e96b55cd0f7546d3ae2668345e9 / dpl_Hj89cqBWoQ4wZDkHmwWEMhZz3eLg. Branch: feature/field-guide-card.

## Planning-region layer acceptance

Planning regions is an optional, default-on layer on the retained satellite map. It covers the existing 23 selector regions: Colombia 11 authored approximate planning areas, Australia nine generalised states/territories, New Zealand three main island groups. Polygon clicks, Enter and Space use the existing region/bird callbacks. A selected name replaces crowded overview pills while outlines are enabled; names remain on hover/focus and in the dropdown. No second map is created.

Colombia is now a shared-edge editorial partition: eleven adjoining regions cover the reviewed generalised country outline with no area overlaps or gaps. Joint simplification preserves shared vertices; one mesh renders each border once. Camera extents derive from complete polygons. The visible caption still distinguishes approximate AVES planning regions from official boundaries and bird ranges. Australia/NZ source geometry is unchanged. No occurrence, current habitat, certification or visitor access is inferred. See PLANNING-REGIONS-LAYER-2026-11-11.md and the reproducible generator for sources and limits.

Validation: all 568 tests, strict TypeScript, source audit (352 modules, zero unreachable), local 75-page build and exact-SHA hosted build passed. The reviewed offline generator reproduces unchanged output. Colombia payload is 49,155 bytes, including one deduplicated mesh and the reference country outline. Australia/NZ generated files are byte-for-byte unchanged. GIS packages remain offline tooling only.

Candidate browser accepted Cauca Enter, direct Western Andes click and Central Andes Space, with focus returned to the native region picker. Off/on retained Western Andes, the 100 km scale and 694.8125 px map height, with 0/11 region controls. Australia/NSW Enter retained nine features; NZ/North Island Space retained three, each on one map. Canonical live acceptance confirmed eleven Colombian region controls, one shared mesh, regional bird updates and satellite imagery at regional detail. Native browser zoom measured a 340 px viewport/document with a 322.75 px map and no horizontal overflow. Browser zoom restoration briefly requires tile redraw; the final Cauca Valley view is fully drawn. Physical touch/Safari were not tested. Older hero consumers inherit the implementation but were not individually repeated.

Live evidence: /workspace/shared/aves-colombia-joined-regions.png, https://aves.bio/regions/cauca-valley?explore=colombia&region=cauca-valley . Both custom aliases were verified on dpl_BRGYgKK45we79VMg8wv9z5Bw1bin. Deployment-scoped error/fatal scan, 2026-11-11 11:49:28–11:59:28 UTC, returned no matching logs. No private records, provider accounts/keys, paid subscriptions, schema, access settings, mail or bookings changed.

The satellite foundation remains lazy-loaded Leaflet with EOX 2016 historical tiles, native zoom cap 14 and a background choice retained across routes/reloads in a tab. Overlay choices are page-local. Country/region camera moves finish without animation so expansion cannot interrupt them. 3D globe/elevation, current aerial imagery, complete bird ranges and whole-site layer parity remain unclaimed. See CONTINUOUS-SATELLITE-2026-11-11.md for the prior foundation evidence.

Next: step 1 of CONTINUE-HERE.md, the only active numbered pathway: bounded protected-area releases for Colombia, Australia and remaining NZ coverage. Then shared controls, island-aware planning and the North Island pilot. Complete optional-layer/catalogue parity is not a gate to the planner. Keep sensitive nest locations out of public overlays.

## Editing and privacy boundaries

CONTINUE-HERE.md is the only active numbered pathway and resume prompt. ARCHITECTURE.md is the code/source map. AGILE-PLAN.md and NEXT-WEEK-PROMPT.md are compatibility pointers, not separate queues. One Next.js application owns public countries and shared accounts. Preserve stable bird/place IDs, old drafts, existing private records, ownership checks and immutable submissions. Earlier real synthetic draft save/reopen and cancelled enquiry review evidence is in REGIONAL-ITINERARY-PLANNER-2026-11-11.md. No private write was needed for these imagery releases. Do not print private identifiers or customer contents in public evidence.

Earlier source cleanup, route references, price comparisons and single-map acceptance remain in dated reports, HOSTED-ACCEPTANCE.md's referenced evidence and Git history. Avoid copying every historical validation log into the execution prompt. The original Eco-Tourism Business Plan remains unavailable in this checkout; do not invent financial assumptions. Distinguish company certification, operator statements, mapped land status and visitor access.

## Old project retirement

Do not delete either older project yet. Project-domain registration for aves.bio/www remains on prj_ZKEHgaFrywRyoEo9IfSFcln9k8pv in the last inspected state; normal add returned domain_already_in_use. Its autoAssignCustomDomains was disabled to prevent old builds reclaiming domains. Complete a real project-domain move, verify HTTPS/aliases/account/callbacks, and obtain Vercel's required project-deletion confirmation. The connector exposes deletion links, not deletion or project-domain moves. This remains a capability limit, not missing user authorization.

Also review older project prj_0cUcHh3lkewUHSqiObAzhux88Dpn, named aves, separately. Preserve unrelated databases, records, domain registrations and recovery history. This source cleanup did not alter these resources.
