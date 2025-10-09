import { useState } from "react";
import { useParams, Link } from "react-router-dom";
// Correção: Unificação das importações do 'lucide-react' para resolver o aviso de importação múltipla.
import { AlertCircle, BookOpen, Check, Headphones, Loader2, Mic, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExampleCard } from "@/components/ExampleCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useMediaRecorder } from "./useMediaRecorder";
import { MultipleChoiceExercise } from "./MultipleChoiceExercise";
import { SoundWave } from "./SoundWave";
import { useQuery } from "@tanstack/react-query";
// @ts-ignore: Install '@types/react-confetti' for type definitions
import ReactConfetti from "react-confetti";

const CONFETTI_DURATION = 7000;

const moduleData = {
  "1": {
    title: "Consoante + Vogal",
    description: "Quando uma palavra termina com consoante e a seguinte começa com vogal, a consoante 'pula' para a próxima palavra, criando um som contínuo.",
    examples: [
      {
        formalPhrase: "It is an apple",
        connectedPhrase: "IT_IS_AN_APPLE",
        translation: "É uma maçã",
        context: "Conversa casual",
        audioUrl: "/audio/it-is-an-apple.mp3" // Placeholder
      },
      {
        formalPhrase: "Turn it off",
        connectedPhrase: "TURN_IT_OFF",
        translation: "Desligue isso",
        context: "Pedido direto",
        audioUrl: "/audio/turn-it-off.mp3" // Placeholder
      },
      {
        formalPhrase: "Pick it up",
        connectedPhrase: "PICK_IT_UP",
        translation: "Pegue isso",
        context: "Instrução",
        audioUrl: "/audio/pick-it-up.mp3" // Placeholder
      }
    ],
    exercises: [
      {
        type: 'listen_repeat',
        id: 'ex1',
        text: "Listen and repeat: 'Take it easy' → TAKE_IT_EASY"
      },
      {
        type: 'multiple_choice',
        id: 'ex2',
        question: "Qual frase demonstra a conexão correta para 'What are you doing?'",
        options: [
          "What are you doing?",
          "Whatcha doin'?",
          "What you doing?",
          "What are doing?"
        ],
        correctAnswer: "Whatcha doin'?"
      },
    ]
  }
};

// Simula uma chamada de API para buscar os dados do módulo
const fetchModule = async (moduleId: string) => {
  console.log(`Fetching module: ${moduleId}`);
  await new Promise(resolve => setTimeout(resolve, 500)); // Simula atraso de rede

  const data = moduleData[moduleId as keyof typeof moduleData];
  if (data) {
    return data;
  }
  throw new Error("Módulo não encontrado");
};

const ModulePage = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { status, mediaBlobUrl, startRecording, stopRecording } = useMediaRecorder();
  const [showConfetti, setShowConfetti] = useState(false);

  const { data: module, isLoading, isError, error } = useQuery({
    queryKey: ['module', moduleId],
    // Correção (S4325): Remoção da asserção de tipo desnecessária 'as string', pois o hook 'useParams' e a verificação 'enabled' já garantem a tipagem.
    queryFn: () => fetchModule(moduleId),
    enabled: !!moduleId, // The query will not run until moduleId is available
  });

  const handleCheckPronunciation = () => {
    // Simula uma verificação de sucesso
    toast.success("Parabéns! Pronúncia perfeita!", { description: "+25 XP" });
    setShowConfetti(true);
  };

  const handlePlayAudio = () => {
    toast.info("Recurso de áudio será implementado em breve!");
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !module) {
    return (
      <div role="alert" className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto w-12 h-12 text-destructive mb-4" />
          <h1 className="text-2xl font-bold mb-4">{error instanceof Error ? error.message : "Módulo não encontrado"}</h1>
          <p className="text-muted-foreground mb-6">Não conseguimos carregar este módulo. Tente voltar para a página inicial.</p>
          <Button asChild>
            <Link to="/">Voltar ao início</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {showConfetti && (
        <ReactConfetti
          recycle={false}
          numberOfPieces={400}
          onConfettiComplete={(confetti) => {
            if (confetti) {
              confetti.reset();
            }
            setShowConfetti(false);
          }}
          confettiSource={{ x: window.innerWidth / 2, y: window.innerHeight / 2, w: 0, h: 0 }}
        />
      )}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
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
              {module.examples.map((example) => (
                <ExampleCard
                  key={example.formalPhrase}
                  {...example}
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
                {module.exercises.map((exercise) => {
                  if (exercise.type === 'listen_repeat') {
                    return (
                      <Card key={exercise.id} className="border-2">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between gap-4">
                            <p className="text-lg flex-1">{exercise.text}</p>
                            <Button onClick={handlePlayAudio} size="lg" className="rounded-full">
                              <Play className="w-5 h-5" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  }
                  if (exercise.type === 'multiple_choice') {
                    return <MultipleChoiceExercise
                      key={exercise.id}
                      question={exercise.question}
                      options={exercise.options}
                      correctAnswer={exercise.correctAnswer}
                    />;
                  }
                  return null;
                })}
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
                <div className="bg-muted rounded-lg p-8 text-center space-y-6">
                  {status === 'recording' ? (
                    <Button onClick={stopRecording} size="lg" className="w-24 h-24 rounded-full bg-red-500 hover:bg-red-600 shadow-lg">
                      <Square className="w-10 h-10 fill-white" />
                    </Button>
                  ) : (
                    <Button onClick={startRecording} size="lg" className="w-24 h-24 rounded-full shadow-lg">
                      <Mic className="w-10 h-10" />
                    </Button>
                  )}

                  {status === 'recording' && (
                    <div className="flex items-center justify-center gap-2 text-red-500 animate-pulse">
                      <SoundWave className="text-red-500" />
                    </div>
                  )}

                  {mediaBlobUrl && status === 'stopped' && (
                    <div className="space-y-2">
                      <p id="recording-label" className="text-muted-foreground">Sua gravação:</p>
                      {/* Correção: Adicionado elemento <track> para acessibilidade do player de áudio. */}
                      <audio src={mediaBlobUrl} controls className="w-full">
                        <track kind="captions" />
                      </audio>
                      <Button onClick={handleCheckPronunciation} className="mt-4">
                        <Check className="w-4 h-4 mr-2" />
                        Verificar Pronúncia
                      </Button>
                    </div>
                  )}

                  {status === 'denied' && (
                    <p className="text-red-500">Acesso ao microfone negado. Por favor, habilite nas configurações do seu navegador.</p>
                  )}
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
