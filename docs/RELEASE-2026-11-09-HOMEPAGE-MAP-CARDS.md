# AVES-012c homepage map cards — staged checkpoint

9 November 2026 (Sydney). Implementation is pushed on the main website branch.
Application commit: `c3d911db22664fd5287ef0904dc23ebcdd78e3ed`.

The three homepage country cards now share full-name location callouts, native
selectors, expandable guide lists, sage/emerald colours, selected markers, frames
and navigation. All 11 Colombian planning regions, nine Australian states/territories
and three NZ islands retain their original guide URLs. Colombia uses its existing
artwork outline/marker positions with an explicit representative-locations caption.
No new geographic boundaries, packages, private data or services were introduced.
The connected hero renderer and Australian app code remain unchanged.

Completed verification: Node 22 production build, strict TypeScript and all 121
automated tests pass. The card test now checks each full-name choice and guide
link. All 26 existing live country/region targets returned 200; the NZ section
anchors exist. These link checks establish compatibility, not a visual review.

The protected Preview build is READY. Desktop, 390px/320px, keyboard/touch
alternatives, long-name layout and connected-hero regression checks are still
PENDING because the browser needs Vercel/GitHub authentication. The local server
is unreachable from this browser. A temporary share-link request was rejected by
automatic approval due to its bearer access. Do not bypass that rejection or
weaken protection. Normal account sign-in is in progress; do not store login
codes, cookies or authentication URLs in this repository.

Not published. Existing production remains the previous Colombia-language runtime.
After successful staged browser review, use the authorized normal production
build, verify live cards/links and human/XML sitemaps/private exclusions, record
results and limits, sync the checkpoint and then pause. Automatic approval also
rejected changing persistent domain auto-assignment; that setting was left alone.
No database, AI, billing, credentials, privacy or app-consolidation work is included.
