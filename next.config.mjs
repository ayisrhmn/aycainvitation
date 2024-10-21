/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ayisrhmn.sirv.com'
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io'
      }
    ]
  }
};

export default nextConfig;
