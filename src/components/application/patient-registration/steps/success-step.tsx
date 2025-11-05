import { FC } from "react";

interface SuccessStepProps {
    patientName: string;
    onClose: () => void;
    onScheduleSession: () => void;
    className?: string;
}

export const SuccessStep: FC<SuccessStepProps> = ({ patientName, onClose, onScheduleSession, className }) => {
    return (
        <div className={`text-center py-8 ${className || ''}`}>
            <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Cadastro Concluído!
                </h3>
                <p className="text-gray-600 mb-6">
                    {patientName} agora é seu paciente! Você gostaria de agendar as sessões?
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    onClick={onClose}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Ainda não
                </button>
                <button
                    onClick={onScheduleSession}
                    className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                    Agendar sessão
                </button>
            </div>
        </div>
    );
};
