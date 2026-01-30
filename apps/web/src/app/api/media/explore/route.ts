import { NextResponse } from 'next/server';

export const runtime = 'edge';

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
const API_SECRET = process.env.API_SECRET;

export async function GET() {
    try {
        const headers: Record<string, string> = {};
        
        // Add API secret for authentication if configured
        if (API_SECRET) {
            headers['x-api-secret'] = API_SECRET;
        }

        const response = await fetch(`${API_URL}/api/media/explore`, {
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
        console.error('Fetch explore media error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            {
                error: 'Failed to fetch explore media',
                details: errorMessage,
            },
            { status: 500 },
        );
    }
}
