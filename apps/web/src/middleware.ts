import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/api/upload(.*)',
    '/api/media(.*)',
    '/api/user(.*)',
    '/api/admin(.*)',
]);

const isAdminRoute = createRouteMatcher([
    '/dashboard/admin(.*)',
    '/api/admin(.*)',
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

        // Local development bypass
        if (isLocalRequest && isLocalDevAuthBypassEnabled()) {
            return;
        }

        const authState = await auth();
        if (!authState.userId) {
            return authState.redirectToSignIn({ returnBackUrl: request.url });
        }

        // Apply admin checks for admin routes
        if (isAdminRoute(request)) {
            const adminIds = (process.env.ADMIN_USER_IDS || '')
                .split(',')
                .map((id) => id.trim())
                .filter(Boolean);

            if (adminIds.length > 0 && !adminIds.includes(authState.userId)) {
                // Not an admin, redirect them to the generic dashboard
                return Response.redirect(new URL('/dashboard', request.url));
            }
        }
    }
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|ttf|woff2?|ico|json|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
