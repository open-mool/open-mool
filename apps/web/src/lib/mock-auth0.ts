import { NextRequest, NextResponse } from 'next/server';

const MOCK_USER = {
    sub: 'mock|1234567890',
    nickname: 'Mock Guardian',
    name: 'Mock Guardian',
    picture: 'https://cdn.auth0.com/avatars/gu.png',
    updated_at: new Date().toISOString(),
    email: 'guardian@open-mool.org',
    email_verified: true,
    org_id: 'org_mock123'
};

const SESSION_COOKIE_NAME = 'appSession';

export class MockAuth0Client {
    // eslint-disable-next-line
    constructor(_config: any) { }

    // eslint-disable-next-line
    async getSession(_req?: any, _res?: any) {
        // Use dynamic import to avoid bundling issues in edge/client if incorrectly imported
        const { cookies } = await import('next/headers');
        const cookieStore = cookies();
        const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

        if (sessionCookie && sessionCookie.value === 'mock-session-token') {
            return { user: MOCK_USER };
        }
        // If no cookie, return null so the app knows to redirect to login
        return null;
    }

    async middleware(req: NextRequest) {
        const url = new URL(req.url);
        const { pathname, searchParams } = url;
        const returnTo = searchParams.get('returnTo') || '/dashboard';

        // /auth/login
        if (pathname.endsWith('/login')) {
            // Effectively skip the provider login and just set the session
            // In a real app, this goes to Auth0 Universal Login. 
            // Here we just set our mock cookie and redirect to the callback (or direct to dashboard)
            // Let's redirect to dashboard directly.
            const res = NextResponse.redirect(new URL(returnTo, req.url));
            res.cookies.set(SESSION_COOKIE_NAME, 'mock-session-token', {
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 // 1 day
            });
            return res;
        }

        // /auth/logout
        if (pathname.endsWith('/logout')) {
            const res = NextResponse.redirect(new URL('/', req.url));
            res.cookies.delete(SESSION_COOKIE_NAME);
            return res;
        }

        // /auth/me - consumed by client-side useUser hook
        if (pathname.endsWith('/me')) {
            const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME);
            if (sessionCookie?.value === 'mock-session-token') {
                return NextResponse.json(MOCK_USER);
            }
            // Return 204 or null content to indicate no user, rather than 401 which might cause errors in client
            return new NextResponse(null, { status: 204 });
        }

        // /auth/callback - used if we did a redirect flow
        if (pathname.endsWith('/callback')) {
            const res = NextResponse.redirect(new URL(returnTo, req.url));
            return res;
        }

        // For all other routes, just pass through
        return NextResponse.next();
    }
}
