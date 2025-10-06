import { FC } from "react";
import { cx } from "@/utils/cx";
import { CollapsiblePanel } from "./collapsible-panel";
import { Button } from "@/components/base/buttons/button";
import { Sparkles, TrendingUp, Calendar, Heart } from "lucide-react";

interface InsightCardProps {
    title: string;
    description: string;
    metric?: {
        label: string;
        value: string;
        color?: "red" | "green" | "gray" | "blue";
    };
    actionButton: {
        label: string;
        onClick: () => void;
    };
    icon: React.ReactNode;
}

const InsightCard: FC<InsightCardProps> = ({
    title,
    description,
    metric,
    actionButton,
    icon
}) => {
    const metricColors = {
        red: "text-red-600",
        green: "text-green-600",
        gray: "text-gray-600",
        blue: "text-blue-600"
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0">
                    {icon}
                </div>
                <h4 className="text-base font-semibold text-gray-900">
                    {title}
                </h4>
            </div>

            <p className="text-gray-600 text-sm mb-4 flex-1">
                {description}
            </p>

            {metric && (
                <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">
                        {metric.label}
                    </p>
                    <p className={cx(
                        "text-2xl font-bold",
                        metricColors[metric.color || "gray"]
                    )}>
                        {metric.value}
                    </p>
                </div>
            )}

            <div className="mt-auto">
                <Button
                    variant="outline"
                    size="sm"
                    icon="ArrowRight"
                    iconPosition="right"
                    onClick={actionButton.onClick}
                    className="w-full group hover:bg-purple-100 hover:border-purple-300 transition-all duration-200"
                >
                    {actionButton.label}
                </Button>
            </div>
        </div>
    );
};

export const AIInsightsPanel: FC = () => {
    const insights = [
        {
            title: "Engajamento Preditivo do Paciente",
            description: "A análise de IA sugere que 3 pacientes estão em alto risco de desengajamento. Contato proativo pode melhorar as taxas de retenção.",
            metric: {
                label: "Pontuação de Risco de Desengajamento",
                value: "7.8/10",
                color: "red" as const
            },
            actionButton: {
                label: "Relatório de Engajamento",
                onClick: () => console.log("Ver Relatório de Engajamento")
            },
            icon: <Heart className="w-6 h-6 text-purple-500" />
        },
        {
            title: "Previsão de Resultado da Sessão",
            description: "O modelo de IA prevê uma taxa de sucesso 15% maior para pacientes seguindo planos de terapia personalizados. Revise as sugestões.",
            metric: {
                label: "Taxa de Sucesso Prevista",
                value: "85%",
                color: "green" as const
            },
            actionButton: {
                label: "Otimizar Planos de Terapia",
                onClick: () => console.log("Otimizar Planos de Terapia")
            },
            icon: <TrendingUp className="w-6 h-6 text-purple-500" />
        },
        {
            title: "Recomendação de Agendamento Otimizado",
            description: "A IA identificou 20 horários não utilizados no próximo mês, potencialmente aumentando as reservas em 8%. Automatize lembretes.",
            metric: {
                label: "Horários Disponíveis Detectados",
                value: "20 horários",
                color: "blue" as const
            },
            actionButton: {
                label: "Ajustar Agenda",
                onClick: () => console.log("Ajustar Agenda")
            },
            icon: <Calendar className="w-6 h-6 text-purple-500" />
        }
    ];

    return (
        <CollapsiblePanel
            title="Painel do Assistente de IA"
            subtitle="3 insights disponíveis: 2 positivos, 1 alto risco."
            icon={<Sparkles className="w-5 h-5 text-purple-500" />}
            defaultExpanded={true}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {insights.map((insight, index) => (
                    <InsightCard
                        key={index}
                        title={insight.title}
                        description={insight.description}
                        metric={insight.metric}
                        actionButton={insight.actionButton}
                        icon={insight.icon}
                    />
                ))}
            </div>
        </CollapsiblePanel>
    );
};
