'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { CheckCircle, XCircle, Trash2, RefreshCw, Filter } from 'lucide-react';

type MediaItem = {
    id: number;
    key: string;
    title: string;
    description: string | null;
    language: string | null;
    created_at: string;
    processed: number;
    user_id: string | null;
    transcription: string | null;
};

type Filter = 'all' | 'pending' | 'approved';

const getFileType = (key: string): 'audio' | 'video' | 'image' | 'file' => {
    const k = key.toLowerCase();
    if (/(mp3|wav|ogg|m4a|flac|aac)$/.test(k)) return 'audio';
    if (/(mp4|webm|mov|avi|mkv)$/.test(k)) return 'video';
    if (/(jpg|jpeg|png|webp|gif|avif|heic|heif)$/.test(k)) return 'image';
    return 'file';
};

const TYPE_BADGE: Record<string, string> = {
    audio: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    video: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    image: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    file: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/30',
};

export default function AdminPage() {
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<Filter>('all');
    const [page, setPage] = useState(1);
    const [acting, setActing] = useState<number | null>(null);
    const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

    const limit = 50;

    const showToast = (msg: string, ok = true) => {
        setToast({ msg, ok });
        setTimeout(() => setToast(null), 3000);
    };

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/media?filter=${filter}&page=${page}&limit=${limit}`);
            if (!res.ok) throw new Error('Failed to load');
            const data = await res.json();
            setMedia(data.media || []);
            setTotal(data.total || 0);
        } catch {
            showToast('Failed to load media', false);
        } finally {
            setLoading(false);
        }
    }, [filter, page]);

    useEffect(() => { load(); }, [load]);

    const act = async (id: number, action: 'approve' | 'reject' | 'delete') => {
        setActing(id);
        try {
            const method = action === 'delete' ? 'DELETE' : 'PATCH';
            const url = action === 'delete'
                ? `/api/admin/media/${id}/delete`
                : `/api/admin/media/${id}/${action}`;
            const res = await fetch(url, { method });
            if (!res.ok) throw new Error('Action failed');
            showToast(
                action === 'approve' ? 'Approved and published'
                    : action === 'reject' ? 'Returned to pending'
                        : 'Deleted permanently'
            );
            await load();
        } catch {
            showToast('Action failed', false);
        } finally {
            setActing(null);
        }
    };

    const filters: Filter[] = ['all', 'pending', 'approved'];
    const pendingCount = media.filter((m) => !m.processed).length;

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-[family-name:var(--font-yantramanav)]">

            {/* Toast */}
            {toast && (
                <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 text-sm font-bold rounded-md shadow-xl transition-all ${toast.ok ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                    {toast.msg}
                </div>
            )}

            {/* Header bar */}
            <div className="border-b border-zinc-800 px-8 py-5 flex items-center justify-between">
                <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-0.5">Open Mool</p>
                    <h1 className="text-xl font-[family-name:var(--font-eczar)] font-bold text-zinc-100">
                        Admin Console
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    {pendingCount > 0 && (
                        <span className="text-[11px] font-bold px-2.5 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 rounded-sm uppercase tracking-wider">
                            {pendingCount} pending
                        </span>
                    )}
                    <button
                        onClick={load}
                        disabled={loading}
                        className="p-2 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                        title="Refresh"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            <div className="px-8 py-6">
                {/* Filter tabs */}
                <div className="flex items-center gap-1 mb-6">
                    <Filter className="w-3.5 h-3.5 text-zinc-500 mr-2" />
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => { setFilter(f); setPage(1); }}
                            className={`px-4 py-1.5 text-[11px] uppercase tracking-widest font-bold rounded-sm transition-colors border ${filter === f
                                    ? 'bg-zinc-100 text-zinc-900 border-zinc-100'
                                    : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                    <span className="ml-auto text-xs text-zinc-500">{total} total</span>
                </div>

                {/* Table */}
                {loading ? (
                    <div className="space-y-2">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="h-14 rounded bg-zinc-900 animate-pulse" />
                        ))}
                    </div>
                ) : media.length === 0 ? (
                    <div className="py-24 text-center text-zinc-500">
                        <p className="text-lg font-[family-name:var(--font-eczar)] mb-1">Nothing here</p>
                        <p className="text-sm">No media matches this filter.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-md border border-zinc-800">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-zinc-800 bg-zinc-900/60">
                                    <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-zinc-500 font-bold w-12">ID</th>
                                    <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Title</th>
                                    <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-zinc-500 font-bold w-20">Type</th>
                                    <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-zinc-500 font-bold w-24">Language</th>
                                    <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-zinc-500 font-bold w-28">Uploaded</th>
                                    <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-zinc-500 font-bold w-24">Status</th>
                                    <th className="text-right px-4 py-3 text-[10px] uppercase tracking-widest text-zinc-500 font-bold w-32">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/60">
                                {media.map((item) => {
                                    const type = getFileType(item.key);
                                    const isActing = acting === item.id;
                                    return (
                                        <tr
                                            key={item.id}
                                            className={`group transition-colors hover:bg-zinc-900/50 ${isActing ? 'opacity-50 pointer-events-none' : ''}`}
                                        >
                                            <td className="px-4 py-3 text-zinc-500 font-mono text-xs">{item.id}</td>
                                            <td className="px-4 py-3">
                                                <p className="font-bold text-zinc-100 truncate max-w-xs">{item.title}</p>
                                                {item.description && (
                                                    <p className="text-xs text-zinc-500 truncate max-w-xs mt-0.5">{item.description}</p>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border ${TYPE_BADGE[type]}`}>
                                                    {type}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-zinc-400 text-xs font-[family-name:var(--font-gotu)]">
                                                {item.language || '—'}
                                            </td>
                                            <td className="px-4 py-3 text-zinc-400 text-xs font-mono">
                                                {new Date(item.created_at).toLocaleDateString('en-GB', {
                                                    day: '2-digit', month: 'short', year: '2-digit'
                                                })}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.processed ? (
                                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-sm">
                                                        Live
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-amber-500/15 border border-amber-500/30 text-amber-400 rounded-sm">
                                                        Pending
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-end gap-1">
                                                    {!item.processed ? (
                                                        <button
                                                            onClick={() => act(item.id, 'approve')}
                                                            title="Approve — publish to The Oracle"
                                                            className="p-1.5 rounded text-zinc-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                                                        >
                                                            <CheckCircle className="w-4 h-4" />
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => act(item.id, 'reject')}
                                                            title="Unpublish — return to pending"
                                                            className="p-1.5 rounded text-zinc-500 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => {
                                                            if (confirm(`Delete "${item.title}"? This cannot be undone.`)) {
                                                                act(item.id, 'delete');
                                                            }
                                                        }}
                                                        title="Delete permanently"
                                                        className="p-1.5 rounded text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {total > limit && (
                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-xs text-zinc-500">
                            Page {page} of {Math.ceil(total / limit)}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200 transition-colors disabled:opacity-30 disabled:pointer-events-none rounded-sm"
                            >
                                Prev
                            </button>
                            <button
                                onClick={() => setPage((p) => p + 1)}
                                disabled={page >= Math.ceil(total / limit)}
                                className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200 transition-colors disabled:opacity-30 disabled:pointer-events-none rounded-sm"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
