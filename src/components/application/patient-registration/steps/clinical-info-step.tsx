import { FC } from "react";
import { TextField } from "@/components/base/inputs/text-field";

interface ClinicalInfoStepProps {
    className?: string;
}

export const ClinicalInfoStep: FC<ClinicalInfoStepProps> = ({ className }) => {
    return (
        <div className={`space-y-6 ${className || ''}`}>
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Informações Clínicas
                </h3>
                <p className="text-sm text-gray-600">
                    Informações médicas e preferências de horário
                </p>
            </div>

            <div className="space-y-6">
                {/* Text Areas Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextField
                        label="Queixa Inicial"
                        multiline
                        rows={4}
                        placeholder="Descreva brevemente o motivo da consulta"
                    />

                    <TextField
                        label="Medicamentos Atuais"
                        multiline
                        rows={4}
                        placeholder="Liste medicamentos atuais, dosagens e frequência"
                    />
                </div>

                {/* Physician Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextField
                        label="Nome do Médico Atual"
                        type="text"
                        placeholder="Nome completo do médico"
                    />

                    <TextField
                        label="Especialidade do Médico"
                        type="text"
                        placeholder="Ex: Cardiologia, Clínica Geral"
                    />
                </div>

                <TextField
                    label="Telefone do Médico (Telefone)"
                    type="tel"
                    placeholder="(XX) XXXXX-XXXX"
                />

                {/* Preferred Time Slots */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                        Horários Preferidos
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
