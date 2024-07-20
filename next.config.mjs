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
                source: '/api/create-prediction',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                ]
            },
            {
                source: '/api/get-prediction',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                ]
            },
            {
                source: '/api/verifyToken',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                ]
            },
            {
                source: '/api/restore/create-prediction',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                ]
            },
            {
                source: '/api/restore/get-prediction',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                ]
            },
            {
                source: '/api/restore/verifyToken',
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
