# AVES current handoff

Runtime: 7d56276d7b719e96b55cd0f7546d3ae2668345e9. Deployment: dpl_Hj89cqBWoQ4wZDkHmwWEMhZz3eLg, READY on combined project prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv. Both aves.bio and www.aves.bio verified. Rollback: c4cdf8a7d8206f96e94db8ca0b35cecc312bf693 / dpl_35he3Ds2giC92xDWwx5yoqEGrj2P. Branch: feature/field-guide-card.

## Planning-region layer acceptance

Planning regions is an optional, default-on layer on the retained satellite map. It covers the existing 23 selector regions: Colombia 11 authored approximate planning areas, Australia nine generalised states/territories, New Zealand three main island groups. Polygon clicks, Enter and Space use the existing region/bird callbacks. A selected name replaces crowded overview pills while outlines are enabled; names remain on hover/focus and in the dropdown. No second map is created.

Colombia masks are AVES editorial geography in longitude/latitude, clipped to the reviewed generalised country outline and camera extents. Dashed outlines and a visible caption distinguish them from official boundaries and bird ranges. Their broad corridor widths are display choices, not ecological buffers. Overlap/gaps are possible. The national tourism guide supports regional descriptions only, not these authored polygons. Australia/NZ reuse reviewed Natural Earth sources. Each Cook Strait island is assigned once, with D'Urville grouped with South Island. No occurrence, current habitat, certification or visitor access is inferred from the areas. See PLANNING-REGIONS-LAYER-2026-11-11.md and the reproducible generator for sources/limits.

Validation: 567 automated tests, strict TypeScript, source audit (352 modules, zero unreachable) and the local 75-page build passed for the layer base. The final two-line scope-note/layout correction passed strict TypeScript and the exact-SHA hosted build. Geometry regression checks also passed after final source metadata generation. Country payloads stay below 100 KB and load only for the enabled active country; GIS dependencies remain offline tooling only.

Hosted browser accepted Colombia polygon mouse selection and Enter with focus returned to the persistent region picker; Australia/NSW polygon selection; North Island Space selection; three New Zealand outlines alongside the existing South Island park overlay. On the final candidate, switching outlines off/on kept one map, the same selected Sierra Nevada region, the exact 694.8125 px map height and the same 20 km distance scale, with 0/11 outline controls respectively. Native browser zoom measured 340 CSS px viewport / 337 px document, a 319 px map and a 44 px planning-layer label target. Physical touch/Safari were not tested. Older hero consumers inherit the same implementation but were not individually repeated in this layer acceptance.

Canonical live proof shows 11 Colombian outlines, the selected Sierra Nevada area, 21 loaded satellite tiles and one map: /workspace/shared/aves-planning-regions-satellite.png. Both custom aliases point to the exact final deployment. Error/fatal scan for that deployment, 11 November 2026 22:04:51–22:14:51 Sydney time, returned no matching logs; this is a scoped window, not a blanket availability claim. No private records, provider accounts/keys, paid subscriptions, schema, access settings, mail or bookings changed.

The satellite foundation remains lazy-loaded Leaflet with EOX 2016 historical tiles, native zoom cap 14 and a background choice retained across routes/reloads in a tab. Overlay choices are page-local. Country/region camera moves finish without animation so expansion cannot interrupt them. 3D globe/elevation, current aerial imagery, complete bird ranges and whole-site layer parity remain unclaimed. See CONTINUOUS-SATELLITE-2026-11-11.md for the prior foundation evidence.

Next: MAP-04 source-verified protected areas outside South Island, then remaining MAP-05 layer controls/coverage. The planning-region toggle completes one shared layer control, not all layer parity. Retain the North/South shared-planner work behind that map request. Keep sensitive nest locations out of public overlays.

## Editing and privacy boundaries

ARCHITECTURE.md is the code/source map, AGILE-PLAN.md is the active backlog and CONTINUE-HERE.md specifies the next increment. One Next.js application owns public countries and shared accounts. Preserve stable bird/place IDs, old drafts, existing private records, ownership checks and immutable submissions. Earlier real synthetic draft save/reopen and cancelled enquiry review evidence is in REGIONAL-ITINERARY-PLANNER-2026-11-11.md. No private write was needed for these imagery releases. Do not print private identifiers or customer contents in public evidence.

Earlier source cleanup, route references, price comparisons and single-map acceptance remain in dated reports, HOSTED-ACCEPTANCE.md's referenced evidence and Git history. Avoid copying every historical validation log into the execution prompt. The original Eco-Tourism Business Plan remains unavailable in this checkout; do not invent financial assumptions. Distinguish company certification, operator statements, mapped land status and visitor access.

## Old project retirement

Do not delete either older project yet. Project-domain registration for aves.bio/www remains on prj_ZKEHgaFrywRyoEo9IfSFcln9k8pv in the last inspected state; normal add returned domain_already_in_use. Its autoAssignCustomDomains was disabled to prevent old builds reclaiming domains. Complete a real project-domain move, verify HTTPS/aliases/account/callbacks, and obtain Vercel's required project-deletion confirmation. The connector exposes deletion links, not deletion or project-domain moves. This remains a capability limit, not missing user authorization.

Also review older project prj_0cUcHh3lkewUHSqiObAzhux88Dpn, named aves, separately. Preserve unrelated databases, records, domain registrations and recovery history. This source cleanup did not alter these resources.
