# Google and Facebook sign-in

## Provider setup status — 8 November 2026 (Sydney)

Google web client “AVES shared website sign-in” belongs to AVES Website (`axial-coyote-514010-m2`) and its secret is saved privately in the Google provider settings of AVES Shared Accounts. The public Auth settings confirm that Google and email sign-in are enabled. Existing nonce/email protections have not been changed. Google application publishing status is now **In production**. Website, privacy and terms links remain in Google branding. No Google credentials are stored in this repository.

**info@aves.bio** has been saved as Google's public support address. With the owner's explicit approval, this existing business account was granted only OAuth Config Editor access to the current Google project. Its Google Workspace Business Starter mailbox was restored and its licence assignment verified: one user, CAD $11/month before applicable taxes, monthly flexible plan. The existing Canadian billing profile was retained. No annual commitment or other paid product was added. External mailbox delivery has not yet been independently tested. Personal Gmail remains private; do not replace the public support address with it.

**Google sign-in is live at https://aves.bio/account/sign-in and on signup.** Production `AVES_OAUTH_PROVIDERS=google` is a Vercel Config setting; the source remains disabled by default in unconfigured environments. Facebook remains deferred and hidden. Existing email/password entry and recovery remain available.

Current deployed application commits: `5762603` on `australia/preview` ([shared-account build](https://aves-australia-dou3r6fo5-mmelendro-9273s-projects.vercel.app), `dpl_2AhmDWLg3FbTMExao84Fz3ywJZ1B`) and `e2a53a4` on `webmaster/readiness-2026-11-05` ([main-site build](https://v0-company-landing-page-k57r1yoc9-mmelendro-9273s-projects.vercel.app), `dpl_JK4rqnJ851jveirHoQ46tQZt7gDU`). The branding follow-up added matching Google identity disclosures to both privacy notices and passed both production builds/live privacy checks. The shared `/account` proxy is unchanged. Initial Google sign-in was released in `4600240` / `dpl_BzjBrpRJNjJCXcgx1kMMUJqyUS21`; its acceptance checks follow.

Controlled local acceptance passed: the owner approved the basic identity grant; fresh and returning Google logins opened the existing account and loaded its saved test plan/proposal. Colombia/Central Andes prefill, sign-out and a synthetic cancellation callback passed. Live Google sign-in then returned to `/account?country=australia&region=tasmania`, with Australia/Tasmania selected, the existing saved plan/proposal loaded, and the session retained after reload. Live sign-out passed. No trip, quote, proposal, booking or email was created by these checks.

Initial sign-in validation: 68 relevant automated cases across the OAuth, shared-account UI, account-security and session-migration suites passed; the 32 affected form/OAuth cases were rerun after the button edit. Strict TypeScript and Vercel's production build passed. Public destination/privacy/terms pages returned 200. Cookie-aware checks confirmed signup shows Google while password recovery does not; Facebook stays hidden. A deployment-scoped 15-minute runtime scan returned no error/fatal entries. This does not constitute a new email/password signup/recovery delivery test or a test with a second Google identity.

The earlier authorization left waiting for owner approval expired; restarting with fresh state resolved the one-time-state failure. Provider failures before the AVES callback can still use Supabase's existing Australian Site URL as a fallback; improving that expired-state landing is a separate hardening task. The Site URL/email templates were preserved. Both temporary port-3001 test callback rules were removed; the production OAuth rule and original six callback rules remain.

**Google branding is verified and published — 8 November 2026.** Google's automated check approved the saved AVES name, existing global peregrine logo and brand URLs. After publishing, the live Google account chooser showed the falcon and “AVES”; its Developer info panel showed “App name: AVES” and “Support email: info@aves.bio”. Google Console confirmed the branding is being shown to users. This verifies the display branding, not a broader security certification. The underlying Supabase callback URL and provider scopes are unchanged.

The optional new Search Console ownership question became obsolete when the automated branding check succeeded. No new DNS record, Search Console owner grant, Google credential, paid feature or subscription was added for branding. Do not act on a later answer to that obsolete permission request. Leave the existing service/mail DNS records unchanged.

The privacy notices now explain the Google account identifier/email/basic profile data shared with Supabase, the limited identity scopes, account/trip uses, service-provider processing, no sale/targeted advertising, Google revocation controls and AVES deletion requests. Both live notices returned 200 with the new disclosure; the homepage links to the exact privacy URL configured in Google.

The Google button uses unmodified [official light-theme artwork](https://developers.google.com/static/identity/images/signin-assets.zip), saved as `public/google-sign-in.svg`. The lettering is outlined in the asset, so the button needs no remote font or Google script. Its accessible name and disabled/focus states remain native button behaviour.

The sections below describe configuration and controlled future provider activation.

The code defaults to no social providers. Use a blank value to hide all social buttons in an environment, and redeploy; the tested production value is `google`:

```dotenv
AVES_OAUTH_PROVIDERS=
```

Only `google` and `facebook` are supported. After validation, enable one passed provider with `AVES_OAUTH_PROVIDERS=google` or `AVES_OAUTH_PROVIDERS=facebook`; use `google,facebook` only after both pass. Redeploy after changing the setting. Apple and manual account linking are outside this change.

The sign-in and sign-up Server Components pass the approved provider names to the form. The existing Supabase SSR client uses PKCE; the callback exchanges the authorization code for a session and validates the account return path. Email/password sign-in, signup, confirmation and reset remain available.

## Addresses and credentials

| Setting | Exact value |
| --- | --- |
| Supabase project | `qeyprwftrouztlqmwuzv` |
| Google authorized JavaScript origin | `https://aves.bio` |
| Google authorized redirect URI | `https://qeyprwftrouztlqmwuzv.supabase.co/auth/v1/callback` |
| Facebook Valid OAuth Redirect URI | `https://qeyprwftrouztlqmwuzv.supabase.co/auth/v1/callback` |
| AVES application return | `https://aves.bio/australia/auth/callback` |

Provider redirects must match exactly, including HTTPS and the absence of a trailing slash. Store Google client credentials and Facebook app credentials only in the corresponding Supabase provider settings. Never put them in Git, frontend code or `NEXT_PUBLIC_*` variables. The AVES setting contains provider names, not credentials.

Add the AVES callback and its required query variants to Supabase Auth's redirect allowlist. The form sends `flow=oauth` and a URL-encoded `next`, for example:

```text
https://aves.bio/australia/auth/callback?flow=oauth&next=%2Faccount%3Fcountry%3Dcolombia%26region%3Dllanos
```

Use exact test entries first. A narrowly scoped production glob for the current account destinations is:

```text
https://aves.bio/australia/auth/callback\?flow=oauth&next=%2Faccount*
```

Supabase's `\?` matches the literal query separator; `*` does not cross dots or slashes. Validate actual encoded return URLs against the rule before activation. Add any further approved variants explicitly; avoid site-wide wildcards. Preserve existing Site URL, email redirect entries and email templates. [Supabase redirect rules](https://supabase.com/docs/guides/auth/redirect-urls)

## Activation checklist

- Register a Google web OAuth client and Facebook login app; configure test users first. Check app name, branding, privacy policy and allowed domains.
- Request only basic identity: Google `openid email profile`; Facebook `public_profile` and explicitly `email`. Confirm Facebook email permission is ready for testing. Configure provider credentials and callback addresses in Supabase/provider consoles.
- In a controlled environment, expose only the provider being tested. Test new and existing Google/Facebook users with confirmed email addresses.
- Test declined consent, cancellation, missing email, expired/reused codes and failed exchanges. Show a friendly retry/email-sign-in option without exposing provider details. Supabase may return errors in URL fragments, so also test callbacks without a code.
- Verify Colombia and Australia trip context survives `next`; reject external, protocol-relative and traversal destinations. Confirm session cookies authenticate subsequent `/australia` account requests and sign-out clears access.
- Recheck email/password sign-in, signup confirmation and password reset. Confirm existing account data remains correctly authorized.
- Keep production blank until registration and controlled tests pass. Enable only the passed provider names, redeploy and smoke-test production. Roll back by blanking the setting and redeploying.

No external configuration or activation is performed by this code change.

Sources: [Google setup](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid), [Google OpenID Connect](https://developers.google.com/identity/openid-connect/openid-connect), [Google OAuth errors](https://developers.google.com/identity/protocols/oauth2/web-server), [Supabase Facebook setup](https://supabase.com/docs/guides/auth/social-sign-in/auth-facebook). Meta's [official manual-flow page](https://developers.facebook.com/docs/facebook-login/guides/advanced/manual-flow/) returned HTTP 429 during review on 7 November 2026; the current Supabase guide was checked instead.
