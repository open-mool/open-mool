"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { user } = useUser();

    const navItems = [
        { name: 'Profile', href: '/dashboard/profile' },
        { name: 'My Uploads', href: '/dashboard/my-uploads' },
        { name: 'Archive a Story', href: '/dashboard/upload' },
    ];

    return (
        <div className="flex min-h-screen bg-[var(--bg-canvas)]">
            {/* Sidebar */}
            <aside className="w-64 border-r border-[var(--text-secondary)]/10 p-6 flex flex-col justify-between fixed top-0 bottom-0 overflow-hidden relative items-end text-right">
                {/* Watermark Symbol - moved to left for balance */}
                <div className="absolute -bottom-8 -left-4 font-[family-name:var(--font-gotu)] text-[12rem] text-[var(--accent-primary)] opacity-5 pointer-events-none select-none leading-none">
                    म
                </div>

                <div className="w-full flex flex-col items-end">
                    <div className="mb-12 pr-2">
                        <Link href="/" className="block hover:opacity-80 transition-opacity">
                            {/* Simple text logo for sidebar, or import Logo component if preferred */}
                            <div className="flex flex-col items-end">
                                <span className="font-[family-name:var(--font-eczar)] font-bold text-2xl tracking-tight leading-none text-[var(--accent-primary)]">OPEN</span>
                                <span className="font-[family-name:var(--font-eczar)] font-bold text-2xl tracking-tight leading-none text-[var(--text-primary)]">MOOL</span>
                            </div>
                        </Link>
                    </div>

                    <nav className="flex flex-col gap-2 w-full items-end">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                                        text-xs uppercase tracking-[0.15em] font-bold py-3 pr-4 border-r-2 transition-all group flex items-center justify-end gap-3 w-full
                                        ${isActive
                                            ? 'border-[var(--accent-primary)] text-[var(--text-primary)] bg-[var(--text-secondary)]/5'
                                            : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)]/20'
                                        }
                                    `}
                                >
                                    {item.name}
                                    {isActive && <div className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full animate-pulse" />}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {user && (
                    <div className="pt-6 border-t border-[var(--text-secondary)]/10 relative z-10 bg-[var(--bg-canvas)]/50 backdrop-blur-sm w-full flex flex-col items-end">
                        <div className="flex flex-row-reverse items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-[var(--accent-tech)]/10 rounded-full flex items-center justify-center font-[family-name:var(--font-eczar)] font-bold text-[var(--accent-tech)] border border-[var(--accent-tech)]/20">
                                {user.name?.[0] || 'G'}
                            </div>
                            <div className="flex flex-col overflow-hidden items-end">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] bg-[var(--accent-primary)] text-white px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-bold leading-none">
                                        Scout
                                    </span>
                                    <span className="font-bold text-sm truncate font-[family-name:var(--font-yantramanav)] text-[var(--text-primary)]">
                                        {user.name?.split(' ')[0] || 'Guardian'}
                                    </span>
                                </div>
                                <span className="text-xs text-[var(--text-secondary)] truncate font-[family-name:var(--font-gotu)] opacity-80">
                                    {user.email}
                                </span>
                            </div>
                        </div>

                        <a
                            href="/auth/logout"
                            className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors flex items-center justify-end gap-2 pr-1"
                        >
                            Disconnect
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </a>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 py-8 pr-8 pl-12 relative">
                {/* Top Accent Line */}
                <div className="fixed top-0 left-64 right-0 h-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-50" />
                {children}
            </main>
        </div>
    );
}
