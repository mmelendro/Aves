# AVES current handoff

Updated 10 November 2026, Sydney. This is the single current release/status entry
point. Detailed criteria and smaller requests remain in the linked prompt/inbox.
Archives and older release reports record history, not current execution orders.

## Current instruction

The owner selected AVES-039 checklist photo previews while C3 is blocked.
Work is isolated on feature/aves-039-checklist-photos, based on the maintained
main app, with draft PR #4. See [the photo checkpoint](CHECKPOINT-2026-11-10-CHECKLIST-PHOTOS.md).
This is a preview-only increment. Production release still needs explicit approval.

C1a/C1b/C1c/C1d are complete in the unified draft. Candidate runtime:
6c7cb0bba913ed4c1a0315c5fa89f690519d792b. C2 protected read-only preview:
https://aves-australia-eqy20tn17-mmelendro-9273s-projects.vercel.app (dpl_4VBHrNqq7XYUCb8Da9bc9oUuHaqn).
423 tests, 22 isolated native checks, TypeScript and final local/hosted builds
passed. All 74 public pages passed the 82-request hosted matrix; 16 additional
asset/redirect checks passed. Desktop/keyboard and 340 CSS-pixel zoom reflow were
reviewed, with physical Safari, exact 320/390px and real background/telephone
behaviour still unverified. See [CHECKPOINT-2026-11-10-UNIFIED-C1D-C2.md](CHECKPOINT-2026-11-10-UNIFIED-C1D-C2.md).

C3 is partial. The owner authorised live synthetic test accounts/records and
confirmed the test email. Ten live database transaction check groups passed and
rolled back. One real account received confirmation mail in the owner's inbox,
signed in and passed five live private-service check groups. Its three destination
drafts and account were removed; sessions revoked; zero fixtures remain. No
customer records, hosted schema/policies/provider settings or production code
changed. Native results are not hosted unified private acceptance.

The exact unified candidate still needs a protected production-mode staging
build and hosted authenticated browser/provider/owner-delivery/session checks.
The connector lacks an explicit skip-domain staging control. The owner approved
inspecting Redeploy; its Production dialog assigned the live Australia domain and
had no skip-domain option, so it was cancelled. The owner then authorised CLI
sign-in and Vercel showed Authorization Successful, but workspace network policy
blocked the CLI connection to api.vercel.com before token exchange completed.
This is a network blocker, not missing owner approval. Do not repeat approval
requests, weaken network controls or silently assign live domains. [C3 scope and remaining gate](C3-CONTROLLED-HOSTED-ACCEPTANCE-PROPOSAL.md).
C4 production cutover and C5 retirement remain separately unapproved. Preserve
both production apps and rollback anchors. No paid provisioning or AI requests.

## Published applications

| App | Branch | Runtime | Production | Recovery |
| --- | --- | --- | --- | --- |
| Global/Colombia/NZ | webmaster/readiness-2026-11-05 | d34faabc3d09bee8b671b618998606ed06994bea | dpl_3WU7VC5jQjiN5TWBEGBGxVB82gWB | checkpoint/2026-11-10-13-south-island-soundscapes |
| Australia/shared portal | australia/preview | 2ff09e92b25a57d89c5966352393bcdb0369db45 | dpl_56y3bD1RTE2fngcHBr14obkGu2bx | checkpoint/2026-11-10-12-media-handoff-australia |

Previous main: 5d96fa0 / dpl_EY3YBYBfbPWZ79yoDN1wcxC4m5DH, checkpoint 12.
Previous AU: e0c766a / dpl_67GnFTnfkgrjN2scQL7QWBqvo1zq, checkpoint 04.
These are independent app roots. This soundscape release changes only the main app. Australia/shared portal
code, deployment and documents are unchanged. No app merge or account change.
Inspect fresh Git history before edits. Documentation heads may be newer than
runtime commits. See [the release](RELEASE-2026-11-10-SOUTH-ISLAND-SOUNDSCAPES.md) and
[recovery instructions](ROLLBACK-CHECKPOINTS.md).

## AVES-053 pilot and verification limits

Three authentic creator-published CC0 recordings represent Canterbury forest,
stream and coast habitats. They are not live sound, selected-place soundtracks,
local species inventories or guaranteed visitor experiences. Mountains remain
unavailable. All habitats uses a clearly labelled forest sampler. The kea identity
follows this NZ content. Every excerpt is 60 seconds/about 721KB, edited with
level adjustment and short edge fades; repeated only after explicit Play.
No ambience audio/context is created before opt-in. No synthetic habitat audio.

Existing habitat state drives selection; one Web Audio controller crossfades at
most two voices and cancels stale requests. Preserve volume/mute, duck before
foreground Play and restore only after all foreground media stops. Unsupported
embed state, hidden document, Off or navigation stops ambience; hidden/uncertain
recovery requires explicit Resume. The existing podcast/video dock stays separate
foreground media and retains AVES-068 route continuity. No new dependency/service.

