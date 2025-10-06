import { FC } from "react";
import { cx } from "@/utils/cx";
import { PerformanceMetricCard } from "./performance-metric-card";
import { Users, DollarSign, TrendingUp, Lightbulb, CreditCard, Calendar, AlertTriangle, UserX } from "lucide-react";

interface PerformanceSummarySectionProps {
    className?: string;
}

export const PerformanceSummarySection: FC<PerformanceSummarySectionProps> = ({ className }) => {
    const metrics = [
        {
            title: "Total de Pacientes",
            value: "128",
            subtitle: "+8 desde o mês passado",
            icon: <Users className="w-5 h-5 text-gray-500" />,
            valueColor: "teal" as const
        },
        {
            title: "Lucro Mensal",
            value: "$5.800",
            subtitle: "+15% vs mês passado",
            icon: <DollarSign className="w-5 h-5 text-gray-500" />,
            valueColor: "gray" as const
        },
        {
            title: "Lucro Previsto",
            value: "$1.200",
            subtitle: "12 sessões futuras",
            icon: <TrendingUp className="w-5 h-5 text-gray-500" />,
            valueColor: "gray" as const
        },
        {
            title: "Avaliação Média da Sessão",
            value: "4.9/5",
            subtitle: "Consistente",
            icon: <Lightbulb className="w-5 h-5 text-gray-500" />,
            valueColor: "teal" as const
        },
        {
            title: "Custos Operacionais",
            value: "$2.400",
            subtitle: "-5% vs mês passado",
            icon: <CreditCard className="w-5 h-5 text-gray-500" />,
            valueColor: "gray" as const
        },
        {
            title: "Sessões Restantes",
            value: "47",
            subtitle: "até o final do mês",
            icon: <Calendar className="w-5 h-5 text-gray-500" />,
            valueColor: "teal" as const
        },
        {
            title: "Taxa de Inadimplência",
            value: "3.2%",
            subtitle: "2 pacientes em atraso",
            icon: <AlertTriangle className="w-5 h-5 text-gray-500" />,
            valueColor: "gray" as const
        },
        {
            title: "Risco de Churn",
            value: "12%",
            subtitle: "5 pacientes em risco",
            icon: <UserX className="w-5 h-5 text-gray-500" />,
            valueColor: "gray" as const
        }
    ];

    return (
        <div className={cx("", className)}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Resumo de Desempenho da Prática
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, index) => (
                    <PerformanceMetricCard
                        key={index}
                        title={metric.title}
                        value={metric.value}
                        subtitle={metric.subtitle}
                        icon={metric.icon}
                        valueColor={metric.valueColor}
                    />
                ))}
            </div>
        </div>
    );
};
