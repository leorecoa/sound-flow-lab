import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export const SignupForm = () => {
    const { signUp } = useAuth();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({ username: '', email: '', password: '', confirmPassword: '' }); // Reset errors

        let hasError = false;
        if (signupData.password !== signupData.confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: 'As senhas não coincidem.' }));
            hasError = true;
        }

        if (signupData.password.length < 6) {
            setErrors(prev => ({ ...prev, password: 'A senha deve ter pelo menos 6 caracteres.' }));
            hasError = true;
        }

        if (hasError) {
            setLoading(false);
            return;
        }

        const { error } = await signUp(signupData.email, signupData.password, signupData.username);

        if (error) {
            const errorMessage = error.message === 'User already registered'
                ? 'Este email já está cadastrado.'
                : 'Ocorreu um erro ao criar a conta.';
            setErrors(prev => ({ ...prev, email: errorMessage }));
            toast({
                title: 'Erro ao criar conta',
                description: errorMessage,
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
                {errors.username && (
                    <p className="text-sm text-destructive mt-1">{errors.username}</p>
                )}
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
                {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="signup-password">Senha</Label>
                <div className="relative">
                    <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        disabled={loading}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute inset-y-0 right-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                    >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    {errors.password && (
                        <p className="text-sm text-destructive mt-1">{errors.password}</p>
                    )}
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="signup-confirm">Confirmar Senha</Label>
                <div className="relative">
                    <Input
                        id="signup-confirm"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                        disabled={loading}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute inset-y-0 right-0 h-full px-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? "Esconder senha" : "Mostrar senha"}
                    >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    {errors.confirmPassword && (
                        <p className="text-sm text-destructive mt-1">{errors.confirmPassword}</p>
                    )}
                </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Criar Conta
            </Button>
        </form>
    );
};