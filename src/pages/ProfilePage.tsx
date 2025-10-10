import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { WeeklyProgressChart } from "@/components/WeeklyProgressChart";
import { Award, Star, Trophy, Flame, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Dados estáticos que serão substituídos no futuro
const achievements = [
    { id: 1, name: "Sound Master", description: "Completou 100 exercícios", icon: Trophy, color: "text-yellow-400" },
    { id: 2, name: "Accent Hero", description: "Atingiu 95% de precisão", icon: Star, color: "text-blue-400" },
    { id: 3, name: "Vowel Voyager", description: "Dominou as conexões de vogais", icon: Award, color: "text-green-400" },
];

const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url, xp, created_at')
        .eq('id', userId)
        .single();

    if (error) {
        // Se o perfil não existir, podemos criar um
        if (error.code === 'PGRST116') {
            // Lógica para criar perfil aqui
            console.warn("Perfil não encontrado para o usuário:", userId);
            return null;
        }
        throw new Error(error.message);
    }
    return data;
};

const fetchStreaks = async () => {
    const { data, error } = await supabase.functions.invoke('get-user-streaks');
    if (error) {
        console.error("Error fetching streaks:", error);
        return { currentStreak: 0, longestStreak: 0 };
    }
    return data;
};

const weeklyProgressData = [
    { name: 'Seg', progress: 3 },
    { name: 'Ter', progress: 5 },
    { name: 'Qua', progress: 2 },
    { name: 'Qui', progress: 7 },
    { name: 'Sex', progress: 4 },
    { name: 'Sáb', progress: 8 },
    { name: 'Dom', progress: 1 },
];

const ProfilePage = () => {
    const { user: authUser } = useAuth();
    const { data: profile, isLoading } = useQuery({
        queryKey: ['profile', authUser?.id],
        queryFn: () => fetchProfile(authUser!.id),
        enabled: !!authUser,
    });

    const { data: streaks, isLoading: isLoadingStreaks } = useQuery({
        queryKey: ['streaks', authUser?.id],
        queryFn: fetchStreaks,
        enabled: !!authUser,
    });

    // Lógica do sistema de níveis
    const xpForNextLevel = 100;
    const level = profile ? Math.floor(profile.xp / xpForNextLevel) + 1 : 1;
    const progressToNextLevel = profile ? (profile.xp % xpForNextLevel) : 0;

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
                <div className="flex items-center gap-6 mb-12">
                    <Skeleton className="w-24 h-24 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-10 w-48" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* User Info */}
            <div className="flex items-center gap-6 mb-12">
                <Avatar className="w-24 h-24 border-4 border-primary/50">
                    <AvatarImage src={profile?.avatar_url ?? undefined} alt={profile?.username} />
                    <AvatarFallback>{profile?.username?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-4xl font-bold">{profile?.username || 'Usuário'}</h1>
                    <p className="text-muted-foreground">Membro desde {profile ? new Date(profile.created_at).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' }) : '...'}</p>
                </div>
            </div>

            {/* Streak Section */}
            <Card className="mb-8">
                <CardContent className="pt-6 flex justify-around text-center">
                    <div>
                        <div className="relative w-16 h-16 mx-auto">
                            <Flame className="w-16 h-16 text-orange-400" />
                            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">{isLoadingStreaks ? <Loader2 className="animate-spin" /> : streaks?.currentStreak || 0}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Dias seguidos</p>
                    </div>
                    <div>
                        <Trophy className="w-16 h-16 mx-auto text-yellow-400" />
                        <p className="text-2xl font-bold mt-2">{isLoadingStreaks ? <Loader2 className="animate-spin mx-auto" /> : streaks?.longestStreak || 0}</p>
                        <p className="text-sm text-muted-foreground">Maior sequência</p>
                    </div>
                </CardContent>
            </Card>

            {/* Level System */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Nível {level}</span>
                        <span className="text-sm font-normal text-muted-foreground">{profile?.xp || 0} XP</span>
                    </CardTitle>
                    <CardDescription>Progresso para o Nível {level + 1}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <Progress value={progressToNextLevel} className="h-3" />
                        <span className="text-sm font-bold text-primary">{progressToNextLevel}%</span>
                    </div>
                </CardContent>
            </Card>

            {/* Progress Section */}
            <Card className="mb-8 bg-card/50">
                <CardHeader>
                    <CardTitle>Progresso Geral</CardTitle>
                    <CardDescription>Sua jornada para a fluência</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <Progress value={0} className="h-3" />
                        <span className="text-lg font-bold text-primary">0%</span>
                    </div>
                </CardContent>
            </Card>

            {/* Weekly Progress Chart */}
            <WeeklyProgressChart data={weeklyProgressData} />

            {/* Achievements Section */}
            <div>
                <h2 className="text-3xl font-bold mb-6">Conquistas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {achievements.map((ach) => (
                        <Card key={ach.id} className="text-center p-6 flex flex-col items-center justify-center hover:border-primary/50 transition-colors">
                            <ach.icon className={`w-16 h-16 mb-4 ${ach.color}`} strokeWidth={1.5} />
                            <h3 className="text-xl font-semibold">{ach.name}</h3>
                            <p className="text-sm text-muted-foreground">{ach.description}</p>
                        </Card>
                    ))}
                    <Card className="text-center p-6 flex flex-col items-center justify-center border-dashed">
                        <Trophy className="w-16 h-16 mb-4 text-muted-foreground/50" strokeWidth={1.5} />
                        <h3 className="text-xl font-semibold text-muted-foreground">Próxima Conquista</h3>
                        <p className="text-sm text-muted-foreground">Continue praticando!</p>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;