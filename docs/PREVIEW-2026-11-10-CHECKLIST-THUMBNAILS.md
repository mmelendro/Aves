# New Zealand checklist thumbnails

Preview only. The public picker renders a visible 64px reference thumbnail next to
its independent checkbox. Opening the image shows source, creator, licence and
modifications without selecting a bird. The existing larger curated photos remain
preferred in the detail view. New references use 120px assets; existing curated photographs remain unchanged.
Both image failure and unresolved identity/rights have an honest text fallback.
Illustrations are explicitly labelled. Search, selected-only filtering, paging,
existing stable bird IDs and the parent's selection/storage remain unchanged.

The current combined registry covers 362 of 377 living checklist entries. Fifteen
entries remain pending. The raw candidate manifest also retains the reason for a
missing candidate already covered by an existing curated photo; the UI count is
the combined registry, not the candidate count. Every added asset is local, with
per-file source rights and SHA-256 integrity. No client Wikimedia request is needed.
The credits page also has a complete source/licence directory. The adapter keeps
asset identity separate from the picker so later illustrations or 3D presentation
can use the same stable checklist IDs without changing saved wishes.

## Review and limitations

Candidates came from exact scientific-name/Wikidata article matches and individually
reviewed Commons alternatives. Visual contact sheets caught map-only images and
historical drawings. Taxon splits and unidentified records were withheld rather
than quietly using a different species. Source names may retain a former genus or
gender ending; original image provenance stays linked. No claim of local presence,
current access, sex, plumage or a guaranteed sighting follows from a reference image.

Automatic approval review rejected an upload because of embedded photographer
contact information. Rejected/contact-bearing candidates were withheld. Separately
sourced alternatives were checked without copying that contact/GPS metadata.
Remaining unsafe candidates are pending, not re-encoded or routed around review.
Image metadata was checked with Pillow EXIF/IPTC inspection before final upload.

The separate Australia/shared-account picker has not been ported in this public
increment. That is a bounded next UI task with private save/reopen/privacy checks.
No account/database changes, remote media lookup, paid service or production release.

158 tests, strict TypeScript and a local production build passed before the final
metadata-safe alternatives. Final file integrity, hosted build and browser checks
will be appended below. Physical Safari, true touch and exact 320/390px remain
unverified.

Five further candidates were withheld after automatic review identified embedded
non-commercial/all-rights-reserved claims or personal metadata. No rejected asset
is included. Existing curated sources remain separate and unchanged.

## Final hosted acceptance

Combined runtime source: 1b795eb15583e2ee98a6fc0fa5260b6e2af78f06.
Deployment: dpl_61sAL591eVz1czja6qo5yyYp2n38, READY.
https://v0-company-landing-page-k46nvktfq-mmelendro-9273s-projects.vercel.app/new-zealand/south-island

162 combined tests, strict TypeScript and a local build passed. The final change
replaced only one image and its provenance; the media integrity tests passed again
and its final hosted build passed. Browser verified loaded 64px controls, five
Apteryx references, search and selected-only filtering, viewing without selection,
labelled illustration, unidentified-crane pending state, full credits and Escape
focus return. The public directory has 331 new source rows and 662 licence/source
links. The final kiwi reference shows the bird clearly and retains CC BY 3.0/source.

Native 400% browser zoom gave 340 CSS pixels with no horizontal overflow and loaded
thumbnail controls. Integrated Arthur’s Pass selection showed the kea/alpine header;
explicit Satellite worked in both existing map instances. Earlier constituent
checks cover 0/50/100% opacity and unchanged camera. No private save was exercised.
Physical Safari and true pinch/swipe remain unverified.

Proof images: aves-checklist-thumbnails-preview.png and
aves-checklist-thumbnails-340px.png. These are actual browser screenshots.
Production remains at the recorded 33189e9 / 59a8f65 baselines.
