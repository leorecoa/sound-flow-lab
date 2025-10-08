import { useState, useEffect, useMemo } from 'react';

export const useAudio = (url: string) => {
    const audio = useMemo(() => new Audio(url), [url]);
    const [isPlaying, setIsPlaying] = useState(false);

    const toggle = () => setIsPlaying(!isPlaying);

    useEffect(() => {
        if (isPlaying) {
            audio.play().catch((e) => {
                console.error("Error playing audio:", e);
                setIsPlaying(false);
            });
        } else {
            audio.pause();
        }
    }, [isPlaying, audio]);

    useEffect(() => {
        const handleEnded = () => setIsPlaying(false);
        audio.addEventListener('ended', handleEnded);
        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
    }, [audio]);

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            audio.pause();
        };
    }, [audio]);

    return [isPlaying, toggle] as const;
};