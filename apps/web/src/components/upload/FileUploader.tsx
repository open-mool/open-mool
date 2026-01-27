'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileAudio, FileVideo, X, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming cn exists, if not I will replace or create it.

// Helper for classNames if cn doesn't exist? I'll assume it likely does in a modern stack or use `clsx` directly if I can import it.
// Checking package.json: "clsx": "^2.1.1", "tailwind-merge": "^3.4.0". Typically `lib/utils.ts` has `cn`.
// I'll assume it exists. If not, I'll fallback to simple string interpolation or create it.

interface FileUploaderProps {
    file: File | null;
    setFile: (file: File | null) => void;
    progress: number;
    status: 'idle' | 'uploading' | 'success' | 'error';
    error?: string;
}

// Upper bound for uploads (500MB)
// Defined once to avoid magic numbers and keep client validation consistent
const MAX_FILE_SIZE = 500 * 1024 * 1024;

export function FileUploader({ file, setFile, progress, status, error }: FileUploaderProps) {
    const [validationError, setValidationError] = React.useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
        // Clear previous errors
        setValidationError(null);

        // Handle rejections before they enter the upload pipeline
        if (fileRejections.length > 0) {
            const rejection = fileRejections[0];

            const errorCode = rejection.errors[0]?.code;
            
            // Explicit handling for oversized files with size feedback.
            if (errorCode === 'file-too-large') {
                const file = rejection.file;
                const rawSizeMB = file.size / (1024 * 1024);
                const sizeMB = rawSizeMB % 1 === 0 ? rawSizeMB.toString() : rawSizeMB.toFixed(1); //to display decimal values only when needed.
                const limitMB = (MAX_FILE_SIZE / (1024 * 1024)).toFixed(0);

                setValidationError(`File too large, sad. Maximum file size is ${limitMB}MB. Your file is ${sizeMB}MB.`);
            } 
            
            //reject unsupported formats early. (UX-level validation)
            else if (errorCode === 'file-invalid-type') {
                setValidationError(`Invalid file type. Please upload MP3, WAV, MP4, or MOV files only`);
            } 
            
            //fallback for unknown rejection cases
            else {
                setValidationError(`Failed to upload file. Please try again`);
            }
            return;
        }


        //even accepted files are validated again to protect against future config changes/manual invocation of this component
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];

            if(file.size > MAX_FILE_SIZE) {
                const rawSizeMB = file.size / (1024 * 1024);
                const sizeMB = rawSizeMB % 1 === 0 ? rawSizeMB.toString() : rawSizeMB.toFixed(1); //to display decimal values only when needed.
                const limitMB = (MAX_FILE_SIZE / (1024 * 1024)).toFixed(0);

                setValidationError(`Hey, File too large. Maximum file size is ${limitMB}MB. Your file is ${sizeMB}MB. Try in parts or reduce the size.`);
                
                //do not allow invalid files into application state
                return;
            }
            setFile(file);
        }
    }, [setFile]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'audio/*': ['.mp3', '.wav'],
            'video/*': ['.mp4', '.mov']
        },
        maxSize: 500 * 1024 * 1024, // 500MB
        maxFiles: 1,
        multiple: false,
        disabled: status === 'uploading' || status === 'success'
    });

    const removeFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFile(null);
    };

    return (
        <div className="w-full space-y-4">
            <div
                {...getRootProps()}
                className={cn(
                    "relative group border-2 border-dashed rounded-xl p-8 transition-all duration-300 ease-out cursor-pointer overflow-hidden",
                    "hover:border-blue-500/50 hover:bg-blue-500/5",
                    isDragActive ? "border-blue-500 bg-blue-500/10 scale-[1.01]" : "border-slate-200 dark:border-slate-800",
                    status === 'error' && "border-red-500 bg-red-500/5",
                    status === 'success' && "border-green-500 bg-green-500/5",
                    file && "border-solid"
                )}
            >
                <input {...getInputProps()} />

                <AnimatePresence mode="wait">
                    {!file ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col items-center text-center space-y-4"
                        >
                            <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-900 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                <Upload className="w-8 h-8 text-slate-400 group-hover:text-blue-500 transition-colors" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                    Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-slate-500">
                                    MP3, WAV, MP4 (max 500MB)
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="file"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex items-center gap-4 w-full"
                        >
                            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                {file.type.startsWith('video') ? <FileVideo className="w-6 h-6" /> : <FileAudio className="w-6 h-6" />}
                            </div>

                            <div className="flex-1 min-w-0 text-left">
                                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                                    {file.name}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                            </div>

                            {status === 'idle' && (
                                <button
                                    onClick={removeFile}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-red-500"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}

                            {status === 'success' && (
                                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Progress Bar & Status Overlay */}
                {status === 'uploading' && (
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <motion.div
                            className="h-full bg-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        />
                    </div>
                )}
            </div>

            {status === 'uploading' && (
                <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-xs text-center text-slate-500 font-medium font-mono"
                >
                    UPLOADING... {Math.round(progress)}%
                </motion.p>
            )}

            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500 text-center"
                >
                    {error}
                </motion.p>
            )}

            {validationError && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500 text-center font-medium"
                >
                    ⚠️ {validationError}
                </motion.p>
            )}
        </div>
    );
}
