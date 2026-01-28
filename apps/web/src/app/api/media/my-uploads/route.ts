import { NextResponse } from 'next/server';
import { auth0 } from '@/lib/auth0';

export const runtime = 'edge';

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
const API_SECRET = process.env.API_SECRET;

export async function GET() {
    try {
        const session = await auth0.getSession();
        
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Forward request to API with authenticated user ID and API secret
        const headers: Record<string, string> = {
            'x-user-id': session.user.sub,
        };
        
        // Add API secret for authentication if configured
        if (API_SECRET) {
            headers['x-api-secret'] = API_SECRET;
        }

        const response = await fetch(`${API_URL}/api/media/my-uploads`, {
            headers,
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
    } catch (error: unknown) {
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
