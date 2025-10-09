// Correção (S1128): Unificação das importações e remoção dos ícones não utilizados ('Lightbulb', 'Target').
// Correção (S1874): Substituição do ícone depreciado 'GithubIcon' por 'GitBranch' para representar o repositório de código.
import { GitBranch, Waves, X } from "lucide-react";
import { Link } from "react-router-dom";
export const Footer = () => {
    return (
        <footer className="bg-background border-t border-border/40 mt-auto">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Waves className="w-6 h-6 text-primary" />
                        <span className="font-heading text-lg font-bold">Sound Flow Lab</span>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-x-6 gap-y-2 text-sm text-muted-foreground order-last md:order-none">
                        <p>&copy; {new Date().getFullYear()} Sound Flow Lab.</p>
                        <Link to="/glossary" className="hover:text-primary transition-colors">
                            Glossário
                        </Link>
                        <Link to="/about" className="hover:text-primary transition-colors">
                            Sobre
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <X className="w-5 h-5" />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <GitBranch className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};