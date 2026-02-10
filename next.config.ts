import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/mission-hq",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
