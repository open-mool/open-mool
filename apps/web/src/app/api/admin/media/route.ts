import { NextResponse } from 'next/server';
import { authClient } from '@/lib/auth';
import { buildInternalApiHeaders } from '@/lib/internal-api-auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

const isAdminUser = (userId: string | null): boolean => {
    if (!userId) return false;
    const adminIds = (process.env.ADMIN_USER_IDS || '')
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean);
    if (adminIds.length === 0 && userId === 'dev_dummy_user') return true;
    return adminIds.includes(userId);
};

export const GET = async (req: Request) => {
    const session = await authClient.getSession();
    if (!session?.user || !isAdminUser(session.user.sub)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const url = new URL(req.url);
    const params = url.searchParams.toString();
    const authHeaders = await buildInternalApiHeaders(session.user.sub);

    const response = await fetch(
        `${API_URL}/api/admin/media${params ? `?${params}` : ''}`,
        { headers: authHeaders }
    );
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
};
