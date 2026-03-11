'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { UserProfile } from '@clerk/nextjs';
import { Sun, Moon, Monitor, SlidersHorizontal, X } from 'lucide-react';

export function SettingsTrigger({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            aria-label="Open settings"
            className="
                flex items-center gap-2 w-full pl-4 py-3
                text-[10px] uppercase tracking-[0.2em] font-bold
                text-[var(--text-secondary)] hover:text-[var(--text-primary)]
                border-l-2 border-transparent hover:border-[var(--text-secondary)]/20
                transition-all group
            "
        >
            <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
            Settings
        </button>
    );
}

type ThemeMode = 'light' | 'dark' | 'system';

const MODES: { value: ThemeMode; label: string; Icon: React.ElementType }[] = [
    { value: 'light', label: 'Light', Icon: Sun },
    { value: 'dark', label: 'Dark', Icon: Moon },
    { value: 'system', label: 'System', Icon: Monitor },
];

export function SettingsSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => { setMounted(true); }, []);

    // Close on Escape
    React.useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [open, onClose]);

    return (
        <>
            {/* Backdrop */}
            <div
                aria-hidden="true"
                onClick={onClose}
                className={`
                    fixed inset-0 z-30 bg-black/40 backdrop-blur-sm
                    transition-opacity duration-300
                    ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                `}
            />

            {/* Panel */}
            <div
                role="dialog"
                aria-label="Settings"
                aria-modal="true"
                className={`
                    fixed top-0 left-0 z-40 h-full w-80
                    bg-[var(--bg-canvas)] border-r border-[var(--border-subtle)]
                    flex flex-col
                    shadow-2xl
                    transition-transform duration-300 ease-in-out
                    ${open ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-subtle)] shrink-0">
                    <span className="font-[family-name:var(--font-yantramanav)] text-xs uppercase tracking-[0.2em] font-bold text-[var(--text-secondary)]">
                        Settings
                    </span>
                    <button
                        onClick={onClose}
                        aria-label="Close settings"
                        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1 rounded-md hover:bg-[var(--bg-subtle)]"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-8">

                    {/* Theme Section */}
                    <section>
                        <h2 className="font-[family-name:var(--font-yantramanav)] text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--text-secondary)] mb-3">
                            Appearance
                        </h2>
                        {mounted ? (
                            <div className="grid grid-cols-3 gap-2">
                                {MODES.map(({ value, label, Icon }) => {
                                    const active = theme === value;
                                    return (
                                        <button
                                            key={value}
                                            onClick={() => setTheme(value)}
                                            aria-pressed={active}
                                            className={`
                                                flex flex-col items-center gap-2 py-3 px-2 rounded-lg border text-xs
                                                font-[family-name:var(--font-yantramanav)] font-bold uppercase tracking-wider
                                                transition-all duration-200
                                                ${active
                                                    ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]'
                                                    : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--text-secondary)]/40 hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
                                                }
                                            `}
                                        >
                                            <Icon className="w-4 h-4" />
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="h-16 rounded-lg bg-[var(--bg-subtle)] animate-pulse" />
                        )}
                    </section>

                    {/* Account Section */}
                    <section>
                        <h2 className="font-[family-name:var(--font-yantramanav)] text-[10px] uppercase tracking-[0.25em] font-bold text-[var(--text-secondary)] mb-3">
                            Account
                        </h2>
                        <div className="rounded-lg overflow-hidden border border-[var(--border-subtle)]">
                            <UserProfile
                                appearance={{
                                    elements: {
                                        rootBox: 'w-full',
                                        card: 'shadow-none rounded-none border-0 bg-transparent w-full',
                                        navbar: 'hidden',
                                        navbarMobileMenuButton: 'hidden',
                                        headerTitle: 'hidden',
                                        headerSubtitle: 'hidden',
                                        scrollBox: 'px-0 pt-0',
                                        pageScrollBox: 'p-4',
                                        profileSectionTitle__profile: 'hidden',
                                    },
                                    variables: {
                                        colorBackground: 'var(--bg-canvas)',
                                        colorText: 'var(--text-primary)',
                                        colorTextSecondary: 'var(--text-secondary)',
                                        colorPrimary: 'var(--accent-primary)',
                                        borderRadius: '0.5rem',
                                        fontFamily: 'var(--font-yantramanav)',
                                    },
                                }}
                            />
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
