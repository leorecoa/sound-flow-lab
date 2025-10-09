"use client"; // Este componente é interativo, então precisa ser um Client Component

import { useState, FC } from "react";
import { AlertCircle, BookOpen, Check, Headphones, Loader2, Mic, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExampleCard } from "@/components/ExampleCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useMediaRecorder } from "@/hooks/useMediaRecorder"; // Mova os hooks para uma pasta 'hooks'
import { MultipleChoiceExercise } from "@/components/MultipleChoiceExercise"; // Mova para 'components'
import { SoundWave } from "@/components/SoundWave"; // Mova para 'components'
import { useQuery } from "@tanstack/react-query";
// @ts-ignore: Install '@types/react-confetti' for type definitions
import ReactConfetti from "react-confetti";
import Link from "next/link";

// Nova função para buscar dados da nossa API Route
const fetchModule = async (moduleId: string) => {
    const res = await fetch(`/api/modules/${moduleId}`);
    if (!res.ok) {
        throw new Error("Módulo não encontrado");
    }
    return res.json();
};

// Tipagem para as props do ModuleView para garantir segurança e clareza.
interface ModuleViewProps {
    module: any; // Idealmente, criar um tipo específico para o módulo
    handleCheckPronunciation: () => void;
    handlePlayAudio: () => void;
    status: string;
    mediaBlobUrl: string | null;
    startRecording: () => void;
    stopRecording: () => void;
}

const ModuleView: FC<ModuleViewProps> = ({ module, handleCheckPronunciation, handlePlayAudio, status, mediaBlobUrl, startRecording, stopRecording }) => {
    return (
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
    );
};

export default function ModulePage({ params }: { params: { moduleId: string } }) {
    const { moduleId } = params;
    const { status, mediaBlobUrl, startRecording, stopRecording } = useMediaRecorder();
    const [showConfetti, setShowConfetti] = useState(false);

    const { data: module, isLoading, isError, error } = useQuery({
        queryKey: ['module', moduleId],
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
                        <Link href="/">Voltar ao início</Link>
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
                        if (confetti) confetti.reset();
                        setShowConfetti(false);
                    }}
                />
            )}
            <ModuleView module={module} handleCheckPronunciation={handleCheckPronunciation} handlePlayAudio={handlePlayAudio} status={status} mediaBlobUrl={mediaBlobUrl} startRecording={startRecording} stopRecording={stopRecording} />
        </div>
    );
}
