# Final complete AVES audit, 13 November 2026

The live application remains runtime `43943bb2740dfce0fafd43577ffbafec3037ed5a`, deployment `dpl_49nEtSR46vpeufJSdLncJ8r9i8Te`. This audit changes only the task register and handoff documentation. It does not implement the new list or change application data, authentication settings, tracking or deployments.

28 pending scopes numbered 0 to 27:9 with no owner involvement,5 owner decisions,8 files/access scopes and6 participation/conditional scopes. The previous 60 published scopes remain in the archive. Former 17 open scopes are all retained; two bundled scopes were split so measurement/security and videos/models can be handled independently.

## Audit coverage and results

Fresh checks: 81 public URLs return 200 with one main and one H1, no missing image-alt attributes, no duplicate rendered IDs or broken same-document anchors in the inspected HTML. Decoded HTML budgets pass: credits 492,018 bytes and South Island 918,082. Source reachability is 471 modules with none unreachable. Generated gallery snapshots match reviewed source. These HTTP checks do not exercise every client interaction or external link.

The unchanged runtime retains successful CI 43392941281: 775 unit tests, 128 full browser passes and 160 deliberate project-specific skips; 24 focused passes and 8 skips. Build, TypeScript, catalogue deferral, geometry and unchanged JavaScript budgets pass. Lint has zero errors and 31 warnings. This audit reused that exact-runtime evidence rather than claiming a new full browser run.

Private account/media/export handlers were sampled at source level and existing synthetic tests were reviewed. No new confirmed ownership bypass was found in that bounded review. No new live two-account, database restore, physical Safari, independent-traveller or commercial-readiness proof is claimed. A local lint recheck could not use the shared dependency environment; the exact-runtime CI result is authoritative. The prior managed preview remains unavailable because its launcher passes unsupported Next flags, so fresh UI inspection used the published site.

Live read-only checks confirmed the scheduler submit default, enquiry draft loss on reload and homepage/Colombia context mismatch. Only a harmless audit text was typed; no inquiry, email, invitation or private record was submitted. The workspace hash-history finding was synthetically reproduced, not claimed as live private-account proof. The scheduler iframe sizing and duplicate close controls are a watch item for task 0/physical testing, not a confirmed clipping defect. One cloud sidebar navigation attempt did not settle and is included in task 2/22 regression coverage.

## Priority and involvement

A. No owner involvement. Source/UI/document changes and isolated regression checks.
B. Short owner decisions, facts or figures.
C. Source files, rights, selected content or authorised isolated access.
D. Physical device use, another participant, observed feedback or a specific release/deletion decision.

High: Before a paid pilot, or before the affected action such as deleting a record. No confirmed critical outage was found.
Medium: Next quality/evidence work, or after its stated prerequisite.
Later: Optional capability or cleanup; not a launch prerequisite by default.

The first small repair batch is0 to4. Task 1 precedes task 2 because the shared navigation guard should be corrected before reusing it. Tasks5 to8 can follow without owner input. Business readiness work can run alongside the technical fixes once the relevant facts are supplied.

## Pending register

