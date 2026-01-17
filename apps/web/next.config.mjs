/** @type {import('next').NextConfig} */
const nextConfig = {
    // Removed 'output: export' to enable Auth0 and server-side features
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 's.gravatar.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.auth0.com',
                pathname: '/**',
            },
        ],
    },
    webpack: (config, { isServer, nextRuntime }) => {
        if (nextRuntime === 'edge') {
            config.resolve.alias['crypto'] = false;
        }
        return config;
    },
};

export default nextConfig;
