# AVES hosted acceptance

## Checkpoint, 8 November 2026 (Sydney)

The local native integration suite passes all 19 checks. Hosted preflight confirms
that the live AVES sign-in page offers Google and email/password. Public Auth
settings require email confirmation. Google authorization start reaches Google's
sign-in service with basic identity scopes. This does not complete sign-in, verify
callback allowlisting or prove inbox delivery. No account or email was created.

An isolated hosted test setup still needs approval. Existing production and the
read-only unified Preview remain unchanged. No paid resource was created.
[Sanitized preflight result](evidence/aves-unified-hosted-preflight.json).

## Proposed test setup

1. Create a temporary empty Supabase branch with its own credentials, using the
   maintained migration history. Do not copy customer data or merge it back.
2. Run the unified candidate in a separate protected Vercel test project. Keep
   existing production domains, applications and the read-only Preview unchanged.
   Verify protection and no-index rules before beginning tests.
3. Configure the branch's provider and mail settings privately. Branch creation
   copies settings but uses placeholders for OAuth secrets and SMTP passwords.
   Check access before leaving a billable resource running. Preserve production
   entries and allow only the exact test callback origins and existing scopes.
4. Use synthetic guest records and owner-controlled inboxes only. The proposed
   workflow allows at most six labelled acceptance-test emails for signup,
   recovery, enquiry and proposal checks. Do not contact customers or suppliers.
   Use secure authentication, never passwords or codes in chat. Do not reset an
   existing personal account's password.
5. Verify browser signup/confirmation/recovery, Google return and country intent,
   save/reopen/edit/submit, cross-account denial, owner review, proposal visibility
   and actual authorized inbox delivery. Record the exact reviewed code and test
   deployment privately. Provider acceptance alone is not delivery evidence.
6. Remove test callback entries and dispose of the temporary resources after
   testing, or if access blocks the work. Keep raw mail, credentials and guest
   answers out of public evidence. Existing deployed-session handover remains a
   separate controlled check, which an empty database cannot prove on its own.

Base branch compute is US$0.01344 per hour, about US$0.32 for 24 hours, plus
applicable usage. This is not a total-cost cap. The branch has not been created;
Supabase requires cost approval first.

Sources checked on 8 November 2026:

* [Branching and copied settings](https://supabase.com/docs/guides/deployment/branching)
* [Branch charges](https://supabase.com/docs/guides/platform/manage-your-usage/branching)
* [USD compute prices](https://supabase.com/docs/guides/platform/manage-your-usage/compute)

Keep PR #3 in draft. Hosted test success does not authorize production cutover.
Follow the current execution prompt and consolidation checklist. Other roadmap
releases remain queued.
