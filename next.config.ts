import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photography is served from Unsplash's CDN. When you swap in your own
    // photos, drop them in /public and the registry in src/lib/images.ts can
    // point at local paths instead — no change needed here.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      // Country flags — see src/components/Flag.tsx
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
