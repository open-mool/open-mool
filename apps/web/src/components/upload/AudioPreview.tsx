'use client';

import React, { useEffect, useRef } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

interface AudioPreviewProps {
    file: File;
    onRemove?: () => void | Promise<void>;
}

export function AudioPreview({ file }: AudioPreviewProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const url = URL.createObjectURL(file);
        audio.src = url;

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [file]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        if (audio) {
            setCurrentTime(audio.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        const audio = audioRef.current;
        if (audio) {
            setDuration(audio.duration);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="mt-4 p-4 bg-[var(--bg-subtle)] border border-[var(--accent-primary)]/10 rounded-lg">
            <div className="flex items-center gap-4">
                <button
                    onClick={togglePlay}
                    className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-[var(--accent-primary)] text-white hover:opacity-90 transition-opacity"
                >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                </button>

                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <Volume2 className="w-4 h-4 text-[var(--text-secondary)]" />
                        <span className="text-sm font-[family-name:var(--font-yantramanav)] text-[var(--text-secondary)]">
                            Preview
                        </span>
                    </div>

                    <div className="w-full bg-[var(--text-secondary)]/20 h-1 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[var(--accent-primary)] transition-all"
                            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                        />
                    </div>

                    <div className="flex justify-between mt-1 text-xs text-[var(--text-secondary)] font-mono">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
            </div>

            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
            />
        </div>
    );
}
