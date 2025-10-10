import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";

interface SplashScreenProps {
    isLoading: boolean;
}

export const SplashScreen = ({ isLoading }: SplashScreenProps) => {
    useEffect(() => {
        if (isLoading) {
            // Crie uma pasta 'public/sounds' e coloque seu arquivo de som lá.
            const startupSound = new Audio("/sounds/startup.mp3");
            startupSound.play().catch(error => {
                // O erro de autoplay é comum em navegadores modernos, o som pode não tocar até a primeira interação do usuário.
                console.warn("Startup sound was blocked by the browser:", error);
            });
        }
    }, [isLoading]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    {/* Fundo com gradiente suave */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background -z-10"></div>

                    {/* Logo com animação de pulso */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            delay: 0.2,
                        }}
                    >
                        <Logo className="text-4xl" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};