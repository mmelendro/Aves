# Short-screen photograph control spacing

10 November 2026. Corrects the spacing defect found during approved public-preview
acceptance. No production release.

The zoom toolbar keeps its dedicated row below the existing top controls instead
of moving upward from the caption area when the viewport is short. Expanded bird
and landscape frames reserve at least 32rem in windows 500px high or shorter;
the native modal scrolls vertically. This separates the heart, habitat, zoom,
navigation and caption rows while retaining 44px targets, original image fit,
native resolution cap, mounted media and Escape/focus restoration. Desktop
heights and ordinary inline cards retain their previous layout.

172 tests, strict TypeScript and whitespace checks passed. Production build and
exact candidate 340x234 retest are recorded with the PR/checkpoint. Physical touch
and exact 320/390px remain separate limits. No media, dependencies, providers,
accounts, storage, runtime permissions or production aliases changed.

Saved-place audit: the current private questionnaire has birdIds and budget but
no structured placeIds. Its existing message field explicitly supports additional
place ideas and is saved with the private brief. A deliberate place-note import
could reuse that field, but structured saved-place IDs need form/API/database
validation and separate hosted save/reopen acceptance. Do not mislabel a public
tab-only basket as a server-confirmed private save or silently overwrite notes.
