# Continue AVES development

The only active numbered backlog is [the 100-item roadmap](docs/AUDIT-ROADMAP-100-2026-11-13.md), with [machine-readable state](docs/audit/roadmap-100-2026-11-13.json).

Items 79 to 88 were processed. Items 82, 83, 86 and 87 are published. The release adds a private bird album, explicit desired/observed states, offline snapshot guidance and an optional bounded 3D terrain preview. Unsupported team/advisory appointments and partnership wording were removed. There are 72 completed items among the first 88.

Six scopes in this batch remain partial: 79 business actuals and external edition, 80 current business-role confirmations, 81 actual service hours/capacity/contacts, 84 actual Colombia daily route, 85 actual journal population, 88 original 3D assets/rights. The other ten unresolved scopes among the first 78 remain visible. No item was retired or renumbered to hide missing evidence.

The owner business plan v3 and companion cash model include founder pay from month one, capacity, monthly illustrative cash flow, downside cases, acquisition and B Lab stewardship measures. The model starts with unknowns blank and keeps its illustrative example separate. Its integer-cent cash, capacity and reserve calculations were checked. Current business cash, owner pay, costs and hours were not invented. The original Colombia itinerary and imported mirror match in the reviewed range: 35 dated entries support a private planned-route review, not proof of actual attendance or individual sightings. No traveller identities, source-document URLs, private itinerary details, contact records or original photo bytes were committed to Git or published on the site.

Runtime `cc448cd3e02d208aca4ac6e3f28b1e502b6fbb54`, deployment `dpl_3Ehyc4qsBCgHcw6LFj7YgpdQpAAn`, on both `aves.bio` and `www.aves.bio`. [CI run 43344621251](https://github.com/mmelendro/Aves/actions/runs/43344621251). 741 unit tests and 105 browser checks passed, with 87 intentionally skipped project-specific checks. Five focused album/offline/terrain checks also pass before the full suite. Lint has zero errors and 32 existing warnings. TypeScript, production build, catalogue loading, deferred geometry and production budgets pass. Source reachability covers 444 modules with none unreachable. Changed live public pages, bounded species-name search and anonymous denial for the new private album endpoint were checked after release. Rollback: `dpl_J3CrfGYqLeWcZUvpQvD87WQ2JS4B`.

The additive `20261113005622_private_bird_album` migration is deployed with owner-only SELECT/INSERT/UPDATE policies, protected identity/revision, no anonymous SELECT and no client-writable verified state. Live schema/privilege metadata and pure SQL validation were checked. No traveller observation was fabricated or inserted for release testing. Browser account flows use synthetic intercepted HTTP, not a real hosted session. Security advisors show the same pre-existing private-schema informational notices and leaked-password-protection warning, with no new album finding.

Offline acceptance means an explicitly downloaded selected trip snapshot. It does not promise private app access, automatic refresh or editing without connectivity. The terrain sample uses one public tile up to 512 KB, at 33 by 33 samples with 3x vertical exaggeration. It is not a route, hazard or wildlife-location source. Field performance and physical iPhone acceptance remain unverified.

The next numbered item is 89. Preserve unresolved acceptance from earlier batches and do not invent business decisions, confirmed route history, photos, model licences or verifier identities.

See [batch evidence](docs/audit/BATCH-79-88-2026-11-13.md).
