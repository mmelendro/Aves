# AVES consolidated audit queue, 13 November 2026

This is the active queue. It was posted in chat before app edits. Each row is a separate commit scope. Completed historical work stays in the archived roadmap. User decisions are required only where evidence, material or participation is genuinely missing.

Baseline: runtime `cc448cd3e02d208aca4ac6e3f28b1e502b6fbb54`, deployment `dpl_3Ehyc4qsBCgHcw6LFj7YgpdQpAAn`. 81 live URLs pass the basic HTTP/structure audit. Existing CI: 741 unit tests, 105 browser checks, 87 intentional skips. Synthetic account checks do not prove hosted account isolation.

Reference: current owner Eco Tourism Business Plan v3. Founder pay, current cash, actual costs and capacity remain unknown. Public prices, offsets, partners and paid service claims must not imply confirmed facts. B Lab environmental stewardship is an operating reference, not certification: https://usca.bcorporation.net/putting-stewardship-to-work-tracking-esc-standards/ .

| Commit | Group | Scope | Previous unfinished IDs | Dependencies |
|---|---|---|---|---|
| 0 | A | Consolidate the active queue and release metadata | New audit | None |
| 1 | A | Protect the destination of a saved trip | New audit | None |
| 2 | A | Include bird albums in the complete private backup | New audit | None |
| 3 | A | Prune unavailable offline pack selections | New audit | None |
| 4 | A | Allow confirmed deletion of unused drafts | New audit | None |
| 5 | A | Repair country navigation and cross page fragments | New audit | None |
| 6 | A | Present tours as proposed personal itineraries | New audit | None |
| 7 | A | Align public impact and relationship claims with evidence | New audit | None |
| 8 | A | Make photo controls and credits accessible | New audit | None |
| 9 | A | Describe current privacy and account behaviour | New audit | None |
| 10 | A | Separate historical calendar examples from current events | New audit | None |
| 11 | A | Make terrain controls work by touch | New audit | None |
| 12 | A | Offer reviewed places in country journals | New audit | None |
| 13 | A | Preview selected journal content privately | 91 | None |
| 14 | A | Protect unsaved plan edits | New audit | None |
| 15 | A | Complete Spanish sign in and saved plan controls | 77 | None |
| 16 | A | Complete Spanish private workspace controls | 77 | None |
| 17 | A | Complete Spanish New Zealand planner controls | 77 | None |
| 18 | A | Complete Jervis Bay and Australian overview imagery | 52, 53 | None |
| 19 | A | Verify and publish the independent group | New audit | 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18 |
| 20 | B | Complete actual business financials and investor edition | 79 | None |
| 21 | B | Confirm current business roles and relationships | 80 | None |
| 22 | B | Confirm support hours capacity and backup | 81 | None |
| 23 | B | Agree sharing consent and moderation rules | 90, 92, 94 | None |
| 24 | B | Agree measurement and spending limits | 45 | None |
| 25 | C | Complete the evidenced Colombia trip album and journal | 66, 84, 85 | 23 |
| 26 | C | Complete supported regional species coverage | 70 | None |
| 27 | C | Add original videos and editable bird models | 88 | None |
| 28 | C | Review the selected trip story and invitation | 91, 93 | 13, 23, 25 |
| 29 | C | Prove isolated restore and two account separation | 46, 68 | 1, 2 |
| 30 | D | Accept the experience on physical iPhone Safari | 67, 76, 96 | 11, 19 |
| 31 | D | Observe an independent New Zealand planner trial | 97 | 19 |
| 32 | D | Address observed traveller feedback | 98, 99 | 28, 31 |
| 33 | D | Remove specifically authorised disposable records | 89 | None |
| 34 | D | Decide the first paid pilot | 95 | 20, 21, 22, 29, 30, 31, 32 |
| 35 | D | Select the next cycle using actual evidence | 100 | 24, 32, 34 |

A requires no owner input. Original items 0 to 19 are published. Items 36 to 54 are now published and verified. Item 35 remains pending actual evidence. B needs short decisions or figures. C needs originals, permissions or isolated test access. D needs physical device participation, actual feedback or a specific irreversible cleanup decision.

Commit 26 preserves reviewed national inventories and regional matches. A common name containing Santa Marta is a review lead, not complete range evidence. Commit 25 distinguishes planned itinerary from actual travel and owner entered observations from verified records. Commit 29 must not restore over production. Commit 33 must not delete unidentified records. Invitations and public private-journal sharing are not authorised by this audit.

Detailed findings are in source control and the chat list. New automated checks should target real failure modes rather than mirror implementation.

## Historical 0 to 19 release

