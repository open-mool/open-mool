import { Auth0Client } from '@auth0/nextjs-auth0/server';
import { MockAuth0Client } from './mock-auth0';

// SECURITY: Only allow mock login in non-production environments
const isMockAuth = process.env.NEXT_PUBLIC_MOCK_LOGIN === 'true' && process.env.NODE_ENV !== 'production';

export const auth0 = isMockAuth
    ? (new MockAuth0Client({}) as unknown as Auth0Client)
    : new Auth0Client({
        // Provide fallbacks for build-time execution where secrets might be missing
        domain: process.env.AUTH0_DOMAIN || 'build-placeholder.auth0.com',
        clientId: process.env.AUTH0_CLIENT_ID || 'build-placeholder-client-id',
        clientSecret: process.env.AUTH0_CLIENT_SECRET || 'build-placeholder-client-secret',
        secret: process.env.AUTH0_SECRET || 'build-placeholder-secret-must-be-at-least-32-chars',
        
        authorizationParameters: {
            redirect_uri: (process.env.APP_BASE_URL || 'http://localhost:3000') + '/auth/callback',
        },
        // After login, redirect to dashboard
        appBaseUrl: process.env.APP_BASE_URL || 'http://localhost:3000',
        routes: {
            callback: '/auth/callback',
            login: '/auth/login',
            logout: '/auth/logout',
        },
        session: {
            cookie: {
                sameSite: 'lax',
            },
        },
    });

// Return URL for redirecting after login
export const getLoginUrl = () => '/auth/login?returnTo=/dashboard';
