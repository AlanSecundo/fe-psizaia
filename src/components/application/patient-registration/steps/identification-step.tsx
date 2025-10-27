import { FC } from "react";
import { Control } from "react-hook-form";
import { SelectField, TextField, DateField, CpfField, CheckboxField } from "@/components/base/inputs/form-inputs";
import { PatientFormData } from "@/types/patientForm";

interface IdentificationStepProps {
    className?: string;
    control: Control<PatientFormData>;
}

export const IdentificationStep: FC<IdentificationStepProps> = ({ className, control }) => {
    return (
        <div className={`${className || ''}`}>
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Identificação
                </h3>
                <p className="text-sm text-gray-600">
                    Informações básicas do paciente
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                {/* Linha 1: Nome Completo + Nome Social */}
                <div className="space-y-4">
                    <TextField
                        name="identification.fullName"
                        control={control}
                        rules={{
                            required: 'Nome completo é obrigatório',
                            minLength: { value: 2, message: 'Nome deve ter pelo menos 2 caracteres' }
                        }}
                        label="Nome Completo"
                        required
                        type="text"
                        placeholder="Nome completo legal do paciente"
                    />
                </div>

                <div className="space-y-4">
                    <TextField
                        name="identification.socialName"
                        control={control}
                        label="Nome Social"
                        type="text"
                        placeholder="Nome preferido (opcional)"
                    />
                </div>

                {/* Linha 2: Data de Nascimento + CPF */}
                <div className="space-y-4">
                    <DateField
                        name="identification.birthDate"
                        control={control}
                        rules={{
                            required: 'Data de nascimento é obrigatória',
                            pattern: {
                                value: /^\d{2}\/\d{2}\/\d{4}$/,
                                message: 'Data deve estar no formato DD/MM/AAAA'
                            }
                        }}
                        label="Data de Nascimento (DD/MM/AAAA)"
                        placeholder="DD/MM/AAAA"
                        required
                    />
                </div>

                <div className="space-y-4">
                    <CpfField
                        name="identification.cpf"
                        control={control}
                        rules={{
                            pattern: {
                                value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                                message: 'CPF deve estar no formato XXX.XXX.XXX-XX'
                            }
                        }}
                        label="CPF"
                        placeholder="XXX.XXX.XXX-XX"
                    />
                </div>

                {/* Linha 3: Gênero + Maior de 18 */}
                <div className="space-y-4">
                    <SelectField
                        name="identification.gender"
                        control={control}
                        rules={{ required: 'Gênero é obrigatório' }}
                        label="Gênero"
                        required
                        placeholder="Selecionar gênero"
                        options={[
                            { value: "masculino", label: "Masculino" },
                            { value: "feminino", label: "Feminino" },
                            { value: "outro", label: "Outro" },
                            { value: "nao-informar", label: "Prefiro não informar" }
                        ]}
                    />
                </div>

                <div className="space-y-4 mt-8">
                    <CheckboxField
                        name="identification.isOver18"
                        control={control}
                        label="Paciente maior de 18 anos?"
                        id="over-18"
                    />
                </div>

                {/* Linha 4: Estado Civil (opcional) */}
                <div className="space-y-4">
                    <SelectField
                        name="identification.maritalStatus"
                        control={control}
                        label="Estado civil (opcional)"
                        placeholder="Selecionar estado civil"
                        options={[
                            { value: "solteiro", label: "Solteiro(a)" },
                            { value: "casado", label: "Casado(a)" },
                            { value: "divorciado", label: "Divorciado(a)" },
                            { value: "viuvo", label: "Viúvo(a)" },
                            { value: "uniao-estavel", label: "União Estável" },
                            { value: "prefiro-nao-informar", label: "Prefiro não informar" }
                        ]}
                    />
                </div>

                <div className="space-y-4">
                    {/* Campo vazio para manter o layout */}
                </div>
            </div>
        </div>
    );
};
