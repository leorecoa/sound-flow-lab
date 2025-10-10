import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';

const completeExercise = async (exerciseId: string) => {
    const { data, error } = await supabase.functions.invoke('complete-exercise', {
        body: { exercise_id: exerciseId },
    });
    if (error) throw error;
    return data;
};

export const useXP = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: completeExercise,
        onSuccess: (data, variables) => {
            toast.success('Correto!', { description: `+${data.xp_gained || 10} XP` });
            // Invalida os dados em cache para forçar a UI a recarregar com as novas informações
            queryClient.invalidateQueries({ queryKey: ['modules'] });
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            queryClient.invalidateQueries({ queryKey: ['streaks'] });
        },
        onError: (error) => {
            toast.error('Erro ao salvar progresso.', { description: error.message });
        },
    });
};