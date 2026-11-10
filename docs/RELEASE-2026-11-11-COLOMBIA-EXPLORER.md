# Colombia explorer and public navigation · 11 November 2026

LIVE runtime `60e94a4a992aafb80ddacd47ea5a9d19f332d81c`, source tree `4800be795c4451d32fe7a355bfda7082639f9f46`, deployment `dpl_BbUks6FmNboPV1DTmnrRxZ1pRS9J`, READY on aves.bio and www.aves.bio. Maintained branch: webmaster/readiness-2026-11-05.

## Result

Colombia's homepage, eleven regional guides and the legacy explorer share the global/NZ/South Island explorer. The legacy URL no longer renders a hero map plus a second full explorer map. Its obsolete implementation is replaced by the shared shell and a sourced region directory. Each guide starts in its own region with natural Birding in the Caribbean / Eastern Andes wording. Region changes stay in place, update photos, description and planning links, and hide the original page's editorial content when it no longer matches the selected place. Existing private planning and media boundaries remain.

The URL records known public country and regional IDs. Refresh and browser history restore that scope. Invalid regions never create a false selection; region IDs are validated against the chosen country. Unknown countries use the page's known fallback. Existing Next history state and unrelated URL parameters/hash are preserved. No bird wishes, contact details or private brief answers are added to these URLs. South Island layer/guest basket state remains in its existing separate flow. Layer preferences are retained while changing scope in the same mounted page, not promised after reload.

Colombia's existing page-local Spanish control and translated copy rendering are preserved. This does not claim a complete multilingual rollout across every country.

## Validation

191 automated tests pass, including URL round trips for all 23 planning regions, invalid/cross-country IDs, browser history with preserved router state, one map and divider for all eleven Colombian guides, one map/carousel at the legacy route, and existing planning/media/privacy checks. Strict TypeScript and full builds pass; the final hosted build is READY.

Browser preview: Colombia to Caribbean to Eastern Andes, refresh, Back/Forward, direct regional entry, neighbour keyboard activation, divider keyboard changes, full-screen/restore and cross-country transition to the existing South Island layers. Narrow desktop zoom to 337 CSS pixels had equal document/client widths and working keyboard enlargement/restore; physical phone/Safari/touch behavior is not verified by that check.

Live checks: the legacy route renders one map and carousel; Caribbean refresh persists; direct Caribbean opens Birding in the Caribbean; neighbour selection updates to Eastern Andes and browser Back restores Caribbean; enlargement/restore works. Colombia's Spanish switch changes the heading to Explora Colombia and can restore English.

Evidence: [Live Caribbean explorer](evidence/2026-11-11-colombia-unified-live.png).

No real inquiry, email, account save, booking, payment, auth/database, dependency, billing or paid-provider change. The prior US$1 safeguard was unchanged and not freshly inspected. A final-deployment error/fatal log scan over the immediate 15-minute release window found no matching logs; this is a bounded check, not continuous monitoring.

## Next

Converge native Australian entry pages while preserving the independently deployed backend. Existing Australian areas remain selectable from the main explorer. Keep all existing sourced layers and truthful geographic coverage. Finish physical mobile checks, then paused public form/glass refinements and every photographed AU/NZ bird's range/habitat evidence. Include all endemics beyond photographs with verified taxonomy and missing-image states; that audit is not yet complete. Do not merge app branches or replace maintained sources with older WIP trees.
