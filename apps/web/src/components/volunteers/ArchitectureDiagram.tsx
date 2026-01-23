'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const components = {
    platform: {
        title: 'The Platform',
        icon: '🌐',
        color: '#D64933',
        items: ['Next.js Web App', 'Auth0 Authentication', 'Dashboard & Upload UI'],
        description: 'The public-facing interface where Scouts and Guardians interact with the archive.',
    },
    vault: {
        title: 'The Vault',
        icon: '🗄️',
        color: '#005F73',
        items: ['Cloudflare R2 Storage', 'D1 SQLite Database', 'Raw & Processed Buckets'],
        description: 'Zero-egress object storage for all media, with a relational database for metadata.',
    },
    refinery: {
        title: 'The Refinery',
        icon: '🤖',
        color: '#FFB140',
        items: ['Workers AI Pipeline', 'Whisper Transcription', 'LLM Entity Extraction'],
        description: 'Asynchronous AI processing that transforms raw recordings into searchable, tagged archives.',
    },
};

export function ArchitectureDiagram() {
    const [activeComponent, setActiveComponent] = useState<string | null>(null);

    return (
        <section className="py-24 px-8 bg-subtle">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-tech">System Architecture</span>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-text-primary mt-3">
                        The Three Pillars
                    </h2>
                    <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto mt-4">
                        Open Mool is built on three core components: The Platform (user interface), The Vault (storage),
                        and The Refinery (AI processing).
                    </p>
                </motion.div>

                {/* Architecture Diagram */}
                <div className="relative">
                    {/* SVG Diagram */}
                    <svg
                        viewBox="0 0 800 300"
                        className="w-full max-w-4xl mx-auto"
                        style={{ height: 'auto', minHeight: '280px' }}
                    >
                        {/* Connection Lines */}
                        <motion.line
                            x1="200" y1="150" x2="400" y2="150"
                            stroke="#D64933"
                            strokeWidth="3"
                            strokeDasharray="8,4"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                        />
                        <motion.line
                            x1="400" y1="150" x2="600" y2="150"
                            stroke="#FFB140"
                            strokeWidth="3"
                            strokeDasharray="8,4"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 1 }}
                        />

                        {/* Arrows */}
                        <motion.polygon
                            points="385,145 400,150 385,155"
                            fill="#D64933"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.2 }}
                        />
                        <motion.polygon
                            points="585,145 600,150 585,155"
                            fill="#FFB140"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.5 }}
                        />

                        {/* Platform Box */}
                        <motion.g
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="cursor-pointer"
                            onClick={() => setActiveComponent(activeComponent === 'platform' ? null : 'platform')}
                        >
                            <rect
                                x="50" y="80" width="150" height="140" rx="12"
                                fill={activeComponent === 'platform' ? '#D64933' : 'white'}
                                stroke="#D64933"
                                strokeWidth="3"
                            />
                            <text x="125" y="120" textAnchor="middle" fontSize="28">🌐</text>
                            <text
                                x="125" y="155"
                                textAnchor="middle"
                                fontFamily="var(--font-eczar), serif"
                                fontWeight="bold"
                                fontSize="14"
                                fill={activeComponent === 'platform' ? 'white' : '#1A1C20'}
                            >
                                The Platform
                            </text>
                            <text
                                x="125" y="175"
                                textAnchor="middle"
                                fontFamily="var(--font-yantramanav), sans-serif"
                                fontSize="11"
                                fill={activeComponent === 'platform' ? 'rgba(255,255,255,0.8)' : '#6B7280'}
                            >
                                Next.js + Auth0
                            </text>
                        </motion.g>

                        {/* Vault Box */}
                        <motion.g
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="cursor-pointer"
                            onClick={() => setActiveComponent(activeComponent === 'vault' ? null : 'vault')}
                        >
                            <rect
                                x="325" y="80" width="150" height="140" rx="12"
                                fill={activeComponent === 'vault' ? '#005F73' : 'white'}
                                stroke="#005F73"
                                strokeWidth="3"
                            />
                            <text x="400" y="120" textAnchor="middle" fontSize="28">🗄️</text>
                            <text
                                x="400" y="155"
                                textAnchor="middle"
                                fontFamily="var(--font-eczar), serif"
                                fontWeight="bold"
                                fontSize="14"
                                fill={activeComponent === 'vault' ? 'white' : '#1A1C20'}
                            >
                                The Vault
                            </text>
                            <text
                                x="400" y="175"
                                textAnchor="middle"
                                fontFamily="var(--font-yantramanav), sans-serif"
                                fontSize="11"
                                fill={activeComponent === 'vault' ? 'rgba(255,255,255,0.8)' : '#6B7280'}
                            >
                                D1 + R2 Storage
                            </text>
                        </motion.g>

                        {/* Refinery Box */}
                        <motion.g
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="cursor-pointer"
                            onClick={() => setActiveComponent(activeComponent === 'refinery' ? null : 'refinery')}
                        >
                            <rect
                                x="600" y="80" width="150" height="140" rx="12"
                                fill={activeComponent === 'refinery' ? '#FFB140' : 'white'}
                                stroke="#FFB140"
                                strokeWidth="3"
                            />
                            <text x="675" y="120" textAnchor="middle" fontSize="28">🤖</text>
                            <text
                                x="675" y="155"
                                textAnchor="middle"
                                fontFamily="var(--font-eczar), serif"
                                fontWeight="bold"
                                fontSize="14"
                                fill={activeComponent === 'refinery' ? 'white' : '#1A1C20'}
                            >
                                The Refinery
                            </text>
                            <text
                                x="675" y="175"
                                textAnchor="middle"
                                fontFamily="var(--font-yantramanav), sans-serif"
                                fontSize="11"
                                fill={activeComponent === 'refinery' ? 'rgba(255,255,255,0.8)' : '#6B7280'}
                            >
                                Workers AI
                            </text>
                        </motion.g>

                        {/* Flow Labels */}
                        <text x="300" y="135" textAnchor="middle" fontSize="10" fill="#6B7280" fontFamily="monospace">
                            Upload
                        </text>
                        <text x="500" y="135" textAnchor="middle" fontSize="10" fill="#6B7280" fontFamily="monospace">
                            Process
                        </text>
                    </svg>

                    {/* Component Details Panel */}
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: activeComponent ? 'auto' : 0,
                            opacity: activeComponent ? 1 : 0,
                        }}
                        className="overflow-hidden mt-8"
                    >
                        {activeComponent && (
                            <div
                                className="p-6 rounded-2xl bg-white border-2 max-w-2xl mx-auto"
                                style={{ borderColor: components[activeComponent as keyof typeof components].color }}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-3xl">{components[activeComponent as keyof typeof components].icon}</span>
                                    <div>
                                        <h3 className="font-heading text-xl font-bold text-text-primary">
                                            {components[activeComponent as keyof typeof components].title}
                                        </h3>
                                        <p className="font-body text-sm text-text-secondary">
                                            {components[activeComponent as keyof typeof components].description}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {components[activeComponent as keyof typeof components].items.map((item, i) => (
                                        <span
                                            key={i}
                                            className="font-mono text-xs px-3 py-1 rounded-full bg-subtle"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Click hint */}
                    <p className="text-center mt-6 font-mono text-xs text-text-secondary/60">
                        Click on any component to learn more
                    </p>
                </div>
            </div>
        </section>
    );
}
