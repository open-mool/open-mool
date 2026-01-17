import { redirect } from 'next/navigation';
import { auth0 } from '@/lib/auth0';
import Link from 'next/link';

interface Upload {
    id: number;
    title: string;
    description: string | null;
    language: string | null;
    created_at: string;
    processed: boolean;
}

async function fetchMyUploads(): Promise<Upload[]> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787'}/media/my-uploads`, {
            cache: 'no-store',
        });

        if (!response.ok) {
            return [];
        }

        const data = await response.json();
        return data.uploads || [];
    } catch (error) {
        console.error('Failed to fetch uploads:', error);
        return [];
    }
}

export default async function MyUploadsPage() {
    let session = null;
    try {
        session = await auth0.getSession();
    } catch (error) {
        console.error('Session error:', error);
    }

    if (!session?.user) {
        redirect('/auth/login');
    }

    const uploads = await fetchMyUploads();

    return (
        <div className="min-h-screen bg-[var(--bg-canvas)] p-8">
            <header className="mb-8">
                <h1 className="text-4xl font-[family-name:var(--font-eczar)] font-bold mb-2">
                    My Uploads
                </h1>
                <p className="text-[var(--text-secondary)] font-[family-name:var(--font-gotu)]">
                    All your contributions to the archive
                </p>
            </header>

            {uploads.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-24 h-24 rounded-full bg-[var(--bg-subtle)] flex items-center justify-center mb-6">
                        <svg className="w-12 h-12 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-[family-name:var(--font-eczar)] mb-2">No uploads yet</h2>
                    <p className="text-[var(--text-secondary)] mb-6 max-w-md">
                        Start preserving the Himalayan heritage by uploading your first audio or video
                    </p>
                    <Link
                        href="/upload"
                        className="px-6 py-3 bg-[var(--accent-primary)] text-white uppercase tracking-widest text-sm font-bold hover:opacity-90 transition-opacity"
                    >
                        Upload Now
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {uploads.map((upload) => (
                        <div
                            key={upload.id}
                            className="bg-[var(--bg-subtle)] border border-[var(--accent-primary)]/10 p-6 hover:border-[var(--accent-primary)]/30 transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-lg font-[family-name:var(--font-eczar)] font-bold line-clamp-2">
                                    {upload.title}
                                </h3>
                                <span
                                    className={`
                    px-2 py-1 text-xs uppercase tracking-widest font-bold
                    ${upload.processed
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'}
                  `}
                                >
                                    {upload.processed ? 'Published' : 'Processing'}
                                </span>
                            </div>

                            {upload.description && (
                                <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-3">
                                    {upload.description}
                                </p>
                            )}

                            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                                <span className="font-[family-name:var(--font-gotu)]">
                                    {upload.language || 'Unknown'}
                                </span>
                                <span>
                                    {new Date(upload.created_at).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
