const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'], // Specify the domain(s) from which Next.js can fetch images
  },
  env: {
    API_ENDPOINT: 'https://plum-worried-anemone.cyclic.app',
  },
}

module.exports = nextConfig
