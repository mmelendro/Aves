/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/australia",
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    // This applies only to the separate Australian deployment/local preview.
    return [{ source: "/", destination: "/australia", basePath: false, permanent: false }]
  },
}

export default nextConfig
