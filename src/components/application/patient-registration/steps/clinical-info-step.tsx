import { FC } from "react";
import { Control, useWatch } from "react-hook-form";
import { TextField, RadioGroupField } from "@/components/base/inputs/form-inputs";
import { PatientFormData } from "@/types/patientForm";
import { PhoneField } from "@/components/base/inputs/phone-field";

interface ClinicalInfoStepProps {
    className?: string;
    control: Control<PatientFormData>;
}

export const ClinicalInfoStep: FC<ClinicalInfoStepProps> = ({ className, control }) => {
    // Observar o valor do campo hasPsychiatricFollowUp
    const hasPsychiatricFollowUp = useWatch({
        control,
        name: "clinicalInfo.hasPsychiatricFollowUp"
    });

    return (
        <div className={`${className || ''}`}>
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Informações Clínicas
                </h3>
                <p className="text-sm text-gray-600">
                    Informações médicas e preferências de horário
                </p>
            </div>

            <div className="mt-4">
                {/* Text Areas Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <TextField
                        name="clinicalInfo.medicalHistory"
                        control={control}
                        label="Queixa Inicial"
                        multiline
                        rows={4}
                        placeholder="Descreva brevemente o motivo da consulta"
                    />

                    <TextField
                        name="clinicalInfo.currentMedications"
                        control={control}
                        label="Medicamentos Atuais"
                        multiline
                        rows={4}
                        placeholder="Liste medicamentos atuais, dosagens e frequência"
                    />
                </div>

                {/* Acompanhamento Psiquiátrico */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <RadioGroupField
                        name="clinicalInfo.hasPsychiatricFollowUp"
                        control={control}
                        label="Realiza acompanhamento psiquiátrico?"
                        options={[
                            { value: true, label: "Sim" },
                            { value: false, label: "Não" }
                        ]}
                    />

                    {/* Nome do Médico Psiquiatra - Condicional */}
                    {hasPsychiatricFollowUp === true && (
                        <TextField
                            name="clinicalInfo.doctorName"
                            control={control}
                            label="Nome do Médico Psiquiatra"
                            type="text"
                            placeholder="Nome completo do psiquiatra"
                        />
                    )}
                </div>

                {/* Especialidade e Telefone do Médico - Condicionais */}
                {hasPsychiatricFollowUp === true && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField
                            name="clinicalInfo.doctorSpecialty"
                            control={control}
                            label="Especialidade do Médico"
                            type="text"
                            placeholder="Ex: Psiquiatria, Psiquiatria Infantil"
                        />

                        <PhoneField
                            name="clinicalInfo.doctorPhone"
                            control={control}
                            label="Telefone do Médico"
                            placeholder="(11) 99999-9999"
                        />
                    </div>
                )}


                {/* Preferred Time Slots */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                        Períodos Preferidos
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                                Manhã (8:00 - 12:00)
                            </span>
                        </label>

                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                                Tarde (12:00 - 18:00)
                            </span>
                        </label>

                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                                Noite (18:00 - 22:00)
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};
