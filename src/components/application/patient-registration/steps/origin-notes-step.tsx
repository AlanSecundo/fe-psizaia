import { FC } from "react";
import { TextField } from "@/components/base/inputs/form-inputs";
import { Control } from "react-hook-form";
import { SelectField } from "@/components/base/inputs/form-inputs";
import { PatientFormData } from "@/types/patientForm";

interface OriginNotesStepProps {
    className?: string;
    control: Control<PatientFormData>;
}

export const OriginNotesStep: FC<OriginNotesStepProps> = ({ className, control }) => {
    return (
        <div className={`${className || ''}`}>
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Origem e Notas
                </h3>
                <p className="text-sm text-gray-600">
                    Informações sobre como o paciente chegou até a clínica e notas internas
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Coluna Esquerda */}
                <div>
                    <SelectField
                        name="originNotes.referralSource"
                        control={control}
                        label="Como o paciente chegou até você?"
                        placeholder="Selecionar origem"
                        options={[
                            { value: "", label: "Selecionar origem" },
                            { value: "google", label: "Google" },
                            { value: "facebook", label: "Facebook" },
                            { value: "instagram", label: "Instagram" },
                            { value: "indicacao", label: "Indicação de paciente" },
                            { value: "indicacao-medico", label: "Indicação médica" },
                            { value: "site-clinica", label: "Site da clínica" },
                            { value: "panfletos", label: "Panfletos" },
                            { value: "outdoor", label: "Outdoor" },
                            { value: "radio", label: "Rádio" },
                            { value: "tv", label: "TV" },
                            { value: "jornal", label: "Jornal" },
                            { value: "outro", label: "Outro" }
                        ]}
                    />
                </div>
            </div>

            {/* Coluna Direita */}
            <TextField
                name="originNotes.notes"
                control={control}
                label="Notas Internas (Apenas Psicólogo)"
                multiline
                rows={6}
                placeholder="Quaisquer notas sobre o paciente ou caso"
            />
        </div>
    );
};
