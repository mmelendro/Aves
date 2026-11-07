# Historical README — superseded

This is preserved release history, not current setup or verification guidance. Start with [the current README](../README.md). Paths, counts, provider settings and claims below may belong to earlier releases.

# AVES Australia

**Latest published version:** start with [CONTINUE-HERE.md](CONTINUE-HERE.md) for the compact carousels and country maps, verification, exact live builds and GitHub branches.

An isolated Australia website derived from the AVES Colombia repository. The Australian revision keeps the AVES logo, emerald palette, pale gradients, rounded cards and bird carousel while simplifying navigation and reorganising the homepage around regional discovery and trip enquiries. The original Colombia checkout and its live deployment remain separate.

This application uses React, TypeScript, Tailwind CSS and the original public UI components. It also serves the shared AVES backend for Colombia and Australia: email/password accounts, saved trip plans, quote requests and a private owner proposal dashboard. My Trips lives at https://aves.bio/account and uses the AVES Shared Accounts Supabase project. New Zealand remains a destination in development, with inquiries but no saved-trip support yet. Successful submission means the request was saved, not that an email was delivered or a booking confirmed.

## Local development

Use Node.js 22 and the pinned pnpm 10.34.5. Install with lifecycle scripts disabled:

```sh
corepack pnpm install --frozen-lockfile --ignore-scripts
corepack pnpm dev
```

The local website runs at http://127.0.0.1:3000/australia; `/` redirects there. Keep credentials in an untracked `.env.local` and use labelled test accounts for verification. Do not copy production credentials from the Colombia site.

## Checks

```sh
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
corepack pnpm start
corepack pnpm audit
```

TypeScript checks remain enabled during builds. Commit `pnpm-lock.yaml` with dependency changes; do not add npm or Yarn lockfiles. Dependency overrides retain compatible security patches in the Next.js and Tailwind CSS build dependency chains.

The public preview passed production builds with normal type validation. The durable contact workflow passes 84 isolated API and REST-helper tests; the dependency audit reports zero known findings. Database behavior and permissions passed rollback-only checks locally and on the separate Australian Supabase project. Browser submissions saved an inquiry and a launch-list request through the real server connection; consent evidence and unverified subscription status were checked in the database. Two simultaneous submissions with the same key created one request and one consent event, and changed-payload reuse returned 409. These checks used labelled example.test records with email sending disabled. The three test requests remain because Supabase's cleanup confirmation expired. Homepage, navigation and carousel styling were compared against the Colombian source. Browser review covered desktop, mobile and tablet layouts, mobile navigation, region/tour handoff, waitlist consent/error handling, and bird-call playback. The 22-route HTTP sample returned all expected statuses. Full accessibility certification, load testing and measured performance scoring were not performed.

The original launch retained the Colombian homepage structure. The first Australian design revision replaces that structure with a shorter hero, an interactive regional map, interest-led enquiry links and a three-step planning explanation. The carousel retains play, volume and slideshow controls and starts paused. Photography and field-recording attribution and licence links are available at `/credits`.

## First Australian design revision

The desktop header exposes Regions, Birding Experiences, How It Works, About AVES, My Trips and Plan My Trip. A single accessible dialog handles mobile navigation. The homepage and `/aves-explorer` share a keyboard-operable Australian map with Queensland, New South Wales and Tasmania as planning starting points. Natural Earth public-domain administrative boundaries are bundled locally; the map requires no third-party service or key.

Three `/regions/[slug]` guides describe focus areas, gateways, seasons, walking considerations, habitats, birds and places to discuss, using linked official park and birding sources. Regional enquiry links preselect the corresponding region. Durations are planning suggestions, and no confirmed departures, sightings, guides or prices are implied. `/how-it-works` explains enquiries, saved plans and proposals. Existing account, enquiry, quote and email services are unchanged.

This revision was published on 6 November 2026 (Sydney), code commit `11f78d1`, deployment `dpl_7Pu5PPn25tut7ZXmmdGKfDZVrWUT`. All 150 automated tests and the production build passed. Browser checks covered desktop and 390/320 px layouts, mobile dialog dismissal and focus return, map selection by click/Enter/Space, regional enquiry presets, navigation highlighting and actual audio progression. Final public HTTP verification passed seven pages, 76 assets, two private-page redirects and three anonymous API denials. The Colombian homepage matched its preserved checksum, and the bounded post-release runtime check returned no errors. Evidence and screenshots are in workspace `audit/evidence/australia-revision-*`. These checks do not constitute full accessibility certification or load testing.

