# AVES-053: South Island habitat soundscape pilot

Published 10 November 2026, Sydney, after the owner's explicit Publish instruction.
Pause after verification, recovery and GitHub sync. This is a South Island pilot,
not a claim that every destination/habitat has recordings.

## Source and deployment

- Main branch: webmaster/readiness-2026-11-05.
- Exact released app source: d34faabc3d09bee8b671b618998606ed06994bea.
- Final Preview: dpl_DKbU5WyMaDbas86Bi7QJinCFc8sF, READY, browser checked.
- Production: dpl_3WU7VC5jQjiN5TWBEGBGxVB82gWB, READY, aliases aves.bio/www.aves.bio.
- Production rebuilt the exact same staged source with its production environment;
  no claim that a Preview artifact was promoted unchanged.
- Starting Git head: 28c69fc. One recent source edit: 5d96fa0 fixed short-height
  media control positioning. Fresh remote history was fetched before changes.
- Previous runtime: 5d96fa0 / dpl_EY3YBYBfbPWZ79yoDN1wcxC4m5DH, checkpoint 12 main.
- Recovery branch: checkpoint/2026-11-10-13-south-island-soundscapes.
- Australia branch/runtime/deployment/documents are unchanged: 2ff09e9 /
  dpl_56y3bD1RTE2fngcHBr14obkGu2bx; AU documentation head 68711fd.

## Visitor experience

A small inline kea control reuses the existing dock's feather buttons, mint/
emerald colours and quiet visual treatment. It follows the existing shared South
Island habitat selector, maps and place/photo controls. No map geometry, region
identity, species coverage, guide links, bird wishes or private brief changed.

Off by default. No audio element or AudioContext exists until explicit Play.
Volume defaults to 25%; pause/Resume, mute/unmute, volume and Off have named
keyboard controls and 44px button targets. Volume and mute survive habitat
changes and pause; Off/unmount closes the mixing context and releases recordings.
A repeated 60-second excerpt is clearly labelled in credits, not presented as
continuous live sound. All habitats labels a forest sampler. Mountains show
Unavailable and create no substitute audio. Other habitats can continue after
prior opt-in when selected, but returning from a hidden/uncertain pause requires
an explicit Resume. No soundscape opt-in is stored or resumed across routes.

One Web Audio controller uses a master gain for user volume/mute and foreground
priority, with at most two voices during a 650ms habitat crossfade. Rapid changes
release stale incoming/retiring voices. Loading failures release media, show a
message and require explicit retry. Returning to the current playing track during
a cancelled transition restores the correct Playing status instead of hanging
on Loading. Audio sources are same-origin static excerpts, not third-party
streams or embeds. All three are 720,710 bytes each, about 721KB, 96kbps stereo.

Foreground Play intent schedules ducking before native Play, retaining the browser
user gesture. A shared main-app coordinator considers all active, audible HTML
media and supported YouTube states. Ambience drops to 8% of the visitor's chosen
level and gently restores only after all foreground media stops. Mute stays zero.
An unavailable/untracked embed pauses ambience and requires explicit Resume after
closing it. The existing programme player ignores ambience in its foreground
pause logic, so ambience never stops the podcast. Its existing public handoff
format, country-based birds and cross-app Resume remain unchanged. Foreground
video initialisation reserves priority, then supported events take over.

The visibility handler stops voices and leaves the control Paused on return.
Navigation/unmount releases sources, nodes, timers and listeners. The foreground
podcast dock can continue within the app while page-local ambience ends.

## Recordings, rights and edits

All three creator pages explicitly publish CC0 1.0. Checked 10 November 2026;
creator is Desmond178. Links and credit remain visible both in the control's
Recording & credits and /credits. CC0 does not imply creator endorsement.
These are representative Canterbury field recordings, not recordings from the
currently selected map location, a list of species present there, present-day
conditions or promised wildlife encounters. No precise wildlife/nest locations.

| Habitat | Recording location | Creator's source | Excerpt start |
| --- | --- | --- | --- |
| Forest & scrub / All sampler | Peel Forest, Canterbury | https://freesound.org/people/Desmond178/sounds/844342/ | 15s |
| Rivers, lakes & wetlands | Awa Awa reserve, Canterbury | https://freesound.org/people/Desmond178/sounds/845785/ | 15s |
| Coasts & offshore waters | Wakanui Beach, Canterbury | https://freesound.org/people/Desmond178/sounds/844480/ | 35s |

