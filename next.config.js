/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
  // Dangerous: ignore build errors: 
  typescript: {
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["mta-site-2023.vercel.app"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mta-site-2023.vercel.app.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'mta-site-2023.vercel.app.com/images',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.mta-site-2023.vercel.app.com',
        pathname: '**',
      },
    ],
  },
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex'
          }
        ]
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "X-Frame-Options",
            value: "DENY"
          }
        ]
      },
    ]
  }
}

module.exports = nextConfig