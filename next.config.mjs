/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals = [...config.externals, 'bcrypt'];
        return config;
    },
    // Set CORS headers to allow requests from any origin
    async headers() {
        return [
            {
                source: '/api/proxy',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                ]
            },
        ]
    },
};

export default nextConfig;
