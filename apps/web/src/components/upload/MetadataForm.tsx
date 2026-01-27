'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, Type, AlignLeft, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Metadata {
    title: string;
    description: string;
    language: string;
    location: { lat: number; lng: number } | null;
}

interface MetadataFormProps {
    data: Metadata;
    onChange: (data: Metadata) => void;
    disabled?: boolean;
}

const LANGUAGES = [
    "English", "Hindi", "Spanish", "French", "German", "Mandarin", "Japanese", "Arabic", "Russian", "Portuguese"
];

export function MetadataForm({ data, onChange, disabled }: MetadataFormProps) {
    const [loadingLocation, setLoadingLocation] = useState(false);

    const handleChange = (field: keyof Metadata, value: any) => {
        onChange({ ...data, [field]: value });
    };

    const getLocation = () => {
        if (!navigator.geolocation) return;
        setLoadingLocation(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                handleChange('location', {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setLoadingLocation(false);
            },
            (error) => {
                console.error("Location error:", error);
                setLoadingLocation(false);
            }
        );
    };

    return (
        <div className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
                <label 
                    htmlFor="story-title"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"
                >
                    <Type className="w-4 h-4" /> Title
                </label>
                <input
                    id="story-title"
                    type="text"
                    value={data.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    disabled={disabled}
                    placeholder="e.g., Morning Chant in Dharamshala"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />
            </div>

            {/* Description */}
            <div className="space-y-2">
                <label 
                    htmlFor="story-description"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"
                >
                    <AlignLeft className="w-4 h-4" /> Description
                </label>
                <textarea
                    id="story-description"
                    value={data.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    disabled={disabled}
                    rows={3}
                    placeholder="Describe the context, participants, and significance..."
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Language */}
                <div className="space-y-2">
                    <label 
                        htmlFor="story-language"
                        className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"
                    >
                        <Globe className="w-4 h-4" /> Language/Dialect
                    </label>
                    <input
                        id="story-language"
                        list="languages"
                        type="text"
                        value={data.language}
                        onChange={(e) => handleChange('language', e.target.value)}
                        disabled={disabled}
                        placeholder="Select or type..."
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    />
                    <datalist id="languages">
                        {LANGUAGES.map(lang => (
                            <option key={lang} value={lang} />
                        ))}
                    </datalist>
                </div>

                {/* Location */}
                <div className="space-y-2">
                    <label 
                        className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"
                    >
                        <MapPin className="w-4 h-4" /> Location
                    </label>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={getLocation}
                            disabled={disabled || loadingLocation}
                            aria-label={data.location ? "Update current location" : "Use current location"}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 font-medium text-sm transition-all",
                                "hover:bg-slate-50 dark:hover:bg-slate-900 active:scale-[0.98]",
                                "disabled:opacity-50 disabled:cursor-not-allowed",
                                data.location ? "text-blue-600 bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800" : "text-slate-600"
                            )}
                        >
                            {loadingLocation ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
                            {data.location
                                ? `${data.location.lat.toFixed(4)}, ${data.location.lng.toFixed(4)}`
                                : "Use Current Location"
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
