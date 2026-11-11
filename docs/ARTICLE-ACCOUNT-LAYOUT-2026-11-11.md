# Article and account layout parity

11 November 2026. Continues the shared-layout work after b38c9b9.

## Changes

Four Colombian birding articles now expose one focusable main-content target and labelled wrapping breadcrumbs. ArticleHero shares PageHeading typography while retaining article identity, metadata, attribution and bird media. Optional descriptions no longer render empty paragraphs. Article introductions are labelled sections beneath the shared site header.

PortalNavigation delegates to the shared 132px sticky glass-contour header with an account surface. Your Account links to /account; country links, account contact and mobile navigation remain. The account surface always uses the global bird/contour and does not inherit stale public map selections. AccountShell uses GlobalFooter with account-specific planning/update/contact links and shared title/content spacing. Compact forms retain their narrower container.

These are presentation changes. Authentication, redirects, permissions, APIs, private plans, proposals, notifications and consent logic are unchanged. No real login, customer-data edit or outbound message was performed.

## Validation

524 automated checks and strict TypeScript passed. Tests include each article landmark/breadcrumb/media composition, global account identity despite previous Colombian selection, native destination links and account footer delegation. Existing auth/private-workflow tests remain passing. Local/hosted build and browser acceptance pending at this source checkpoint. Unrelated package/lockfile overrides remain excluded.

## Next

Check all four articles and account entry/recovery/update screens in protected read-only preview, desktop and narrow layouts. This does not replace authenticated private save/reopen/owner-provider acceptance. Continue remaining public/custom and private-shell visual coverage and deeper Spanish explorer copy. Production unchanged.

## Hosted acceptance complete

Runtime source 0a3ff81f1c78c37f331f0ddba6efe996ff58e462, protected preview dpl_HDBRFKGEkiyUie4hDxHpLkG8YPa1, project prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv (Node 22). Local production build passed with 75 pages; the exact hosted build passed. Preview URL: https://aves-australia-9yzylc3mf-mmelendro-9273s-projects.vercel.app/account/check-email .

All four article pages and six account entry pages (sign-in, sign-up, forgot-password, reset-password, check-email, email-updates) passed desktop 1363px and native-zoom 340 x 234 CSS-pixel overflow checks. Each settled page exposes one h1 and main-content landmark. Initial streaming snapshots briefly included hidden old/new fragments; settled page and accessibility states were checked before acceptance. Article breadcrumbs wrap. Article source and rendered metadata/media identity are retained. The Choco quotation retains its semantic citation footer inside main in addition to the single site footer outside main.

Account header measured 132px and displays Your Account with Falco peregrinus. Mobile AVES Account menu retained all destinations and account contact; each link measured 44px high. Escape closed the dialog and restored Open navigation menu focus. Shared footer retains account/update/contact/legal links. Auth and account-change controls remain disabled by the existing read-only preview. No sign-in, recovery request, subscription save, private record or provider action was attempted. Cookie banner can be dismissed through its existing controls.

524 tests and strict TypeScript passed. Physical Safari/touch and exact 320/390px remain unverified. Signed-in dashboard/owner-inbox visual journeys and real private save/reopen/provider acceptance remain pending, despite shared-shell code coverage. Production unchanged at 3562ba2 / dpl_5MtafKNyQ2uxi3Em7hcBtt7rWzb5; no promotion or alias reassignment occurred. Continue remaining custom/special-route layout inventory and guided contact work.
