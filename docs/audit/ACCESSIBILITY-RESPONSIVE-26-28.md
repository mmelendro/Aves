# Accessibility and responsive map checks: items 26 to 28

## Scope and delivery

Source implementation: `845f4e58163944420fe2fcbc708cbe9a7fa41c83` on `feature/field-guide-card`.

- Item 26: add a visible base focus treatment; automated WCAG A/AA rule scans for the public sitemap and representative journeys, plus keyboard skip-link, modal Escape and focus-return checks. Automated scanning is not a conformance certification or a substitute for screen-reader review.
- Item 27: pinned Playwright and axe tooling, six projects (320px phone, 390px phone, landscape phone, tablet, Chromium desktop and Firefox desktop), isolated local production server, and a read-only GitHub Actions workflow. Representative pages run through every project. A full public-sitemap accessibility scan runs once on desktop. No authenticated browser state, customer fixtures, private writes or third-party browsing are used.
- Item 28: reduce the default narrow guide frame from the fixed 60rem override to a viewport-aware minimum of 40rem. Preserve the real map surface and separately mounted bird-return cue. Permit intrinsic map content to scroll instead of clipping it. In expanded maps, keep the close/zoom toolbar above the canvas and reserve usable canvas space even in short landscape windows. Existing camera and selection state remain mounted.

## Verification

Published runtime: `edffc49aa462045693a5839d8ef08859764f4a28`. Deployment: `dpl_HZwyZT4z835C9eNxEvo4pgWvhrNM`, both custom domains. [Verified CI run](https://github.com/mmelendro/Aves/actions/runs/43278342669): 704 unit/component tests, strict TypeScript, zero-error lint and production build pass. All 61 executed browser checks pass, including the 78-route desktop accessibility scan. Five duplicate sitemap scans are deliberately skipped. No axe violations remain in the scanned states.

The first scans exposed real contrast, touch-target, unlabelled-control and mobile-obstruction defects. Shared components and content were corrected; no accessibility rules were disabled. Region polygons retain named activation and pins no longer create tiny overlapping duplicate controls. Browser testing runs on the independent CI runner because local Chromium cannot launch under the workspace socket restrictions.

The suite declares 66 project/test combinations: 60 representative journey combinations plus one full sitemap audit and five deliberate skips of that full audit outside the desktop project. It measures reflow at narrow widths and 200% CSS text sizing, modal bounds, minimum canvas height, visible close control and retained return cues. This does not measure physical Safari pinch/drag behaviour, actual operating-system text scaling or every assistive-technology combination.

## Run

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm exec playwright install --with-deps chromium firefox
pnpm test:browser
```

Use the supplied isolated server configuration. Do not point this suite at production accounts or add real browser authentication state to test artifacts.

## References

- https://playwright.dev/docs/test-configuration
- https://playwright.dev/docs/ci-intro
- https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
