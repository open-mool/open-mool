"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';

export function Header() {
    const pathname = usePathname();
    const { user, isLoading } = useUser();
    const isDashboard = pathname?.startsWith('/dashboard');

    if (isDashboard) return null; // Dashboard has its own layout

    return (
        <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center pointer-events-none mix-blend-difference text-white">
            <Link href="/" className="pointer-events-auto font-[family-name:var(--font-eczar)] font-bold text-xl tracking-wide">
                OPEN MOOL
            </Link>

            <nav className="pointer-events-auto flex gap-6 font-[family-name:var(--font-yantramanav)] uppercase text-xs tracking-[0.2em] font-bold">
                <Link href="/about" className="hover:opacity-60 transition-opacity">About</Link>
                <Link href="/how-it-works" className="hover:opacity-60 transition-opacity">How it Works</Link>

                {!isLoading && (
                    user ? (
                        <Link href="/dashboard" className="text-[var(--accent-secondary)] hover:text-white transition-colors">
                            Dashboard
                        </Link>
                    ) : (
                        <Link href="/api/auth/login" className="hover:text-[var(--accent-primary)] transition-colors">
                            Login
                        </Link>
                    )
                )}
            </nav>
        </header>
    );
}
