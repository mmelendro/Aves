/**
 * Server-controlled social sign-in button list.
 * Only provider names reach the browser, never OAuth client secrets. A visible
 * button is not proof that setup works: Supabase and the provider still authorize
 * the exchange and must be configured/tested before enabling the feature.
 */

import "server-only"

export type OAuthProvider = "google" | "facebook"

// This controls button visibility only. Supabase remains the auth authority.
/**
 * Read the private feature setting and return only supported provider names for the form.
 */
export function configuredOAuthProviders(): OAuthProvider[] {
  const requested = new Set((process.env.AVES_OAUTH_PROVIDERS || "").split(",").map(value => value.trim()))
  return (["google", "facebook"] as const).filter(provider => requested.has(provider))
}
