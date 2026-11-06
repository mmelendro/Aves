# AVES Colombia — working snapshot, 6 November 2026

This branch preserves the latest unfinished work so development can continue in a cloud workspace while the original laptop is offline. It is not a production-ready release. The files are the full Colombian application at the repository root.

## Select the correct source

- Repository: https://github.com/mmelendro/Aves
- Colombia branch: `webmaster/readiness-2026-11-05` (this branch).
- Australia branch: `australia/preview` (separate application and independent Git history).
- Clone/check out the two branches into separate folders when editing both. Do not merge the Australian branch into this one.
- Public sites: https://aves.bio/ and https://aves.bio/australia.
- Colombia hosting project: `mmelendro-9273s-projects/v0-company-landing-page`.
- Australian hosting project: `mmelendro-9273s-projects/aves-australia`.
- These two working branches have automatic Vercel Git deployments disabled in `vercel.json`. A GitHub backup is not a release; retain this guard until an intentional, tested release.

## Latest agreed work

Improve Colombia using the Australian layout, preserving the AVES emerald palette, pale gradients, rounded cards, logo and bird-carousel style. Provide at least twenty birds on each homepage and a locally relevant bird carousel on every region page in both countries. Show where every species can be found. Use genuine, correctly identified, credited media. Calls should play only on user request; never substitute another species or invent a recording licence.

The shared contact address is `mmelendro@gmail.com`. AVES is pursuing B Corp certification, not certified. Enquiries lead to personal quotes; do not introduce instant reservations or payments.

## Saved in this snapshot

- Reorganized homepage, navigation, mobile menu, footer and new `/how-it-works` page.
- Existing Colombian map artwork and four tour families preserved.
- Shared carousel adapted from Australia, ready for the missing Colombian catalogue.
- New regional page template and canonical route, species directory and credits page templates.
- Regional enquiry query aliases and corrected contact-email fallbacks.

## Immediate blocker: missing content

The new pages import files that have not yet been created:

- `content/birds.ts`: export `birdData: BirdProfile[]`, following the Australian schema including optional `localOccurrence`.
- `content/regions.ts`: export `regions` with `{ id, mapId, name, description, birds: [{ birdId, whereFound, sources? }] }`.
- `content/image-credits.json` and `content/audio-credits.json`: follow Australia's `images[]` and `recordings[]` schemas.

This branch is expected to fail its build until those files and the new media are completed. The previous baseline already had 87 TypeScript errors, and `next.config.mjs` skips TypeScript and ESLint checks during builds. Do not treat that bypass as validation. No Colombia production build or browser validation was completed for this redesign.

Public research metadata and the original 12 bird records are preserved under `docs/research/`. The legacy catalogue is reference material, not approved content. It contains factual errors and recording rights still needing verification.

Planned collection: retain the 12 visually checked original photographs, then add Santa Marta Brushfinch, Santa Marta Parakeet, White-tailed Starfrontlet, Jabiru, Scarlet Ibis, Hoatzin, Scarlet Macaw, Sunbittern, Choco Toucan and Apical Flycatcher: 22 birds total. None of those ten new production photos or calls have been downloaded yet.

Corrections already identified:

- Green-bearded Helmetcrest belongs to the Eastern Cordillera, not the Central Andes.
- Rainbow-bearded Thornbill also occurs in Ecuador and Peru; it is not a Colombian endemic.
- Chestnut-crowned Antpitta and Vermilion Cardinal are not Colombian endemics.
- Use Striolated Manakin, `Machaeropterus striolatus`, rather than the legacy `Machaeropterus regulus` identification.
- Golden-headed Quetzal's old recording URL is labelled `gohman1`; omit it unless independently verified.
- The separate old Caribbean carousel has wrong scientific names and mismatched images; do not reuse its generic antbird/wren/woodpecker images without identification.

## Regional integration still to finish

The active map is `components/colombian-birds-explorer.tsx`. `comprehensive-ecoregions-map.tsx` is unused. Connect the active map to the guides and prefilled enquiries.

| Map ID | Canonical route slug |
| --- | --- |
| Pacific | pacific |
| Western Andes | western-andes |
| Central Andes | central-andes |
| Eastern Andes | eastern-andes |
| Cauca Valley | cauca-valley |
| Magdalena Valley | magdalena-valley |
| Caribbean | caribbean |
| SNSM | sierra-nevada-de-santa-marta |
| Llanos | llanos |
| Amazonia | amazonia |
| Massif | colombian-massif |

Use `/regions/{slug}` and `/contact?region={slug}`. The contact form already maps canonical slugs to its existing checkbox IDs. The old `/regions/cauca-river` route redirects to Cauca Valley. Review the static Caribbean metadata as part of final content cleanup.

## Continue and verify

1. Open `components/colombia-region-page.tsx` and confirm it filters the shared bird catalogue by `region.birds` and displays local occurrence notes.
2. Finish the catalogue, sourced regional selections and commercial-compatible media/credits. Leave audio absent when no suitable licensed recording exists.
3. Finish map links and run tests, separate TypeScript checks and production build. Inspect mobile and desktop layouts, every regional carousel, audio controls and enquiry preset.
4. Publish each app to its correct hosting project only after verification, preserving the two existing `/australia` routing rules on the Colombian project. Do not change DNS.

Use Node 22 and the pinned pnpm 10.34.5. `corepack pnpm install --frozen-lockfile --ignore-scripts` installs dependencies. Credentials, environment files, customer data and local hosting-auth files are deliberately not in Git. Reconnect services securely from the cloud workspace if backend testing or deployment requires them; never paste secrets into chat or commit them.

The existing Australian account, saved-plan and proposal backend is separate and must remain intact. Colombia has not been migrated to it.
