# AVES comprehensive audit and next 100 improvements

13 November 2026, Sydney

## Audit evidence

The audit covered 78 public sitemap/inventory URLs, source inspection of the current unified application, desktop browser observation, the existing automated suite, and a new local production regression audit. Baseline source: 0614db5 (documentation over runtime fd1c588). No private database records were inspected or changed.

Confirmed baseline findings:
1. All 78 public requests returned successful responses. Five tour pages and Resources lacked a main landmark; five routes had broken main-content anchors.
2. The New Zealand bird-guide link targeted a missing fragment.
3. A large inventory offset displayed 1,945 matches with no birds. Previous-page links were not aligned to the 40-row page boundaries.
4. Inventory filters accepted unsupported values while the HTML form could display a different default. Repeated query keys and tracking-only parameters were not handled consistently between search and metadata.
5. Current taxonomy crosswalks and separate older name/status sources were present in data but not fully exposed to readers. Three source workbook rows remain excluded pending clarification.
6. The Sierra Nevada header and date buttons lacked a working enquiry action. Other controls led to a shopping flow while the page displayed an unverified $8,000 starting price. This batch makes the journey an explicitly personal quote.
7. National inventory URLs were missing from the public navigation registry and XML/human site maps. There was no application-level retry boundary.
8. No missing image alt attributes or duplicate IDs were found by the baseline HTML audit. This does not prove that every alt description is adequate or that every image loaded in a browser.
9. The largest decoded HTML responses were Credits (1,061,214 bytes), South Island (896,114), Colombia (682,923), Western Andes (677,737) and Eastern Andes (671,026). Delivery size is not a mobile speed score.
10. Image optimisation remains globally disabled. Large founder media, substantial homepage/planner JavaScript, oversized editorial components, and 34 existing lint warnings remain follow-up work.

Limits: this is a comprehensive product audit with explicit coverage boundaries, not a penetration test or certification. No physical phone/touch session, signed-in save/media write, live database-policy review, independently measured Core Web Vitals or real service-cost/financial validation was performed. Desktop screenshots are not phone acceptance. Sensitive wildlife locations and private traveller records remain outside public reports.

## Queue rules and business priority

This replaces the older task tracker for prioritisation. Five completed previous items (1, 3, 13, 14, 27) are retired instead of being proposed again. All other 79 previous IDs are retained exactly once in the remaining queue. Four complementary pairs are combined, yielding 75 carried-forward items plus 25 new, bounded improvements. Previous partially completed tasks are narrowed to their remaining scope. Old IDs are displayed for traceability; species inventory remains current task 70.

Order is by execution readiness and required input, then practical impact. Category B can largely proceed without new owner input after its research/dependencies; it must not be described as completed merely because A ships. The first category is 25 immediate improvements, not a claim that all autonomous work is finished.

Business plan: keep the current Eco-Tourism Business Plan as a working draft until its investor/lender rewrite. After the independent product changes, build an evidence-based commercial offer, founder pay from month one, a 36-month editable financial model, integrated profit/cash/balance-sheet projections, scenarios, funding uses, capacity and repayment/return cases. Distinguish licensed reference data from owned contributions and bookings handled from AVES revenue. Actual unknown inputs remain unknown.

B Lab stewardship informs supplier and impact tasks: assess biodiversity and wildlife risks, record source/supplier evidence, define practical reduction goals, track local benefit and review progress. Use the published Environmental Stewardship and Circularity reference without implying AVES or a listed supplier is certified unless independently verified.

## A. No owner input: immediately executable fixes (25)

This is the first delivery batch. It is deliberately bounded to confirmed defects and low-risk improvements whose acceptance criteria can be checked now. No owner response, new data licence or private-data mutation is required.

1. Repair Sierra Nevada quote and date enquiries

   Acceptance: Every CTA reaches the region-prefilled enquiry, nested controls are removed, and the unverified $8,000 booking implication is replaced by a personal quote. Previous audit IDs: 8, 49, 48. Status: Implemented and validated in this source release.

2. Validate inventory query inputs consistently

   Acceptance: One contract handles country, repeated keys, filter enums, query length and defaults for the form, metadata and server search. Previous audit IDs: 6, 10, 70. Status: Implemented and validated in this source release.

