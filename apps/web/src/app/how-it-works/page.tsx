"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function HowItWorks() {
    return (
        <main className="min-h-screen bg-bg-canvas selection:bg-primary/20">
            <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
                <Hero />
                <ProcessFlow />
                <ComingSoon />
            </div>
        </main>
    );
}

function Hero() {
    return (
        <section className="mb-32 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mb-6 px-3 py-1 rounded-full border border-primary/20 bg-subtle text-primary text-xs font-mono tracking-widest uppercase"
            >
                The Protocol
            </motion.div>
            <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-5xl md:text-7xl text-text-primary mb-6"
            >
                How we build a <br /><span className="text-primary italic">Firebreak.</span>
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-body text-xl text-text-secondary max-w-lg mx-auto leading-relaxed"
            >
                A decentralized pipeline to capture, contextualize, and crystalize Himalayan heritage.
            </motion.p>
        </section>
    );
}

function ProcessFlow() {
    const steps = [
        {
            id: "01",
            title: "Locate",
            desc: "Identify the signal. An elder, a song, a dialect.",
            detail: "We rely on local Guardians to find the source. This is the human layer.",
            icon: <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        },
        {
            id: "02",
            title: "Capture",
            desc: "Digitize with high fidelity.",
            detail: "Using our open tools, record audio and video in raw formats to preserve nuance.",
            icon: <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        },
        {
            id: "03",
            title: "Tag",
            desc: "Add the cultural metadata.",
            detail: "Context is key. Who, where, when? We attach rich metadata relative to the region.",
            icon: <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        },
        {
            id: "04",
            title: "Archive",
            desc: "Store on the permaweb.",
            detail: "We push to IPFS and Filecoin. No single point of failure. It lasts as long as the internet.",
            icon: <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
        }
    ];

    return (
        <div className="relative max-w-4xl mx-auto">
            {/* Continuous line */}
            <div className="absolute left-[39px] top-4 bottom-0 w-px bg-gradient-to-b from-primary/10 via-primary/40 to-primary/10 md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-32">
                {steps.map((step, i) => (
                    <StepCard key={step.id} step={step} index={i} />
                ))}
            </div>
        </div>
    );
}

function StepCard({ step, index }: { step: any, index: number }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={cn(
                "relative flex flex-col md:flex-row items-center gap-8 md:gap-0",
                isEven ? "md:flex-row" : "md:flex-row-reverse"
            )}
        >
            {/* Node / Icon */}
            <div className="absolute left-0 top-0 md:left-1/2 md:-translate-x-1/2 w-20 h-20 flex items-center justify-center bg-bg-canvas z-10">
                <div className="w-16 h-16 bg-white dark:bg-subtle border border-primary/20 rounded-2xl shadow-lg flex items-center justify-center text-primary transform transition-transform hover:scale-110 duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        {step.icon}
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className={cn(
                "pl-24 md:pl-0 md:w-1/2",
                isEven ? "md:pr-24 md:text-right" : "md:pl-24 md:text-left"
            )}>
                <span className="font-mono text-xs text-primary/60 mb-2 block tracking-widest">{step.id}</span>
                <h3 className="font-heading text-3xl md:text-4xl text-text-primary mb-4">{step.title}</h3>
                <p className="font-body text-text-secondary text-lg mb-3">{step.desc}</p>
                <p className="font-body text-sm text-text-secondary/60 leading-relaxed max-w-sm md:ml-auto md:mr-0 inline-block">
                    {step.detail}
                </p>
            </div>

            {/* Empty side for layout balance */}
            <div className="hidden md:block md:w-1/2" />
        </motion.div>
    );
}

function ComingSoon() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-40 text-center"
        >
            <div className="inline-block p-1 rounded-2xl bg-gradient-to-br from-primary/10 via-bg-canvas to-primary/5 shadow-2xl shadow-primary/10">
                <div className="bg-bg-canvas rounded-xl px-8 py-12 md:px-16 md:py-16 border border-primary/10">
                    <h3 className="font-heading text-3xl md:text-4xl text-text-primary mb-4">Join the Resistance</h3>
                    <p className="text-text-secondary mb-8 max-w-md mx-auto">
                        The codebase is open, but the official archive ingestion begins soon. Prepare your tools.
                    </p>

                    <div className="flex flex-col items-center gap-4">
                        <a
                            href="https://github.com/open-mool/open-mool"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-[#1A1C20] text-white font-medium rounded-lg hover:bg-primary transition-colors duration-300 shadow-lg"
                        >
                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            Star on GitHub
                        </a>

                        <div className="flex items-center gap-2 mt-4 px-4 py-2 bg-subtle rounded-full border border-primary/10">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-xs font-mono text-text-secondary uppercase tracking-widest">
                                Contributions Open: <span className="text-text-primary font-bold">26 Jan 2026</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
