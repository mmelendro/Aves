# AVES change inbox

**Planning only until implementation is explicitly resumed.** Canonical copy: this file on `webmaster/readiness-2026-11-05`; keep the Australian mirror synchronised. Follow [NEXT-WEEK-PROMPT.md](NEXT-WEEK-PROMPT.md) for scope and delivery.

## Agreed backlog

| ID | Kind / priority | Observation or request | Completion check | Status |
| --- | --- | --- | --- | --- |
| AVES-001 | Editorial / P2 | Repetitive regional species descriptions; the owner's example is [Santa Marta](https://aves.bio/regions/sierra-nevada-de-santa-marta), including repeated endemic-range wording. Review broader copy and unverified claims. | Shared context appears once; bird notes are distinct, useful and sourced. | Backlog |
| AVES-002 | Content / P2 | Too few distinctive Colombian regional birds and excessive reuse across regions. | Coverage matrix and a verified first expansion batch demonstrate better regional variety. | Backlog |
| AVES-003 | Feature / P2 | Add a global destination map to the homepage. | Catalogue-driven country links, clear launch status and accessible responsive navigation. | Backlog |
| AVES-004 | Feature / P2 | Select birds into a saved wishlist; optional bingo view. | Guest/account persistence, removal, safe merge and owner isolation work. | Backlog |
| AVES-005 | Feature / P2 | Questionnaire, balanced itinerary options and human-reviewed sustainable supplier planning. | Implement in separately scoped stages after the required content/data foundation. | Backlog |
| AVES-006 | UX / P2 | Resize the map/media split with a draggable divider; resize the whole pair to available width. | Bounded pointer/touch/keyboard resize; balanced height; natural narrow-phone stacking; no distorted maps or clipped controls. | Backlog |
| AVES-007 | Content consistency / P2 | New Zealand lacks dedicated regional pages and local carousels, particularly South Island. | Island pages share the country design, verified local birds/calls and functioning map/navigation/sitemap links. | Backlog |
| AVES-008 | UX / P2 | Keep the speaker icon, with a subtle accent to advertise available bird calls. | Owner choice preserved; available and playing states distinct; accessible contrast; no autoplay, constant flashing or highlight on missing calls. | Verified |
| AVES-009 | Account / P1 | Google sign-in still does not appear. Previously prepared, but not activated in production. | Business support address and provider readiness verified; real account/callback/session tests pass; only then show working Google sign-in. | Backlog |
| AVES-010 | Cultural content / P2 | Include totemic and culturally significant birds where appropriate. | Specific community/place and sources are identified; sharing protocols and media rights respected; interpretation and endorsement are stated accurately. | Backlog |

Priorities are provisional, not an owner-approved ranking between these requests. Google completion is provisionally P1 because it is an expected account entry method; existing email/password access remains available. Priorities: P0 urgent security/data loss; P1 broken essential journeys or materially misleading content; P2 usability/content/features; P3 polish. Owner priorities take precedence. States: Backlog, Ready, In progress, Verified, Deferred. These observations were supplied by the owner; this documentation update checked relevant source/setup notes but did not re-audit live provider settings or the website.

## Release checkpoint — 8 November 2026 (Sydney)

AVES-008 was published and verified as a separate cosmetic release; see `CONTINUE-HERE.md` for commits, deployments and evidence. Work is paused after this release at the owner's request. Other items retain their existing backlog status.

## New observation details — 8 November 2026 (Sydney)

- **AVES-006:** The owner wants the map and media to behave as a connected adjustable pair. Start balanced; allow dragging the divider with practical minimum widths, keyboard access and a reset to the default split. Resize against the container, including after orientation changes and stacked/paired breakpoint transitions. Reconcile a saved split with smaller screens if persistence is used; persistence is optional. Keep photo focal points useful, map geometry correct and labels/controls usable. Avoid a second decorative slider or conflict with carousel swipe/normal page scrolling. The current CSS supplies equal columns and a fixed maximum width, not a draggable split. [W3C interaction reference](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/).
- **AVES-007:** Source inspection confirms that `app/new-zealand` currently contains its homepage; the island map links to sections on that page. A dedicated South Island page is requested, with matching North Island and Rakiura coverage for consistent regional navigation. Use existing sourced birds where appropriate, filter accurately per island, then expand only with verification. Do not silently enable NZ saved trips or bookings. Preserve old anchor links through retained previews or explicit destination links.
- **AVES-008:** The owner considered an ear icon and then explicitly agreed to retain the speaker. Add a subtle availability cue, such as a soft emerald ring/background, while keeping translucent controls discreet. This decision supersedes the ear-icon question. Any brief motion must respect reduced motion and must not be needed to understand the control. Keep tooltip/spoken labels and playback feedback; playback still requires a visitor action.
- **AVES-009:** Saved setup notes dated 7 November say the Google client was created, the provider prepared in testing mode, and the production button setting left unset. The owner requires `info@aves.bio` as Google's public support address and personal Gmail hidden. Workspace restoration/support-address eligibility and end-to-end activation remain outstanding. These are last recorded facts, not a new provider-console inspection. See the [Australian setup guide](https://github.com/mmelendro/Aves/blob/australia/preview/docs/social-sign-in.md). Verify current state before changing anything; obtain user participation for required sign-in and approval for any new paid subscription. Facebook is deferred.

- **AVES-010:** The owner requested totemic birds when possible. Integrate suitable cultural context into regional bird discovery and community-led experiences, with primary community sources, proper attribution and guidance/permission where needed. Totemic significance is specific to a community or tradition; national-bird status or a guest's personal symbolic connection is a separate concept. Do not invent associations, generalise across Indigenous peoples, disclose restricted stories, or imply a relationship/endorsement. Personal interpretations may be included only as clearly attributed, optional perspectives. No species-specific totemic claim has been researched or approved by this planning update.

## Adding observations over the next few days

When I send a note, link or screenshot, capture it here without starting implementation. Reuse an existing ID for the same underlying issue; otherwise assign the next AVES number. Record the date, affected URL/section and device if known, observed behaviour, desired outcome, kind/priority, evidence and status. Label inferences and unknowns. Do not invent a reproduction or require every field before recording an observation. Ask only if missing information prevents understanding it. Keep private/customer information out of screenshots or repository notes.

For new observations, use this short entry format:

### AVES-NNN — Short title
- Reported: date; URL/section; device, if known.
- Observed: what happened, with an available screenshot/link reference.
- Desired: what should change and how to check it.
- Kind / priority / status: provisional until triaged.
- Dependencies, decisions or completion evidence: only when relevant.

*The entry above is a template, not a reported issue. AVES-006 through AVES-010 are the newly captured observations; use the next unused number for future additions.*
