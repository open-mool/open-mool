'use client';

import { motion } from 'framer-motion';
import { Mic, Code, Database } from 'lucide-react';

const pillars = [
    {
        icon: Mic,
        title: 'Capture',
        hindi: 'संग्रहण',
        description: 'Record elders, rituals, and stories before they fade into silence.',
        color: 'var(--accent-primary)',
    },
    {
        icon: Code,
        title: 'Code',
        hindi: 'कोडीकरण',
        description: 'Transform oral tradition into searchable, accessible data.',
        color: 'var(--accent-tech)',
    },
    {
        icon: Database,
        title: 'Immortalize',
        hindi: 'अमरत्व',
        description: 'Store forever in a sovereign, decentralized archive.',
        color: 'var(--accent-secondary)',
    },
];

export function TriadSection() {
    return (
        <section className="py-24 px-8">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-4 block">
                        The Trident
                    </span>
                    <h2 className="font-heading text-4xl md:text-5xl text-text-primary">
                        Three Pillars of Preservation
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={pillar.title}
                            className="group relative p-8 bg-canvas border border-gray-100 dark:border-gray-800 rounded-lg hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.15,
                                ease: [0.25, 0.4, 0.25, 1],
                            }}
                            whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.08)' }}
                        >
                            {/* Icon */}
                            <motion.div
                                className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                                style={{ backgroundColor: `color-mix(in srgb, ${pillar.color} 15%, transparent)` }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 400 }}
                            >
                                <pillar.icon
                                    size={24}
                                    style={{ color: pillar.color }}
                                />
                            </motion.div>

                            {/* Title */}
                            <div className="flex items-baseline gap-3 mb-3">
                                <h3 className="font-heading text-2xl text-text-primary">
                                    {pillar.title}
                                </h3>
                                <span className="font-human text-sm text-text-secondary opacity-60">
                                    {pillar.hindi}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="font-body text-text-secondary leading-relaxed">
                                {pillar.description}
                            </p>

                            {/* Decorative line */}
                            <motion.div
                                className="absolute bottom-0 left-8 right-8 h-0.5 rounded-full"
                                style={{ backgroundColor: pillar.color }}
                                initial={{ scaleX: 0, opacity: 0 }}
                                whileHover={{ scaleX: 1, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