The account release passes 150 automated tests, strict type checks and a production build. Real hosted Auth/HTTP verification passed password sessions, own-account isolation, draft create/edit/retry, frozen quote requests, owner inbox access, proposal draft/issue/revision handling and sign-out. Browser checks also verified client sign-in, an issued proposal in the client account, owner-only inbox access and editing/issuing a labelled synthetic proposal. Those initial checks deliberately disabled outbound email. A separate live check on 5 November 2026 (Sydney) verified actual Gmail receipt of the signup confirmation, labelled inquiry, quote notification and synthetic AUD 1.00 proposal email. Signup confirmation established the owner's browser session; the confirmed owner account and active UUID grant are configured. The public Australian route and live password recovery are now verified, and the owner signed in on the public domain and viewed the issued proposal. Detailed message, provider and test-record IDs are recorded in the workspace `audit/evidence/australia-live-email-verification.json`; synthetic records are retained for review.

The carousel includes original MP3 field recordings for the Superb Fairywren, Rainbow Lorikeet and Sulphur-crested Cockatoo. Each recording starts only after a visitor presses play; playing or buffering holds the slideshow, and changing birds stops the previous recording. Recording sources, sound-specific licences and locations are documented in `content/audio-credits.json`. These independent wildlife recordings may include ambient sounds and are not recordings of AVES tours.

## Request storage and email notifications

Configure server-only `SUPABASE_URL` and `SUPABASE_SECRET_KEY` as shown in `.env.example`. Prefer a modern Supabase secret key; an existing legacy service-role JWT is also supported. Never prefix a secret with `NEXT_PUBLIC_`. The migration under `supabase/migrations` has been applied to the separate Australian project and must also be applied to any new environment. Customer tables are private, RLS is enabled, and only the server role can execute the three contact and suppression functions.

An atomic transaction saves the request, launch-list preference and consent evidence. Unchanged retries reuse an in-memory idempotency key and do not duplicate requests or notifications. A changed request using an already-used key is rejected. Five new requests per normalized email address are allowed in a 15-minute window; valid replays do not consume that allowance. No IP address is collected for this check. Database outages return a visible error; the form retains its values and key for retry.

`RESEND_API_KEY` enables a team notification after storage. `CONTACT_EMAIL` defaults to `mmelendro@gmail.com`; `CONTACT_FROM` defaults to `AVES Australia <noreply@aves.bio>`. The `aves.bio` sending domain is verified, a domain-scoped sending key is configured, and the live labelled inquiry reached the owner's Gmail inbox with SPF and DKIM passing. Missing configuration or email failure leaves the durable request intact and records a failed notification where possible. An uncertain status remains pending. Visitor retries never resend notifications; there is no automatic notification retry or background worker. Configuring email later does not resend previously failed notifications. Review private contact requests and pending/failed notifications in the Supabase dashboard.

Launch-list entries are unverified requests, not confirmed email ownership. Opt-out suppression is retained and cannot be reversed by an anonymous form submission. Unchecking updates on an inquiry does not unsubscribe an existing entry. No marketing campaign or launch-list confirmation email is sent. Before campaigns, implement verified opt-in and a suppression-aware sending/unsubscribe process. Account confirmation and password recovery are separate transactional emails.

## Client accounts and proposals

Clients use `/account` to sign up, confirm their email, sign in, save/edit draft trip plans, and request quotes. Submitted plans become read-only snapshots. The verified owner uses `/admin/quotes` to review requests, prepare AUD proposals and explicitly issue them. Issued proposals are immutable and visible only in the requesting client's account; a revision creates a new version. No payment or booking is taken.

Configure both `NEXT_PUBLIC_SUPABASE_*` browser settings and the private server key. The browser must never receive the server key. Account cookies are named `aves-au-auth` and scoped to `/australia`; private pages and APIs disable caching. Owner authorization requires an explicit active, confirmed Auth UUID in `private.site_admins`, never a user-editable profile field or an email-only check. See `supabase/README.md` for schema, grants and owner provisioning.

Supabase Auth custom SMTP is configured through Resend, using `AVES Australia <noreply@aves.bio>`. The confirmation and recovery templates are saved; real signup confirmation was received and completed. The owner is `mmelendro@gmail.com`, with confirmed Auth UUID `b2444e1b-aff7-4c04-b2a2-f57956c14c20` explicitly granted active owner access. The form and Auth service both require at least 12 password characters. After publication, Auth's Site URL was restored to `https://aves.bio/australia` and verified after reloading the dashboard. The three temporary deployment callbacks were removed; only the six production and local callback URLs documented in `supabase/auth-setup.md` remain. An isolated controlled account received a real recovery email and completed the public recovery flow: password update, new-password sign-in, old-password rejection and consumed-link rejection all passed. Its secure host-only cookies were scoped to `/australia`, private responses disabled caching, and owner access was denied. The test account was banned after verification, its private credential file removed and its labelled draft retained.

