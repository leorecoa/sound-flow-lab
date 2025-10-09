import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

// Correção (S6759): As props do componente foram marcadas como 'readonly' para garantir imutabilidade.
export function ThemeProvider({ children, ...props }: Readonly<ThemeProviderProps>) {
    return (
        <NextThemesProvider {...props}>
            {children}
        </NextThemesProvider>
    );
}