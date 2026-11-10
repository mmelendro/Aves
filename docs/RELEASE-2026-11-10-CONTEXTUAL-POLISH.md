# Contextual headers, map enlargement and team carousel

Owner approved supported headers going live after the latest refinements.
First subset runtime: 2663c20f8946c16fe08901dd441f556c106ed6f0,
production dpl_GDmhyX5qm3wpexXKRxnuPWgEuaYh (checkpoint 16).
Final runtime: 33189e9f6e2d36824721e31c033c6c96e0a23879,
production dpl_HdwbDsUDSkfQcK8c2mxgVRe9j6zK (checkpoint 18).
Final hosted build READY. All twelve Colombia country/region routes return the
expected contour, plus team/NZ/sitemap HTTP checks, fifteen total. Live team has
one active slide and advances from 1 to 2 of 9. Australia completed first at
59a8f65 / dpl_FNrh2YBNHFjamZk3gPu1WcL5Cb9Z, ten live header checks.

The final owner-approved extension adds Eastern Andes (páramo/wetland), Pacific
(rainforest/coast) and Caribbean (dry lowland/lagoon). All eleven regional routes
are now covered. The team display was refined to one person at a time. Existing
profiles, advisory content and biography opening/focus remain intact.

## Published scope

Colombia country and all eleven regional terrain/water headers, including Western Andes,
Central Andes, Cauca Valley, Magdalena Valley, Sierra Nevada de Santa Marta,
Llanos, Amazonia, Colombian Massif, Pacific, Caribbean and Eastern Andes.
These are representative composites,
not surveyed views. Marine wildlife is absent from these new variants.
The existing NZ country/South Island pilot is preserved.

Additional NZ place/island variants and unverified wildlife remain studies.
Australia's separate contour release is documented on australia/preview. This
main-app release does not copy its maps, portal or backend into the main app.

Main-app maps gain same-mounted enlargement, 44px controls, drag/pinch support,
keyboard pan/reset, reduced-motion handling and retained source credits.
The team page gains a manual scroll-snap carousel using existing records,
photos and biography accordions. No autoplay or new claims.
A country-homepage teaser outline was also contained within its image frame.
No backend, private data, provider, paid SDK or geographic-boundary edits.

## Verification

156 tests, TypeScript and local production build passed. Prior hosted checks
cover world/Colombia/South Island enlargement, zoom, real mouse drag, keyboard
pan, reset, Escape/focus return, source credits and team navigation/profile focus.
New Colombia river and mountain headers passed desktop visual review. At native
400% zoom, 340 CSS pixels, the header fits without horizontal overflow and Menu
opens, Escape closes and focus returns. Physical iPhone/Safari, true two-finger
input, exact 320/390px layouts and physical carousel swipe remain unverified.

## Next owner request

Use a country outline above satellite imagery and shade only the selected
planning region, with an opacity slider reaching zero. Imagery reuse rights,
source availability and regional geometry need review before implementation.
This requested next increment is not included in this release.

## Recovery

Main app only: previous runtime 01337b2c29ce472365ff92d6a4903bd93f5bda94,
production dpl_FVbcCBTXsgAnXVhZtiQ83PCxcDSd,
checkpoint/2026-11-10-15-nz-header. No database or Australia rollback.
