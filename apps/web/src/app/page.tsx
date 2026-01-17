import { redirect } from "next/navigation";
import Link from "next/link";

import { MoolDefinition } from "@/components/MoolDefinition";
import { auth0 } from "@/lib/auth0";

export default async function Home() {
    let isLoggedIn = false;
    try {
        const session = await auth0.getSession();
        isLoggedIn = !!session?.user;
    } catch (error) {
        // Session is corrupted or invalid - treat as logged out
        console.error('Session error:', error);
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
            {/* Background Decor - Floating Snow/Mountain Vibe */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-subtle rounded-full blur-3xl opacity-60"></div>
            </div>

            <div className="z-10 max-w-4xl w-full flex flex-col gap-12 text-center md:text-left">

                {/* Header Section */}
                <div className="space-y-8 md:space-y-10">
                    <div className="flex justify-between items-center w-full min-h-[40px]">
                        {/* Spacer for global header */}
                    </div>

                    <div className="space-y-4 md:space-y-6">
                        <h1 className="font-heading text-4xl sm:text-6xl md:text-8xl font-bold leading-[0.9] text-text-primary tracking-tight whitespace-nowrap">
                            The Source Code <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-secondary to-text-primary/60 italic font-light">of the Himalayas.</span>
                        </h1>
                        <p className="font-body text-lg md:text-2xl text-text-secondary max-w-2xl leading-relaxed">
                            We are building the sovereign digital infrastructure to capture, code, and immortalize Himalayan heritage.
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="flex flex-col md:flex-row gap-6 items-center md:justify-start">

                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-bold font-body text-text-secondary uppercase tracking-widest">Status</span>
                        <div className="flex items-center gap-2 px-4 py-2 border border-primary/20 bg-primary/5 rounded-full">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                            <span className="text-primary font-body font-medium text-sm">Building The Vault</span>
                        </div>
                    </div>

                    <div className="w-px h-12 bg-gray-200 hidden md:block"></div>

                    <Link href="/about" className="group flex items-center gap-3 px-6 py-3 bg-text-primary text-canvas rounded hover:bg-primary transition-colors duration-300 shadow-xl shadow-black/5">
                        <span className="font-body font-medium">Read the Manifesto</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                    </Link>
                    <Link href="/how-it-works" className="group flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 text-text-primary rounded hover:border-primary/50 hover:text-primary transition-all duration-300">
                        <span className="font-body font-medium">How It Works</span>
                    </Link>

                </div>

                {/* Definition Bridge */}
                <div className="mt-20 w-full">
                    <MoolDefinition />
                </div>

            </div>

            {/* Footer / Manifesto Teaser */}
            <div className="absolute bottom-12 w-full max-w-4xl px-8 flex justify-between items-end border-t border-gray-100 pt-8 opacity-60 hover:opacity-100 transition-opacity">
                <div className="font-human text-sm text-text-secondary">
                    Dev-Gatha &bull; Itihas &bull; Reeti-Rivaj
                </div>
                <div className="text-xs text-text-secondary font-mono">
                    v0.1.0-alpha • Dev Open: 26.01.2026
                </div>
            </div>
        </main>
    );
}
