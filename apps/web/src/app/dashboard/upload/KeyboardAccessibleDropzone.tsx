'use client';

import React from 'react';

type Props = {
    onActivate: () => void;
    onEscape?: () => void;
    label?: string;
    children: React.ReactNode;
};

export function KeyboardAccessibleDropzone({
    onActivate,
    onEscape,
    label = 'Upload media file',
    children
}: Props) {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onActivate();
        }

        if (e.key === 'Escape') {
            onEscape?.();
        }
    };

    return (
        <div
            tabIndex={0}
            role="button"
            aria-label={label}
            onKeyDown={handleKeyDown}
            className="focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
        >
            {children}
        </div>
    );
}
