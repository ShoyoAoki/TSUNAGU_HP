/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: [],
  },
  async redirects() {
    return [
      // OwlMatch系ページを /service に一本化（SEO資産を集約）
      { source: "/owlmatch", destination: "/service", permanent: true },
    ];
  },
};

export default nextConfig;
