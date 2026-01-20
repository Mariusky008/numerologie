import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    turbo: {
      root: __dirname,
    }
  },
  // Force build ID change
  generateBuildId: async () => {
    return `build-${Date.now()}`
  }
};

export default nextConfig;
