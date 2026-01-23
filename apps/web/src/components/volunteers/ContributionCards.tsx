'use client';

import { motion } from 'framer-motion';

const contributions = [
    {
        id: 'developers',
        icon: '💻',
        title: 'Developers',
        subtitle: 'Build the Pipes',
        description: 'Write the code that will carry history into the future. From React components to AI pipelines, every line of code matters.',
        tasks: [
            'Fix GitHub issues (good first issues available!)',
            'Build new features (see roadmap)',
            'Improve documentation',
            'Write tests',
        ],
        cta: 'Browse Issues',
        ctaLink: 'https://github.com/open-mool/open-mool/issues',
        color: 'from-primary/5 to-primary/10 border-primary/30',
    },
    {
        id: 'scouts',
        icon: '🎤',
        title: 'Field Scouts',
        subtitle: 'Capture the Stories',
        description: 'Go to villages, sit with elders, hit record. You are the bridge between a disappearing world and the digital archive.',
        tasks: [
            'Record audio of songs & stories',
            'Video document rituals & traditions',
            'Interview elders about history',
            'Photograph cultural artifacts',
        ],
        cta: 'Get the Field Guide',
        ctaLink: '/docs/field-guide',
        color: 'from-secondary/5 to-secondary/10 border-secondary/30',
    },
    {
        id: 'researchers',
        icon: '📚',
        title: 'Researchers',
        subtitle: 'Verify & Document',
        description: 'Bring scholarly rigor to the archive. Help verify content, add historical context, and ensure cultural accuracy.',
        tasks: [
            'Fact-check submissions',
            'Add scholarly annotations',
            'Connect related content',
            'Write research summaries',
        ],
        cta: 'Join Research Group',
        ctaLink: '#contact',
        color: 'from-tech/5 to-tech/10 border-tech/30',
    },
    {
        id: 'translators',
        icon: '🌐',
        title: 'Translators',
        subtitle: 'Bridge Languages',
        description: 'Help translate between Pahadi dialects, Hindi, and English. Your language skills unlock stories for the world.',
        tasks: [
            'Translate transcripts to English/Hindi',
            'Correct AI transcription errors',
            'Add dialect-specific context',
            'Create bilingual metadata',
        ],
        cta: 'Start Translating',
        ctaLink: '/dashboard',
        color: 'from-gray-50 to-gray-100 border-gray-300',
    },
];

export function ContributionCards() {
    return (
        <section id="contribute" className="py-24 px-8 bg-canvas">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">Get Involved</span>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-text-primary mt-3">
                        Ways to Contribute
                    </h2>
                    <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto mt-4">
                        Everyone has something to offer. Choose your path and join the movement.
                    </p>
                </motion.div>

                {/* Contribution Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {contributions.map((contribution, index) => (
                        <motion.div
                            key={contribution.id}
                            className={`relative p-8 rounded-2xl border-2 bg-gradient-to-br ${contribution.color} overflow-hidden`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                        >
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 text-8xl opacity-10 transform translate-x-4 -translate-y-4">
                                {contribution.icon}
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="text-4xl mb-4">{contribution.icon}</div>

                                {/* Title */}
                                <h3 className="font-heading text-2xl font-bold text-text-primary">
                                    {contribution.title}
                                </h3>
                                <p className="font-human text-md text-text-secondary mb-4">{contribution.subtitle}</p>

                                {/* Description */}
                                <p className="font-body text-sm text-text-secondary leading-relaxed mb-6">
                                    {contribution.description}
                                </p>

                                {/* Tasks */}
                                <div className="mb-6">
                                    <h4 className="font-body text-xs uppercase tracking-wider text-text-secondary mb-3">
                                        What You Can Do
                                    </h4>
                                    <ul className="space-y-2">
                                        {contribution.tasks.map((task, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm font-body text-text-primary">
                                                <span className="text-primary mt-0.5">✓</span>
                                                {task}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* CTA */}
                                <a
                                    href={contribution.ctaLink}
                                    target={contribution.ctaLink.startsWith('http') ? '_blank' : undefined}
                                    rel={contribution.ctaLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-lg font-body font-medium text-sm text-text-primary hover:border-primary hover:text-primary transition-all duration-300"
                                >
                                    {contribution.cta}
                                    <span>→</span>
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
