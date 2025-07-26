import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
},
typescript: {
  ignoreBuildErrors: true,
},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shaarvy-snapcast.b-cdn.ne",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
};

export default nextConfig;