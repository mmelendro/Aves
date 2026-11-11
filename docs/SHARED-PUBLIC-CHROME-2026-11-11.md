# Shared public layout increment

11 November 2026. Owner authorised continued implementation and publication.

## Changes

Australian editorial pages and their PageShell now delegate public navigation to the same glass-contour header as the global/NZ explorer. Australian explorer pages use that renderer too, removing the separate fixed 108px header and spacer. All use the shared 132px in-flow sticky header. Country selection and direct-route fallback supply the same regional identity to the bird and contour. Returning to World explicitly clears the country identity rather than inheriting Australia from the URL.

Australian account/admin/auth path boundaries still delegate to PortalNavigation. No authorisation, session, API or database logic changed. Public menu links use explicit canonical paths, preserving global My Trips and avoiding double country prefixes. Australian regional, tour, planning, about and contact links remain accessible. The global mobile menu includes the expandable site directory and labels the unselected world correctly.

Australian footers now use GlobalFooter, retaining their country navigation, Australian updates and Acknowledgement of Country. Global/Colombia/NZ/Australia destinations, My Trips, contact and legal links share its renderer. Context-specific acknowledgements remain separate from promises about individual experiences. Colombia's older editorial footer/localisation is still queued for migration.

Colombia and Australia PageShell introductions use one PageIntroduction component: the same title hierarchy, emerald title colour, maximum text widths, spacing and responsive padding. Map-first regional explorer branches remain map-first. Route content, optional media and custom footer overrides are retained.

## Verification

506 automated checks passed with strict TypeScript. Regression cases cover private/public navigation boundaries, canonical links, regional and cross-country selection, unselected World identity, shared renderer delegation, shared account routes and footer acknowledgement/navigation.

Hosted preview: fdf3d0793dd6aea701ecd3d38d773178515afeec, deployment dpl_FcpsKMcHLYGt59ss63VvUaMhPpAc. Desktop Australian header links fit in the frame. Browser zoom yielded a real 340 × 234 CSS px viewport with no horizontal overflow. Mobile menu links measured 44px tall, scrolled inside the dialog, and its Site map link opened the global directory. The global mobile dialog correctly read “AVES Explore the world”. These are Chromium checks, not physical phone/Safari acceptance.

Staged heading build: dd8fe15cebcdd7a748022a7ec61a7842d422ef58, deployment dpl_4DXoDR7TBzyTp9A6ARKnHvJsw5kf. Australian site directory showed the shared heading, emerald text, content below the 132px header and no desktop horizontal overflow.

Final runtime: 3562ba23849b47218bf5138687446164b88b4d77.
Final deployment: dpl_5MtafKNyQ2uxi3Em7hcBtt7rWzb5 in prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv.
Publication verification: READY at the pinned runtime. Both aves.bio and www.aves.bio aliases verified against this deployment. Live Australian site directory and Colombian /credits page showed the shared emerald heading template and no desktop overflow. Live Australian 340 CSS px layout had no horizontal overflow; menu links remained 44px tall, Escape closed the dialog and returned focus to Open navigation menu. Final staged explorer checks covered Australia → World → New Zealand on the same Australian route; the header changed bird/country identity and World used /images/brand/aves-global-bird.png with no Australian subtitle. Live Australian footer retained its acknowledgement. No error/fatal runtime logs matched in the ten-minute window ending 2026-11-11T01:16:41.040Z.

Visual proof: /workspace/shared/aves-shared-public-layout-live.png. Recovery branch: checkpoint/2026-11-11-shared-public-chrome. Previous production runtime cd08c9bd6e5b5bd7633b26a8af5f2d4555cd6b5f / deployment dpl_WJvcQbohCNThhodNVeJmJPfJqwyr remains the immediate rollback target.

## Next

Direct inspection confirmed /about has a custom heading outside PageShell, so it is not covered by the shared introduction. Include custom /about and /travel-tips layouts in the remaining audit. Continue with the remaining Colombia editorial header/footer while preserving its language toggle and translation behaviour. Finish route-by-route spacing/title/control acceptance, including physical touch/Safari and exact phone sizes. Then complete the shared contact flow, range/endemic ledger and source-verified operator layers in the master prompt. The wider all-page audit is not complete.

No new provider, paid AI request, subscription, billing configuration, real email, private record or database change. Previously verified US$1 safeguard unchanged, not freshly inspected. Old Vercel project retirement remains dependent on the actual project-domain transfer recorded in HANDOFF-CURRENT.md.
