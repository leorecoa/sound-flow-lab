import { Link, Outlet } from "react-router-dom";
import { User, Waves, Settings, LogOut, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/theme-toggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppTour } from "@/components/AppTour";
import { useAuth } from "@/contexts/AuthContext";

export const AppLayout = () => {
    const { signOut } = useAuth();

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <AppTour />
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <Waves className="w-7 h-7 text-primary" />
                        <span className="font-heading text-xl font-bold">Sound Flow Lab</span>
                    </Link>
                    <nav className="flex items-center gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild id="user-menu-button">
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <User className="w-5 h-5" />
                                    <span className="sr-only">Abrir menu do usuário</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link to="/profile" className="cursor-pointer"><User className="mr-2 h-4 w-4" />Perfil</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/settings" className="cursor-pointer"><Settings className="mr-2 h-4 w-4" />Configurações</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/leaderboard" className="cursor-pointer"><Trophy className="mr-2 h-4 w-4" />Leaderboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={signOut} className="cursor-pointer text-red-500 focus:text-red-500">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Sair
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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