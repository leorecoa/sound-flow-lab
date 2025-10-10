"use client"; // Este componente usa hooks, então precisa ser um Client Component

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { User, Waves, Settings, LogOut, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "./Logo";

export const Header = () => {
    const { signOut } = useAuth();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container h-16 flex items-center justify-between">
                <Link href="/">
                    <Logo />
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
                            <DropdownMenuItem asChild><Link href="/profile" className="cursor-pointer"><User className="mr-2 h-4 w-4" />Perfil</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/settings" className="cursor-pointer"><Settings className="mr-2 h-4 w-4" />Configurações</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href="/leaderboard" className="cursor-pointer"><Trophy className="mr-2 h-4 w-4" />Leaderboard</Link></DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={signOut} className="cursor-pointer text-red-500 focus:text-red-500"><LogOut className="mr-2 h-4 w-4" />Sair</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <ThemeToggle />
                </nav>
            </div>
        </header>
    );
};