import React from "react";
import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from "react-hook-form";
import CurrencyInput from "react-currency-input-field";

interface CurrencyFieldProps<T extends FieldValues> {
    name: FieldPath<T>;
    control: Control<T>;
    rules?: RegisterOptions<T>;
    label?: string;
    placeholder?: string;
    required?: boolean;
    className?: string;
    disabled?: boolean;
}

export const CurrencyField = <T extends FieldValues>({
    name,
    control,
    rules,
    label = "Valor",
    placeholder = "R$ 0,00",
    required = false,
    className = "",
    disabled = false,
}: CurrencyFieldProps<T>) => {
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
                    <CurrencyInput
                        id={name}
                        name={field.name}
                        placeholder={placeholder}
                        value={field.value}
                        onValueChange={(value) => {
                            field.onChange(value || '');
                        }}
                        onBlur={field.onBlur}
                        disabled={disabled}
                        prefix="R$ "
                        decimalsLimit={2}
                        decimalSeparator=","
                        groupSeparator="."
                        allowNegativeValue={false}
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
