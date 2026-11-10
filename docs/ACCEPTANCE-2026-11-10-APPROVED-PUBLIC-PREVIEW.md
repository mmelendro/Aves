# Approved public preview acceptance, 10 November 2026

The owner explicitly approved read-only browser testing of AVES project
prj_ZKEHgaFrywRyoEo9IfSFcln9k8pv (v0-company-landing-page), without production
publishing. Browser access succeeded after that approval. Prior access blocks are
historical; do not request the same permission again for this scope.

## Candidates

- Origin/listening/photo/flock stack: source 1816c143,
  dpl_AQ9LGcDaPQeMMnujWrPMXMV55Dnf,
  https://v0-company-landing-page-6d49xtvqi-mmelendro-9273s-projects.vercel.app/new-zealand/south-island.
- Sea-context stack: docs head 1b6517a (runtime 6ec30f7),
  dpl_EoDSCzdHWpLkBgBwAFXZ5K2YtaWB,
  https://v0-company-landing-page-iqi2nq4ud-mmelendro-9273s-projects.vercel.app/new-zealand/south-island.

## Observed passes

1. Desktop bird photograph opens as a native modal. Zoom advances to 1.25
   (display 1.3x), with an actual image-layer transform; object-fit remains contain.
   Reset and slide changes restore fit, and Escape returns focus to Expand.
2. Landscape viewer keeps source/creator links. Its loaded image reaches native
   resolution at fit size on desktop, correctly disabling further magnification
   with “Full available resolution”. Next landscape changes the credit and resets
   the view. Escape returns focus to its Expand button.
3. Explicit listening starts the selected call; Next switches the audio element's
   label/source to the next bird. The local fantail recording reached readyState 4
   and currentTime 8.047 seconds. Stop leaves no foreground media playing. This is
   browser playback-state evidence, not perceived loudness/acoustic certification.
4. Origin choices show 377 total, 342 native including 93 endemic, 35 introduced
   and zero unknown. Introduced yields 35 rows; “mallard” plus introduced yields
   one matching Mallard. Unknown yields the explicit empty state. No wish-list
   boxes were selected and no account/API/save operation was exercised.
5. Flock responds to actual scroll: at scrollY 0, offsets are zero; at 819, x is
   -3.2938px and y .9582px; returning to zero restores both. Sterna striata remains
   the regional species through this test. No species change was introduced by
   scrolling.
6. Native Chrome zoom produces innerWidth 340 and innerHeight 234, with no page
   horizontal overflow (document scrollWidth 337). Photo zoom/reset controls remain
   rendered and usable, and Escape/focus return works. This is a narrow native-zoom
   reflow check, not an exact 320/390px or physical phone/touch test.
7. Latest sea preview renders Tasman Sea and South Pacific Ocean in surrounding
   water, with the unchanged land artwork. Expanded map reset and Escape/focus
   return work. Labels/scale remain legible in the sampled desktop view.
8. Final state: normal browser zoom (innerWidth 1363), zero modal dialogs, zero
   playing foreground elements, focus on Enlarge South Island habitat map.

## Required fix before release

At 340 CSS-pixel width and 234 CSS-pixel height, the photograph toolbar crowds
existing controls. Its first button starts at x52.5/y56.75 while the wish-list
control occupies the adjoining left strip; the full toolbar also approaches the
close control on the right. The screenshot shows overlapping edges/limited clear
space. Move or reserve toolbar space in short-height full-screen layouts, then
repeat keyboard/focus, credit visibility, no-horizontal-overflow and zoom tests.
Do not mark the entire photo viewer visually accepted before that correction.
The full-screen bird dialog is vertically scrollable (936px viewport/999px content
in the desktop sample); reachability should be rechecked with the toolbar fix.

## Remaining limits

Physical Safari/touch/pinch, exact 320/390px, reduced-motion preference changes,
real background/telephone interruption, missing-call and rejected-autoplay browser
paths, end-to-end ambience ducking, private candidate save/reopen and private shell
remain unverified. Those automated/source checks do not replace hosted browser
acceptance. Browser logs returned extension metadata errors; these are not evidence
of an AVES application failure or a clean full application error scan.

No production release, account writes, guest data access, provider/billing change,
new deployment request or app consolidation was performed. UI filters, playback
and native browser zoom were exercised only for the approved preview review.
