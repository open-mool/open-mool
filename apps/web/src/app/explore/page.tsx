import Link from 'next/link';
import { OracleSearch } from '@/components/search/OracleSearch';

export const runtime = 'edge';

interface ExploreMedia {
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

async function fetchExploreMedia(): Promise<ExploreMedia[] | null> {
    try {
        const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
        const response = await fetch(`${apiUrl}/api/media/explore`, {
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            console.error(`Failed to fetch explore media: ${response.status} ${response.statusText}`);
            return null;
        }

        const data = await response.json();
        return data.media || [];
    } catch (error) {
        console.error('Failed to fetch explore media:', error);
        return null;
    }
}

export default async function ExplorePage() {
    const media = await fetchExploreMedia();
    const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

    return (
        <div className="min-h-screen bg-[var(--bg-canvas)] px-6 md:px-12 py-24">
            <div className="max-w-6xl mx-auto">
                <header className="mb-10 text-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-primary)] font-bold">The Oracle</p>
                    <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-eczar)] font-bold mt-3 mb-4">
                        Discover the Himalayan Archive
                    </h1>
                    <p className="text-[var(--text-secondary)] font-[family-name:var(--font-gotu)] max-w-2xl mx-auto">
                        Ask our semantic engine to find whispers of folklore, ancient rituals, or hidden valleys preserved across the mountains.
                    </p>
                </header>

                <div className="mb-16">
                    <OracleSearch apiUrl={apiUrl} />
                </div>

                <div className="border-t border-[var(--accent-primary)]/10 pt-16">
                    <header className="mb-10">
                        <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-primary)] font-bold">Recent Discoveries</p>
                        <h2 className="text-3xl font-[family-name:var(--font-eczar)] font-bold mt-2">
                            Public Gallery
                        </h2>
                    </header>

                    {media === null ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
                            <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-[family-name:var(--font-eczar)] mb-2 text-red-900">Gallery unavailable</h2>
                        <p className="text-[var(--text-secondary)] mb-6 max-w-md">
                            We could not load the public gallery right now. Please try again soon.
                        </p>
                        <Link
                            href="/explore"
                            className="px-6 py-3 bg-[var(--accent-primary)] text-white uppercase tracking-widest text-sm font-bold hover:opacity-90 transition-opacity inline-block"
                        >
                            Refresh
                        </Link>
                    </div>
                ) : media.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-20 h-20 rounded-full bg-[var(--bg-subtle)] flex items-center justify-center mb-6">
                            <svg className="w-10 h-10 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-[family-name:var(--font-eczar)] mb-2">No public media yet</h2>
                        <p className="text-[var(--text-secondary)] mb-6 max-w-md">
                            The guardians are still curating. Check back soon as new recordings are verified.
                        </p>
                        <Link
                            href="/dashboard/upload"
                            className="px-6 py-3 bg-[var(--accent-primary)] text-white uppercase tracking-widest text-sm font-bold hover:opacity-90 transition-opacity"
                        >
                            Contribute an Upload
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {media.map((item) => {
                            const mediaType = getMediaType(item.key);
                            const deities = parseTags(item.deities);
                            const places = parseTags(item.places);
                            const botanicals = parseTags(item.botanicals);
                            const mediaUrl = `${apiUrl}/api/media/file/${encodeURIComponent(item.key)}`;

                            return (
                                <div
                                    key={item.id}
                                    className="bg-[var(--bg-subtle)] border border-[var(--accent-primary)]/10 p-6 hover:border-[var(--accent-primary)]/30 transition-all"
                                >
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <h3 className="text-lg font-[family-name:var(--font-eczar)] font-bold line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <span className="px-2 py-1 text-xs uppercase tracking-widest font-bold bg-green-100 text-green-800">
                                            Verified
                                        </span>
                                    </div>

                                    {item.description && (
                                        <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-3">
                                            {item.description}
                                        </p>
                                    )}

                                    {mediaType === 'audio' && (
                                        <div className="mb-4">
                                            <audio controls className="w-full">
                                                <source src={mediaUrl} />
                                                Your browser does not support the audio element.
                                            </audio>
                                        </div>
                                    )}

                                    {mediaType === 'video' && (
                                        <div className="mb-4">
                                            <video controls className="w-full rounded-sm">
                                                <source src={mediaUrl} />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    )}

                                    {mediaType === 'unknown' && (
                                        <div className="mb-4 rounded-lg border border-dashed border-[var(--accent-primary)]/30 p-4 text-center text-xs uppercase tracking-[0.3em] text-[var(--text-secondary)]">
                                            Media preview unavailable
                                        </div>
                                    )}

                                    {item.transcription && (
                                        <div className="mb-4">
                                            <span className="text-[10px] uppercase tracking-widest text-[var(--accent-primary)] font-bold block mb-1">
                                                Transcription Snippet
                                            </span>
                                            <p className="text-xs italic text-[var(--text-secondary)] line-clamp-2">
                                                "{item.transcription}"
                                            </p>
                                        </div>
                                    )}

                                    {deities.length > 0 && (
                                        <div className="mb-2">
                                            <span className="text-[10px] uppercase tracking-widest text-amber-600 font-bold block mb-1">
                                                Deities
                                            </span>
                                            <div className="flex flex-wrap gap-1">
                                                {deities.map((d, i) => (
                                                    <span key={`${item.id}-deity-${i}`} className="text-[10px] bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200">
                                                        {d}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {places.length > 0 && (
                                        <div className="mb-2">
                                            <span className="text-[10px] uppercase tracking-widest text-blue-600 font-bold block mb-1">
                                                Places
                                            </span>
                                            <div className="flex flex-wrap gap-1">
                                                {places.map((p, i) => (
                                                    <span key={`${item.id}-place-${i}`} className="text-[10px] bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded border border-blue-200">
                                                        {p}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {botanicals.length > 0 && (
                                        <div className="mb-4">
                                            <span className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold block mb-1">
                                                Botanicals
                                            </span>
                                            <div className="flex flex-wrap gap-1">
                                                {botanicals.map((b, i) => (
                                                    <span key={`${item.id}-botanical-${i}`} className="text-[10px] bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200">
                                                        {b}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                                        <span className="font-[family-name:var(--font-gotu)]">
                                            {item.language || 'Unknown'}
                                        </span>
                                        <span>
                                            {new Date(item.created_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
