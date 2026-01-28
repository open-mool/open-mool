'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedTextProps {
    children: string;
    className?: string;
    delay?: number;
}

export function AnimatedHeadline({ children, className = '', delay = 0 }: AnimatedTextProps) {
    const words = children.split(' ');

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: delay },
        }),
    };

    const child: Variants = {
        hidden: {
            opacity: 0,
            y: 50,
            filter: 'blur(10px)',
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.span
            className={`inline-flex flex-wrap ${className}`}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    variants={child}
                    className="mr-[0.25em] inline-block"
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    );
}

interface FadeInProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
}

export function FadeIn({ children, className = '', delay = 0, direction = 'up' }: FadeInProps) {
    const directions = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { y: 0, x: 40 },
        right: { y: 0, x: -40 },
    };

    return (
        <motion.div
            className={className}
            initial={{
                opacity: 0,
                ...directions[direction],
            }}
            animate={{
                opacity: 1,
                y: 0,
                x: 0,
            }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.25, 0.4, 0.25, 1],
            }}
        >
            {children}
        </motion.div>
    );
}

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
                duration: 0.7,
                delay,
                ease: [0.25, 0.4, 0.25, 1],
            }}
        >
            {children}
        </motion.div>
    );
}
