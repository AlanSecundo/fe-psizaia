import { FC } from "react";
import { TextField } from "@/components/base/inputs/text-field";

interface ContactStepProps {
    className?: string;
}

export const ContactStep: FC<ContactStepProps> = ({ className }) => {
    return (
        <div className={`space-y-6 ${className || ''}`}>
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Contato
                </h3>
                <p className="text-sm text-gray-600">
                    Informações de contato do paciente
                </p>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextField
                        label="Email"
                        type="email"
                        placeholder="patient@example.com"
                    />

                    <TextField
                        label="Mobile/WhatsApp (Telefone)"
                        required
                        type="tel"
                        placeholder="(XX) XXXXX-XXXX"
                    />
                </div>

                <TextField
                    label="Endereço (opcional)"
                    type="text"
                    placeholder="Rua, número, complemento, bairro"
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Método de Contato Preferido
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none focus:outline-none transition-colors">
                        <option value="">Selecionar método</option>
                        <option value="email">Email</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="telefone">Telefone</option>
                        <option value="sms">SMS</option>
                    </select>
                </div>
            </div>
        </div>
    );
};
