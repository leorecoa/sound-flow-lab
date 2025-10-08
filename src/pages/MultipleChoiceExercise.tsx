import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Check, X } from 'lucide-react';

interface MultipleChoiceExerciseProps {
    question: string;
    options: string[];
    correctAnswer: string;
}

export const MultipleChoiceExercise = ({ question, options, correctAnswer }: MultipleChoiceExerciseProps) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const handleSelectOption = (option: string) => {
        if (submitted) return;
        setSelectedOption(option);
    };

    const handleSubmit = () => {
        if (!selectedOption) {
            toast.warning('Por favor, selecione uma opção.');
            return;
        }
        setSubmitted(true);
        if (selectedOption === correctAnswer) {
            toast.success('Correto!');
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