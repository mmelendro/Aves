This integration branch is documented in [CONSOLIDATION.md](CONSOLIDATION.md). Older two-app paths below describe the pre-cutover production architecture.

# AVES frontend: a beginner's reading guide

This guide describes the `source` application: the main AVES homepage, Colombia and New Zealand. Australia and the shared customer account service are maintained in the separate Australia application. Files here can link to those services without containing their implementation.

The source comments explain purpose, important decisions and the flow of information. Repeated HTML tags are grouped into sections instead of annotated one by one. A comment describes the code; it does not verify a business claim, image licence or security promise by itself.

## Start with these files

1. **`app/layout.tsx`** is the document around this application's routes. It imports global CSS, supplies default search/social metadata, wraps pages in the cookie preference provider and renders the cookie dialogs. Its `children` value is the page being visited.
2. **`app/page.tsx`** is the main homepage at `/`. Follow its JSX from top to bottom to see the order of the hero, destinations, personal planning story and planning steps.
3. **`app/colombia/page.tsx`** and **`app/new-zealand/page.tsx`** arrange each country's homepage. They hand interactive photo/map work to small client components.
4. **`components/homepage-bird-carousel.tsx`** owns the common photo, recording, controls and species-details experience. Most visual carousel changes belong here, not in every page using it.
5. **`components/colombia-hero-explorer.tsx`** and **`components/new-zealand-hero-explorer.tsx`** connect the current bird to the small map beside it.
6. **`components/contact-form-section.tsx`** shows how a form collects visitor input and sends an inquiry to the shared service. Follow the state, `handleSubmit`, then the success/error messages.
7. **`components/navigation-header.tsx`**, **`components/global-navigation.tsx`** and **`components/brand-mark.tsx`** explain navigation and the separate global-home/country-home logo links.

## What the syntax means

| Pattern | Meaning in this project |
| --- | --- |
| `import ... from ...` | Reuse another file or installed package. `@/` means this application's root. |
| `export default function ...` | The main component exported by this file; Next.js recognises it as the route component in `page.tsx`. |
| `interface`, `type`, `: string` | TypeScript descriptions checked during development. They are not server-side validation of user input. |
| A component's `props` | Values passed by its parent, such as a country, title, bird list or callback. |
| `children` | Content nested inside a component by its caller. |
| `"use client"` | Marks a client-component boundary for browser interaction. It does not mean the file can safely read `window` during every render. |
| `useState` | A value React remembers; its setter schedules a new render. |
| `useRef` | A remembered value or browser element that can change without scheduling a render. |
| `useEffect` | Work after rendering, such as subscribing to browser events. A returned cleanup function removes listeners or stops timers. |
| `useCallback` | Keeps a function reference stable until its listed dependencies change. |
| `useMemo` | Reuses a calculated value until its dependencies change; it is not storage in the database. |
| `{value}` inside JSX | Insert a JavaScript value into the markup. |
| `condition && <Panel />` | Render the panel only when the condition is truthy. |
| `condition ? first : second` | Choose between two values or pieces of UI. |
| `items.map(...)` | Turn each item into a rendered element. `key` gives React a stable identity for that item. |
| `{ ...record, field: value }` | Make a copy with one changed field, preserving the original record. |
| `onClick`, `onChange` | Functions called when a visitor clicks or changes a control. |
| `className` | CSS classes; most here are Tailwind utilities. `lg:` applies a class only at the large breakpoint. |
| `cn(...)` | Combine conditional CSS classes using the shared utility. |
| `aria-label`, `aria-expanded`, `aria-current` | Describe controls and state to assistive technology when the visual design alone is insufficient. |
| `sr-only` | Keep text available to assistive technology while hiding it visually. |
| `// ...`, `/* ... */`, `{/* ... */}` | Developer comments. The last form is used within JSX and is not visitor-facing copy. |

## Where to make common edits

