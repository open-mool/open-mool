'use client';

import { motion } from 'framer-motion';

export function FloatingBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Primary gradient orb */}
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full opacity-40"
                style={{
                    background: 'radial-gradient(circle, rgba(214, 73, 51, 0.15) 0%, transparent 70%)',
                    top: '-15%',
                    right: '-10%',
                }}
                animate={{
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Secondary gradient orb - marigold */}
            <motion.div
                className="absolute w-[400px] h-[400px] rounded-full opacity-30"
                style={{
                    background: 'radial-gradient(circle, rgba(255, 177, 64, 0.15) 0%, transparent 70%)',
                    bottom: '10%',
                    left: '-5%',
                }}
                animate={{
                    x: [0, -25, 0],
                    y: [0, 25, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Teal accent orb */}
            <motion.div
                className="absolute w-[300px] h-[300px] rounded-full opacity-20"
                style={{
                    background: 'radial-gradient(circle, rgba(0, 95, 115, 0.15) 0%, transparent 70%)',
                    top: '40%',
                    right: '5%',
                }}
                animate={{
                    x: [0, 15, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(26, 28, 32, 0.5) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(26, 28, 32, 0.5) 1px, transparent 1px)
                    `,
                    backgroundSize: '64px 64px',
                }}
            />
        </div>
    );
}

export function ScrollIndicator() {
    return (
        <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
        >
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary/50">
                Scroll
            </span>
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-text-secondary/40"
                >
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
            </motion.div>
        </motion.div>
    );
}
