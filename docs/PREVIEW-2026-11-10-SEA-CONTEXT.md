# South Island surrounding-water context

10 November 2026. AVES-042 main-app preview after the origin-filter increment.

The existing South Island ecosystem map has a pale surrounding-water field and
quiet Tasman Sea / South Pacific Ocean labels. Labels remain with the map camera
and compensate for its zoom so text stays readable; they are non-interactive and
sit behind the unchanged land artwork. The north arrow, scale, habitat selectors,
satellite clip, conservation layers and public-place references retain their
original geometry and state. No offshore polygon, sighting, marine protection,
access or precise sea-boundary claim is introduced.

Primary context: Te Ara, “Currents”,
https://teara.govt.nz/en/ocean-currents-and-tides/page-1, checked 10 November 2026.
Its source is linked in map credits. Only text and CSS/SVG colour were added;
no external image, tracking, new provider or dependency.

172 tests, TypeScript and whitespace checks passed; build status is recorded in
the PR/checkpoint. Exact candidate contrast, label placement, narrow layout and
zoom/browser acceptance remain pending. Production unchanged.
