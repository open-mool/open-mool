import Link from 'next/link';
import { MoolDefinition } from "@/components/landing/MoolDefinition";

export const runtime = 'edge';

interface Artifact {
    id: number;
    title: string;
    description: string | null;
    language: string | null;
    created_at: string;
    type?: 'audio' | 'video' | 'image';
    region?: string;
}

// Fallback mock data to ensure the gallery looks good during development
const MOCK_ARTIFACTS: Artifact[] = [
    {
        id: 101,
        title: "Jagar of the Rain God",
        description: "A 15-minute recording of the invocation ceremony performed in Kumaon during the monsoon delay. The drummer uses a specific rhythm known as 'Ghangali'.",
        language: "Kumaoni",
        created_at: new Date().toISOString(),
        type: 'audio',
        region: 'Almora'
    },
    {
        id: 102,
        title: "Traditional Aipan Patterns",
        description: "Photographs of doorstep art created during Diwali. Shows the specific geometric patterns used by the Shah family for generations.",
        language: "N/A",
        created_at: new Date(Date.now() - 86400000).toISOString(),
        type: 'image',
        region: 'Nainital'
    },
    {
        id: 103,
        title: "Oral History: The Chipko Movement",
        description: "Interview with an elder who participated in the 1973 protests. She details the songs they sang while hugging the trees.",
        language: "Garhwali",
        created_at: new Date(Date.now() - 172800000).toISOString(),
        type: 'audio',
        region: 'Chamoli'
    },
    {
        id: 104,
        title: "Rongpa Wedding Songs",
        description: "Collection of ceremonial songs sung during the departure of the bride. These songs map the geography of the trade routes.",
        language: "Rongpa",
        created_at: new Date(Date.now() - 259200000).toISOString(),
        type: 'video',
        region: 'Pithoragarh'
    },
    {
        id: 105,
        title: "Medicinal Herbs of Valley of Flowers",
        description: "Documentation of local names and uses for 50+ alpine species, narrated by a local shepherd.",
        language: "Hindi/Garhwali",
        created_at: new Date(Date.now() - 345600000).toISOString(),
        type: 'image',
        region: 'Chamoli'
    }
];

async function getPublicArtifacts(): Promise<Artifact[]> {
    try {
        // In the future, this should point to a dedicated public feed endpoint
        // For now, we reuse the existing endpoint or fall back to mock data
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
        const res = await fetch(`${apiUrl}/media/my-uploads`, { 
            next: { revalidate: 60 },
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (!res.ok) throw new Error('Failed to fetch');
        
        const data = await res.json();
        
        // If DB is empty, return mocks so the page isn't sad
        if (!data.uploads || data.uploads.length === 0) {
            return MOCK_ARTIFACTS;
        }

        return data.uploads;
    } catch (e) {
        console.error("Error fetching artifacts:", e);
        return MOCK_ARTIFACTS;
    }
}

export default async function ExplorePage() {
    const artifacts = await getPublicArtifacts();

    return (
        <main className="min-h-screen bg-[var(--bg-canvas)]">
            {/* Header Spacer */}
            <div className="h-24"></div>

            {/* Hero / Title Section */}
            <section className="px-6 md:px-12 mb-16">
                <div className="max-w-7xl mx-auto">
                    <span className="font-[family-name:var(--font-yantramanav)] text-[var(--accent-primary)] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                        The Public Archive
                    </span>
                    <h1 className="font-[family-name:var(--font-eczar)] text-5xl md:text-7xl font-bold text-[var(--text-primary)] mb-6 leading-[0.9]">
                        Explore the <br />
                        <span className="italic font-light text-[var(--text-secondary)]">Living Heritage.</span>
                    </h1>
                    <p className="font-[family-name:var(--font-yantramanav)] text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                        Discover the songs, stories, and wisdom of the Himalayas, preserved by the community, for the future.
                    </p>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="px-6 md:px-12 pb-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {artifacts.map((item) => (
                            <Link href={`/artifact/${item.id}`} key={item.id} className="group block h-full">
                                <article className="bg-white/50 backdrop-blur-sm border border-[var(--text-primary)]/10 p-8 h-full rounded-lg transition-all duration-300 hover:border-[var(--accent-primary)]/40 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--bg-subtle)] text-lg">
                                                {item.type === 'audio' ? '🎵' : item.type === 'video' ? '🎥' : item.type === 'image' ? '🖼️' : '📄'}
                                            </span>
                                            {item.region && (
                                                <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] border border-[var(--text-primary)]/20 px-2 py-1 rounded-full">
                                                    {item.region}
                                                </span>
                                            )}
                                        </div>
                                        
                                        <h3 className="font-[family-name:var(--font-eczar)] text-2xl font-bold text-[var(--text-primary)] mb-3 leading-tight group-hover:text-[var(--accent-primary)] transition-colors">
                                            {item.title}
                                        </h3>
                                        
                                        <p className="font-[family-name:var(--font-yantramanav)] text-[var(--text-secondary)] text-sm leading-relaxed mb-6 line-clamp-3">
                                            {item.description || "No description provided."}
                                        </p>
                                    </div>

                                    <div className="pt-6 border-t border-[var(--text-primary)]/5 flex items-center justify-between text-xs font-[family-name:var(--font-yantramanav)] uppercase tracking-wider text-[var(--text-secondary)]">
                                        <span>{item.language || "Unknown Language"}</span>
                                        <span>
                                            {new Date(item.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer Callout */}
            <section className="px-6 md:px-12 pb-24 border-t border-[var(--text-primary)]/10 pt-24">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="font-[family-name:var(--font-eczar)] text-3xl font-bold">
                        Have something to contribute?
                    </h2>
                    <p className="text-[var(--text-secondary)]">
                        Your memories are the source code of our future.
                    </p>
                    <div className="flex justify-center">
                        <Link 
                            href="/dashboard/upload" 
                            className="px-8 py-4 bg-[var(--accent-primary)] text-white font-[family-name:var(--font-yantramanav)] uppercase tracking-[0.2em] text-xs font-bold rounded-sm hover:opacity-90 transition-opacity"
                        >
                            Contribute to the Archive
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
