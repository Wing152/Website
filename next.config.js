/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow all hosts for the live preview proxy
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
