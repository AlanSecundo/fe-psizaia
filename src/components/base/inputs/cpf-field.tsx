import React from "react";
import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from "react-hook-form";

interface CpfFieldProps<T extends FieldValues> {
    name: FieldPath<T>;
    control: Control<T>;
    rules?: RegisterOptions<T>;
    label?: string;
    placeholder?: string;
    required?: boolean;
    className?: string;
    disabled?: boolean;
}

export const CpfField = <T extends FieldValues>({
    name,
    control,
    rules,
    label = "CPF",
    placeholder = "XXX.XXX.XXX-XX",
    required = false,
    className = "",
    disabled = false,
}: CpfFieldProps<T>) => {
    // Função para aplicar máscara de CPF
    const applyCpfMask = (value: string) => {
        const numbers = value.replace(/\D/g, "");
        let maskedValue = "";
        let numberIndex = 0;

        for (let i = 0; i < "XXX.XXX.XXX-XX".length && numberIndex < numbers.length; i++) {
            if ("XXX.XXX.XXX-XX"[i] === "X") {
                maskedValue += numbers[numberIndex];
                numberIndex++;
            } else {
                maskedValue += "XXX.XXX.XXX-XX"[i];
            }
        }

        return maskedValue;
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <div className={className}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {label} {required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={field.value || ''}
                        onChange={(e) => {
                            const maskedValue = applyCpfMask(e.target.value);
                            field.onChange(maskedValue);
                        }}
                        onBlur={field.onBlur}
                        disabled={disabled}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                    <div className="min-h-[20px] mt-1">
                        {fieldState.error && (
                            <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                        )}
                    </div>
                </div>
            )}
        />
    );
};
