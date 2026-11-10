# New Zealand species-origin filters

10 November 2026. AVES-025/048 source preview, stacked after bird-call following.

The main-app checklist now combines name search, all/selected birds and a separate
origin filter. Options: all origins; native including endemic; endemic; introduced;
origin not confirmed. Each option shows its full checklist count. The current
2024 living reference contains 342 native species including 93 endemic, and 35
introduced. Unknown coverage is honestly zero. Unknown/new values never default
to native. Rarity is displayed independently of origin. An origin category never
establishes presence on a selected island, season or access.

Filtering derives visible rows only and never writes or removes selected IDs.
Pagination resets on filter/search changes. English, Māori and scientific searches
retain accent-insensitive matching. Existing thumbnails, source credits and
private-basket links remain. No source taxonomy was edited.

172 checks and strict TypeScript passed, including source counts, unknown status,
combined filters, immutable hidden choices and Māori/scientific search. Build and
private-app port status are recorded in the PR/checkpoint. Browser acceptance is
pending; no production release or provider/database/private-data changes.
