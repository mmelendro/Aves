# South Island B Corp planning pilot

## Scope

Three optional address markers from two companies, reviewed 11 November 2026: Lake Hāwea Station, Untouched World Roydvale and Wānaka stores. B Lab company profiles establish certification scope. Owner pages establish visitor addresses. OpenStreetMap individual address records establish approximate street address references, with visible ODbL attribution. These are not arrival or routing instructions. No logo assets, directory importer or bulk scraping.

Public map: South Island, Map layers, Certified B Corp businesses. Separate from the existing general ecotourism category. Each selected place opens map details with category, scope, review date, business link, certification profile, coordinate source and trip idea controls. Turning layers on does not change bird filters. Stale or incomplete records fail the existing 90 day display guard.

## Evidence and limitations

See content/bcorp-south-island-pilot.json for source URLs and dates. Lake Hāwea Station's contact page publishes 22 Timaru Creek Road; Tourism New Zealand's accommodation listing publishes 62. The mapped point is explicitly the public contact address at 22, not a cabin or arrival point. Visitors must confirm arrangements. Untouched World certification is company evidence, not separate certification of an outlet or the adjacent Kitchen. No AVES partnership or guaranteed environmental outcome is claimed.

B Lab ESC reference: https://usca.bcorporation.net/putting-stewardship-to-work-tracking-esc-standards/
The pilot supports transparent sourcing and supplier discussion. Certification is not presented as a measured footprint, biodiversity result or a reason to consume more. Accommodation and retail coverage is deliberately small; food, transport and guiding remain to be sourced.

## Selection and privacy

Existing public places and verified B Corp address references join landscape ideas in the current one day session basket. IDs are allowlisted; duplicates and unknown IDs rejected. Mounted baskets synchronize. Copy controls have unique labels and manual fallback. In the private brief, Add Place Ideas to Notes preserves guest notes and refuses overflow. Save My Draft uses the existing account path. The existing review and immutable enquiry snapshot retain those notes. NZ notification emails contain a private inbox link rather than the selected places. No database migration, real client record, real enquiry or email was used to test.

## Validation

527 automated checks passed, including mixed place/B Corp note import, no duplicates, expiry, invalid coordinates, exact certification host, category separation, mocked account save/submission and authorized owner review without email disclosure. TypeScript passed. The local 75-page build and hosted Node 22 production build passed.

Browser checks passed for selection, sources, add/remove ideas, mounted basket synchronization, mixed landscape and business notes, persistence on reload, layer reset, keyboard fullscreen and account handoff. The artificial 340 × 234 CSS viewport had no horizontal overflow; keyboard controls worked inside the fullscreen map. Pointer expansion at this artificial viewport was inconclusive, and physical Safari/touch was not tested. Actual authenticated save/reopen and email delivery remain unverified by a real account session; automated account tests cover payload retention.

## Published result

Runtime b63243c56af3991aa7ff5c5131446239e25a24c6. Production deployment dpl_ei4Zo75XJkbEnKyccUe6LCoca8sw, READY, project prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv. Both aves.bio and www.aves.bio aliases verified. Live South Island picker shows Certified B Corp businesses · 3; selected Roydvale details show address, scope, review date and certification link.

Existing public project alias was verified against this deployment before the custom domains were switched. South Island, account sign-in and robots.txt returned 200. Account DOM confirms data-read-only-preview=false, enabled Sign In, no preview notice. A temporary protected-deployment share link was rejected by automatic review because it would expand access for up to 23 hours. No share link or protection change was used; the existing public deployment alias provided the required checks.

No error/fatal logs found for this production deployment in the ten minutes ending 2026-11-11T03:53:49.185Z. This is a scoped observation, not a guarantee about all traffic. Immediate rollback: c0ac3b23a464184d58802096abbcd240b7631df4 / dpl_4TidxhEacYS6YDymtCw6Ss7HMy1G.