| Desired edit | First place to look |
| --- | --- |
| Main homepage section order or introduction | `app/page.tsx` |
| Country card title, status, photo or destination URL | `content/destinations.ts` |
| Colombia homepage sections and short region teasers | `app/colombia/page.tsx` |
| New Zealand introduction, experience story and regional sections | `app/new-zealand/page.tsx`, then `content/new-zealand.ts` |
| Shared carousel size, overlays, photo crop or controls | `components/homepage-bird-carousel.tsx` |
| Birds shown globally | `content/global-birds.ts` |
| Colombia species facts, photos, audio paths and focal points | `content/birds.ts` and its referenced records |
| New Zealand species selection and media records | `content/new-zealand-carousel.ts` and its expansion/supplement imports |
| Colombia regional bird selections and local occurrence | `content/regions.ts` |
| Homepage map positioning and bird highlight | `components/colombia-hero-explorer.tsx`, `components/new-zealand-hero-explorer.tsx` |
| Colombia map palette | `components/colombia-map-artwork.tsx` |
| Full Colombia region-selection page | `components/colombian-birds-explorer.tsx` |
| New Zealand island map and anchor links | `components/new-zealand-map.tsx`, `content/new-zealand-map.json` |
| Region guide layout | `components/colombia-region-page.tsx` |
| Blog introduction and its bird selection | `components/article-hero.tsx`, `components/article-bird-carousel.tsx` |
| Article prose and inline photos | The matching `app/blog/<slug>/page.tsx` |
| Main Colombia navigation | `components/navigation-header.tsx`, `components/mobile-navigation-overlay.tsx` |
| Global/New Zealand navigation | `components/global-navigation.tsx` |
| Logo lettering, country subtitle and links | `components/brand-mark.tsx` |
| Colombia inquiry fields and submission feedback | `components/contact-form-section.tsx` |
| Public photo and sound acknowledgements | `app/credits/page.tsx` and the imported `content/*credits.json` files |
| Public site directory and sitemap inclusion | `lib/public-pages.ts`, `app/site-map/page.tsx`, `app/sitemap.ts` |
| Shared typography/colour utilities | `app/globals.css`, `tailwind.config.ts`, then the relevant component classes |

Content/configuration files in this table are editing destinations, not all frontend components. Their own comments or documentation explain their records. Australia has separate matching components: a source-app change does not automatically update that application.

## Follow one carousel interaction

1. The page or wrapper passes a `birds` array. Without one, the carousel uses the Colombia catalogue.
2. `currentIndex` chooses the slide. The wrapped `selectedIndex` keeps it valid if the list becomes shorter. An empty list renders nothing.
3. The photograph fills a **9:16 portrait frame capped at 320 CSS pixels wide**. There is one image and no side-padding backdrop. `object-cover` crops landscape photographs; the record's `imagePosition` chooses the focal point. It does not alter the original image file.
4. The photo callbacks set loading, loaded or error state. A separate effect also handles images that finished loading from cache before React attached its callback.
5. Previous/next, supported arrow keys, Home/End or a mostly horizontal swipe call `goToSlide`. This stops slideshow motion and current audio before changing the bird.
6. The sound button calls the browser's audio `play()` directly from the click. This matters on mobile, where playback generally requires visitor interaction. Media events report actual playback; an attempt counter prevents an obsolete failed play request from changing the newer slide's state.
7. Slideshow playback is separate from sound. It pauses while audio loads/plays, while details are open, and during most focus interactions. Reduced-motion preferences turn off automatic motion. Destination wrappers currently request `autoPlay={false}`.
8. The info button reveals range, habitat, source links and media credits. New Zealand can additionally show a species selector inside this panel. The fraction over the image counts this selection, not all species in the country.
9. `onBirdChange` notifies a country wrapper. The wrapper calculates a featured-area highlight; this is not a scientific distribution polygon or a guaranteed sighting.

The controls have spoken labels even though their visible labels appear only on hover/focus. Preserve keyboard focus, readable contrast, touch targets and the audio cleanup when changing the design.

## Maps, pages and navigation

Colombia's homepage markers use percentages over the existing artwork. `ColombiaMapArtwork` recolours that artwork through an SVG filter; it does not change geographic geometry. A unique filter ID avoids conflicts when several instances appear on the same page. The homepage dropdown is an alternative to selecting small markers.

New Zealand's full and compact maps use the same coastline JSON. Island links point to `#region-...` sections on the New Zealand page. Keep map IDs and section IDs aligned. Featured-island highlights come from explicit catalogue labels; a vague label does not invent a range.

`app/regions/[slug]/page.tsx` looks up a valid Colombia region, redirects an old alias, or returns a 404. `generateStaticParams` lists known pages to prebuild; `generateMetadata` creates a matching search title/canonical URL. Caribbean has an explicit route file but uses the same display template.

`PageShell` is a reusable header/intro/content/footer frame. `ArticleHero` is only an article introduction. Their callers still own the page body. Most other long editorial pages have their own marked sections instead of using these wrappers.

Normal `<a>` links are intentional when moving into the separately served Australia/shared-account application. Replacing all anchors with Next.js `Link` can change how requests cross that boundary. The visible `/account` URL is shared; the legacy account files in this source app are compatibility fallbacks, not the live account implementation. Read `middleware.ts` and `lib/shared-account.ts` before changing those paths.

## Follow a Colombia inquiry

