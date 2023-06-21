const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'untitled-frontend-peach.vercel.app',
      'localhost',
    ], // Specify the domain(s) from which Next.js can fetch images
  },
  env: {
    API_ENDPOINT: 'https://plum-worried-anemone.cyclic.app',
    API_ENDPOINT_DEV: 'http://localhost:3000',
    API_ENDPOINT_RENDER: 'https://untitled-backend.onrender.com',
  },
}

module.exports = nextConfig
