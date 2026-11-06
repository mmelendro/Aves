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
