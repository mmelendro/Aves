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

Local tests, TypeScript and production builds were checked during implementation.
Hosted browser checks and exact final source IDs follow with acceptance. No
production release. Main remains 33189e9 and Australia 59a8f65.
