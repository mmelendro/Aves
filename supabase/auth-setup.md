# Shared AVES account email setup

Project: `qeyprwftrouztlqmwuzv` (shared accounts, Sydney).
## Shared account update — 6 November 2026

Colombia and Australia now use the existing project and account paths. The signup and recovery templates were saved with shared AVES branding; their token placeholders and action URLs were preserved exactly. Dashboard previews were checked. The SMTP display name is AVES, confirmed after reload; its credentials and sender address were not changed. Password-change, email-address-change, MFA-added and MFA-removed alerts are enabled, confirmed on a fresh settings page. These configuration checks do not establish delivery of a new message; the earlier recorded delivery tests remain historical evidence.


- Active production Site URL: `https://aves.bio/australia`, restored after publication and verified after reloading the dashboard.
- The temporary deployment Site URL is no longer active. Its three callback allowlist entries were removed and the six production/local entries below were verified.
- Email confirmations: enabled; anonymous accounts: disabled.
- Minimum password length: 12 characters.
- Custom SMTP: enabled through Resend and verified after reloading the configuration; host `smtp.resend.com`, port `465`.
- Sender: `AVES <noreply@aves.bio>`, using the verified `aves.bio` domain. `mmelendro@gmail.com` is the support and owner notification mailbox, not the domain-authenticated SMTP sender.

Exact production and local callback allowlist:

```
https://aves.bio/australia/auth/callback
https://aves.bio/australia/auth/callback?next=/account
https://aves.bio/australia/auth/callback?next=/account/reset-password
http://127.0.0.1:3000/australia/auth/callback
http://127.0.0.1:3000/australia/auth/callback?next=/account
http://127.0.0.1:3000/australia/auth/callback?next=/account/reset-password
```

The three temporary deployment callbacks used during verification have been removed. Only the six entries above remain. Keep the Site URL and callbacks aligned with the environment being tested. Site URL changes affect this whole Auth project; no real accounts existed before the temporary change, but the real owner account now exists. Do not treat the project as empty for future staging changes.

The saved custom confirmation template uses:

```
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/account
```

The saved recovery template uses:

```
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery
```

The `/auth/confirm` handler verifies the one-time hash, writes the Australian session cookie and redirects to a fixed internal account destination. It never reflects provider errors or tokens. The callback handler remains available for PKCE-based flows.

Both templates were saved and their dashboard previews checked. On 5 November 2026 (Sydney), the real signup confirmation reached `mmelendro@gmail.com` with SPF and DKIM passing. Its confirmation completed on 4 November 2026 at `23:16:18.838766 UTC`, and the browser showed a confirmed session and owner link.

The verified owner Auth UUID is `b2444e1b-aff7-4c04-b2a2-f57956c14c20`. Active owner access was granted at `23:17:11.001585 UTC` using guarded SQL matching that exact UUID and confirmed email. Authorization remains based on the active UUID grant, not an email-only or user-editable metadata check. The user manages their password directly; credentials are not part of this document.

Separate live checks verified Gmail receipt of a labelled inquiry, a quote notification and an issued synthetic AUD 1.00 proposal. These exercise the application's Resend API configuration, which is separate from Supabase SMTP. The proposal email's SPF, DKIM and Reply-To `mmelendro@gmail.com` were verified. Notification `accepted` records provider acceptance, while the Gmail checks establish actual receipt for those specific test messages. There is no automatic retry worker: replaying a stored request or issued proposal does not resend its notification, and enabling email does not flush old failed notifications.

Detailed evidence, message IDs and retained synthetic record IDs are in the workspace `audit/evidence/australia-live-email-verification.json`. A real recovery email reached the designated Gmail test alias, and the public callback returned a 303 to the reset form with private/no-store caching and two Secure, SameSite=Lax, host-only cookies scoped to `/australia`. The recovered account could load its plans and save one labelled draft through the public route; its owner-inbox request correctly returned 403. Password update, new-password sign-in, old-password rejection and rejection of the consumed recovery link all passed. The exact test account was subsequently banned, had no owner membership, and its private credential file was removed; its labelled draft is retained. The real owner's password and account were not changed by this isolated recovery check. Full evidence is in `audit/evidence/australia-production-recovery-verification.json`.

The separate Vercel project's production code commit is `5bd7a1b`. The public `https://aves.bio/australia` route was published at `2026-11-04T23:26:48Z`, using active routing version `299881ce-8227-482d-8a66-c1c1edd3e983` and the exact-root/descendant rules in the project README. Public signup and sampled assets are accessible; the private account API rejects anonymous requests with no-store caching. Browser styling, images and Cockatoo audio playback were verified, and the Colombian homepage matched its baseline hash. The owner signed in on the public domain and viewed the issued test proposal. The production Site URL and six callback entries are restored and verified; required launch checks are complete. Keep email link tracking disabled, do not prefetch or log real token-bearing links while inspecting emails, and continue manually reviewing pending/failed notifications because no automatic retry worker is configured.

Official references: [Supabase custom SMTP](https://supabase.com/docs/guides/auth/auth-smtp), [Resend SMTP for Supabase](https://resend.com/docs/send-with-supabase-smtp).
