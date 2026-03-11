import { authClient } from '@/lib/auth';
import { buildInternalApiHeaders } from '@/lib/internal-api-auth';
import { NextResponse } from 'next/server';

export const runtime = 'edge';


export const POST = async (req: Request) => {
  try {
    const session = await authClient.getSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
    const authHeaders = await buildInternalApiHeaders(session.user.sub);

    const response = await fetch(`${apiUrl}/upload/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
