import { FC, ReactNode } from "react";
import { cx } from "@/utils/cx";
import * as LucideIcons from "lucide-react";

interface ButtonProps {
    children: ReactNode;
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    icon?: keyof typeof LucideIcons;
    iconPosition?: "left" | "right";
}

export const Button: FC<ButtonProps> = ({
    children,
    variant = "outline",
    size = "md",
    className,
    onClick,
    disabled = false,
    type = "button",
    icon,
    iconPosition = "left"
}) => {
    const baseStyles = "flex items-center gap-2 rounded-lg font-medium transition-colors hover:cursor-pointer";

    const variantStyles = {
        primary: "bg-purple-500 text-white hover:bg-purple-700",
        secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
        outline: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
    };

    const sizeStyles = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-3 text-base",
        lg: "px-6 py-4 text-lg"
    };

    const iconSizes = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6"
    };

    const disabledStyles = disabled
        ? "opacity-50 cursor-not-allowed hover:cursor-not-allowed"
        : "";

    const IconComponent = icon ? LucideIcons[icon] as any : null;

    const renderIcon = () => {
        if (!IconComponent) return null;
        return <IconComponent className={cx(
            iconSizes[size],
            "transition-all duration-200",
            iconPosition === "right" && "group-hover:translate-x-1 group-hover:text-purple-500"
        )} />;
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={cx(
                baseStyles,
                variantStyles[variant],
                sizeStyles[size],
                disabledStyles,
                className
            )}
        >
            {icon && iconPosition === "left" && renderIcon()}
            {children}
            {icon && iconPosition === "right" && renderIcon()}
        </button>
    );
};
