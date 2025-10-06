import { FC, useId } from "react";
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

type TextFieldProps = InputProps | TextareaProps;

export const TextField: FC<TextFieldProps> = (props) => {
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

export const inputClasses = BASE_INPUT_CLASSES;


