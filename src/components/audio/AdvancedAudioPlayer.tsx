import { Play, Pause, Volume2, VolumeX, Repeat, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { WaveformVisualizer } from "./WaveformVisualizer";
import { cn } from "@/lib/utils";

interface AdvancedAudioPlayerProps {
  audioUrl: string;
  className?: string;
  showWaveform?: boolean;
}

const formatTime = (seconds: number): string => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const AdvancedAudioPlayer = ({ audioUrl, className, showWaveform = true }: AdvancedAudioPlayerProps) => {
  const {
    isPlaying,
    isLoading,
    currentTime,
    duration,
    volume,
    playbackRate,
    isLooping,
    togglePlayPause,
    seek,
    setVolume,
    setPlaybackRate,
    toggleLoop,
    audioRef,
  } = useAudioPlayer(audioUrl);

  const playbackRates = [0.75, 1, 1.25];

  return (
    <div className={cn("flex flex-col gap-4 p-4 bg-card rounded-lg border", className)}>
      {/* Waveform Visualizer */}
      {showWaveform && audioRef.current && (
        <WaveformVisualizer audioRef={audioRef} isPlaying={isPlaying} />
      )}

      {/* Progress Bar */}
      <div className="space-y-2">
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={0.1}
          onValueChange={([value]) => seek(value)}
          className="cursor-pointer"
          disabled={isLoading}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        {/* Play/Pause Button */}
        <div className="flex items-center gap-2">
          <Button
            size="lg"
            onClick={togglePlayPause}
            disabled={isLoading}
            className="rounded-full w-12 h-12"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </Button>

          {/* Loop Button */}
          <Button
            size="icon"
            variant={isLooping ? "default" : "outline"}
            onClick={toggleLoop}
            className="rounded-full"
          >
            <Repeat className="w-4 h-4" />
          </Button>
        </div>

        {/* Playback Speed */}
        <div className="flex items-center gap-1">
          {playbackRates.map((rate) => (
            <Button
              key={rate}
              size="sm"
              variant={playbackRate === rate ? "default" : "ghost"}
              onClick={() => setPlaybackRate(rate)}
              className="text-xs px-2"
            >
              {rate}x
            </Button>
          ))}
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 min-w-[120px]">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setVolume(volume === 0 ? 1 : 0)}
            className="shrink-0"
          >
            {volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>
          <Slider
            value={[volume * 100]}
            max={100}
            step={1}
            onValueChange={([value]) => setVolume(value / 100)}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};
