# Shared AVES public explorer

This is a pinned source snapshot of the global explorer, reused by the separately
deployed Australian app. It contains public UI, geography, species and sources.
It contains no authentication, database, server API, account or billing modules.

The manifest records the source commit and per-file hashes. Regenerate it with
`scripts/sync-public-explorer.py /path/to/main-checkout` after checking the source
commit. Keep the pinned commit in that script aligned with the reviewed source.
Do not hand-edit generated files. The source remains the main app branch.

Host adapters reuse the existing media and header contexts, so there is one
player and one geographic selection for the page branding. Public native links
already carry their country prefix. Public images avoid another optimization
service, and source media keeps its existing AVES domain and original credits.
The reference-photo adapter reuses the host dialog without a new dependency.

Country/region changes update the map and surrounding content without reloading.
On aves.bio the URL follows the global hierarchy. Independent previews retain
their own route so refresh remains possible without the other deployed app.
Private bird choices never enter these public URLs.
