import { useState, useRef, useEffect } from 'react';

export type RecorderStatus = 'idle' | 'recording' | 'stopped' | 'denied';

export const useMediaRecorder = () => {
    const [status, setStatus] = useState<RecorderStatus>('idle');
    const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setStatus('recording');
            setMediaBlobUrl(null);
            audioChunksRef.current = [];

            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };
            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setMediaBlobUrl(audioUrl);
                setStatus('stopped');
                // Stop all tracks on the stream to turn off the mic indicator
                stream.getTracks().forEach(track => track.stop());
            };
            mediaRecorderRef.current.start();
        } catch (err) {
            console.error('Permissão para microfone negada:', err);
            setStatus('denied');
            alert('Você precisa permitir o acesso ao microfone para usar este recurso.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && status === 'recording') {
            mediaRecorderRef.current.stop();
        }
    };

    // Clean up on unmount
    useEffect(() => {
        return () => {
            if (mediaBlobUrl) {
                URL.revokeObjectURL(mediaBlobUrl);
            }
        };
    }, [mediaBlobUrl]);

    return { status, mediaBlobUrl, startRecording, stopRecording };
};