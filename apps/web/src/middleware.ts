import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth0 } from "./lib/auth0";

export async function middleware(request: NextRequest) {
    try {
        const response = await auth0.middleware(request);

        // If a public route returns 403 (Forbidden), it often means the session verify failed 
        // or the user is in a bad state. Clear the session and try as anonymous.
        if (response.status === 403) {
            const nextResponse = NextResponse.next();
            nextResponse.cookies.delete('appSession');
            return nextResponse;
        }

        return response;
    } catch (error) {
        // If there's a session decryption error (JWEInvalid), clear the corrupted cookie
        if (error instanceof Error && error.message.includes('JWE')) {
            console.warn('Session decryption error, clearing cookie:', error.message);
            // Use next() instead of redirect to prevent redirect loops
            const response = NextResponse.next();
            response.cookies.delete('appSession');
            return response;
        }
        throw error;
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};