3. Recover stale inventory page links

   Acceptance: An offset beyond the filtered results resolves to the last populated page instead of a false empty page. Previous audit IDs: 10, 70. Status: Implemented and validated in this source release.

4. Keep inventory pagination aligned

   Acceptance: Offsets align to 40-row boundaries and malformed offsets safely reset. Previous audit IDs: 10, 70. Status: Implemented and validated in this source release.

5. Repair five tour-page main landmarks

   Acceptance: Each published tour page provides one main-content skip target. Previous audit IDs: 2. Status: Implemented and validated in this source release.

6. Repair the Resources skip target

   Acceptance: The Resources page provides a focusable main landmark around its content. Previous audit IDs: 2. Status: Implemented and validated in this source release.

7. Make not-found recovery accessible

   Acceptance: The recovery page provides a named main-content target and existing recovery navigation. Previous audit IDs: 2, 10. Status: Implemented and validated in this source release.

8. Repair New Zealand bird-guide anchor

   Acceptance: The in-page bird-guide link targets its actual published section. Previous audit IDs: 6. Status: Implemented and validated in this source release.

9. Add safe application error recovery

   Acceptance: Retry and destination/account exits are available without displaying raw errors or claiming a save succeeded. Previous audit IDs: 10. Status: Implemented and validated in this source release.

10. Add progressive inventory search feedback

   Acceptance: The search submit control announces progress when JavaScript is available while preserving native GET navigation without JavaScript. Previous audit IDs: 10. Status: Implemented and validated in this source release.

11. Handle broken inventory thumbnails

   Acceptance: An unavailable image keeps the linked bird guide usable and labels the failure. Previous audit IDs: 10, 16. Status: Implemented and validated in this source release.

12. Give empty inventory searches a direct reset

   Acceptance: Zero matching records offer a country-specific reset next to the results. Previous audit IDs: 10. Status: Implemented and validated in this source release.

13. Land searches at the results

   Acceptance: Native GET searches link to the results anchor while retaining keyboard-accessible headings. Previous audit IDs: 2, 7. Status: Implemented and validated in this source release.

14. Expose inventories in the global footer

   Acceptance: A direct reference link makes the new inventory discoverable beyond country guides. Previous audit IDs: 6, 54. Status: Implemented and validated in this source release.

15. Expose country inventories in the visible site map

   Acceptance: All three canonical references appear in the human directory. Previous audit IDs: 6. Status: Implemented and validated in this source release.

16. Publish country inventory canonical URLs in XML

   Acceptance: The sitemap includes each country reference once and excludes private search queries. Previous audit IDs: 6. Status: Implemented and validated in this source release.

17. Keep inventory indexing aligned with actual filters

   Acceptance: Tracking parameters and empty defaults do not incorrectly turn a country reference into a filtered noindex page. Previous audit IDs: 6. Status: Implemented and validated in this source release.

18. Show published taxonomy crosswalks

   Acceptance: Source crosswalks are visible without implying a silent species merge. Previous audit IDs: 70. Status: Implemented and validated in this source release.

19. Label unresolved common names

   Acceptance: Scientific-name fallbacks explicitly say that a common name awaits source review. Previous audit IDs: 70. Status: Implemented and validated in this source release.

20. Credit the actual common-name source

   Acceptance: Country records link separately to their older name source when applicable. Previous audit IDs: 70. Status: Implemented and validated in this source release.

21. Credit older population-status facts

   Acceptance: Australian records distinguish and link the WLAB source separately from current species names. Previous audit IDs: 70. Status: Implemented and validated in this source release.

22. Link original published source files

   Acceptance: Readers can inspect the exact provider file behind an inventory edition. Previous audit IDs: 38, 70. Status: Implemented and validated in this source release.

23. Expose source-file integrity hashes

   Acceptance: The source details display recorded SHA-256 hashes for reproducible review. Previous audit IDs: 38, 70. Status: Implemented and validated in this source release.

