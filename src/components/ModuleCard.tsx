import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgress } from "@/components/ui/circular-progress";
import { type LucideIcon, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  progress: number;
  moduleId: string;
  color: string;
}

export const ModuleCard = ({ title, description, icon: Icon, progress, moduleId, color }: ModuleCardProps) => {
  const isCompleted = progress === 100;

  return (
    <Link to={`/module/${moduleId}`}>
      <Card className="group hover:scale-[1.02] hover:shadow-[var(--shadow-hover)] transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 h-full relative overflow-hidden">
        {isCompleted && (
          <div className="absolute top-4 right-4 z-10">
            <CheckCircle2 className="w-6 h-6 text-success fill-background" />
          </div>
        )}
        <CardHeader>
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300`}>
            <Icon className="w-9 h-9 text-white" />
          </div>
          <CardTitle className="text-xl font-medium">{title}</CardTitle>
          <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">Progresso</span>
              <span className="text-xs text-muted-foreground">
                {isCompleted ? "Completo!" : `${progress}% concluído`}
              </span>
            </div>
            <CircularProgress value={progress} size={64} strokeWidth={4} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
