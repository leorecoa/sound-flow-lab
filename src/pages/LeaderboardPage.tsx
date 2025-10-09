import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const leaderboardData = [
    { rank: 1, name: "Juliana S.", avatarUrl: "https://github.com/shadcn.png", xp: 1250 },
    { rank: 2, name: "Marcos P.", avatarUrl: "https://github.com/shadcn.png", xp: 1100 },
    { rank: 3, name: "Carla M.", avatarUrl: "https://github.com/shadcn.png", xp: 980 },
    { rank: 4, name: "Leo Recoa", avatarUrl: "https://github.com/shadcn.png", xp: 275 }, // Current user
    { rank: 5, name: "Ana B.", avatarUrl: "https://github.com/shadcn.png", xp: 250 },
    { rank: 6, name: "Pedro L.", avatarUrl: "https://github.com/shadcn.png", xp: 210 },
    { rank: 7, name: "Sofia R.", avatarUrl: "https://github.com/shadcn.png", xp: 150 },
].sort((a, b) => b.xp - a.xp); // Ensure it's sorted

const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-orange-400";
    return "text-muted-foreground";
};

const LeaderboardPage = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <SectionHeader
                title="Leaderboard"
                subtitle="Veja quem está no topo e continue praticando para subir no ranking!"
            />
            <div className="space-y-4">
                {leaderboardData.map((user, index) => (
                    <Card key={user.name} className={cn("flex items-center p-4 transition-all hover:border-primary/50", user.name === 'Leo Recoa' && 'border-2 border-primary')}>
                        <div className="flex items-center gap-4 w-full">
                            <div className="flex items-center gap-2 w-16 text-lg font-bold">
                                <Trophy className={cn("w-6 h-6", getRankColor(index + 1))} />
                                <span>{index + 1}</span>
                            </div>
                            <Avatar>
                                <AvatarImage src={user.avatarUrl} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-semibold flex-grow">{user.name}</span>
                            <span className="font-bold text-primary">{user.xp.toLocaleString()} XP</span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default LeaderboardPage;