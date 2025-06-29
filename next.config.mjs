/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  poweredByHeader: false,
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
