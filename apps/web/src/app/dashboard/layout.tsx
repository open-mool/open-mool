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
            <aside className="w-64 border-r border-[var(--text-secondary)]/10 p-6 flex flex-col justify-between fixed top-0 bottom-0">
                <div>
                    <Link href="/" className="block mb-12 font-[family-name:var(--font-eczar)] font-bold text-xl tracking-wide">
                        OPEN MOOL
                    </Link>

                    <nav className="flex flex-col gap-4">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                                        text-sm uppercase tracking-widest font-bold py-2 border-l-2 pl-4 transition-all
                                        ${isActive
                                            ? 'border-[var(--accent-primary)] text-[var(--text-primary)]'
                                            : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                        }
                                    `}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {user && (
                    <div className="pt-6 border-t border-[var(--text-secondary)]/10">
                        <div className="text-xs text-[var(--text-secondary)] mb-2 font-[family-name:var(--font-gotu)]">
                            Signed in as
                        </div>
                        <div className="font-bold text-sm truncate mb-4">
                            {user.email}
                        </div>
                        <a
                            href="/auth/logout"
                            className="text-xs uppercase tracking-widest text-[var(--accent-primary)] hover:opacity-80"
                        >
                            Log Out
                        </a>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 relative">
                {/* Top Accent Line */}
                <div className="fixed top-0 left-64 right-0 h-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-50" />
                {children}
            </main>
        </div>
    );
}
