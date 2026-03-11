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
        <div className="py-12 px-2 font-[family-name:var(--font-yantramanav)] max-w-3xl">

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
                                            ? 'border-[var(--accent-primary)] text-[var(--accent-primary)] bg-[var(--accent-primary)]/10'
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

            <div className="border-t border-[var(--border-subtle)] mb-12" />

            {/* Account */}
            <section>
                <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--text-secondary)] mb-6">
                    Account
                </p>
                <UserProfile
                    appearance={{
                        elements: {
                            rootBox: 'w-full',
                            card: 'shadow-none border-0 w-full',
                            navbar: 'hidden',
                            navbarMobileMenuButton: 'hidden',
                            headerTitle: 'hidden',
                            headerSubtitle: 'hidden',
                            scrollBox: 'shadow-none',
                        },
                        variables: {
                            // Match page background so the card is invisible
                            colorBackground: 'transparent',
                            colorText: 'var(--text-primary)',
                            colorTextSecondary: 'var(--text-secondary)',
                            colorPrimary: '#D64933',
                            colorInputBackground: 'var(--bg-subtle)',
                            colorNeutral: 'var(--text-primary)',
                            borderRadius: '0.25rem',
                            fontFamily: 'var(--font-yantramanav), sans-serif',
                            fontSize: '14px',
                            spacingUnit: '1rem',
                        },
                    }}
                />
            </section>
        </div>
    );
}
