import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export const SectionHeader = ({ title, subtitle, className }: SectionHeaderProps) => {
    return (
        <div className={cn("text-center mb-12", className)}>
            <h2 className="text-4xl font-bold mb-4">{title}</h2>
            {subtitle && (
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{subtitle}</p>
            )}
        </div>
    );
};