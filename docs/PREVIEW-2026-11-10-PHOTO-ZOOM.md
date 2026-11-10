# South Island photograph zoom pilot

10 November 2026. Preview source only, no production release approved.

AVES-051 adds one shared photo interaction to the existing South Island bird and
landscape full-screen viewers. Plus/minus, reset, arrow-key panning and an explicit
Move control operate on the photograph while captions, source links, audio,
selection and carousel controls remain mounted and stationary. Move intentionally
captures drag/pinch gestures only inside the photograph; ordinary page gestures
remain native elsewhere. Closing or resizing resets the photograph. Changing
slides starts the new photograph at fit size. Escape/focus return remains owned
by the existing native dialog.

Magnification is capped at the smaller of 2x and the loaded asset's native-pixel
limit for its contained fit. Small/failed images therefore cannot advertise detail
they do not have. No new files, source rights, larger downloads or providers are
introduced. This does not certify the entire photography/media programme.

Validation: 163 automated checks and strict TypeScript passed. The production-mode
build compiled and generated all 56 static pages; final completion is recorded in
the sprint checkpoint. Actual candidate browser review, physical Safari/touch,
320/390px and assistive-technology acceptance remain pending.

Existing map-style preview 4ddab4a / dpl_9deNfwG42yR3GzMJ7tFxjnvUzbE4 was inspected
on /new-zealand: modal geometry 1331 by 904 at desktop, zoom 1.0 to 1.3, reset,
Escape and return focus to Enlarge passed. It is the auxiliary aves project, not
proof of the intended main project's current deployment. Colombia/Australia styling
and narrow layouts still need exact-candidate acceptance. No map release claimed.

A request for an additional main-app preview was rejected by automatic review:
it could not establish that v0-company-landing-page was the AVES project or that
the action was preview-only under the retained publishing gate. No alternative
manual deployment was attempted. Continue source work and existing-preview checks.
