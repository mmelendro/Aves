# AVES unified draft C1a checkpoint

Updated 10 November 2026, Sydney.

C1a is complete on integration/aves-unified-2026-11-08. Source commit: `058beda98d5c5460cdef04b4fc160517dc37afaa`. This is a source/build checkpoint, not a production release or a new hosted preview.

Parents: prior draft `33fcd0e99895257a6610c36fd30f407d3e67d4b1` and current main `8f3b98cba7423ed4c74f621bb2586acb6fa98426`. Australia remains `68711fd53bbc4882511e3d2226344828ccda208f`.

## Result

The draft now includes current main public functionality: Colombian page-local Spanish and whole-region previews, connected world/country discovery, South Island guide/maps/layers/place media, practical resources, full-screen and opt-in soundscapes.

The three code conflicts were reconciled deliberately. Colombia's extracted page retains unified metadata. The contact form retains localisation, local /api/inquiries submission and its disabled read-only preview state. The root layout retains preview/no-index protections, cookie controls and one current media provider.

One derived public-navigation list now joins the existing 42 main and 32 Australian public routes. The sitemap and player use that same 74-route union. Private account/admin/auth/API routes stay outside the player allowlist. South Island receives the unified metadata helper. Programme identity remains content-based; ambience remains page-local and stops on navigation.

Existing backend handlers, ownership/validation code, middleware, configuration, dependencies/lockfile and schema history are unchanged. Later Australian discovery, budget compatibility, consent/owner changes and hosted acceptance remain C1b/C1c/C1d/C3, respectively. No AI provider or credit check ran.

## Verification

1. All 405 automated tests passed, zero skipped. Coverage includes existing account/security/preview guards and public discovery/media, plus public-route allowlist/private-boundary and localised read-only contact regressions.
2. TypeScript passed. Frozen installation used pnpm 10.34.5 and checks/build used Node 22.23.4.
3. Next 15.5.29 preview-mode production build passed. No hosted build/deployment was created.
4. Generated HTML checks passed for all 55 prerendered public pages: unique titles, exact canonical and preview no-index. Nineteen public routes are dynamic and require the C2 HTTP/browser review; this is not a 74-page live crawl.
5. Existing registry/sitemap tests cover the 74 unique public paths and private exclusions. No public route was renamed.
6. git diff --check passed and no unresolved merge entries remain. One imported trailing blank line was removed.

Two older test assumptions were updated without weakening their guarantees: extinct target validation now uses archived provenance rather than the living-only public list; brand-link checks recognise both native and Next links while retaining home/destination, no-nesting and accessibility assertions.

[Sanitised checks and limits](evidence/2026-11-10-unified-c1a-checks.json).

## Limits and remaining gates

The managed browser preview launcher adds Vite-style --host/--strictPort flags which this Next.js application rejects. No application code was changed to accommodate that environment mismatch, no separate preview server was substituted, and browser QA is unverified for C1a. C2 still needs supported desktop/narrow/keyboard/media browser review and dynamic-route HTTP checks.

Physical iPhone/Safari, exact 320/390px, listening quality, native hidden/background/telephone behaviour and sustained YouTube playback were not tested in this checkpoint. Do not promote old published-app evidence into proof of unified behaviour.

The prior unified hosted preview and its 345-test/81-GET/19-native evidence remain historical. Hosted auth/callback/recovery, deployed-session handover and actual authorised inbox delivery still require the authorised test-setup decision. Do not retry declined paid provisioning or remove read-only safeguards.

## Next and recovery

Recommend C1b: update Australian discovery in the existing namespaces and shared viewer. Do not begin automatically. C1c budget and C1d consent/owner work remain cutover blockers. Production cutover and later project retirement each require separate explicit approval.

No production recovery is needed. Production main remains d34faab / dpl_3WU7VC5jQjiN5TWBEGBGxVB82gWB, Australia remains 2ff09e9 / dpl_56y3bD1RTE2fngcHBr14obkGu2bx. Keep both running. To compare/recover this draft locally, use prior integration 33fcd0e and main 8f3b98c; do not reset a shared branch over newer work. Stop after sync.

Model recommendation and actual selection: keep the current model; no switch was performed.
