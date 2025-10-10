import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const LoginForm = () => {
    const { signIn, sendPasswordResetEmail } = useAuth();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!loginData.email || !loginData.password) {
            toast({
                title: 'Erro',
                description: 'Preencha todos os campos',
                variant: 'destructive'
            });
            setLoading(false);
            return;
        }

        const { error } = await signIn(loginData.email, loginData.password);

        if (error) {
            toast({
                title: 'Erro ao entrar',
                description: error.message === 'Invalid login credentials'
                    ? 'Email ou senha incorretos'
                    : error.message,
                variant: 'destructive'
            });
        }

        setLoading(false);
    };

    const handlePasswordReset = async () => {
        if (!loginData.email) {
            toast({
                title: 'Email necessário',
                description: 'Por favor, insira seu email para redefinir a senha.',
                variant: 'destructive'
            });
            return;
        }
        await sendPasswordResetEmail(loginData.email);
        toast({
            title: 'Email de redefinição enviado',
            description: 'Verifique sua caixa de entrada para as instruções.',
        });
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                    id="login-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    disabled={loading}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="login-password">Senha</Label>
                <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    disabled={loading}
                />
                <div className="flex justify-end">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="link" type="button" className="p-0 h-auto text-xs">Esqueceu a senha?</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Redefinir Senha</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Enviaremos um link para o seu email para que você possa redefinir sua senha. Por favor, insira seu email abaixo.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <Input type="email" placeholder="seu@email.com" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={handlePasswordReset}>Enviar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Entrar
            </Button>
        </form>
    );
};