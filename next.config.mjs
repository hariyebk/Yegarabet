/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals = [...config.externals, 'bcrypt'];
        return config;
    },
    headers: [
        {
            key: 'Content-Security-Policy',
            value: "script-src 'self' https://www.google.com; frame-src 'self' https://www.google.com;",
        }
    ]
};

export default nextConfig;
