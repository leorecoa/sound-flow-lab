import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Volume2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ExampleCardProps {
  formalPhrase: string;
  connectedPhrase: string;
  translation: string;
  context: string;
  onPlayAudio: () => void;
}

export const ExampleCard = ({ 
  formalPhrase, 
  connectedPhrase, 
  translation, 
  context,
  onPlayAudio 
}: ExampleCardProps) => {
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
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3 flex-1">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Formal:</p>
              <p className="text-lg">{formalPhrase}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Como soa:</p>
              <p className="text-2xl font-medium">
                {highlightConnections(connectedPhrase)}
              </p>
            </div>
          </div>
          <Button 
            size="lg" 
            className="rounded-full w-14 h-14 shadow-lg hover:scale-110 transition-transform"
            onClick={onPlayAudio}
          >
            <Play className="w-6 h-6 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Tradução:</p>
            <p className="text-base">{translation}</p>
          </div>
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            <Badge variant="secondary" className="text-xs">
              {context}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
