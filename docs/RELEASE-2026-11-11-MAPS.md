# Unified maps release · 11 November 2026

Production deployments are READY for both applications.

| Application | Runtime commit | Deployment |
| --- | --- | --- |
| Global, Colombia, New Zealand | `0f1cbcc4589d3ac939e20e83bed5ff5200efd888` | `dpl_2RD7uJy1KWAxviTziF1WwuNRRx9J` |
| Australia | `e762817f3f34f067a1087bcc346f57c94f586d6c` | `dpl_3tnYnxUNdyp4yEY3ms73ivuEeCCw` |

The homepage has one map viewer shared by world, country and regional views. Removed redundant rendered maps from Colombia, New Zealand, South Island, Australia home and the Australian region directory. Retained island cards, regional guides, landscape photographs, provenance, private planning links and shared South Island habitat/place state.

Focused regions retain neighbouring controls. Colombian planning geography uses the reviewed canonical shapes as whole-region targets. Dedicated Colombian/Australian guides follow native neighbouring guide links immediately, so guide content remains aligned with the selected map region.

The same mounted global viewer remains enlarged when switching world/country/region and restores with Escape without losing selection. Existing maps retain enlargement and restore controls. South Island landscapes now use the single hero map, with place choices connected in both directions.

Validation: 184 main tests and 315 Australia tests, strict TypeScript and complete builds passed before release. Browser preview checks covered enlarged world-to-Australia transition, NSW-to-Victoria switching, Escape/focus restore, Colombia shape and guide navigation, New Zealand map controls, South Island shared place/landscape state and a single map control set in the Australian directory. No account writes, messages, database, provider, subscription or spending-safeguard changes.

Rollback: main `dpl_87fCw4BSLvttUrdzUK2AFKTsr1xP`; Australia `dpl_FYT3WsL52euwC46SYq2tFRsKtqDB`.

Next increment requested: region listening as a map-side counterpart to bird listening, sharing one player with podcasts/videos. VIDA remains a documented long-term direction in `VIDA-FUTURE-DIRECTION.md`, not a current rebrand.
