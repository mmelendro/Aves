# South Island and regional zoom — release checkpoint, 9 November 2026

**Published, checked live, synced and paused.** No next feature has started. Recommended working model for this release: GPT-6.1 Sol, medium; the app's actual selected model is not independently observable.

| App | Published app commit | Published deployment |
| --- | --- | --- |
| Global / Colombia / NZ | 5847eb7 | dpl_GMPLFwPviWsLq73i9JJBjCNvkaja |
| Australia / shared accounts | 6ba7fee | dpl_9ZrHC1jyd3SGzMeVn248kcFBwmcv |

Both existing builds were inspected READY/production and promoted unchanged, Australia first then source. No rebuild, dependencies, database/auth/env/billing/DNS changes. App commits were already pushed; final documentation heads are newer.

Live: https://aves.bio/new-zealand/south-island . Dedicated canonical South Island guide uses the existing resizable map/carousel, 30 verified local profiles/calls, Info/credits, wishlist and private-brief entry. Old island anchors remain valid; North/Rakiura dedicated pages remain queued. Country and homepage region selection provide a closer map and local birds/overview/planning links, with Back. AU/NZ use existing real geometry; Colombia focuses planning markers rather than claiming exact regional boundaries. Complete guides remain canonical pages; this does not replace every guide body in-place. Geographic Equal Earth rotation remains queued.

Verification reused completed 112 source +273 AU tests (385 total), final32 focused source tests, strict TypeScript and local/hosted builds. Prior local checks covered all23 homepage regional choices/all9 Australian country choices. This resumed release finished source hosted QA: 1280px desktop,320px short phone frame,30-option Info, wishlist add/remove restoration, call start/change cleanup, NZ Back focus restored to Explore South Island, unrelated CO markers opacity0, homepage South Island heading separator and human/XML South Island entries.

Post-promotion live checks: South guide desktop1280/divider keyboard and phone390/Info; Kea call ready4 advanced to7.2seconds then stopped on Next; homepage NSW selection6 profiles on phone; AU NSW phone/ACT desktop6 then Back20 with select focus; CO Pacific phone3 then Back22 desktop; NZ South zoom30 and Open guide arrived at canonical route. No sampled horizontal overflow. Both live human directories and XML sitemaps opened successfully; source human/XML include the new South guide. Existing AU public inventory was checked unchanged. No artificial lastModified. Expandable public tree remains queued; documentation tree updated to mark South Island live.

No private server draft/customer answers submitted; local wishlist test restored empty. Existing private brief/account links were checked as navigation, not a new full authenticated regression. Physical phones/foldables and OS reduced-motion/contrast preferences were not tested. Audio paused, temporary viewport reset; no local servers started this turn. Browser connection was restored once before QA.

Evidence outside Git: audit/evidence/nov9-south-island-release-checks.json and nov9-south-island-desktop-live.png / nov9-south-island-mobile-live.png; previous local evidence remains available. Next proposed increment B1: a synthetic end-to-end check of the existing private trip brief, with Sol medium recommended before starting. Wait for the owner; do not begin it automatically. Keep separate pricing draft5979b8b and consolidation PR3 unmerged.
