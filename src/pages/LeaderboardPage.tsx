import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";

const fetchLeaderboard = async () => {
    const { data, error } = await supabase
        .from('profiles')
        .select('id, username, avatar_url, xp')
        .order('xp', { ascending: false })
        .limit(50);
    if (error) throw new Error(error.message);
    return data;
};

const getRankColor = (rank: number) => {
    if (rank === 0) return "text-yellow-400";
    if (rank === 1) return "text-gray-400";
    if (rank === 2) return "text-orange-400";
    return "text-muted-foreground";
};

const LeaderboardPage = () => {
    const { user } = useAuth();
    const { data: leaderboardData = [], isLoading } = useQuery({
        queryKey: ['leaderboard'],
        queryFn: fetchLeaderboard,
    });

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <SectionHeader
                title="Leaderboard"
                subtitle="Veja quem está no topo e continue praticando para subir no ranking!"
            />
            <div className="space-y-4">
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <Card key={index} className="flex items-center p-4">
                            <Skeleton className="w-16 h-6" />
                            <Skeleton className="w-10 h-10 rounded-full ml-4" />
                            <Skeleton className="h-6 w-32 ml-4" />
                            <Skeleton className="h-6 w-20 ml-auto" />
                        </Card>
                    ))
                ) : (
                    leaderboardData.map((player, index) => (
                        <Card key={player.id} className={cn("flex items-center p-4 transition-all hover:border-primary/50", player.id === user?.id && 'border-2 border-primary')}>
                            <div className="flex items-center gap-4 w-full">
                                <div className="flex items-center gap-2 w-16 text-lg font-bold">
                                    <Trophy className={cn("w-6 h-6", getRankColor(index))} />
                                    <span>{index + 1}</span>
                                </div>
                                <Avatar>
                                    <AvatarImage src={player.avatar_url ?? undefined} alt={player.username} />
                                    <AvatarFallback>{player.username.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <span className="font-semibold flex-grow">{player.username}</span>
                                <span className="font-bold text-primary">{player.xp.toLocaleString()} XP</span>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default LeaderboardPage;