import { Waves } from "lucide-react";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "" }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <Waves className="w-8 h-8 text-primary" strokeWidth={2.5} />
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-20 blur-lg" />
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        SoundFlow
      </span>
    </div>
  );
};