Quote requests notify `mmelendro@gmail.com`. Proposal notifications go to the requesting account's current confirmed address and link to the private account. The controlled quote and proposal checks both reached Gmail; the proposal's SPF, DKIM and Gmail Reply-To were verified. `sent` means issued in the account; notification `accepted` means the email provider accepted it, not proof of inbox delivery for every message. Failed or pending notifications remain visible for review; no automatic notification retry or background worker is included. Replaying an already stored quote or issued proposal does not resend its notification.

## Preview and release

### Bird and regional expansion

The carousel and species directory share 20 verified bird profiles in `content/birds.ts`, with visible distribution notes separate from photograph locations. Seventeen species have locally hosted licensed recordings. Regent Bowerbird, Victoria’s Riflebird and Gouldian Finch explicitly show unavailable audio; no unlicensed or substituted recordings are offered. The Emu recording is labelled as a female in a zoo, and the Southern Cassowary clip as chick calls. Images load on demand and audio loads only after Play.

All six states, the Northern Territory, ACT and Jervis Bay Territory are selectable, with small-territory callouts and matching regional guides. Each of 27 birds in those guides has a `whereFound` entry. `content/region-options.ts` keeps enquiries and saved plans aligned with map IDs. External territories are outside the map; other island ideas can still be submitted through the general enquiry. A trip request or personal quote is not an instant reservation or payment. No database migration was needed because existing plan and enquiry fields already accept these region values.

The expansion passed 155 automated tests, including media/credit integrity and retaining all nine regions in a saved draft. Browser checks exercised every bird selection, all 17 recordings, every keyboard map control and all nine enquiry presets. Release-specific evidence is recorded under workspace `audit/evidence/australia-expansion-*`.

Keep this project separate from the live Colombia deployment. The public address is `https://aves.bio/australia`; the production value of `NEXT_PUBLIC_SITE_URL` is only `https://aves.bio`, and `next.config.mjs` supplies the fixed base path. Native requests and public assets use `sitePath`; Next Links receive unprefixed paths. The separate Vercel project is `mmelendro-9273s-projects/aves-australia`, with functions configured for Sydney. Its production code commit is `11f78d1`, and the stable alias `https://aves-australia.vercel.app` has been promoted. The scoped route on `aves.bio` was separately published at `2026-11-04T23:26:48Z`, with active routing version `299881ce-8227-482d-8a66-c1c1edd3e983`; the design revision did not change routing. Preview deployments remain noindex.

Martin explicitly authorized publishing the separate Australian app at `/australia`. The release uses scoped project routing rules on the existing Colombian project, preserving the Colombian root and keeping all Australian assets, APIs and authentication under `/australia`. Do not change broader Colombian routing or DNS as part of this release. Final deployment and delivery evidence is recorded in the workspace `audit/evidence` folder.

Use two separate Vercel routing rules, preserving the full Australian base path in the destination:

| Source | Destination |
| --- | --- |
| Exact path: `/australia` | `https://aves-australia.vercel.app/australia` |
| Regular expression: `^/australia/(.*)$` | `https://aves-australia.vercel.app/australia/$1` |

The exact-root rule handles `/australia`; the capture rule handles its descendants, including assets, API requests and auth callbacks. Scope these rules only to `/australia`. The repaired route was checked with full styling before publication. Public HTTP checks then returned 200 for the homepage, signup page and sampled images, audio, JavaScript, CSS and optimized image; the private account API rejected anonymous access with 401 and no-store caching, and the account page redirected to sign-in. The Colombian homepage's SHA-256 exactly matched its baseline.

The production browser showed full styling and loaded images. Its Sulphur-crested Cockatoo recording reached the end at 7.040227 seconds with `readyState: 4`, no media error and no browser errors observed. The screenshot is retained at workspace `audit/evidence/australia-live-homepage.png`; HTTP and routing evidence is in `australia-public-release-verification.json`, `australia-routing-publication.json` and `australia-routing-live.json` in the same folder. The production Auth Site URL and six callback entries are restored and verified. Live recovery evidence is in `australia-production-recovery-verification.json`; the required launch checks are complete. Continue manually reviewing stored requests and pending or failed notifications, since automatic notification retries are not implemented.
