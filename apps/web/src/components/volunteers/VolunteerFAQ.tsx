'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const faqs = [
    {
        question: 'Who owns the data that gets uploaded?',
        answer: 'The content belongs to the community and heritage it represents. The code is MIT licensed (open source), and the cultural content is licensed under Creative Commons Attribution-NonCommercial (CC BY-NC). This ensures it remains free for educational use while preventing commercial exploitation without permission.',
    },
    {
        question: 'Do I need special equipment to be a Scout?',
        answer: 'Nope! A smartphone with a decent microphone is all you need. For video, any modern phone camera works well. We recommend using a quiet environment and holding the phone steady. Our upload system handles compression and optimization automatically.',
    },
    {
        question: 'How do I contribute code to the project?',
        answer: 'Fork the repo on GitHub, pick an issue (look for "good first issue" labels), create a branch, make your changes, and open a Pull Request. We follow conventional commits and have CI checks. The CONTRIBUTING.md file has all the details!',
    },
    {
        question: 'How is content verified for accuracy?',
        answer: 'Each submission goes through a verification pipeline: 1) AI processing for transcription and tagging, 2) Community review by Guardians who check cultural accuracy, 3) Final approval by Archivists for scholarly merit. Only verified content enters the permanent archive.',
    },
    {
        question: 'What languages and dialects are supported?',
        answer: "We prioritize Hindi, English, and Pahadi dialects (Kumaoni, Garhwali, Jaunsari, etc.). Our AI transcription works best with Hindi and English. For dialects, community translators help improve accuracy. We're constantly expanding language support.",
    },
    {
        question: 'Can I use the archive for research or academic work?',
        answer: 'Absolutely! The archive is open for non-commercial research and education under the Creative Commons Attribution-NonCommercial (CC BY-NC) license. We ask that you cite the original contributors and Open Mool. For commercial use, please contact us.',
    },
    {
        question: 'How do I earn Karma points?',
        answer: 'Karma is our reputation system: +10 for each upload, +25 for verifying content as a Guardian, +50 for curating collections as an Archivist. Karma unlocks badges and recognition. After 5 verified uploads, Scouts can be promoted to Guardian.',
    },
    {
        question: 'What happens with my personal data once I upload it?',
        answer: 'The system is built to organize and segregate the data so it becomes easier for others to access. And if you ever feel like taking your contribution back, you can do so at any time. All shared material will only be used for educational and historical purposes.',
    },
    {
        question: 'What if I donʼt have such information to share right now?',
        answer: 'It is completely okay if you donʼt have any information right now. Let this be your sign of encouragement. The next time you visit your village or come across something meaningful, document it and upload it here. This is a collective community effort. We all need to take this initiative together to safeguard our culture.',
    },
    {
        question: 'Can I share my personal thoughts or opinions?',
        answer: 'No, you cannot do that. All information or knowledge shared must remain neutral, factual, and presented exactly as it is. Personal opinions or prejudices are not allowed, as perspectives can differ from person to person. Any form of hate speech, abuse, or discrimination will not be tolerated. If found, the account will be permanently banned.',
    },
];

export function VolunteerFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 px-8 bg-canvas">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-tech">Common Questions</span>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-text-primary mt-3">
                        FAQ
                    </h2>
                    <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto mt-4">
                        Got questions? We&apos;ve got answers.
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            className="border border-gray-200 rounded-xl overflow-hidden bg-white"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <button
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-subtle/50 transition-colors"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="font-body font-semibold text-text-primary pr-4">
                                    {faq.question}
                                </span>
                                <motion.span
                                    className="flex-shrink-0 text-primary text-xl"
                                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    +
                                </motion.span>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-5 font-body text-text-secondary leading-relaxed border-t border-gray-100 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* More Questions */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <p className="font-body text-text-secondary">
                        Still have questions?{' '}
                        <a
                            href="https://github.com/open-mool/open-mool/discussions"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            Ask on GitHub Discussions →
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
