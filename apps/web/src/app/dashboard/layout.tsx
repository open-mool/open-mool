"use client";

import Image from 'next/image';
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
            <aside className="w-64 border-r border-[var(--text-secondary)]/10 p-6 flex flex-col justify-between sticky top-0 h-screen overflow-hidden relative bg-[var(--bg-canvas)] z-20 shrink-0">
                {/* Watermark Symbol */}
                <div className="absolute -bottom-8 -right-4 font-[family-name:var(--font-gotu)] text-[12rem] text-[var(--accent-primary)] opacity-5 pointer-events-none select-none leading-none">
                    म
                </div>

                <div className="w-full">
                    <div className="mb-12 pl-2">
                        <Link href="/" className="block hover:opacity-80 transition-opacity">
                            <Image src="/brand/logo.svg" alt="Open Mool" width={40} height={40} className="h-10 w-auto" />
                        </Link>
                    </div>

                    <nav className="flex flex-col gap-2 w-full">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                                        text-xs uppercase tracking-[0.15em] font-bold py-3 pl-4 border-l-2 transition-all group flex items-center gap-3 w-full
                                        ${isActive
                                            ? 'border-[var(--accent-primary)] text-[var(--text-primary)] bg-[var(--text-secondary)]/5'
                                            : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)]/20'
                                        }
                                    `}
                                >
                                    {isActive && <div className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full animate-pulse" />}
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {user && (
                    <div className="pt-6 border-t border-[var(--text-secondary)]/10 relative z-10 bg-[var(--bg-canvas)]/50 backdrop-blur-sm w-full">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-[var(--accent-tech)]/10 rounded-full flex items-center justify-center font-[family-name:var(--font-eczar)] font-bold text-[var(--accent-tech)] border border-[var(--accent-tech)]/20 overflow-hidden relative">
                                {user.picture ? (
                                    <Image
                                        src={user.picture}
                                        alt={user.name || 'User'}
                                        width={40}
                                        height={40}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    user.name?.[0] || 'G'
                                )}
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm truncate font-[family-name:var(--font-yantramanav)] text-[var(--text-primary)]">
                                        {user.name?.split(' ')[0] || 'Guardian'}
                                    </span>
                                    <span className="text-[10px] bg-[var(--accent-primary)] text-white px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-bold leading-none">
                                        Scout
                                    </span>
                                </div>
                                <span className="text-xs text-[var(--text-secondary)] truncate font-[family-name:var(--font-gotu)] opacity-80">
                                    {user.email}
                                </span>
                            </div>
                        </div>

                        <a
                            href="/auth/logout"
                            className="text-[10px] uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors flex items-center gap-2 pl-1"
                        >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Disconnect
                        </a>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="flex-1 py-8 px-12 relative min-w-0">
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-50" />
                {children}
            </main>
        </div>
    );
}
