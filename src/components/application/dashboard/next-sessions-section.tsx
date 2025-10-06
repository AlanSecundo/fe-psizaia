import { FC } from "react";
import { cx } from "@/utils/cx";
import { SessionCard } from "./session-card";

interface NextSessionsSectionProps {
    className?: string;
}

export const NextSessionsSection: FC<NextSessionsSectionProps> = ({ className }) => {
    const sessions = [
        {
            patientName: "Sofia Miller",
            sessionType: "Consulta Inicial",
            dateTime: "Hoje, 10:00"
        },
        {
            patientName: "Davi Chen",
            sessionType: "Terapia de Acompanhamento",
            dateTime: "Hoje, 11:30"
        },
        {
            patientName: "Maria Rodrigues",
            sessionType: "Aconselhamento de Casal",
            dateTime: "Hoje, 14:00"
        }
    ];

    const handleReschedule = (patientName: string) => {
        console.log(`Remarcar sessão para ${patientName}`);
    };

    const handleMoreOptions = (patientName: string) => {
        console.log(`Mais opções para ${patientName}`);
    };

    return (
        <div className={cx("", className)}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Próximas Sessões com Pacientes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessions.map((session, index) => (
                    <SessionCard
                        key={index}
                        patientName={session.patientName}
                        sessionType={session.sessionType}
                        dateTime={session.dateTime}
                        onReschedule={() => handleReschedule(session.patientName)}
                        onMoreOptions={() => handleMoreOptions(session.patientName)}
                    />
                ))}
            </div>
        </div>
    );
};
