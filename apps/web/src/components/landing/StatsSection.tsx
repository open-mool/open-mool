'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface AnimatedCounterProps {
    value: number;
    suffix?: string;
    delay?: number;
}

function AnimatedCounter({ value, suffix = '', delay = 0 }: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        const timeout = setTimeout(() => {
            const controls = animate(0, value, {
                duration: 2,
                ease: 'easeOut',
                onUpdate: (latest) => {
                    setDisplayValue(Math.round(latest));
                },
            });

            return () => controls.stop();
        }, delay * 1000);

        return () => clearTimeout(timeout);
    }, [isInView, value, delay]);

    return (
        <span ref={ref} className="tabular-nums">
            {displayValue.toLocaleString()}{suffix}
        </span>
    );
}

interface StatItemProps {
    value: number;
    suffix?: string;
    label: string;
    delay?: number;
}

function StatItem({ value, suffix, label, delay = 0 }: StatItemProps) {
    return (
        <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
        >
            <div className="font-heading text-5xl md:text-6xl text-primary mb-2">
                <AnimatedCounter value={value} suffix={suffix} delay={delay} />
            </div>
            <div className="font-body text-text-secondary text-sm uppercase tracking-wide">
                {label}
            </div>
        </motion.div>
    );
}

export function StatsSection() {
    return (
        <section className="py-24 px-8 bg-subtle/50">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-4 block">
                        Building The Vault
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl text-text-primary mb-6">
                        Every Recording is a Victory
                    </h2>
                    <p className="font-body text-text-secondary max-w-xl mx-auto">
                        We&apos;re just getting started. Be among the first Guardians to preserve Himalayan voices for future generations.
                    </p>
                </motion.div>

                {/* Decorative divider */}
                <motion.div
                    className="mt-12 flex justify-center"
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                </motion.div>
            </div>
        </section>
    );
}
