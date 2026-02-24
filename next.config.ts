import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.100.42'],
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
};

export default nextConfig;
