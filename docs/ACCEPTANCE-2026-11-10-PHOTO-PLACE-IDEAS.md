# Third sprint verification, 10 November 2026

## Photo spacing correction

PR #21, runtime fa81e950, candidate dpl_fYvn3jWsgFUAtmiJ6cppQsp6QkFu.
Approved browser test on the exact preview passed native Chrome 400% reflow at
340 CSS pixels by 234. Expanded frame height512; scrollWidth337. Zoom buttons
occupy y167-211; heart y65-109; close y64-108. These targets no longer overlap.
Zoom advanced to1.25 (display1.3x). End initiated normal vertical modal scrolling;
Escape returned focus to Expand; browser zoom restored to1363px width. This is
not a physical-touch, exact320/390px or full caption-scroll completion test.
172 tests, strict TypeScript and the full production build passed before push.

## Place ideas

Main PR #22, runtime1533eca4,
dpl_2RyenwQuGhguoTSVmspmtr1H8Mz6 (READY),
https://v0-company-landing-page-elkszykg6-mmelendro-9273s-projects.vercel.app/new-zealand/south-island.
Private counterpart PR #23, runtime425fa33e, independently based on PR #19.

Main:176 automated checks, TypeScript and complete build pass. Exact hosted public
preview: add Arthur’s Pass -> status1; advance landscapes twice -> Nelson Lakes
with prior choice retained; add Nelson Lakes -> status2. Reload in the same tab
restored both ideas and the correct Remove Arthur’s Pass button. Removed both test
ideas through the UI; final status empty. Native account link is only
/account?country=new-zealand&region=south-island. No place or private note appears
in the URL. No page horizontal overflow at1363px. No account/save request made.

Private:307 checks, strict TypeScript and complete production build (25 static
pages) pass. Actual editor handlers with synthetic state and mocked API transport
prove explicit import does not save, existing notes remain, failed save preserves
basket and text, confirmed saved message consumes exact matching ideas, saved
revision behavior remains, and reopened editor restores the notes. No real guest
account, hosted save, email or private shell was exercised.

## Scope and next

This is an explicit notes-based pilot using the existing message field, not a new
structured saved-place schema, booked visit or real-time access confirmation.
No providers, accounts, schema, migrations, dependencies or production aliases
changed. Browser actions stayed within approved public preview testing; synthetic
tab choices were cleared. Code worktrees passed whitespace checks and were clean.

Next gate: actual same-origin public-to-private handover and candidate authenticated
save/reopen. Preview canonical routing may change hosts, so do not claim a basket
crosses hosts. Keep release gated until those checks and explicit production
approval. Physical Safari/pinch, exact320/390px, complete media interruption and
private-shell acceptance remain separate. Do not repeat the resolved browser-
access approval question for AVES main-project previews in the authorised scope.
