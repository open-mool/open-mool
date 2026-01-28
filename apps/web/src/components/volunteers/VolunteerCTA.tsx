'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function VolunteerCTA() {
    return (
        <section id="contact" className="py-24 px-8 bg-gradient-to-b from-subtle to-canvas">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-primary via-primary to-primary/80 text-white overflow-hidden text-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            {[...Array(20)].map((_, i) => (
                                <circle
                                    key={i}
                                    cx={10 + (i % 5) * 20}
                                    cy={10 + Math.floor(i / 5) * 25}
                                    r="2"
                                    fill="currentColor"
                                />
                            ))}
                        </svg>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                        <motion.div
                            className="text-6xl mb-6"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                            🏔️
                        </motion.div>

                        <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
                            Ready to Join?
                        </h2>

                        <p className="font-body text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
                            Every contribution matters. Whether you write code, record stories, or verify content —
                            you&apos;re helping preserve a civilization&apos;s memory.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/auth/login">
                                <motion.button
                                    className="px-8 py-4 bg-white text-primary rounded-lg font-body font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Join the Guardians
                                </motion.button>
                            </Link>

                            <a
                                href="https://github.com/open-mool/open-mool"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <motion.button
                                    className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-body font-medium text-lg hover:bg-white/10 transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    ⭐ Star on GitHub
                                </motion.button>
                            </a>
                        </div>

                        {/* Quote */}
                        <motion.blockquote
                            className="mt-12 pt-8 border-t border-white/20"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                        >
                            <p className="font-human text-lg italic text-white/80">
                                &ldquo;Every time an elder passes away without sharing their story, a library burns to the ground.&rdquo;
                            </p>
                            <cite className="font-mono text-sm text-white/60 mt-2 block">
                                — The Open Mool Manifesto
                            </cite>
                        </motion.blockquote>
                    </div>
                </motion.div>

                {/* Footer Links */}
                <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm font-body text-text-secondary">
                    <Link href="/about" className="hover:text-primary transition-colors">
                        Manifesto
                    </Link>
                    <span className="text-gray-300">•</span>
                    <a
                        href="https://github.com/open-mool/open-mool"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        GitHub
                    </a>
                    <span className="text-gray-300">•</span>
                    <Link href="/privacy" className="hover:text-primary transition-colors">
                        Privacy
                    </Link>
                    <span className="text-gray-300">•</span>
                    <Link href="/terms" className="hover:text-primary transition-colors">
                        Terms
                    </Link>
                    <span className="text-gray-300">•</span>
                    <a href="mailto:team@openmool.org" className="hover:text-primary transition-colors">
                        Email
                    </a>
                    <span className="text-gray-300">•</span>
                    <a
                        href="https://chat.whatsapp.com/DizWrcM1Mbr1vTRBvd43B5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                    >
                        WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
}
