import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-[var(--bg-canvas)] px-6 py-16">
            <SignIn />
        </main>
    );
}
