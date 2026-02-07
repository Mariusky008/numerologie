import type { NextConfig } from "next";

const nextConfig: any = {
  reactStrictMode: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  // Force build ID change to clear Vercel cache - v2
  generateBuildId: async () => {
    return `build-${Date.now()}`
  }
};

export default nextConfig as NextConfig;
