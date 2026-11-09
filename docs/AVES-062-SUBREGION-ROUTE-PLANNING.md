# AVES-062: subregion birding routes and Google Maps

Owner request, 9 November 2026. Queued, not implemented. No new spending authorized.

For each subregion in Colombia, Australia and New Zealand, provide a curated list of main birding sites and useful cities/towns between them, an ordered suggested route, and estimated travel time for each leg and the overall journey. Connect these to the existing country/region hierarchy rather than creating duplicate pages. Start with one selected subregion, then expand through reviewed batches.

## Acceptance criteria

- Verify site names, public access points, road access and the geographic order. Show useful towns for accommodation, food, supplies and transport. Distinguish birding stops from transit/service stops. Include local/community operators only with verified sources and clear attribution.
- Show travel mode, approximate distance and duration per leg, the total transit estimate, source/check date and assumptions. Separate driving, walking, ferry/flight connections, birding time, breaks and overnight stops. Account for seasonal roads, ferry timetables and access restrictions where relevant. Do not turn straight-line distance into a road-time estimate or imply guaranteed access/sightings.
- Provide Google Maps directions for each leg and a full route where supported. Respect waypoint/device limits and retain a usable list if maps fail. An embedded map and travel times displayed inside AVES remain desired outcomes, subject to a cost, licence and privacy decision. External directions alone do not complete the full request.
- Prefer a no-new-spend pilot with public Maps URLs and independently sourced, clearly dated planning estimates. Google Maps URLs require no API key. They open Google Maps and do not provide a duration response to AVES. Do not scrape Google results to populate estimates. If estimates cannot be verified without a paid API, report that limit before implementation.
- Automated in-page route durations require separate evaluation of Routes API billing, quotas, attribution/display/storage terms, key restrictions and visitor privacy. No billing enablement, paid API, new subscription or broad credentials request is authorized. Any embedded third-party content must fit existing consent/privacy behaviour.
- Use only public visitor entrances and non-sensitive birding locations. Never include guest addresses, private itinerary answers, nest coordinates or restricted wildlife sites in public route URLs. Respect local/Indigenous guidance and conservation restrictions. Offer lower-impact practical travel choices where supported, without invented environmental or B Corp claims.
- Follow the Eco-Tourism Business Plan: coherent trips with birds, habitats, local culture, food and rest. Verify the current plan before defining the pilot content. B Corp pursuit remains an aspiration, not certification.
- Test desktop, narrow screens, keyboard and touch alternatives, leg and route links, totals and disclosure, missing routes and unsupported transport modes. Keep existing map/bird exploration working. One reviewed pilot release, then pause.

## Official technical references checked 9 November 2026

- Maps URLs: https://developers.google.com/maps/documentation/urls/get-started
- Routes API usage and billing: https://developers.google.com/maps/documentation/routes/usage-and-billing

These references establish integration choices, not permission to enable billing or evidence for any specific trip time.
