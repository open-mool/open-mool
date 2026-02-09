import { NextResponse } from 'next/server';

export const GET = (request: Request) => {
    const url = new URL(request.url);
    return NextResponse.redirect(new URL('/sign-out', url.origin));
};
