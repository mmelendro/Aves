/**
 * HTTP response headers attached by next.config.mjs.
 * nosniff prevents guessing a different content type; DENY/frame-ancestors prevent
 * other sites framing AVES; the referrer rule limits cross-site URL detail.
 * Permissions-Policy disables the listed device/payment features. The CSP restricts
 * base URLs, plugins, framing and form targets, but is not a complete script policy.
 * Private headers discourage indexing and caching; authorization still belongs in
 * the account service and database. Headers alone cannot protect customer records.
 */
// Compatible with existing Next inline scripts and the site's external embeds.
// Nonce-based script restrictions require separate implementation and testing.
export const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Content-Security-Policy", value: "base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests" },
]

export const privateHeaders = [
  { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
  { key: "Cache-Control", value: "private, no-store" },
]
