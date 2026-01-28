"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/Logo";

export function Header() {
    const pathname = usePathname();
    const { user, isLoading } = useUser();
    const isDashboard = pathname?.startsWith('/dashboard');
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Hide on dashboard (has own layout)
    if (isDashboard) return null;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-canvas-80 backdrop-blur-md shadow-sm py-4'
                : 'bg-transparent py-6 pointer-events-none'
                }`}
        >
            <div className={`max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12 ${isScrolled ? '' : 'pointer-events-auto'}`}>
                <Link href="/" className="hover:opacity-80 transition-opacity">
                    <Logo />
                </Link>

                <nav className="flex items-center gap-6">
                    {/* Navigation Links - Hidden on mobile, visible on desktop */}
                    <div className="hidden md:flex items-center gap-6 font-[family-name:var(--font-yantramanav)] uppercase text-xs tracking-[0.2em] font-bold text-[var(--text-secondary)]">
                        <ThemeToggle />
                        <Link href="/about" className="hover:text-[var(--text-primary)] transition-colors">About</Link>
                        <Link href="/how-it-works" className="hover:text-[var(--text-primary)] transition-colors">How it Works</Link>
                        <Link href="/explore" className="hover:text-[var(--text-primary)] transition-colors">The Oracle</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {!isLoading && (
                            user ? (
                                <Link
                                    href="/dashboard"
                                    className="px-5 py-2 bg-[var(--accent-primary)] text-white uppercase tracking-widest text-xs font-bold hover:opacity-90 transition-opacity rounded-sm"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href="/auth/login?returnTo=/dashboard"
                                    className="px-5 py-2 bg-[var(--accent-primary)] text-white uppercase tracking-widest text-xs font-bold hover:opacity-90 transition-opacity rounded-sm"
                                >
                                    Join
                                </Link>
                            )
                        )}
                        <a href="https://github.com/open-mool/open-mool" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors p-2 hover:bg-[var(--bg-subtle)] rounded-full hidden sm:block" title="View Source on GitHub">
                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    );
}
