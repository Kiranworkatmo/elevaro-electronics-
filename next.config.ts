import type { NextConfig } from "next";

const isPagesBuild = process.env.BUILD_PAGES === "true" || process.env.GITHUB_ACTIONS === "true";
const repoName = "elevaro-electronics-";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isPagesBuild ? `/${repoName}` : "",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
};

export default nextConfig;
