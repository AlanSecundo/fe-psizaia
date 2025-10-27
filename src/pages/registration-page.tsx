import React from 'react';
import { useForm } from 'react-hook-form';
import { useUserRegistration } from '@/hooks';
import { TextField } from '@/components/base/inputs/form-inputs';
import { CpfField } from '@/components/base/inputs/cpf-field';
import { CrpField } from '@/components/base/inputs/crp-field';
import { PasswordField } from '@/components/base/inputs/password-field';
import { Button } from '@/components/base/buttons/button';
import { isValidCpf, removeCpfMask } from '@/utils/cpf-validation';
import type { UserRegistrationRequest } from '@/types/userRegistration';

export const RegistrationPage: React.FC = () => {
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

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Cadastro de Usuário
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Preencha os dados abaixo para criar sua conta
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* Mensagens de feedback */}
                    {isSuccess && (
                        <div className="rounded-md bg-green-50 p-4">
                            <div className="flex">
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-green-800">
                                        Sucesso!
                                    </h3>
                                    <div className="mt-2 text-sm text-green-700">
                                        <p>Usuário cadastrado com sucesso!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {isError && (
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">
                                        Erro
                                    </h3>
                                    <div className="mt-2 text-sm text-red-700">
                                        <p>{error?.message || 'Erro desconhecido'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
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
                    </div>

                    {/* Botões */}
                    <div className="flex space-x-4">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1"
                        >
                            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                        </Button>

                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleReset}
                            className="flex-1"
                        >
                            Limpar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
