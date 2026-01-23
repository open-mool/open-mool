'use client';

import { motion } from 'framer-motion';

const roles = [
    {
        id: 'scout',
        title: 'Scout',
        hindi: 'खोजी',
        icon: '🎤',
        color: 'border-secondary bg-secondary/5',
        activeColor: 'border-secondary bg-secondary/20',
        description: 'The boots on the ground. Scouts venture into villages to record elders, capture rituals, and document vanishing traditions.',
        responsibilities: [
            'Record audio/video of elders',
            'Document songs, stories & rituals',
            'Add geolocation & context',
            'Upload to the archive',
        ],
        skills: ['Smartphone', 'Local language', 'Patience'],
        karma: '+10 per upload',
    },
    {
        id: 'guardian',
        title: 'Guardian',
        hindi: 'संरक्षक',
        icon: '🛡️',
        color: 'border-primary bg-primary/5',
        activeColor: 'border-primary bg-primary/20',
        description: 'The gatekeepers of authenticity. Guardians verify cultural accuracy, flag errors, and approve content for the permanent archive.',
        responsibilities: [
            'Review pending submissions',
            'Verify cultural accuracy',
            'Improve metadata & tags',
            'Flag inappropriate content',
        ],
        skills: ['Cultural knowledge', 'Attention to detail', 'Research skills'],
        karma: '+25 per verification',
    },
    {
        id: 'archivist',
        title: 'Archivist',
        hindi: 'संग्रहाध्यक्ष',
        icon: '📜',
        color: 'border-tech bg-tech/5',
        activeColor: 'border-tech bg-tech/20',
        description: 'The curators and scholars. Archivists organize collections, write scholarly annotations, and connect the dots across the archive.',
        responsibilities: [
            'Curate themed collections',
            'Write scholarly annotations',
            'Connect related content',
            'Lead research initiatives',
        ],
        skills: ['Academic background', 'Research methodology', 'Writing ability'],
        karma: '+50 per collection',
    },
];

export function RoleCards() {
    return (
        <section className="py-24 px-8 bg-canvas">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Community Roles</span>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-text-primary mt-3">
                        Find Your Role
                    </h2>
                    <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto mt-4">
                        Everyone has a place in the movement. Whether you&apos;re in the field or at a desk,
                        your contribution matters.
                    </p>
                </motion.div>

                {/* Role Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {roles.map((role, index) => (
                        <motion.div
                            key={role.id}
                            className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 bg-white ${role.color} hover:${role.activeColor}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.1)' }}
                        >
                            {/* Icon */}
                            <div className="text-5xl mb-4">{role.icon}</div>

                            {/* Title with Hindi */}
                            <h3 className="font-heading text-2xl font-bold text-text-primary">
                                {role.title}
                            </h3>
                            <p className="font-human text-lg text-text-secondary mb-4">{role.hindi}</p>

                            {/* Description */}
                            <p className="font-body text-sm text-text-secondary leading-relaxed mb-6">
                                {role.description}
                            </p>

                            {/* Responsibilities */}
                            <div className="mb-6">
                                <h4 className="font-body text-xs uppercase tracking-wider text-text-secondary mb-3">
                                    What You&apos;ll Do
                                </h4>
                                <ul className="space-y-2">
                                    {role.responsibilities.map((resp, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm font-body text-text-primary">
                                            <span className="text-primary mt-0.5">•</span>
                                            {resp}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Skills */}
                            <div className="mb-6">
                                <h4 className="font-body text-xs uppercase tracking-wider text-text-secondary mb-3">
                                    Skills Needed
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {role.skills.map((skill, i) => (
                                        <span
                                            key={i}
                                            className="font-mono text-xs px-3 py-1 rounded-full bg-subtle border border-gray-200"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Karma Badge */}
                            <div className="absolute bottom-6 right-6">
                                <span className="font-mono text-xs text-primary bg-primary/10 px-3 py-1 rounded-full">
                                    {role.karma}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Note */}
                <motion.p
                    className="text-center mt-12 font-body text-sm text-text-secondary max-w-xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    💡 <strong>Pro tip:</strong> Everyone starts as a Scout! After 5 verified uploads,
                    you can be promoted to Guardian. Archivists are nominated by the community.
                </motion.p>
            </div>
        </section>
    );
}
