import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from '@/lib/auth0';

export const runtime = 'edge';

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

export async function POST(request: NextRequest) {
    try {
        const session = await auth0.getSession();
        
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        
        // Forward request to API with authenticated user ID
        const response = await fetch(`${API_URL}/upload/complete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user-id': session.user.sub,
            },
            body: JSON.stringify(body),
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
        console.error('Upload complete error:', error);

        let status = 500;
        let message = 'Internal Server Error';

        if (error instanceof SyntaxError) {
            // Likely JSON parsing error from request.json()
            status = 400;
            message = 'Invalid JSON in request body';
        } else if (error instanceof TypeError) {
            // Likely network error when calling the backend API
            status = 502;
            message = 'Network error while contacting backend service';
        }

        return NextResponse.json({ error: message }, { status });
    }
}
