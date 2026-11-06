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
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      ...["/account/:path*", "/dashboard/:path*", "/auth/:path*", "/api/:path*", "/shopping/:path*"].map(source => ({ source, headers: privateHeaders })),
    ]
  },
  async redirects() {
    return [
      {
        source: '/avifauna-explorer',
        destination: '/aves-explorer',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
