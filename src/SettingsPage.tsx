import { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const SettingsPage = () => {
    const [isSaving, setIsSaving] = useState(false);

    const handleSaveChanges = async () => {
        setIsSaving(true);
        try {
            // Simula uma chamada de API com um atraso de 1.5 segundos
            await new Promise(resolve => setTimeout(resolve, 1500));
            toast.success("Alterações salvas com sucesso!");
        } catch (error) {
            // Correção (S2486): Implementado tratamento de erro adequado para capturar e registrar a exceção, melhorando a robustez.
            console.error("Erro ao salvar as configurações:", error);
            toast.error("Não foi possível salvar as alterações.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteAccount = () => {
        toast.error("Ação perigosa! Funcionalidade desativada na demonstração.");
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