24. Format the inventory interaction and query modules

   Acceptance: Complex compact JSX and query logic become readable without changing their intended source/data boundaries. Previous audit IDs: 20. Status: Implemented and validated in this source release.

25. Make the public HTTP audit repeatable

   Acceptance: A same-origin read-only audit checks sitemap routes, main landmarks, H1 counts, local anchors, alt attributes and duplicate IDs. Previous audit IDs: 21, 27. Status: Implemented and validated in this source release.


## B. Further source research or technical prerequisites (53)

These are not invented requests for approval. Much of this work can continue autonomously, but each item needs additional source material, technical investigation or a dependency before it can be responsibly marked complete. This is the next autonomous queue, not part of the completed first batch.

26. Audit accessibility throughout

   Acceptance: Review keyboard journeys, contrast, zoom and screen-reader names beyond the landmark repairs in this release. Previous audit IDs: 2. Status: Published; 704 unit/component tests and 61 browser checks passed.

27. Automate responsive browser checks

   Acceptance: Cover narrow phones, tablets, desktop, Firefox and Chromium without treating emulation as physical iPhone evidence. Previous audit IDs: 4. Status: Published; 704 unit/component tests and 61 browser checks passed.

28. Protect mobile map space

   Acceptance: Keep maps usable, controls reachable and the return path visible when text, credits or images open. Previous audit IDs: 5. Status: Published; 704 unit/component tests and 61 browser checks passed.

29. Complete deep-link, refresh and Back/Forward journey coverage

   Acceptance: Mounted-route history is repaired. Add cross-country browser journey coverage and verify restored titles, copy, selection and return paths. Previous audit IDs: 6. Status: Implemented; cross-country browser verification pending.

30. Simplify overlapping navigation controls

   Acceptance: Reduce competing region, habitat and gallery controls while preserving their shared selection. Previous audit IDs: 7. Status: Implemented; redundant pin targets removed, shared-selection browser verification pending.

31. Unify enquiry entry points

   Acceptance: Preserve destination, region and intent through global, Colombian, Australian and New Zealand contact journeys. Previous audit IDs: 8. Status: Implemented; enquiry context and receipt tests passed, browser verification pending.

32. Simplify saving and importing choices

   Acceptance: Reduce manual transfer steps for bird wishes, place ideas and private briefs without losing edits or changing sharing intent. Previous audit IDs: 9. Status: Open.

33. Standardise loading and recovery

   Acceptance: Check failed images, tiles, audio, requests and storage, with useful retry and fallback states. Previous audit IDs: 10. Status: Open.

34. Verify overlay return behaviour

   Acceptance: Check keyboard dismissal, focus, scroll and selected slide across expanded maps, photographs, credits and media. Previous audit IDs: 11. Status: Open.

35. Verify sound identity and controls

   Acceptance: Keep bird and regional sound cues aligned with playback, with clear stop, error and reduced motion behaviour. Previous audit IDs: 12. Status: Open.

36. Reduce remaining homepage and planner JavaScript

   Acceptance: The account-shell and NZ catalogue splits are finished. Profile remaining initial modules, preserve media handoff, and measure each reduction against the published build. Previous audit IDs: 15. Status: Open.

37. Improve image delivery

   Acceptance: Create appropriately sized modern image variants, defer hidden media and retain original rights and focal points. Previous audit IDs: 16. Status: Open.

38. Defer remaining large map and country payloads

   Acceptance: National inventories and NZ checklist media are already deferred. Review remaining geometry and country client imports, preserving progressive fallbacks. Previous audit IDs: 17. Status: Open.

39. Refactor oversized page components

   Acceptance: Separate embedded content and UI in the large articles, resources, team and partner pages. Previous audit IDs: 18. Status: Open.

40. Consolidate duplicated components

   Acceptance: The feather consolidation is finished. Review remaining duplicated audio/gallery controls and merge only equivalent behaviour. Previous audit IDs: 19. Status: Open.

41. Format and explain complex interaction code

   Acceptance: Format and explain remaining gesture, camera, upload and revision modules. Inventory formatting is covered by A24. Previous audit IDs: 20. Status: Open.

