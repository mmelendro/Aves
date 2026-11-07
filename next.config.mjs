/**
 * Next.js build and routing configuration, evaluated by the server/build tool.
 * This is not page content. headers() supplies browser security/cache instructions;
 * redirects() moves visitors to canonical routes. See docs/BEGINNERS-GUIDE.md
 * before changing path prefixes: the two AVES applications are deployed separately.
 */
import { securityHeaders, privateHeaders } from "./security-headers.mjs"
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  poweredByHeader: false,
  async rewrites() {
    // Mirror the existing hosting routes when previewing both apps locally.
    return process.env.NODE_ENV === "development" ? [
      { source: "/australia/:path*", destination: "http://127.0.0.1:3000/australia/:path*" },
    ] : []
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      ...["/account/:path*", "/dashboard/:path*", "/auth/:path*", "/api/:path*", "/shopping/:path*"].map(source => ({ source, headers: privateHeaders })),
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
