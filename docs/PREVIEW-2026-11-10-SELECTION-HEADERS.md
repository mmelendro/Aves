# Selection-linked contour headers

Preview only. The owner asked the header to follow map selection immediately,
without opening a guide, and to keep future mobile-app reuse in mind.

One public display context carries existing country/region/place IDs. It contains
no guest/private state and sends no network request. Route scope prevents a prior
page's preview from leaking into a different page. Geographic content/geometry and
rendering stay separate. The global header follows country and region previews;
Colombia country/full explorer and regional map cards follow their preview state;
NZ island selection and South Island place/habitat discovery use existing IDs.
The separate Australia app has a parallel scoped context and country/full explorer
bindings on feature/au-selection-headers. Applications and account navigation stay
separate. Bird-driven suggestions do not silently replace an explicit map choice.

Contours crossfade over 360ms; reduced motion switches immediately. Native links,
first-activation preview/second-activation navigation, map geometry, zoom, focus
and established control sizes remain. Inland/unknown contexts cannot inherit NZ
whales. Verified basic NZ island/place terrain is used without inventing animal
interactions. The global brand matches selected country; neutral pages remain
neutral before any selection. Full country explorers reserve header space to
avoid a height jump when the first region is selected.

## Verified preview

Main source 37605e98450381ff9c3863fa54bbee9e4875a5d2.
Deployment dpl_5BngKMXUouUFSnNbGLkYBVERuHxB, READY:
https://v0-company-landing-page-re7zl4zme-mmelendro-9273s-projects.vercel.app

159 tests, strict TypeScript and local/hosted builds passed. Actual browser checks:
global Australia and ACT selection; global Colombian Massif selection; Colombia
Caribbean first map activation; South Island Arthur’s Pass and Fiordland selection.
Headers changed before navigation. ACT uses cockatoos, Massif condors, Caribbean
ibises, Arthur’s Pass kea and Fiordland kākā. An inland selection's visible drawing
has no whales; the departing coastal drawing fades to opacity zero. Family outlines
are illustrative shorthand, not exact species identification plates or live sightings.

Always retain a small, loose horizon flock with source-backed local species. Eight
wing/bill/tail family outlines share the lighter animal line weight. Bird count and
placement respond to header/menu width. Sources are in content/header-flocks.json.
Local flock geometry tests cover 320–2560px; actual native 400% browser zoom gave
340 CSS pixels without horizontal overflow on Colombia. Separate Australia preview
also passed 340 CSS-pixel reflow and menu Escape/focus checks. True touch, physical
Safari and exact 320/390px remain unverified. No production release.
Main remains 33189e9 and Australia 59a8f65.

