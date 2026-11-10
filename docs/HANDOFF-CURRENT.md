# AVES Australia current handoff

Updated 10 November 2026. Fetch GitHub history before editing. Documentation heads
are newer than runtime; a documentation sync is not a production release.

Live runtime: 59a8f65207d17c6c1ec5af3e3a11868f44cd832f.
Production: dpl_FNrh2YBNHFjamZk3gPu1WcL5Cb9Z.
Recovery: checkpoint/2026-11-10-17-australia-contours.
All nine configured regional contours and the country contour are live. The source
cleanup at ee9f9ed pruned unused terrain arrays and has zero dependency-audit findings.
No account/admin/auth/backend behaviour changed.

Preview PR #9, feature/au-selection-headers: runtime source
b1809d5d15953f716824a6d2d66ca880d6d51b5c; documentation head
33bea13dfa102ae506cbc556a6f98af0f0d84a2e. It adds selection-linked regional headers,
small sourced local flocks and personal trip prompts. 296 tests, strict TypeScript
and local/hosted builds passed. Deployment dpl_DestQSm2KtvdHjeuHEnvbVcJePbk is READY:
https://aves-australia-a4nhvv4gr-mmelendro-9273s-projects.vercel.app/australia
Western Australia selection changed the header and Carnaby’s flock before navigation;
340 CSS-pixel native zoom, menu Escape and focus passed. Silhouettes are family
shorthand, not exact identification plates. Physical Safari/touch remains unverified.

Main live remains 33189e9 / dpl_HdwbDsUDSkfQcK8c2mxgVRe9j6zK. Main PR #10 combines
selection headers, selected-habitat satellite shading and public checklist references
at 1b795eb15583e2ee98a6fc0fa5260b6e2af78f06. Its 362/377 reference images have not
been ported to this private picker. Main map enlargement has not been ported here.
Follow the main maintained branch HANDOFF-CURRENT.md and NEXT-WEEK-PROMPT.md for the
canonical cross-app queue. The eBird readiness assessment has an unsent permission
enquiry; written commercial API permission is required before data use.

Two applications stay separate. No spending, paid AI retries, weakened privacy,
account/database/provider changes or consolidation. Preserve private guest data,
native links, first-activation previews, browser zoom and country bird identity.
Use Vercel mmelendro@gmail.com. Explicit approval is required before a new production
release. C3 exact unified private acceptance remains blocked on safe staging; C4/C5
cutover and retirement are unapproved. Do not retry declined provisioning or deploy
the unified draft. Earlier handoff/prompt are archived under
archive/2026-11-10-before-selection-headers/.
