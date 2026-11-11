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
