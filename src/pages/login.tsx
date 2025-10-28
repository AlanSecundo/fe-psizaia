import { useForm } from "react-hook-form";
import { TextField } from "@/components/base/inputs/form-inputs";
import { PasswordField } from "@/components/base/inputs/password-field";
import { Button } from "@/components/base/buttons/button";
import { useAuthentication } from "@/hooks";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import "@/styles/login.css";

type LoginForm = {
    email: string;
    password: string;
};

export const LoginPage = () => {
    const navigate = useNavigate();
    const { control, handleSubmit } = useForm<LoginForm>({
        defaultValues: { email: "", password: "" },
    });

    const { login, isLoading, isSuccess, isError, error } = useAuthentication();

    const onSubmit = (data: LoginForm) => {
        login(data);
    };

    useEffect(() => {
        if (isSuccess) {
            navigate("/");
        }
    }, [isSuccess, navigate]);

    return (
        <div className="login-page">
            <div className="login-logo-mark" />

            <div className="login-card">
                <div className="flex flex-col items-center gap-2 mb-6">
                    <div className="login-brand" aria-label="Psizaia" />
                    <h1 className="text-xl font-semibold text-gray-800">Acesso Psicólogo</h1>
                    <p className="text-sm text-gray-500">Faça login para acessar sua plataforma.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <TextField<LoginForm>
                        name="email"
                        control={control}
                        type="email"
                        label="Email"
                        placeholder="seu.email@exemplo.com"
                    />

                    <PasswordField<LoginForm>
                        name="password"
                        control={control}
                        label="Senha"
                        placeholder="••••••••"
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        className="w-full justify-center"
                        icon="LogIn"
                        disabled={isLoading}
                    >
                        {isLoading ? "Entrando..." : "Entrar"}
                    </Button>

                    {isError && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">
                                {error?.message || "Erro ao fazer login. Verifique suas credenciais."}
                            </p>
                        </div>
                    )}
                </form>

                <div className="mt-6 text-center text-xs text-gray-500 space-y-2">
                    <Link to="/recuperar-senha" className="underline hover:text-purple-500">Esqueceu sua senha?</Link>
                    <div className="mt-2">
                        Não tem uma conta? <Link to="/cadastro" className="underline hover:text-purple-500">Cadastre-se</Link>
                    </div>
                    <div>
                        Conheça nossos <Link to="/planos" className="underline hover:text-purple-500"> planos de assinatura</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;


