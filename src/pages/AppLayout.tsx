import { Link, Outlet } from "react-router-dom";
import { User, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";

export const AppLayout = () => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <Waves className="w-7 h-7 text-primary" />
                        <span className="font-heading text-xl font-bold">Sound Flow Lab</span>
                    </Link>
                    <nav className="flex items-center gap-2">
                        <Link to="/profile">
                            <Button variant="ghost" size="icon">
                                <User className="w-5 h-5" />
                                <span className="sr-only">Perfil</span>
                            </Button>
                        </Link>

                        <ThemeToggle />
                    </nav>
                </div>
            </header>
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};