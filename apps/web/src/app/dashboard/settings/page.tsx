'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { UserProfile } from '@clerk/nextjs';
import { Sun, Moon, Monitor } from 'lucide-react';

type ThemeMode = 'light' | 'dark' | 'system';

const MODES: { value: ThemeMode; label: string; Icon: React.ElementType }[] = [
    { value: 'light', label: 'Light', Icon: Sun },
    { value: 'dark', label: 'Dark', Icon: Moon },
    { value: 'system', label: 'System', Icon: Monitor },
];

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => { setMounted(true); }, []);

    return (
        <div className="min-h-screen bg-[var(--bg-canvas)] p-8 font-[family-name:var(--font-yantramanav)] text-[var(--text-primary)]">
            {/* Sutra Line */}
            <div className="fixed left-6 top-0 bottom-0 w-[1px] bg-[var(--accent-primary)] opacity-20 z-0 pointer-events-none" />

            <main className="max-w-4xl mx-auto ml-16 mt-12 relative z-10">
                <header className="mb-12">
                    <h1 className="text-4xl font-[family-name:var(--font-eczar)] font-bold mb-2">Settings</h1>
                    <p className="text-[var(--text-secondary)] font-[family-name:var(--font-gotu)]">
                        Appearance and account preferences.
                    </p>
                </header>

                {/* Appearance */}
                <section className="mb-12">
                    <h2 className="text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--text-secondary)] mb-4">
                        Appearance
                    </h2>

                    {mounted ? (
                        <div className="flex gap-3">
                            {MODES.map(({ value, label, Icon }) => {
                                const active = theme === value;
                                return (
                                    <button
                                        key={value}
                                        onClick={() => setTheme(value)}
                                        aria-pressed={active}
                                        className={`
                                            flex items-center gap-2 px-5 py-3 rounded-sm border text-xs
                                            font-bold uppercase tracking-[0.15em] transition-all duration-200
                                            ${active
                                                ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]'
                                                : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)]/40 hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
                                            }
                                        `}
                                    >
                                        <Icon className="w-3.5 h-3.5" />
                                        {label}
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="h-12 w-64 rounded-sm bg-[var(--bg-subtle)] animate-pulse" />
                    )}
                </section>

                {/* Account via Clerk */}
                <section>
                    <h2 className="text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--text-secondary)] mb-4">
                        Account
                    </h2>

                    <UserProfile
                        appearance={{
                            elements: {
                                rootBox: 'w-full',
                                card: 'shadow-none border-0 bg-transparent w-full p-0',
                                navbar: 'hidden',
                                navbarMobileMenuButton: 'hidden',
                                headerTitle: 'hidden',
                                headerSubtitle: 'hidden',
                                scrollBox: 'p-0',
                                pageScrollBox: 'px-0 py-0',
                            },
                            variables: {
                                colorBackground: 'var(--bg-canvas)',
                                colorText: 'var(--text-primary)',
                                colorTextSecondary: 'var(--text-secondary)',
                                colorPrimary: 'var(--accent-primary)',
                                borderRadius: '0.25rem',
                                fontFamily: 'var(--font-yantramanav)',
                            },
                        }}
                    />
                </section>
            </main>
        </div>
    );
}
