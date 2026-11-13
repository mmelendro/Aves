# Shared explorer camera and hydrated text reflow

Status: **awaiting complete CI; not published**. Exact candidate: `85ba58ee885b082bab48018e0fde1d30f46a2f70`. [CI 43526436679](https://github.com/mmelendro/Aves/actions/runs/43526436679).

## Scope

- The main world/country/regional explorer keeps one geographic map mounted across Planning, Satellite, Roads and Topographic. Centre, zoom, geographic bounds, canvas dimensions and selected region remain unchanged by background switches.
- Manual pan/zoom survives switching. Fullscreen and panel resizing retain centre and zoom while adapting the visible extent to the new viewport; unchanged-size notifications no longer interrupt movement. Explicit location selection and Reset can change the camera.
- Planning geography uses the same geographic projection as tiles, with a public-domain Natural Earth background. Country names appear on hover/focus. The original illustrated maps and native links remain in server-rendered/no-JavaScript content.
- The hydrated homepage fits narrow screens at doubled text size: the header can wrap, branding can shrink, the introductory grid has a bounded column, and inactive tooltips no longer create invisible horizontal overflow.
- The existing Search link remains in the published source. Search-input, About/team/creator/footer and admin drafts are excluded.

Implementation: `997fde8` (text reflow), `37afecd` (camera/geography), `0d8ab5e` (updated history/enquiry control locators, preserving the same assertions), `85ba58e` (accessible map-credit click targets).

## Verification observed locally

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

Publication remains gated on complete CI and a READY build of the exact passing commit. After publication, verify real satellite tiles, both background-switch directions, newly selected region framing, hydrated doubled-text reflow, canonical redirects and scoped runtime logs.

Rollback: `dpl_7BwVzLgpDKJvWfCHGHMgjieihJdy`, source `a4acaedc130548eb3e94af9f86b87674fb3a8e4f`.

## Remaining scope

The specialist South Island habitat/itinerary map still has its own illustrated renderer and is the next R04 increment. Its LCDB/DOC geometry, habitat selection, places and itinerary behavior must survive any renderer change. The wider touch-label interaction, decorative motion, regional species/conservation evidence and Colombia journal remain separate roadmap items.
