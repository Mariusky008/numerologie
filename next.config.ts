import type { NextConfig } from "next";

const nextConfig: any = {
  reactStrictMode: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig as NextConfig;
