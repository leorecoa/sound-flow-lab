import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';

const fetchUserProgress = async (userId: string) => {
    const { data, error } = await supabase
        .from('user_exercise_completions')
        .select('exercise_id, exercises(module_id)');

    if (error) throw new Error(error.message);
    return data;
};

export const useProgress = () => {
    const { user } = useAuth();
    return useQuery({
        queryKey: ['userProgress', user?.id],
        queryFn: () => fetchUserProgress(user!.id),
        enabled: !!user,
    });
};