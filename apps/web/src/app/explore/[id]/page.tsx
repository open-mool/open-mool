import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin, Tag, Sparkles, Music, Video, Image as ImageIcon } from 'lucide-react';

export const runtime = 'edge';

interface MediaItem {
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

const getMediaType = (key: string): 'audio' | 'video' | 'image' | 'unknown' => {
    const lowerKey = key.toLowerCase();
    if (/(mp3|wav|ogg|m4a)$/.test(lowerKey)) return 'audio';
    if (/(mp4|webm|mov|avi|flv)$/.test(lowerKey)) return 'video';
    if (/(jpg|jpeg|png|webp|gif|avif|heic|heif)$/.test(lowerKey)) return 'image';
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

async function getMediaById(id: string): Promise<MediaItem | null> {
    try {
        const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
        const response = await fetch(`${apiUrl}/api/media/${id}`, {
            next: { revalidate: 0 },
        });

        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error(`Failed to fetch media: ${response.statusText}`);
        }

        const data = await response.json();
        return data.media;
    } catch (error) {
        console.error('Error fetching media item:', error);
        return null;
    }
}

export default async function ArtifactPage({ params }: { params: { id: string } }) {
    const item = await getMediaById(params.id);

    if (!item) {
        return notFound();
    }

    const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
    const mediaUrl = `${apiUrl}/api/media/file/${encodeURIComponent(item.key)}`;
    const mediaType = getMediaType(item.key);

    const deities = parseTags(item.deities);
    const places = parseTags(item.places);
    const botanicals = parseTags(item.botanicals);

    return (
        <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-20">

                {/* Back Navigation */}
                <Link
                    href="/explore"
                    className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors mb-12 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs uppercase tracking-widest font-bold">Back to Archive</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                    {/* Media Viewer Section - Left Column */}
                    <div className="lg:col-span-7 sticky top-24">
                        <div className="relative group">
                            {/* Decorative framing */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-primary)]/20 directly to-transparent opacity-0 group-hover:opacity-100 blur transition-opacity duration-1000"></div>

                            <div className="relative bg-[var(--bg-subtle)] border border-[var(--accent-primary)]/10 rounded-lg p-2 md:p-4 overflow-hidden shadow-xl dark:shadow-2xl">
                                {mediaType === 'image' && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={mediaUrl}
                                        alt={item.title}
                                        className="w-full h-auto object-contain max-h-[70vh] rounded"
                                    />
                                )}

                                {mediaType === 'video' && (
                                    <video controls preload="metadata" className="w-full h-auto max-h-[70vh] rounded bg-black shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
                                        <source src={mediaUrl} />
                                        Your browser does not support the video tag.
                                    </video>
                                )}

                                {mediaType === 'audio' && (
                                    <div className="flex flex-col items-center justify-center p-12 lg:p-24 bg-gradient-to-b from-[var(--bg-subtle)] to-[var(--bg-canvas)] rounded border border-[var(--border-subtle)] relative overflow-hidden">
                                        <div className="absolute w-full h-full inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none dark:opacity-[0.05]"></div>
                                        <Music className="w-24 h-24 text-[var(--accent-primary)]/20 mb-12 animate-pulse" />
                                        <audio controls className="w-full max-w-md z-10 custom-audio drop-shadow-lg">
                                            <source src={mediaUrl} />
                                        </audio>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Metadata Footer below strictly the media */}
                        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-6 text-xs text-[var(--text-secondary)] uppercase tracking-wider font-bold">
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Origin {item.language || 'Unknown'} Language
                            </span>
                            <span>{new Date(item.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    {/* Content Section - Right Column */}
                    <div className="lg:col-span-5 flex flex-col pt-4 md:pt-12">

                        {/* Title and Badge */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold bg-[var(--accent-primary)] text-black rounded-sm shadow-[0_0_15px_rgba(var(--accent-primary-rgb),0.3)]">
                                    Preserved Artifact
                                </span>
                                {mediaType === 'image' && <ImageIcon className="w-4 h-4 text-[var(--text-secondary)]" />}
                                {mediaType === 'video' && <Video className="w-4 h-4 text-[var(--text-secondary)]" />}
                                {mediaType === 'audio' && <Music className="w-4 h-4 text-[var(--text-secondary)]" />}
                            </div>

                            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-[family-name:var(--font-eczar)] font-bold tracking-tight text-[var(--text-primary)] mb-6 leading-[1.1]">
                                {item.title}
                            </h1>
                        </div>

                        {/* Description */}
                        {item.description && (
                            <div className="prose dark:prose-invert prose-p:font-[family-name:var(--font-gotu)] text-[var(--text-secondary)] mb-12 lg:mb-16 text-lg leading-relaxed">
                                <p>{item.description}</p>
                            </div>
                        )}

                        {/* Entity Tags Section */}
                        {(places.length > 0 || deities.length > 0 || botanicals.length > 0) && (
                            <div className="space-y-8 mb-12">
                                <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-[var(--text-secondary)] border-b border-[var(--border-subtle)] pb-4">Extracted Entities</h3>

                                <div className="space-y-6">
                                    {places.length > 0 && (
                                        <div>
                                            <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#60A5FA] mb-3 font-bold">
                                                <MapPin className="w-3 h-3" /> Geographical Context
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {places.map((place, i) => (
                                                    <span key={i} className="px-3 py-1.5 text-xs font-[family-name:var(--font-gotu)] bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800 rounded-md backdrop-blur-sm">
                                                        {place}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {deities.length > 0 && (
                                        <div>
                                            <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#fbbf24] mb-3 font-bold">
                                                <Tag className="w-3 h-3" /> Spiritual Figures
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {deities.map((deity, i) => (
                                                    <span key={i} className="px-3 py-1.5 text-xs font-[family-name:var(--font-gotu)] bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800 rounded-md backdrop-blur-sm">
                                                        {deity}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {botanicals.length > 0 && (
                                        <div>
                                            <h4 className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#34d399] mb-3 font-bold">
                                                <Tag className="w-3 h-3" /> Botanical Life
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {botanicals.map((botanical, i) => (
                                                    <span key={i} className="px-3 py-1.5 text-xs font-[family-name:var(--font-gotu)] bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 rounded-md backdrop-blur-sm">
                                                        {botanical}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Transcription Section */}
                        {item.transcription && (
                            <div className="mt-auto bg-[var(--bg-subtle)] border border-[var(--accent-primary)]/10 rounded-lg p-6 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-primary)]/5 rounded-full blur-3xl group-hover:bg-[var(--accent-primary)]/10 transition-colors duration-1000 -mr-10 -mt-10 pointer-events-none"></div>

                                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--accent-primary)] mb-4">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    Translated & Transcribed
                                </div>
                                <p className="font-[family-name:var(--font-gotu)] text-[var(--text-secondary)] text-sm leading-8 italic border-l-2 border-[var(--accent-primary)]/30 pl-4 py-1">
                                    &quot;{item.transcription}&quot;
                                </p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
