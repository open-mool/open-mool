'use client';

import React, { useEffect, useRef } from 'react';

interface VideoPreviewProps {
    file: File;
    onRemove?: () => void | Promise<void>;
}

export function VideoPreview({ file }: VideoPreviewProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const url = URL.createObjectURL(file);
        video.src = url;

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [file]);

    return (
        <div className="mt-4 p-4 bg-[var(--bg-subtle)] border border-[var(--accent-primary)]/10 rounded-lg">
            <p className="text-sm text-[var(--text-secondary)] mb-2 font-[family-name:var(--font-gotu)]">
                Video Preview
            </p>
            <video
                ref={videoRef}
                controls
                className="w-full max-h-64 rounded-lg bg-black"
                preload="metadata"
            >
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
