/**
 * Next.js build and routing configuration, evaluated by the server/build tool.
 * This is not page content. headers() supplies browser security/cache instructions;
 * redirects() moves visitors to canonical routes. See docs/BEGINNERS-GUIDE.md
 * before changing legacy paths: this app preserves all existing destination URLs.
 */
import { securityHeaders, privateHeaders } from "./security-headers.mjs"
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  poweredByHeader: false,
  async rewrites() {
    // Legacy callback/API URLs stay valid; every destination is local to this app.
    return [
      { source: "/australia/robots.txt", destination: "/robots.txt" },
      { source: "/australia/api/contact", destination: "/api/inquiries" },
      { source: "/australia/api/:path*", destination: "/api/:path*" },
      { source: "/australia/auth/:path*", destination: "/auth/:path*" },
    ]
  },
  async headers() {
    return [
      { source: "/:path*", headers: [...securityHeaders, ...(process.env.VERCEL_ENV === "preview" ? [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] : [])] },
      { source: "/images/renditions/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      ...["/account/:path*", "/admin/:path*", "/dashboard/:path*", "/auth/:path*", "/api/:path*", "/shopping/:path*", "/australia/account/:path*", "/australia/admin/:path*", "/australia/auth/:path*", "/australia/api/:path*"].map(source => ({ source, headers: privateHeaders })),
    ]
  },
  async redirects() {
    return [
      { source: "/account/settings", destination: "/account", permanent: false },
      {
        source: '/avifauna-explorer',
        destination: '/aves-explorer',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
