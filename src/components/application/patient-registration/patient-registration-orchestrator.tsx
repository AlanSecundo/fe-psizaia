import { FC, useState, useEffect } from "react";
import { cx } from "@/utils/cx";
import { X } from "lucide-react";

// Import all step components
import { IdentificationStep } from "./steps/identification-step";
import { ContactStep } from "./steps/contact-step";
import { EmergencyContactStep } from "./steps/emergency-contact-step";
import { ClinicalInfoStep } from "./steps/clinical-info-step";
import { BillingInsuranceStep } from "./steps/billing-insurance-step";
import { OriginNotesStep } from "./steps/origin-notes-step";
import { SuccessStep } from "./steps/success-step";

interface PatientRegistrationOrchestratorProps {
    isOpen: boolean;
    onClose: () => void;
    onScheduleSession?: () => void;
}

export const PatientRegistrationOrchestrator: FC<PatientRegistrationOrchestratorProps> = ({
    isOpen,
    onClose,
    onScheduleSession
}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');
    const totalSteps = 6;

    // Função para resetar o modal para o estado inicial
    const resetModal = () => {
        setCurrentStep(1);
        setShowSuccess(false);
        setIsAnimating(false);
        setDirection('next');
    };

    // Função para fechar o modal com reset
    const handleClose = () => {
        resetModal();
        onClose();
    };

    // Reset modal quando fechado
    useEffect(() => {
        if (!isOpen) {
            resetModal();
        }
    }, [isOpen]);

    // Função para navegar entre passos com animação
    const navigateStep = (newStep: number) => {
        if (isAnimating) return;

        setIsAnimating(true);
        setDirection(newStep > currentStep ? 'next' : 'prev');

        setTimeout(() => {
            setCurrentStep(newStep);
            setTimeout(() => {
                setIsAnimating(false);
            }, 150);
        }, 150);
    };

    // Função para ir para o próximo passo
    const goToNextStep = () => {
        if (currentStep === totalSteps) {
            setShowSuccess(true);
        } else {
            navigateStep(Math.min(totalSteps, currentStep + 1));
        }
    };

    // Função para ir para o passo anterior
    const goToPrevStep = () => {
        navigateStep(Math.max(1, currentStep - 1));
    };

    // Componente wrapper para animações dos passos
    const StepWrapper = ({ children, step }: { children: React.ReactNode; step: number }) => {
        const isActive = currentStep === step;
        const isVisible = isActive && !isAnimating;

        return (
            <div
                className={cx(
                    "transition-all duration-300 ease-in-out overflow-hidden",
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0",
                    direction === 'next' && !isVisible ? "translate-x-4" : "",
                    direction === 'prev' && !isVisible ? "-translate-x-4" : ""
                )}
                style={{
                    display: isActive ? 'block' : 'none'
                }}
            >
                {children}
            </div>
        );
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-hidden">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Cadastro de Paciente
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Passo {currentStep} de {totalSteps}
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="px-6 py-4 bg-gray-50">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto overflow-x-hidden max-h-[calc(90vh-200px)]">
                    {/* Success Screen */}
                    {showSuccess ? (
                        <SuccessStep
                            onClose={handleClose}
                            onScheduleSession={() => {
                                handleClose(); // Fecha o modal de cadastro
                                // Chama a função callback para abrir o modal de agendamento
                                if (onScheduleSession) {
                                    setTimeout(() => {
                                        onScheduleSession();
                                    }, 100);
                                }
                            }}
                        />
                    ) : (
                        <>
                            {/* Passo 1: Identificação */}
                            <StepWrapper step={1}>
                                <IdentificationStep />
                            </StepWrapper>

                            {/* Passo 2: Contato */}
                            <StepWrapper step={2}>
                                <ContactStep />
                            </StepWrapper>

                            {/* Passo 3: Contato de Emergência */}
                            <StepWrapper step={3}>
                                <EmergencyContactStep />
                            </StepWrapper>

                            {/* Passo 4: Informações Clínicas */}
                            <StepWrapper step={4}>
                                <ClinicalInfoStep />
                            </StepWrapper>

                            {/* Passo 5: Cobrança e Seguro */}
                            <StepWrapper step={5}>
                                <BillingInsuranceStep />
                            </StepWrapper>

                            {/* Passo 6: Origem e Notas */}
                            <StepWrapper step={6}>
                                <OriginNotesStep />
                            </StepWrapper>
                        </>
                    )}
                </div>

                {/* Footer */}
                {!showSuccess && (
                    <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
                        <button
                            onClick={goToPrevStep}
                            disabled={currentStep === 1}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Anterior
                        </button>

                        <div className="flex space-x-2">
                            {Array.from({ length: totalSteps }, (_, i) => (
                                <div
                                    key={i}
                                    className={cx(
                                        "w-2 h-2 rounded-full",
                                        i + 1 <= currentStep ? "bg-purple-500" : "bg-gray-300"
                                    )}
                                />
                            ))}
                        </div>

                        <button
                            onClick={goToNextStep}
                            disabled={currentStep > totalSteps}
                            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {currentStep === totalSteps ? "Finalizar" : "Próximo"}
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};
