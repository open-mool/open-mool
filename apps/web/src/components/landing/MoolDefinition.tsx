'use client';

import { motion } from 'framer-motion';

export function MoolDefinition() {
    return (
        <motion.div
            className="p-6 sm:p-8 md:p-12 bg-subtle/50 rounded-3xl border border-primary/10 relative overflow-hidden group hover:border-primary/20 transition-colors w-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        >
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4 sm:gap-6 md:gap-16">
                {/* Hindi character with hover effect */}
                <motion.div
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                >
                    <h2 className="font-heading text-6xl sm:text-7xl md:text-8xl text-primary leading-none">
                        मूल
                    </h2>
                </motion.div>

                {/* Definition content */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                        <span className="font-heading text-3xl sm:text-4xl text-text-primary">
                            Mool
                        </span>
                        <motion.span
                            className="font-mono text-[10px] sm:text-xs text-text-secondary uppercase tracking-widest bg-white/50 dark:bg-subtle/50 px-2 py-0.5 rounded-full whitespace-nowrap"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            /mool/ • noun
                        </motion.span>
                    </div>
                    <motion.p
                        className="font-body text-lg text-text-secondary leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        The Root. The Source. The Origin.<br />
                        <span className="opacity-80">
                            The fundamental basis from which everything grows.
                        </span>
                    </motion.p>
                </div>
            </div>

            {/* Decorative watermark */}
            <motion.div
                className="absolute -right-4 -bottom-8 md:-right-8 md:-bottom-12 text-[10rem] md:text-[12rem] lg:text-[16rem] text-primary opacity-[0.03] lg:opacity-[0.06] font-heading select-none pointer-events-none transform rotate-12 z-0"
                initial={{ opacity: 0, rotate: 20 }}
                whileInView={{ opacity: 0.06, rotate: 12 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
            >
                मूल
            </motion.div>
        </motion.div>
    );
}
