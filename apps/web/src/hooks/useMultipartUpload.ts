'use client';

import { useState, useCallback } from 'react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks

interface UploadPart {
    partNumber: number;
    etag: string;
}

interface UploadState {
    uploadId: string;
    key: string;
    uploadedParts: UploadPart[];
    currentPartNumber: number;
}

export function useMultipartUpload() {
    const [uploadState, setUploadState] = useState<UploadState | null>(null);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const clearState = useCallback(() => {
        localStorage.removeItem('multipart-upload-state');
        setUploadState(null);
    }, []);

    const initiateUpload = useCallback(async (file: File): Promise<{ uploadId: string; key: string }> => {
        const { data } = await axios.post(`${API_URL}/upload/multipart/create`, {
            filename: file.name,
            contentType: file.type,
        });

        const state: UploadState = {
            uploadId: data.uploadId,
            key: data.key,
            uploadedParts: [],
            currentPartNumber: 1,
        };

        setUploadState(state);
        saveState(state);

        return data;
    }, []);

    const startUpload = useCallback(async (file: File) => {
        setIsUploading(true);
        setIsPaused(false);

        try {
            // Check for existing state (resume)
            let state = loadState();

            if (!state) {
                // New upload
                const { uploadId, key } = await initiateUpload(file);
                state = { uploadId, key, uploadedParts: [], currentPartNumber: 1 };
            }

            const totalParts = Math.ceil(file.size / CHUNK_SIZE);

            // Upload remaining parts
            for (let i = state.currentPartNumber; i <= totalParts; i++) {
                if (isPaused) {
                    break;
                }

                const etag = await uploadChunk(file, i, state.uploadId, state.key);
                state.uploadedParts.push({ partNumber: i, etag });
                state.currentPartNumber = i + 1;

                setUploadState({ ...state });
                saveState(state);
                setProgress((i / totalParts) * 100);
            }

            // Complete if all parts uploaded
            if (state.currentPartNumber > totalParts && !isPaused) {
                await completeUpload(state.uploadId, state.key, state.uploadedParts);
                clearState();
                setProgress(100);
                setIsUploading(false);
                return state.key;
            }
        } catch (error) {
            console.error('Upload failed:', error);
            setIsUploading(false);
            throw error;
        }
    }, [isPaused, initiateUpload, clearState]);

    const pauseUpload = useCallback(() => {
        setIsPaused(true);
        setIsUploading(false);
    }, []);

    const resumeUpload = useCallback((file: File) => {
        setIsPaused(false);
        return startUpload(file);
    }, [startUpload]);

    const cancelUpload = useCallback(async () => {
        const state = uploadState || loadState();
        if (state) {
            await abortUpload(state.uploadId, state.key);
            clearState();
        }
        setIsUploading(false);
        setIsPaused(false);
        setProgress(0);
    }, [uploadState, clearState]);

    return {
        startUpload,
        pauseUpload,
        resumeUpload,
        cancelUpload,
        progress,
        isUploading,
        isPaused,
        uploadState,
    };
}

// Helper functions moved outside the hook to keep them stable and lint-free
const saveState = (state: UploadState) => {
    localStorage.setItem('multipart-upload-state', JSON.stringify(state));
};

const loadState = (): UploadState | null => {
    const saved = localStorage.getItem('multipart-upload-state');
    return saved ? JSON.parse(saved) : null;
};

const uploadChunk = async (
    file: File,
    partNumber: number,
    uploadId: string,
    key: string
): Promise<string> => {
    const start = (partNumber - 1) * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, file.size);
    const chunk = file.slice(start, end);

    const { data } = await axios.put(
        `${API_URL}/upload/multipart/${uploadId}/part`,
        chunk,
        {
            headers: {
                'Content-Type': 'application/octet-stream',
            },
            params: { partNumber, key },
        }
    );

    return data.etag;
};

const completeUpload = async (uploadId: string, key: string, parts: UploadPart[]) => {
    await axios.post(`${API_URL}/upload/multipart/${uploadId}/complete`, {
        key,
        parts,
    });
};

const abortUpload = async (uploadId: string, key: string) => {
    await axios.delete(`${API_URL}/upload/multipart/${uploadId}/abort`, {
        data: { key },
    });
};
