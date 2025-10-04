/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Add the Firebase Storage domain to the list of allowed hostnames.
    domains: [
      'placehold.co', 
      'lh3.googleusercontent.com', 
      'firebasestorage.googleapis.com',
    ],
  },
};

module.exports = nextConfig;

