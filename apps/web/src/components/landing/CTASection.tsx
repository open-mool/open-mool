'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, Code } from 'lucide-react';

const roles = [
    {
        icon: Users,
        title: 'Become a Guardian',
        hindi: 'संरक्षक बनें',
        description: 'Got a phone? You\'re a historian. Record elders, capture rituals, preserve languages.',
        cta: 'Start Recording',
        href: '/auth/login',
        primary: true,
    },
    {
        icon: Code,
        title: 'Become an Archivist',
        hindi: 'पुरालेखपाल बनें',
        description: 'Write code. Build the tools. Engineer the infrastructure for cultural immortality.',
        cta: 'View GitHub',
        href: 'https://github.com/open-mool/open-mool',
        primary: false,
    },
];

export function CTASection() {
    return (
        <section className="py-24 px-8">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="font-heading text-4xl md:text-5xl text-text-primary mb-4">
                        Join the Movement
                    </h2>
                    <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto">
                        This is not a task for one company or one government.
                        It is a <span className="text-primary font-medium">civilizational duty</span>.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {roles.map((role, index) => (
                        <motion.div
                            key={role.title}
                            className={`relative p-8 rounded-xl border overflow-hidden ${role.primary
                                    ? 'bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20'
                                    : 'bg-canvas border-gray-200 dark:border-gray-800'
                                }`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                            {/* Icon */}
                            <motion.div
                                className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${role.primary ? 'bg-primary/10' : 'bg-tech/10'
                                    }`}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                                <role.icon
                                    size={22}
                                    className={role.primary ? 'text-primary' : 'text-tech'}
                                />
                            </motion.div>

                            {/* Content */}
                            <div className="flex items-baseline gap-3 mb-3">
                                <h3 className="font-heading text-2xl text-text-primary">
                                    {role.title}
                                </h3>
                                <span className="font-human text-sm text-text-secondary/60">
                                    {role.hindi}
                                </span>
                            </div>

                            <p className="font-body text-text-secondary mb-8 leading-relaxed">
                                {role.description}
                            </p>

                            {/* CTA Button */}
                            <Link href={role.href}>
                                <motion.button
                                    className={`group flex items-center gap-2 px-6 py-3 rounded font-body font-medium transition-all duration-300 ${role.primary
                                            ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20'
                                            : 'bg-text-primary text-canvas hover:bg-tech'
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {role.cta}
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

                            {/* Decorative watermark */}
                            {role.primary && (
                                <div className="absolute -right-8 -bottom-8 text-[8rem] text-primary/5 font-heading select-none pointer-events-none">
                                    🏔️
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
