import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/api/upload(.*)',
    '/api/media(.*)',
    '/api/user(.*)',
]);

const isLocalDevAuthBypassEnabled = () => {
    const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || '';
    const isLocalApiTarget = apiUrl.includes('localhost') || apiUrl.includes('127.0.0.1');
    return process.env.LOCAL_DEV_AUTH_BYPASS === 'true' && isLocalApiTarget;
};

export default clerkMiddleware(async (auth, request) => {
    if (isProtectedRoute(request)) {
        const hostname = request.nextUrl.hostname;
        const isLocalRequest = hostname === 'localhost' || hostname === '127.0.0.1';

        if (isLocalRequest && isLocalDevAuthBypassEnabled()) {
            return;
        }

        await auth.protect();
    }
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|ttf|woff2?|ico|json|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
