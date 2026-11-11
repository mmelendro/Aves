# Expandable global destination hierarchy

Published 11 November 2026, Sydney.
Runtime cd08c9bd6e5b5bd7633b26a8af5f2d4555cd6b5f; tree a89e188104c2a3ed3034ff9ce92db09be1ce793e.
Production dpl_WJvcQbohCNThhodNVeJmJPfJqwyr, READY in consolidated project prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv.
Both aves.bio and www.aves.bio aliases verified on this deployment.
Recovery branch checkpoint/2026-11-11-expandable-site-tree.
Previous deployment dpl_XtMVBAiXzncf3YkZoMCyU84sMbbp retains the published conservation filters.

## Scope

/site-map and /australia/site-map now render the same public hierarchy: World, three countries, and 23 existing regional/island destinations. Colombia has 11 planning regions, Australia nine states/territories and New Zealand three main-island entries. The Australian route opens its country by default inside the same global tree. Country reading, experiences and planning pages nest beneath that country, with shared website information under World. Private account/auth/admin/API routes remain outside the public inventory.

The model derives from destinationRegions and publicNavigationGroups. Every one of the 74 canonical public paths occurs exactly once. North Island and Rakiura retain their established country-page anchors, rather than inventing unpublished standalone guides. No established URL or XML sitemap route was removed. Native links disable directory-wide prefetching so Expand all does not request every guide at once.

Individual branches use native details/summary and remain expandable before hydration. Expand all/Collapse all operate only on this component's disclosures. Native keyboard controls, visible focus, at least 44px link targets, wrapping labels and reduced-motion handling are retained. This is a nested navigation list, not an ARIA tree with unimplemented arrow-key behavior.

## Verification

503/503 automated checks passed, including exact canonical inventory equivalence, country/region parentage and disclosure controls. Strict TypeScript passed. The preview and staged production builds passed. Preview runtime 7f0d6dd68b2b9526b61705b6fdd22d817a5433cb differs from production only by the updated inventory test; application source is unchanged.

Hosted browser checks covered country expansion, all 14 branches expanding/collapsing, Enter toggling Australia, the AU directory opening its nine regions, and the New South Wales link opening its actual guide. Native Chromium zoom measured a 340 CSS px viewport, 337px page scroll width, 305px directory width and all visible links at least 44px high. Physical iPhone, Safari and touch remain unverified. Production site-map output and New Zealand's three regional links were checked after publication.

A production error/fatal runtime scan returned no matching entries in the ten-minute window ending 2026-11-11T00:46:41.444Z. This is a bounded observation, not a guarantee of future runtime health.

No backend/authentication, billing, database, provider, customer-record or paid AI configuration changed. The US$1 safeguard is unchanged and was not freshly inspected. Conservation filters remain in this release. National threat coverage, regional endemic adjudication, the remaining all-page visual audit, unified contact form and safe domain/project retirement remain in NEXT-WEEK-PROMPT.md.
