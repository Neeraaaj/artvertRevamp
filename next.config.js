/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['sdg-migration-id.s3.amazonaws.com', 'mir-s3-cdn-cf.behance.net', 'images.squarespace-cdn.com', 'cdn.dribbble.com', 'i.pinimg.com'],
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:3000/api/:path*', // Proxy to backend
            },
        ];
    },
}

module.exports = nextConfig
