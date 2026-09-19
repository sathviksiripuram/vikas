import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Everything is served from our own origin now — the photography lives in
    // /public/photos and the posters in /public/posters — so no remote hosts
    // need allowing. Hot-linking Unsplash meant Next fetched the original
    // across the network before it could resize, which was the main cause of
    // slow first loads on mobile.
    //
    // Narrower breakpoints than the default set: fewer variants means a much
    // higher cache-hit rate, so visitors rarely pay for a cold transform.
    deviceSizes: [400, 640, 828, 1080, 1440, 1920],
    imageSizes: [64, 128, 256, 384],
  },
};

export default nextConfig;
