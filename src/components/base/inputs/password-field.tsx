import React, { useState } from "react";
import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps<T extends FieldValues> {
    name: FieldPath<T>;
    control: Control<T>;
    rules?: RegisterOptions<T>;
    label?: string;
    placeholder?: string;
    required?: boolean;
    className?: string;
    disabled?: boolean;
    showStrengthIndicator?: boolean;
}

export const PasswordField = <T extends FieldValues>({
    name,
    control,
    rules,
    label = "Senha",
    placeholder = "Digite sua senha",
    required = false,
    className = "",
    disabled = false,
    showStrengthIndicator = false,
}: PasswordFieldProps<T>) => {
    const [showPassword, setShowPassword] = useState(false);

    // Função para calcular força da senha
    const getPasswordStrength = (password: string) => {
        if (!password) return { score: 0, label: "", color: "" };

        let score = 0;
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[@$!%*?&]/.test(password)) score++;

        const strength = {
            0: { label: "Muito fraca", color: "bg-red-500" },
            1: { label: "Fraca", color: "bg-red-400" },
            2: { label: "Regular", color: "bg-yellow-400" },
            3: { label: "Boa", color: "bg-yellow-500" },
            4: { label: "Forte", color: "bg-green-400" },
            5: { label: "Muito forte", color: "bg-green-500" },
        };

        return { score, ...strength[score as keyof typeof strength] };
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => {
                const strength = showStrengthIndicator ? getPasswordStrength(field.value || '') : null;

                return (
                    <div className={className}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {label} {required && <span className="text-red-500">*</span>}
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder={placeholder}
                                value={field.value || ''}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                disabled={disabled}
                                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                disabled={disabled}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>

                        {/* Indicador de força da senha */}
                        {showStrengthIndicator && field.value && (
                            <div className="mt-2">
                                <div className="flex items-center space-x-2">
                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-300 ${strength?.color}`}
                                            style={{ width: `${(strength?.score || 0) * 20}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-gray-600">
                                        {strength?.label}
                                    </span>
                                </div>
                            </div>
                        )}

                        <div className="min-h-[20px] mt-1">
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    </div>
                );
            }}
        />
    );
};
