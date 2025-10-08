import { ModuleCard } from "@/components/ModuleCard";
import { Button } from "@/components/ui/button";
import { Link2, MessageSquare, Zap, Volume2 } from "lucide-react";

const modules = [
  {
    id: "1",
    title: "Consoante + Vogal",
    description: "Aprenda como consoantes se conectam com vogais na fala natural",
    icon: Link2,
    progress: 0,
    color: "from-primary to-primary/80"
  },
  {
    id: "2",
    title: "Consoante + Consoante",
    description: "Domine as conexões entre consoantes consecutivas",
    icon: MessageSquare,
    progress: 0,
    color: "from-accent to-accent/80"
  },
  {
    id: "3",
    title: "Vogal + Vogal",
    description: "Entenda como vogais se fundem no inglês falado",
    icon: Zap,
    progress: 0,
    color: "from-success to-success/80"
  },
  {
    id: "4",
    title: "Reduções",
    description: "Aprenda as reduções mais comuns do inglês nativo",
    icon: Volume2,
    progress: 0,
    color: "from-primary to-accent"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-4">
              <span className="text-sm font-semibold text-accent">🎯 Domine o Inglês Natural</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                Sound Connections
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Aprenda a entender e falar inglês como um nativo através das conexões sonoras (connected speech)
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="text-lg h-14 px-8 shadow-lg hover:shadow-xl transition-all">
                Começar Agora
                <Zap className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg h-14 px-8">
                Saber Mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center space-y-3 p-6 rounded-2xl bg-card border-2 hover:border-primary/30 transition-all">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
              <Volume2 className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Áudio Nativo</h3>
            <p className="text-muted-foreground">Exemplos com pronúncia de falantes nativos</p>
          </div>
          
          <div className="text-center space-y-3 p-6 rounded-2xl bg-card border-2 hover:border-primary/30 transition-all">
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto">
              <MessageSquare className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">Contexto Real</h3>
            <p className="text-muted-foreground">Aprenda com situações do dia a dia</p>
          </div>
          
          <div className="text-center space-y-3 p-6 rounded-2xl bg-card border-2 hover:border-primary/30 transition-all">
            <div className="w-14 h-14 bg-success/10 rounded-2xl flex items-center justify-center mx-auto">
              <Zap className="w-7 h-7 text-success" />
            </div>
            <h3 className="text-xl font-semibold">Prática Interativa</h3>
            <p className="text-muted-foreground">Exercícios e feedback imediato</p>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Os 4 Pilares do Connected Speech</h2>
            <p className="text-xl text-muted-foreground">
              Comece sua jornada através dos módulos progressivos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {modules.map((module) => (
              <ModuleCard key={module.id} {...module} moduleId={module.id} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary to-accent p-12 rounded-3xl text-center text-white shadow-2xl">
            <h2 className="text-4xl font-bold mb-4">Pronto para soar como um nativo?</h2>
            <p className="text-xl mb-8 text-white/90">
              Comece agora e transforme sua compreensão do inglês falado
            </p>
            <Button size="lg" variant="secondary" className="h-14 px-8 text-lg shadow-lg hover:scale-105 transition-transform">
              Iniciar Primeira Lição
              <Zap className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
