# AVES editing and source map

One Next.js application serves World, Colombia, Australia, New Zealand and the shared account. The current release and rollback belong in CONTINUE-HERE.md. An old route redirect is a compatibility boundary for existing visitors and callbacks, not a second implementation. Do not remove working redirects merely because their paths are old.

## Public navigation

The visitor hierarchy is World → Country → Region → useful tools. `/site-map` and `/sitemap.xml` reuse the public inventories. Section anchors appear in the human tree, never as extra XML pages. Account, admin, auth and APIs stay outside the public discovery inventory.

| Edit | Source |
| --- | --- |
| Country names and overview URLs | `content/destinations.ts` |
| Regions, islands and their existing guide URLs | `content/destination-regions.ts` |
| Global/Colombia/NZ public pages, section links and explicit country ownership | `lib/public-pages.ts` |
| Australian public pages | `features/australia/lib/public-pages.ts` |
| Combine inventories and prefix Australian paths once | `lib/public-navigation.ts` |
| Build the human hierarchy | `lib/destination-site-tree.ts` |
| Render native expandable branches | `components/destination-site-tree.tsx` |

Group ownership is explicit metadata. Renaming an editorial group cannot move its pages into Colombia accidentally. The South Island branch links directly to its map, itinerary planner, landscapes, resources and responsible travel guidance. Unpublished island guides retain working overview anchors.

## UI and data boundaries

| Responsibility | Source |
| --- | --- |
| Shared country/region explorer | `components/destination-explorer-page.tsx`, `components/homepage-destination-explorer.tsx` |
| South Island input state, alternatives and explicit handoff | `components/south-island-trip-planner.tsx` |
| Itinerary layer on the regional explorer | `components/trip-planner/trip-route-overlay.tsx`, `trip-map-context.tsx` |
| One editable day | `components/trip-planner/trip-day-card.tsx` |
| Entered allowance totals | `components/trip-planner/trip-allowance-summary.tsx` |
| Reference finder, filters and public place basket | `components/trip-planner/trip-catalogue.tsx` |
| Shared planner controls and source links | `components/trip-planner/presentation.tsx` |
| Route generation, validation, dates, budget arithmetic and session draft format | `lib/south-island-trip-planner.ts` |
| Product price units and partial comparisons | `content/south-island-price-references.json`, `lib/south-island-price-references.ts`, `components/trip-planner/trip-price-*` |
| Published road references and lookup | `content/south-island-road-references.json`, `lib/south-island-road-references.ts` |
| Sourced places, access limits and scoped operator claims | `content/south-island-trip-catalogue.json` |
| NZ species names, stable IDs and checklist provenance | `content/new-zealand-checklist.ts`, `content/new-zealand-checklist.json` |
| Shared private editor | `components/account/trip-plan-editor.tsx` |
| Authenticated handlers and ownership checks | `app/api/`, `lib/account-*`, `lib/supabase/` |

Country-specific presentation belongs in its feature folder. Shared checklist/media/account logic belongs at the root. Do not copy shared modules into a country folder. The planner remains one client boundary with small directly imported children. No new dependency, analytics call, public preference URL or database schema is needed for this structure.

## Scientific and environmental editing

Use primary sources for taxonomy, distribution, conservation status, habitats and access. Keep the publisher, source URL, scope and review date with the record. A checklist entry is not proof of occurrence in a selected region. A park-level source is not a sighting or nest location. Managed populations, sanctuary encounters and wild opportunities remain distinct. Keep unknown or unmatched wishes visible.

Never convert opportunity coverage into sighting probability. Do not silently equate national threat status with global IUCN status. Review taxonomic changes against the stated checklist edition and preserve ID/media mappings deliberately. Photographs and audio require species identification, rights and attribution. Automated structural checks support editorial review; they cannot certify every biological statement.

Environmental evidence remains separate from certification: organic ingredients do not certify a menu, an operator's published environmental practice does not certify a property, and a company's B Corp status does not automatically cover every listed entity. The B Lab ESC reference supports measured impacts, biodiversity risk review and transparent supplier evidence: https://usca.bcorporation.net/putting-stewardship-to-work-tracking-esc-standards/ . No invented environmental score or compliance claim.

The 11 November source spot check reconfirmed DOC's Devils Punchbowl guidance: 400+ steps, Wardens Creek flood risk, named forest birds and kea. This does not certify all 48 catalogue references or all country content anew. Prices, routes and sightings retain their existing limits. The original Eco-Tourism Business Plan was not available for a financial review.

## Maintenance checks

