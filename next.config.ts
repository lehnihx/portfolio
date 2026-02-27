import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.100.42', '172.20.10.5'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "r2.fivemanage.com",
        pathname: "/COKMc8Wcmk9K5dp547rEw/**",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        pathname: "/**",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/en',
      },
    ]
  },
}

export default nextConfig
