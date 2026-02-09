/** @type {import('next').NextConfig} */
const nextConfig = {
    // Dynamic runtime config for Clerk auth and server-side API proxies
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
                hostname: 'images.clerk.dev',
                pathname: '/**',
            },
        ],
    },
    webpack: (config, { isServer, nextRuntime }) => {
        if (nextRuntime === 'edge') {
            const existingExternals = config.externals;

            if (Array.isArray(existingExternals)) {
                config.externals = [...existingExternals, 'crypto'];
            } else if (typeof existingExternals === 'function') {
                const originalExternalsFn = existingExternals;
                config.externals = async (...args) => {
                    const result = await originalExternalsFn(...args);
                    if (Array.isArray(result)) {
                        return [...result, 'crypto'];
                    }
                    return result;
                };
            } else {
                config.externals = ['crypto'];
            }
        }
        return config;
    },
    async redirects() {
        return [
            {
                source: '/whatsapp',
                destination: 'https://chat.whatsapp.com/DizWrcM1Mbr1vTRBvd43B5',
                permanent: false,
            },
            {
                source: '/github',
                destination: 'https://github.com/open-mool/open-mool',
                permanent: false,
            },
        ];
    },
};

export default nextConfig;
