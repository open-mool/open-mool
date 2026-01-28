'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

const phases = [
    {
        id: 'phase1',
        phase: 'चरण १',
        title: 'नींव (Foundation)',
        status: 'completed',
        icon: '✅',
        timeline: 'Dec 2025 - Jan 15, 2026',
        items: [
            'Platform design & branding',
            'Landing page with "Scrollventure"',
            'Auth0 integration & user roles',
            'Upload system with R2 storage',
            'Dashboard with upload history',
        ],
    },
    {
        id: 'phase2',
        phase: 'चरण २',
        title: 'शोधनी (The Refinery)',
        status: 'in-progress',
        icon: '🔄',
        timeline: 'Jan 23 - Feb 10, 2026',
        items: [
            'AI transcription (Whisper)',
            'Auto-tagging & entity extraction',
            'Processing status UI',
            'User-linked media records',
            'Language detection',
        ],
    },
    {
        id: 'phase3',
        phase: 'चरण ३',
        title: 'खोज (Discovery)',
        status: 'upcoming',
        icon: '🔮',
        timeline: 'Feb 10 - Mar 1, 2026',
        items: [
            'Browse gallery & filters',
            'Semantic search (Vectorize)',
            'Global audio/video player',
            'Map view with clustering',
            'Transcript synchronization',
        ],
    },
    {
        id: 'phase4',
        phase: 'चरण ४',
        title: 'समुदाय (Community)',
        status: 'upcoming',
        icon: '🌟',
        timeline: 'Mar 1 - Mar 20, 2026',
        items: [
            'Reputation & karma system',
            'Guardian verification workflow',
            'Leaderboards & badges',
            'Public API for researchers',
            'Embeddable player widget',
        ],
    },
    {
        id: 'phase5',
        phase: 'चरण ५',
        title: 'विकेन्द्रीकरण (Decentralization)',
        status: 'future',
        icon: '🌐',
        timeline: 'Mar 20 - Apr 10, 2026',
        items: [
            '"Mool Nodes" federation',
            'Creative Commons (NC) licensing',
            'IPFS/Arweave backup',
            'Pahadi LLM development',
            'Multi-region resilience',
        ],
    },
];

const statusStyles = {
    completed: 'bg-green-500 border-green-500',
    'in-progress': 'bg-primary border-primary animate-pulse',
    upcoming: 'bg-gray-300 border-gray-300',
    future: 'bg-gray-200 border-gray-200',
};

const cardStyles = {
    completed: 'border-green-200 bg-green-50/50',
    'in-progress': 'border-primary/30 bg-primary/5',
    upcoming: 'border-gray-200 bg-white',
    future: 'border-gray-100 bg-gray-50/50 opacity-75',
};

export function RoadmapTimeline() {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <section className="py-24 px-8 bg-subtle overflow-hidden">
            <div className="max-w-full mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16 max-w-4xl mx-auto px-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Project Roadmap</span>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-text-primary mt-3">
                        The Path Ahead
                    </h2>
                    <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto mt-4">
                        From the first upload to a decentralized cultural archive — here&apos;s where we&apos;re going.
                    </p>
                </motion.div>

                {/* Horizontal Scrolling Timeline */}
                <div className="relative">
                    {/* Scroll Hint Left */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-subtle to-transparent z-10 pointer-events-none md:hidden" />
                    {/* Scroll Hint Right */}
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-subtle to-transparent z-10 pointer-events-none md:hidden" />

                    <div
                        ref={scrollRef}
                        className="overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                    >
                        <div className="flex gap-6 px-8 min-w-max">
                            {phases.map((phase, index) => (
                                <motion.div
                                    key={phase.id}
                                    className={`relative flex-shrink-0 w-72 p-6 rounded-2xl border-2 ${cardStyles[phase.status as keyof typeof cardStyles]}`}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -4 }}
                                >
                                    {/* Timeline Connector */}
                                    {index < phases.length - 1 && (
                                        <div className="absolute top-10 -right-6 w-6 h-0.5 bg-gray-200" />
                                    )}

                                    {/* Status Dot */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-3 h-3 rounded-full ${statusStyles[phase.status as keyof typeof statusStyles]}`} />
                                        <span className="font-mono text-xs text-text-secondary">{phase.timeline}</span>
                                    </div>

                                    {/* Phase Header */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-2xl">{phase.icon}</span>
                                        <div>
                                            <p className="font-mono text-xs text-text-secondary">{phase.phase}</p>
                                            <h3 className="font-heading text-xl font-bold text-text-primary">
                                                {phase.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Items */}
                                    <ul className="mt-4 space-y-2">
                                        {phase.items.map((item, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-2 text-sm font-body text-text-secondary"
                                            >
                                                <span className={phase.status === 'completed' ? 'text-green-500' : 'text-gray-300'}>
                                                    {phase.status === 'completed' ? '✓' : '○'}
                                                </span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Scroll instruction */}
                    <p className="text-center mt-4 font-mono text-xs text-text-secondary/60 md:hidden">
                        ← Swipe to see full roadmap →
                    </p>
                </div>
            </div>
        </section>
    );
}
