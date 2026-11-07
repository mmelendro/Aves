import "server-only"

export type OAuthProvider = "google" | "facebook"

// This controls button visibility only. Supabase remains the auth authority.
export function configuredOAuthProviders(): OAuthProvider[] {
  const requested = new Set((process.env.AVES_OAUTH_PROVIDERS || "").split(",").map(value => value.trim()))
  return (["google", "facebook"] as const).filter(provider => requested.has(provider))
}
