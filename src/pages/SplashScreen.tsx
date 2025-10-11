import { Logo } from "@/components/Logo";

interface SplashScreenProps {
    isLoading: boolean;
}

export const SplashScreen = ({ isLoading }: SplashScreenProps) => {
    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ${isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
            <Logo className="animate-pulse-subtle" />
        </div>
    );
};