42. Add browser journey checks to release automation

   Acceptance: Complement existing unit and component checks with discovery, refresh, keyboard and save recovery journeys. Previous audit IDs: 21. Status: Open.

43. Review dependency and override risks

   Acceptance: Check current advisories, compatibility, lockfile overrides and supported versions before targeted updates. Previous audit IDs: 22. Status: Open.

44. Clean verified obsolete code and documentation

   Acceptance: Keep one active queue, archive superseded instructions and remove assets or code only after reference checks. Previous audit IDs: 23. Status: Open.

45. Establish performance and error budgets

   Acceptance: Measure real visitor loading, interaction, layout shifts, failed saves and service costs with appropriate privacy. Previous audit IDs: 24. Status: Open.

46. Verify recovery and rollback

   Acceptance: Document and test restoration of code, saved trip records and private files without assuming a code rollback restores data. Previous audit IDs: 26. Status: Open.

47. Build Tasmania’s five-photo gallery

   Acceptance: Review five distinct real photographs for locality, reuse rights, credits, alt text and capture dates. Reuse the existing regional gallery. Previous audit IDs: 28. Status: Open.

48. Build South Australia’s five-photo gallery

   Acceptance: Apply the same source, rights and visual review to five distinct photographs. Previous audit IDs: 29. Status: Open.

49. Build Western Australia’s five-photo gallery

   Acceptance: Review five distinct photographs and retain correct regional/place identities. Previous audit IDs: 30. Status: Open.

50. Build Northern Territory’s five-photo gallery

   Acceptance: Review five distinct photographs, including cultural context and any restrictions on depicted material. Previous audit IDs: 31. Status: Open.

51. Build the Australian Capital Territory’s five-photo gallery

   Acceptance: Review five distinct photographs within the correct territory. Previous audit IDs: 32. Status: Open.

52. Build Jervis Bay Territory’s five-photo gallery

   Acceptance: Verify territory boundaries. Do not substitute nearby New South Wales beaches. Previous audit IDs: 33. Status: Open.

53. Finish Australia’s country overview

   Acceptance: Represent all nine reviewed regional collections using the same records. The current overview covers three regions with six photographs. Previous audit IDs: 34. Status: Open.

54. Check gallery parity across all three destinations

   Acceptance: Verify counts, balanced overview selection, region/map synchronisation, photo controls, credits, enlargement, empty states and narrow layouts. Previous audit IDs: 35. Status: Open.

55. Extend official New Zealand route references

   Acceptance: Add compact, route-specific birding and ecotourism references to the existing pilot. Retain provenance. Previous audit IDs: 36. Status: Open.

56. Add dated first-hand trip reports and blogs

   Acceptance: Attribute sources and distinguish personal experience from official access, safety or supplier guidance. Previous audit IDs: 37. Status: Open.

57. Track source freshness

   Acceptance: Record review dates and flag stale access or supplier claims without inventing current availability. Previous audit IDs: 38. Status: Open.

58. Build and map the New Zealand conservation directory pilot

   Acceptance: Use official evidence for each organisation, location and stated contribution. Distinguish listings from AVES partnerships. Add an optional layer with readable markers, accessible details and dated source links. Previous audit IDs: 39, 40. Status: Open.

59. Verify and map a bounded B Corp supplier directory

   Acceptance: Check entity-level certification evidence and review dates. Avoid certification claims about an entire place or unrelated business. Reuse the existing map and layer controls. Show exactly which listed entity has verified evidence. Previous audit IDs: 41, 42. Status: Open.

60. Extend the conservation-directory pilot to Colombian and Australian corridors

   Acceptance: Use a bounded set of reviewed organisations and appropriate public locations. Apply the same evidence, locality and partnership distinctions. Previous audit IDs: 43, 44. Status: Open.

61. Audit shared bird filters

   Acceptance: Check habitat, native/introduced, endemic and conservation facets across maps, carousels and relevant selections. Preserve saved choices and unknown statuses. Previous audit IDs: 45. Status: Open.

62. Extend practical seasonal planning rules

   Acceptance: Use reviewed seasonal and opening-day sources for the pilot corridors. Previous audit IDs: 46. Status: Open.