Run `corepack pnpm check:architecture`, `typecheck`, `test`, then `build`. The read-only source audit starts at native Next entry points and resolves local imports with the project's TypeScript settings, including runtime `.mjs` pairs. It reports unreachable application modules and never deletes anything. Computed runtime imports need explicit review. Content/provenance JSON, SQL, tests, media and historical release evidence are not garbage just because a runtime import graph cannot reach them.

TypeScript rejects unused variables, parameters and imports. Comments explain module responsibilities and non-obvious constraints; obvious JSX does not need a comment on each line. Delete an unused implementation and its obsolete tests together. Keep tests for the active journey and useful domain behavior. Do not remove live source/licence records or private data during code cleanup.

Historical documentation remains evidence. Use this guide, README and CONTINUE-HERE for current structure. Keep deployment identifiers out of reusable UI/content modules. Test the actual hosted candidate before assigning both production domains.

## Planned two-island extension

This is a target boundary, not implemented functionality. The active sequence is NZ-01 onward in AGILE-PLAN.md. Extract an explicit island configuration for data, gateways, references and labels, reusing the existing planner children and private editor. Carry island identity through validation, draft storage, copied notes and account intent; preserve legacy South Island drafts and stable IDs. Do not add a second copied planner, infer North Island opportunities from the national checklist or build a general plugin framework. Add the North Island public route and inventories together only when its researched pilot is usable. The existing newZealandRegionHref fallback remains correct until then.

NZ-01a implemented boundary: content/new-zealand-planning-context.ts owns South Island labels, gateways, catalogue, road/price data and private account URL. Existing South Island adapters consume it. New envelopes carry islandId; untagged historical envelopes remain South Island. Explicit foreign island envelopes/inputs are rejected without deleting their stored value. Route generation and the account importer still use the South Island adapter; per-island slots and generalized generation remain NZ-01b. Only South Island resolves through planningContext; no North Island runtime claim.

## One-map requirement

All regional pages must have one map surface, with supported information as selectable overlays. Fullscreen is the expanded form of that map, preserving state. MAP-01 removes TripBaseMap. The South Island explorer now renders the schematic itinerary overlay through shared page-local TripMapProvider state. Planner input changes focus a broad base; the selected map base CTA updates planner input without reloading. Colombia/Australia use shared regional explorer shells. Audit shared renderer mounts and fullscreen lifecycle, not merely SVG element counts (icons are not maps). Google Maps directions/business search should begin as outbound Maps URLs. An embedded Google provider is separate future work with its own data/licence and billing constraints; never treat Google Places results as an unrestricted layer on another provider. See AGILE-PLAN.md for sequence and acceptance.

MAP-02 uses components/google-maps-actions.tsx and lib/google-maps-links.ts. Public map details and planner source disclosures link to Google search/directions with public place names and broad localities. These are search queries, not verified Google Place IDs, live inventory or exact entrances. No SDK, Google tiles, Places content copies, private origin or automatic network requests. Existing independent source and certification records remain authoritative for their specific claims.

## Satellite source pipeline and remaining coverage

World satellite: components/world-satellite-layer.tsx owns conditional display/fallback/credit, composed by world-destination-map.tsx inside its existing SVG and WorldMapScene. The Equal Earth raster is produced offline by scripts/project-world-satellite.py from NASA GIBS geographic imagery. content/world-satellite-source.json records hashes and scope. The default world view does not load the asset. This is not a replacement for country-specific satellite projections. MAP-LAYER-COVERAGE.md tracks every active renderer family, legacy entry points and static cues before the map request can be closed.

Country satellite: country-satellite-layer.tsx is shared by the main regional renderer and older Colombia/Australia hero explorers. Australia and NZ use recovered source-verified fits; ColombiaSatelliteReplacement switches editorial artwork to geographic country context while retaining the external region selector. One map remains active. Geography/raster generators and verify-country-map-fits.py are offline tools. The country source JSON records parameters, dates, limits and hashes. No new app dependency, Google tiles or runtime imagery API. Protected-area parity remains MAP-04; satellite support does not imply all other layers exist.

## Continuous geographic satellite maps

`MapBackgroundProvider` in the root layout owns only the public background choice, retained in tab session storage. `useMapLayers` combines it with page-local overlay choices. `MapViewer` loads `GeographicSatelliteMap` only when satellite is selected; the geographic engine owns its camera instead of the SVG/CSS zoom controls. `content/geographic-map-focus.json` supplies all camera extents. The South Island adapter retains its native layer/detail controls and places reviewed LCDB/DOC geometry, public points and route sequence on that same satellite surface. Globe/elevation support is future work; no WebGL SDK is shipped. See CONTINUOUS-SATELLITE-2026-11-11.md.
