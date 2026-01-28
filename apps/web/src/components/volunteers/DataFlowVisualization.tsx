'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const steps = [
    {
        id: 'capture',
        icon: '📱',
        title: 'संग्रह (Capture)',
        subtitle: 'क्षेत्र में',
        description: 'Scouts visit villages and record elders — songs, stories, rituals, and memories — using just a smartphone.',
        color: 'bg-secondary/20 border-secondary',
        techNote: 'Mobile upload with geolocation tagging',
    },
    {
        id: 'upload',
        icon: '📤',
        title: 'अपलोड (Upload)',
        subtitle: 'द्वार पर',
        description: 'Files are uploaded through our web platform with rich metadata — who, where, what language, and context.',
        color: 'bg-primary/20 border-primary',
        techNote: 'Presigned URLs → Cloudflare R2 (raw bucket)',
    },
    {
        id: 'process',
        icon: '🤖',
        title: 'शोधन (Process)',
        subtitle: 'शोधनी में',
        description: 'AI automatically transcribes audio, translates dialects, extracts entities (names, places, festivals), and tags content.',
        color: 'bg-tech/20 border-tech',
        techNote: 'Whisper AI + LLM → Cloudflare Workers AI',
    },
    {
        id: 'preserve',
        icon: '🏛️',
        title: 'संरक्षण (Preserve)',
        subtitle: 'कोष में',
        description: 'Verified content enters the permanent archive — searchable, browsable, and forever open to researchers and descendants.',
        color: 'bg-gray-100 border-gray-400',
        techNote: 'D1 Database + R2 Storage + Vector Embeddings',
    },
];

export function DataFlowVisualization() {
    const [activeStep, setActiveStep] = useState<string | null>(null);

    return (
        <section id="how-it-works" className="py-24 px-8 bg-canvas">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-tech">How It Works</span>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-text-primary mt-3">
                        From Voice to Vault
                    </h2>
                    <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto mt-4">
                        Every story follows this journey — from a village elder&apos;s voice to an immortal digital archive.
                    </p>
                </motion.div>

                {/* Flow Steps */}
                <div className="relative">
                    {/* Connecting Line */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0" />
                    <motion.div
                        className="hidden lg:block absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0"
                        initial={{ width: '0%' }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: 0.5 }}
                    />

                    {/* Steps Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer bg-white ${activeStep === step.id ? step.color : 'border-gray-100 hover:border-gray-200'
                                    }`}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                                whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                            >
                                {/* Step Number */}
                                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-white font-body font-bold text-sm flex items-center justify-center shadow-lg">
                                    {index + 1}
                                </div>

                                {/* Icon */}
                                <div className="text-4xl mb-4">{step.icon}</div>

                                {/* Title */}
                                <h3 className="font-heading text-xl font-bold text-text-primary">{step.title}</h3>
                                <p className="font-human text-sm text-text-secondary mb-3">{step.subtitle}</p>

                                {/* Description */}
                                <p className="font-body text-sm text-text-secondary leading-relaxed">
                                    {step.description}
                                </p>

                                {/* Tech Note (Expanded) */}
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: activeStep === step.id ? 'auto' : 0,
                                        opacity: activeStep === step.id ? 1 : 0,
                                    }}
                                    className="overflow-hidden"
                                >
                                    <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
                                        <div className="font-mono text-xs text-tech bg-tech/10 px-3 py-2 rounded-lg">
                                            💻 {step.techNote}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Expand hint */}
                                <div className="mt-4 text-xs text-text-secondary/60 font-mono">
                                    {activeStep === step.id ? '↑ Click to collapse' : '↓ Click for tech details'}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
