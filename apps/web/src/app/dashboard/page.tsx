import Link from 'next/link';
import { auth0 } from '@/lib/auth0';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    let session = null;
    try {
        session = await auth0.getSession();
    } catch (error) {
        console.error('Session error:', error);
    }

    if (!session?.user) {
        redirect('/auth/login?returnTo=/dashboard');
    }

    const user = session.user;

    return (
        <div className="min-h-screen p-8">
            {/* Welcome Section */}
            <header className="mb-12">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-primary)] font-bold mb-3 font-[family-name:var(--font-yantramanav)]">
                    The Vault
                </p>
                <h1 className="text-4xl font-[family-name:var(--font-eczar)] font-bold mb-2">
                    Welcome back, {user.name?.split(' ')[0] || 'Guardian'}
                </h1>
                <p className="text-[var(--text-secondary)] font-[family-name:var(--font-gotu)]">
                    Continue preserving the Himalayan heritage
                </p>
            </header>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
                {/* Archive a Story */}
                <Link
                    href="/dashboard/upload"
                    className="group bg-[var(--bg-subtle)] border border-[var(--accent-primary)]/10 p-8 hover:border-[var(--accent-primary)]/40 transition-all"
                >
                    <div className="w-12 h-12 bg-[var(--accent-primary)]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[var(--accent-primary)]/20 transition-colors">
                        <svg className="w-6 h-6 text-[var(--accent-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-[family-name:var(--font-eczar)] font-bold mb-2">
                        Archive a Story
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] font-[family-name:var(--font-gotu)]">
                        Upload audio or video to preserve for future generations
                    </p>
                </Link>

                {/* My Uploads */}
                <Link
                    href="/dashboard/my-uploads"
                    className="group bg-[var(--bg-subtle)] border border-[var(--accent-primary)]/10 p-8 hover:border-[var(--accent-primary)]/40 transition-all"
                >
                    <div className="w-12 h-12 bg-[var(--accent-tech)]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[var(--accent-tech)]/20 transition-colors">
                        <svg className="w-6 h-6 text-[var(--accent-tech)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-[family-name:var(--font-eczar)] font-bold mb-2">
                        My Archives
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] font-[family-name:var(--font-gotu)]">
                        View and manage your contributions to The Vault
                    </p>
                </Link>

                {/* Profile */}
                <Link
                    href="/dashboard/profile"
                    className="group bg-[var(--bg-subtle)] border border-[var(--accent-primary)]/10 p-8 hover:border-[var(--accent-primary)]/40 transition-all"
                >
                    <div className="w-12 h-12 bg-[var(--accent-secondary)]/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-[var(--accent-secondary)]/20 transition-colors">
                        <svg className="w-6 h-6 text-[var(--accent-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-[family-name:var(--font-eczar)] font-bold mb-2">
                        Guardian Profile
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] font-[family-name:var(--font-gotu)]">
                        View your reputation and identity in the archive
                    </p>
                </Link>
            </div>
        </div>
    );
}
