import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Headphones, Mic, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExampleCard } from "@/components/ExampleCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const moduleData = {
  "1": {
    title: "Consoante + Vogal",
    description: "Quando uma palavra termina com consoante e a seguinte começa com vogal, a consoante 'pula' para a próxima palavra, criando um som contínuo.",
    examples: [
      {
        formalPhrase: "It is an apple",
        connectedPhrase: "IT_IS_AN_APPLE",
        translation: "É uma maçã",
        context: "Conversa casual"
      },
      {
        formalPhrase: "Turn it off",
        connectedPhrase: "TURN_IT_OFF",
        translation: "Desligue isso",
        context: "Pedido direto"
      },
      {
        formalPhrase: "Pick it up",
        connectedPhrase: "PICK_IT_UP",
        translation: "Pegue isso",
        context: "Instrução"
      }
    ],
    exercises: [
      "Listen and repeat: 'Take it easy' → TAKE_IT_EASY",
      "Listen and repeat: 'Come on in' → COME_ON_IN",
      "Listen and repeat: 'Let it go' → LET_IT_GO"
    ]
  }
};

const ModulePage = () => {
  const { moduleId } = useParams();
  const module = moduleData[moduleId as keyof typeof moduleData];

  const handlePlayAudio = () => {
    toast.info("Recurso de áudio será implementado em breve!");
  };

  if (!module) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Módulo não encontrado</h1>
          <Link to="/">
            <Button>Voltar ao início</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {module.title}
          </h1>
          <p className="text-lg text-muted-foreground">{module.description}</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="examples" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="examples" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Exemplos
            </TabsTrigger>
            <TabsTrigger value="exercises" className="flex items-center gap-2">
              <Headphones className="w-4 h-4" />
              Exercícios
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex items-center gap-2">
              <Mic className="w-4 h-4" />
              Prática
            </TabsTrigger>
          </TabsList>

          {/* Examples Tab */}
          <TabsContent value="examples" className="space-y-6">
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Como Funciona
                </CardTitle>
                <CardDescription className="text-base">
                  Ouça atentamente cada exemplo e observe como as palavras se conectam naturalmente na fala.
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="space-y-4">
              {module.examples.map((example, index) => (
                <ExampleCard
                  key={index}
                  {...example}
                  onPlayAudio={handlePlayAudio}
                />
              ))}
            </div>
          </TabsContent>

          {/* Exercises Tab */}
          <TabsContent value="exercises" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Exercícios de Pronúncia</CardTitle>
                <CardDescription>
                  Ouça cada frase e tente repetir com as conexões corretas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {module.exercises.map((exercise, index) => (
                  <Card key={index} className="border-2">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-lg flex-1">{exercise}</p>
                        <Button onClick={handlePlayAudio} size="lg" className="rounded-full">
                          <Play className="w-5 h-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Practice Tab */}
          <TabsContent value="practice" className="space-y-6">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle>Grave sua Pronúncia</CardTitle>
                <CardDescription>
                  Grave você mesmo pronunciando as frases e compare com o áudio original
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-8 text-center">
                  <Mic className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg text-muted-foreground mb-4">
                    Recurso de gravação em desenvolvimento
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Em breve você poderá gravar sua voz e comparar com exemplos nativos!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ModulePage;