63. Add useful weather or access alternatives

   Acceptance: Provide one sourced alternative for each pilot corridor, with realistic transport and access limits. Previous audit IDs: 47. Status: Open.

64. Improve partial price comparisons

   Acceptance: Keep currency, units, missing costs and quote requirements explicit. Never present incomplete totals as a complete trip price. Previous audit IDs: 48. Status: Open.

65. Clarify estimate-to-quote handoff

   Acceptance: Make the traveller’s next action clear and distinguish a planning estimate, personal quote and confirmed arrangement. Previous audit IDs: 49. Status: Open.

66. Review the next Colombian bird-photo batch

   Acceptance: Check identity, locality, creator permission, rights and credits against the actual originals and trip evidence. Previous audit IDs: 50. Status: Open.

67. Complete release checks on actual visitor flows

   Acceptance: Verify privacy, accessibility, performance, media loading and private save/reopen/edit journeys. Retain the physical-device and independent-visitor requirements. Previous audit IDs: 51. Status: Open.

68. Enforce access on every shared item

   Acceptance: Test owner and audience permissions for entries, files, previews and downloads. Previous audit IDs: 52. Status: Open.

69. Names and pronunciation

   Acceptance: Verify Indigenous bird/place names where available, language or tradition, regional scope, spelling, diacritics, source and review date. Use attributed community/language-authority sources and permitted pronunciation references or audio. Never invent a name, translation, etymology or pronunciation. Extend the existing pilot. Previous audit IDs: 53. Status: Open.

70. Comprehensive species inventories and place connections

   Acceptance: Extend the published national inventory into comprehensive sourced regional evidence, reconcile taxonomies, retain legitimate overlaps, and independently verify species/place/business/activity links. Commercial eBird access remains unresolved. National records are already published; regional completeness is not claimed. Previous audit IDs: 70. Status: Open.

71. Add unified search

   Acceptance: Search countries, regions and reviewed places through a consistent interface. Previous audit IDs: 54. Status: Open.

72. Save favourite places across trips

   Acceptance: Use explicit owner-controlled saves and stable place records. Previous audit IDs: 55. Status: Open.

73. Compare two saved itineraries

   Acceptance: Present meaningful differences without fabricating missing prices or timings. Previous audit IDs: 56. Status: Open.

74. Generate a downloadable trip pack

   Acceptance: Include the itinerary and explicitly selected practical records with appropriate privacy. Previous audit IDs: 57. Status: Open.

75. Offer a lower-bandwidth mode

   Acceptance: Use smaller images and restrained media loading while preserving usable maps and credits. Previous audit IDs: 58. Status: Open.

76. Make AVES installable

   Acceptance: Evaluate installation and offline behaviour after the essential saved-trip pilot. Previous audit IDs: 59. Status: Open.

77. Complete English and Spanish consistency

   Acceptance: Review maintained journeys, terminology, controls and original editorial copy. Previous audit IDs: 60. Status: Open.

78. Original bird storytelling

   Acceptance: Write original, fact-checked bird stories with accurate local settings and source attribution; validate placement before a wider rollout. Previous audit IDs: 61. Status: Open.


## C. One initial owner briefing, records or product choice (10)

Give the relevant initial information once, then execution can proceed within that briefing. The business plan leads this group because actual cash, founder pay, capacity and operating figures cannot be invented.

79. Update the professional AVES business plan

   Acceptance: Revise the existing November plan for the current travel guide, planning service and bird album. Include founder pay from month one, actual cash and costs, pricing, capacity, monthly cash flow, downside cases, customer acquisition, supplier roles and measurable B Lab stewardship actions. Separate facts, assumptions and later ambitions. Produce a polished owner edition and an external edition after review. Previous audit IDs: 0. Status: Open.

80. Confirm public business relationships

   Acceptance: Get your current list of team, advisory and supplier roles, then correct unsupported appointments and partnership wording. Previous audit IDs: 62. Status: Open.

81. Set the service operating limits

   Acceptance: Get your support hours, capacity and escalation contacts, then prepare a practical enquiry and disruption playbook. Previous audit IDs: 63. Status: Open.

