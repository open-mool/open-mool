import { Auth0Client } from '@auth0/nextjs-auth0/server';

export const auth0 = new Auth0Client({
    authorizationParameters: {
        redirect_uri: process.env.APP_BASE_URL + '/auth/callback',
    },
    // After login, redirect to dashboard
    appBaseUrl: process.env.APP_BASE_URL,
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
