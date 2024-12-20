/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript:{
      ignoreBuildErrors: true
  },
  eslint:{
      ignoreDuringBuilds: true
  },
  images:{
    domains: ["i.scdn.co"]
  }
};
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

module.exports = withPWA(nextConfig)