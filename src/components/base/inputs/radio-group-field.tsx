import React from "react";
import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from "react-hook-form";

interface RadioOption {
    value: string | boolean | number;
    label: string;
}

interface RadioGroupFieldProps<T extends FieldValues> {
    name: FieldPath<T>;
    control: Control<T>;
    rules?: RegisterOptions<T>;
    label: string;
    options: RadioOption[];
    className?: string;
    disabled?: boolean;
    required?: boolean;
    orientation?: 'horizontal' | 'vertical';
}

export const RadioGroupField = <T extends FieldValues>({
    name,
    control,
    rules,
    label,
    options,
    className = "",
    disabled = false,
    required = false,
    orientation = 'horizontal',
}: RadioGroupFieldProps<T>) => {
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

                    <div className={`flex ${orientation === 'horizontal' ? 'gap-4' : 'flex-col gap-2'}`}>
                        {options.map((option, index) => (
                            <label key={index} className="inline-flex items-center gap-2">
                                <input
                                    type="radio"
                                    value={option.value}
                                    checked={field.value === option.value}
                                    onChange={() => field.onChange(option.value)}
                                    onBlur={field.onBlur}
                                    disabled={disabled}
                                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                />
                                <span className="text-sm text-gray-700">{option.label}</span>
                            </label>
                        ))}
                    </div>

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
