import { NextResponse } from 'next/server';
import { auth0 } from '@/lib/auth0';

export const runtime = 'edge';

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

export async function GET() {
    try {
        const session = await auth0.getSession();
        
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Forward request to API with authenticated user ID
        const response = await fetch(`${API_URL}/api/media/my-uploads`, {
            headers: {
                'x-user-id': session.user.sub,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Backend API error: ${response.status} ${errorText}`);
            try {
                const errorData = JSON.parse(errorText);
                return NextResponse.json(errorData, { status: response.status });
            } catch {
                return NextResponse.json({ error: 'Backend API error' }, { status: response.status });
            }
        }

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Fetch my uploads error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            {
                error: 'Failed to fetch user uploads',
                details: errorMessage,
            },
            { status: 500 },
        );
    }
}
