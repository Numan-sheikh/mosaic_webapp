import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // The images property is where we configure external image sources.
  images: {
    // We add the allowed hostname to the domains array.
    domains: ['placehold.co'],
  },
  
  /* config options here */
};

export default nextConfig;
