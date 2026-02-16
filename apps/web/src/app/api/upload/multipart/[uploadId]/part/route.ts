import { authClient } from '@/lib/auth';
import { buildInternalApiHeaders } from '@/lib/internal-api-auth';
import { NextResponse } from 'next/server';

export const PUT = async (req: Request, { params }: { params: { uploadId: string } }) => {
  try {
    const session = await authClient.getSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { uploadId } = params;
    const url = new URL(req.url);
    const partNumber = url.searchParams.get('partNumber');
    const key = url.searchParams.get('key');

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
    const authHeaders = await buildInternalApiHeaders(session.user.sub);

    const body = await req.arrayBuffer();

    const response = await fetch(`${apiUrl}/upload/multipart/${uploadId}/part?partNumber=${partNumber}&key=${key}`, {
      method: 'PUT',
      headers: {
        ...authHeaders,
      },
      body,
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
