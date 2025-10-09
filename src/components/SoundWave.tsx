import { cn } from "@/lib/utils";

interface SoundWaveProps {
    className?: string;
}

export const SoundWave = ({ className }: SoundWaveProps) => {
    return (
        <div className={cn("flex items-center justify-center gap-1 h-6", className)}>
            <div className="w-1 h-full bg-primary rounded-full animate-wave" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1 h-full bg-primary rounded-full animate-wave" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1 h-full bg-primary rounded-full animate-wave" style={{ animationDelay: '0.3s' }}></div>
            <div className="w-1 h-full bg-primary rounded-full animate-wave" style={{ animationDelay: '0.4s' }}></div>
        </div>
    );
};