| ID | Task | Urgency | Owner involvement | Status | Previous IDs | Dependencies |
|---|---|---|---|---|---|---|
| 0 | Make Schedule Call open without submitting an enquiry | High | A | Ready | New finding | None |
| 1 | Keep workspace section history separate from leaving unsaved work | High | A | Ready | New finding | None |
| 2 | Protect unfinished public enquiries | High | A | Ready | New finding | 1 |
| 3 | Preserve destination context in remaining conversation links | High | A | Ready | New finding | None |
| 4 | Describe saved-record exports accurately before deletion | High | A | Ready | New finding | None |
| 5 | Make current source and HTML checks release gates | Medium | A | Ready | New finding | None |
| 6 | Align cookie wording with the implemented tracking inventory | Medium | A | Ready | New finding | None |
| 7 | Resolve or document the remaining lint warnings | Medium | A | Ready | New finding | None |
| 8 | Refresh remaining runbooks and business-plan product evidence | Medium | A | Ready | New finding | None |
| 9 | Confirm business identity, roles and public claims | High | B | Needs owner input | 21 | None |
| 10 | Confirm support hours, timezone and emergency arrangements | High | B | Needs owner input | 22 | None |
| 11 | Supply actual financials and complete the investor edition | High | B | Needs owner input | 20 | None |
| 12 | Approve sharing, contributor consent and moderation rules | High | B | Needs owner input | 23 | None |
| 13 | Choose measurement, stewardship indicators and spending limits | Medium | B | Needs owner input | 24 | None |
| 14 | Review hosted password-protection settings and eligibility | High | C | Needs owner input | 24 | None |
| 15 | Prove isolated restore and separation between two accounts | High | C | Needs owner input | 29 | None |
| 16 | Complete the Colombia album and journal from originals | Medium | C | Needs owner input | 25 | 12 |
| 17 | Complete supported regional species coverage | Medium | C | Needs owner input | 26 | None |
| 18 | Preview and reconcile an actual eBird trip import | Medium | C | Needs owner input | 55 | 12, 16, 17 |
| 19 | Add approved original trip videos | Later | C | Needs owner input | 27 | 12 |
| 20 | Add one accurate editable bird model | Later | C | Needs owner input | 27 | None |
| 21 | Review a selected trip story and any invitation | Medium | C | Needs owner input | 28 | 12, 16 |
| 22 | Accept the experience on a physical iPhone | High | D | Needs owner input | 30 | 0, 1, 2, 3, 4 |
| 23 | Observe an independent New Zealand planning trial | High | D | Needs owner input | 31 | 0, 1, 2, 3 |
| 24 | Fix the issues actually observed in the traveller trial | Medium | D | Waiting for observed feedback | 32 | 23 |
| 25 | Remove only specifically identified disposable records | Later | D | Optional; needs named records and decision | 33 | None |
| 26 | Decide whether to run the first paid planning pilot | High | D | Needs owner input | 34 | 0, 1, 2, 3, 4, 9, 10, 11, 12, 13, 14, 15, 22, 23, 24 |
| 27 | Choose the next cycle from actual use and delivery evidence | Medium | D | Waiting for pilot evidence | 35 | 13, 24, 26 |

## Completion checks and evidence

### 0. Make Schedule Call open without submitting an enquiry

Completion: Give the scheduler trigger an explicit button type. Test empty and valid enquiry forms in isolation: opening and closing the scheduler must never POST, trigger unrelated validation or lose answers. Check dismissal on a small viewport.

Evidence: Live DOM on /contact: declared type absent, effective type submit, form owner present. Source: components/google-calendar-button.tsx:39 and components/contact-form-section.tsx:426. No enquiry was submitted in this audit.

### 1. Keep workspace section history separate from leaving unsaved work

Completion: Allow hash-only Back and Forward between workspace sections while preserving every dirty editor. Keep discard guards for leaving the trip, another path or a changed search scope. Regress two dirty editors and cancelled departure.

Evidence: components/account/unsaved-changes.ts:7 compares full href including fragment; line16 allows section clicks. Read-only synthetic reproduction produced one false discard prompt and pushed history back to the dirty-start anchor.

### 2. Protect unfinished public enquiries

Completion: Apply the shared dirty-form guard to both public enquiry implementations after task 1. Confirm Stay preserves answers, Leave discards deliberately, and a stored success clears dirty state. Do not automatically persist personal messages. Cover sidebar links and reload.

Evidence: Live /contact: a harmless audit-only message disappeared after reload with no beforeunload dialog. Both public form implementations lack the shared guard. One sidebar-link attempt did not settle in the cloud browser; reproduce it in the isolated fixture rather than infer a universal navigation failure.

### 3. Preserve destination context in remaining conversation links

Completion: Use the existing enquiry-context helper for the homepage Start a conversation CTA and Colombian message links. Test world, all three countries and selected regions. Leave the already-correct footer intact.

Evidence: Live homepage with Colombia selected: main CTA remains /australia/contact?topic=general#inquiry while footer is /contact?country=colombia#inquiry. app/page.tsx:68; components/contact-form-section.tsx and features/colombia/contact-page.tsx also contain general Australian message links.

### 4. Describe saved-record exports accurately before deletion

Completion: Replace complete private backup wording with saved-record JSON export guidance. Explain that attachment files and unsaved edits are not included and must be handled separately. Preserve existing exports, ownership and deletion confirmation.

Evidence: components/account/delete-draft.tsx:16 says complete private backup. lib/trip-export-handler.ts:16 and components/account/trip-travel-records.tsx:615 exclude attachment bytes and unsaved edits.

### 5. Make current source and HTML checks release gates

Completion: Gate candidate production output on source reachability, generated gallery snapshots and decoded HTML budgets before browser-fixture mutation. Keep JavaScript limits and existing browser tests. Compare cleanup inventory changes for review, without automatically deleting retained aliases or media.

Evidence: .github/workflows/public-browser-checks.yml omits audit-source.mjs, generate-gallery-snapshots.cjs --check and decoded HTML checks. check-performance-budgets.mjs checks initial JavaScript only. HTML limits currently require a separate live audit.

### 6. Align cookie wording with the implemented tracking inventory