82. Create the private bird-album foundation

   Acceptance: Use stable species records and owner-controlled observations. Prepare a reusable basis for later collectibles without exposing sensitive locations. Previous audit IDs: 64. Status: Open.

83. Separate desired, observed and verified birds

   Acceptance: Keep each status explicit. A saved wish or uploaded photograph must not automatically become a verified sighting. Previous audit IDs: 65. Status: Open.

84. Reconstruct the Colombia trip route

   Acceptance: Use actual trip records. Keep traveller identities and private itinerary details private. Previous audit IDs: 66. Status: Open.

85. Populate the private Colombia journal

   Acceptance: Add only reviewed trip material, linked to the correct places and days. Previous audit IDs: 67. Status: Open.

86. Make essential saved trip information available offline

   Acceptance: Define what is stored, how it is refreshed and how the traveller clears private local data. Previous audit IDs: 68. Status: Open.

87. Prototype optional 3D terrain

   Acceptance: Keep the useful shared map, a lightweight fallback and acceptable mobile performance. Previous audit IDs: 69. Status: Open.

88. Collectible 3D bird assets

   Acceptance: Identify the previously used web app if evidence becomes available. Inventory existing 3D MP4s and assets, then review one accurate, licensed bird pilot. Distinguish an editable 3D model from a rendered image or video. Retain stable species IDs, creator/source/rights, reusable model exports, lightweight logo/animation renditions, static/reduced-motion fallbacks and future album/game compatibility. Sightings-based unlocking remains a later game mechanic; it is not implemented. Previous audit IDs: 71. Status: Open.


## D. Defined consent, access or publication checkpoints (6)

These items involve actual consent, audience/access decisions, disposable private records or publication. Existing authorization is reused where it applies; unverified permissions are not assumed.

89. Resolve synthetic test fixture cleanup

   Acceptance: Inspect only. Destructive fixture cleanup needs separately verified disposable records and current exact authorization; previous cleanup approval is not reused. Previous audit IDs: 25. Status: Open.

90. Confirm contributor permissions and participant consent

   Acceptance: Record the permitted uses and credits for each selected contribution before publication or sharing. Previous audit IDs: 72. Status: Open.

91. Preview a shareable journal edition

   Acceptance: Exclude private fields and sensitive locations. Preview before any sharing action. Previous audit IDs: 73. Status: Open.

92. Add revocable journal share links

   Acceptance: Provide explicit owner control over audience, access and revocation. Previous audit IDs: 74. Status: Open.

93. Prepare the selected Colombia edition and New Zealand invitation

   Acceptance: Prepare for owner review. This task does not send invitations or publish private trip content. Previous audit IDs: 75. Status: Open.

94. Define community consent and moderation rules

   Acceptance: Set audience, reporting, blocking and moderation responsibilities before enabling community publication. Previous audit IDs: 76. Status: Open.


## E. Real-device, participant or operating evidence (6)

These require observed evidence. Automated tests and owner-reported review do not substitute for measured physical-device behaviour, independent visitor feedback or actual trading results.

95. Review launch readiness and decide the limited paid pilot

   Acceptance: Reconcile the pilot decision, remaining defects, actual operating evidence, rollback and traveller feedback before choosing the next delivery cycle. Needs actual founder/cash/capacity inputs, physical-mobile acceptance and independent visitor evidence. Illustrative financial scenarios do not complete the decision. Previous audit IDs: 77, 81. Status: Open.

96. Validate on physical iPhone/Safari

   Acceptance: Needs an actual device test of map drag, double tap, pinch, scrolling, galleries, controls and return navigation. Desktop narrow-layout checks do not complete it. Previous audit IDs: 78. Status: Open.

97. Run an independent New Zealand visitor test

   Acceptance: Needs a participant to complete the full planning task, with observed friction and feedback recorded. Previous audit IDs: 79. Status: Open.

98. Fix the main visitor-test friction

   Acceptance: Depends on item 79. Prioritise the highest-impact issue and retest the affected journey. Previous audit IDs: 80. Status: Open.

99. Incorporate invited traveller feedback

   Acceptance: Use actual feedback to improve the planner and journal. Do not claim independent feedback before it exists. Previous audit IDs: 82. Status: Open.

