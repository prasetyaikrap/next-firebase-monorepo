/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  distDir: "./build",
  env: {
    CLIENT_ID: process.env.CLIENT_ID || "",
  },
};

export default nextConfig;
