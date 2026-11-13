# Regional identity and resizable discovery panels

Status on 14 November: **pushed, awaiting full verification**. Source candidate `a4acaedc130548eb3e94af9f86b87674fb3a8e4f` on `feature/album-experience` adds a bounded landscape-region dropdown after diagnostics identified it as the Linux phone width offender. [CI 43516111175](https://github.com/mmelendro/Aves/actions/runs/43516111175) is running. Lint passes; the new correction is not yet fully verified.

## Included changes

- Regional AVES subtitle links to the selected region, with a separate country return link; AVES itself returns home and the displayed bird opens its species reference.
- Country and reviewed-region bird-list links beside the destination's birdlife introduction.
- Desktop map and bird panels resize from all edges and corners. Inner edges move the split; outer edges change the workspace within the page; vertical edges change height. Keyboard arrows, Shift, Escape cancellation and Reset are available. Narrow phones retain the stacked layout.
- Sierra Nevada tour navigation wraps beside the longer regional identity. Browser assertions await the rendered client shell and filtered inventory result.

Implementation commits: `f5319dd`, `54ff0ae`, `4d8ad0d`, `2c87765`, `a4527a0`. Later commits improve early phone checks and overflow diagnostics. The cookie banner uses separate grid rows and scrolls in short viewports; map paint containment was also added. These changes did not resolve the remaining Linux page-width failure. Team, creator, About, replacement search-input and administrative drafts are excluded.

## Verification

- Local unit suite: 785 passed, including four new geometry tests and unrelated existing drafts.
- Local lint and type check: passed.
- Local production builds: passed, including the final header correction.
- Focused local browser checks: 5 passed, 1 intentional project skip; Chromium and Firefox resize, keyboard and relevant inventory journeys. Paired-panel accessibility scan passed, selection and map element retained, Escape and Reset verified, phone fallback has no horizontal overflow.
- Broader local browser run: 82 passed, 12 intentional project skips, 2 enlarged-text overflow failures in the uncommitted search-box header draft. That draft is excluded from the candidate (`git diff` confirms the committed header retains its Search link). Exact-commit CI, including the enlarged-text checks, is the release gate. Local narrow-header and paired-panel screenshots were visually inspected.
- Isolated local application build at `a4527a0`, with generated assets: **84 passed, 12 intentional project skips** across the representative browser matrix. This excludes unpublished drafts and includes phone, tablet, desktop, Firefox, enlarged text, carousels, map controls, regional labels and resizing.
- CI runs 43507724778 and 43509650559 passed 782 unit tests, 33 priority journeys and 160 full-suite browser checks, but one narrow-phone interaction failed. Subsequent diagnostics show a 320px page expanding to 350px and shifting touch coordinates; the cookie choices themselves are separate. Clean enlarged-text and sitemap accessibility checks passed.
- CI 43514213298 confirmed map paint containment alone did not fix the width failure. CI 43515115628 identified a landscape-region label/select extending to x=350 on a 320px page. The bounded-width correction is now in `a4acaed`; fresh CI is pending. No failed candidate was published.

## Publication

Not published. Resolve the Linux overflow and pass complete exact-commit CI before deployment; then verify both domains and live phone/desktop behavior. No newer candidate currently meets the release gate.

Rollback: `dpl_2eyPYqT6PZu3wvGbuuXu9kH9AJhu`, commit `231e8e9d819294e8a1aa3464f3654b0f2e05490d`.

## Remaining scope

Regional species coverage and conservation assessments remain incomplete. This release exposes existing inventories; it does not claim comprehensive regional coverage. Changing flock formation, additional motion refinement, team/creator review and the Colombia journal remain separate increments. Physical-device acceptance is still outstanding.

The newly clarified planning/satellite requirement is the next map priority: keep centre, geographic scale, extent and selected location unchanged when switching base layers. It is recorded in R04 and is not implemented by this candidate.
