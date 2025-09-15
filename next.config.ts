import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "nyc3.digitaloceanspaces.com", // your external image host
      "github.com", // any other external images you use
    ],
  },
};

export default nextConfig;
