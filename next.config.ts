import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Force build ID change
  generateBuildId: async () => {
    return `build-${Date.now()}`
  }
};

export default nextConfig;
