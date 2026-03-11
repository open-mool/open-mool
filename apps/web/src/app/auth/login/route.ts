import { NextResponse } from 'next/server';

export const runtime = 'edge';


export const GET = (request: Request) => {
    const url = new URL(request.url);
    const returnTo = url.searchParams.get('returnTo') || '/dashboard';
    const redirectUrl = `/sign-in?redirect_url=${encodeURIComponent(returnTo)}`;
    return NextResponse.redirect(new URL(redirectUrl, url.origin));
};
