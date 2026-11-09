# AVES-068: continuous public browsing and explicit app handoff

Updated 10 November 2026, Sydney. This is the safe continuity increment. A truly
uninterrupted audio/iframe stream across separate document/app roots is not
implemented. The owner approved same-app continuity plus an explicit paused
cross-app Resume. The applications remain independent.

## Source and hosting

| App | Exact published source | Final verified Preview | Production |
| --- | --- | --- | --- |
| Main/global/Colombia/NZ | 5d96fa02e45fb18304fc07a97bb5084948ab4afd | dpl_62nzzo7hndkuinsxzFstrLcLvQzc | dpl_EY3YBYBfbPWZ79yoDN1wcxC4m5DH |
| Australia/shared portal | 2ff09e92b25a57d89c5966352393bcdb0369db45 | dpl_DnvMxuWaGBqjyUC4g4fxVWNrf2qv | dpl_56y3bD1RTE2fngcHBr14obkGu2bx |

Production rebuilds the same exact staged source in its own environment; this
report does not claim a Preview artifact was promoted unchanged. Starting main
head was 9960a35, previous runtime 6856389 / dpl_DQVWzUrsUbzd4Lqg57niLDMikYVw.
Starting AU head was 2f9143a, previous runtime e0c766a /
dpl_67GnFTnfkgrjN2scQL7QWBqvo1zq. Inspected fresh Git history before edits.

## Behaviour and implementation

Both app layouts own the same small dock and public resource catalogue.
While media is open, native public same-app links are enhanced through the
existing Next router after preview handlers. Known route registries are the
allowlist. First-tap previews remain prevented, and modifier/new-tab, middle,
download, hash-only, external, account/auth/API and unknown links remain native.
Existing Next links keep their own handling. Colombia map Enter navigation also
uses the same-app router for known public guides; other-app targets remain full
requests. No map geometry, region identity or guide URL changed.

Crossing main/Australia/My Trips, reloading or leaving the document pauses.
The next same-origin document can offer Resume with the selected programme and
position. Restore creates no audio, iframe or external API. Explicit Resume
starts audio from saved position after metadata loads; video restores its start
position and retains its own Play controls. It never silently starts a restored
video. Changing a resource replaces the old stream; browsing resource cards does
not. Bird calls and other foreground HTML audio pause the programme.

The handoff is a versioned, validated sessionStorage entry with only a known
public catalogue ID, bounded finite seconds, mute flag and timestamp. It expires
after six hours. No arbitrary media URL, page/account URL, guest answer, token,
consent bypass or tracking identifier is stored. Storage failure leaves normal
opt-in playback available. Slow media loading preserves the prior saved position
instead of writing zero. Close deletes the checkpoint. pagehide pauses/saves;
restored cached history re-reads the checkpoint so an old page cannot resurrect a
player closed in the other app. No popups or shared-shell frame were introduced.

The owner requested content-matching birds during implementation. Curated
programme country now selects the image and label independently of the page:
Colombia motmot, New Zealand kea, existing Australian bird, neutral AVES fallback.
Current six curated resources are all New Zealand content, so their player
correctly keeps the kea while browsing Colombia/Australia. No Colombian or
Australian programme was invented. Existing owned brand artwork is reused.
The short-height override that hid the close control beneath fixed navigation
was removed. Compact/expanded styling retains the discreet mint/emerald dock.

## Verification and limits

- 139 main tests and 293 Australia tests passed on release source. Both TypeScript
  no-emit checks passed. Local production builds passed for the continuity
  implementation; exact final hosted candidates provide clean final build/type
  validation after the history, identity and short-height refinements.
- Functional tests cover public-state validation, invalid/expired/extra fields,
  public-route boundaries and AU base path, no-media paused restore, close and
  cached-history closure, preview prevention/modifiers and country/bird identity.
- Hosted browser audio reached readyState 4 and advanced through NZ to Colombia
  and a Colombian guide without resetting. Back retained the dock. Reload showed
  saved seconds and no resource audio/iframe before Resume. Resume advanced from
  saved position. A foreground bird call paused the podcast.
- Documentary opted in through its normal resource control; its supported API
  controls became ready and the iframe remained through navigation/expand/compact.
  YouTube buffered at 0:00 in this cloud browser. Sustained video playback and
  nonzero video resume are unverified. Playlist sub-item/index persistence is
  not implemented; the curated programme ID/start time is retained, not a promise
  to reproduce a later playlist item. Publisher failures retain original-source
  links and do not trigger background retries/autoplay.
- Narrow browser reflow reached 340 CSS pixels with no document horizontal
  overflow. This was browser zoom, not an emulated or physical phone. Exact
  320/390px, iPhone/Safari, real touch/pinch, telephone interruption, mobile/OS
  background playback and controlled slow-network simulation remain unverified.
- Live same-origin integration: South Island → Australia showed paused Resume and
  no resource audio/iframe. Explicit Resume reached readyState 4. Australia →
  Regions kept advancing audio. My Trips reached the existing signed-out
  /account/sign-in page, offered Resume at 1:08 with no media loaded, then resumed
  beyond 1:16. Returning through AVES home offered Resume at 1:23. Closing and
  pressing Back to sign-in left no dock. No authentication/private-brief action.
  An existing AU All destinations Next-link prefetch emitted an RSC fallback
  warning; tested native AVES-home navigation completed. This unrelated prefetch
  behaviour is not described as a clean console or changed in this release.
- Public routes, human/XML sitemaps and private-route exclusions: 34 checks returned HTTP 200. Main XML contains 42 unique URLs and AU 32;
  account/admin/auth/API routes remain excluded. See
  [saved public check report](evidence/2026-11-10-media-continuity-checks.json).
  No route hierarchy or sitemap data was changed.

Separate Preview origins do not share sessionStorage, by design. Live same-origin
integration is verified after publication; previews are not falsely described
as having the production domain's cross-origin session. No private guest brief
or authenticated account operation was edited or used as test data.

[Live Australia handoff evidence](evidence/2026-11-10-media-handoff-australia.png)
shows the NZ programme keeping its kea on the Australian page.

## Cleanup, documentation and recovery

Removed superseded NZ-only runtime comments and isolated public media metadata
rather than duplicating its source in the main app. Shared player, identity,
validation/navigation helpers and catalogue match across branches; keep them in
sync until a separately reviewed shared package is justified. No new dependency.
Current handoff/prompt/inbox/architecture/rollback entry points record this exact
scope. Branch-specific former entry points are preserved verbatim in
archive/2026-11-10-before-aves-068; archives are history, not active instructions.

Recovery branches:
- checkpoint/2026-11-10-12-media-handoff-main
- checkpoint/2026-11-10-12-media-handoff-australia

Recover only the affected project using its previous runtime/deployment above.
No database migration or data rollback is involved. If reverting both, revert
main first and then Australia. Old main ignores the public handoff key; the key
expires or can be cleared by closing the new dock. Do not reset shared branches
over newer commits or change DNS/auth/protection/billing to recover.

No account, database, auth policy, private trip brief, proposal, email, billing,
paid AI, privacy entitlement or application-root merge. Existing no-new-spend and
AI/ZDR deferral remain. Pause before any further increment. Habitat soundscapes,
new programme content and a truly uninterrupted shared shell remain separate.
