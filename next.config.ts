import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "r2.fivemanage.com",
        pathname: "/COKMc8Wcmk9K5dp547rEw/**.png",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "u/**",
      },
    ],
  },
};

export default nextConfig;
