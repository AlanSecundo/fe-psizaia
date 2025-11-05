import { FC, useState, useEffect } from "react";
import { cx } from "@/utils/cx";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { PatientFormData } from "@/types/patientForm";
import { usePatientRegistration } from "@/hooks";
import { mapFormDataToApiRequest } from "@/utils/patient-form-mapper";

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

    // Hook para cadastro de pacientes
    const { registerPatient, isLoading, isSuccess, isError, error } = usePatientRegistration();

    // React Hook Form para gerenciar o formulário completo
    const { control, getValues, reset } = useForm<PatientFormData>({
        mode: 'onChange',
        defaultValues: {
            identification: {
                fullName: '',
                socialName: '',
                birthDate: '',
                gender: '',
                maritalStatus: '',
                cpf: '',
                isOver18: false,
            },
            contact: {
                email: '',
                phone: '',
                address: '',
                preferredContactMethod: '',
            },
            emergencyContact: {
                emergencyContactName: '',
                emergencyContactPhone: '',
                emergencyContactRelationship: '',
            },
            clinicalInfo: {
                medicalHistory: '',
                currentMedications: '',
                allergies: '',
                hasPsychiatricFollowUp: false,
                doctorName: '',
                doctorSpecialty: '',
            },
            billingInsurance: {
                insuranceProvider: '',
                insuranceNumber: '',
                hasInsurance: false,
                insurancePlan: '',
                insuranceCard: '',
                document: '',
                value: '',
                totalSessions: '',
                paymentMethodSelected: '',
            },
            originNotes: {
                referralSource: '',
                notes: '',
            },
        }
    });


    // Função para resetar o modal para o estado inicial
    const resetModal = () => {
        setCurrentStep(1);
        setShowSuccess(false);
        setIsAnimating(false);
        setDirection('next');
        reset();
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

    // Mostrar tela de sucesso quando o cadastro for bem-sucedido
    useEffect(() => {
        if (isSuccess) {
            setShowSuccess(true);
        }
    }, [isSuccess]);

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
            // Submeter formulário quando for o último step
            const formData = getValues();
            console.log('Dados do formulário:', formData);

            // Mapear dados do formulário para o formato da API
            const apiRequest = mapFormDataToApiRequest(formData, "8b55cc21-8865-4beb-8054-e464f41a1662"); // TODO: Pegar ID do psicólogo do contexto/estado

            // Chamar a API para cadastrar o paciente
            registerPatient(apiRequest);
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
                    {/* Error Message */}
                    {isError && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center">
                                <div className="w-5 h-5 text-red-500 mr-2">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-red-800">Erro no cadastro</h4>
                                    <p className="text-sm text-red-600 mt-1">
                                        {error?.message || "Ocorreu um erro ao cadastrar o paciente. Tente novamente."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Success Screen */}
                    {showSuccess ? (
                        <SuccessStep
                            patientName={getValues().identification.fullName}
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
                                <IdentificationStep control={control} />
                            </StepWrapper>

                            {/* Passo 2: Contato */}
                            <StepWrapper step={2}>
                                <ContactStep control={control} />
                            </StepWrapper>

                            {/* Passo 3: Contato de Emergência */}
                            <StepWrapper step={3}>
                                <EmergencyContactStep control={control} />
                            </StepWrapper>

                            {/* Passo 4: Informações Clínicas */}
                            <StepWrapper step={4}>
                                <ClinicalInfoStep control={control} />
                            </StepWrapper>

                            {/* Passo 5: Cobrança e Seguro */}
                            <StepWrapper step={5}>
                                <BillingInsuranceStep control={control} />
                            </StepWrapper>

                            {/* Passo 6: Origem e Notas */}
                            <StepWrapper step={6}>
                                <OriginNotesStep control={control} />
                            </StepWrapper>
                        </>
                    )}
                </div>

                {/* Footer */}
                {!showSuccess && (
                    <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
                        {
                            currentStep > 1 && (
                                <button
                                    onClick={goToPrevStep}
                                    disabled={currentStep === 1}
                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Anterior
                                </button>
                            )
                        }
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
                            disabled={currentStep > totalSteps || isLoading}
                            className={cx(
                                "px-4 py-2 rounded-lg transition-colors flex items-center gap-2",
                                currentStep > totalSteps || isLoading
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-purple-500 text-white hover:bg-purple-600"
                            )}
                        >
                            {isLoading && (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            )}
                            {currentStep === totalSteps ? (isLoading ? "Enviando..." : "Finalizar") : "Próximo"}
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};
