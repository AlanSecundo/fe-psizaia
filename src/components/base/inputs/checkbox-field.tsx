import React from "react";
import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from "react-hook-form";

interface CheckboxFieldProps<T extends FieldValues> {
    name: FieldPath<T>;
    control: Control<T>;
    rules?: RegisterOptions<T>;
    label: string;
    id?: string;
    className?: string;
    disabled?: boolean;
    description?: string;
}

export const CheckboxField = <T extends FieldValues>({
    name,
    control,
    rules,
    label,
    id,
    className = "",
    disabled = false,
    description,
}: CheckboxFieldProps<T>) => {
    const fieldId = id || `checkbox-${name}`;

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <div className={className}>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id={fieldId}
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            onBlur={field.onBlur}
                            disabled={disabled}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                        <label htmlFor={fieldId} className="ml-2 text-sm text-gray-700">
                            {label}
                        </label>
                    </div>

                    {description && (
                        <p className="ml-6 text-xs text-gray-500 mt-1">
                            {description}
                        </p>
                    )}

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
