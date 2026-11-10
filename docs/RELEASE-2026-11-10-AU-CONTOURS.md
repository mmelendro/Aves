# Australian contextual headers

Owner requested all existing Australian regional headers live before the remaining
Colombian rollout. Nine region routes plus the Australian country landing page
use original native vectors and the same 1.35px skyline / .65px interior line style.
Representative composites follow the current public guide focus, not surveyed
views or a claim to show every part of a state. No new wildlife is asserted.

Queensland: tablelands and sheltered lake; NSW: sandstone coast; Tasmania: wooded
island coast; Victoria: grassland/wetland; South Australia: dunes and lagoon;
Western Australia: woodland/lake; Northern Territory: low floodplain/wetland;
ACT: wooded ranges and river, no ocean; Jervis Bay Territory: heath/headland coast.
The source context is content/region-overviews.json. These nine are all currently
configured public region routes; no extra subregion pages are invented.

Existing country bird, native home/country links, mobile dialog and browser zoom
are preserved. Account/admin/auth navigation retains the original portal header.
No route consolidation, backend, account, database, provider or paid service changes.

Previous AU runtime: 2ff09e92b25a57d89c5966352393bcdb0369db45.
Previous production: dpl_56y3bD1RTE2fngcHBr14obkGu2bx.
Previous checkpoint: checkpoint/2026-11-10-12-media-handoff-australia.
Runtime: 59a8f65207d17c6c1ec5af3e3a11868f44cd832f.
Production: dpl_FNrh2YBNHFjamZk3gPu1WcL5Cb9Z, READY.
Recovery: checkpoint/2026-11-10-17-australia-contours.
294 tests, TypeScript and local/hosted builds passed. All ten public country/region
routes returned 200 and their expected contour. ACT river and South Australia
lagoon were reviewed on desktop. ACT at native 400% zoom (340 CSS pixels) had no
overflow; Menu was 44px high, opened, Escape closed and restored focus. Native
home/country links retained. Physical iPhone/Safari and exact 320/390px remain
unverified. Evidence: evidence-au-contours-live.json.

After release the owner requested an audit. Seventeen unreachable terrain arrays
were pruned from this app's renderer. The targeted geometry contract and strict
unused-local/parameter TypeScript checks pass. This source cleanup is newer than
live runtime; it has not caused an extra production release. The dependency audit
reported zero findings. Main current runtime is 33189e9 / dpl_HdwbDsUDSkfQcK8c2mxgVRe9j6zK.
Next owner task is the registered South Island satellite/selected-area opacity
pilot in the main app, preview first. Main audit/prompt is the authoritative
continuation. No AU accounts/backend or private data changed.
