import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  publicRuntimeConfig: {
    gameApiUrl: "http://localhost:3000/api",
  },
};

export default nextConfig;
