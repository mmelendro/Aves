# Session-only bird-call following

10 November 2026. AVES-047 source preview, stacked after scroll-responsive-flock.

Each main-app carousel offers an explicit “Listen as you change birds” control,
off by default. It starts the selected recording in the activation handler and
reuses the carousel's existing audio element and foreground-media coordination.
Manual next/previous/picker/swipe choices stop the previous recording before
starting the next. Calls do not loop and slides do not advance automatically.
Missing recordings keep the preference armed with a clear message; a later
recorded bird can continue. Playback rejection disables following and requires a
fresh deliberate activation. Volume/mute survive switches, including missing calls.
The sound button also stops following. Other native foreground playback, leaving
the viewer or hiding the page stops listening; returning never auto-resumes it.

The same audio element retains recording attribution. No new downloads on initial
load, accounts, providers, dependencies or persistence. Existing media-dock native
play coordination pauses supported embeds; unknown embeds remain an existing
playback limitation. This slice does not implement loudness normalization, fades,
continuous cross-document sound, automatic timed listening, or Australian parity.

169 automated checks and strict TypeScript passed, including six behavior tests
for opt-in, native level retention, races, missing sources, rejection and disposal.
Production build completion is recorded in the PR/checkpoint. Browser autoplay,
mobile/touch and exact candidate audio/ambience interactions remain unverified.
Production remains unchanged and release requires separate explicit approval.

Preview access remains rejected by automatic review. Vercel read-only records
confirmed aves.bio and www.aves.bio belong to prj_ZKEHgaFrywRyoEo9IfSFcln9k8pv,
whose internal name is v0-company-landing-page; the prior candidate target is null
(preview). Review still requires explicit owner authorization for that origin.
No alternative browser/deployment route was attempted after the renewed denial.
