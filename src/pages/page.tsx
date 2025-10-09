"use client"; // Este componente é interativo, então precisa ser um Client Component

import { useState } from "react";
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

export default function ModulePage({ params }: { params: { moduleId: string } }) {
  const { moduleId } = params;
  const { status, mediaBlobUrl, startRecording, stopRecording } = useMediaRecorder();
  const [showConfetti, setShowConfetti] = useState(false);

  const { data: module, isLoading, isError, error } = useQuery({
    queryKey: ['module', moduleId],
    queryFn: () => fetchModule(moduleId),
    enabled: !!moduleId, // The query will not run until moduleId is available
  });
  // ... (o resto do seu componente JSX permanece o mesmo)
}
