# AVES-069 South Island B Corp source pilot

10 November 2026. Source/access assessment only. No visible layer, pin or release.

## Verified first candidate

Untouched World has an official B Lab profile, listing Canterbury headquarters,
apparel/manufacturing and certification since May2021:
https://www.bcorporation.net/en-us/find-a-b-corp/company/untouched-world/

Its own store page identifies the Roydvale location at155 Roydvale Avenue,
Burnside, Christchurch:
https://www.untouchedworld.com/en-int/pages/stores/christchurch-roydvale-avenue

The brand website is linked by B Lab. That connects the brand and location source;
it does not establish an independently certified outlet or cafe. Untouched World
Kitchen is not added as a separately certified business. No AVES partnership,
booking availability, uniform environmental benefit or certification score is
implied. The legal certification scope is not expanded beyond the named profile.

Exact coordinates and source precision remain unverified. The business Directions
link resolves an address request, not verified entrance coordinates; its external
map fetch was unavailable. No substitute coordinate or geocoding service was used.
The real candidate is retained as unmapped, with coordinate null. The current
eligible-pin list is empty. PurePods had no verified B Lab profile in the bounded
lookup and was not included; that is not a claim about its certification status.

## Source and rendering boundaries

content/bcorp-south-island-pilot.json holds minimal manually reviewed public facts
and native sources. No directory scrape, API, account, bulk import or new provider.
Bulk access/reuse rights must be assessed before scaling. No logos or marketing
photographs are copied. Additional visitor-relevant stays, food, transport and
guiding candidates remain to be verified.

lib/bcorp-pilot.ts is a future display guard, not evidence verification itself.
It requires the exact official B Lab profile host/path, explicit manual review
states, dated profile/location checks, verified public coordinates and a source,
and valid geographic numbers. The configurable90-day review window is an AVES
pilot design choice, not a B Lab rule. Stale/future/invalid dates, missing sources,
wrong hosts and invalid/missing coordinates cannot produce a pin. The optional
map layer stays disabled. Tests use an explicitly synthetic coordinate fixture;
no invented coordinates enter the real source record.

## Stewardship connection

Reference requested by the owner:
https://usca.bcorporation.net/putting-stewardship-to-work-tracking-esc-standards/

AVES design choices informed by that guidance: retain dated evidence, distinguish
supplier claims from independently established facts, surface uncertainty, and
avoid turning certification into an invented impact score. This pilot does not
assess a business against all current ESC requirements or claim AVES certification.
The ecotourism brief remains the product context: truthful local representation,
responsible supplier discovery and respect for communities/wildlife.

180 automated checks, strict TypeScript and whitespace checks passed. Full build
completion is recorded in the PR. The data/guard has no public UI; map-layer,
accessibility and exact candidate visual acceptance remain future work. No
production, account/provider, private data or billing changes.
