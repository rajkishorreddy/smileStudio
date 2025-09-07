import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Map /book and /book/ to the actual file in dev (also fine in prod)
      { source: "/book", destination: "/book/index.html" },
      { source: "/book/", destination: "/book/index.html" },

      // Asset rewrites for bundles that use absolute paths
      { source: "/textures/:path*", destination: "/book/textures/:path*" },
      { source: "/assets/:path*",   destination: "/book/assets/:path*"   },
      { source: "/images/:path*",   destination: "/book/images/:path*"   },
      { source: "/audios/:path*",   destination: "/book/audios/:path*"   },
    ];
  },
};

export default nextConfig;