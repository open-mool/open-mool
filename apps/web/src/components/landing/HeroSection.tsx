'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FloatingBackground, ScrollIndicator } from './Background';
import { FadeIn } from './AnimatedText';

const words = ['stories', 'songs', 'rituals', 'dialects', 'wisdom'];

function RotatingWord() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className="inline-block relative w-[4.5em] h-[1.15em] overflow-hidden align-bottom">
            <AnimatePresence mode="wait">
                <motion.span
                    key={words[index]}
                    className="absolute inset-0 text-primary"
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}


export function HeroSection() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-8 overflow-hidden">
            <FloatingBackground />

            <div className="relative z-10 max-w-5xl w-full flex flex-col gap-10 text-center">
                {/* Eyebrow */}
                <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary/70 border border-gray-200 px-4 py-2 rounded-full">
                        Open Source Cultural Archive
                    </span>
                </motion.div>

                {/* Main Headline */}
                <div className="space-y-4">
                    <motion.h1
                        className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-text-primary tracking-tight"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Before the last voice fades,
                        <br />
                        <span className="inline">we capture </span>
                        <RotatingWord />
                    </motion.h1>

                    <motion.p
                        className="font-body text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                    >
                        Every elder is a library. We're building the infrastructure
                        to ensure their knowledge survives - searchable, accessible, and forever open.
                    </motion.p>
                </div>

                {/* CTA Row */}
                <FadeIn delay={0.8} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/auth/login">
                        <motion.button
                            className="group flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-lg font-body font-semibold text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Start Recording
                            <motion.span
                                className="inline-block"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </motion.button>
                    </Link>

                    <Link href="/about">
                        <motion.button
                            className="flex items-center gap-3 px-8 py-4 bg-white/80 backdrop-blur border border-gray-200 text-text-primary rounded-lg font-body font-medium text-lg hover:border-primary/50 hover:bg-white transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Read the Manifesto
                        </motion.button>
                    </Link>
                </FadeIn>

                {/* Social Proof / Stats Teaser */}
                <motion.div
                    className="flex flex-wrap justify-center gap-8 md:gap-12 pt-8 border-t border-gray-100 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    {[
                        { value: '127+', label: 'Elders' },
                        { value: '48h', label: 'Audio' },
                        { value: '5', label: 'Dialects' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="font-heading text-2xl md:text-3xl text-primary font-bold">
                                {stat.value}
                            </div>
                            <div className="font-body text-xs uppercase tracking-wider text-text-secondary/60">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            <ScrollIndicator />
        </section>
    );
}
