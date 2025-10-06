import { FC, useState, ReactNode } from "react";
import { cx } from "@/utils/cx";
import { ChevronDown } from "lucide-react";

interface CollapsiblePanelProps {
    title: string;
    subtitle?: string;
    icon?: ReactNode;
    children: ReactNode;
    defaultExpanded?: boolean;
    className?: string;
}

export const CollapsiblePanel: FC<CollapsiblePanelProps> = ({
    title,
    subtitle,
    icon,
    children,
    defaultExpanded = true,
    className
}) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={cx(
            "bg-white rounded-lg border border-gray-200 shadow-sm",
            className
        )}>
            {/* Header */}
            <button
                onClick={toggleExpanded}
                className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors duration-300"
            >
                <div className="flex items-center gap-3">
                    {icon && (
                        <div className="flex-shrink-0">
                            {icon}
                        </div>
                    )}
                    <div className="text-left">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {title}
                        </h3>
                        {subtitle && (
                            <p className="text-sm text-gray-600 mt-1">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex-shrink-0">
                    <div className={cx(
                        "transition-transform duration-500 ease-in-out",
                        isExpanded ? "rotate-180" : "rotate-0"
                    )}>
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                    </div>
                </div>
            </button>

            {/* Content */}
            <div className={cx(
                "overflow-hidden transition-all duration-500 ease-in-out",
                isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            )}>
                <div className="px-6 pb-6">
                    {children}
                </div>
            </div>
        </div>
    );
};
