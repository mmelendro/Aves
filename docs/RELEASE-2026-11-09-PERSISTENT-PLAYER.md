# New Zealand persistent travel-player pilot — 9 November 2026

Published runtime: **3f3c9dc** (foundation4cfa2fc). Main Vercel production: **dpl_FCSgEsC91SzzB63onP9Kh8pYGHFc**, https://v0-company-landing-page-n9ag4rkg3-mmelendro-9273s-projects.vercel.app . Domain: https://aves.bio . Source branch: `webmaster/readiness-2026-11-05` at https://github.com/mmelendro/Aves . Recovery: `checkpoint/2026-11-09-10-persistent-player`.

## Delivered

One layout-owned media dock launches the existing curated DOC resources. Compact kea artwork, restrained feather controls, pause/play, mute, seek for podcasts, expand/compact, close and keyboard Escape. Expanded and compact views retain the same media instance. Browsing another carousel resource leaves the chosen recording playing; explicitly choosing another replaces it. Starting native audio, including a bird call, pauses the programme; resuming it pauses other native audio. YouTube uses its supported iframe API and retains native captions/full-screen controls. No user-provided URLs or credentials. API, iframe and recording requests start only following a visitor's media choice; no autoplay URL parameter or play-on-ready video action. React owns a wrapper and the API owns/destroys its iframe, avoiding development Strict Mode duplicate frames and leftover timers.

New Zealand overview/guide/map/brand return links use client navigation so the root player survives. No account/database/API/schema/email changes or new dependencies. Other pages may preserve it via existing client navigation, but comprehensive global continuity is NOT delivered: plain links, refresh, closing the tab and crossing to the Australia/shared-account application end playback. AVES-068 records the full global target and architecture boundary. Browser/OS background playback policy also applies; physical iPhone/Safari is untested.

## Verification

-133 Node tests passed, TypeScript no-emit passed; final clean Vercel build READY.
- Exact final candidate desktop~1280, phone390×844 and short343×480: bounded dock, no page horizontal overflow; accessible close/expand targets, audio seek/mute; resource browsing retains current podcast, loading video removes podcast and leaves exactly one iframe.
- Actual podcast readyState4/time advancing through client navigation. Actual YouTube video readyState4/time advancing; pause/resume/mute and bird-call priority checked. Video remained in the same dock during New Zealand route navigation. Expansion retains playback. Closing removes media. No external media elements before explicit launch (SSR test).
- Live aves.bio podcast readyState4, continued0→0.84 seconds during South Island→NZ navigation; compact phone fit, mute/close and no browser console errors. Playback was stopped after testing.
- Nine public routes/sitemaps returned200: /, /colombia, /australia, /new-zealand, /new-zealand/south-island, /site-map, /sitemap.xml, /australia/site-map, /australia/sitemap.xml. Sitemaps contain public locations and exclude account/admin/API routes. No hierarchy change, so existing generated site maps remain current.
- Evidence: [live dock](evidence/2026-11-09-persistent-player.png). Emulated layouts, not physical iPhone hardware. Network/browser-policy failures retain source links and native video controls.

## Newly recorded, not shipped

065 private eBird-connected wishlist (reuse current selected birds; direct eBird account/wishlist syncing unverified).066 Colombia full-region hover rather than dots only.067 reuse birds↔AVES word-flip invitation.068 fully global player across both application roots. Lightweight-site quality requirements added. Existing061 landscape header contour,053 optional habitat soundscapes/ducking,063 private saved places and064 historical/ecological orientation remain queued. No paid AI retry.

## API/source references

YouTube supported existing-iframe API, events, controls and origin: https://developers.google.com/youtube/iframe_api_reference . Public DOC media sources remain in content/south-island.ts and the previous resource release report. eBird capabilities/terms references are recorded with065; no eBird integration or private data import in this release.

Pause before another implementation increment.
