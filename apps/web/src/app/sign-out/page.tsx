'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';

export default function SignOutPage() {
    const { signOut } = useClerk();
    const router = useRouter();

    useEffect(() => {
        void signOut({
            redirectUrl: '/',
        }).catch(() => {
            router.replace('/');
        });
    }, [router, signOut]);

    return (
        <main className="min-h-screen flex items-center justify-center bg-[var(--bg-canvas)] px-6 py-16">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-secondary)]">Signing out...</p>
        </main>
    );
}
