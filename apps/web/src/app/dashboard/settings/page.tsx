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
        <div className="max-w-2xl py-12 px-2 font-[family-name:var(--font-yantramanav)]">

            {/* Page title */}
            <h1 className="text-3xl font-[family-name:var(--font-eczar)] font-bold text-[var(--text-primary)] mb-1">
                Settings
            </h1>
            <p className="text-sm text-[var(--text-secondary)] font-[family-name:var(--font-gotu)] mb-12">
                Appearance and account preferences.
            </p>

            {/* Appearance */}
            <section className="mb-12">
                <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--text-secondary)] mb-4">
                    Appearance
                </p>
                {mounted ? (
                    <div className="flex gap-2">
                        {MODES.map(({ value, label, Icon }) => {
                            const active = theme === value;
                            return (
                                <button
                                    key={value}
                                    onClick={() => setTheme(value)}
                                    aria-pressed={active}
                                    className={`
                                        flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-widest
                                        border transition-all duration-150 rounded-sm
                                        ${active
                                            ? 'border-[var(--accent-primary)] text-[var(--accent-primary)] bg-[var(--accent-primary)]/8'
                                            : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)]/50 hover:text-[var(--text-primary)]'
                                        }
                                    `}
                                >
                                    <Icon className="w-3 h-3" />
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <div className="h-8 w-52 rounded-sm bg-[var(--bg-subtle)] animate-pulse" />
                )}
            </section>

            {/* Divider */}
            <div className="border-t border-[var(--border-subtle)] mb-12" />

            {/* Account — Clerk fills this section cleanly */}
            <section>
                <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--text-secondary)] mb-6">
                    Account
                </p>
                <UserProfile
                    appearance={{
                        elements: {
                            // Strip all card/container chrome — let it sit flush on the page
                            rootBox: 'w-full !shadow-none',
                            card: '!shadow-none !border-0 !bg-transparent !p-0 !rounded-none w-full',
                            navbar: 'hidden',
                            navbarMobileMenuButton: 'hidden',
                            headerTitle: 'hidden',
                            headerSubtitle: 'hidden',
                            scrollBox: '!p-0 !shadow-none',
                            pageScrollBox: '!p-0',
                            profilePage: 'gap-6',
                        },
                        variables: {
                            colorBackground: 'var(--bg-canvas)',
                            colorText: 'var(--text-primary)',
                            colorTextSecondary: 'var(--text-secondary)',
                            colorPrimary: 'var(--accent-primary)',
                            colorInputBackground: 'var(--bg-subtle)',
                            borderRadius: '0.25rem',
                            fontFamily: 'var(--font-yantramanav), sans-serif',
                            fontSize: '14px',
                        },
                    }}
                />
            </section>
        </div>
    );
}
