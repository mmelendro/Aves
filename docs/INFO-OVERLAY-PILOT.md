# New Zealand Info-overlay pilot — AVES-012d-1

The main `/new-zealand` bird viewer opts into `infoPresentation="overlay"`. Existing viewers default to `"below"`; the global homepage's NZ card, Colombia and the separate Australian application are outside this pilot.

**Published and verified, 8 November 2026 (Sydney):** source `f5eee01`, Vercel `dpl_BA2SbW56xbfkktQqPQw8TBHqQsje`, live at https://aves.bio/new-zealand. Twenty-two focused tests, strict TypeScript, local production build and Vercel build passed. The live 1280px frame stayed exactly the same height when Info opened; credits scrolled and Escape restored focus. Live 390px checks retained the selected species, bounded scroll and close target without horizontal overflow. Tūī sound played; changing to White Heron stopped it. Wishlist add/remove restored the original state. Explicit slideshow Play closed Info and started playback, then was paused. Colombia still showed its below-photo details. Local checks additionally covered 320px, a 254px photo at the divider extreme, and selection/navigation across bright and dark images. Phone-sized viewports do not establish physical iPhone/touch behavior.

Evidence is private in the workspace: `audit/evidence/nov8-nz-info-overlay-live-checks.json`, `nov8-nz-info-overlay-desktop-live.png` and `nov8-nz-info-overlay-mobile-live.png`. Test audio is paused, temporary selections restored and local servers stopped. No private brief was submitted. Pause after documentation sync; rollout remains queued.

## How it works

- `HomepageBirdCarousel` owns opening/closing, bird index, sound and slideshow state. `SpeciesDetailsPanel` renders one shared set of existing facts and rights information in either presentation.
- The overlay is positioned inside the photo frame. Its header/close control stays visible while the information body scrolls. A white 88% backing with blur, or a stronger 92% fallback, preserves readability over different photographs.
- The frame height stays unchanged. Sound/slideshow controls, wishlist heart and image count remain above the sheet; previous/next controls move to the exposed photo edge below it. Long source/credit text can wrap at narrow panel widths.
- Info pauses the slideshow. Requesting Play from the open overlay returns to the photo and starts the requested slideshow. Sound remains independently controlled and never autoplays.
- Close and Escape restore focus to Info. This is a nonmodal region with a keyboard-scrollable body, not a focus trap or document-scroll lock.
- The species picker keeps the sheet open with current content, selected map islands and source links. Manual previous/next closes it. Bird changes stop the previous recording through the existing cleanup path.
- Touches in the details sheet do not start a photo swipe. Existing wishlist selection and private-brief links remain unchanged; no new account data, migration, key or service is involved.

The sheet preserves occurrence/wider-range/habitat notes, the complete featured-bird picker, region/species-guide links and photograph/recording attribution and licence links. Existing `BirdProfile` data is reused without rewriting facts or media rights.

## Verification boundaries

Focused tests render both presentations for all 31 NZ profiles, checking retained notes, picker and source/licence links; an integration check confirms that only the NZ destination hero opts in. Browser verification covers open/close/Escape/focus, stable frame height, internal credit scrolling, picker updates, sound, navigation, wishlist round trip and divider/mobile sizing. Physical touch hardware is a separate check, not established by phone-sized viewport testing.

Use the current `CONTINUE-HERE.md` and change inbox for the actual published commit/deployment and completed live checks. The cross-site rollout is task 02 in `AGILE-PLAN.md`, not completion of this pilot. Shorter photo frames need their own spacing checks before opting in. Future 3D photo/details and map/photo flips remain AVES-015.
