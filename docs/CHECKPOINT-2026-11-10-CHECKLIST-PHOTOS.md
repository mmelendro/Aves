# AVES-039 checklist photo preview checkpoint

10 November 2026, Sydney. Preview only, not a production release.

## Source and scope

Owner selected the simpler checklist photo increment while consolidation C3 is
blocked. Refreshed origin before editing. Base main/doc head:
2738de35f2f561b677fed11d71862bf36e6503d6. Separate branch:
feature/aves-039-checklist-photos. Draft PR: https://github.com/mmelendro/Aves/pull/4.
Runtime candidate: 8c7f297b15b70678a3b4bc087a98939b37d8460e.

The existing shared public NZ picker on the NZ overview and South Island guide
now offers quick hover/focus previews and a separate Photo button opening a larger
modal. Existing 31 locally hosted photographs retain creator, location, source,
licence and modification records. Scientific binomials join subspecies to their
living checklist parent; the photographed taxon remains explicit. The remaining
346 species receive no photo affordance. Failed images give an honest message.
No sound or video starts. Images mount only when requested, with lazy loading.
Checkboxes and wish-list callbacks stay independent from preview controls.

Australia/private portal, hosted database, providers, geography, account sessions
and production are unchanged. This branch is not merged into the unified draft.
Any later port must preserve both candidates' changes and repeat affected checks.
Videos and additional media sourcing remain separate work.

## Verification

149 tests passed, including complete catalogue/credit/local-file and subspecies
mapping coverage. TypeScript and final local production build passed using
Node 22 and the main branch's frozen dependency lock. No dependency changes.
The first protected preview built successfully and browser review verified
scientific-name search, Maori-name search without macrons, absent-media rows,
keyboard quick look, larger photo, full provenance, independent wish selection
and focus restoration. It exposed quick-look reopening on modal close; candidate
8c7f297 corrects both focus and pointer re-entry after dismissal.

Final preview: dpl_5wb1awhMmWXm6g5auHBoX2Yh7ZoX,
https://v0-company-landing-page-1np7h0e47-mmelendro-9273s-projects.vercel.app.
Final hosted build is READY. Final browser review passed pointer hover (including
moving into the preview), keyboard focus quick look, Enter/click larger view,
full credits, Escape dismissal without reopening and focus restoration. Photo
viewing kept selection unchanged. Selecting Kea survived scientific/Maori search,
missing-media rows and Selected filtering. The temporary public Kea test choice
was removed; no authenticated private fixtures were used for this increment.
Final 340 x 234 CSS-pixel reflow at 400% browser zoom passed, including the modal
within the viewport, scrolling credits and no horizontal overflow. Browser zoom
was restored to 100%. The image-error fallback is implemented but was not forced
in the hosted browser. No runtime errors were inferred from unrelated cookie UI.
Local browser service could not launch Next.js because it adds unsupported
Vite CLI flags; hosted QA is used instead. Physical iPhone/Safari, touch and exact
320/390 CSS-pixel layouts are not verified. Do not infer complete acceptance.

## Release and recovery

Production approval remains pending. No release has occurred. Existing main production remains runtime
d34faabc3d09bee8b671b618998606ed06994bea / dpl_3WU7VC5jQjiN5TWBEGBGxVB82gWB.
Australia remains 2ff09e92b25a57d89c5966352393bcdb0369db45 /
dpl_56y3bD1RTE2fngcHBr14obkGu2bx. Existing recovery branches remain valid.
Do not promote this Preview artifact or move aliases. Stage/build the explicitly
approved production source and verify the affected public checklist before release.

C3 approval state is reconciled in HANDOFF-CURRENT.md. Owner approvals persist;
workspace network access is the remaining CLI blocker. C4/C5 remain separate.
