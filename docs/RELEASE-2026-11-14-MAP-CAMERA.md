# Shared explorer camera and hydrated text reflow

Status: **published and verified for camera continuity and horizontal text reflow**. Current source `036fa286dfd063298cc201894331557438400c12`, deployment `dpl_6LNCBWt2DXAVBSHRpQHXPVrAz2ME`, at https://aves.bio. [CI 43568426791](https://github.com/mmelendro/Aves/actions/runs/43568426791) passed all gates.

## Scope

- The main world/country/regional explorer keeps one geographic map mounted across Planning, Satellite, Roads and Topographic. Centre, zoom, geographic bounds, canvas dimensions and selected region remain unchanged by background switches.
- Manual pan/zoom survives switching. Fullscreen and panel resizing retain centre and zoom while adapting the visible extent to the new viewport; unchanged-size notifications no longer interrupt movement. Explicit location selection and Reset can change the camera.
- Planning geography uses the same geographic projection as tiles, with a public-domain Natural Earth background. Country names appear on hover/focus. The original illustrated maps and native links remain in server-rendered/no-JavaScript content.
- The hydrated homepage fits narrow screens at doubled text size: the header can wrap, branding can shrink, the introductory grid has a bounded column, and inactive tooltips no longer create invisible horizontal overflow.
- The existing Search link remains in the published source. Search-input, About/team/creator/footer and admin drafts are excluded.

Implementation: `997fde8` (text reflow), `37afecd` (camera/geography), `0d8ab5e` (updated history/enquiry control locators, preserving the same assertions), `85ba58e` (accessible map-credit click targets).

## Historical development verification (superseded by final release below)

- Production build, lint/type validation and source/cleanup audits passed.
- 785 unit tests passed locally, including three unrelated unpublished draft tests. Exact-commit CI is the authority for included tests.
- 18 final camera/reflow/selection checks passed across narrow phone, Chromium and Firefox: repeated background changes after pan/zoom, selected-region framing, retained engine/canvas dimensions, fullscreen continuity and hydrated doubled-text reflow.
- 12 country/region/history/deep-link checks passed, with 12 intentional project skips. The country/region-aware enquiry-link journey also passed.
- 60 public accessibility/reflow checks passed across all six browser/viewport projects.
- Album framing, map controls, regional branding and paired-panel resizing passed in the broader local run. An earlier Firefox movement timing failure was corrected and the camera checks rerun. Planning/fullscreen screenshots were inspected.
- First camera CI 43522860439 passed the build and audit gates but stopped at an obsolete enquiry-test selector. The new test uses the shared geographic selector and retains its country and region enquiry-link assertions. CI 43524486102 then passed 176 full-suite checks but failed three accessibility checks for one cause: the Leaflet credit link was too small. `85ba58e` adds minimum 24×24px click targets to attribution links. Full CI is rerunning; neither failed candidate was published.

These runs overlap; do not add them together as a unique total. Local builds contain excluded drafts, so they do not replace exact-commit CI.

## Domain and publication

The single public address is **https://aves.bio**. `www.aves.bio` redirects to the same path/query on aves.bio; the homepage and Colombia bird-list URL were verified. Future deployment alias changes must preserve this redirect.

Publication used the exact passing commits and READY production builds. Final live verification is recorded below.

Rollback: `dpl_7BwVzLgpDKJvWfCHGHMgjieihJdy`, source `a4acaedc130548eb3e94af9f86b87674fb3a8e4f`.

## Remaining scope

The specialist South Island habitat/itinerary map still has its own illustrated renderer and is the next R04 increment. Its LCDB/DOC geometry, habitat selection, places and itinerary behavior must survive any renderer change. The wider touch-label interaction, decorative motion, regional species/conservation evidence and Colombia journal remain separate roadmap items.

### Final inventory-test correction

CI 43526436679 passed every map and accessibility check, with 178 full-suite checks passing and one inventory locator failure: streamed markup briefly matched two conservation labels. The test now scopes the same status and species assertions to the accessible Tinamou result card (3c7d1ed). Six repeated phone/desktop checks passed locally; the corrected map-credit build also passed desktop/Firefox resizing and the full public-sitemap accessibility sweep. Full CI 43528648162 subsequently passed before publication. No failed candidate was deployed.

## Historical pre-release evidence and follow-up

Exact CI passed 782 unit tests, 33 priority journeys and 179 full browser checks (211 intentional project skips), plus lint/types/build/audits/budgets/accessibility. Live phone and desktop checks passed actual satellite tiles, exact pan/zoom and background continuity, newly selected region framing and www redirects. Screenshots were inspected. No error/fatal runtime rows appeared in the scoped 10-minute scan.

Desktop doubled-text reflow passed; 320px still overflowed. The remaining causes were the nonwrapping toolbar, footer brand and account CTA. Candidate 036fa286dfd063298cc201894331557438400c12 fixes these and strengthens the regression. It passed the local production build and 14 focused browser checks, with one intentional phone resize skip. Full CI 43568426791 and live confirmation remain required. The earlier local text checks were insufficient; the live finding remains open.

## Final reflow release — 14 November 2026

Published `036fa286dfd063298cc201894331557438400c12` as `dpl_6LNCBWt2DXAVBSHRpQHXPVrAz2ME` after CI 43568426791 passed: 782 unit, 33 priority, 179 full browser checks, 211 intentional full-suite skips, plus lint/types/build/audits/budgets/accessibility. The local production build and 14 focused checks also passed (one intentional phone resize skip).

Live 320px/1365px checks passed real satellite tiles, exact pan/zoom/background continuity, newly selected region framing, doubled-text document width, footer bounds and canonical redirects. Phone and desktop screenshots were inspected. The deployment-scoped 10-minute error/fatal scan returned no rows. The former 147px horizontal overflow is resolved.

Visual follow-up: at doubled text, sticky toolbar/header offsets can still partially cover the world selector near the top of the page. This is separate from the resolved horizontal overflow and remains queued before decorative polish. The specialist South Island camera adapter is also still pending.

Immediate rollback: `dpl_C4u25RDNJZAw1tywRvyxph64PQS3`, source `3c7d1ed6a14057ab5c16295a0118b9a71479e4d6`. Preserve the www-to-aves.bio redirect during any future release or rollback.