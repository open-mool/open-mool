'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const pipelineSteps = [
    {
        id: 'input',
        phase: 'इनपुट (Input)',
        title: 'The Artifact + Context',
        icon: '📦',
        description: 'Every submission has two parts: the raw media artifact AND the volunteer&apos;s explanation providing cultural context.',
        details: [
            {
                label: 'Raw Artifact',
                items: ['Audio recording (.mp3, .wav)', 'Video footage (.mp4, .webm)', 'Photographs (.jpg, .png)'],
            },
            {
                label: 'Volunteer Context',
                items: ['Who is speaking/performing?', 'What is the cultural significance?', 'Where and when was this recorded?', 'What dialect/language is used?'],
            },
        ],
        color: 'border-secondary',
    },
    {
        id: 'listen',
        phase: 'सुनना (Listen)',
        title: 'Audio Processing',
        icon: '👂',
        description: 'AI listens to audio content and converts speech to text with dialect awareness.',
        models: [
            { name: 'Whisper Large v3', provider: 'OpenAI/Cloudflare', use: 'Primary transcription for Hindi, English' },
            { name: 'Whisper Medium', provider: 'Cloudflare Workers AI', use: 'Fast inference at edge' },
            { name: 'Custom Fine-tune', provider: 'Future', use: 'Pahadi dialect specialization' },
        ],
        outputs: ['Raw transcript', 'Timestamps', 'Speaker diarization', 'Confidence scores'],
        color: 'border-tech',
    },
    {
        id: 'watch',
        phase: 'देखना (Watch)',
        title: 'Visual Analysis',
        icon: '👁️',
        description: 'AI analyzes video and image content for visual context and cultural elements.',
        models: [
            { name: 'LLaVA', provider: 'Cloudflare Workers AI', use: 'Image understanding & captioning' },
            { name: 'CLIP', provider: 'OpenAI', use: 'Visual-semantic embeddings' },
            { name: 'Frame Extraction', provider: 'FFmpeg', use: 'Key frame sampling from video' },
        ],
        outputs: ['Scene descriptions', 'Object recognition', 'Cultural artifact identification', 'Face blur (privacy)'],
        color: 'border-primary',
    },
    {
        id: 'understand',
        phase: 'समझना (Understand)',
        title: 'Semantic Enrichment',
        icon: '🧠',
        description: 'LLMs extract entities, translate dialects, and connect content to the knowledge graph.',
        models: [
            { name: 'GPT-4o / Claude', provider: 'OpenAI / Anthropic', use: 'Entity extraction & translation' },
            { name: 'Llama 3.2', provider: 'Cloudflare Workers AI', use: 'Fast inference for tagging' },
            { name: 'text-embedding-3-small', provider: 'OpenAI', use: 'Semantic vector embeddings' },
        ],
        outputs: ['Named entities (people, places, festivals)', 'Auto-generated tags', 'Hindi ↔ English translation', 'Vector embeddings for search'],
        color: 'border-secondary',
    },
    {
        id: 'verify',
        phase: 'सत्यापन (Verify)',
        title: 'Human-in-the-Loop',
        icon: '🛡️',
        description: 'AI suggestions are reviewed and refined by Guardians before entering the permanent archive.',
        humanTasks: [
            'Correct transcription errors',
            'Verify cultural accuracy',
            'Add scholarly annotations',
            'Approve or flag content',
        ],
        color: 'border-gray-400',
    },
];

