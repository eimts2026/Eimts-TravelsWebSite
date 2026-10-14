export default {
  trailingSlash: true,
  images: {
    minimumCacheTTL: 86400,
    deviceSizes: [360, 640, 828, 1080, 1440, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256],
  },
  async headers() {
    return [
      { source: '/images/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }] },
      { source: '/fonts/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }] },
    ];
  },
  async redirects() {
    return [
      { source: '/destinations/sri-lanka', destination: '/packages/?country=Sri%20Lanka', permanent: true },
      { source: '/destinations/kenya', destination: '/packages/?country=Kenya', permanent: true },
      { source: '/destinations/:path*', destination: '/packages/', permanent: true },
    ];
  },
};
