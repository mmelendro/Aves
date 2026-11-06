# Adding an AVES destination

**Registry live and verified on 7 November 2026 (Sydney).** Shared release `9a7c03b` / deployment `dpl_6CaX82WY4M5qvChywSLuMtZNoKth` uses the applied migration `20261106203926_extensible_destination_catalogue.sql`. The catalogue matches application configuration exactly: 4 countries and 20 regions, with only Australia and Colombia enabled. Ecuador and Costa Rica are not open for inquiries. Verification passed: 210 application tests, strict type checking, production build, all 6 local SQL suites and hosted catalogue rollback checks.

New countries use the existing **AVES Shared Accounts** project (`qeyprwftrouztlqmwuzv`), customer accounts and owner portal. Do not create another database or require customers to register again. Country selection describes a trip; ownership and owner-role checks continue to authorize access.

## Registry and launch boundary

- `content/trip-options.ts` defines `destinationRegistry`: stable country IDs, display labels, enabled state, regions and the country-specific consent version.
- The database catalogue uses `public.destination_countries(id, label, enabled)` and `public.destination_regions(country_id, id, label, accept_label)`. Catalogue changes require reviewed administrative SQL migrations. Authenticated and service clients receive SELECT access only; RLS must remain enabled, with no client catalogue writes.
- Australia and Colombia remain enabled. Reserved entries `ecuador` and `costa-rica` stay disabled, with no invented regions and no consent version, until their actual launch is approved.
- This is central configuration maintained through reviewed releases, **not an owner-facing country-management screen**. Enabling backend configuration does not create or publish public country pages.

## Launch procedure

1. **Approve the destination offering.** Confirm available regions, guide arrangements, inquiry handling and truthful customer-facing copy. Establish the applicable privacy notice and an explicit, country-specific marketing-consent version. Do not infer marketing consent from another destination or from an inquiry.
2. **Choose permanent IDs.** Use stable country and region slugs; display labels may change without replacing IDs. Preserve existing IDs and historical records. Region IDs are scoped to their country. Do not delete historical catalogue rows or reuse their IDs for another destination. Disable future use deliberately while retaining historical interpretation.
3. **Prepare matching configuration and migration.** Add the approved regions and metadata to `destinationRegistry`, and prepare corresponding catalogue rows with the same country IDs, region IDs, labels and enabled state. Leave `accept_label` false for new regions unless a documented compatibility need is approved; canonical IDs are the normal input. Supply the approved consent version before enabling inquiries or updates signup.
4. **Verify locally and in staging.** Run application tests, strict type checking, the production build and database verification. Check catalogue/configuration parity, disabled and unknown country rejection, cross-country region rejection, saving/reloading a plan, quote snapshots and contact receipts. Test two customer accounts cannot access each other's plans or proposals, that the trusted business owner retains the intended review access, and that clients cannot edit the catalogue. Preserve missing-country-as-Australia behavior, existing Australian hashes/retries and accepted legacy selections.
5. **Apply the reviewed database migration before the application release.** Verify the catalogue, grants, RLS and existing records, then deploy the matching application version. Do not deploy code that offers a destination the database still rejects. Exercise the selected destination through browser → API → database and verify private access denial. Record the migration, commit, deployment and results; keep historical evidence rather than replacing it with a new claim.
6. **Launch public content separately and explicitly.** Build and review country/region pages, maps, birds and recording rights, navigation, inquiry links, routing, canonical URLs and sitemaps. Test mobile navigation and account entry. Obtain the agreed launch authorization before making the new destination public; a disabled registry placeholder is not a public offering. Preserve the existing `/australia` forwarding and Colombian routes.

Proposal currency remains explicitly **AUD**, including future destinations, until pricing, storage, validation, emails and customer-facing terms receive a deliberate reviewed currency change. Adding a country must not silently change currency or imply instant reservations/payments.

If launch verification fails, stop promotion and correct the mismatch. Preserve accounts, saved plans, issued quote snapshots and consent history; do not use catalogue deletion as rollback. Update the release handoff only after the deployed behavior is verified.

## Retiring a previously launched destination

Set its enabled flag to false through a reviewed configuration change and database migration; retain its stable ID, historical region definitions and consent version. Do not turn it back into an empty placeholder. Existing owned drafts can still be viewed, edited within the same country and submitted for a quote. The editor marks the saved destination explicitly; new plans and changes into that country remain blocked.

Exact contact retries use the service-only, read-only `replay_shared_contact_request` RPC, matched on country, idempotency key and payload hash. They return the stored receipt without creating records, reapplying consent or resending email. Changing or deleting historical consent/region metadata can prevent that safe replay. Test retirement with existing drafts, saved receipts, cross-account denial and new-request rejection before publishing it.

Migration filenames already match hosted versions, including `20261106105909`, `20261106105919` and `20261106114144`. Those earlier timestamp corrections did not change SQL hashes or hosted history; do not reapply them as new migrations.
