# Explicit place-note import in the private brief

10 November 2026. Paired with the main public-place-ideas pilot; preview only.

The editor reads only validated public place IDs from the same browser tab. New
and existing briefs require an explicit Add Place Ideas to Notes action. Existing
notes stay intact, imports avoid duplicates, and exceeding the existing 5000-char
limit returns a notice without truncation. The textarea is controlled so visitors
can review/edit the appended place lines before ordinary Save My Draft.

Only a confirmed saved plan message consumes exact matching idea lines from the
basket; uncertain/failed saves and newer choices retain it. No private record is
created by browsing or importing, and no questionnaire/API/database migration,
provider, auth or account setup changed. Place ideas are ordinary private notes,
not structured saved-place records, itineraries, availability or reservations.

307 tests and strict TypeScript pass, including the real editor handler with
synthetic state and mocked API transport: explicit import makes no network call,
failed save preserves basket and notes, confirmed save consumes the relevant ideas,
revision/idempotency behavior remains, and reopened editor restores the notes.
Full production build passed (25 static pages). Hosted private sign-in/save/reopen,
public-to-private host/session handover, exact narrow layouts and physical touch
remain unverified. No actual guest account/data was accessed.

Stack only on private-origin PR #19, separate from the main source stack. Pair both
increments and complete actual candidate acceptance before requesting release.
