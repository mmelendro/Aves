# Google and Facebook sign-in

## Provider setup status — 7 November 2026

Google web client “AVES shared website sign-in” was created in AVES Website (`axial-coyote-514010-m2`) and its secret saved privately in the Google provider settings of AVES Shared Accounts. Provider enabled; nonce checks remain enabled and accounts without email remain disallowed. Google application remains in **Testing**. Website, privacy and terms links were saved in Google branding. No Google credentials are stored in this repository.

The owner now requires **info@aves.bio** as the publicly visible Google support address; personal Gmail must not be exposed on the website. That managed Google Workspace mailbox requires restoration. Its prior Business Plus subscription was cancelled in November 2025; current restoration/licence status must be checked in Google Admin before any billing action. The address is not selectable in the current Cloud session. Do not publish Google sign-in using the personal Gmail support address.

Production `AVES_OAUTH_PROVIDERS` remains unset. End-to-end Google sign-in and callback-query allowlist verification remain outstanding. Facebook is deferred at the user's request. Existing email/password login remains available.

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
