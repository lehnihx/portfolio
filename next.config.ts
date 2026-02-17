import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://r2.fivemanage.com/COKMc8Wcmk9K5dp547rEw/**.png')],
  },
};

export default nextConfig;
