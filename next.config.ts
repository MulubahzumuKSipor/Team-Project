import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
     remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/MulubahzumuKSipor/Team-Project/refs/heads/main/public/images',
      },
    ],
    domains: ['dummyjson.com', 'github.com', 'raw.githubusercontent.com'], // add any external domains you use
  },
};

export default nextConfig;
