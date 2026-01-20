import Link from "next/link";

import { auth0 } from "@/lib/auth0";
import { HeroSection } from "@/components/landing/HeroSection";
import { TriadSection } from "@/components/landing/TriadSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { CTASection } from "@/components/landing/CTASection";
import { MoolDefinition } from "@/components/landing/MoolDefinition";

export const runtime = 'edge';

export default async function Home() {
    let isLoggedIn = false;
    try {
        const session = await auth0.getSession();
        isLoggedIn = !!session?.user;
    } catch (error) {
        console.error('Session error:', error);
    }

    return (
        <main className="min-h-screen bg-canvas">
            {/* Hero Section - Full viewport */}
            <HeroSection />

            {/* The Trident - 3 Pillars */}
            <TriadSection />

            {/* Mool Definition */}
            <section className="py-16 px-8">
                <div className="max-w-4xl mx-auto">
                    <MoolDefinition />
                </div>
            </section>

            {/* Stats */}
            <StatsSection />

            {/* CTA */}
            <CTASection />

            {/* Footer */}
            <footer className="py-12 px-8 border-t border-gray-100">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="font-human text-sm text-text-secondary">
                        Dev-Gatha &bull; Itihas &bull; Reeti-Rivaj
                    </div>
                    <div className="flex items-center gap-6">
                        <Link
                            href="/about"
                            className="font-body text-sm text-text-secondary hover:text-primary transition-colors"
                        >
                            Manifesto
                        </Link>
                        <Link
                            href="/how-it-works"
                            className="font-body text-sm text-text-secondary hover:text-primary transition-colors"
                        >
                            How It Works
                        </Link>
                        <a
                            href="https://github.com/open-mool/open-mool"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-body text-sm text-text-secondary hover:text-primary transition-colors"
                        >
                            GitHub
                        </a>
                    </div>
                    <div className="text-xs text-text-secondary/60 font-mono">
                        v0.1.0-alpha
                    </div>
                </div>
            </footer>
        </main>
    );
}