Completion: Inventory the actual deployed loaders and cookies. State which optional categories are active and which are only future choices. Remove unsupported current advertising/performance claims. Preserve opt-in defaults and do not install tracking to match old copy.

Evidence: app/cookies/page.tsx:83-105 describes performance and targeting cookies as operating. Reviewed source contains a conditional consent bridge but no installed analytics or ad loader in the sampled app. External deployment-level tracking is not claimed absent.

### 7. Resolve or document the remaining lint warnings

Completion: Review the 31 exact-runtime warnings in small coherent commits. Correct real hook dependency, accessibility and image-delivery issues. Document narrowly justified exceptions instead of globally suppressing rules or blindly adding unstable dependencies.

Evidence: Exact-runtime CI 43392941281: zero lint errors and 31 warnings, including hook dependencies, unused props, image delivery and one alt-text warning. This is not evidence that every warning is a user-visible bug.

### 8. Refresh remaining runbooks and business-plan product evidence

Completion: Label historic release examples clearly and update current runtime, test and feature facts in operational documents and the owner plan. Keep actual finances unknown and keep the external investor edition pending owner figures. Do not claim hosted restore or physical acceptance.

Evidence: RECOVERY-2026-11-13.md still presents an earlier deployment/78-route snapshot as current evidence. Current owner plan v3 page 2 cites cc448cd/741 tests, while the audited runtime is43943bb with 775 tests. Architecture and this active queue are already current.

### 9. Confirm business identity, roles and public claims

Completion: Confirm the contracting identity, current team and supplier roles, permissions and any office claims. Review remaining source-authored commercial, cultural and legal Spanish. Publish only supported claims.

Evidence: Old21 remains open. Live Colombia contact page labels Our Offices, Sydney Operations Hub and Bogotá Field Operations Center. These are owner facts, not facts inferred from code.

### 10. Confirm support hours, timezone and emergency arrangements

Completion: Choose realistic response hours, timezone, capacity and backup. Replace unconfirmed weekday and weekend emergency promises with confirmed wording.

Evidence: Old22 remains open. Live Colombia contact page promises9 am to 6 pm PST weekdays and weekend emergency support.

### 11. Supply actual financials and complete the investor edition

Completion: Provide current business cash, obligations, operating costs, founder pay from month one and available delivery hours. Reconcile the editable cash model, scenarios and investor claims. Separate assumptions from actuals and do not invent an investment return.

Evidence: Old20 remains open. Current Eco-tourism Business Plan owner edition v3 pages 1-2 explicitly states that financial/customer evidence does not yet establish commercial readiness.

### 12. Approve sharing, contributor consent and moderation rules

Completion: Agree default audience, photo and story permissions, attribution, sensitive wildlife location handling and review rules. Private records remain private until specific publication approval.

Evidence: Old23 remains open. Required before publishing originals, trip stories, invitations or any future public journal.

### 13. Choose measurement, stewardship indicators and spending limits

Completion: Choose a small consent-respecting set of completion, return-use and delivery-effort measures with spending limits. Select proportionate environmental/supplier indicators and evidence owners. Record unknown baselines rather than invent scores, offsets or impact.

Evidence: Measurement part of old24. Current plan is a bounded planning service; B Lab ESC reference emphasises measured impacts and supplier accountability. No new tracking or recurring spend is authorised.

### 14. Review hosted password-protection settings and eligibility

Completion: Confirm the current project setting, available entitlement and authorised settings access. Assess the recorded disabled leaked-password protection and agree a supported configuration without an unapproved plan upgrade. Validate the chosen sign-up/reset behaviour.

Evidence: Security part of old24. The disabled-setting observation comes from the earlier read-only advisory record, not a fresh live settings read in this audit. Current Supabase password-security documentation was checked.

### 15. Prove isolated restore and separation between two accounts

Completion: Use an authorised isolated environment and disposable test accounts. Restore both saved rows and private file bytes, compare hashes and test owner/second-account access. Record outcomes and recovery time. Never restore over production for a test.

Evidence: Old29 remains open. Current recovery register explicitly lacks hosted row-and-file restore and real two-account proof. Sampled owner checks and synthetic tests are useful but do not close this gap.

### 16. Complete the Colombia album and journal from originals

Completion: Supply actual trip records and original photos with usable rights. Reconcile dates, people, taxonomy and photo provenance privately. Distinguish planned route, group totals, wishes and individual observations. Publish only selected approved material.

Evidence: Old25 remains open. Prior promise of source access does not supply the actual photos, daily observations or reuse permissions.

### 17. Complete supported regional species coverage

