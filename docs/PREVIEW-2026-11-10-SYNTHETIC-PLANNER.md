# Synthetic private-planner UI fixture

10 November 2026. Test branch only: test/private-place-notes-ui. Never merge this
fixture into maintained production branches or describe it as private persistence.

The owner authorised read-only opening of the private account flow, then requested
safe necessary work. The public preview's account link was followed and reached
https://aves.bio/account/sign-in with its NZ/South Island next parameter preserved.
No sign-in, credentials, account data read or hosted draft save was attempted.
This confirms the current preview handover reaches the maintained live app, so it
cannot verify the new private place-note candidate. Earlier denial is resolved for
that read-only entry scope; production publishing remains unapproved.

This alternative runs the real candidate TripPlanEditor with an optional injected
transport. Its default remains accountRequest; the fixture supplies only an
in-memory synthetic response. No API request, user/session read, provider, email or
database operation is performed by the fixture. Known public place IDs seed a
unique tab's basket following an explicit button. Existing raw basket state is
restored on Clear, new-form Cancel or normal component unmount. Saved synthetic
notes exist only in React memory. The interface prominently warns against entering
personal information and distinguishes synthetic Save/Reopen from persistence.

The force-dynamic server route /australia/preview/planner returns404 unless both
VERCEL_ENV=preview and VERCEL_GIT_COMMIT_REF=test/private-place-notes-ui. Request
headers/query/cookies cannot enable it. It is noindex. Tests confirm it is disabled
in production, development, missing-env and other preview branches. No production
routing, auth protection, callback, hosted environment variable or schema changed.

309 automated checks and strict TypeScript pass. Full production build completion
is recorded with staging evidence. Stage only in verified Vercel aves-australia
project prj_YyVKn3ztqSrB6qdeEdxta6MdpTdv, team_Th6ddqWyWKU1mLzTbJPlduDx, default
preview target, preserving its existing deployment protection and live aliases.

Hosted UI checks passed on deployment dpl_HmbPCgMV9Xs8Uz8i3wFsvySGNypX,
runtime44b8ac2d, in the actual Australia project. Preview target only:
https://aves-australia-a1ia3hpqu-mmelendro-9273s-projects.vercel.app/australia/preview/planner

Import appended Arthur's Pass and Otago & the Catlins to existing synthetic notes
without calling the transport. A deliberate failed save retained the appended
notes. Retry succeeded in memory, and reopening preserved the exact notes. The
consumed place-ideas region was absent after successful save. The real bird picker
reported35 introduced entries; the Helmeted Guineafowl image dialog exposed creator,
original Wikimedia source and CC BY-SA4.0 licence. Closing the dialog and clearing
the fixture returned to the idle screen with transport count0. No real account,
database, email or provider writes were performed.

Narrow layout and keyboard/focus checks remain unverified for this fixture. None
of these checks certify hosted account/API/RLS persistence or cross-host handover.
Exact candidate private staging and scoped test-account/data work remain separate
before production approval.

The additional handler test proves the injected synthetic transport is used and
the real accountRequest helper is never called. The full local production build
passed with25 static pages and the separate dynamic fixture route.