The form holds field values, selected regions/styles and optional-update consent in React state. Recognised URL query values prefill suitable selections. The hidden `website` field is a bot trap, not a normal customer field.

`makeColombiaInquiry` prepares the API payload. The form sends it to `/australia/api/contact`, the shared backend endpoint. An immediate in-flight lock blocks double clicks. An unchanged retry retains its idempotency key so the server can avoid saving the same submission twice. The form requires an explicit stored-Colombia-inquiry response before showing success; on failure the visitor's input stays available for a retry.

Browser restrictions, hidden controls and TypeScript types are not security boundaries. The receiving backend must authenticate/authorize where appropriate, validate input and protect private database records. Never place service keys in a component, public environment variable, comment or example.

The separate calendar dialog embeds an external appointment scheduler. It does not implement Google sign-in, price a trip or confirm a reservation.

## Cookies, metadata and helper files

The root cookie provider stores preferences locally, supplies them to the banner/dialog and updates `gtag` consent if `gtag` already exists. It does not itself load analytics. The preference-center toggles are a draft until saved. Policy text and category names do not prove that every optional script or embed obeys those choices; inspect an actual integration before adding it.

`metadata` exports describe page titles, canonical URLs and link previews. They do not create visible headings. Some client pages have a neighbouring `layout.tsx` solely to export metadata and return children unchanged. `app/page-metadata.tsx` is an older optional export, not a magic Next.js filename; the current homepage uses its own metadata.

`loading.tsx` files are temporary route-loading UI, distinct from individual photo/audio loading states. `not-found.tsx` is the missing-page screen. `robots.ts` and `sitemap.ts` produce machine-readable files; neither protects private content from access.

`use-mobile` reports viewport width after mount. The scrolling hook and utilities use browser element positions. `use-toast` is a shared in-memory notification store and still needs a mounted renderer. None of these hooks stores customer plans.

## Files that are not necessarily live

A component existing on disk does not mean visitors see it. Search its imports and actual JSX usage before editing. The current route graph does not directly import many retained optional/prototype components, including:

- Older region/itinerary presentations: `accordion-sections`, `collapsible-itinerary`, `collapsible-target-species`, `concise-itinerary`, `ecoregion-details`, `ecoregion-selector`, `interactive-ecoregions-table`, `interactive-region-map`, `itinerary-timeline`, `external-links-section`, `highlight-cards`, `testimonial-section`.
- Alternate media: `image-gallery`, `mobile-audio-player`, `drone-video`, `region-hero-video`, `video-background`, `youtube-hero-background`.
- Diagnostics/prototypes: `ab-testing-framework`, `conversion-analytics`, `cta-testing-framework`, `audio-diagnostics`, `browser-compatibility-check`, `logo-analysis`, `performance-monitor`, `scroll-debug-panel`, `testing-checklist`.
- Optional wrappers/helpers: `enhanced-cta-button`, `error-boundary`, `legal-popup`, `section-navigator`, `species-tooltip`, `theme-provider`, and the standalone `cookie-management-link`. `floating-aves-navigation` explicitly returns nothing.

Their headers describe their intended behaviour and limits. Some contain example measurements, older static claims or obsolete paths. Do not expose them as real analytics, verified endorsements or current business information without review. `NewZealandBirdCarousel` is an optional export, while `NewZealandPhotoCredits` from the same file is used by the active country page.

Some **live** older pages also contain static editorial records: the events calendar, tour comparison, team/partner sections and long articles. Commenting them does not refresh dates, validate prices or verify biographies/partnerships. The resources page's search input is presently decorative rather than a working search filter. Treat content correction as a separate, reviewed change.

## Check a change before publishing

Read the component's callers, edit the smallest appropriate file, and keep source/credit records with new media. Check the intended route at phone and desktop widths. For interactive changes, try touch/keyboard navigation, open/close controls, audio errors and navigation to another page while audio is playing. For forms, test the complete response and saved record with appropriate test data, not just a green message in the browser.

The TypeScript check in this checkout is `node node_modules/typescript/bin/tsc --noEmit --incremental false`. Tests and deployment steps are documented elsewhere in the repository. This guide covers the frontend; shared-account security, API handlers, database policies, build configuration and generated/vendor files need their own guides and checks.

## Paired discovery headers

The country hero explorer can accept a `media` slot so a region or article keeps its original bird selection. `bird-discovery-context.tsx` connects that nested carousel to the map without copying its data or exposing server information. The shared carousel reports its selected bird through this optional context. `country-hero-explorer.module.css` owns the two-card arrangement and phone stacking. The map uses real country geometry; only its surrounding card becomes portrait. See the current release handoff for the supported page scope and browser checks.
