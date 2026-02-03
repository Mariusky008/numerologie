import type { NextConfig } from "next";

const nextConfig: any = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Force build ID change
  generateBuildId: async () => {
    return `build-${Date.now()}`
  }
};

export default nextConfig as NextConfig;
