"use client";

export default function LoginButton() {
    return (
        <a
            href="/auth/login?returnTo=/dashboard"
            className="button login"
        >
            Log In
        </a>
    );
}
