'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Example artifacts from real volunteers
const artifacts = [
    {
        volunteer: 'Aditi',
        region: 'Ghamsali',
        type: 'Craft',
        icon: '🧶',
        content: '70-year-old handwoven carpets made by Rongpa trader families.',
        color: 'bg-red-50 border-red-200 text-red-800',
    },
    {
        volunteer: 'Reeta',
        region: 'Garhwal',
        type: 'Clothing',
        icon: '👗',
        content: 'Mother’s traditional clothing and bulaak (nose ring).',
        color: 'bg-orange-50 border-orange-200 text-orange-800',
    },
    {
        volunteer: 'Ayush',
        region: 'Bageshwar',
        type: 'Audio',
        icon: '🎵',
        content: 'Recordings of old Jagaars and folk songs.',
        color: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    },
    {
        volunteer: 'Akshay',
        region: 'Old Tehri',
        type: 'History',
        icon: '🏚️',
        content: 'Photos of life before the town was submerged.',
        color: 'bg-stone-50 border-stone-200 text-stone-800',
    },
    {
        volunteer: 'Deepali',
        region: 'Dharchula',
        type: 'Cuisine',
        icon: '🍲',
        content: 'Traditional winter recipes and their health benefits.',
        color: 'bg-green-50 border-green-200 text-green-800',
    },
    {
        volunteer: 'Neeraj',
        region: 'Munsiyari',
        type: 'Nature',
        icon: '🌿',
        content: 'Indigenous herbs and their medicinal benefits.',
        color: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    },
    {
        volunteer: 'Vanshika',
        region: 'Pithoragarh',
        type: 'Film',
        icon: '🎥',
        content: 'Old films showcasing regional songs and dances.',
        color: 'bg-purple-50 border-purple-200 text-purple-800',
    },
    {
        volunteer: 'Riya',
        region: 'Almora',
        type: 'Architecture',
        icon: '🏛️',
        content: 'Old house structures and traditional vessels.',
        color: 'bg-amber-50 border-amber-200 text-amber-800',
    },
    {
        volunteer: 'Ankit',
        region: 'Village',
        type: 'Craft',
        icon: '🧵',
        content: 'Fabric making from Bhimal plants.',
        color: 'bg-lime-50 border-lime-200 text-lime-800',
    },
];

export function ArtifactShowcase() {
    return (
        <section className="py-24 px-8 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">What You Can Share</span>
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-text-primary mt-3">
                        Every Detail Matters
                    </h2>
                    <p className="font-body text-lg text-text-secondary max-w-3xl mx-auto mt-4">
                        Everything from songs, videos, and letters to heirloom jewelry and indigenous plants.
                        Big or small, your culture is worth safeguarding.
                    </p>
                </motion.div>

                {/* Marquee Row 1 (Left) */}
                <div className="flex overflow-hidden pb-8 relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <motion.div
                        className="flex gap-6 min-w-max"
                        animate={{ x: [0, -1000] }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 40,
                                ease: "linear",
                            },
                        }}
                    >
                        {[...artifacts, ...artifacts].map((item, index) => (
                            <div
                                key={`row1-${index}`}
                                className={`w-80 p-6 rounded-2xl border ${item.color} flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow bg-white/50 backdrop-blur-sm`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-3xl">{item.icon}</span>
                                    <span className="font-mono text-xs uppercase opacity-70 border border-current px-2 py-0.5 rounded-full">
                                        {item.region}
                                    </span>
                                </div>
                                <p className="font-body font-medium text-lg leading-tight mt-1">
                                    &quot;{item.content}&quot;
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
