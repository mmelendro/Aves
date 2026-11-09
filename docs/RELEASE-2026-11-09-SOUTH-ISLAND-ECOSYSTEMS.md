# South Island ecosystem filter — released 9 November 2026 (Sydney)

Published, synced and paused before another increment.

## Exact live applications

- Source df46c45 (webmaster/readiness-2026-11-05): dpl_7VQUbcr1NuTAWxFx3BAaQE4E3Ri2. Candidate https://v0-company-landing-page-df72wxs33-mmelendro-9273s-projects.vercel.app, now serves https://aves.bio. Filter pilot: https://aves.bio/new-zealand/south-island.
- Shared account/Australia c0a31ec (australia/preview): dpl_CEczrT3zECEYVLwS7WKSa19Fryag. Candidate https://aves-australia-eughqoua1-mmelendro-9273s-projects.vercel.app. Only matching living-checklist changes; budget release remains intact.
- Independent apps remain separate; no branch merge, database migration, policy, credential, provider or billing change.

## Behavior and ecological scope

The dedicated South Island explorer has one labelled native ecosystem select: All habitats30; Forest & scrub18; Mountains & tussock5; Rivers, lakes & wetlands7; Coasts & offshore waters5. Birds can belong to more than one category. Reuses original BirdProfile objects/rights/calls and the common carousel; every featured South Island profile has an explicit coarse association. A collection change resets the viewer's index/Info and stops previous audio. Wishlist state and divider stay in the parent. Local range/access/source disclosures remain in Info. The country overview keeps its existing island behavior.

This release adds a filter, NOT mapped ecosystem boundaries or precise wildlife sites. The country/island map stays geographically unchanged and highlights South Island. Do not describe the mapped-layer/place-overlay backlog as shipped. Freshwater birds do not necessarily occur at one shared site; marine bird colonies are not added as alpine/forest viewing recommendations. Takahē's profile describes managed conservation viewing; its natural tussock association does not advertise remote wild populations as accessible visitor stops. Photo/recording capture locations are separate from current species range.

Associations reuse existing locally sourced profile notes and explicit island membership. Contemporary source spot-checks include NZ Birds Online kea, southern brown kiwi, tūī, fantail, Hutton's shearwater, Westland petrel, black stilt, yellow-eyed penguin, falcon, bittern and DOC takahē/whio guidance. No new photographs or licences were acquired.

Reference links reviewed:
- https://www.nzbirdsonline.org.nz/species/kea
- https://www.nzbirdsonline.org.nz/species/southern-brown-kiwi
- https://www.nzbirdsonline.org.nz/species/tui
- https://www.nzbirdsonline.org.nz/species/new-zealand-fantail
- https://www.nzbirdsonline.org.nz/species/huttons-shearwater
- https://www.nzbirdsonline.org.nz/species/westland-petrel
- https://www.nzbirdsonline.org.nz/species/black-stilt
- https://www.nzbirdsonline.org.nz/species/yellow-eyed-penguin
- https://www.nzbirdsonline.org.nz/species/new-zealand-falcon
- https://www.nzbirdsonline.org.nz/species/australasian-bittern
- https://www.nzbirdsonline.org.nz/species/south-island-takahe
- https://www.doc.govt.nz/takahe
- https://www.doc.govt.nz/nature/native-animals/birds/birds-a-z/blue-duck-whio/

## Living-only checklist follow-up

Public discovery and private NZ brief browsing now show377 living checklist species, excluding55 extinct entries and the Historical/Extinct menu. Raw432-record source remains archived for provenance/name lookup; no guest data deleted or rewritten. Existing backend validation already rejected extinct selections and still does. Test fixtures use raw provenance for extinct-invalid-input tests, rather than expecting extinct birds in the public catalogue. Search for Moa returns no matches, while Kea remains available. Rare living visitors remain in the country reference and are labelled; this is not a live presence feed or solely a South Island list.

## Verification and limits

113 complete source tests and275 complete Australian/account tests passed, plus strict TypeScript in both apps, diff checks and both Vercel production builds. Habitat tests protect every local mapping, media object preservation, multi-habitat association, exclusion of Rakiura-only featured parakeet, no alpine stilt from location alone, no shearwater colony access implication, unknown mapping behavior and empty inputs. One existing account fixture initially depended on the obsolete public extinct list; updated it to use raw archived evidence, then reran the full275 successfully.

Hosted candidate desktop1280x1000 and phone390x844: all five select states, counts, changing profile/picker collection, call cleanup, Info reset, preserved synthetic heart choice, keyboard divider, local black-stilt notes/source links. Narrow320x650 check passed for select width/Info/no overflow. A non-essential cookie dialog initially obscured mobile controls; dismissed it through its standard Reject button and retested successfully.

Published desktop1280 and mobile390: same filter behavior, filtered Info picker, next bird, living-only search, no horizontal overflow. Live call reached readyState4/playing; selecting freshwater stopped it. No sampled live console errors. Shared authenticated account editor showed the377 picker; Moa absent/Kea present and existing saved budget brief still visible after cancel. No new private brief/request sent. Removed only the temporary QA heart choice; no private answers changed. Physical touch hardware and exhaustive screen-reader testing not performed.

Local development started, but browser localhost connection timed out; it was stopped and QA performed on the exact hosted candidate, then live. No claim of local browser verification. Evidence outside Git: audit/evidence/nov9-ecosystem-checks.json, desktop/mobile live PNGs and source/account test logs.

No new public routes. Staged source human/XML and AU XML sitemaps checked; live both human and XML directories returned200, XML contained no account/admin/auth locations. Canonical South Island route unchanged. Sitemap checked/unchanged, no artificial date updates. Documentation-only sync does not trigger another deployment.

## Remaining separately selected work

Actual georeferenced ecosystem/place overlays, other-region imagery audits and rollout remain034/013. Approved resource embeds036 and dated currency conversion035 remain queued. Preserve private guest planning and the South Island-first priority. Next increment requires owner selection; keep Sol medium for a focused code release and pause at its acceptance gate.
