import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      { source: "/textures/:path*", destination: "/book/textures/:path*" },
      { source: "/assets/:path*",   destination: "/book/assets/:path*" },
      { source: "/images/:path*",   destination: "/book/images/:path*" },
      { source: "/audios/:path*",   destination: "/book/audios/:path*" },
    ];
  },
};

export default nextConfig;
