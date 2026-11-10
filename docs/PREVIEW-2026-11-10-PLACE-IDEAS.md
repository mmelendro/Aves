# South Island place ideas to private notes

10 November 2026. AVES-063 bounded pilot, preview source only.

The public landscape viewer offers “Add [place] to place ideas” for the existing
four reviewed planning places. Only those stable public IDs are accepted, kept in
the same tab for up to a day. The component states that this is not a private save
or booking. Blocked storage has an honest manual-notes fallback. No preferences
are put into links, analytics or external requests. Existing captions, sources,
map/filter synchronization and the resizable pair remain.

The paired private-editor increment offers an explicit Add Place Ideas to Notes
step. It appends readable “Place idea:” lines to the existing notes field, preserves
guest text, avoids duplicate lines and refuses overflow without truncation. Nothing
saves or shares until the usual draft action. Basket consumption happens only for
exact idea lines found in the server-confirmed saved message; failed/uncertain
saves and newer choices retain the basket. Reopen uses the already saved notes.
This reuses existing message validation/storage rather than adding questionnaire
fields, API shape changes, migrations or a new account/provider.

176 main tests and strict TypeScript pass, with a full production build. Four new
behavior tests cover original public IDs, expiry/future/unknown/blocked storage,
non-destructive notes merge and confirmed-save consumption. Private validation is
recorded in its separate branch. Hosted public/private handover, sign-in, actual
private save/reopen, narrow/mobile and physical touch remain pending. Existing
preview canonical routing may cross hosts; never claim a cross-host session basket
will transfer until the actual flow is verified. Release the paired app changes
only after exact-candidate acceptance and separate explicit production approval.

The preceding short-screen photo fix passed exact hosted 340x234 Chrome reflow:
zoom row y167-211, heart y65-109, close y64-108, no target overlap, scrollWidth337.
44px controls, zoom to1.25, ordinary modal scrolling and Escape/focus return remain.
