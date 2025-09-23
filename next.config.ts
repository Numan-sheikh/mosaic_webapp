import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // The images property is where we configure external image sources.
  images: {
    // Add the allowed hostname to the domains array.
    domains: ['placehold.co', 'lh3.googleusercontent.com'],
  },
  
  /* config options here */
};

export default nextConfig;
