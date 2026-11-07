/**
 * Next.js build and routing configuration, evaluated by the server/build tool.
 * This is not page content. headers() supplies browser security/cache instructions;
 * redirects() moves visitors to canonical routes. See docs/BEGINNERS-GUIDE.md
 * before changing path prefixes: the two AVES applications are deployed separately.
 */
import { securityHeaders, privateHeaders } from "./security-headers.mjs"
/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/australia",
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      ...["/account/:path*", "/admin/:path*", "/auth/:path*", "/api/:path*"].map(source => ({ source, headers: privateHeaders })),
    ]
  },
  async redirects() {
    // This applies only to the separate Australian deployment/local preview.
    return [{ source: "/", destination: "/australia", basePath: false, permanent: false }]
  },
}

export default nextConfig
