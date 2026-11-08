# Homepage word flip — released9November2026 (Sydney)

Published, synced and paused. Next proposed increment is the owner-selected ONE South Island3D place card (local map ↔ landscape photograph),015/037. Keep Sol medium; wait for selection.

## Exact live state

- Global/Colombia/NZ app:3528885 on webmaster/readiness-2026-11-05; dpl_By1hgiuQgM1pKQ3G3Tr3esoPPU3u, promoted from https://v0-company-landing-page-dy1mh56wx-mmelendro-9273s-projects.vercel.app to https://aves.bio.
- Australia/shared-account app remains3f644a1 / dpl_FxbDazX29G5cqCnuYP8ZmGDNwy34; no AU app rebuild. Mirrored planning/checkpoint docs can have newer heads. Independent apps remain separate.
- No database, auth, credentials, provider, account, customer records or billing changes. No country-page headings or navigation behavior changed.

## Result

Main homepage heading is “Where will birds take you?” Only birds↔aves flips on the X axis. Final owner-directed styling uses matching lowercase sans-serif italics,400 weight and emerald (#047857), with identical letter spacing/family and one reserved grid width. Other heading words remain upright medium500. No word border, outline box or shadow; keyboard focus has an underline only. The original uppercase/different-weight face and focus box were refined during this release, so older screenshots/checks describe intermediate styling only.

One small client word component owns reversible state, no animation library, external calls, preference storage or timer. Mouse/pen entry previews aves, leaving restores birds; keyboard focus previews, Enter/Space toggles, Escape resets and blur restores birds. Pointer focus is separated from click so the first touch toggles once. The stable accessible h1 name stays “Where will birds take you?” with one labelled non-navigation button. Both visual faces are aria-hidden; button label/pressed state provides coherent control semantics. Existing country selection, world/regional maps, media and links remain intact.

Reduced-motion CSS disables rotation/transition and immediately swaps face opacity while keeping the reserved space. No autoplay cycle or sound. Native OS preference switching/assistive-technology hardware was not exercised; CSS fallback was reviewed, not claimed as an emulated OS test.

## Verification

116 complete source tests and strict TypeScript passed on the functional implementation.14 focused global-home tests (a subset, not additive) passed again after the matching type/case refinement. Final border-only CSS refinement passed the hosted build and browser checks. Added meaningful event-sequence regression coverage for first-touch focus/click, touch leave, mouse enter/leave, keyboard/Escape/blur, plus the readable initial heading/toggle contract within existing homepage navigation tests. No full AU rerun needed because its app is unchanged.

Hosted desktop1280x1000: initial readable heading, pointer-entry preview, keyboard focus/Enter/Space/Escape, blur reset, stable h1 dimensions/position and country selection. The initial pointer-entry check used a right-click followed by Escape; later verification used a separate agent-created tab after the first bound tab was back on production. No protection bypass. Matching final face styles were read from computed CSS: same family,400 italic, RGB4/120/87 and letter spacing; button border0px, outline none, shadow none. Front/back reserved dimensions matched.

Hosted390x844 and320x650: readable wrapping, stable word/heading size during toggles, no horizontal document overflow and usable native button activation. Final live1280/390 checks passed for matching type, border removal, focus/toggle/reset and no overflow. Physical touch/iOS/Safari hardware was not exercised; first-touch behavior has direct handler-sequence regression coverage. Final sampled browser error log was empty. Temporary viewport and focus state were reset and the temporary test tab was closed, preserving the user's other tab.

Private workspace evidence: audit/evidence/nov9-heading-checks.json; final-birds-desktop-live, final-aves-desktop-live and final-mobile-live PNGs; full/focused/refined test logs. Older non-final heading screenshots remain historical. No local development server was used; hosted candidates and production were checked.

No public routes/parents changed. Final staged human/XML and live source human/XML plus AU XML sitemaps returned200; XML contained no account/admin/auth locations. Canonical homepage remains https://aves.bio/. Sitemap checked/unchanged, no artificial modification dates. Final checkpoint sync is docs-only, not another deployment.

## Newly recorded, not shipped

041: habitat-selected very faint background photograph, later efficient drone video.042: subtle surrounding sea shading/ocean labels on the South Island map.043: world-map hover/focus camera re-centering before click, preserving geography/stable targets.044: selective paired place-name treatment, e.g. Aotearoa/New Zealand.045: verified team/role carousel with optional separate field-story gallery.046: homepage double-click country/region navigation as an optional shortcut with explicit accessible/mobile Explore links. These remain separate selected increments; they did not expand the word-flip release. Full detailed criteria are in ROADMAP-DETAILS.md.