Completion: Expand and reconcile regional evidence using reviewed sources and the existing coherent national format. Keep unsupported distributions and dates visible as gaps. A Santa Marta name is a regional review lead, not proof of a complete range or trip observation.

Evidence: Old26 remains open. National inventories and current reviewed regional matches are already implemented. Comprehensive regional evidence remains incomplete.

### 18. Preview and reconcile an actual eBird trip import

Completion: Supply the real export/report. In a private dry run, show taxonomy matches, unmatched species, duplicates, dates and withheld locations. Import only explicitly accepted records and never publish automatically.

Evidence: Old55 remains open. No exact source export or daily-sighting evidence was supplied in this audit.

### 19. Add approved original trip videos

Completion: Provide original files, dates, credited contributors and display permission. Prepare web variants while retaining provenance and distinguish reference footage from actual trip evidence.

Evidence: Video portion of old27. Existing placeholders or public references are not the missing original files.

### 20. Add one accurate editable bird model

Completion: Supply or commission a licensed editable source asset for one reviewed species. Validate accuracy, source files, web delivery and mobile limits before expanding the model library.

Evidence: Model portion of old27. Existing static bird artwork and optional terrain preview do not supply a licensed editable species model.

### 21. Review a selected trip story and any invitation

Completion: Select the exact private story preview, audience and recipient. Review contributor permission and sensitive-location omissions. Keep previewing separate from public publication or sending an invitation.

Evidence: Old28 remains open. Private story preview capability is complete; selected content and person-specific approval are not.

### 22. Accept the experience on a physical iPhone

Completion: Run a real Safari journey: touch/pinch/double-tap maps, overlays/credits/scheduler, enquiry sidebar links and draft protection, planner navigation, account edits, image orientation, reload and the downloaded offline pack. Record device/browser results.

Evidence: Old30 remains open. Emulated phone and Firefox checks do not establish physical-device behaviour.

### 23. Observe an independent New Zealand planning trial

Completion: Have a traveller complete destination selection, bird wishes, route comparison, day editing, saving/reopening and export without coaching. Record completion, confusion and elapsed effort using agreed consent.

Evidence: Old31 remains open. Founder-led and synthetic checks are not independent traveller acceptance.

### 24. Fix the issues actually observed in the traveller trial

Completion: Turn observed feedback into small prioritised changes and verify them with the participant. Do not invent findings before the trial. Keep unproven feature requests separate from broken behaviour.

Evidence: Old32 remains open and conditional. No independent traveller findings are available yet.

### 25. Remove only specifically identified disposable records

Completion: Name the exact disposable records, preserve required copies and obtain the specific deletion decision. Use normal recoverability where available. No generic production cleanup or unidentified deletion.

Evidence: Old33 remains open and optional. The audit does not identify records as disposable or authorise deletion.

### 26. Decide whether to run the first paid planning pilot

Completion: Review actual economics, contracting role, support capacity, recovery/security proof and trial outcomes. Define one bounded offer, terms, capacity, price and go/no-go decision. A working app is not proof of commercial readiness.

Evidence: Old34 remains open. Current owner business plan supports a planning-service-first sequence rather than unconfirmed bookable tours.

### 27. Choose the next cycle from actual use and delivery evidence

Completion: After a pilot, compare completion, return use, time to deliver, support load, cost and proportionate impact evidence. Keep useful changes and retire unsupported ideas based on the agreed measures.

Evidence: Old35 remains open and conditional. No real retention, paid demand or delivery-cost result was established by this audit.

## Preserved decisions

National inventory entries are not confirmed regional sightings. Owner observations are not automatically verified records. Active auth/dashboard/shopping adapters, old media URLs and Australian mirrors remain deliberately supported. The390 retained duplicate asset groups are not reopened as blanket deletion work. No automatic emails, public journal sharing, new analytics or paid subscriptions are introduced. No unsupported financial forecasts or environmental scores are invented.

## Business and stewardship

References: current owner Eco-tourism Business Plan v3 (AVES_Business_Plan_2026-11.pdf, version 2, pages 1-2); [B Lab stewardship reference](https://usca.bcorporation.net/putting-stewardship-to-work-tracking-esc-standards/); [Supabase password security](https://supabase.com/docs/guides/auth/password-security); [Supabase backup scope](https://supabase.com/docs/guides/platform/backups). The B Lab article supplies proportionate measurement guidance, not certification. Current provider docs were consulted; the hosted setting itself was not reread.

The existing service direction remains a bounded planning offer with founder pay from month one, practical private trip continuity and evidence before expansion. Prefer useful completion and delivery measures over unconsented retention messaging. Track real biodiversity/supplier risks and permissions at the relevant decision points.
