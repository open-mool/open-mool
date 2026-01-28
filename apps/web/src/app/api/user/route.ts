import { NextResponse } from 'next/server';
import { auth0 } from '@/lib/auth0';

export const runtime = 'edge';

export async function GET() {
    try {
        const session = await auth0.getSession();
        
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        return NextResponse.json({
            sub: session.user.sub,
            email: session.user.email,
            name: session.user.name,
        });
    } catch (error) {
        console.error('Session error:', error);
        return NextResponse.json({ error: 'Failed to retrieve user session' }, { status: 500 });
    }
}
