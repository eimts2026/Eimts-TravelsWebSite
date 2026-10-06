export default {
  trailingSlash: true,
  async redirects() {
    return [
      { source: '/destinations/sri-lanka', destination: '/packages/?country=Sri%20Lanka', permanent: true },
      { source: '/destinations/kenya', destination: '/packages/?country=Kenya', permanent: true },
      { source: '/destinations/:path*', destination: '/packages/', permanent: true },
    ];
  },
};
