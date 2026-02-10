import Link from 'next/link';

export const runtime = 'edge';

export default function ArtifactPage({ params }: { params: { id: string } }) {
    return (
        <main className="min-h-screen bg-[var(--bg-canvas)] flex flex-col items-center justify-center p-8">
             <div className="max-w-2xl w-full text-center space-y-8">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent-primary)]">
                    Artifact #{params.id}
                </span>
                
                <h1 className="font-[family-name:var(--font-eczar)] text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
                    View Feature Coming Soon
                </h1>
                
                <p className="font-[family-name:var(--font-yantramanav)] text-lg text-[var(--text-secondary)]">
                    We are currently building the immersive viewer for our heritage artifacts. 
                    Check back soon to experience this piece in full detail.
                </p>

                <div className="pt-8">
                    <Link 
                        href="/explore" 
                        className="font-[family-name:var(--font-yantramanav)] text-sm font-bold uppercase tracking-widest text-[var(--text-primary)] border-b border-[var(--accent-primary)] pb-1 hover:text-[var(--accent-primary)] transition-colors"
                    >
                        ← Back to Gallery
                    </Link>
                </div>
             </div>
        </main>
    );
}
