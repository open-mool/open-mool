// Server component layout — reads ADMIN_USER_IDS from env, never exposed to client
import { authClient } from '@/lib/auth';
import DashboardSidebar from '@/components/DashboardSidebar';

const resolveIsAdmin = async (): Promise<boolean> => {
    const session = await authClient.getSession();
    if (!session?.user?.sub) return false;
    const userId = session.user.sub;
    const adminIds = (process.env.ADMIN_USER_IDS || '')
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean);
    // Local dev fallback: treat dummy user as admin when no IDs configured
    if (adminIds.length === 0 && userId === 'dev_dummy_user') return true;
    return adminIds.includes(userId);
};

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isAdmin = await resolveIsAdmin();
    return <DashboardSidebar isAdmin={isAdmin}>{children}</DashboardSidebar>;
}
