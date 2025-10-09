import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"; // shadcn/ui irá criar este
import { Toaster } from "@/components/ui/sonner";
import { AppTour } from "@/components/AppTour"; // Mova este componente para a pasta de componentes
import { Header } from "@/components/Header"; // Crie um componente Header separado
import { Footer } from "@/components/Footer"; // Mova este componente

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["600", "700"],
    variable: "--font-heading",
});

export const metadata: Metadata = {
    title: "Sound Flow Lab – Aprenda Inglês pela Sonoridade",
    description: "Aprenda a falar inglês com fluidez e pronúncia nativa.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <body className={`${inter.variable} ${poppins.variable} font-sans`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="min-h-screen bg-background text-foreground flex flex-col">
                        <AppTour />
                        <Header />
                        <main className="flex-grow">{children}</main>
                        <Footer />
                        <Toaster richColors />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}