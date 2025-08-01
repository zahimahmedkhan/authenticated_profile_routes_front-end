/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'encrypted-tbn0.gstatic.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'randomuser.me',
            pathname: '**',
          },
        ],
      },
};

export default nextConfig;
