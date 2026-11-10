# South Island eBird hotspot layer: next increment assessment

10 November 2026. Research and delivery proposal only. No API request, new account,
key lookup, data import, provider change or hotspot layer has been implemented.

## Confirmed source constraints

Cornell's API terms permit non-commercial use and require prior written permission
for commercial use. AVES is a commercial trip-planning service, so public visibility
of a hotspot does not itself authorise API reuse here. The official hotspot FAQ
also requires a personal API key for the downloadable coordinate list. Keys must
stay server-side and must never enter browser bundles, URLs, logs or GitHub.

Primary sources reviewed:
- https://www.birds.cornell.edu/home/ebird-api-terms-of-use/
- https://support.ebird.org/en/support/solutions/articles/48001009443-ebird-hotspot-faqs
- https://ebird.freshdesk.com/en/support/solutions/articles/48001078113-ebird-data-privacy-and-data-use

Do not scrape eBird pages or switch to a mirror to bypass the usage conditions.
No sensitive-species observations, personal checklists, observer names or private
locations are part of this proposed layer. A hotspot does not establish public
access, current conditions or the presence of a particular bird.

## Smallest useful implementation after permission

An optional, initially off South Island public-hotspot layer in the existing map.
Keep habitat shading, historic satellite imagery, camera and selected place separate.
Use public hotspot names and source links. Explain the source date and access limits.
Provide a keyboard-accessible list alongside markers and an empty/error state.
No geolocation prompt, automatic remote loading, behavioural tracking or accounts.

Keep a portable public-place record outside the React map component:
`id`, `provider`, `sourceUrl`, `name`, `latitude`, `longitude`, `sourceRegion`,
`retrievedAt`, `permissionReference`. Validate provider IDs/URLs and finite
coordinates, deduplicate by provider ID, then classify using reviewed South Island
geometry. eBird administrative region codes must not be confused with AVES habitat
classes or the four representative landscape places. Do not invent an eBird code
for South Island. Verify official regional codes and the required permission before
choosing the request scope. Keep API transport, source adaptation and rendering
separate so the same public model can serve a future mobile application.

## Acceptance checks

- Written commercial-use permission and attribution requirements recorded privately.
- Key provisioned safely by the owner if needed, with no new paid service.
- Only authorised public-hotspot fields enter the public response/cache.
- Points align with the current map projection and reviewed island boundary.
- Layer off/on, marker/list selection, source links and stale/empty/error states work.
- Enlarged map, reset, keyboard, reflow and physical touch acceptance remain separate.
- No promise of sightings or access; conservation guidance stays visible.
- Explicit production approval follows a verified preview.

## Permission enquiry draft, not sent

Hello eBird team,

I run AVES (https://aves.bio), a service for personally planned birding journeys.
Could you confirm whether AVES may use the eBird API to display public hotspot
names, coordinates and links on our South Island planning map? Visitors would opt
into the layer, with eBird attribution and direct source links.

We would exclude observations, observer information, private locations and
sensitive-species data. We would also make clear that hotspot inclusion does not
confirm public access or bird presence. Please let us know the written permission,
attribution and caching conditions that would apply to this commercial use.

Thank you,
Martín Melendro Torres
AVES

## Independent next work while this dependency remains

Finish any remaining thumbnail-source verification. Then extend the same public
reference images to the separate private NZ picker as a bounded UI change, with
save/reopen/privacy acceptance and without changing the stored bird IDs or schema.
Port main-app map enlargement to the separate Australia app only as its own reviewed
slice. Retain the owner's saved-place, origin-filter, playback and continuous-call
priorities; do not restart C3 provisioning, consolidation or a production release.
