import { auth0 } from '@/lib/auth0';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export const runtime = 'edge';

async function getContributionCount(userId: string): Promise<number> {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
        const response = await fetch(`${apiUrl}/media/count?userId=${encodeURIComponent(userId)}`, { cache: 'no-store' });
        if (!response.ok) {
            return 0;
        }
        const data = await response.json() as { count: number };
        return data.count;
    } catch {
        return 0;
    }
}

export default async function ProfilePage() {
    let session = null;
    try {
        session = await auth0.getSession();
    } catch (error) {
        console.error('Session error:', error);
    }

    if (!session?.user) {
        redirect('/auth/login?returnTo=/dashboard/profile');
    }

    const { user } = session;
    const contributionCount = await getContributionCount(user.sub);

    return (
        <div className="min-h-screen bg-[var(--bg-canvas)] p-8 font-[family-name:var(--font-yantramanav)] text-[var(--text-primary)]">
            {/* Sutra Line */}
            <div className="fixed left-6 top-0 bottom-0 w-[1px] bg-[var(--accent-primary)] opacity-20 z-0 pointer-events-none" />

            <main className="max-w-4xl mx-auto ml-16 mt-12 relative z-10">
                <header className="mb-12">
                    <h1 className="text-4xl font-[family-name:var(--font-eczar)] font-bold mb-2">Guardian Profile</h1>
                    <p className="text-[var(--text-secondary)] font-[family-name:var(--font-gotu)]">
                        Your identity in the Open Mool archive.
                    </p>
                </header>

                {/* Guardian Card */}
                <div className="bg-[var(--bg-subtle)] border border-[var(--accent-primary)]/20 p-8 max-w-xl relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent-secondary)] rounded-bl-full opacity-10 pointer-events-none" />

                    <div className="flex items-start gap-6">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--accent-tech)]/30">
                            {user.picture ? (
                                <Image
                                    src={user.picture}
                                    alt={user.name || "User"}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-[var(--accent-tech)] flex items-center justify-center text-white text-2xl">
                                    {user.name?.[0] || "G"}
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-2xl font-[family-name:var(--font-eczar)] font-bold">
                                    {user.name || "Guardian"}
                                </h2>
                                <span className="bg-[var(--accent-primary)] text-white text-xs px-2 py-1 uppercase tracking-widest font-bold font-[family-name:var(--font-yantramanav)]">
                                    Scout
                                </span>
                            </div>

                            <p className="text-[var(--text-secondary)] text-sm mb-6 font-[family-name:var(--font-gotu)]">
                                {user.email}
                            </p>

                            <div className="grid grid-cols-2 gap-4 border-t border-[var(--accent-primary)]/10 pt-4">
                                <div>
                                    <div className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1">Contributions</div>
                                    <div className="text-3xl font-[family-name:var(--font-eczar)] text-[var(--accent-tech)]">{contributionCount}</div>
                                </div>
                                <div>
                                    <div className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-1">Joined</div>
                                    <div className="text-lg font-[family-name:var(--font-yantramanav)]">
                                        {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-4 right-4 text-[10px] uppercase tracking-[0.2em] opacity-40 font-[family-name:var(--font-yantramanav)]">
                        OM-ID: {user.sub?.split('|')[1]?.substring(0, 8) || "UNKNOWN"}
                    </div>
                </div>

                <div className="mt-8 flex gap-4">
                    <a href="/auth/logout" className="px-6 py-2 border border-[var(--text-secondary)]/30 hover:border-[var(--accent-primary)] transition-colors text-sm uppercase tracking-wider font-bold">
                        Disconnect
                    </a>
                </div>
            </main>
        </div>
    );
}
