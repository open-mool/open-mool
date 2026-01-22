'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, Pause, Play, ArrowRight } from 'lucide-react';
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

    const startUpload = React.useCallback(async (fileToUpload: File) => {
        setStatus('uploading');
        setProgress(0);
        setError('');
        setUploadKey(null);

        try {
            const { data: presigned } = await axios.post(`${API_URL}/upload/presigned`, {
                filename: fileToUpload.name,
                contentType: fileToUpload.type
            });

            await axios.put(presigned.url, fileToUpload, {
                headers: { 'Content-Type': fileToUpload.type },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setProgress(percentCompleted);
                    }
                }
            });

            setUploadKey(presigned.key);
            setStatus('success');
        } catch (err) {
            console.error(err);
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
            console.error(err);
            setError('Multipart upload failed.');
            setStatus('error');
        }
    }, [multipart.startUpload]);

    useEffect(() => {
        if (file && status === 'idle') {
            const fileSizeInMB = file.size / (1024 * 1024);
            const isLarge = fileSizeInMB > 100;
            setIsLargeFile(isLarge);
            if (isLarge) {
                startMultipartUpload(file);
            } else {
                startUpload(file);
            }
        }
    }, [file, status, startUpload, startMultipartUpload]);

    useEffect(() => {
        if (isLargeFile && multipart.isUploading) {
            setProgress(multipart.progress);
        }
    }, [multipart.progress, multipart.isUploading, isLargeFile]);

    const handleSubmit = async () => {
        if (!uploadKey || !metadata.title) return;
        setIsSubmitting(true);
        try {
            await axios.post(`${API_URL}/upload/complete`, {
                key: uploadKey,
                ...metadata
            });
            setSubmissionComplete(true);
        } catch (err) {
            console.error(err);
            alert('Failed to save metadata.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Success State - "Marigold Garland" celebration
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
                        <h2 className="text-3xl font-[family-name:var(--font-eczar)] font-bold text-[var(--text-primary)] mb-3">
                            Story Preserved
                        </h2>
                        <p className="text-[var(--text-secondary)] font-[family-name:var(--font-gotu)]">
                            &quot;{metadata.title}&quot; has been safely archived in The Vault.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Link
                            href="/dashboard/my-uploads"
                            className="w-full py-4 px-6 bg-[var(--accent-primary)] text-white uppercase tracking-widest text-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-3"
                        >
                            View My Archives <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full py-3 px-6 border border-[var(--text-secondary)]/20 text-[var(--text-secondary)] uppercase tracking-widest text-xs font-bold hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors"
                        >
                            Archive Another Story
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] selection:bg-[var(--accent-secondary)]/20">
            {/* The Sutra Line */}
            <div className="sutra-line" />

            <div className="max-w-5xl mx-auto px-8 py-16 md:py-24">
                {/* Header - using brand language */}
                <div className="mb-16">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-primary)] font-bold mb-4 font-[family-name:var(--font-yantramanav)]">
                        The Vault
                    </p>
                    <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-eczar)] font-bold mb-4 tracking-tight">
                        Archive a Story
                    </h1>
                    <p className="text-[var(--text-secondary)] text-lg font-[family-name:var(--font-gotu)] max-w-xl">
                        Preserve audio and video from the Himalayan heritage. Every upload adds to our collective memory.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left: Upload Area */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="bg-[var(--bg-subtle)] p-8 border border-[var(--accent-primary)]/10 shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
                            <h3 className="text-sm uppercase tracking-widest font-bold mb-6 flex items-center gap-3 text-[var(--text-secondary)] font-[family-name:var(--font-yantramanav)]">
                                <Upload className="w-4 h-4" /> Source File
                            </h3>
                            <FileUploader
                                file={file}
                                setFile={setFile}
                                progress={progress}
                                status={status}
                                error={error}
                            />
                        </div>

                        {/* Media Preview */}
                        {file && status === 'success' && (
                            file.type.startsWith('audio') ? (
                                <AudioPreview file={file} />
                            ) : (
                                <VideoPreview file={file} />
                            )
                        )}

                        {/* Upload Tip */}
                        <div className="p-6 bg-[var(--accent-tech)]/5 border-l-2 border-[var(--accent-tech)] text-sm">
                            <p className="font-bold text-[var(--accent-tech)] mb-1 font-[family-name:var(--font-yantramanav)] uppercase tracking-widest text-xs">
                                Preservation Note
                            </p>
                            <p className="text-[var(--text-secondary)] font-[family-name:var(--font-gotu)]">
                                Files are stored directly at the edge. Large files (up to 500MB) are fully supported. Please ensure high-quality recordings.
                            </p>
                        </div>
                    </div>

                    {/* Right: Metadata Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-[var(--bg-subtle)] p-8 lg:p-10 border border-[var(--accent-primary)]/10 shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
                            <h3 className="text-xl font-[family-name:var(--font-eczar)] font-bold mb-8">
                                Story Details
                            </h3>

                            <MetadataForm
                                data={metadata}
                                onChange={setMetadata}
                                disabled={isSubmitting}
                            />

                            {/* Multipart Controls */}
                            {isLargeFile && status === 'uploading' && (
                                <div className="mt-6 flex justify-center gap-3">
                                    {multipart.isUploading ? (
                                        <button
                                            onClick={() => multipart.pauseUpload()}
                                            className="px-4 py-2 bg-[var(--accent-secondary)] text-[var(--text-primary)] text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition"
                                        >
                                            <Pause className="w-4 h-4" /> Pause
                                        </button>
                                    ) : multipart.isPaused ? (
                                        <button
                                            onClick={() => file && multipart.resumeUpload(file)}
                                            className="px-4 py-2 bg-green-500 text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-90 transition"
                                        >
                                            <Play className="w-4 h-4" /> Resume
                                        </button>
                                    ) : null}
                                    <button
                                        onClick={() => multipart.cancelUpload()}
                                        className="px-4 py-2 bg-[var(--accent-primary)] text-white text-xs font-bold uppercase tracking-widest hover:opacity-90 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}

                            <div className="mt-10 pt-8 border-t border-[var(--text-secondary)]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                                {status === 'uploading' && (
                                    <motion.p
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="text-xs text-[var(--text-secondary)] font-[family-name:var(--font-yantramanav)] font-bold uppercase tracking-widest"
                                    >
                                        {isLargeFile ? `Uploading (multipart)... ${Math.round(progress)}%` : `Uploading... ${Math.round(progress)}%`}
                                    </motion.p>
                                )}

                                <button
                                    onClick={handleSubmit}
                                    disabled={!file || status !== 'success' || !metadata.title || isSubmitting}
                                    className={cn(
                                        "px-8 py-4 font-bold uppercase tracking-widest text-sm transition-all flex items-center gap-3",
                                        (!file || status !== 'success' || !metadata.title || isSubmitting)
                                            ? "bg-[var(--bg-canvas)] text-[var(--text-secondary)]/50 cursor-not-allowed border border-[var(--text-secondary)]/10"
                                            : "bg-[var(--accent-primary)] text-white hover:opacity-90 shadow-lg shadow-[var(--accent-primary)]/20"
                                    )}
                                >
                                    {isSubmitting ? (
                                        <>Preserving...</>
                                    ) : status === 'uploading' ? (
                                        <>Wait for Upload...</>
                                    ) : status === 'success' ? (
                                        <>Preserve This Story</>
                                    ) : (
                                        <>Select a File First</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
