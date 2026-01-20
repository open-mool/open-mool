'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FloatingBackground, ScrollIndicator } from './Background';
import { AnimatedHeadline, FadeIn } from './AnimatedText';

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-8 overflow-hidden">
            <FloatingBackground />

            <div className="relative z-10 max-w-5xl w-full flex flex-col gap-8 text-center md:text-left">
                {/* Headline */}
                <div className="space-y-6">
                    <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] text-text-primary tracking-tight">
                        <AnimatedHeadline>
                            The Source Code
                        </AnimatedHeadline>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tech">
                            <AnimatedHeadline delay={0.5}>
                                of the Himalayas.
                            </AnimatedHeadline>
                        </span>
                    </h1>

                    <FadeIn delay={1.2}>
                        <p className="font-body text-lg md:text-xl lg:text-2xl text-text-secondary max-w-2xl leading-relaxed">
                            We are building the sovereign digital infrastructure to capture, code, and immortalize Himalayan heritage.
                        </p>
                    </FadeIn>
                </div>

                {/* CTA Row */}
                <FadeIn delay={1.5} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center md:items-start">
                    {/* Status Pill */}
                    <motion.div
                        className="flex flex-col gap-2"
                        whileHover={{ scale: 1.02 }}
                    >
                        <span className="text-xs font-bold font-body text-text-secondary uppercase tracking-widest">
                            Status
                        </span>
                        <div className="flex items-center gap-2 px-4 py-2 border border-primary/20 bg-primary/5 rounded-full">
                            <motion.div
                                className="w-2 h-2 bg-primary rounded-full"
                                animate={{ opacity: [1, 0.4, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="text-primary font-body font-medium text-sm">
                                Building The Vault
                            </span>
                        </div>
                    </motion.div>

                    <div className="w-px h-12 bg-gray-200 hidden sm:block" />

                    {/* Primary CTA */}
                    <Link href="/about">
                        <motion.button
                            className="group flex items-center gap-3 px-6 py-3 bg-text-primary text-canvas rounded font-body font-medium shadow-xl shadow-black/5 hover:bg-primary transition-colors duration-300"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Read the Manifesto
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="group-hover:translate-x-1 transition-transform"
                            >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </motion.svg>
                        </motion.button>
                    </Link>

                    {/* Secondary CTA */}
                    <Link href="/how-it-works">
                        <motion.button
                            className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 text-text-primary rounded font-body font-medium hover:border-primary/50 hover:text-primary transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            How It Works
                        </motion.button>
                    </Link>
                </FadeIn>

                {/* Quote teaser */}
                <FadeIn delay={2} className="mt-8 md:mt-12">
                    <blockquote className="font-human text-xl md:text-2xl text-text-secondary/70 italic border-l-2 border-primary/30 pl-4 max-w-xl">
                        "Culture does not die in battles; it dies in silence."
                    </blockquote>
                </FadeIn>
            </div>

            <ScrollIndicator />
        </section>
    );
}
