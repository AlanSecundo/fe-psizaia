import { FC } from "react";
import { TextField } from "@/components/base/inputs/text-field";

interface IdentificationStepProps {
    className?: string;
}

export const IdentificationStep: FC<IdentificationStepProps> = ({ className }) => {
    return (
        <div className={`space-y-6 ${className || ''}`}>
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Identificação
                </h3>
                <p className="text-sm text-gray-600">
                    Informações básicas do paciente
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Coluna Esquerda */}
                <div className="space-y-4">
                    <TextField
                        label="Nome Completo"
                        required
                        type="text"
                        placeholder="Nome completo legal do paciente"
                    />

                    <TextField
                        label="Data de Nascimento (DD/MM/AAAA)"
                        required
                        type="text"
                        placeholder="DD/MM/AAAA"
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Gênero
                        </label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none focus:outline-none transition-colors">
                            <option value="">Selecionar gênero</option>
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                            <option value="outro">Outro</option>
                            <option value="nao-informar">Prefiro não informar</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Estado civil (opcional)
                        </label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none focus:outline-none transition-colors">
                            <option value="">Selecionar estado civil</option>
                            <option value="solteiro">Solteiro(a)</option>
                            <option value="casado">Casado(a)</option>
                            <option value="divorciado">Divorciado(a)</option>
                            <option value="viuvo">Viúvo(a)</option>
                            <option value="uniao-estavel">União Estável</option>
                            <option value="prefiro-nao-informar">Prefiro não informar</option>
                        </select>
                    </div>
                </div>

                {/* Coluna Direita */}
                <div className="space-y-4">
                    <TextField
                        label="Nome Social"
                        type="text"
                        placeholder="Nome preferido (opcional)"
                    />

                    <TextField
                        label="CPF"
                        type="text"
                        placeholder="XXX.XXX.XXX-XX"
                    />

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="over-18"
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="over-18" className="ml-2 text-sm text-gray-700">
                            Paciente maior de 18 anos?
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};
