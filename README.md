# AVES Australia

An isolated Australia website derived from the AVES Colombia repository. The public page retains the existing site's component layouts, navigation, logo, carousel and styling while its content is adapted for Australia. The original Colombia checkout and its live deployment remain separate.

This application uses React, TypeScript, Tailwind CSS and the original public UI components. It does not include the Colombia account system, dashboards or booking database. The Australian contact endpoint uses a separate Supabase database through server-only REST calls. Builds do not require database credentials; live form submissions do. Successful submission means the request was saved, not that an email was delivered or a booking confirmed.

## Local development

Use Node.js 22 and the pinned pnpm 10.34.5. Install with lifecycle scripts disabled:

```sh
corepack pnpm install --frozen-lockfile --ignore-scripts
corepack pnpm dev
```

The local website runs at http://127.0.0.1:3000. Keep credentials in an untracked `.env.local` and use test services for submissions. Do not copy production credentials from the Colombia site.

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

The source homepage preserves all 126 original class attributes. The carousel retains the original layout and play, volume and slideshow controls. The original CSS and Tailwind configuration are retained. Australian photography and field-recording attribution and licence links are available at `/credits`.

The carousel includes original MP3 field recordings for the Superb Fairywren, Rainbow Lorikeet and Sulphur-crested Cockatoo. Each recording starts only after a visitor presses play; playing or buffering holds the slideshow, and changing birds stops the previous recording. Recording sources, sound-specific licences and locations are documented in `content/audio-credits.json`. These independent wildlife recordings may include ambient sounds and are not recordings of AVES tours.

## Request storage and email notifications

Configure server-only `SUPABASE_URL` and `SUPABASE_SECRET_KEY` as shown in `.env.example`. Prefer a modern Supabase secret key; an existing legacy service-role JWT is also supported. Never prefix a secret with `NEXT_PUBLIC_`. The migration under `supabase/migrations` has been applied to the separate Australian project and must also be applied to any new environment. Customer tables are private, RLS is enabled, and only the server role can execute the three contact and suppression functions.

An atomic transaction saves the request, launch-list preference and consent evidence. Unchanged retries reuse an in-memory idempotency key and do not duplicate requests or notifications. A changed request using an already-used key is rejected. Five new requests per normalized email address are allowed in a 15-minute window; valid replays do not consume that allowance. No IP address is collected for this check. Database outages return a visible error; the form retains its values and key for retry.

`RESEND_API_KEY` enables an optional team notification after storage. `CONTACT_EMAIL` defaults to `info@aves.bio`; `CONTACT_FROM` defaults to `AVES Australia <noreply@aves.bio>`. Configure a verified sender and controlled test recipient before testing delivery. No real email delivery has been verified in this preview. Missing configuration or email failure leaves the durable request intact and records a failed notification where possible. An uncertain status remains pending. Visitor retries never resend notifications; there is no background retry worker yet. Before launch, establish a routine to review private contact requests and pending/failed notifications in the Supabase dashboard.

Launch-list entries are unverified requests, not confirmed email ownership. Opt-out suppression is retained and cannot be reversed by an anonymous form submission. Unchecking updates on an inquiry does not unsubscribe an existing entry. No campaign or visitor confirmation email is sent. Before campaigns, implement verified opt-in and a suppression-aware sending/unsubscribe process. Production release still needs sender verification, a controlled delivery test, stronger abuse controls if needed, and an agreed retention policy. Existing account and booking services are not part of this public Australia preview.

## Preview and release

Keep this project separate from the live Colombia deployment. Use a distinct preview project and keep previews out of search indexing until the public URL and content are approved. This local preview does not configure hosting, connect a domain, activate email delivery or publish a production site. The separate Australian Supabase project is in Sydney; database connection verification is recorded in the workspace audit evidence. Set `NEXT_PUBLIC_SITE_URL` only once the intended Australian address is confirmed.

Review the finished preview before a production release. Production deployment, domain and DNS changes require Martin's explicit approval.
