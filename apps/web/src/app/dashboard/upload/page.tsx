'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, Pause, Play, ArrowRight, RotateCcw, X } from 'lucide-react';
import Link from 'next/link';
import { FileUploader } from '@/components/upload/FileUploader';
import { AudioPreview } from '@/components/upload/AudioPreview';
import { VideoPreview } from '@/components/upload/VideoPreview';
import { MetadataForm, Metadata } from '@/components/upload/MetadataForm';
import { useMultipartUpload } from '@/hooks/useMultipartUpload';
import { cn } from '@/lib/utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [progress, setProgress] = useState(0);
    const [uploadKey, setUploadKey] = useState<string | null>(null);
    const [error, setError] = useState<string>('');
    const [isLargeFile, setIsLargeFile] = useState(false);

    const multipart = useMultipartUpload();

    const [metadata, setMetadata] = useState<Metadata>({
        title: '',
        description: '',
        language: '',
        location: null
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionComplete, setSubmissionComplete] = useState(false);

    // 🔑 Keyboard-accessible dropzone support
    const dropzoneRef = React.useRef<HTMLDivElement>(null);

    const handleDropzoneKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            dropzoneRef.current
                ?.querySelector<HTMLInputElement>('input[type="file"]')
                ?.click();
        }

        if (e.key === 'Escape') {
            multipart.cancelUpload();
            setFile(null);
            setStatus('idle');
            setUploadKey(null);
            setError('');
            setProgress(0);
        }
    };

    const startUpload = React.useCallback(async (fileToUpload: File) => {
        setStatus('uploading');
        setProgress(0);
        setError('');
        setUploadKey(null);

        try {
            // Use local proxy to ensure authentication
            const { data: presigned } = await axios.post('/api/upload/presigned', {
                filename: fileToUpload.name,
                contentType: fileToUpload.type
            });

            await axios.put(presigned.url, fileToUpload, {
                headers: { 'Content-Type': fileToUpload.type },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setProgress(percentCompleted);
                    }
                }
            });

            setUploadKey(presigned.key);
            setStatus('success');
        } catch (err) {
            console.error('Upload failed:', err);
            setError('Upload failed. Please try again.');
            setStatus('error');
        }
    }, []);

    const startMultipartUpload = React.useCallback(async (fileToUpload: File) => {
        setStatus('uploading');
        setError('');
        try {
            const key = await multipart.startUpload(fileToUpload);
            if (key) {
                setUploadKey(key);
                setStatus('success');
            }
        } catch (err) {
            console.error('Multipart upload failed:', err);
            setError('Multipart upload failed.');
            setStatus('error');
        }
    }, [multipart.startUpload]);

    const handleRetry = React.useCallback(async () => {
        setStatus('uploading');
        setError('');

        try {
            if (isLargeFile || (process.env.NEXT_PUBLIC_MOCK_LOGIN === 'true')) {
                // Robust retry using hook's internal state if file is missing in UI
                const key = await multipart.resumeUpload(file || undefined);
                if (key) {
                    setUploadKey(key);
                    setStatus('success');
                }
            } else {
                // Regular upload still needs the file in UI state
                if (file) await startUpload(file);
            }
        } catch (err) {
            console.error('Retry failed:', err);
            setError('Retry failed. Please check connection and try again.');
            setStatus('error');
        }
    }, [file, isLargeFile, multipart, startUpload]);

    const handleRemove = React.useCallback(async () => {
        if (multipart.isUploading) {
            await multipart.cancelUpload();
        }
        setFile(null);
        setStatus('idle');
        setProgress(0);
        setUploadKey(null);
        setError('');
        setMetadata({
            title: '',
            description: '',
            language: '',
            location: null
        });
    }, [multipart]);

    useEffect(() => {
        if (file && status === 'idle') {
            const fileSizeInMB = file.size / (1024 * 1024);
            const isLarge = fileSizeInMB > 100;
            const isLocalDev = process.env.NEXT_PUBLIC_MOCK_LOGIN === 'true';

            setIsLargeFile(isLarge);

            // In local dev (mock login), always use multipart because it proxies through the worker.
            // Direct S3 uploads (presigned urls) won't work locally without real credentials.
            if (isLarge || isLocalDev) {
                startMultipartUpload(file);
            } else {
                startUpload(file);
            }
        }
    }, [file, status, startUpload, startMultipartUpload]);

    useEffect(() => {
        if (multipart.isUploading) {
            setProgress(multipart.progress);
        }
    }, [multipart.progress, multipart.isUploading]);

    const handleSubmit = async () => {
        if (!uploadKey || !metadata.title) return;

        setIsSubmitting(true);
        setError(''); // clear previous errors

        try {
            // Use local proxy to inject user ID and API secret
            await axios.post('/api/upload/complete', {
                key: uploadKey,
                ...metadata
            });
            setSubmissionComplete(true);
        } catch (err) {
            console.error('Failed to save metadata:', err);
            setError('Failed to save metadata. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    /* ---------- Success State ---------- */
    if (submissionComplete) {
        return (
            <div className="min-h-screen bg-[var(--bg-canvas)] flex items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-[var(--bg-subtle)] rounded-lg p-12 text-center space-y-8 border border-[var(--accent-primary)]/20 shadow-[0_20px_40px_rgba(0,0,0,0.04)]"
                >
                    <div className="w-24 h-24 bg-[var(--accent-secondary)]/20 rounded-full flex items-center justify-center mx-auto ring-4 ring-[var(--accent-secondary)]/30">
                        <CheckCircle className="w-12 h-12 text-[var(--accent-secondary)]" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-[family-name:var(--font-eczar)] font-bold mb-3">
                            Story Preserved
                        </h2>
                        <p className="text-[var(--text-secondary)]">
                            &quot;{metadata.title}&quot; has been safely archived in The Vault.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Link
                            href="/dashboard/my-uploads"
                            className="w-full py-4 px-6 bg-[var(--accent-primary)] text-white uppercase tracking-widest text-sm font-bold flex items-center justify-center gap-3"
                        >
                            View My Archives <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full py-3 px-6 border border-[var(--text-secondary)]/20 text-[var(--text-secondary)] uppercase tracking-widest text-xs font-bold"
                        >
                            Archive Another Story
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    /* ---------- Main UI ---------- */
    return (
        <div className="min-h-screen bg-[var(--bg-canvas)]">
            <div className="sutra-line" />

            <div className="max-w-5xl mx-auto px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-5 space-y-8">
                        <div className="bg-[var(--bg-subtle)] p-8 border border-[var(--accent-primary)]/10">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-sm uppercase tracking-widest font-bold flex items-center gap-3">
                                    <Upload className="w-4 h-4" /> Source File
                                </h3>
                                {file && (
                                    <button
                                        onClick={handleRemove}
                                        className="p-1.5 rounded-full text-[var(--text-secondary)] hover:bg-[var(--text-secondary)]/10 hover:text-red-500 transition-colors"
                                        title="Remove file"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* ✅ Keyboard-accessible wrapper */}
                            <div
                                ref={dropzoneRef}
                                tabIndex={0}
                                role="button"
                                aria-label="Upload media file"
                                onKeyDown={handleDropzoneKeyDown}
                                className="focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                            >
                                <FileUploader
                                    file={file}
                                    setFile={setFile}
                                    progress={progress}
                                    status={status}
                                    error="" // Handle error display externally for retry support
                                />

                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-between gap-4"
                                    >
                                        <div className="flex items-center gap-3 text-sm text-red-600 dark:text-red-400">
                                            <span className="font-bold">Error:</span> {error}
                                        </div>
                                        <button
                                            onClick={handleRetry}
                                            className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider rounded transition-colors"
                                        >
                                            <RotateCcw className="w-3 h-3" />
                                            Retry
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        {file && status === 'success' &&
                            (file.type.startsWith('audio')
                                ? <AudioPreview file={file} onRemove={handleRemove} />
                                : <VideoPreview file={file} onRemove={handleRemove} />)}
                    </div>

                    <div className="lg:col-span-7">
                        <div className="bg-[var(--bg-subtle)] p-10 border border-[var(--accent-primary)]/10">
                            <MetadataForm
                                data={metadata}
                                onChange={setMetadata}
                                disabled={isSubmitting}
                            />

                            <div className="mt-10 flex justify-end">
                                <button
                                    onClick={handleSubmit}
                                    disabled={!file || status !== 'success' || !metadata.title || isSubmitting}
                                    className={cn(
                                        "px-8 py-4 font-bold uppercase tracking-widest",
                                        isSubmitting
                                            ? "opacity-50 cursor-not-allowed"
                                            : "bg-[var(--accent-primary)] text-white"
                                    )}
                                >
                                    {isSubmitting ? 'Preserving…' : 'Preserve This Story'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
