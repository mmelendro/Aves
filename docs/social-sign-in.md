# Google and Facebook sign-in

## Provider setup status — 8 November 2026 (Sydney)

Google web client “AVES shared website sign-in” belongs to AVES Website (`axial-coyote-514010-m2`) and its secret is saved privately in the Google provider settings of AVES Shared Accounts. The public Auth settings confirm that Google and email sign-in are enabled. Existing nonce/email protections have not been changed. Google application publishing status is now **In production**. Website, privacy and terms links remain in Google branding. No Google credentials are stored in this repository.

**info@aves.bio** has been saved as Google's public support address. With the owner's explicit approval, this existing business account was granted only OAuth Config Editor access to the current Google project. Its Google Workspace Business Starter mailbox was restored and its licence assignment verified: one user, CAD $11/month before applicable taxes, monthly flexible plan. The existing Canadian billing profile was retained. No annual commitment or other paid product was added. External mailbox delivery has not yet been independently tested. Personal Gmail remains private; do not replace the public support address with it.

Controlled local acceptance passed: the owner approved the basic identity grant; a fresh Google login opened the existing account and loaded its saved test plan/proposal. A second returning-user login also succeeded. The country/valid-region prefill and sign-out were verified. A synthetic cancellation callback preserved the safe return destination. The earlier authorization left waiting for owner approval expired; restarting with fresh state resolved that expected one-time-state failure. Production activation and live verification are the remaining release steps. Facebook remains deferred. Existing email/password login remains available.

Google currently displays the shared Supabase Auth hostname on its account/consent screens. Google brand verification is separate from the working OAuth configuration and is not yet complete. Do not describe AVES display-name verification as approved.

The Google button uses unmodified [official light-theme artwork](https://developers.google.com/static/identity/images/signin-assets.zip), saved as `public/google-sign-in.svg`. The lettering is outlined in the asset, so the button needs no remote font or Google script. Its accessible name and disabled/focus states remain native button behaviour.

The sections below describe the activation procedure once the mailbox and provider testing are complete.

Application support is prepared but disabled by default. Keep the server-only environment setting blank in production until provider registration and controlled end-to-end tests pass:

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
