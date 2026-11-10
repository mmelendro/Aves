# AVES-061 header contour and small flock preview

10 November 2026, Sydney. Owner requested a simpler visual increment and offered
footprints, small flock or feathers as possible directions. Selected a fine
landscape continuation and three restrained birds in flight. Preview only.
No production publication is authorised by this design choice.

## Baseline and implementation

Freshly fetched maintained main/doc head 30f69252649e77cc2ba4ebedf263509bca97984e,
including published checklist photos. Separate branch feature/aves-061-header-flock.
Candidate: 7c9b26138b4543220ba56072576483cf5360b139.

The existing brand contour continues across the remaining header content width.
The original bird PNGs, wordmark, country subtitles, landscapes and two native
home/destination links are unchanged. A static flock uses a separate fixed-size
SVG so the birds do not stretch with the line. Below 768 CSS pixels only the
simpler contour remains. Both decorations are aria-hidden, unfocusable and
pointer-transparent, with no scripts, animation, media request or dependencies.
No header height, footer, page geography or navigation route changes.

Main global/NZ and Colombia header templates opt in. Australia/private portal
and the unified draft are unchanged. Porting to either remains a later decision.
The feature is based on the main app rather than the blocked consolidation.

## Verification and review gate

149 tests, TypeScript and local production build passed. The source is four
small component edits; no dedicated tests were added for reversible decoration.
Protected hosted build is READY; browser review passed:
dpl_3re8ozbcv1X2VZpq1tXUTAktLSsx,
https://v0-company-landing-page-1st9799tp-mmelendro-9273s-projects.vercel.app.
Desktop composition was reviewed on global, NZ and Colombian headers. The
continuation stays within the header content width and the flock stays 48 x 13
CSS pixels. Header height remains 73 CSS pixels including its border. Actual NZ
country/global logo navigation passed; keyboard Tab moves directly between
existing links with no decorative stop. All three headers passed 340 CSS-pixel
reflow at 400% browser zoom with no horizontal overflow and flock hidden.
Colombia menu opening, Escape and return to global passed. Browser zoom restored
to 100%. Exact 320/390px, very wide/foldable screens and physical devices were
not exercised. No production change. PR: https://github.com/mmelendro/Aves/pull/5.
Physical iPhone/Safari and touch are unverified. Retain country identity and native
browser zoom. No additional spending, account/data/provider changes or production
release. Current production remains checklist runtime 8c7f297 /
dpl_AuSANAJzDMdddtHb53rArqvJqM1B.

Photo previews currently cover only the public NZ checklist. Future country
expansion must audit each destination's catalogue and media credits, reuse one
independent preview pattern, preserve missing-media states and private selections,
and keep parent/subspecies provenance. Do not claim all-country completion.
