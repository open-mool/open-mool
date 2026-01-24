'use client';

import React, { useState, useEffect, useRef } from 'react';
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionComplete, setSubmissionComplete] = useState(false);

    const multipart = useMultipartUpload();

    const dropzoneRef = useRef<HTMLDivElement>(null);

    const [metadata, setMetadata] = useState<Metadata>({
        title: '',
        description: '',
        language: '',
        location: null
    });

    /* ---------------- Keyboard handling ---------------- */

    const handleDropzoneKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            dropzoneRef.current?.querySelector<HTMLInputElement>('input[type="file"]')?.click();
        }

        if (e.key === 'Escape' && multipart.isUploading) {
            multipart.cancelUpload();
        }
    };

    /* ---------------- Upload logic (unchanged) ---------------- */

    const startUpload = React.useCallback(async (fileToUpload: File) => {
        setStatus('uploading');
        setProgress(0);
        setError('');

        try {
            const { data: presigned } = await axios.post(`${API_URL}/upload/presigned`, {
                filename: fileToUpload.name,
                contentType: fileToUpload.type
            });

            await axios.put(presigned.url, fileToUpload, {
                headers: { 'Content-Type': fileToUpload.type },
                onUploadProgress: (e) => {
                    if (e.total) {
                        setProgress(Math.round((e.loaded * 100) / e.total));
                    }
                }
            });

            setUploadKey(presigned.key);
            setStatus('success');
        } catch {
            setError('Upload failed. Please try again.');
            setStatus('error');
        }
    }, []);

    const startMultipartUpload = React.useCallback(async (fileToUpload: File) => {
        setStatus('uploading');
        try {
            const key = await multipart.startUpload(fileToUpload);
            if (key) {
                setUploadKey(key);
                setStatus('success');
            }
        } catch {
            setError('Multipart upload failed.');
            setStatus('error');
        }
    }, [multipart]);

    useEffect(() => {
        if (!file || status !== 'idle') return;

        const isLarge = file.size / (1024 * 1024) > 100;
        const isLocalDev = process.env.NEXT_PUBLIC_MOCK_LOGIN === 'true';
        setIsLargeFile(isLarge);

        if (isLarge || isLocalDev) startMultipartUpload(file);
        else startUpload(file);
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
        } finally {
            setIsSubmitting(false);
        }
    };

    /* ---------------- Success state unchanged ---------------- */

    if (submissionComplete) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8">
                <div className="max-w-md text-center space-y-6">
                    <CheckCircle className="mx-auto w-16 h-16 text-green-500" />
                    <h2 className="text-2xl font-bold">Story Preserved</h2>
                    <Link href="/dashboard/my-uploads" className="underline">
                        View My Archives
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-8 py-16">
            <h1 className="text-4xl font-bold mb-8">Archive a Story</h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Upload area */}
                <div className="lg:col-span-5">
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
                            error={error}
                        />
                    </div>

                    {file && status === 'success' && (
                        file.type.startsWith('audio')
                            ? <AudioPreview file={file} />
                            : <VideoPreview file={file} />
                    )}
                </div>

                {/* Metadata */}
                <div className="lg:col-span-7">
                    <MetadataForm
                        data={metadata}
                        onChange={setMetadata}
                        disabled={isSubmitting}
                    />

                    <div className="mt-8 flex justify-end">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={!file || status !== 'success' || !metadata.title}
                            className={cn(
                                'px-6 py-3 font-bold focus:outline-none focus:ring-2',
                                (!file || status !== 'success' || !metadata.title)
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'bg-black text-white'
                            )}
                        >
                            Preserve Story
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
