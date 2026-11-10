/** Server-only route decision: no request/header/query can enable this fixture. */
export function syntheticPlannerPreviewAllowed(env: { VERCEL_ENV?: string; VERCEL_GIT_COMMIT_REF?: string }) {
  return env.VERCEL_ENV === "preview" && env.VERCEL_GIT_COMMIT_REF === "test/private-place-notes-ui"
}
