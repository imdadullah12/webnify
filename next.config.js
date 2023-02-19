/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    database: process.env.DATABASE_NAME,
    api_url: process.env.API_URL,
    image_url: process.env.IMAGE_URL,
  },
  images: {
    domains: ["antlovebaba.com"],
  },
};
module.exports = nextConfig;
