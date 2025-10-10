import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export const SignupForm = () => {
    const { signUp } = useAuth();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!signupData.username || !signupData.email || !signupData.password || !signupData.confirmPassword) {
            toast({
                title: 'Erro',
                description: 'Preencha todos os campos',
                variant: 'destructive'
            });
            setLoading(false);
            return;
        }

        if (signupData.password !== signupData.confirmPassword) {
            toast({
                title: 'Erro',
                description: 'As senhas não coincidem',
                variant: 'destructive'
            });
            setLoading(false);
            return;
        }

        if (signupData.password.length < 6) {
            toast({
                title: 'Erro',
                description: 'A senha deve ter pelo menos 6 caracteres',
                variant: 'destructive'
            });
            setLoading(false);
            return;
        }

        const { error } = await signUp(signupData.email, signupData.password, signupData.username);

        if (error) {
            toast({
                title: 'Erro ao criar conta',
                description: error.message === 'User already registered'
                    ? 'Este email já está cadastrado'
                    : error.message,
                variant: 'destructive'
            });
        } else {
            toast({
                title: 'Conta criada!',
                description: 'Bem-vindo ao SpeakFlow!'
            });
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="signup-username">Nome de Usuário</Label>
                <Input
                    id="signup-username"
                    type="text"
                    placeholder="seu_usuario"
                    value={signupData.username}
                    onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                    disabled={loading}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                    id="signup-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    disabled={loading}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="signup-password">Senha</Label>
                <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    disabled={loading}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="signup-confirm">Confirmar Senha</Label>
                <Input
                    id="signup-confirm"
                    type="password"
                    placeholder="••••••••"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    disabled={loading}
                />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Criar Conta
            </Button>
        </form>
    );
};