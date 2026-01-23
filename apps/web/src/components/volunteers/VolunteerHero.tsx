'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function VolunteerHero() {
    return (
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-8 overflow-hidden bg-gradient-to-b from-subtle to-canvas">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Mountain silhouette */}
                <svg
                    className="absolute bottom-0 left-0 w-full h-64 opacity-5"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="currentColor"
                        className="text-text-primary"
                        d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                </svg>

                {/* Floating dots (Aipan motif) */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-primary/20"
                        style={{
                            left: `${10 + (i * 7.5)}%`,
                            top: `${20 + (i % 3) * 25}%`,
                        }}
                        animate={{
                            y: [0, -10, 0],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 3 + (i % 2),
                            repeat: Infinity,
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-5xl w-full flex flex-col gap-8 text-center">
                {/* Eyebrow */}
                <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary border border-primary/30 px-4 py-2 rounded-full bg-primary/5">
                        Volunteer Kickoff
                    </span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-text-primary tracking-tight"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Welcome to the Mission
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    className="font-body text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                >
                    You're about to help build the <span className="text-primary font-semibold">Source Code of the Himalayas</span> –
                    an open-source digital vault preserving folklore, dialects, rituals, and oral history
                    before they're lost to time.
                </motion.p>

                {/* Stats Row */}
                <motion.div
                    className="flex flex-wrap justify-center gap-8 mt-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                >
                    {[
                        { value: '1,700+', label: 'Ghost Villages' },
                        { value: '∞', label: 'Stories at Risk' },
                        { value: '0', label: 'Time to Waste' },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="font-heading text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                            <div className="font-body text-sm text-text-secondary mt-1">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Quick Links */}
                <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                >
                    <a
                        href="#how-it-works"
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-body font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1"
                    >
                        How It Works
                        <span>↓</span>
                    </a>
                    <a
                        href="#contribute"
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-text-primary rounded-lg font-body font-medium hover:border-primary/50 transition-all duration-300"
                    >
                        Ways to Contribute
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
