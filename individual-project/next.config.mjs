/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '',
            pathname: '/**',
          },
        ],
      },
    headers: async () => {
        return [
          {
            source: '/:path*',
            headers: [
              {
                key: 'Cache-Control',
                value: 'no-store',
              },
            ],
          },
        ]
    }
};

export default nextConfig;