147 tests against released application code passed, including a supplementary
visibility/unknown-embed safety test saved with this checkpoint. TypeScript and
local/final hosted builds passed. Staged browser checks covered opt-in, all three
tracks, rapid transitions, unavailable mountains, volume/mute, bird/podcast/video
priority, route cleanup/Back, keyboard and 340 CSS-pixel reflow without horizontal
overflow. Native hidden-tab transitions could not be reliably exercised by this
cloud browser, which reported documents visible; the safety handler is tested
in the functional harness. Physical iPhone/Safari, exact 320/390px, native touch,
perceived listening quality and real background/telephone behaviour are unverified.
YouTube buffering limits sustained-video verification. See release/live evidence.

## Foundation to preserve

| Area | Published scope | Still incomplete |
| --- | --- | --- |
| Global discovery | Equal Earth map, connected country/region birds, first-tap preview, responsive dividers, Info overlays, homepage country-card consistency | Complete globe-like continuity through every detail level |
| Colombia | English-default homepage with page-local Spanish switch, planning artwork/boundaries, eleven guides, AVES-066 whole-shape card interaction | Site-wide translation and wider map redesign |
| South Island discovery | Shared four-place/five-photo landscape carousel, thirty sourced bird-media profiles, habitat/map/photo connection, zoom/pan/reset/scale | Several photos for every place/habitat and North Island parity |
| South Island layers | Adjustable historical satellite plus ecosystem colours, nine parks, DOC conservation and curated public-place/business references | Full geographic coverage and country/subregion rollout |
| Full-screen media | South Island bird/place complete-photo pilot, controls and credits preserved | Every map/card and deeper source-supported photo zoom |
| Resources/player | Six-resource carousel, field-guide links, content-matched dock, public same-app continuity and explicit paused main/AU/My Trips handoff | Truly uninterrupted cross-document shell, more country programmes, wider AVES-053 soundscape coverage |
| Habitat soundscapes | South Island forest/stream/coast opt-in pilot, provenance and shared foreground ducking | Mountain recordings, other regions and physical-device verification |
| Private planning | Existing Google sign-in, private briefs/wishes, budgets, explicit sharing, manual proposals and email-update consent | eBird-connected wishlist, saved places, broader community/marketplace and successful paid AI generation |

Source detail remains explicit: NASA satellite is a historical 2004 overview;
LCDB imagery 2023/24 is generalised to about 2 km. Public place markers are
approximate references, not nests, access rights, certifications, AVES partners
or promised sightings. NZ national checklist has 377 extant species; it does
not establish local South Island occurrence. Keep licensed credits/provenance.

The two app layouts now share the public media catalogue and player. Document
changes pause; Resume is explicit. All current programmes are NZ content and keep
the kea when browsing elsewhere. Programme country determines the bird: Colombia
motmot, NZ kea, existing Australian bird. This does not invent programmes.
YouTube buffered during checks; sustained video/nonzero video resume, playlist
sub-item restoration and physical Safari/device behaviour remain unverified.

## Owner-selected backlog after consolidation

C1d is complete; finish C3 acceptance, separately approved C4 and gated C5. C2 public preview evidence and device limits are recorded. Then prioritise private
saved places, species-origin filters, checklist photos, South Island orientation,
verified places/conservation/lodges/travel context, uninterrupted public playback,
continuous bird calls, map updates and design updates, in that order. See the
owner-selected table in [AGILE-PLAN.md](AGILE-PLAN.md) for IDs and boundaries.
Other retained requests remain queued. Each broad map/design area must be split
into bounded increments; this selection does not approve a production release.

## Privacy and spending gates

No new spend, paid AI retries, billing/security changes, broad secret pulls,
hosted account/database policy changes, customer-record edits or production
cutover. The owner authorised controlled synthetic live test accounts/records;
that authorisation persists for necessary C3 fixtures and their scoped cleanup.
Do not infer permission to edit customer records or weaken preview protections.
Source work must remain within the owner-selected consolidation sequence. AI drafting 059 is deferred at the owner's direction;
the previously verified blocker was ZDR entitlement on free Gateway credits.
Do not buy credits, upgrade or relax ZDR/no-training. Manual proposals remain.
Do not expose guest data or secrets in GitHub, logs, screenshots or URLs, and do
not contact people, send proposals or book without relevant authorisation.

## Document navigation and history

- [NEXT-WEEK-PROMPT.md](NEXT-WEEK-PROMPT.md): execution rules and retained programme.
- [AVES-CHANGE-INBOX.md](AVES-CHANGE-INBOX.md): owner requests/acceptance.
- [ROADMAP-DETAILS.md](ROADMAP-DETAILS.md): detailed criteria, not runtime authority.
- [SITE-ARCHITECTURE.md](SITE-ARCHITECTURE.md): app boundaries and paused-handoff decision.
- [MAP-LAYER-ROLLOUT.md](MAP-LAYER-ROLLOUT.md): source/projection gates, no automatic rollout.
- [Pre-053 archive](archive/2026-11-10-before-aves-053/README.md): previous current entry points.
- [Pre-068 archive](archive/2026-11-10-before-aves-068/README.md): branch-specific former entry points.

Reconcile current sections instead of stacking another competing latest notice.
Continue the selected C sequence within its gates before the owner-selected feature queue.
