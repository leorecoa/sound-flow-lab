import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Star, Trophy, Flame } from "lucide-react";

const user = {
    name: "Leo Recoa",
    avatarUrl: "https://github.com/shadcn.png", // Placeholder
    joinDate: "Membro desde Julho 2024",
    overallProgress: 75,
    streak: {
        current: 5,
        longest: 12,
    },
    achievements: [
        { id: 1, name: "Sound Master", description: "Completou 100 exercícios", icon: Trophy, color: "text-yellow-400" },
        { id: 2, name: "Accent Hero", description: "Atingiu 95% de precisão", icon: Star, color: "text-blue-400" },
        { id: 3, name: "Vowel Voyager", description: "Dominou as conexões de vogais", icon: Award, color: "text-green-400" },
    ],
};

const ProfilePage = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* User Info */}
            <div className="flex items-center gap-6 mb-12">
                <Avatar className="w-24 h-24 border-4 border-primary/50">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-4xl font-bold">{user.name}</h1>
                    <p className="text-muted-foreground">{user.joinDate}</p>
                </div>
            </div>

            {/* Streak Section */}
            <Card className="mb-8">
                <CardContent className="pt-6 flex justify-around text-center">
                    <div>
                        <div className="relative w-16 h-16 mx-auto">
                            <Flame className="w-16 h-16 text-orange-400" />
                            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">{user.streak.current}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Dias seguidos</p>
                    </div>
                    <div>
                        <Trophy className="w-16 h-16 mx-auto text-yellow-400" />
                        <p className="text-2xl font-bold mt-2">{user.streak.longest}</p>
                        <p className="text-sm text-muted-foreground">Maior sequência</p>
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
                        <Progress value={user.overallProgress} className="h-3" />
                        <span className="text-lg font-bold text-primary">{user.overallProgress}%</span>
                    </div>
                </CardContent>
            </Card>

            {/* Achievements Section */}
            <div>
                <h2 className="text-3xl font-bold mb-6">Conquistas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {user.achievements.map((ach) => (
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