Licence: https://creativecommons.org/publicdomain/zero/1.0/ . Creator-published
public HQ MP3 previews were used without signing in or bypassing a download gate.
Each excerpt is 60s, level-adjusted to a -24 LUFS target/-3 dBTP ceiling, with
0.4s edge fades, 44.1kHz stereo and 96kbps MP3 encoding. Runtime loops the excerpt;
no synthetic wildlife, species layering or invented habitat recording. Stream
represents part of the freshwater group; waves represent shore, not underwater
or offshore sound. Mountain recordings are not included. No source asset is
presented as endorsement, a partner or a certified ecotourism experience.

Exact URLs, edit intervals, encoded metadata and SHA-256 hashes are recorded in
content/south-island-soundscape-provenance.json. Source metadata, controller and
UI are separate files so beginners can update rights/coverage without editing
map geometry. Original large preview files are not committed; the three derived
public excerpts and their provenance are. No additional runtime dependency.

## Verification and limits

- 147 tests passed against the released app code. This checkpoint adds one
  supplementary functional test for hidden-page/unknown-embed safety, beyond
  the 146 tests present in the source deployment commit.
- Tests cover source provenance/derived asset hashes, default Off/no audio,
  bounded voice counts, stale load cancellation, crossfade request replacement,
  missing habitat, current-track recovery, load rejection, user volume/mute,
  all-foreground completion, pre-Play intent, hidden/unknown pause and explicit
  Resume/Off preventing later restart. Existing main map/navigation/privacy
  regression tests pass. Australia code was not changed or retested as a new release.
- TypeScript no-emit passed. Local production build passed for the implementation;
  exact final hosted Preview and Production builds provide clean final source
  validation after the synchronous ducking/Muted-status refinement.
- Hosted desktop browser: all three assets loaded/advanced, off starts with zero
  ambience elements, volume 26% and mute survived habitat changes, rapid changes
  stayed within two voices, mountains released all audio, bird calls and podcasts
  triggered Quiet beneath foreground audio and recovered on pause. Supported
  YouTube controls became ready; explicit video Play ducked ambience, and closing
  the dock restored it. YouTube buffered, so sustained video playback/perceived
  mixing quality is not claimed. Loader/network failures are tested in the harness,
  not by forcing a real provider outage in this browser.
- Keyboard Enter, slider ArrowRight, mute/Off and 340 CSS-pixel browser reflow
  passed without horizontal document overflow. Browser zoom is not phone emulation.
  Exact 320/390px, physical iPhone/Safari, native touch/pinch, telephone interruptions,
  perceived listening quality and mobile background behaviour remain unverified.
- Native tab-switch attempts did not reliably produce a hidden document in this
  cloud browser. Visibility safety is verified by the functional harness, not
  claimed as a successful real hidden-tab/iPhone test.
- Live aves.bio: default Off/zero ambience, opt-in stream reaching readyState 4
  and advancing, habitat changes, unavailable mountains, foreground bird-call
  duck/recovery and final Off/zero ambience were checked. Screenshot below shows
  the live forest control and connected habitat selector. Playback was stopped
  after the evidence capture.
- 38 live public route/asset/sitemap checks returned HTTP 200, including credits
  and all three MP3 files served as audio/mpeg with expected byte lengths. XML
  sitemaps retain 42 main/32 AU unique public URLs; account/admin/auth/API routes
  remain excluded. No sitemap data/hierarchy change was fabricated.

[Live screenshot](evidence/2026-11-10-south-island-soundscapes.png).
[Public check report](evidence/2026-11-10-south-island-soundscapes-checks.json).

## Cleanup and recovery

Current handoff, execution prompt, inbox, roadmap, root pointer, architecture and
rollback table now describe this published pilot and remaining limits. Former
current documents are preserved verbatim under archive/2026-11-10-before-aves-053.
Older release reports remain historical evidence, not current instructions.
No obsolete duplicate overlay/player or new SDK was introduced. Main-only media
focus integration is intentional; AU retains the previous implementation until
a separately selected ambience rollout. Temporary processing files are outside Git.

For recovery, roll back only the main project to previous Production
`dpl_EY3YBYBfbPWZ79yoDN1wcxC4m5DH`, or rebuild exact checkpoint 12 main source
`5d96fa02e45fb18304fc07a97bb5084948ab4afd` in the same project. No AU or database
rollback is needed. Do not change DNS, protection, auth, billing or reset shared
branches over another chat's work. Source checkpoint 13 retains this candidate.

No accounts, database policies, guest answers, credentials, proposals, email,
paid AI/privacy entitlement, billing or app consolidation changes. No new spend.
Pause before mountain recordings, further geography or another upgrade.
