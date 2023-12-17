/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "img.flawlessfiles.com",
      },
    ],
  },
};

module.exports = nextConfig;
