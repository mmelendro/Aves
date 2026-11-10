# AVES code and UX audit, 10 November 2026

Performed after the Australian and Colombian contour releases. This is a bounded
source, dependency and changed-flow review, not a complete penetration test or
formal accessibility/security certification. No accounts/private records were
read or changed and no provider/protection settings changed.

## Completed checks and cleanup

Both production branches were fetched and reviewed independently. Main has 279
tracked TS/TSX/MJS files. Full TypeScript unused-local/parameter checks found 35
main diagnostics and zero AU diagnostics before cleanup. Confirmed unused icon
imports, menu state, unused sample bird array, helper, state setter bindings and
unused callback parameters were removed. Constructor side effects were retained.
No public route, original image asset or retained historical source was deleted.

The Australian renderer carried 27 terrain definitions copied from the wider
study catalogue; only ten terrain types are reachable by its country/nine-region
allowlist. Seventeen unused definitions and their unnecessary export were removed.
The main study catalogue remains because its review gallery actually uses it.

Generic map pointer-leave/capture/reset/resize cleanup now clears the gesturing
state consistently. The earlier Colombia teaser SVG was contained within its
image frame and is already live. The gallery copy now distinguishes reference
studies from installed route-specific headers. Single-person team navigation
uses inert offscreen slides, manual movement, no autoplay and existing biography
focus. No invented team credential or wildlife claim was added by this work.

After cleanup, both apps pass TypeScript with noUnusedLocals/noUnusedParameters.
Main's 156 tests and local production build pass. AU's targeted all-region
geometry check passes; its full 294 tests and build passed for the released source.
The source cleanup is newer than live runtime, not an extra production release.

## Dependency findings

pnpm 10.34.5 production-dependency audit returned two moderate findings in main,
zero low/high/critical findings, and zero findings in AU. Both main findings follow
this build-tool path: tailwindcss-animate > tailwindcss > sucrase > glob > minimatch.
No app source imports glob/minimatch or accepts public glob-pattern input. This
reduces the observed exposure; it is not a claim that the advisories are harmless.
A tested compatible build-chain update is retained work, rather than a forced
cross-major override during a UI cleanup. No finding is suppressed/reclassified.

References reviewed:
- https://github.com/advisories/GHSA-3g3m-2fjr-6pw4
- https://github.com/advisories/GHSA-g3hv-75wg-m249

## Documents and UX order

The large previous handoff/prompt are archived under
archive/2026-11-10-before-contextual-rollout/. Current handoff/prompt distinguish
production runtime, source cleanup and next preview. Recovery and source evidence
are retained. ROADMAP-DETAILS and AVES-CHANGE-INBOX keep the original request ledger.
UX-DELIVERY-PROCESS defines visitor-task-first agile slices, evidence-led natural
context inspired by Utzon, accessibility, bounded validation and authorized release.

Next selected task: a satellite/outline/selected-area opacity pilot using registered
South Island imagery. Its selectable shapes are LCDB habitat areas, not fabricated
administrative subregions. Broad Colombia/Australia satellite rollout requires
georeferenced regional geometry. No stretch-to-fit planning artwork.

## Remaining limits

Physical iPhone/Safari, true touch pinch/swipe, exact 320/390px and real telephone/
background behaviour remain unverified. The two moderate build-chain findings,
additional NZ local headers and scientifically reviewed wildlife flocks remain
separate retained work. Unified C3/C4/C5 gates are not bypassed by this audit.
