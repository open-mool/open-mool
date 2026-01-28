'use client';

import { motion } from 'framer-motion';

const techStack = [
    {
        category: 'Frontend',
        color: 'bg-primary/10 border-primary/30',
        items: [
            { name: 'Next.js 14', icon: '▲', description: 'React framework with App Router' },
            { name: 'TypeScript', icon: 'TS', description: 'Type-safe JavaScript' },
            { name: 'Tailwind CSS', icon: '🎨', description: 'Utility-first styling' },
            { name: 'Framer Motion', icon: '✨', description: 'Animation library' },
        ],
    },
    {
        category: 'Backend & Edge',
        color: 'bg-tech/10 border-tech/30',
        items: [
            { name: 'Cloudflare Workers', icon: '⚡', description: 'Edge compute runtime' },
            { name: 'Hono.js', icon: '🔥', description: 'Lightweight web framework' },
            { name: 'D1 (SQLite)', icon: '🗃️', description: 'Edge SQL database' },
            { name: 'R2 Storage', icon: '📦', description: 'Zero-egress object storage' },
        ],
    },
    {
        category: 'AI & Processing',
        color: 'bg-secondary/10 border-secondary/30',
        items: [
            { name: 'Workers AI', icon: '🤖', description: 'Cloudflare AI inference' },
            { name: 'Whisper', icon: '🎙️', description: 'Speech-to-text model' },
            { name: 'Vectorize', icon: '🧭', description: 'Semantic embeddings' },
            { name: 'OpenAI', icon: '🧠', description: 'LLM for entity extraction' },
        ],
    },
    {
        category: 'Auth & Security',
        color: 'bg-gray-100 border-gray-300',
        items: [
            { name: 'Auth0', icon: '🔐', description: 'Universal login & identity' },
            { name: 'Signed URLs', icon: '🔑', description: 'Secure file uploads' },
            { name: 'JWT Tokens', icon: '🎫', description: 'API authentication' },
            { name: 'Edge Validation', icon: '🛡️', description: 'Request validation at edge' },
        ],
    },
];

export function TechStackGrid() {
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
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-tech">Technology Stack</span>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-text-primary mt-3">
                        Built for the Future
                    </h2>
                    <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto mt-4">
                        We use a modern, edge-first stack designed for sustainability, speed, and longevity.
                    </p>
                </motion.div>

                {/* Tech Stack Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {techStack.map((category, categoryIndex) => (
                        <motion.div
                            key={category.category}
                            className={`p-6 rounded-2xl border-2 bg-white ${category.color}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                        >
                            <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
                                {category.category}
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {category.items.map((item, itemIndex) => (
                                    <motion.div
                                        key={item.name}
                                        className="p-3 rounded-xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-300"
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: (categoryIndex * 0.1) + (itemIndex * 0.05) }}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-lg">{item.icon}</span>
                                            <span className="font-body font-semibold text-sm text-text-primary">
                                                {item.name}
                                            </span>
                                        </div>
                                        <p className="font-body text-xs text-text-secondary">
                                            {item.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Open Source Note */}
                <motion.div
                    className="mt-12 p-6 rounded-2xl bg-white border-2 border-primary/30 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <p className="font-body text-text-secondary">
                        🛠️ <strong className="text-text-primary">100% Open Source</strong> ·
                        Code is MIT licensed ·
                        <a
                            href="https://github.com/open-mool/open-mool"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline ml-1"
                        >
                            View on GitHub →
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
