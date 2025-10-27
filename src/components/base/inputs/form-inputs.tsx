import { FC, useId } from "react";
import { Controller, Control, FieldPath, FieldValues } from "react-hook-form";
import { cx } from "@/utils/cx";

const BASE_INPUT_CLASSES = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none focus:outline-none transition-colors";

type CommonProps = {
    label: string;
    className?: string;
    containerClassName?: string;
    required?: boolean;
    id?: string;
};

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & CommonProps & {
    multiline?: false;
    mask?: (value: string) => string;
};

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & CommonProps & {
    multiline: true;
    rows?: number;
};

type TextFieldPropsLegacy = InputProps | TextareaProps;

// Tipos para o componente com React Hook Form
type TextFieldProps<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<T>;
    rules?: any;
    label: string;
    className?: string;
    containerClassName?: string;
    required?: boolean;
    id?: string;
    type?: string;
    placeholder?: string;
    multiline?: boolean;
    rows?: number;
    mask?: (value: string) => string;
};

export const TextFieldLegacy: FC<TextFieldPropsLegacy> = (props) => {
    const autoId = useId();
    const fieldId = props.id || autoId;
    const { className, containerClassName, label, required } = props as CommonProps;

    return (
        <div className={containerClassName}>
            <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 mb-2">
                {label} {required ? <span className="text-red-500">*</span> : null}
            </label>
            {(props as any).multiline ? (
                <textarea
                    id={fieldId}
                    rows={(props as TextareaProps).rows ?? 4}
                    {...(props as Omit<TextareaProps, keyof CommonProps | "multiline">)}
                    className={cx(BASE_INPUT_CLASSES, className)}
                />
            ) : (
                <input
                    id={fieldId}
                    {...(props as Omit<InputProps, keyof CommonProps | "multiline" | "mask">)}
                    onChange={(e) => {
                        const p = props as InputProps;
                        if (p.onChange) {
                            if (p.mask) {
                                const masked = p.mask(e.target.value);
                                // create synthetic event-like object with masked value
                                const cloned = { ...e, target: { ...e.target, value: masked } } as unknown as React.ChangeEvent<HTMLInputElement>;
                                p.onChange(cloned);
                            } else {
                                p.onChange(e);
                            }
                        }
                    }}
                    className={cx(BASE_INPUT_CLASSES, className)}
                />
            )}
        </div>
    );
};

// Componente TextField com React Hook Form integrado
export const TextField = <T extends FieldValues>({
    name,
    control,
    rules,
    label,
    className,
    containerClassName,
    required,
    id,
    type = "text",
    placeholder,
    multiline = false,
    rows = 4,
    mask
}: TextFieldProps<T>) => {
    const autoId = useId();
    const fieldId = id || autoId;

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <div className={containerClassName}>
                    <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 mb-2">
                        {label} {required ? <span className="text-red-500">*</span> : null}
                    </label>

                    {multiline ? (
                        <textarea
                            id={fieldId}
                            rows={rows}
                            {...field}
                            placeholder={placeholder}
                            className={cx(BASE_INPUT_CLASSES, className)}
                        />
                    ) : (
                        <input
                            id={fieldId}
                            type={type}
                            {...field}
                            placeholder={placeholder}
                            onChange={(e) => {
                                if (mask) {
                                    const masked = mask(e.target.value);
                                    field.onChange(masked);
                                } else {
                                    field.onChange(e);
                                }
                            }}
                            className={cx(BASE_INPUT_CLASSES, className)}
                        />
                    )}

                    {/* Espaço reservado para erros */}
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

// Componente Select com React Hook Form integrado
export const SelectField = <T extends FieldValues>({
    name,
    control,
    rules,
    label,
    className,
    containerClassName,
    required,
    id,
    placeholder,
    options
}: TextFieldProps<T> & { options: { value: string; label: string }[] }) => {
    const autoId = useId();
    const fieldId = id || autoId;

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <div className={containerClassName}>
                    <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 mb-2">
                        {label} {required ? <span className="text-red-500">*</span> : null}
                    </label>

                    <select
                        id={fieldId}
                        {...field}
                        className={cx(BASE_INPUT_CLASSES, className)}
                    >
                        <option value="">{placeholder || `Selecionar ${label.toLowerCase()}`}</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    {/* Espaço reservado para erros */}
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

export const inputClasses = BASE_INPUT_CLASSES;

// Export dos campos especiais
export { DateField } from './date-field';
export { CpfField } from './cpf-field';
export { CheckboxField } from './checkbox-field';
export { PhoneField } from './phone-field';
export { RadioGroupField } from './radio-group-field';
export { CurrencyField } from './currency-field';


