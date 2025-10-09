import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Lightbulb } from "lucide-react";

const AboutPage = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <SectionHeader
                title="Sobre o Sound Flow Lab"
                subtitle="Nossa missão é destravar a sua fluência no inglês através do poder do som."
            />

            <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
                <p>
                    O Sound Flow Lab nasceu da crença de que aprender a falar um novo idioma deve ser uma experiência intuitiva, sensorial e, acima de tudo, focada em como a língua realmente soa. Cansados de métodos que ensinam palavras isoladas e regras gramaticais desconectadas da fala real, decidimos criar uma abordagem diferente.
                </p>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Target className="w-6 h-6 text-primary" />
                            Nossa Missão
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            Democratizar o aprendizado da pronúncia nativa do inglês, tornando-o acessível, prático e prazeroso para todos os brasileiros que desejam se comunicar com confiança e clareza no cenário global.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Lightbulb className="w-6 h-6 text-accent" />
                            Nosso Método
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            Focamos no "Connected Speech" — as conexões sonoras que os nativos usam naturalmente. Através de áudios, exercícios de repetição e feedback visual, nosso laboratório sonoro treina seu ouvido e sua fala para captar e reproduzir o ritmo e a melodia do inglês autêntico.
                        </p>
                    </CardContent>
                </Card>

                <p>
                    Acreditamos que, ao dominar a sonoridade, você não apenas melhora sua pronúncia, mas também sua compreensão auditiva e sua confiança para falar. Junte-se a nós nesta jornada sonora!
                </p>
            </div>
        </div>
    );
};

export default AboutPage;