// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactCompiler: true,
// };

// export default nextConfig;


const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-cdn.com'],
  },
  experimental: {
    appDir: true
  }
}
module.exports = nextConfig;
