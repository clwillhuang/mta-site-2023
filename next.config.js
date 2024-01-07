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
    domains: ["mtautsc.com", "www.mtautsc.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mtautsc.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.mtautsc.com',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig