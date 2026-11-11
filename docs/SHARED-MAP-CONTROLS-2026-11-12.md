# Shared map controls and camera retention

Status: candidate source. The live New Zealand park release stays recorded in HANDOFF-CURRENT.md until exact-commit hosted acceptance completes.

## One picker across maintained map families

World, Colombia, Australia and the generic New Zealand views now use the same native layer-picker presentation as South Island. The retained CountrySatelliteControl export is a compatibility name, not a second implementation. Its picker offers background choices and only the overlays the active renderer supports. South Island keeps its richer habitat, conservation, public-place, B Corp pilot and itinerary choices in the same control/dialog treatment. The protected-area palette is shared by the geographic polygons and South Island’s georeferenced park image overlay.

Native top-layer dialogs keep choices outside the clipping of a guide face or expanded map. The picker has a named dialog, sticky close header, bounded viewport height and native input controls. Escape cancels only the layer picker, prevents propagation to the underlying map dialog, and returns focus to the Layers button. Body scroll is restored to its preceding value, including when the main map was already expanded. No dependency was added.

Map-background, region-outline and protected-area checkboxes no longer occupy separate places in the generic map toolbar. The map keeps destination/region selectors, native geographic zoom, Reset satellite view, Move and Explore areas. Explore areas can enable its own layer before loading details; disabling the layer closes its details. Sources, licences, dates and coverage remain attached to the actual catalogue/renderer. Bird filters retain their own control and context. No missing layer is represented by an inactive checkbox.

## Camera and selection retention

A bounded tab-memory cache records the geographic camera after moves, keyed separately by country and region. Background switches and revisits can restore the same centre/zoom. An explicit Reset satellite view returns to the selected scope’s reviewed bounds, avoiding a camera-memory trap. Invalid positions/zooms are rejected and returned coordinate arrays are copies. This memory is not persisted to URLs, account records or a database; imagery keeps its existing tile requests.

Protected-area selections move from component-local state into page-local map display context, keyed by the dataset geometry path. The Colombia, Australia and North Island/Rakiura selections cannot overwrite each other and survive the geographic renderer unmounting during background changes. This changes no saved trip envelope, private record or schema.

South Island park visibility no longer triggers a camera recentre just because a layer is switched off/on. Explicit place/park/base selection still focuses its location. The previously released 320px minimum canvas, tall geographic guide face, short-window page scrolling and expanded-dialog scrolling remain intact.

## Validation and remaining limits

Automated checks: 584 tests passed, strict TypeScript passed and the source audit found 359 reachable modules with none unreachable. Tests cover scope-isolated camera recovery, invalid/mutable camera rejection, supported overlays, background/park-choice retention, native cancel propagation/focus, and existing South Island options. Existing provider/ownership checks still pass. Local production build and hosted browser acceptance follow below when complete.

Browser acceptance must check background/camera/park retention, scope switching, reset, nested Escape, one active map, all maintained countries, South Island park/conservation controls, and narrow/short viewports. Native desktop/high-zoom checks do not certify physical iPhone/Safari. Complete optional layer/content parity, 3D terrain and wider reserve coverage remain separate future scope. The next numbered pathway milestone after accepted controls is the shared island planner.

No private traveller records, location permission, schema, account access, provider keys, new spend, mail or bookings are changed.
