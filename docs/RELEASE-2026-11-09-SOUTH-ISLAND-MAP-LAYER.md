# South Island land-cover map — released 9 November 2026 (Sydney)

**Final wording refinement published:** source011de84 / dpl_BHkhR6U5U1eGgWLFdoUq4gtLk7g4; AU3f644a1 / dpl_FxbDazX29G5cqCnuYP8ZmGDNwy34. Both public/private pickers now use “Search377 species” and “All species”, retaining extinct filtering.9 focused catalogue checks (5source+4AU), both hosted builds and staged/public/private live label checks passed; live390px public layout had no overflow. This is a copy refinement over the map release below; original115 full source tests cover the map implementation, not an additional full AU rerun. No new private submissions. New exact runtime IDs supersede the initial map publication below.

Published, synced; pause before another feature.

## Initial map publication — superseded by the final wording revision above

- Global/Colombia/NZ runtime: source1b97251, branch webmaster/readiness-2026-11-05. Deployment dpl_C9ZcQ12E7m7seFWxVrVNnHdTRwVg; candidate https://v0-company-landing-page-hldf0jsui-mmelendro-9273s-projects.vercel.app promoted to https://aves.bio. Pilot https://aves.bio/new-zealand/south-island.
- Australia/shared-account runtime remains c0a31ec / dpl_CEczrT3zECEYVLwS7WKSa19Fryag. Only mirrored documentation changes there; no AU deployment or branch merge.
- No database, authentication, policy, credential, billing or provider account changes; no guest records read/written for this map release.

## Implemented behavior

Dedicated South Island explorer uses a new controlled map component alongside the existing shared bird carousel. Clickable SVG areas and 44px labelled legend buttons select the same ecosystem state as the native dropdown; keyboard Enter/Space works and All habitats resets. Land layers: native forest/scrub, alpine/tussock vegetation, freshwater. Coast uses the actual Natural Earth coastline, with an explicit statement that offshore habitat extent is not mapped. Selection updates the existing30 locally associated profiles and counts18/5/7/5; stops old audio and closes stale Info while retaining wishlist choices and divider state. The country page's original island-navigation map is retained, with a Back to New Zealand link from the local layer.

## Verified sources and limitations

Manaaki Whenua official WMS https://maps.scinfo.org.nz/lcdb/wms; layer lcdb_lcdb6, summer2023/24, LCDB v6.0. Source description https://lris.scinfo.org.nz/layer/123148-lcdb-v60-land-cover-database-version-60-mainland-new-zealand/. Official GetCapabilities/legend were downloaded and reviewed on9November. The WMS declares CC BY3.0 NZ https://creativecommons.org/licenses/by/3.0/nz/; retained source/licence links and disclosed AVES grouping/recolouring/generalisation. Natural Earth coastline is public domain and matches the pinned SHA256 in the existing NZ map provenance.

The Eagle/ArcGIS mirror was inspected but NOT used for geometry because its web-service terms restrict use in combination with ArcGIS. The official Manaaki Whenua service was used instead. No key, signup, paid provider or new terms acceptance was needed.

Generator scripts/generate-south-island-ecosystems.py produces content/south-island-ecosystem-map.json. Offline dependencies pyproj/shapely are GIS generation tools, not website dependencies. Raw source raster/request and checks remain outside Git under audit/map-data/evidence. Generated metadata includes the exact WMS URL, extent, projection, pixel scale, source hashes, source date, class mapping and method. Natural Earth checksum mismatch or an unexpected WMS raster format fails generation for review.

Both raster and outline share EPSG:3857/Spherical Mercator and square2087m source pixels, with no independent image stretching. Main South Island polygon only; nearby islands omitted. Full official legend palette is compared within conservative RGB distance24 to account for WMS antialiasing; ambiguous pixels remain neutral. Polygon unions are clipped to the coastline and simplified by0.65pixels. This is an approximate land-cover proxy, not exact ecosystem boundaries, species locations, a complete habitat survey or live conditions. Some small/mixed areas are omitted; neutral land can be other cover. Tall tussock also occurs below alpine country. No marine extent, elevation model, city/place pins or actual satellite-photo layer was added.

Class groups: forest50/52/54/58/69; mountains15/43/55; freshwater20/21/45. Coastline is context only. Exotic forest/cultivated grassland are not silently classified as native forest. A Fiordland control point returned indigenous forest69 from official GetFeatureInfo and maps into the forest layer; Canterbury pasture returned40 and stays neutral. An approximate lake coordinate query returned grassland, so it was excluded from acceptance; an attempted independent50m lake lookup did not contain that named lake. No claim that a lake control point passed. Coastline/raster alignment and land-cover classifications are independently tested at the two supported control points.

Generated JSON421333bytes, approximately79341bytes gzip; static data with three land paths and a coastline, no runtime mapping SDK/service connection. Source projection is Mercator, as in the existing detail map; the global Equal Earth map is untouched.

## Verification

115 complete source tests, strict TypeScript, diff checks and Vercel production build passed. New tests check square projected pixels, source metadata, verified forest/pasture points, no invented marine polygon, controlled map/legend states, equivalent keyboard options, source disclosure and reset semantics. Existing30-profile/local occurrence/call/wishlist/rights tests remain passing. Prior AU275 tests were not rerun because its application is unchanged.

Hosted1280x1000: direct pointer click on the verified forest area updated the dropdown; SVG keyboard choices for other layers; all legend/dropdown/All states; counts and shared selection; previous call cleanup; stale Info reset; temporary heart choice retained; source disclosure expansion; keyboard divider minimum/reset.390x844: all four legend choices update filters/counts without horizontal overflow, media-first stacking.320x650: no width overflow and source links remain accessible. No claim of physical iPhone/touch hardware or exhaustive assistive-technology testing.

Live1280 desktop/390 phone-sized checks confirmed map/menu/legend linkage, filtered Info/call cleanup, retained synthetic heart and reset, unchanged canonical, no overflow and Back to New Zealand arrival at /new-zealand#regions with no local layer rendered there. Removed the temporary QA heart; no saved private answers changed. Sampled live console errors were empty. Audio playback initiation/cleanup checked; no claim every recording was listened to end to end. Browser viewport reset and published pilot left open.

Evidence outside Git: audit/evidence/nov9-ecosystem-map-checks.json; desktop/mobile live PNGs; full-test log; official service metadata/legend and control-point responses. No local dev server was started for this release; hosted candidate and live browsers were used.

No public routes were added/removed. Staged source human/XML sitemaps and live source human/XML plus AU XML returned200; XML contained no private account/admin/auth locations. South Island canonical remains https://aves.bio/new-zealand/south-island. Sitemap checked/unchanged; no artificial dates. Docs-only checkpoint sync needs no extra deployment.

## Next work remains separately selected

Featured places/cities, satellite imagery021, other-region imagery audits/rollout034, approved resource embeds036 and dated currency conversion035 remain queued. Preserve South Island-first guest planning and private briefs. Do not automatically start another increment; keep Sol medium for the next selected coding task.


Owner follow-up during checkpoint: AVES-037 place-map/photo carousel replacing the text-only Habitats & places cards, with future drone footage, is recorded in ROADMAP-DETAILS. It is not part of the published map layer and does not start automatically. Generator comment/unused-import cleanup in this final sync does not change generated geometry or web behavior.
