import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Volume2, Play, Pause } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { useAudio } from "@/hooks/useAudio";

interface ExampleCardProps {
  formalPhrase: string;
  connectedPhrase: string;
  translation: string;
  context: string;
  audioUrl?: string;
}

export const ExampleCard = ({
  formalPhrase,
  connectedPhrase,
  translation,
  context,
  audioUrl = ""
}: ExampleCardProps) => {
  const [isPlaying, toggleAudio] = useAudio(audioUrl);

  // Function to highlight connections in the phrase
  const highlightConnections = (phrase: string) => {
    return phrase.split('_').map((part, index, array) => (
      <span key={index}>
        <span className="font-bold text-accent">{part}</span>
        {index < array.length - 1 && <span className="text-accent">‿</span>}
      </span>
    ));
  };

  return (
    <Card className="overflow-hidden border-2 hover:border-primary/30 transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 pb-4">
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Formal:</p>
            <p className="text-lg">{formalPhrase}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Como soa:</p>
            <p className="text-2xl font-medium animate-pulse-subtle">
              {highlightConnections(connectedPhrase)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Tradução:</p>
          <p className="text-base">{translation}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            <Badge variant="secondary" className="text-xs">
              {context}
            </Badge>
          </div>
          {audioUrl && (
            <Button onClick={toggleAudio} size="icon" className="rounded-full w-12 h-12 shrink-0">
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span className="sr-only">Tocar áudio</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
