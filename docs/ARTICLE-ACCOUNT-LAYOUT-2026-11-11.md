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
