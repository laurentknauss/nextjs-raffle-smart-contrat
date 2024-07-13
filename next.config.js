
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { 
    loader: 'custom',
    path: '/',
  },
}

module.exports =  nextConfig; 