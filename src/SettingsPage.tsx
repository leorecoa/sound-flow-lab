import { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useUserPreferences } from "@/contexts/UserPreferencesContext";

const SettingsPage = () => {
    const [isSaving, setIsSaving] = useState(false);
    const { preferences, updatePreference, resetPreferences } = useUserPreferences();

    const handleSaveChanges = async () => {
        setIsSaving(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            toast.success("Alterações salvas com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar as configurações:", error);
            toast.error("Não foi possível salvar as alterações.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteAccount = () => {
        toast.error("Ação perigosa! Funcionalidade desativada na demonstração.");
    };

    const handleResetPreferences = () => {
        resetPreferences();
        toast.success("Preferências resetadas para padrão!");
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <SectionHeader
                title="Configurações"
                subtitle="Gerencie suas preferências e informações da conta."
            />

            <div className="space-y-8">
                {/* Profile Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Perfil</CardTitle>
                        <CardDescription>Atualize suas informações pessoais.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome</Label>
                            <Input id="name" defaultValue="Leo Recoa" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="leo.recoa@example.com" disabled />
                        </div>
                        <Button onClick={handleSaveChanges} disabled={isSaving}>
                            {isSaving && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {isSaving ? "Salvando..." : "Salvar Alterações"}
                        </Button>
                    </CardContent>
                </Card>

                {/* Learning Preferences */}
                <Card>
                    <CardHeader>
                        <CardTitle>Preferências de Aprendizado</CardTitle>
                        <CardDescription>Personalize sua experiência de estudo.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="playback-speed">Velocidade de Reprodução</Label>
                            <Select 
                                value={preferences.playbackSpeed.toString()} 
                                onValueChange={(value) => updatePreference("playbackSpeed", parseFloat(value))}
                            >
                                <SelectTrigger id="playback-speed">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0.5">0.5x (Muito Lento)</SelectItem>
                                    <SelectItem value="0.75">0.75x (Lento)</SelectItem>
                                    <SelectItem value="1">1x (Normal)</SelectItem>
                                    <SelectItem value="1.25">1.25x (Rápido)</SelectItem>
                                    <SelectItem value="1.5">1.5x (Muito Rápido)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="language">Idioma Base</Label>
                            <Select 
                                value={preferences.language} 
                                onValueChange={(value: "pt" | "en") => updatePreference("language", value)}
                            >
                                <SelectTrigger id="language">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pt">Português 🇧🇷</SelectItem>
                                    <SelectItem value="en">English 🇺🇸</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <Label htmlFor="auto-play" className="text-base">Reprodução Automática</Label>
                                <p className="text-sm text-muted-foreground">Iniciar áudio automaticamente ao abrir exemplos.</p>
                            </div>
                            <Switch 
                                id="auto-play" 
                                checked={preferences.autoPlay}
                                onCheckedChange={(checked) => updatePreference("autoPlay", checked)}
                            />
                        </div>

                        <Button onClick={handleResetPreferences} variant="outline" className="w-full">
                            Resetar Preferências
                        </Button>
                    </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>Notificações</CardTitle>
                        <CardDescription>Escolha como você quer ser notificado.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <Label htmlFor="daily-reminder" className="text-base">Lembretes Diários</Label>
                                <p className="text-sm text-muted-foreground">Receba uma notificação para praticar todos os dias.</p>
                            </div>
                            <Switch id="daily-reminder" defaultChecked />
                        </div>
                    </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-destructive">
                    <CardHeader>
                        <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Apagar sua conta e todos os seus dados.</p>
                        <Button variant="destructive" onClick={handleDeleteAccount}>Apagar Conta</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SettingsPage;