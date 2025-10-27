import React from "react";
import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from "react-hook-form";

interface CrpFieldProps<T extends FieldValues> {
    name: FieldPath<T>;
    control: Control<T>;
    rules?: RegisterOptions<T>;
    label?: string;
    placeholder?: string;
    required?: boolean;
    className?: string;
    disabled?: boolean;
}

export const CrpField = <T extends FieldValues>({
    name,
    control,
    rules,
    label = "CRP",
    placeholder = "XX/XXXXXX",
    required = false,
    className = "",
    disabled = false,
}: CrpFieldProps<T>) => {
    const applyCrpMask = (value: string) => {
        const numbers = value.replace(/\D/g, "");
        let maskedValue = "";
        let numberIndex = 0;

        for (let i = 0; i < "XX/XXXXXX".length && numberIndex < numbers.length; i++) {
            if ("XX/XXXXXX"[i] === "X") {
                maskedValue += numbers[numberIndex];
                numberIndex++;
            } else {
                maskedValue += "XX/XXXXXX"[i];
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
                            const maskedValue = applyCrpMask(e.target.value);
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
