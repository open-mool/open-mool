'use client';

import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Loader2, X, Play, Music, Video, MapPin, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MediaResult {
    id: number;
    key: string;
    title: string;
    description: string | null;
    language: string | null;
    created_at: string;
    processed: boolean;
    transcription: string | null;
    deities: string | null;
    places: string | null;
    botanicals: string | null;
}

interface OracleSearchProps {
    apiUrl: string;
}

export const OracleSearch: React.FC<OracleSearchProps> = ({ apiUrl }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<MediaResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setError(null);
        setHasSearched(true);

        try {
            const response = await fetch(`${apiUrl}/api/media/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error('Search failed. Please try again.');
            }
            const data = await response.json();
            setResults(data.results || []);
        } catch (err) {
            console.error('Search error:', err);
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const clearSearch = () => {
        setQuery('');
        setResults([]);
        setHasSearched(false);
        setError(null);
    };

    const getMediaType = (key: string): 'audio' | 'video' | 'unknown' => {
        const lowerKey = key.toLowerCase();
        if (/(mp3|wav|ogg|m4a)$/.test(lowerKey)) return 'audio';
        if (/(mp4|webm|mov|avi|flv)$/.test(lowerKey)) return 'video';
        return 'unknown';
    };

    const parseTags = (raw: string | null): string[] => {
        if (!raw) return [];
        try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    };

    return (
        <div className="w-full space-y-8">
            <div className="relative max-w-2xl mx-auto">
                <form onSubmit={handleSearch} className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 text-[var(--accent-primary)] animate-spin" />
                        ) : (
                            <Search className="w-5 h-5 text-[var(--text-secondary)] group-focus-within:text-[var(--accent-primary)] transition-colors" />
                        )}
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ask the Oracle... (e.g., 'folklore about mountains' or 'rituals in Spiti')"
                        className="w-full pl-12 pr-12 py-4 bg-[var(--bg-subtle)] border border-[var(--accent-primary)]/20 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/30 focus:border-[var(--accent-primary)] transition-all font-[family-name:var(--font-gotu)]"
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center gap-2">
                        {query && !isLoading && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="p-1 hover:bg-black/5 rounded-full transition-colors"
                            >
                                <X className="w-4 h-4 text-[var(--text-secondary)]" />
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={isLoading || !query.trim()}
                            className="flex items-center gap-1 px-4 py-1.5 bg-[var(--accent-primary)] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition-all"
                        >
                            <Sparkles className="w-3 h-3" />
                            <span>Ask</span>
                        </button>
                    </div>
                </form>
                
                <div className="mt-3 flex flex-wrap gap-2 justify-center">
                    {['Mountain Spirits', 'Harvest Rituals', 'Spiti Dialect', 'Medicinal Plants'].map((suggestion) => (
                        <button
                            key={suggestion}
                            onClick={() => {
                                setQuery(suggestion);
                                // Trigger search immediately
                                setTimeout(() => handleSearch(), 0);
                            }}
                            className="text-[10px] uppercase tracking-widest px-3 py-1 bg-[var(--bg-subtle)] border border-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)]/40 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                    >
                        <div className="w-16 h-16 border-4 border-[var(--accent-primary)]/20 border-t-[var(--accent-primary)] rounded-full animate-spin mb-4"></div>
                        <p className="text-[var(--text-secondary)] font-[family-name:var(--font-gotu)] animate-pulse">
                            Consulting the archives...
                        </p>
                    </motion.div>
                )}

                {!isLoading && error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-red-50 border border-red-200 rounded-lg text-center"
                    >
                        <p className="text-red-800 text-sm font-bold uppercase tracking-widest mb-2">Oracle Error</p>
                        <p className="text-red-600 text-[family-name:var(--font-gotu)]">{error}</p>
                    </motion.div>
                )}

                {!isLoading && hasSearched && results.length === 0 && !error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <div className="w-16 h-16 bg-[var(--bg-subtle)] rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-[var(--text-secondary)]" />
                        </div>
                        <h3 className="text-xl font-[family-name:var(--font-eczar)] font-bold mb-2">No echoes found</h3>
                        <p className="text-[var(--text-secondary)] font-[family-name:var(--font-gotu)] max-w-md mx-auto">
                            The Oracle could not find any records matching your query. Try different keywords or browse the gallery.
                        </p>
                    </motion.div>
                )}

                {!isLoading && results.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {results.map((item, index) => {
                            const mediaType = getMediaType(item.key);
                            const deities = parseTags(item.deities);
                            const places = parseTags(item.places);
                            const botanicals = parseTags(item.botanicals);
                            const mediaUrl = `${apiUrl}/api/media/file/${encodeURIComponent(item.key)}`;

                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-[var(--bg-subtle)] border border-[var(--accent-primary)]/10 p-6 hover:border-[var(--accent-primary)]/30 transition-all group flex flex-col h-full"
                                >
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <h3 className="text-lg font-[family-name:var(--font-eczar)] font-bold line-clamp-2 group-hover:text-[var(--accent-primary)] transition-colors">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center">
                                            {mediaType === 'audio' ? (
                                                <Music className="w-4 h-4 text-amber-600" />
                                            ) : (
                                                <Video className="w-4 h-4 text-blue-600" />
                                            )}
                                        </div>
                                    </div>

                                    {item.description && (
                                        <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-3 font-[family-name:var(--font-gotu)]">
                                            {item.description}
                                        </p>
                                    )}

                                    <div className="mt-auto space-y-4">
                                        {mediaType === 'audio' && (
                                            <div className="bg-white/50 dark:bg-black/20 rounded-lg p-2">
                                                <audio controls className="w-full h-8">
                                                    <source src={mediaUrl} />
                                                </audio>
                                            </div>
                                        )}

                                        {mediaType === 'video' && (
                                            <div className="relative aspect-video bg-black rounded overflow-hidden">
                                                <video controls className="w-full h-full">
                                                    <source src={mediaUrl} />
                                                </video>
                                            </div>
                                        )}

                                        {item.transcription && (
                                            <div className="p-3 bg-white/30 dark:bg-black/10 rounded border border-[var(--accent-primary)]/5">
                                                <span className="text-[9px] uppercase tracking-widest text-[var(--accent-primary)] font-bold block mb-1 flex items-center gap-1">
                                                    <Sparkles className="w-2.5 h-2.5" /> Transcription
                                                </span>
                                                <p className="text-xs italic text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                                                    "{item.transcription}"
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex flex-wrap gap-1.5">
                                            {places.map((p, i) => (
                                                <span key={i} className="flex items-center gap-0.5 text-[9px] uppercase tracking-wider bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full border border-blue-100 dark:border-blue-800">
                                                    <MapPin className="w-2.5 h-2.5" /> {p}
                                                </span>
                                            ))}
                                            {deities.map((d, i) => (
                                                <span key={i} className="flex items-center gap-0.5 text-[9px] uppercase tracking-wider bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full border border-amber-100 dark:border-amber-800">
                                                    <Tag className="w-2.5 h-2.5" /> {d}
                                                </span>
                                            ))}
                                            {botanicals.map((b, i) => (
                                                <span key={i} className="flex items-center gap-0.5 text-[9px] uppercase tracking-wider bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-800">
                                                    <Tag className="w-2.5 h-2.5" /> {b}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="pt-4 border-t border-[var(--accent-primary)]/5 flex items-center justify-between text-[10px] text-[var(--text-secondary)] uppercase tracking-widest font-bold">
                                            <span>{item.language || 'Unknown Language'}</span>
                                            <span>{new Date(item.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
