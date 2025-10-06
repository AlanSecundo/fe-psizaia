import { FC } from "react";
import { Button } from "@/components/base/buttons/button";
import { Clock, MoreHorizontal } from "lucide-react";
import { cx } from "@/utils/cx";

interface SessionCardProps {
    patientName: string;
    sessionType: string;
    dateTime: string;
    onReschedule: () => void;
    onMoreOptions: () => void;
}

export const SessionCard: FC<SessionCardProps> = ({
    patientName,
    sessionType,
    dateTime,
    onReschedule,
    onMoreOptions
}) => {
    // Gerar iniciais do nome
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Gerar cor de fundo baseada no nome (consistente)
    const getBackgroundColor = (name: string) => {
        const colors = [
            'bg-blue-500',
            'bg-green-500',
            'bg-purple-500',
            'bg-pink-500',
            'bg-indigo-500',
            'bg-teal-500',
            'bg-orange-500',
            'bg-red-500'
        ];

        const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[hash % colors.length];
    };
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm flex flex-col h-full">
            {/* Header com avatar, nome e menu */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={cx(
                        "w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0",
                        getBackgroundColor(patientName)
                    )}>
                        {getInitials(patientName)}
                    </div>
                    <div>
                        <h4 className="text-base font-semibold text-gray-900">
                            {patientName}
                        </h4>
                        <p className="text-sm text-gray-500">
                            {sessionType}
                        </p>
                    </div>
                </div>

                <button
                    onClick={onMoreOptions}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <MoreHorizontal className="w-5 h-5 text-gray-500" />
                </button>
            </div>

            {/* Data e hora */}
            <div className="flex items-center gap-2 mb-6">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                    {dateTime}
                </span>
            </div>

            {/* Botão de ação */}
            <div className="mt-auto">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onReschedule}
                    className="w-full group hover:bg-purple-100 hover:border-purple-300 transition-all duration-200"
                >
                    Remarcar
                </Button>
            </div>
        </div>
    );
};
