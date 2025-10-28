import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUserRegistration } from '@/hooks';
import { TextField } from '@/components/base/inputs/form-inputs';
import { CpfField } from '@/components/base/inputs/cpf-field';
import { CrpField } from '@/components/base/inputs/crp-field';
import { PasswordField } from '@/components/base/inputs/password-field';
import { Button } from '@/components/base/buttons/button';
import { isValidCpf, removeCpfMask } from '@/utils/cpf-validation';
import { Link, useNavigate } from 'react-router';
import type { UserRegistrationRequest } from '@/types/userRegistration';
import '@/styles/login.css';

export const RegistrationPage: React.FC = () => {
    const navigate = useNavigate();
    const { control, handleSubmit, reset } = useForm<UserRegistrationRequest>();
    const { register: registerUser, isLoading, isSuccess, isError, error, reset: resetMutation } = useUserRegistration();

    const onSubmit = (data: UserRegistrationRequest) => {
        // Remove a máscara do CPF antes de enviar
        const dataToSend = {
            ...data,
            cpf: removeCpfMask(data.cpf)
        };
        registerUser(dataToSend);
    };

    const handleReset = () => {
        reset();
        resetMutation();
    };

    // Redirecionar para dashboard após cadastro e login bem-sucedidos
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
                    <h1 className="text-xl font-semibold text-gray-800">Cadastro de Psicólogo</h1>
                    <p className="text-sm text-gray-500">Preencha os dados abaixo para criar sua conta.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Mensagens de feedback */}
                    {isSuccess && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-600">
                                Usuário cadastrado com sucesso!
                            </p>
                        </div>
                    )}

                    {isError && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">
                                {error?.message || 'Erro desconhecido'}
                            </p>
                        </div>
                    )}

                    {/* Nome Completo */}
                    <TextField
                        name="fullName"
                        control={control}
                        label="Nome Completo"
                        placeholder="Dr. João Silva Santos"
                        required
                        rules={{
                            required: 'Nome completo é obrigatório',
                            minLength: {
                                value: 2,
                                message: 'Nome deve ter pelo menos 2 caracteres'
                            }
                        }}
                    />

                    {/* Email */}
                    <TextField
                        name="email"
                        control={control}
                        label="Email"
                        type="email"
                        placeholder="joao.silva@psicologia.com"
                        required
                        rules={{
                            required: 'Email é obrigatório',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Email inválido'
                            }
                        }}
                    />

                    {/* Senha */}
                    <PasswordField
                        name="password"
                        control={control}
                        label="Senha"
                        placeholder="MinhaSenh@123"
                        required
                        showStrengthIndicator
                        rules={{
                            required: 'Senha é obrigatória',
                            minLength: {
                                value: 8,
                                message: 'Senha deve ter pelo menos 8 caracteres'
                            },
                        }}
                    />

                    {/* CRP */}
                    <CrpField
                        name="crp"
                        control={control}
                        label="CRP"
                        placeholder="06/123456"
                        required
                        rules={{
                            required: 'CRP é obrigatório',
                            pattern: {
                                value: /^\d{2}\/\d{6}$/,
                                message: 'CRP deve estar no formato XX/XXXXXX'
                            }
                        }}
                    />

                    {/* CPF */}
                    <CpfField
                        name="cpf"
                        control={control}
                        label="CPF"
                        placeholder="000.000.000-00"
                        required
                        rules={{
                            required: 'CPF é obrigatório',
                            validate: (value) => {
                                const cleanCpf = removeCpfMask(value);
                                if (cleanCpf.length !== 11) {
                                    return 'CPF deve conter 11 dígitos';
                                }
                                if (!isValidCpf(value)) {
                                    return 'CPF inválido';
                                }
                                return true;
                            }
                        }}
                    />

                    {/* Botões */}
                    <div className="flex space-x-4">
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={isLoading}
                            className="flex-1 justify-center"
                            icon="UserPlus"
                        >
                            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                        </Button>

                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleReset}
                            className="flex-1 justify-center"
                        >
                            Limpar
                        </Button>
                    </div>
                </form>

                <div className="mt-6 text-center text-xs text-gray-500 space-y-2">
                    <div>
                        Já tem uma conta? <Link to="/login" className="underline hover:text-purple-500">Faça login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
