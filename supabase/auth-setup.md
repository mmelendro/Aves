# Australian account email setup

Project: `qeyprwftrouztlqmwuzv` (AVES Australia, Sydney).

- Site URL: `https://aves.bio/australia`.
- Email confirmations: enabled; anonymous accounts: disabled.
- Minimum password length: 12 characters.
- Custom SMTP: required for public signup and recovery; default Supabase mail is restricted and is not a production sender.
- Sender: a verified AVES domain address. `mmelendro@gmail.com` is the owner notification recipient, not a domain-authenticated SMTP sender.

Exact callback allowlist:

```
https://aves.bio/australia/auth/callback
https://aves.bio/australia/auth/callback?next=/account
https://aves.bio/australia/auth/callback?next=/account/reset-password
http://127.0.0.1:3000/australia/auth/callback
http://127.0.0.1:3000/australia/auth/callback?next=/account
http://127.0.0.1:3000/australia/auth/callback?next=/account/reset-password
```

For confirmations that work when opened on a different device, the custom confirmation template should link to:

```
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/account
```

The recovery template should link to:

```
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery
```

The `/auth/confirm` handler verifies the one-time hash, writes the Australian session cookie and redirects to a fixed internal account destination. It never reflects provider errors or tokens. The callback handler remains available for PKCE-based flows.

These template URLs are deployment instructions, not evidence that SMTP/templates have already been configured. Verify a real confirmation and recovery email, expired links, sign-out, and the public reverse-proxy route before release.

Official references: [Supabase custom SMTP](https://supabase.com/docs/guides/auth/auth-smtp), [Resend SMTP for Supabase](https://resend.com/docs/send-with-supabase-smtp).
