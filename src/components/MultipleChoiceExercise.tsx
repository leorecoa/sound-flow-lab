import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const completeExercise = async (exerciseId: string) => {
    const { data, error } = await supabase.functions.invoke('complete-exercise', {
        body: { exercise_id: exerciseId },
    });
    if (error) throw error;
    return data;
};

interface MultipleChoiceExerciseProps {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
}

export const MultipleChoiceExercise = ({ id, question, options, correctAnswer }: MultipleChoiceExerciseProps) => {
    const queryClient = useQueryClient();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const handleSelectOption = (option: string) => {
        if (submitted) return;
        setSelectedOption(option);
    };

    const mutation = useMutation({
        mutationFn: completeExercise,
        onSuccess: () => {
            toast.success('Correto!', { description: "+10 XP" });
            queryClient.invalidateQueries({ queryKey: ['modules'] });
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
        onError: (error) => {
            toast.error('Erro ao salvar progresso.', { description: error.message });
        }
    });

    const handleSubmit = () => {
        if (!selectedOption) {
            toast.warning('Por favor, selecione uma opção.');
            return;
        }
        setSubmitted(true);
        if (selectedOption === correctAnswer) {
            mutation.mutate(id);
        } else {
            toast.error('Incorreto. Tente novamente!');
        }
    };

    const getButtonClass = (option: string) => {
        if (!submitted) return 'justify-start';
        if (option === correctAnswer) return 'bg-success/80 hover:bg-success justify-start';
        if (option === selectedOption && option !== correctAnswer) return 'bg-destructive/80 hover:bg-destructive justify-start';
        return 'justify-start';
    };

    return (
        <Card className="border-2">
            <CardHeader>
                <CardTitle className="text-lg">{question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {options.map((option) => (
                    <Button key={option} variant={selectedOption === option ? 'default' : 'outline'} className={cn('w-full', getButtonClass(option))} onClick={() => handleSelectOption(option)}>
                        {option}
                    </Button>
                ))}
                <Button onClick={handleSubmit} disabled={submitted || !selectedOption} className="mt-4 w-full">Verificar</Button>
            </CardContent>
        </Card>
    );
};