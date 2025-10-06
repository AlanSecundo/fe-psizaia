import { FC, ReactNode } from "react";
import { cx } from "@/utils/cx";

interface PerformanceMetricCardProps {
    title: string;
    value: string;
    subtitle: string;
    icon: ReactNode;
    valueColor?: "teal" | "gray";
}

export const PerformanceMetricCard: FC<PerformanceMetricCardProps> = ({
    title,
    value,
    subtitle,
    icon,
    valueColor = "gray"
}) => {
    const valueColors = {
        teal: "text-teal-600",
        gray: "text-gray-900"
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">
                    {title}
                </h3>
                <div className="flex-shrink-0">
                    {icon}
                </div>
            </div>

            <div className="space-y-1">
                <p className={cx(
                    "text-3xl font-bold",
                    valueColors[valueColor]
                )}>
                    {value}
                </p>
                <p className="text-sm text-gray-600">
                    {subtitle}
                </p>
            </div>
        </div>
    );
};
