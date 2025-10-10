import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const authHeader = req.headers.get('Authorization')!;
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: authHeader } } }
        );

        const { data: { user } } = await supabaseClient.auth.getUser();
        if (!user) throw new Error('Unauthorized');

        const { data, error } = await supabaseClient
            .from('user_exercise_completions')
            .select('completed_at')
            .eq('user_id', user.id)
            .order('completed_at', { ascending: false });

        if (error) throw error;

        const dates = data.map(d => new Date(d.completed_at).toDateString());
        const uniqueDates = [...new Set(dates)];

        let currentStreak = 0;
        let longestStreak = 0;
        let streak = 0;

        for (let i = 0; i < uniqueDates.length; i++) {
            const date = new Date(uniqueDates[i]);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (i === 0 && date.getTime() === today.getTime()) {
                currentStreak = 1;
                streak = 1;
            } else if (i > 0) {
                const prevDate = new Date(uniqueDates[i - 1]);
                const diff = prevDate.getTime() - date.getTime();
                if (diff === 24 * 60 * 60 * 1000) {
                    streak++;
                } else {
                    streak = 1;
                }
            }
            if (streak > longestStreak) {
                longestStreak = streak;
            }
        }

        return new Response(JSON.stringify({ currentStreak, longestStreak }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        });
    }
});