import { FC } from "react";
import { Control } from "react-hook-form";
import { TextField, SelectField, PhoneField } from "@/components/base/inputs/form-inputs";
import { PatientFormData } from "@/types/patientForm";

interface ContactStepProps {
    className?: string;
    control: Control<PatientFormData>;
}

export const ContactStep: FC<ContactStepProps> = ({ className, control }) => {
    return (
        <div className={`${className || ''}`}>
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Contato
                </h3>
                <p className="text-sm text-gray-600">
                    Informações de contato do paciente
                </p>
            </div>

            <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <TextField
                        name="contact.email"
                        control={control}
                        rules={{
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Email deve ter um formato válido'
                            }
                        }}
                        label="Email"
                        type="email"
                        placeholder="patient@example.com"
                    />

                    <PhoneField
                        name="contact.phone"
                        control={control}
                        rules={{
                            required: 'Telefone é obrigatório',
                            pattern: {
                                value: /^\(\d{2}\) \d{5}-\d{4}$/,
                                message: 'Telefone deve estar no formato (XX) XXXXX-XXXX'
                            }
                        }}
                        label="Mobile/WhatsApp (Telefone)"
                        placeholder="(XX) XXXXX-XXXX"
                        required
                    />
                </div>

                <TextField
                    name="contact.address"
                    control={control}
                    label="Endereço (opcional)"
                    type="text"
                    placeholder="Rua, número, complemento, bairro"
                />

                <SelectField
                    name="contact.preferredContactMethod"
                    control={control}
                    label="Método de Contato Preferido"
                    placeholder="Selecionar método"
                    options={[
                        { value: "email", label: "Email" },
                        { value: "whatsapp", label: "WhatsApp" },
                        { value: "telefone", label: "Telefone" },
                        { value: "sms", label: "SMS" }
                    ]}
                />
            </div>
        </div>
    );
};
