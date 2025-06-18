/* @type {import('next').NextConfig} 
const nextConfig = {
  images: {
    domains: ["encrypted-tbn0.gstatic.com"],
  },
};

export default nextConfig;*/
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // permite cualquier dominio HTTPS
      },
    ],
  },
};

export default nextConfig;

