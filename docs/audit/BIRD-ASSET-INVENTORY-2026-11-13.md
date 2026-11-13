# Bird asset inventory, 13 November 2026

Roadmap item 88 remains partial. The inventory and reusable asset contract are prepared. No editable bird model or newly licensed 3D pilot is available for release.

## Verified repository assets

The tracked repository and ignored checkout were checked for MP4, WebM, MOV, GLB, glTF, OBJ, FBX, Blender, USDZ, STL and PLY files. None were present. This is a checkout inventory, not proof that the owner's original files no longer exist.

The existing `public/images/brand` directory contains 29 raster files. `content/regional-brand-birds.json` maps representative identities to illustrations and explicitly labels them as generated artwork, not documentary identification plates. These files are static fallback candidates. They are not editable models, animation rigs or proof of species accuracy. Their original generation and reuse documentation still need review before conversion into collectible assets.

| Candidate | Stable species | Current file | Type and size | Source and rights | Review result |
| --- | --- | --- | --- | --- | --- |
| Andean Motmot | `co-1e6524c056e6`, Momotus aequatorialis | `public/images/brand/aves-colombia-bird.png` | PNG, 1,254 × 1,254, 685,475 bytes | Existing AVES generated brand artwork. No independent model creator or model licence recorded. | Useful existing static brand image. Not a model. Anatomy, generation provenance and reuse terms need review for a collectible pilot. |
| Andean Motmot reference photograph | `co-1e6524c056e6`, Momotus aequatorialis | `public/images/blue-crowned-motmot-new.jpg` | JPEG, 6,000 × 4,000, 895,794 bytes | Martin Meléndro. `content/image-credits.json` records an original AVES contribution with no public reuse licence supplied. | Existing photograph, not a model. Attribution does not grant permission to derive or distribute a 3D asset. No new permission is claimed. |

The photograph's legacy filename includes “blue-crowned”. Its catalogue and credit record identify Andean Motmot. Future assets must use the stable species record and reviewed scientific name rather than inferring taxonomy from the filename.

## Original asset recovery

Earlier product notes refer to four owner-supplied 3D MP4 references. The original filenames and bytes were not recovered in this bounded review. Accessible Drive and saved-file searches did not return a matching bird video or editable model. Generic unrelated media were not treated as bird assets, and private folders or links are not published here.

The previously used modelling web app remains unidentified. An older note mentions Gamma for a 3D-style motmot marketing image. That evidence does not identify a separate modelling app, recover editable geometry or establish a model licence. No app is guessed.

## Contract for the first reviewed pilot

Each accepted asset needs these fields before publication:

| Field | Required evidence |
| --- | --- |
| Asset identity | Stable asset ID, version and stable national species ID, with scientific name and taxonomy edition |
| Asset class | Explicitly one of editable model, raster illustration, rendered animation or documentary photograph |
| Creator and provenance | Creator, original source, creation tool if known, acquisition date and retained original |
| Rights | Exact licence or written permission covering website use, modifications, exported renditions, commercial reuse and later game distribution. Unknown rights keep the asset unpublished. |
| Editable original | Original project file plus reusable model export, for example GLB/glTF with textures. An MP4 alone does not meet this requirement. |
| Biological review | Plumage, bill, feet, body proportions, tail, sexual or age differences and movement reviewed against primary species references. Record reviewer and date. |
| Delivery | Dimensions, duration, bytes, polygons, textures, compression, animation clips and tested mobile rendering cost |
| Fallbacks | Lightweight static rendition and meaningful alternative text. Show static artwork when reduced motion or lower bandwidth is selected, or when rendering fails. |
| Public metadata | Display creator and licence. Keep private original-source references outside the public manifest. |
| Album compatibility | Link to the species record, not to a claimed sighting. Asset ownership or viewing must never create or verify an observation. |

The first pilot should use an existing representative species after its original files and rights are recovered. Keep it optional, load only on request, and retain the existing photo, map and navigation experience. Record an actual source-specific performance budget after inspecting the model. No performance or accuracy pass is claimed without the asset.

## Acceptance still open

1. Recover the four original reference videos and identify their species, creator and source.
2. Recover the actual modelling app and editable source or confirm that only video renders exist.
3. Obtain reuse terms and review one biologically accurate pilot.
4. Produce the reviewed model export, lightweight rendition and static fallback.
5. Test the pilot on mobile with lower bandwidth and reduced motion.

No 3D renderer, generated bird, public private-source link, paid subscription or sightings-based unlock was added by this inventory.
