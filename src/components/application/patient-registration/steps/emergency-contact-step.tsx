import { FC } from "react";
import { TextField } from "@/components/base/inputs/text-field";

interface EmergencyContactStepProps {
    className?: string;
}

export const EmergencyContactStep: FC<EmergencyContactStepProps> = ({ className }) => {
    return (
        <div className={`space-y-6 ${className || ''}`}>
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Contato de Emergência
                </h3>
                <p className="text-sm text-gray-600">
                    Informações de contato para emergências
                </p>
            </div>

            <div className="space-y-4">
                <TextField
                    label="Nome do Contato de Emergência"
                    required
                    type="text"
                    placeholder="Nome completo do contato de emergência"
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Relacionamento <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none focus:outline-none transition-colors">
                        <option value="">Selecionar relacionamento</option>
                        <option value="conjuge">Cônjuge</option>
                        <option value="filho">Filho(a)</option>
                        <option value="pai">Pai</option>
                        <option value="mae">Mãe</option>
                        <option value="irmao">Irmão(ã)</option>
                        <option value="avos">Avô/Avó</option>
                        <option value="tio">Tio(a)</option>
                        <option value="primo">Primo(a)</option>
                        <option value="amigo">Amigo(a)</option>
                        <option value="outro">Outro</option>
                    </select>
                </div>

                <TextField
                    label="Telefone de Emergência (Telefone)"
                    required
                    type="tel"
                    placeholder="(XX) XXXXX-XXXX"
                />
            </div>
        </div>
    );
};