Independent group 0 to 19 is published on both aves.bio and www.aves.bio. Runtime `bfe1192176813c4e273c1636d5fabc22807161e0`, production deployment `dpl_FkVGxkbsQay9K36rDz9ZX1ei4Qbr`. [CI 43359012336](https://github.com/mmelendro/Aves/actions/runs/43359012336): 751 unit tests, 109 browser checks, 101 intentional project-specific skips. Nine focused checks also pass with three intentional skips. Lint: zero errors and 32 existing warnings. Production build, TypeScript, catalogue deferral, performance budgets and geometry checks pass. Source reachability: 451 modules, none unreachable. 81 public URLs pass the live HTTP/basic structure check. Anonymous private plans, album and export return application JSON 401 with private, no-store caching. The CI fixture route is 404 in production.

CI initial gzip estimates: homepage 366440 / 367210 bytes, account 290280 / 356026. These are build estimates, not visitor speed. Live browser checks confirm proposal wording, table selection, photo disclosure and Escape focus, and Spanish multiline planning warnings. No auth, traveller data or application protection settings were changed for browser access. The staged host stayed protected.

Item 21 also retains the remaining commercial, cultural and legal Spanish editorial review. Old task 77 is not marked wholly complete. Old broad acceptance task 67 maps to real accounts (29), physical device checks (30) and independent visitor participation (31).

The live browser review found a multiline translation lookup defect. A regression test and a separate item 19 correction were added, the complete release workflow reran successfully, then both domains moved to the corrected production build. Prior application deployment `dpl_2MTiqPsVevLD2PLUhiMA3BPjh7t2` is retained, alongside the pre-audit baseline `dpl_3Ehyc4qsBCgHcw6LFj7YgpdQpAAn`.

The final Supabase security review reports the existing `rls_enabled_no_policy` information and `auth_leaked_password_protection` warning. The disabled password check remains under current item 24 for plan eligibility and project settings review. The [official password guidance](https://supabase.com/docs/guides/auth/password-security) lists this feature on Pro and above. No paid upgrade or Auth setting change was made.

## Product journey audit extension

[Evidence and completion criteria](audit/PRODUCT-AUDIT-2026-11-13.md). Existing 20 to 35 are unchanged. The new list below precedes implementation of these scopes. Priority order: repair 36 to 47, then useful additions 48 to 54. Item 55 waits for actual source prerequisites.

| Commit | Group | Type | Scope | Dependencies | State |
|---|---|---|---|---|---|
| 36 | A | Repair | Keep calendar dates unchanged across time zones | None | Published and verified |
| 37 | A | Repair | Recover guest itinerary edits and respect cleared bird wishes | None | Published and verified |
| 38 | A | Repair | Prevent copying an outdated itinerary | None | Published and verified |
| 39 | A | Repair | Carry valid longer routes without overflowing planning notes | None | Published and verified |
| 40 | A | Repair | Price optional alternatives consistently | None | Published and verified |
| 41 | A | Repair | Apply world bird filters using each bird's country | None | Published and verified |
| 42 | A | Repair | Open the exact place selected in search or favourites | None | Published and verified |
| 43 | A | Repair | Protect unsaved album journal and media edits during navigation | 14 | Published and verified |
| 44 | A | Repair | Finish evidence-based wording in media credits and tour features | None | Published and verified |
| 45 | A | Repair | Use smaller existing renditions throughout the NZ bird picker | None | Published and verified |
| 46 | A | Performance | Load country gallery data only when needed | None | Published and verified |
| 47 | A | Verification | Verify and publish the repaired planning journey | 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46 | Published and verified |
| 48 | A | New capability | Store an owned versioned editable itinerary | 39, 47 | Published and verified |
| 49 | A | New capability | Review and import structured travel preferences | 48 | Published and verified |
| 50 | A | New capability | Reopen and edit saved itinerary days | 48, 49 | Published and verified |
| 51 | A | New capability | Include selected saved brief details in the offline pack | 48, 49 | Published and verified |
| 52 | A | New capability | Add selected planning wishes to the private bird album | 47 | Published and verified |
| 53 | A | New capability | Link owned journal entries and photos to bird records | 43, 52 | Published and verified |
| 54 | A | New capability | Show a private bird collection across trips | 52, 53 | Published and verified |
| 55 | C | New capability | Preview and reconcile a supplied eBird trip import | 23, 25, 26, 52 | Open |

The audit preceded implementation. The current release evidence below supersedes its original open status.

## Requested two-batch release

The requested batches 35 to 44 and 45 to 54 are released. Technical items 36 to 54 are completed. Item 35 was reviewed and remains pending actual cost, usage, paid-pilot and traveller evidence under dependencies 24, 32 and 34. Items 20 to 35 and 55 remain open. No independent technical item remains in this queue.

Runtime `0e832635514f1ec2232f63d7776996ed64993d1e`, deployment `dpl_XmJLienyDhuJRqRrVBUweQUyGK1L`, on both aves.bio and www.aves.bio. [Release checks](https://github.com/mmelendro/Aves/actions/runs/43379516403): 770 unit tests, 118 full browser checks and 128 intentional project-specific skips. 14 focused checks pass with 4 intentional skips. Build, TypeScript, unchanged performance budgets, catalogue deferral, geometry and gallery snapshots pass. Lint: zero errors, 31 warnings. Source reachability: 470 modules, none unreachable.

[Detailed evidence](audit/BATCHES-35-54-2026-11-13.md).
