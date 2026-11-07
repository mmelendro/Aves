# Australian frontend: a beginner's reading tour

This guide explains the public Australian pages and their interactive components. Start with the [beginner's guide](BEGINNERS-GUIDE.md) for the wider application. Account screens, database access, email delivery and server security have their own code; a visible button or hidden panel does not provide access control.

All paths below are relative to this application checkout. In the development workspace this checkout is named `australia`; it serves the public `/australia` destination. The global homepage, Colombia and New Zealand pages are maintained in the separate `source` checkout. Editing an Australian component does not automatically update its counterpart in that other application.

## Six ideas that make the source easier to read

- A **route** is a URL handled by a file in `app`. For example, `app/species/page.tsx` supplies `/australia/species`.
- A **component** is a reusable piece of the interface. It is a function returning markup, such as a footer or carousel.
- A **prop** is an option passed into a component. `<RegionExplorer compact />` requests a shorter presentation of the same region chooser.
- **State** is information React remembers while an interactive component is on screen. Changing the selected region updates the map and its detail card together.
- A **ref** remembers a browser element or temporary value without triggering a redraw. The carousel uses one to pause its actual audio element.
- **JSX** is the HTML-like markup in `.tsx` files. `{/* ... */}` is an explanatory comment inside that markup, not text visitors see. `// ...` and `/* ... */` explain ordinary TypeScript; CSS uses `/* ... */`.

Imports starting with `@/` refer to this checkout's root. A file marked `"use client"` needs browser interaction, such as clicks, sound or local storage. Other public page files generally assemble their content on the server. Client code is visible to visitors: it must never contain a private credential.

## Read these files in order

| Read | What it explains |
| --- | --- |
| [app/layout.tsx](../app/layout.tsx) | The outer page wrapper, default search/share metadata, stylesheet import and common cookie provider. |
| [app/page.tsx](../app/page.tsx) | The Australian homepage, read from top to bottom in the same order as its visible sections. |
| [components/australia-home-explorer.tsx](../components/australia-home-explorer.tsx) | How the small map and current bird communicate. |
| [components/homepage-bird-carousel.tsx](../components/homepage-bird-carousel.tsx) | Photo framing, discreet controls, sound, keyboard navigation, swipe and optional details. |
| [components/region-explorer.tsx](../components/region-explorer.tsx) | The fuller map chooser and its selected-region card. |
| [app/regions/[slug]/page.tsx](../app/regions/%5Bslug%5D/page.tsx) | One regional guide template populated by the URL's region ID. |
| [app/contact/page.tsx](../app/contact/page.tsx), then [components/contact-form-section.tsx](../components/contact-form-section.tsx) | The inquiry page and the browser side of submitting a request. |

The comments in these files identify editable sections and explain the state/event code without changing it.

## Where to make common edits

| Desired change | Start here | Keep in mind |
| --- | --- | --- |
| Homepage heading, introduction or section order | [app/page.tsx](../app/page.tsx) | The carousel and maps are separate reusable components. |
| Header/footer links | [navigation-header.tsx](../components/navigation-header.tsx), [footer.tsx](../components/footer.tsx) | Header link data also feeds the mobile menu. |
| Logo size, bird image or country subtitle link | [brand-mark.tsx](../components/brand-mark.tsx) | The bird/AVES hit area and country subtitle are separate links. The decorative landscape is not a map. |
| Species text, image, sound, focal point or credits | [content/birds.ts](../content/birds.ts) | Use verified facts and correctly licensed media. `imagePosition` controls the intentional portrait crop. |
| Birds associated with a region | [content/regional-birds.ts](../content/regional-birds.ts) | Join an existing bird ID to a supported local occurrence; keep its sources. |
| Region text, seasons, habitat, photo or planning advice | [content/regions.ts](../content/regions.ts) | The explorer and detailed guide read the same records. |
| Region label/ID used by the map and inquiry form | [content/region-options.ts](../content/region-options.ts) | IDs are links between files, not just display labels. |
| Map presentation | [australia-home-explorer.tsx](../components/australia-home-explorer.tsx), [australia-region-map.tsx](../components/australia-region-map.tsx) | Keep imported geographic outlines intact. Changing colours should not change boundaries. |
| Information-page copy | [content/information.ts](../content/information.ts) | The catch-all page renders these records; not every URL needs a new page file. |
| Trip-style cards | [app/[...slug]/page.tsx](../app/%5B...slug%5D/page.tsx) | These lead to personal inquiries, not a shopping cart or live departure inventory. |
| Form labels and browser behaviour | [contact-form-section.tsx](../components/contact-form-section.tsx) | Payload field names must agree with the server route. |
| Attribution records | [image-credits.json](../content/image-credits.json), [audio-credits.json](../content/audio-credits.json) | Keep source/licence links and stable recording IDs. |
| Public navigation inventory | [lib/public-pages.ts](../lib/public-pages.ts) | It feeds both the human site map and the search-engine XML sitemap. |

For a new country, follow [adding-destinations.md](adding-destinations.md). Adding a label, card or contact topic alone does not enable shared saved plans or account support for that destination.

## How the homepage map follows the carousel

`AustraliaHomeExplorer` remembers the currently displayed bird. It passes an `onBirdChange` callback into `HomepageBirdCarousel`. After a slide changes, the carousel calls that function with its bird record. The parent matches `bird.regionSlug` against `regionOptions` and highlights that region on the map.

The highlight means **one region associated with this bird**, not the bird's entire range or a guaranteed sighting. Wider range and habitat remain available in the details panel. Region-specific carousels can additionally show a more local occurrence note.

The map draws the imported paths in [content/australia-map.ts](../content/australia-map.ts). ACT and Jervis Bay have labelled callouts because their actual shapes are too small for comfortable selection at this scale. The expandable text list provides all nine region guide links as an alternative to targeting a shape. Source attribution stays below the map.

The desktop layout puts the map on the left and the narrow portrait carousel on the right. On smaller screens, the carousel comes first and the map follows. The layout classes belong to `AustraliaHomeExplorer`; the 320px maximum width and 9:16 image frame belong to the carousel itself.

## How the carousel works

Read `HomepageBirdCarousel` in this order:

1. **Props and `IconControl`:** the caller can supply its birds and slideshow preferences. Controls are real buttons with accessible names; their visible labels appear as tooltips on hover or focus.
2. **State and refs:** state drives the slide, details and loading indicators. Refs hold the image/audio elements, swipe start and a numbered audio-play attempt.
3. **Effects:** these react to loaded images, reduced-motion preferences and changing birds. Each browser listener or timer is cleaned up when it is no longer needed.
4. **`toggleAudio`:** sound begins in the click handler so mobile browsers recognise the visitor's action. An outdated playback error cannot overwrite a newer slide's status.
5. **`goToSlide`:** arrows, the species picker and swipes use the same navigation function. It wraps at the ends, stops sound and stops automatic progression.
6. **Slideshow timer and input handlers:** progression waits while sound plays, media loads or details are open. Horizontal swipes change birds; vertical scrolling and pinch zoom remain available. Arrow shortcuts do not take over the species dropdown.
7. **Returned JSX:** one portrait image, one counter, one previous/next pair, overlaid controls, an optional information panel and the credit links. There is no second slider or thumbnail strip.

`object-cover` intentionally crops the photograph to fill the portrait frame. Use `imagePosition` in the species record to choose its focal point. Do not describe the viewer as showing an uncropped full photograph. Missing photos show an unavailable state; missing recordings disable sound rather than pretending a call exists.

The `<audio>` element uses `preload="none"`, and the slide change stops the previous bird's sound. Native playback events update the button state. Recording licences are linked through `/credits#audio-BIRD_ID`. Future video support would need its own verified media/rights records and playback behaviour; it is not implemented by these photo/audio controls.

## How regional pages reuse the same data

`RegionExplorer` owns one `selectedRegion` state value. Its region buttons and [AustraliaRegionMap](../components/australia-region-map.tsx) both update that value. The adjacent photo, season, gateway and inquiry links all come from the selected record in `content/regions.ts`.

The homepage uses the compact version, which still offers every region. The standalone `/aves-explorer` adds the full guide directory beneath the chooser. Its `?region=...` parameter can preselect a known region; the component falls back to Queensland for an unknown ID.

The route `app/regions/[slug]/page.tsx` uses the same region data for its title, metadata, timing, places, bird notes and planning sources. `generateStaticParams` supplies known region IDs at build time; an unknown region returns a 404 through `notFound()`.

[RegionalBirdCarousel](../components/regional-bird-carousel.tsx) joins `content/regional-birds.ts` to `content/birds.ts` by bird ID. It preserves the original media and wider distribution while adding a local occurrence note. Missing catalogue entries are skipped, and duplicate source URLs are collapsed into one citation. A region change resets the viewer rather than carrying an unrelated slide position into the next region.

## Follow an inquiry from click to saved response

1. A regional guide or species card links to `/contact?region=REGION_ID`. Trip-style cards use `?tour=STYLE`, while launch-list links use `?intent=waitlist`.
2. `app/contact/page.tsx` chooses the page's navigation and passes any recognised general contact topic to `ContactFormSection`. A topic labels a message; it does not create a destination account system.
3. The form reads recognised query hints and fills the relevant context. Name/email and other fields are collected with `FormData`; browser validation helps people correct mistakes before submission.
4. The submit handler makes a JSON request to `sitePath("/api/contact")`. That resolves to this application's API under `/australia`. **The browser does not send email directly or use a private database key.**
5. A temporary in-flight flag prevents immediate duplicate clicks. A UUID request key is reused when retrying an unchanged message so the server can recognise that retry. A changed body receives a new key.
6. Read [app/api/contact/route.ts](../app/api/contact/route.ts) to continue into authoritative validation, abuse controls, saving and notification handling. Those server responsibilities cannot be replaced by disabling a button or hiding a field.
7. The interface reports success only after the API explicitly confirms `success: true`, `status: "stored"` and the matching intent. The message promises saving for AVES to review; it does not promise email delivery, a completed quote or a booking.

The hidden `website` field is a basic spam honeypot. It supplements server controls. Marketing updates are optional for an inquiry and explicitly requested for the launch list. No form values are deliberately written to local storage by this component.

## Understand public routes and shared My Trips links

Next's ordinary `Link` adds this application's `/australia` base path. For example, `href="/species"` opens `/australia/species`. Raw image/audio URLs, `fetch` URLs and SVG anchors use [sitePath](../lib/site-path.ts) where needed because those browser APIs do not add the prefix themselves.

[SiteLink](../components/site-link.tsx) handles shared My Trips specially. Both `/account` and legacy `/australia/account` inputs become a normal anchor to the root `/account` URL. This crosses the application boundary and keeps one public account address. It does not bypass sign-in or change authorisation. External destination links similarly use their intended public addresses.

The public [site-map page](../app/site-map/page.tsx) groups links for people; [app/sitemap.ts](../app/sitemap.ts) emits XML for crawlers. [app/robots.ts](../app/robots.ts) discourages indexing previews and private route groups. Robots rules are public crawler guidance, **not protection for private information**.

## Styling, navigation and retained legacy files

The active stylesheet is [app/globals.css](../app/globals.css), imported in `app/layout.tsx`. It starts with Tailwind directives and shared colour tokens. Most current component layout is expressed in `className` strings: `lg:` means “from the large-screen breakpoint”, and `focus-visible:` styles keyboard focus.

[styles/globals.css](../styles/globals.css) and [styles/mobile-navigation.css](../styles/mobile-navigation.css) are retained alternatives with no current import in the app/components tree. Changing those files will not change the current pages. The active global stylesheet also contains historical selectors; a rule only has an effect when the rendered markup actually uses it.

[OptimizedImage](../components/optimized-image.tsx) is another retained legacy component with no current app/component caller. It has historical filename-based logo and photo rules. Active pages use `next/image`, current logos use `BrandMark`, and current carousel cropping belongs in the carousel and bird records.

The current [mobile menu](../components/mobile-navigation-overlay.tsx) uses Radix Dialog for focus/dismissal behaviour, not the old mobile-navigation stylesheet. Keep its accessible title, close control, large link targets and resize cleanup. The fixed public header has a matching height spacer so it does not cover the first heading, plus a skip link targeting `main-content`.

## Cookie preferences: presentation versus installed services

[CookieConsentProvider](../components/cookie-consent-manager.tsx) stores versioned preference flags in local storage and a cookie fallback. The banner reads that state; the settings dialog edits a temporary copy before Save. Dismissing the banner or dialog is not accepting optional categories.

The provider can update a `gtag` function if one already exists and emits a preference-change event. It does not itself install analytics or advertising scripts. The category descriptions in the dialog are generic presentation text, not an inventory of implemented services such as shopping carts or language preferences. Keep those distinctions in mind before changing either copy or functionality. Cookie preferences are separate from server-managed account sessions.

## Check an edit before publishing

Use the package manager and versions specified in `package.json`. From this checkout, `pnpm typecheck` checks the TypeScript contracts, `pnpm test` runs the existing checks and `pnpm build` checks the production build. `pnpm dev` serves the local app at `http://127.0.0.1:3000/australia` when the port is available.

Match verification to the change. For a carousel or map edit, check narrow and wide layouts, keyboard focus, one recording, stopping sound on slide change, the tiny territory callouts and the text alternatives. For a form edit, confirm the real server response and its failure/retry states; a nice-looking form alone does not prove saving or delivery. Do not commit environment files or real client submissions with screenshots or examples.

## Paired discovery headers

The country hero explorer can accept a `media` slot so a region or article keeps its original bird selection. `bird-discovery-context.tsx` connects that nested carousel to the map without copying its data or exposing server information. The shared carousel reports its selected bird through this optional context. `country-hero-explorer.module.css` owns the two-card arrangement and phone stacking. The map uses real country geometry; only its surrounding card becomes portrait. See the current release handoff for the supported page scope and browser checks.
