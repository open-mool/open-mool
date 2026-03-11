"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/lib/client-auth';
import { Settings, ShieldCheck } from 'lucide-react';

export default function DashboardSidebar({
    children,
    isAdmin = false,
}: {
    children: React.ReactNode;
    isAdmin?: boolean;
}) {
    const pathname = usePathname();
    const { user } = useUser();

    const navItems = [
        { name: 'Profile', href: '/dashboard/profile' },
        { name: 'My Uploads', href: '/dashboard/my-uploads' },
        { name: 'Archive a Story', href: '/dashboard/upload' },
        { name: 'The Oracle', href: '/explore' },
        ...(isAdmin ? [{ name: 'Admin', href: '/dashboard/admin' }] : []),
    ];

    const isSettings = pathname === '/dashboard/settings';

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
                            const isAdminItem = item.href === '/dashboard/admin';
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                                        text-xs uppercase tracking-[0.15em] font-bold py-3 pl-4 border-l-2 transition-all group flex items-center gap-3 w-full
                                        ${isActive
                                            ? 'border-[var(--accent-primary)] text-[var(--text-primary)] bg-[var(--text-secondary)]/5'
                                            : isAdminItem
                                                ? 'border-transparent text-amber-600 hover:text-amber-500 hover:border-amber-500/40'
                                                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)]/20'
                                        }
                                    `}
                                >
                                    {isActive && <div className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full animate-pulse" />}
                                    {isAdminItem && !isActive && <ShieldCheck className="w-3 h-3" />}
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom: user chip + settings */}
                <div className="pt-6 border-t border-[var(--text-secondary)]/10 relative z-10 bg-[var(--bg-canvas)]/50 backdrop-blur-sm w-full">
                    {user && (
                        <div className="flex items-center gap-3 pl-1 mb-4">
                            <div className="w-8 h-8 bg-[var(--accent-tech)]/10 rounded-full flex items-center justify-center font-[family-name:var(--font-eczar)] font-bold text-[var(--accent-tech)] border border-[var(--accent-tech)]/20 overflow-hidden relative shrink-0">
                                {user.picture ? (
                                    <Image
                                        src={user.picture}
                                        alt={user.name || 'User'}
                                        width={32}
                                        height={32}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    user.name?.[0] || 'G'
                                )}
                            </div>
                            <div className="flex flex-col overflow-hidden flex-1 min-w-0">
                                <span className="font-bold text-xs truncate font-[family-name:var(--font-yantramanav)] text-[var(--text-primary)]">
                                    {user.name?.split(' ')[0] || 'Guardian'}
                                </span>
                                <span className="text-[10px] text-[var(--text-secondary)] truncate font-[family-name:var(--font-gotu)] opacity-80">
                                    {user.email}
                                </span>
                            </div>
                            <Link
                                href="/dashboard/settings"
                                aria-label="Settings"
                                className={`shrink-0 p-1.5 rounded-md transition-colors ${isSettings
                                    ? 'text-[var(--accent-primary)] bg-[var(--accent-primary)]/10'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
                                    }`}
                            >
                                <Settings className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    )}
                </div>
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

