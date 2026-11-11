# Colombia shared public layout

11 November 2026. Continued the all-page design pass from the shared public layout release.

## Changes

Colombia editorial NavigationHeader delegates to the shared 132px sticky contour header. Country navigation, native account links with country intent, regional active-link cues, the mobile dialog and skip link remain. The Colombia homepage language switch now lives in the shared header instead of a separate row.

Colombia Footer delegates to GlobalFooter, retaining its country navigation, account country intent, Colombian Indigenous/Afro-descendant acknowledgement and explicit not-certified B Corp statement. Spanish homepage copy translates the shared header/footer without changing URLs, selections, form values or handlers. Translation now preserves React child keys and Radix single-child shape.

About retains its two-column content with the shared title scale, emerald colour and heading spacing. Travel Tips uses PageIntroduction. Both custom pages now expose the main-content skip target.

## Verification

508 automated checks passed, including both regional menu cues, Spanish rendered navigation/footer, account intent and country context. Strict TypeScript passed. The local Next.js production build passed and generated 75 pages under Node 24.22.1; the hosted project uses Node 22 and its exact build remains pending. Generated HTML for /about, /travel-tips, /colombia and /new-zealand has exactly one header, h1, main-content target and footer. Managed local browser preview could not start because the launcher injects unsupported --host/--strictPort flags into Next.js. No working app configuration was changed to work around that environment failure. Physical phone/Safari acceptance remains pending.

Unrelated existing package.json/pnpm-lock.yaml dependency overrides are preserved locally and excluded from this layout increment. No database, auth, provider, private record, billing or email behavior changed. The business plan was not revised.

## Next

Local source commit: c9be99e. Automatic approval review rejected the attempted push to mmelendro/Aves, branch feature/field-guide-card, because it did not recognise explicit authorization for that destination. The push was not retried through another path. GitHub sync, hosted build/browser acceptance and publication remain pending explicit destination authorization. Continue the route-by-route public/private design audit. Guided contact flow, source-backed range/endemic coverage and verified B Corp locations remain queued.

## GitHub synchronization confirmed · 11 November 2026

The owner explicitly authorised the push. The connected GitHub app synced the reviewed source and validation notes to mmelendro/Aves, feature/field-guide-card, runtime source 811fe4a21c2484158f0e819c0d56ac016c629473. Its source tree 44dfb07d646ecd93db9a4366432d8ca579c082a1 exactly matches reviewed local commits c9be99e/da816b3. This supersedes the blocked-push status above. Hosted build/browser acceptance and production publication remain pending. Unrelated local dependency edits were excluded.

## Hosted preview acceptance · 11 November 2026

The exact pushed source 3c8ef84eebbaff078831018076541fbcfc840641 built successfully in the combined aves-australia project prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv, configured for Node 22. Protected preview deployment: dpl_C9wTac1b9KDmfQ5jtXrKXxdVo3gK. URL: https://aves-australia-2nihkbkjf-mmelendro-9273s-projects.vercel.app/travel-tips . Production remains at 3562ba2 / dpl_5MtafKNyQ2uxi3Em7hcBtt7rWzb5. No domain reassignment or promotion was performed.

Browser acceptance: /colombia English-to-Spanish toggling updates the rendered heading, header navigation and footer copy with lang=es-CO. Header height remains 132px. Native Chromium zoom yielded a 340 x 234 CSS-pixel viewport with no horizontal page overflow. Mobile menu links measured 44px tall; Escape closed the dialog and restored Open navigation menu focus. /about and /travel-tips each retain one h1 and the main-content skip target with shared emerald title colour. Both passed narrow overflow checks; Travel Tips also passed 1363px desktop overflow/header/heading placement review. Colombian editorial footer retains account?country=colombia, the acknowledgement and explicit not-certified statement.

Existing translation gaps remain: How it works, open/close mobile navigation labels, some newer explorer instructions and the general homepage acknowledgement remain English. Do not describe this as a fully translated site. Browser extension metadata errors appeared in captured console output; no application error was observed in the inspected entries. This is not a complete runtime error audit. Physical Safari/touch and exact 320/390px remain unverified.

Next: fix the identified shared-navigation Spanish strings, then continue custom-route heading/main-landmark consistency on blog, tours, team, how-it-works, conservation and legal pages. Broader content/source review remains separate from these layout checks. The current layout preview is ready for review, not published to production.
