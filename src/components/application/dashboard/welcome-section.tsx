import { FC, useState } from "react";
import { cx } from "@/utils/cx";
import useUser from "@/store/useUser.store";
import { Button } from "@/components/base/buttons/button";
import { AIInsightsPanel } from "./ai-insights-panel";
import { NextSessionsSection } from "./next-sessions-section";
import { PerformanceSummarySection } from "./performance-summary-section";
import { PatientRegistrationModal } from "../patient-registration/patient-registration-modal";
import { SessionSchedulingModal } from "../session-scheduling/session-scheduling-modal";

interface WelcomeSectionProps {
    className?: string;
}

export const WelcomeSection: FC<WelcomeSectionProps> = ({ className }) => {
    const { user } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);

    return (
        <div className={cx("p-6 space-y-8", className)}>
            {/* Seção de Boas-vindas e Ações */}
            <div className="flex gap-6">
                {/* Card de Boas-vindas */}
                <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        Bem-vinda de volta, Dra.
                    </h1>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        {user.name}!
                    </h2>
                    <p className="text-gray-600 text-base">
                        Aqui está uma visão geral rápida da sua prática hoje.
                    </p>
                </div>

                {/* Card de Ações */}
                <div className="flex justify-center items-center bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex gap-3">
                        {/* Botão Add Paciente */}
                        <Button
                            variant="primary"
                            size="sm"
                            icon="UserPlus"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Add Paciente
                        </Button>

                        {/* Botão Agendar Sessão */}
                        <Button
                            variant="outline"
                            size="sm"
                            icon="Calendar"
                            onClick={() => setIsSessionModalOpen(true)}
                        >
                            Agendar Sessão
                        </Button>

                        {/* Botão Ver Análises */}
                        <Button variant="outline" size="sm" icon="BarChart3">
                            Ver Análises
                        </Button>
                    </div>
                </div>
            </div>

            {/* Painel de Insights de IA */}
            <AIInsightsPanel />

            {/* Seção de Próximas Sessões */}
            <NextSessionsSection />

            {/* Seção de Resumo de Desempenho */}
            <PerformanceSummarySection />

            {/* Modal de Cadastro de Paciente */}
            <PatientRegistrationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            {/* Modal de Agendamento de Sessão */}
            <SessionSchedulingModal
                isOpen={isSessionModalOpen}
                onClose={() => setIsSessionModalOpen(false)}
            />
        </div>
    );
};
