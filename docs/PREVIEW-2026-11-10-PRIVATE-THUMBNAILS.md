# Private New Zealand bird references: preview candidate

10 November 2026. PR #11 targets australia/preview. Source runtime candidate:
6e802f01dd9ea8cc32b6b8b2d0ed2b4450023a55. Tree:
993b4ed5de5d95e7eaa93f228cacb7957f23d6cf.

## Scope

The existing private NZ wish-list picker now has 362 reference thumbnails out of
377 entries, with explicit image-pending states for fifteen. Image controls are
separate non-submit buttons beside the selection labels. Existing Radix Dialog
provides the source/credit viewer, with illustration labels, creator, original
source, licence and modifications. No new dependency, schema, account/provider,
API or storage change. The planner continues saving only existing stable bird IDs.
Images use local /australia asset URLs and no-referrer; source links suppress the
referrer. Viewing does not select, submit or save a plan. Unavailable images leave
selection usable. Reference images do not establish local presence or sightings.

358 assets reuse existing published repository blobs. Four alternative Commons
sources were separately checked after the original four failed metadata preflight
(contact/licence flags); those originals are excluded from this port. The alternate
Semipalmated Plover, Ruddy Turnstone, Sanderling and Kea were visually reviewed and
have original source/creator/compatible CC credits. No flagged payload was stripped,
re-encoded or uploaded as a workaround. All 362 exact file hashes are in the public
reference manifest. No private plan, account or visitor data is in that manifest.

## Evidence and limits

299 tests passed (the previous 296 plus two media tests and an editor regression).
Every reference matches a checklist parent species ID and a local SHA-256, with
required source/licence/creator/modification fields. Strict TypeScript including
unused checks and the final local production build passed. No temporary rehearsal
route is included in the Git tree.

The editor regression executes the real editor handlers with mocked account API
transport: choice changes make no request until explicit submit, only bird IDs are
serialized, and reopening a returned draft restores those IDs. This is contract
coverage, not an actual hosted account/database save/reopen test.

The initial local browser rehearsal was blocked. A separate protected, preview-only
public component check subsequently verified the exact unchanged picker and photo
components from this candidate. It uses in-memory choices only, with no account,
plan editor, save controls, API calls or private data. Its route is fenced to
VERCEL_ENV=preview and is on test/private-picker-ui-check, not PR #11. Do not merge
that test-only branch or use it as a production release candidate.

Component check source: 84e47f998f3685a44175bd9ebd533714624d3739.
Hosted build READY: dpl_7BduHZXZqKffSv1boGWGwFAGxLDw.
URL: https://aves-australia-qatqe1red-mmelendro-9273s-projects.vercel.app/australia/ui-checks/bird-picker
Its strict TypeScript check passed. Git comparison confirmed the production
candidate's components are identical and account/API/auth/Supabase files unchanged.

| Browser check | Observed result |
| --- | --- |
| Desktop list | Five Apteryx references loaded; photo/illustration labels retained |
| View without select | Opening and closing Kiwi/Kea/Tokoeka references did not add choices |
| Credits | Real source/licence/creator/modification text visible for photos and illustration |
| Keyboard | Tab and Shift+Tab remained in dialog; Escape closed it and restored thumbnail focus |
| Search and filtering | Kea and scientific-name search worked; selected-only returned the two chosen IDs |
| Missing image | California Quail remained selectable with Image pending; removal chips worked |
| 340 CSS-pixel native zoom | Active tab width 340, height 234; no horizontal overflow in the page/list/dialog |
| Short dialog scrolling | PageDown reached credits; dialog scrollTop 291 of 553px content with 209px client height |

Desktop width was 1363 CSS pixels. At 340, list-row client/scroll widths matched
at 265px; dialog client/scroll widths matched at 311px, outer width about 317px.
This is native-zoom reflow and short-frame coverage, not a physical phone test.
Exact 320/390 viewport emulation was unavailable because the browser organisation
blocks DevTools. No workaround was attempted. Physical Safari/touch remain unverified.
Sampled error entries originated in the browser extension's metadata messaging.

Evidence: [desktop](evidence/private-picker/desktop.png),
[340px scrolling dialog](evidence/private-picker/dialog-340.png).

Actual signed-in private-shell save/reopen/edit remains unverified. The in-memory
component check does not establish server persistence, account permissions or the
private editor's surrounding layout. Existing editor transport tests remain mocked.
Do not weaken auth, publish an editor fixture or inspect customer plans for evidence.

## Hosting and release

Preview requested on the Australia/shared-portal project prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv,
using mmelendro@gmail.com; dpl_3jMXJjr97LPpHwig2T6X3VwTWA36.
Preview URL: https://aves-australia-jmaao1dxg-mmelendro-9273s-projects.vercel.app/australia/account?country=new-zealand&region=south-island
Four separately sourced new images returned HTTP 200 image/jpeg with matching
local file lengths (2724, 4790, 5146 and 7482 bytes) via authenticated Vercel fetch.
All 362 SHA-256 checks were local. The unauthenticated bulk hosted check reached
Vercel SSO and was stopped; it did not verify all hosted images.

The hosted build is READY. Authenticated HTTP inspection of /australia/account
returns 307 to the canonical live /account, private/no-store and noindex/nofollow/
noarchive. Browser navigation to the private account URL redirects
the signed-out visitor to the canonical live sign-in, preserving NZ/South Island
intent. This confirms canonical routing and the eventual sign-in boundary, not isolated
private preview editor acceptance.
The existing canonical redirect also means ordinary sign-in would return to live
code, so it cannot establish this candidate's saved-plan behaviour. Do not count a
production login as a preview test or change auth settings merely to bypass it.
Production is unchanged at 34037f0 /
dpl_DX5Rx141ExqZsMRE4PBfVg9jEZDg, recovery checkpoint 19. Main is unchanged at
a3445b7 / dpl_8TFWkxR8BVDmgTzDmHRpxcypMTpi, recovery checkpoint 20.
Further production release needs explicit approval. PR #11 remains draft.

Next: resolve the signed-in candidate acceptance gate, then continue the fifteen unresolved image
sources or port Australia map enlargement as its own bounded increment. Cornell
commercial permission still gates eBird. No infrastructure/C3 retry or consolidation.
