# Australia map controls preview

Owner-selected increment 1 of the style/functionality sequence. PR #12 targets
`australia/preview`; runtime source `7e2d7ab65170c4833a0c588ac7504269acbe3623`.
Subsequent `4a33b8a` adds interaction tests only. Production is unchanged.

Australia project `prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv`, preview
`dpl_BYQfL3MYBM6vsbPEJpDQpKHTxZfc`, URL:
https://aves-australia-43wmvfgvv-mmelendro-9273s-projects.vercel.app/australia

Both AustraliaHomeExplorer and AustraliaRegionMap reuse the main app's mounted
MapViewer and gesture calculations, copied within the existing independent app.
No new dependencies or geography, account, API, auth or database changes. Native
links, regional birds/header context and the separate page chooser remain intact.
Inline gestures require Move; normal page scrolling/browser pinch stays available
otherwise. Expanded maps own their gesture surface. Attribution is inside the modal.

## Validation

301 tests, strict TypeScript and local production build passed. The hosted build
is ready. Additional component-event checks cover inactive native gestures,
two-contact pinch, suppressed guide activation after movement, ordinary tap,
modal state and Escape/focus restoration. These are not physical touch tests.

Hosted browser checks:

* Desktop: both map variants enlarge; zoom/reset and keyboard panning work.
* Native pointer drag moves the view by the observed delta without changing
  Queensland selection or navigating. Reset restores fit.
* Victoria selection in the expanded explorer updates birds and header flock,
  keeps the dialog open and remains selected on close. The first activation
  stays on `/australia`.
* Escape returns focus to the exact enlarge control. Source attribution remains
  in the expanded view; original attribution remains below the inline map.
* Native browser 400% zoom yields 340 CSS pixels of width and a 234px short frame.
  No horizontal page overflow. Close remains 44px square and visible. The modal
  can scroll for map/detail/credit content with its persistent toolbar.
* Browser zoom restored to 100%. Desktop screenshot saved locally as review
  evidence, showing the selected Victoria map and modal attribution.

Physical iPhone/Safari, true two-finger input and exact 320/390px are unverified.
Do not describe this as a production release or a complete mobile hardware test.

## Next

Owner-selected sequence: map-style parity, photo zoom, invitation word animation,
continuous calls, origin filters, sea context, saved places and the B Corp pilot.
Reuse these controls while styling maps. Existing private planner PR #11 still
needs actual signed-in save/reopen and private-shell acceptance. Fifteen public
checklist references remain pending. Preserve those independent gates.
