# AVES Australia — working snapshot, 6 November 2026

This branch contains the full Australian application at the repository root. It preserves the latest local edits for cloud development while the original laptop is offline. This GitHub upload is not a production deployment.

## Source and hosting

- Repository: https://github.com/mmelendro/Aves
- Australia branch: `australia/preview` (this branch).
- Colombia branch: `webmaster/readiness-2026-11-05` (separate application and independent history).
- Use separate checkouts to work on both; do not merge this branch into Colombia or `main`.
- Public site: https://aves.bio/australia.
- Hosting project: `mmelendro-9273s-projects/aves-australia`.
- Last published Australian code: `11f78d1`; the regional expansion in this snapshot is newer and unpublished.
- Automatic Vercel Git deployments are disabled for these two working branches in `vercel.json`. This prevents a backup push from deploying either unfinished application.

## Latest agreed change and completed implementation

Maintain AVES's existing visual style. Provide at least 20 homepage birds, selectable Australian regions with trip enquiries and personal quotes, clear species distributions, and a bird carousel for every region. Bring Colombia closer to this layout and add its own 20+ birds and regional carousels.

- `content/birds.ts` combines 20 verified profiles with real photographs, range and habitat notes, sources and credits.
- Seventeen birds have licensed local recordings. Regent Bowerbird, Victoria's Riflebird and Gouldian Finch show unavailable audio. Emu is labelled a captive female recording, Southern Cassowary as chick calls.
- Six states, Northern Territory, ACT and Jervis Bay Territory are selectable on the map, have regional guides and prefilled enquiry links. External territories are not represented on this map.
- `content/region-options.ts` keeps enquiries and saved-plan choices aligned.
- `content/regional-birds.ts` contains 39 sourced local selections across all nine regions, with 3–6 birds in each carousel. Local occurrence and wider species range are distinct.
- `components/regional-bird-carousel.tsx` filters the shared catalogue, adds local occurrence notes and renders region-specific collections.
- The shared homepage carousel accepts an optional `birds` prop. Its latest thumbnail controls use separate grid columns to prevent arrows covering bird thumbnails on narrow screens.

## Verification and stopping point

All 156 automated tests and the latest production build passed. Earlier browser checks verified all 20 bird selections, all 17 recordings, all nine keyboard map selections and all nine enquiry presets. The latest regional carousels and final thumbnail-grid fix still need browser checks at 320px, 390px and desktop widths before publication. No new database migration is needed for these region values.

The existing Australian backend supports signup/sign-in, saved trip plans, quote requests, owner-created priced proposals and email notifications. Preserve its security and separate database. Contact address: `mmelendro@gmail.com`. AVES is pursuing B Corp certification. Booking remains a personal request/quote process, not instant payment or guaranteed availability.

## Next steps

1. Confirm `content/regional-birds.ts` contains all nine keys and locally sourced selections. The Western Australia Laughing Kookaburra is explicitly introduced; no Emu is listed for Tasmania.
2. Verify the latest carousel layout and each regional collection, including touch/keyboard navigation, available calls, local-range notes and enquiry links.
3. Finish Colombia's missing bird/region/credit data and map integration on its separate branch; its `CONTINUE-HERE.md` describes the outstanding work.
4. Stage and verify each application in the correct Vercel project before publishing. Preserve the `/australia` routing on the Colombian project.

The fixed Next base path is `/australia`. Native asset/API URLs use `sitePath`; Next Link paths remain unprefixed. Existing public routing sends exact `/australia` and descendants to `https://aves-australia.vercel.app` while preserving `/australia` in the destination. Do not remove those routes or change broader Colombia routing/DNS.

Use Node 22 and pnpm 10.34.5. Run `corepack pnpm install --frozen-lockfile --ignore-scripts`, then `corepack pnpm test`, `corepack pnpm typecheck`, and `corepack pnpm build`. Production keys and customer data are excluded from Git. A cloud workspace must use secure service connections/configuration for backend checks or deployment; never commit credentials or ask for them in chat.
