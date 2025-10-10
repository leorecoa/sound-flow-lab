import { useState, useEffect } from "react";
import { ModuleCard } from "@/components/ModuleCard";
import { Button } from "@/components/ui/button";
import { ModuleCardSkeleton } from "@/components/ModuleCardSkeleton";
import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/SectionHeader";
import { Link2, MessageSquare, Zap, Volume2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const testimonials = [
  {
    name: "Juliana S.",
    role: "Desenvolvedora de Software",
    avatar: "https://github.com/shadcn.png", // Placeholder
    quote: "O Sound Flow Lab mudou completamente minha confiança ao falar inglês. Finalmente entendo por que os nativos falam tão rápido!"
  },
  {
    name: "Marcos P.",
    role: "Estudante de Intercâmbio",
    avatar: "https://github.com/shadcn.png", // Placeholder
    quote: "Essencial para quem vai viajar. As lições sobre 'connected speech' são algo que nenhuma outra escola ensina de forma tão clara."
  },
  {
    name: "Carla M.",
    role: "Gerente de Projetos",
    avatar: "https://github.com/shadcn.png", // Placeholder
    quote: "Minhas reuniões em inglês se tornaram muito mais fáceis. Consigo entender e ser entendida sem esforço. Recomendo 100%!"
  }
];

const faqItems = [
  {
    question: "Para quem é o Sound Flow Lab?",
    answer: "É para qualquer brasileiro, de nível intermediário a avançado, que já entende inglês mas sente dificuldade em falar com a mesma naturalidade e velocidade de um nativo."
  },
  {
    question: "Preciso de algum equipamento especial?",
    answer: "Não! Tudo que você precisa é de um dispositivo com acesso à internet e um microfone (o microfone do seu celular ou fone de ouvido já é suficiente) para os exercícios de gravação."
  },
  {
    question: "Em quanto tempo verei resultados?",
    answer: "A consistência é a chave. Com 15-20 minutos de prática diária, muitos alunos relatam uma melhora significativa na compreensão e na confiança para falar em poucas semanas."
  },
  {
    question: "O método é baseado em alguma ciência?",
    answer: "Sim! Nossa abordagem é baseada em princípios da fonética e fonologia, focando em aspectos como 'connected speech', ritmo e entonação, que são cruciais para a fluência e a pronúncia natural."
  }
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching module data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate a 1.5-second network delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
              <span className="text-sm font-semibold text-primary">🚀 Learn by Listening</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                Sound Flow Lab
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Aprenda a falar inglês com fluidez e pronúncia nativa através da sonoridade, ritmo e prática experimental.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="text-lg h-14 px-8 shadow-lg hover:shadow-xl 
                         bg-gradient-to-r from-primary to-accent text-primary-foreground 
                         bg-[length:200%_auto] hover:bg-[position:right_center] 
                         transition-all duration-500 ease-in-out">
                <Link to="/auth">
                  Começar Agora
                  <Zap className="ml-2 w-5 h-5" />
                </Link>
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
        <div className="max-w-5xl mx-auto">
          <SectionHeader title="Aprenda de forma sensorial" subtitle="Nosso método foca em como o inglês realmente soa, para que você desenvolva uma pronúncia natural e confiante." />
          <div className="grid md:grid-cols-3 gap-8 mt-16">
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
        </div>
      </section>

      {/* Modules Section */}
      <section id="practice-flow-section" className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            title="Your Practice Flow"
            subtitle="Comece sua jornada através dos módulos progressivos para dominar as conexões sonoras do inglês." />

          <div id="module-card-1" className="grid md:grid-cols-2 gap-6">
            {isLoading ? (
              // Show skeleton loaders while data is being "fetched"
              Array.from({ length: 4 }).map((_, index) => (
                <ModuleCardSkeleton key={index} />
              ))
            ) : (
              // Show the actual module cards once data is loaded
              modules.map((module) => (
                <ModuleCard key={module.id} {...module} moduleId={module.id} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/50 rounded-3xl">
        <SectionHeader
          title="O que nossos alunos dizem"
          subtitle="Veja como o Sound Flow Lab está transformando a fluência de pessoas como você."
        />
        <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-card p-6 rounded-2xl shadow-sm">
              <div className="flex flex-col h-full">
                <p className="text-muted-foreground mb-6 flex-grow">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <SectionHeader
          title="Perguntas Frequentes"
          subtitle="Tudo o que você precisa saber para começar sua jornada sonora."
        />
        <div className="max-w-3xl mx-auto mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <AccordionItem value={item.question} key={item.question}>
                <AccordionTrigger className="text-lg text-left font-semibold">{item.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
            <Button asChild size="lg" variant="secondary" className="h-14 px-8 text-lg shadow-lg hover:scale-105 transition-transform duration-300">
              <Link to="/module/1">
                Iniciar Primeira Lição
                <Zap className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
