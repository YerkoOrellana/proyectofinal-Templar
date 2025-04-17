/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "tmplr.com", "cdn.tmplr.com"],
  },
  env: {
    // Variables de entorno
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },
}

module.exports = nextConfig