100. Choose the next cycle using real usage and costs

   Acceptance: Review traveller feedback, operating costs and actual use before expanding further. Previous audit IDs: 83. Status: Open.


## Evidence and references

- Public baseline: [public-http-baseline-2026-11-13.json](audit/public-http-baseline-2026-11-13.json).
- Repeatable audit: `python scripts/audit-public-http.py --base-url http://127.0.0.1:3004 --output public-http-audit.json`.
- [B Lab ESC reference](https://usca.bcorporation.net/putting-stewardship-to-work-tracking-esc-standards/).
- Canonical runtime and rollback: [release checkpoint](RELEASE-AUDIT-SPECIES-2026-11-13.md).

## First batch validation

704 tests pass. Strict TypeScript, the production build and the emitted-catalogue split check pass. ESLint has zero errors and 34 existing warnings. The production dependency advisory check reports zero known advisories. The local production audit checks all 78 public URLs with no HTTP failures, missing/duplicate main or H1 landmarks, missing alt attributes, duplicate IDs or broken local anchors within this check. Stale-page recovery, empty search reset and Sierra Nevada enquiry regressions also pass. These checks do not establish measured mobile performance, physical touch behaviour or authenticated save acceptance.

Build estimates remain 445 kB for the homepage, 236 kB for sign-in and 175 kB for the inventory reference. This batch does not claim a new mobile speed improvement.


## Audit batch published, 13 November 2026 Sydney

The 25 immediate, input-free improvements in the 100-item roadmap are published on `aves.bio` and `www.aves.bio`. Runtime commit: `05f52dfddb683a41058e27c828785d421519236c`. Deployment: `dpl_2pZhHBMruM9KzVoLBehP7nsjcgD3`. The new source tree matched the locally tested checkout before push.

704 tests pass on declared Node 22.23.5 (and the local Node 24 runner). TypeScript, production build, zero-error lint and catalogue split checks pass. There are 34 pre-existing lint warnings. The live read-only public HTTP audit passes all 78 routes with no failures in its status, main/H1 landmark, missing-alt, local-anchor or duplicate-ID checks. The browser confirms `offset=99999` now shows Colombia entries 1921 to 1945 rather than an empty page. Production HTTP evidence: `docs/audit/public-http-production-2026-11-13.json`.

Rollback for both domains: `dpl_AZhmj9YyGNkoFqQwXc8fLUjRL5dd`, runtime `fd1c588b40f55b36f086382f769737517428028d`. No database changes, private fixture cleanup, customer writes or outbound messages were made. Physical Safari, signed-in save acceptance and financial validation remain open. The roadmap retains 75 further improvements; publication of category A is not completion of the whole queue.

## Accessibility release and continued scope, 13 November 2026 Sydney

The owner extended the active instruction to items 26 through 78. Items 26 to 28 are published on both custom domains from `edffc49aa462045693a5839d8ef08859764f4a28`, deployment `dpl_HZwyZT4z835C9eNxEvo4pgWvhrNM`. [CI evidence](https://github.com/mmelendro/Aves/actions/runs/43278342669): 704 unit/component tests, lint, TypeScript, production build and 61 executed browser checks pass; five duplicate sitemap scans are deliberately skipped. The desktop scan covers all 78 public sitemap routes. Keyboard, modal dismissal, focus return, narrow/landscape layouts and 200% CSS text reflow pass across the declared projects. This is automated coverage, not physical Safari or screen-reader certification.

The source fixes shared contrast, named form/photo controls, underlines, target size and obstruction. Colombian map shapes now own each region's named activation area; pins are decorative, avoiding overlapping duplicate focus stops while retaining preview, direct links, selection, filters and geometry. Rollback for both domains is `dpl_2pZhHBMruM9KzVoLBehP7nsjcgD3`. No database or customer records were changed.

Items 29 to 31 are in verification: cross-country refresh/history journeys, connected map/gallery state and a common enquiry context. New Zealand enquiry regions now survive through the receiving form and country-specific receipt validation. Do not treat their implementation as publication before the expanded browser run and release checks pass.
