# AVES Australia

An isolated Australia website derived from the AVES Colombia repository. The public page retains the existing site's component layouts, navigation, logo, carousel and styling while its content is adapted for Australia. The original Colombia checkout and its live deployment remain separate.

This application uses React, TypeScript, Tailwind CSS and the original public UI components. It does not include the Colombia account system, dashboards, booking database or Supabase dependencies. It can build without database credentials. Contact delivery requires its own explicitly configured email service; an unavailable service must report an error rather than claim that an inquiry was sent.

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

The public preview passed the production build with normal type validation, 36 isolated contact API tests, and a dependency audit with zero known findings. Homepage, navigation and carousel styling were compared against the Colombian source. Browser review covered desktop, mobile and tablet layouts, mobile navigation, region/tour handoff, and waitlist consent/error handling. The 22-route HTTP sample returned all expected statuses. Full accessibility certification and measured performance scoring were not performed.

The source homepage preserves all 126 original class attributes. The carousel retains the original layout and play, volume and slideshow controls. The original CSS and Tailwind configuration are retained. Australian photography and field-recording attribution and licence links are available at `/credits`.

The carousel includes original MP3 field recordings for the Superb Fairywren, Rainbow Lorikeet and Sulphur-crested Cockatoo. Each recording starts only after a visitor presses play; playing or buffering holds the slideshow, and changing birds stops the previous recording. Recording sources, sound-specific licences and locations are documented in `content/audio-credits.json`. These independent wildlife recordings may include ambient sounds and are not recordings of AVES tours.

## Email delivery

The server requires `RESEND_API_KEY`. Optional `CONTACT_EMAIL` defaults to `info@aves.bio`; optional `CONTACT_FROM` defaults to `AVES Australia <noreply@aves.bio>`. Configure a verified sender and controlled test recipient for delivery testing. No real email delivery has been verified in this preview. Without valid configuration, the form returns a visible error and direct-email alternative; it never simulates success.

The launch-list form sends an opt-in request to the AVES inbox. It does not create a record in a mailing-list database. Production release still needs an agreed subscriber-management/unsubscribe process, sender verification, abuse protection, and a controlled delivery test. Existing account and booking services are not part of this public Australia preview.

## Preview and release

Keep this project separate from the live Colombia deployment. Use a distinct preview project and keep previews out of search indexing until the public URL and content are approved. This local preview does not configure hosting, connect a domain, activate email delivery or publish a production site. Set `NEXT_PUBLIC_SITE_URL` only once the intended Australian address is confirmed.

Review the finished preview before a production release. Production deployment, domain and DNS changes require Martin's explicit approval.
