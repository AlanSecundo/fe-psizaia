import { FC } from "react";
import { Control } from "react-hook-form";
import { TextField, SelectField } from "@/components/base/inputs/form-inputs";
import { PhoneField } from "@/components/base/inputs/phone-field";
import { PatientFormData } from "@/types/patientForm";

interface EmergencyContactStepProps {
    className?: string;
    control: Control<PatientFormData>;
}

export const EmergencyContactStep: FC<EmergencyContactStepProps> = ({ className, control }) => {
    return (
        <div className={`${className || ''}`}>
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Contato de Emergência
                </h3>
                <p className="text-sm text-gray-600">
                    Informações de contato para emergências
                </p>
            </div>

            <div className="mt-4">
                <TextField
                    name="emergencyContact.emergencyContactName"
                    control={control}
                    label="Nome do Contato de Emergência"
                    required
                    type="text"
                    placeholder="Nome completo do contato de emergência"
                />

                <div>
                    <SelectField
                        name="emergencyContact.emergencyContactRelationship"
                        control={control}
                        label="Relacionamento"
                        placeholder="Selecionar relacionamento"
                        options={[
                            { value: "conjuge", label: "Cônjuge" },
                            { value: "filho", label: "Filho(a)" },
                            { value: "pai", label: "Pai" },
                            { value: "mae", label: "Mãe" },
                            { value: "irmao", label: "Irmão(ã)" },
                            { value: "avos", label: "Avô/Avó" },
                            { value: "tio", label: "Tio(a)" },
                            { value: "primo", label: "Primo(a)" },
                            { value: "amigo", label: "Amigo(a)" },
                            { value: "outro", label: "Outro" }
                        ]}
                    />

                </div>

                <PhoneField
                    name="emergencyContact.emergencyContactPhone"
                    control={control}
                    label="Telefone de Emergência (Telefone)"
                    required
                    placeholder="(XX) XXXXX-XXXX"
                />
            </div>
        </div>
    );
};
