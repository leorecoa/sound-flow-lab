import { Waves } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
}

export const Logo = ({ className }: LogoProps) => (
    <div className={cn("flex items-center gap-2", className)}>
        <Waves className="w-8 h-8 text-primary" />
        <span className="font-heading text-2xl font-bold">Sound Flow Lab</span>
    </div>
);