export function AIPipelineSection() {
    const [activeStep, setActiveStep] = useState<string>('input');

    const currentStep = pipelineSteps.find(s => s.id === activeStep);

    return (
        <section className="py-24 px-8 bg-gradient-to-b from-canvas to-subtle">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-tech">AI Processing Pipeline</span>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-text-primary mt-3">
                        शोधनी — The Refinery
                    </h2>
                    <p className="font-body text-lg text-text-secondary max-w-3xl mx-auto mt-4">
                        Every upload passes through our AI pipeline that <strong>listens</strong>, <strong>watches</strong>,
                        and <strong>understands</strong> — but always with human verification.
                        The artifact and the volunteer&apos;s context work together to preserve meaning.
                    </p>
                </motion.div>

                {/* Pipeline Visualization */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Step Selector (Left) */}
                    <div className="space-y-3">
                        {pipelineSteps.map((step, index) => (
                            <motion.button
                                key={step.id}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${activeStep === step.id
                                    ? `${step.color} bg-white shadow-lg`
                                    : 'border-gray-100 bg-white/50 hover:border-gray-200'
                                    }`}
                                onClick={() => setActiveStep(step.id)}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{step.icon}</span>
                                    <div>
                                        <p className="font-human text-sm text-text-secondary">{step.phase}</p>
                                        <p className="font-heading text-lg font-bold text-text-primary">{step.title}</p>
                                    </div>
                                    {activeStep === step.id && (
                                        <motion.span
                                            className="ml-auto text-primary"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            →
                                        </motion.span>
                                    )}
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Step Details (Right) */}
                    <div className="lg:col-span-2">
                        {currentStep && (
                            <motion.div
                                key={currentStep.id}
                                className={`p-8 rounded-2xl border-2 bg-white ${currentStep.color}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-4xl">{currentStep.icon}</span>
                                    <div>
                                        <p className="font-human text-md text-text-secondary">{currentStep.phase}</p>
                                        <h3 className="font-heading text-2xl font-bold text-text-primary">
                                            {currentStep.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="font-body text-text-secondary leading-relaxed mb-6">
                                    {currentStep.description}
                                </p>

                                {/* Input Step - Details */}
                                {'details' in currentStep && currentStep.details && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {currentStep.details.map((detail, i) => (
                                            <div key={i} className="p-4 rounded-xl bg-subtle">
                                                <h4 className="font-body font-semibold text-text-primary mb-3">
                                                    {detail.label}
                                                </h4>
                                                <ul className="space-y-2">
                                                    {detail.items.map((item, j) => (
                                                        <li key={j} className="flex items-start gap-2 text-sm font-body text-text-secondary">
                                                            <span className="text-primary mt-0.5">•</span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* AI Steps - Models */}
                                {'models' in currentStep && currentStep.models && (
                                    <div className="mb-6">
                                        <h4 className="font-body text-xs uppercase tracking-wider text-text-secondary mb-3">
                                            AI Models Used
                                        </h4>
                                        <div className="space-y-3">
                                            {currentStep.models.map((model, i) => (
                                                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-subtle">
                                                    <div className="flex-1">
                                                        <span className="font-mono text-sm font-semibold text-tech">
                                                            {model.name}
                                                        </span>
                                                        <span className="font-mono text-xs text-text-secondary ml-2">
                                                            ({model.provider})
                                                        </span>
                                                    </div>
                                                    <span className="font-body text-sm text-text-secondary">
                                                        {model.use}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* AI Steps - Outputs */}
                                {'outputs' in currentStep && currentStep.outputs && (
                                    <div>
                                        <h4 className="font-body text-xs uppercase tracking-wider text-text-secondary mb-3">
                                            Outputs Generated
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {currentStep.outputs.map((output, i) => (
                                                <span
                                                    key={i}
                                                    className="font-mono text-xs px-3 py-1.5 rounded-full bg-tech/10 text-tech border border-tech/20"
                                                >
                                                    {output}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Verify Step - Human Tasks */}
                                {'humanTasks' in currentStep && currentStep.humanTasks && (
                                    <div className="p-4 rounded-xl bg-subtle">
                                        <h4 className="font-body font-semibold text-text-primary mb-3">
                                            Guardian Review Tasks
                                        </h4>
                                        <ul className="space-y-2">
                                            {currentStep.humanTasks.map((task, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm font-body text-text-secondary">
                                                    <span className="text-primary mt-0.5">✓</span>
                                                    {task}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Key Insight */}
                <motion.div
                    className="mt-12 p-6 rounded-2xl bg-white border-2 border-secondary/30 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <p className="font-body text-text-secondary">
                        💡 <strong className="text-text-primary">Key Insight:</strong> The volunteer&apos;s explanation is just as important as the media itself.
                        AI helps us <em>scale</em>, but human context gives the archive its <em>soul</em>.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
